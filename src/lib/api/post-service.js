import { defaultFetch, tokenFetch } from "./axios-client";

export const postService = {
  getPostList: async ({
    page = 1,
    size = 6,
    start,
    end,
    category,
    postStatus,
    query,
  } = {}) => {
    const params = { page, size };
    if (start) params.start = start;
    if (end) params.end = end;
    if (category && category !== "전체") params.category = category;
    if (postStatus && postStatus !== "전체") params.postStatus = postStatus;
    if (query) params.query = query;

    const response = await defaultFetch("/post/list", {
      method: "GET",
      params,
    });

    console.log("📨 response from API:", response);

    return {
      posts: response.postList || [],
      totalCount: response.totalCount || 0,
      totalPages: response.totalPages || 1,
      currentPage: response.currentPage || 1,
    };
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
    const response = await defaultFetch(`/post/${postId}`, {
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

  updatePost: async (
    postId,
    {
      title,
      content,
      recruitmentStartDate,
      recruitmentEndDate,
      activityStartDate,
      maxPeople,
      category,
      postStatus,
      imageFile,
    }
  ) => {
    const formData = new FormData();

    const formatDate = (dateString) =>
      dateString ? new Date(dateString).toISOString().split("T")[0] : null;

    const postUpdateReq = {
      title,
      content,
      recruitmentStartDate: formatDate(recruitmentStartDate),
      recruitmentEndDate: formatDate(recruitmentEndDate),
      activityStartDate: formatDate(activityStartDate),
      maxPeople: Number(maxPeople),
      category: category.toUpperCase(),
      postStatus: postStatus?.toUpperCase(),
    };

    formData.append("postUpdateReq", JSON.stringify(postUpdateReq));
    if (imageFile) {
      formData.append("image", imageFile);
    }

    const response = await tokenFetch(`/post/update/${postId}`, null, {
      method: "PATCH",
      body: formData,
      headers: {
        "Content-Type": undefined,
      },
    });

    return response;
  },
};
