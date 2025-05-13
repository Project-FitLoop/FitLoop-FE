import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

//로그인 API 호출
export const loginUser = async (
  username: string,
  password: string
): Promise<{ personalInfo: boolean }> => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/login`,
      { username, password },
      { withCredentials: true }
    );

    const personalInfo = response.data.personal_info;

    return { personalInfo };
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error("로그인 실패:", error.response?.data?.message || error.message);
      throw new Error(error.response?.data?.message || "로그인 요청 실패");
    } else {
      console.error("로그인 실패: 알 수 없는 오류", error);
      throw new Error("알 수 없는 오류가 발생했습니다.");
    }
  }
};

//회원가입 API 호출
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
      console.error("회원가입 실패:", error.response?.data?.error || error.message);
      alert(error.response?.data?.error || "회원가입 요청 실패");
    } else {
      console.error("회원가입 실패: 알 수 없는 오류", error);
      alert("알 수 없는 오류가 발생했습니다. 다시 시도해 주세요.");
    }
  }
};



//Google OAuth2 로그인 URL 요청
export const getGoogleLoginUrl = async (): Promise<string> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/auth/google`);
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

//Access Token 재발급 요청
export const reissueAccessToken = async (): Promise<string> => {
  try {
    // 서버에 refresh 토큰 기반으로 재발급 요청
    await axios.post(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/reissue`,
      {},
      { withCredentials: true }
    );
    await new Promise((resolve) => setTimeout(resolve, 100));

    // 쿠키에서 새로 저장된 access 토큰을 꺼냄
    const getCookie = (name: string): string | null => {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop()!.split(';').shift() || null;
      return null;
    };

    const accessToken = getCookie("access");
    if (!accessToken) {
      throw new Error("Access 토큰이 쿠키에 없습니다.");
    }

    return accessToken;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error("Access Token 갱신 실패:", error.response?.data || error.message);
      throw new Error(error.response?.data?.message || "토큰 갱신 요청 실패");
    } else {
      console.error("Access Token 갱신 실패: 알 수 없는 오류", error);
      throw new Error("알 수 없는 오류가 발생했습니다.");
    }
  }
};


// 쿠키에서 특정 이름의 값을 꺼내는 함수
const getCookie = (name: string): string | null => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()!.split(';').shift() || null;
  return null;
};

// access 토큰을 쿠키에서 꺼내서 로그아웃 요청
export const logoutUser = async (): Promise<void> => {
  try {
    const accessToken = getCookie("access");
    if (!accessToken) {
      throw new Error("Access Token이 쿠키에 없습니다.");
    }

    const response = await axios.post(
      `${API_BASE_URL}/logout`,
      {},
      {
        withCredentials: true,
        headers: {
          access: accessToken,
        },
      }
    );

    if (response.status === 200) {
      console.log("로그아웃 성공!");
      document.cookie = "access=; path=/; max-age=0;";
    } else {
      throw new Error("로그아웃 요청 실패");
    }
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error("로그아웃 실패:", error.response?.data || error.message);
      throw new Error(error.response?.data?.message || "로그아웃 요청 실패");
    } else {
      console.error("로그아웃 실패: 알 수 없는 오류", error);
      throw new Error("알 수 없는 오류가 발생했습니다.");
    }
  }
};

