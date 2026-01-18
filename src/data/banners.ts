export type BannerType =
  | 'COUPON_LIST'
  | 'COUPON_DETAIL'
  | 'EVENT_LIST'
  | 'EVENT_DETAIL'
  | 'PRODUCT_CATEGORY'
  | 'PRODUCT_DETAIL'
  | 'BRAND_CONTENT'
  | 'USER_ACTION'
  | 'EXTERNAL'
  | 'INTERNAL';

export interface BannerConfig {
  id: string;
  imageUrl: string;
  type: BannerType;
  target: string;
  title?: string;
  subtitle?: string;
  badge?: string;
  startAt?: string;
  endAt?: string;
}

// const s3BaseUrl = process.env.NEXT_PUBLIC_S3_BASE_URL ?? '';

export const bannerConfigs: BannerConfig[] = [
  {
    id: 'welcome-coupon-pack',
    imageUrl: '/assets/banners/banner_welcome_coupon.png',
    type: 'COUPON_DETAIL',
    target: '/coupon/welcome',
    title: '신규 회원 웰컴 쿠폰팩',
    subtitle: '첫 거래 시 추가 할인 혜택',
  },
  {
    id: 'winter-sale',
    imageUrl: '/assets/banners/banner_winter_sale.png',
    type: 'EVENT_DETAIL',
    target: '/event/winter-sale',
    title: '겨울 시즌 한정 세일',
    subtitle: '시즌 아이템 최대 30% 할인',
    badge: 'D-3',
  },
  {
    id: 'outer-category',
    imageUrl: '/assets/banners/banner_outer_category.png',
    type: 'PRODUCT_CATEGORY',
    target: '/product/category/002000?gf=A',
    title: '아우터만 모아보기',
    subtitle: '트렌디한 겨울 아우터 컬렉션',
  },
  {
    id: 'notice-banner',
    imageUrl: '/assets/banners/banner_notice.png',
    type: 'INTERNAL',
    target: '/notice',
    title: '새로운 공지사항을 확인하세요',
    subtitle: '이벤트, 업데이트 소식을 빠르게 받아보세요',
  },
  {
    id: 'weekly-challenge',
    imageUrl: '/assets/banners/banner_weekly_challenge.png',
    type: 'USER_ACTION',
    target: '/main/challenge',
    title: '이번 주 챌린지 참여하고',
    subtitle: '룩북 등록 시 포인트 적립!',
  },
];
