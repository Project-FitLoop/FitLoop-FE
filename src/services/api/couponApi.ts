import { instance } from '@/config/apiConfig';

export type DiscountType = "FIXED";
export type CouponStatus = "ACTIVE" | "PAUSED" | "EXPIRED";

export interface CouponRegisterPayload {
  couponName: string;
  description: string;
  discountType: DiscountType;
  discountValue: number;
  minOrderValue: number;
  maxDiscount?: number | null;
  validFrom: string;
  validTo: string;
}

export async function registerCoupon(payload: CouponRegisterPayload): Promise<string> {
  const res = await instance.post<string>("/coupon/register", payload);
  return res.data;
}

export interface CreatedCouponDTO {
  id: number;
  title: string;
  discountText: string;
  minOrderText: string;
  periodText: string;
  status: CouponStatus;
  issuedCount: number;
  usedCount: number;
}

export async function fetchMyCreatedCoupons(): Promise<CreatedCouponDTO[]> {
  const res = await instance.get<CreatedCouponDTO[]>("/coupon/created");
  return res.data;
}