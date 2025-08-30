import { defaultFetch, tokenFetch } from "./axios-client";

export const postService = {
  getPostList: async ({ page = 1, size = 6, start, end } = {}) => {
    const params = { page, size };

    if (start) params.start = start;
    if (end) params.end = end;

    const response = await defaultFetch("/post/list", {
      method: "GET",
      params,
    });

    return response.postList || [];
  },

  addPost: async ({
    title,
    content,
    recruitmentStartDate,
    recruitmentEndDate,
    activityStartDate,
    maxPeople,
    category,
    imageFile,
  }) => {
    const formData = new FormData();

    // 유효한 날짜 문자열로 변환
    const formatDate = (dateString) =>
      dateString ? new Date(dateString).toISOString().split("T")[0] : null;

    const postAddReq = {
      title,
      content,
      recruitmentStartDate: formatDate(recruitmentStartDate),
      recruitmentEndDate: formatDate(recruitmentEndDate),
      activityStartDate: formatDate(activityStartDate),
      maxPeople: Number(maxPeople),
      category: category.toUpperCase(),
    };

    formData.append("postAddReq", JSON.stringify(postAddReq));
    formData.append("image", imageFile);

    const response = await tokenFetch("/post/add", null, {
      method: "POST",
      body: formData,
      headers: {
        "Content-Type": undefined, // axios-client에서 application/json으로 공통 설정하여 여기는 별도 제거
      },
    });

    return response;
  },

  getPostDetail: async (postId) => {
    const response = await tokenFetch(`/post/${postId}`, null, {
      method: "GET",
    });
    return response || [];
  },

  deletePost: async (postId) => {
    const response = await tokenFetch(`/post/${postId}`, null, {
      method: "DELETE",
    });
    return response;
  },
};
