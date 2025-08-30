import { defaultFetch, setAccessToken, tokenFetch } from "./axios-client";
import { userService } from "./user-service";

export const authService = {
  login: async (email, password) => {
    const data = await defaultFetch("/login", {
      method: "POST",
      body: { email, password },
    });

    if (!data.accessToken) {
      throw new Error("로그인 응답에 accessToken이 없습니다.");
    }

    setAccessToken(data.accessToken);
    return data.accessToken;
  },

  register: async (password, nickname, email) => {
    const data = await defaultFetch("/signup", {
      method: "POST",
      body: { password, nickname, email },
    });

    if (!data.accessToken) {
      throw new Error("회원가입 응답에 accessToken이 없습니다.");
    }

    setAccessToken(data.accessToken);
    return data.accessToken;
  },

  // 인증 코드 전송 API
  sendAuthCode: async (email) => {
    await defaultFetch("/codesend", {
      method: "POST",
      body: { email },
    });
  },

  // 인증 코드 검증 API
  verifyAuthCode: async (email, code) => {
    await defaultFetch("/mailcodecheck", {
      method: "POST",
      body: {
        email,
        authCode: code,
      },
    });
  },

  logout: async () => {
    await defaultFetch("/logout", {
      method: "POST",
      withCredentials: true,
    });
    setAccessToken(null);
  },
};
