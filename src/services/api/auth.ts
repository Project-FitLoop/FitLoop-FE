import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

//로그인 API 호출
export const loginUser = async (
  username: string,
  password: string
): Promise<{ accessToken: string; personalInfo: boolean }> => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/login`,
      { username, password },
      { withCredentials: true }
    );

    const accessToken = response.headers["access"];
    if (!accessToken) {
      throw new Error("Access Token이 응답 헤더에 없습니다.");
    }

    const personalInfo = response.data.personal_info;

    return { accessToken, personalInfo };
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
    const response = await axios.post(
      `${API_BASE_URL}/reissue`,
      {},
      { withCredentials: true } //Refresh Token 쿠키 포함
    );

    //응답 헤더에서 Access Token 추출
    const accessToken = response.headers["access"];
    if (!accessToken) {
      throw new Error("Access Token이 응답 헤더에 없습니다.");
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

//로그아웃 API 호출
export const logoutUser = async (): Promise<void> => {
  try {
    const response = await axios.post(`${API_BASE_URL}/logout`, {}, { withCredentials: true });

    if (response.status === 200) {
      console.log("로그아웃 성공!");

      // sessionStorage.removeItem("user");
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
