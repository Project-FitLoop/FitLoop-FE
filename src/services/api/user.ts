import { instance } from "@/config/apiConfig";

// 사용자 정보 조회 API (반환 타입 명확히 지정)
export const fetchUserInfo = async (): Promise<{ username: string }> => {
  const accessToken = localStorage.getItem("access");

  if (!accessToken) {
    throw new Error("Access Token이 없습니다. 로그인해주세요.");
  }

  const response = await instance.get<{ username: string }>("/user", {
    headers: {
      access: `${accessToken}`,
    },
  });

  return response.data; 
};
