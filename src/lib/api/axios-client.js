import axios from "axios";

const baseURL = import.meta.env.VITE_API_URL; // Vite 환경변수

// 전역 accessToken 저장
let accessToken = null;

// accessToken getter
export const getAccessToken = () => accessToken;

// accessToken 설정
export const setAccessToken = (token) => {
  accessToken = token;
  console.log("setAccessToken:", token);
};

// axios 인스턴스 생성
const axiosClient = axios.create({
  baseURL: baseURL,
  withCredentials: true, // 쿠키 전송 필요 시
  headers: {
    "Content-Type": "application/json",
  },
});

// 응답 인터셉터 (토큰 자동 갱신 포함)
axiosClient.interceptors.response.use(
  (res) => res,
  async (err) => {
    const originalConfig = err.config;

    // accessToken 만료 시 401 발생
    if (err.response?.status === 401 && !originalConfig._retry) {
      originalConfig._retry = true;

      try {
        const refreshRes = await axios.post(`${baseURL}/token`, null, {
          withCredentials: true,
        });

        const newToken = refreshRes.data.accessToken;
        if (!newToken) throw new Error("새 accessToken 없음");

        setAccessToken(newToken);
        originalConfig.headers.Authorization = `Bearer ${newToken}`;

        return axiosClient(originalConfig); // 원래 요청 재시도
      } catch (refreshErr) {
        console.warn("토큰 재발급 실패");
        return Promise.reject(refreshErr);
      }
    }

    const message =
      err?.response?.data?.message || `API error: ${err?.response?.status}`;
    return Promise.reject(new Error(message));
  }
);

// 공통 fetch 함수 (비인증 요청 가능)
export const defaultFetch = async (url, options = {}) => {
  const method = options.method || "GET";
  const data = options.body;

  const config = {
    url,
    method,
    data,
    params: options.params,
    headers: options.headers,
  };

  const res = await axiosClient(config);

  return res.data;
};

// 인증 요청 함수
export const tokenFetch = async (url, tokenOverride = null, options = {}) => {
  if (tokenOverride) {
    setAccessToken(tokenOverride);
  }

  const method = options.method || "GET";
  const data = options.body;
  // const data = options.body ? JSON.parse(options.body) : undefined;

  const config = {
    url,
    method,
    data,
    params: options.params,
    headers: {
      ...(options.headers || {}),
      Authorization: `Bearer ${accessToken}`,
    },
  };

  const res = await axiosClient(config);
  return res.data;
};
