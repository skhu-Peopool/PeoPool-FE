// 유저 정보 조회 api - 추후 수정 예정
import { tokenFetch } from "./axios-client";

export const userService = {
  getMe: () => tokenFetch("/user"),

  // 프로필 or 마이페이지 수정 api로 쓸 예정
  updateMe: (userData) =>
    tokenFetch("/update", undefined, {
      method: "PATCH",
      body: userData,
    }),
};
