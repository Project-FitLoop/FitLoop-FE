import axios from "axios";
import { message } from "antd";

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  // HttpOnly 쿠키 포함
  withCredentials: true, 
});

//모든 요청에 access 토큰 자동 포함
instance.interceptors.request.use(
  (config) => {
    const match = document.cookie.match(/(?:^|; )access=([^;]*)/);
    const accessToken = match ? match[1] : null;

    if (accessToken) {
      config.headers["access"] = accessToken;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Access Token 자동 갱신 (Interceptor)
instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const res = await axios.post(`${instance.defaults.baseURL}/reissue`, {}, { withCredentials: true });
        const newAccessToken = res.data.accessToken;

        // 새 Access Token 저장 및 요청 재시도
        instance.defaults.headers.common["access"] = `Bearer ${newAccessToken}`;
        originalRequest.headers["access"] = `Bearer ${newAccessToken}`;
        return instance(originalRequest);
      } catch (refreshError) {
        message.error("세션이 만료되었습니다. 다시 로그인해주세요.");
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export { instance };
