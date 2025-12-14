import { instance } from '@/config/apiConfig';

export type DiscountType = "FIXED";

export interface CouponRegisterPayload {
  couponName: string;
  description: string;
  discountType: DiscountType;
  discountValue: number;
  minOrderValue: number;
  maxDiscount: number;
  validFrom: string;
  validTo: string;
}

export async function registerCoupon(payload: CouponRegisterPayload) {
  const res = await instance.post("/coupon/register", payload);
  return res.data;
}
