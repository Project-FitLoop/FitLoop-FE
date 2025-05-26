import axios, { AxiosRequestConfig } from "axios";

interface CustomAxiosRequestConfig extends AxiosRequestConfig {
  _retry?: boolean;
}

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  withCredentials: true,
});

// 쿠키에서 access 토큰 읽는 함수
const getCookie = (name: string): string | null => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()!.split(";").shift() || null;
  return null;
};

// 요청 인터셉터: 모든 요청에 access 토큰 자동 추가
instance.interceptors.request.use(
  (config) => {
    const accessToken = getCookie("access");
    if (accessToken) {
      config.headers = config.headers || {};
      config.headers["access"] = accessToken;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 중복 방지를 위한 refreshToken 재발급 요청 잠금 변수
let refreshTokenRequest: Promise<void> | null = null;

// access 토큰 재발급 요청 (쿠키 기반)
async function reissueAccessToken(): Promise<void> {
  try {
    await instance.post("/reissue");
  } catch {
    throw new Error("토큰 재발급 실패");
  }
}

// 응답 인터셉터: access 토큰 만료 시 자동 재요청 처리
instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config as CustomAxiosRequestConfig;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        if (!refreshTokenRequest) {
          refreshTokenRequest = reissueAccessToken();
        }
        await refreshTokenRequest;
        refreshTokenRequest = null;
        // 재요청
        return instance(originalRequest);
      } catch {
        refreshTokenRequest = null;
        window.location.href = "/login?reason=session-expired";
      }
    }

    return Promise.reject(error);
  }
);

export { instance };
