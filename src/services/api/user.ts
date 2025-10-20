import { instance } from "@/config/apiConfig";

const getAccessTokenFromCookie = (): string | null => {
  const match = document.cookie.match(/(?:^|; )access=([^;]*)/);
  return match ? match[1] : null;
};

// 사용자 정보 조회 API (반환 타입 명확히 지정)
export const fetchUserInfo = async (): Promise<{ username: string }> => {
  try {
    const response = await instance.get<{ username: string }>("/user");
    return response.data;
  } catch (error) {
    console.error("사용자 정보 조회 실패:", error);
    throw new Error("사용자 정보를 불러오지 못했습니다.");
  }
};

//프로필 추가 API
export const registerInfomation = async (
  nickname: string,
  gender: string,
  ageRange: string,
  height: number,
  weight: number
): Promise<boolean> => {
  const accessToken = getAccessTokenFromCookie();

  if (!accessToken) {
    alert("Access Token이 없습니다. 로그인해주세요.");
    window.location.href = "/login";
    return false;
  }

  try {
    const response = await instance.post("/users/profile", 
      { nickname, gender, ageRange, height, weight },
      {
        headers: {
          access: `${accessToken}`,
        },
      }
    );

    return response.status === 201; 
  } catch (error) {
    console.error("프로필 등록 실패:", error);
    return false; 
  }
};

export const deleteAccount = async (): Promise<void> => {
  const accessToken = getAccessTokenFromCookie();

  if (!accessToken) {
    throw new Error("Access Token이 없습니다. 로그인 후 다시 시도해주세요.");
  }

  try {
    await instance.delete("/users", {
      headers: {
        access: `${accessToken}`,
      },
    });
  } catch (error) {
    console.error("계정 삭제 실패:", error);
    throw new Error("계정 삭제에 실패했습니다.");
  }
};