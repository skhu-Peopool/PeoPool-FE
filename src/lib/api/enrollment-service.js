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

  // 해당 유저가 승인받은 모집글 목록 조회
  getMyApprovedEnrollments: async () => {
    const response = await tokenFetch("/enrollment/member/approved", {
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

  // 해당 게시글에 대한 신청 목록 조회
  getApplicantsByPostId: async (postId) => {
    const response = await tokenFetch(`/enrollment/post/${postId}`, {
      method: "GET",
    });
    return response.enrollmentApplyingList || [];
  },

  // 신청 승인
  approveEnrollment: async (enrollmentId) => {
    const response = await tokenFetch(
      `/enrollment/approve/${enrollmentId}`,
      null,
      {
        method: "PATCH",
      }
    );
    return response;
  },

  // 신청 거절
  rejectEnrollment: async (enrollmentId) => {
    const response = await tokenFetch(
      `/enrollment/reject/${enrollmentId}`,
      null,
      {
        method: "PATCH",
      }
    );
    return response;
  },
};
