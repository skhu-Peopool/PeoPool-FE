// 유저 정보 조회 api - 추후 수정 예정
import { tokenFetch } from "./axios-client";

export const userService = {
  getMe: () => tokenFetch("/user"),

  // 프로필 or 마이페이지 수정 api로 쓸 예정
  updateMe: (userData) =>
    tokenFetch("/update/profile", undefined, {
      method: "PATCH",
      body: userData,
      headers: {
        "Content-Type": null, // 'application/json' 덮어쓰기
      },
    }),

  // 비밀번호 변경
  changePassword: ({ email, newPassword }) =>
    tokenFetch("/forgotpwd", undefined, {
      method: "PATCH",
      body: { email, newPassword },
    }),
};
