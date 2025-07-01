import axios from "axios";

const baseURL = process.env.NEXT_PUBLIC_API_URL;

// 서버 주소 연결 기본 셋팅
const axiosClient = axios.create({
  baseURL,
  withCredentials: true, // 쿠키 기반 인증이면 필요해서 넣음
  headers: {
    "Content-Type": "application/json",
  },
});

// 응답 에러 공통 처리 (빼도 되고)
axiosClient.interceptors.response.use(
  (res) => res,
  (err) => {
    const message =
      err?.response?.data?.message || `API error: ${err?.response?.status}`;
    return Promise.reject(new Error(message));
  }
);

// api 함수 생성해 연결 시 간편하게 연결 가능
export const defaultFetch = async (url, options = {}) => {
  const method = options.method || "GET";
  const data = options.body ? JSON.parse(options.body) : undefined;

  const config = {
    url,
    method,
    data,
    params: options.params || undefined,
    headers: options.headers || undefined,
  };

  const res = await axiosClient(config);
  return res.data;
};
