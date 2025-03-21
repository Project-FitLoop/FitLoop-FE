import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const registerProduct = async (productData: any) => {
  const accessToken = localStorage.getItem("access");

  if (!accessToken) {
    alert("Access Token이 없습니다. 로그인해주세요.");
    throw new Error("Access Token이 없습니다.");
  }

  try {
    const response = await axios.post(
      `${API_BASE_URL}/products/register`,
      productData,
      {
        headers: {
          "Content-Type": "application/json",
          access: `${accessToken}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("상품 등록 오류:", error);
    throw error;
  }
};
