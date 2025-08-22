"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { authService } from "../lib/api/auth-service";
import { userService } from "../lib/api/user-service";
import { setAccessToken as setGlobalAccessToken } from "../lib/api/axios-client";

const AuthContext = createContext({
  login: () => {},
  logout: () => {},
  register: () => {},
  updateUser: () => {},
  user: null,
  isLoading: true,
});

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const login = async (email, password) => {
    try {
      await authService.login(email, password);
      await getUser();
    } catch (err) {
      console.error("로그인 실패:", err);
      throw err;
    }
  };

  const register = async (password, nickname, email) => {
    try {
      await authService.register(password, nickname, email);
      await getUser();
    } catch (err) {
      console.error("회원가입 실패:", err);
      throw err;
    }
  };

  const logout = async () => {
    try {
      await authService.logout();
    } catch (err) {
      console.warn("서버 로그아웃 실패:", err);
    } finally {
      setGlobalAccessToken(null);
      setUser(null);
    }
  };

  const getUser = async () => {
    try {
      const userData = await userService.getMe();
      setUser(userData);
    } catch (error) {
      console.error("사용자 정보를 가져오는데 실패했습니다:", error);
      setUser(null);
    }
  };

  const refreshAccessToken = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/token`, {
        method: "POST",
        credentials: "include",
      });
      if (!res.ok) throw new Error("토큰 갱신 실패");
      const data = await res.json();
      return data.accessToken;
    } catch (err) {
      console.warn("자동 토큰 갱신 실패:", err);
      return null;
    }
  };

  useEffect(() => {
    (async () => {
      const newAccessToken = await refreshAccessToken();
      if (newAccessToken) {
        setGlobalAccessToken(newAccessToken);
        await getUser();
      } else {
        console.warn("[Auth] No token received from refresh.");
      }
      setIsLoading(false);
    })();
  }, []);

  const updateUser = async (updated) => {
    try {
      const updatedUser = await userService.updateMe(updated);
      setUser(updatedUser);
    } catch (error) {
      console.error("사용자 정보 업데이트 실패:", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        register,
        updateUser,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
