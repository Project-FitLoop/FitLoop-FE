"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { Card, Typography, Button, List, Space, Image, Carousel } from "antd";
import { SettingOutlined } from "@ant-design/icons";
import BackButton from "@/ui/components/common/BackButton";

const { Title, Text } = Typography;

const MyPage: React.FC = () => {
  const router = useRouter();

  // S3 광고 배너 이미지 경로
  const s3BaseUrl = process.env.NEXT_PUBLIC_S3_BASE_URL ?? "";
  const banners = Array.from({ length: 5 }, (_, i) => `${s3BaseUrl}advertisement_${i + 1}.png`);

  return (
    <div
      id="scrollable-container"
      className="max-w-[400px] mx-auto p-0 bg-[var(--bg-gray)] min-h-screen pb-[60px] overflow-auto"
    >
      {/* 마이페이지 ~ 구매내역 */}
      <div className="bg-[var(--bg-white)] p-4">
        {/* 상단 네비게이션 */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BackButton />
            <Title level={4} className="m-0 text-[var(--text-black)]">마이페이지</Title>
          </div>

          <SettingOutlined
            className="text-[var(--icon-black)] text-lg cursor-pointer"
            onClick={() => router.push("/settings")}
          />
        </div>

        {/* 사용자 정보 */}
        <div className="mt-4">
          <Text strong className="text-[var(--text-black)]">빵순이님, 안녕하세요 :)</Text>
        </div>

        {/* 멤버십 카드 */}
        <Card
          className="mt-4 bg-[var(--bg-light-gray)] rounded-xl"
          styles={{
            body: { display: "flex", alignItems: "center", justifyContent: "space-between" },
          }}
        >
          <div className="flex items-center">
            <Image src="/assets/sprout.png" alt="새싹" width={40} preview={false} />
            <div className="ml-2">
              <Text strong className="text-[var(--text-black)]">새싹</Text>
              <br />
              <Text className="text-[var(--text-gray)] text-xs">
                마일리지 1.5% 적립 & 쿠폰팩
              </Text>
            </div>
          </div>
          <Button className="bg-white text-black border border-gray-300 hover:bg-gray-100 transition" size="small">
            혜택 보기
          </Button>
        </Card>

        {/* 사용자 데이터 */}
        <Card className="mt-4">
          <Space size="large" wrap={false}>
            {[
              { label: "구매내역", value: "34" },
              { label: "판매내역", value: "100" },
              { label: "리뷰", value: "3" },
              { label: "쿠폰", value: "5" },
              { label: "포인트", value: "1,000p" },
            ].map(({ label, value }) => (
              <div key={label}>
                <Text className="text-[var(--text-gray)] text-xs">{label}</Text>
                <br />
                <Text strong className="text-[var(--text-black)] text-sm">{value}</Text>
              </div>
            ))}
          </Space>
        </Card>
      </div>

      {/* 광고 배너 (Carousel 적용, S3 이미지 사용) */}
      <div className="mt-4 max-h-[250px] overflow-hidden">
        <Carousel autoplay dots>
          {banners.map((banner, index) => (
            <div key={index}>
              <Image
                src={banner}
                alt={`광고 ${index + 1}`}
                width="100%"
                height="auto"
                preview={false}
                className="object-cover max-h-[250px]"
              />
            </div>
          ))}
        </Carousel>
      </div>

      {/* 최근 본 상품 */}
      <Card className="mt-4 text-center h-[400px] rounded-none">
        <Text className="text-[var(--text-gray)]">최근 본 상품</Text>
      </Card>

      {/* 사업자 정보 */}
      <div className="mt-4 p-4">
        <Title level={5} className="mb-2 text-[var(--text-black)]">
          (주) 핏루프 사업자 정보
        </Title>
        <List size="small">
          {[
            { label: "대표이사", value: "곽지은" },
            { label: "주소", value: "경기도 성남시 분당구 판교역로" },
            { label: "문의 전화", value: "02-1234-5678" },
            { label: "이메일", value: "fitloop@gmail.com" },
          ].map(({ label, value }) => (
            <List.Item key={label} className="flex min-w-0">
              <Text className="text-[var(--text-gray)]">{label}</Text>
              <Text className="ml-2 text-[var(--text-black)] truncate">{value}</Text>
            </List.Item>
          ))}
        </List>
      </div>
    </div>
  );
};

export default MyPage;
