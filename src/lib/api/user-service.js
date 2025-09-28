import { tokenFetch } from "./axios-client";

export const userService = {
  getMe: () => tokenFetch("/user"),

  updateMe: (userData) =>
    tokenFetch("/update/profile", undefined, {
      method: "PATCH",
      data: userData,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }),

  // 비밀번호 변경
  changePassword: ({ email, newPassword }) =>
    tokenFetch("/forgotpwd", {
      method: "PATCH",
      data: { email, newPassword },
    }),

  updateProfileVisibility: (visible) => {
    const visibilityStatus = visible ? "VISIBLE" : "INVISIBLE";
    return tokenFetch("/update/profilevisible", undefined, {
      method: "PATCH",
      data: { visible: visibilityStatus },
      headers: {
        "Content-Type": "application/json",
      },
    });
  },

  // 사람찾기 페이지 api
  getVisibleProfiles: () =>
    tokenFetch("/others", {
      method: "GET",
    }),
};
