import { defaultFetch, setAccessToken } from "./axios-client";
import { userService } from "./user-service";

export const authService = {
  login: async (id, password) => {
    const data = await defaultFetch("/login", {
      method: "POST",
      body: JSON.stringify({ id, password }),
    });

    if (!data.accessToken) {
      throw new Error("로그인 응답에 accessToken이 없습니다.");
    }

    setAccessToken(data.accessToken);
    const user = await userService.getMe();
    return { user };
  },

  register: async (userId, password, nickname, email) => {
    return await defaultFetch("/signup", {
      method: "POST",
      body: { userId, password, nickname, email },
    });
  },
};
