import { instance } from "@/config/apiConfig";

// 사용자 정보 조회 API (반환 타입 명확히 지정)
export const fetchUserInfo = async (): Promise<{ username: string }> => {
  const accessToken = localStorage.getItem("access");

  if (!accessToken) {
    throw new Error("Access Token이 없습니다. 로그인해주세요.");
  }

  const response = await instance.get<{ username: string }>("/user", {
    headers: {
      access:`${accessToken}`,
    },
  });

  return response.data; 
};

//프로필 추가 API
export const registerInfomation = async (
  nickname: string,
  gender: string,
  ageRange: string,
  height: number,
  weight: number
): Promise<boolean> => {
  try {
    const response = await instance.post("/users/profile", {
      nickname,
      gender,
      ageRange,
      height,
      weight,
    });

    return response.status === 201; // 성공 시 true 반환
  } catch (error) {
    console.error("프로필 등록 실패:", error);
    return false; // 실패 시 false 반환
  }
};