import BenefitPageClient from "@/ui/components/mypage/benefits";

export const dynamic = "force-dynamic";

async function getBenefitData() {
  return {
    user: {
      nickname: "빵순이",
      tier: "새싹",
      level: 1,
      progressToNextPercent: 65,
      nextConditionLabel: "다음 등급(잎새)까지 49,000원 남았어요",
      coupons: ["생일 축하 3천원", "무료배송 1회", "10% 할인(최대 5천원)"],
      points: 1250,
    },
    tiers: [
      { key: "씨앗", color: "#F6A623", baseRate: 1.0, rule: "최근 3개월 0원 이상", perks: ["웰컴 쿠폰팩", "기본 적립 1%"] },
      { key: "새싹", color: "#7ED321", baseRate: 1.5, rule: "최근 3개월 5만원 이상", perks: ["기본 적립 1.5%", "월 1회 무료배송"] },
      { key: "잎새", color: "#00C853", baseRate: 2.0, rule: "최근 3개월 15만원 이상", perks: ["기본 적립 2%", "생일 쿠폰팩"] },
      { key: "가지", color: "#00BCD4", baseRate: 2.5, rule: "최근 3개월 30만원 이상", perks: ["기본 적립 2.5%", "카테고리 추가 1%"] },
      { key: "열매", color: "#2979FF", baseRate: 3.0, rule: "최근 3개월 60만원 이상", perks: ["기본 적립 3%", "월 2회 무료배송", "이벤트 선참여"] },
      { key: "나무", color: "#3F51B5", baseRate: 4.0, rule: "최근 3개월 120만원 이상", perks: ["기본 적립 4%", "우선 상담", "교환/반품 1회 무상"] },
    ],
  };
}

export default async function Page() {
  const data = await getBenefitData();
  return <BenefitPageClient data={data} />;
}
