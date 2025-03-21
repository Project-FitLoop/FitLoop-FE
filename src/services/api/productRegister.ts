import { instance } from "@/config/apiConfig";

export const registerProduct = async (productData: any) => {
  try {
    const response = await instance.post("/products/register", productData);
    return response.data;
  } catch (error) {
    console.error("상품 등록 오류:", error);
    throw error;
  }
};
