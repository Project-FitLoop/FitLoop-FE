/* eslint-disable */
import axios from 'axios';
import { instance } from '@/config/apiConfig';

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

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

// 최근 상품 조회 (axios 기본 인스턴스 사용)
export const fetchRecentProducts = async (page: number, size = 9): Promise<ProductResponse[]> => {
  const response = await axios.get<ProductResponse[]>(
    `${BASE_URL}/products/recent?page=${page}&size=${size}`
  );
  return response.data;
};

// 상품 등록 (커스텀 인스턴스 사용)
export const registerProduct = async (productData: any) => {
  try {
    const response = await instance.post("/products/register", productData);
    return response.data;
  } catch (error) {
    console.error("상품 등록 오류:", error);
    throw error;
  }
};

// 상품 상세
export const fetchProductDetail = async (
  id: string
): Promise<ProductDetail> => {
  const response = await axios.get<ProductDetail>(`${BASE_URL}/products/${id}`);
  return response.data;
};
