import { ProductResponse } from "./productApi";
import { instance } from "@/config/apiConfig";

export const fetchRecentViewedProducts = async (): Promise<ProductResponse[]> => {
  const response = await instance.get<ProductResponse[]>("/products/recent-viewed");
  return response.data;
};
