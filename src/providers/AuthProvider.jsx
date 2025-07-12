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

  const login = async (id, password) => {
    try {
      const { user } = await authService.login(id, password);
      setUser(user);
    } catch (err) {
      console.error("로그인 실패:", err);
      throw err;
    }
  };

  const register = async (userId, password, nickname, email) => {
    try {
      const { accessToken } = await authService.register(
        userId,
        password,
        nickname,
        email
      );

      if (!accessToken) throw new Error("회원가입 응답에 accessToken 없음");

      setGlobalAccessToken(accessToken); // 전역 토큰 설정
      await getUser(); // 사용자 정보 가져오기
    } catch (err) {
      console.error("회원가입 실패:", err);
      throw err;
    }
  };

  const logout = async () => {
    try {
      await authService.logout(); // 서버에도 logout 요청
    } catch (err) {
      console.warn("서버 로그아웃 실패:", err);
    } finally {
      setUser(null); // 클라이언트 상태 초기화
      setGlobalAccessToken(null);
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
        credentials: "include", // 쿠키 전송
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
    // 새로고침 시 accessToken 재발급 시도
    (async () => {
      const newAccessToken = await refreshAccessToken();
      if (newAccessToken) {
        setGlobalAccessToken(newAccessToken);
        await getUser();
      } else {
        console.warn(" [Auth] No token received from refresh.");
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
