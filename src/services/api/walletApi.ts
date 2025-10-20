import { instance } from "@/config/apiConfig";

export const fetchWalletBalance = async (): Promise<number> => {
  try {
    const response = await instance.get<{ balance: number }>("/wallets/balance");
    return response.data.balance;
  } catch (error) {
    console.error("지갑 잔액 조회 실패:", error);
    throw new Error("지갑 잔액을 불러오지 못했습니다.");
  }
};