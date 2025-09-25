import axios from "axios";

const baseURL = import.meta.env.VITE_API_URL || "http://localhost:8080"; // 기본값 추가

// 환경변수 확인 로그 (개발 중에만)
if (import.meta.env.DEV) {
  console.log("🌐 API Base URL:", baseURL);
  console.log("🔧 Environment:", import.meta.env.MODE);
}

// baseURL이 올바르지 않은 경우 경고
if (!baseURL || baseURL.includes("localhost:5173")) {
  console.error("❌ 잘못된 API URL입니다. .env 파일의 VITE_API_URL을 확인하세요.");
  console.error("현재 baseURL:", baseURL);
}

// 전역 accessToken 저장
let accessToken = null;

// accessToken getter
export const getAccessToken = () => accessToken;

// accessToken 설정
export const setAccessToken = (token) => {
  if (token === null) {
    accessToken = null;
    console.log("accessToken 제거됨");
    return;
  }
  
  if (typeof token !== "string") {
    console.warn("Invalid accessToken:", token);
    return;
  }
  accessToken = token;
  console.log("setAccessToken:", token?.substring(0, 20) + "...");
};

// axios 인스턴스 생성
const axiosClient = axios.create({
  baseURL: baseURL,
  withCredentials: true, // 쿠키 전송 필요 시
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000, // 10초 타임아웃 추가
});

// 요청 인터셉터 (디버깅용)
axiosClient.interceptors.request.use(
  (config) => {
    if (import.meta.env.DEV) {
      console.log(` ${config.method?.toUpperCase()} ${config.url}`, config.data || config.params);
    }
    return config;
  },
  (error) => {
    console.error("요청 인터셉터 에러:", error);
    return Promise.reject(error);
  }
);

// 응답 인터셉터 (토큰 자동 갱신 포함)
axiosClient.interceptors.response.use(
  (res) => {
    if (import.meta.env.DEV) {
      console.log(`✅ ${res.config.method?.toUpperCase()} ${res.config.url}:`, res.data);
    }
    return res;
  },
  async (err) => {
    const originalConfig = err.config;

    // 네트워크 에러 처리
    if (!err.response) {
      console.error("네트워크 에러 또는 서버에 연결할 수 없습니다:");
      console.error("- baseURL:", baseURL);
      console.error("- 요청 URL:", originalConfig?.url);
      console.error("- 에러:", err.message);
      
      const networkError = new Error("서버에 연결할 수 없습니다.");
      networkError.status = 0;
      return Promise.reject(networkError);
    }

    if (import.meta.env.DEV) {
      console.error(`${err.response.status} ${originalConfig?.method?.toUpperCase()} ${originalConfig?.url}:`, 
        err.response.data);
    }

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
        console.warn("토큰 재발급 실패:", refreshErr);
        setAccessToken(null); // 토큰 제거
        
        const authError = new Error("인증이 만료되었습니다. 다시 로그인해주세요.");
        authError.status = 401;
        return Promise.reject(authError);
      }
    }

    // 에러 객체 생성
    const apiError = new Error(
      err?.response?.data?.message || 
      err?.response?.data?.error ||
      `API 에러: ${err?.response?.status}`
    );
    apiError.status = err?.response?.status;
    apiError.response = err?.response;
    
    return Promise.reject(apiError);
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

  try {
    const res = await axiosClient(config);
    return res.data;
  } catch (error) {
    console.error(`defaultFetch 에러 - ${method} ${url}:`, error);
    throw error;
  }
};

// 인증 요청 함수 수정
export const tokenFetch = async (url, options = {}) => {
  const token = accessToken;
  if (!token) {
    const authError = new Error("로그인이 필요합니다.");
    authError.status = 401;
    throw authError;
  }

  const method = options.method || "GET";

  const config = {
    url,
    method,
    headers: {
      ...(options.headers || {}),
      Authorization: `Bearer ${token}`,
    },
  };

  if (method === "GET") {
    config.params = options.params;
  } else {
    config.data = options.data || options.body;
  }

  try {
    const res = await axiosClient(config);
    return res.data;
  } catch (error) {
    console.error(`tokenFetch 에러 - ${method} ${url}:`, error);
    throw error;
  }
};