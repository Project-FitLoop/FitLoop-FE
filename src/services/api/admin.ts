import axios from 'axios';
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

type CreateCouponTemplateReq = {
  name: string;
  code: string;
  discountType: 'FIXED' | 'PERCENT';
  discountValue: number;
  maxDiscount: number | null;
  minOrderAmount: number;
  validFrom: string | null;
  validUntil: string | null;
  validDaysAfterIssue: number | null;
  stackable: boolean;
  targetType: 'ALL' | 'SELLER' | 'PRODUCT' | 'CATEGORY';
  targetIdsCsv: string;
  status: 'ACTIVE' | 'PAUSED' | 'ARCHIVED';
  imageUrls?: string[];
};

export async function createCouponTemplate(body: CreateCouponTemplateReq) {
  const res = await axios.post(`${API_BASE_URL}/api/v1/admin/coupons/templates`, body, {
    withCredentials: true,
  });
  return res.data;
}

export async function issueCouponToUser(body: { templateCode: string; userId: number }) {
  const res = await axios.post(`${API_BASE_URL}/api/v1/admin/coupons/templates/issue`, body, {
    withCredentials: true,
  });
  return res.data;
}
