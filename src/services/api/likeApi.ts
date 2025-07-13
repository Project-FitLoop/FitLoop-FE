import { instance } from "@/config/apiConfig";

// 좋아요
export const likeProduct = async (id: number) => {
  await instance.post(`/products/${id}/like`);
};

// 좋아요 취소
export const unlikeProduct = async (id: number) => {
  await instance.delete(`/products/${id}/like`);
};
