import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

type UserRole = "ADMIN" | "MEMBER";

interface RawLoginResponse {
  fullName: string;
  personal_info: boolean;
  role: UserRole; 
  message?: string;
}

export interface LoginResult {
  personalInfo: boolean;
  fullName: string;
  role: UserRole;
}

// 로그인 API 호출
export const loginUser = async (
  username: string,
  password: string
): Promise<LoginResult> => {
  try {
    const response = await axios.post<RawLoginResponse>(
      `${API_BASE_URL}/login`,
      { username, password },
      { withCredentials: true }
    );

    const data = response.data;

    // 필수 필드 안전 체크 및 매핑
    const fullName = typeof data.fullName === "string" ? data.fullName : "";
    const personalInfo = Boolean(data.personal_info);
    const role: UserRole = (data.role === "ADMIN" || data.role === "MEMBER") ? data.role : "MEMBER";

    return { fullName, personalInfo, role };
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      const serverMessage =
        (error.response?.data as any)?.message ||
        (error.response?.data as any)?.error ||
        error.message;
      console.error("로그인 실패:", serverMessage);
      throw new Error(serverMessage || "로그인 요청 실패");
    } else {
      console.error("로그인 실패: 알 수 없는 오류", error);
      throw new Error("알 수 없는 오류가 발생했습니다.");
    }
  }
};

// 회원가입 API 호출
export const registerUser = async (
  username: string,
  password: string,
  email: string,
  name: string,
  birthday: string
): Promise<void> => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/register`,
      { username, password, email, name, birthday },
      { withCredentials: true }
    );

    console.log("회원가입 성공!", response.data);
    alert("회원가입이 완료되었습니다!");
    window.location.href = "/login";
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      const serverMessage =
        (error.response?.data as any)?.error ||
        (error.response?.data as any)?.message ||
        error.message;
      console.error("회원가입 실패:", serverMessage);
      alert(serverMessage || "회원가입 요청 실패");
    } else {
      console.error("회원가입 실패: 알 수 없는 오류", error);
      alert("알 수 없는 오류가 발생했습니다. 다시 시도해 주세요.");
    }
  }
};

// Google OAuth2 로그인 URL 요청
export const getGoogleLoginUrl = async (): Promise<string> => {
  try {
    const response = await axios.get<{ authUrl?: string }>(
      `${API_BASE_URL}/auth/google`,
      { withCredentials: true }
    );
    if (!response.data.authUrl) {
      throw new Error("Google 로그인 URL을 가져올 수 없습니다.");
    }
    console.log("Google 로그인 URL:", response.data.authUrl);
    return response.data.authUrl;
  } catch (error) {
    console.error("Google 로그인 요청 실패:", error);
    throw new Error("Google 로그인 URL 요청 실패");
  }
};

// 쿠키에서 특정 이름의 값을 꺼내는 함수
const getCookie = (name: string): string | null => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()!.split(";").shift() || null;
  return null;
};

// access 토큰을 쿠키에서 꺼내서 로그아웃 요청
export const logoutUser = async (): Promise<void> => {
  try {
    const accessToken = getCookie("access");

    // access 없어도 그냥 요청
    const headers: Record<string, string> = {};
    if (accessToken) {
      headers["access"] = accessToken;
    }

    const response = await axios.post(
      `${API_BASE_URL}/logout`,
      {},
      {
        withCredentials: true,
        headers,
      }
    );

    if (response.status === 200) {
      console.log("로그아웃 성공");
    } else {
      console.warn("로그아웃 요청은 했지만 성공 응답이 아님:", response.status);
    }
    document.cookie = "access=; path=/; max-age=0;";
  } catch (error: unknown) {
    document.cookie = "access=; path=/; max-age=0;";
    if (axios.isAxiosError(error)) {
      console.error("로그아웃 요청 실패:", error.response?.data || error.message);
    } else {
      console.error("로그아웃 중 알 수 없는 오류:", error);
    }
  }
};
