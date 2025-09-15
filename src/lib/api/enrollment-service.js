import { tokenFetch } from "./axios-client";

export const enrollmentService = {
  // 게시글 신청하기
  applyToPost: async (postId, comment) => {
    const response = await tokenFetch(`/enrollment/apply/${postId}`, null, {
      method: "POST",
      body: JSON.stringify({ comment }),
    });

    return response;
  },

  // 해당 유저가 신청한 게시글 목록 조회
  getMyEnrollments: async () => {
    const response = await tokenFetch("/enrollment/member", {
      method: "GET",
    });
    return response.enrollmentApplyingList || [];
  },

  // 신청 내역 취소
  cancelEnrollment: async (postId) => {
    const response = await tokenFetch(`/enrollment/cancel/${postId}`, null, {
      method: "PATCH",
    });
    return response;
  },
};
