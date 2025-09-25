import { tokenFetch } from "./axios-client";

export const userService = {
  getMe: () => tokenFetch("/user"),

  updateMe: (userData) =>
    tokenFetch("/update/profile", undefined, {
      method: "PATCH",
      body: userData,
      headers: {
        "Content-Type": null,
      },
    }),

  // 비밀번호 변경
  changePassword: ({ email, newPassword }) =>
    tokenFetch("/forgotpwd", undefined, {
      method: "PATCH",
      body: { email, newPassword },
    }),

  updateProfileVisibility: (visible) => {
    const visibilityStatus = visible ? "VISIBLE" : "INVISIBLE";
    return tokenFetch("/update/profilevisible", undefined, {
      method: "PATCH",
      body: JSON.stringify({ visible: visibilityStatus }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  },

  // 사람찾기 페이지 api
  getVisibleProfiles: () =>
    tokenFetch("/others", undefined, {
      method: "GET",
    }),
};
