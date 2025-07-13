import { ProductResponse } from "./productApi";

export async function fetchSearchResults(keyword: string): Promise<ProductResponse[]> {
  const res = await fetch(`http://localhost:8080/api/v1/search?query=${encodeURIComponent(keyword)}`);
  if (!res.ok) throw new Error('검색 실패');
  const data = await res.json();
  return data.products;
}
