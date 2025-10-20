/* eslint-disable */
import { instance } from "@/config/apiConfig";

export interface ProductResponse {
  id: number;
  name: string;
  price: number;
  includeShipping: boolean;
  likeCount: number;
  createdAt: string;
  imageUrls: string[];
  tags?: string[];
  free: boolean;
  likedByMe: boolean;
}

export interface ProductDetail extends ProductResponse {
  description?: string;
  category?: string;
  sellerName?: string;
  rating?: number;
  reviewCount?: number;
  condition?: string;
  profileImages: string;
}

// 최근 상품 조회
export const fetchRecentProducts = async (
  page: number,
  size = 9
): Promise<ProductResponse[]> => {
  const response = await instance.get(`/products/recent`, {
    params: { page, size },
  });
  return response.data;
};

// 인기 상품 조회
export const fetchPopularProducts = async (
  page: number,
  size = 9
): Promise<ProductResponse[]> => {
  const response = await instance.get(`/products/popular`, {
    params: { page, size },
  });
  return response.data;
};

// 카테고리 상품 조회
export const fetchCategoryProducts = async (
  page: number,
  categoryCode: string,
  gender: string,
  size = 9
): Promise<ProductResponse[]> => {
  const response = await instance.get(`/products/category`, {
    params: { page, size, categoryCode, gender },
  });
  return response.data;
};

// 상품 등록
export const registerProduct = async (productData: any) => {
  const response = await instance.post("/products/register", productData);
  return response.data;
};

// 상품 상세 조회
export const fetchProductDetail = async (
  id: string | number
): Promise<ProductDetail> => {
  const response = await instance.get(`/products/${id}`);
  return response.data;
};
