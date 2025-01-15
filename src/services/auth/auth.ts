import axios from "axios";

const API_BASE_URL = "http://localhost:8080";

// 로그인 API 호출
export const loginUser = async (username: string, password: string): Promise<string> => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/login`,
      { username, password },
      { withCredentials: true } // 쿠키 포함
    );

    // 응답 헤더에서 Access Token 추출
    // 'access' 헤더에서 Access Token 가져오기
    const accessToken = response.headers["access"];
    if (!accessToken) {
      throw new Error("Access Token이 응답 헤더에 없습니다.");
    }
    // Access Token 반환
    return accessToken; 
  } catch (error: any) {
    console.error("로그인 실패:", error);
    throw new Error(error.response?.data?.message || "로그인 요청 실패");
  }
};

// 회원가입 API 호출
export const registerUser = async (username: string, password: string): Promise<void> => {
  try {
    await axios.post(`${API_BASE_URL}/join`, { username, password }, { withCredentials: true });
    console.log("회원가입 성공!");
  } catch (error: any) {
    console.error("회원가입 실패:", error);
    throw new Error(error.response?.data?.message || "회원가입 요청 실패");
  }
};
