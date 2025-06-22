"use client";

import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Card, Typography, Button, List, Space, Image, Carousel } from "antd";
import { SettingOutlined } from "@ant-design/icons";
import BackButton from "@/ui/components/common/BackButton";
import { fetchRecentViewedProducts } from "@/services/api/recentViewedApi";
import ProductCard from "@/ui/components/common/ProductCard";
import { ProductResponse } from "@/services/api/productApi";

const { Title, Text } = Typography;

const MyPage: React.FC = () => {
  const router = useRouter();
  const [recentViewed, setRecentViewed] = useState<ProductResponse[]>([]);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const loadRecentViewed = async () => {
      try {
        const result = await fetchRecentViewedProducts();
        setRecentViewed(result);
      } catch (err) {
        console.error("최근 본 상품 불러오기 실패:", err);
      }
    };
    loadRecentViewed();
  }, []);

  useEffect(() => {
    const slider = scrollRef.current;
    if (!slider) return;

    let isDown = false;
    let startX = 0;
    let scrollLeft = 0;
    let isDragging = false;
    let targetScrollLeft = 0;
    let animationFrame: number;

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const animate = () => {
      slider.scrollLeft = lerp(slider.scrollLeft, targetScrollLeft, 0.2);
      if (Math.abs(slider.scrollLeft - targetScrollLeft) > 0.5) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    const onMouseDown = (e: MouseEvent) => {
      isDown = true;
      isDragging = false;
      startX = e.pageX;
      scrollLeft = slider.scrollLeft;
      cancelAnimationFrame(animationFrame);
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDown) return;
      const x = e.pageX;
      const walk = x - startX;
      if (Math.abs(walk) > 5) {
        isDragging = true;
        targetScrollLeft = scrollLeft - walk;
        cancelAnimationFrame(animationFrame);
        animationFrame = requestAnimationFrame(animate);
      }
    };

    const onMouseUp = () => {
      isDown = false;
      if (isDragging) {
        const preventClick = (e: MouseEvent) => {
          e.stopPropagation();
          e.preventDefault();
          slider.removeEventListener("click", preventClick, true);
        };
        slider.addEventListener("click", preventClick, true);
      }
    };

    slider.addEventListener("mousedown", onMouseDown);
    slider.addEventListener("mousemove", onMouseMove);
    slider.addEventListener("mouseup", onMouseUp);
    slider.addEventListener("mouseleave", onMouseUp);

    slider.querySelectorAll("*").forEach((el) => {
      (el as HTMLElement).style.userSelect = "none";
      (el as HTMLElement).setAttribute("draggable", "false");
    });

    return () => {
      cancelAnimationFrame(animationFrame);
      slider.removeEventListener("mousedown", onMouseDown);
      slider.removeEventListener("mousemove", onMouseMove);
      slider.removeEventListener("mouseup", onMouseUp);
      slider.removeEventListener("mouseleave", onMouseUp);
    };
  }, [recentViewed]);

  const s3BaseUrl = process.env.NEXT_PUBLIC_S3_BASE_URL ?? "";
  const banners = Array.from({ length: 5 }, (_, i) => `${s3BaseUrl}advertisement_${i + 1}.png`);

  return (
    <div
      id="scrollable-container"
      className="max-w-[400px] mx-auto p-0 bg-[var(--bg-gray)] min-h-screen pb-[60px] overflow-auto"
    >
      <div className="bg-[var(--bg-white)] p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BackButton />
            <Title level={4} className="m-0 text-[var(--text-black)]">
              마이페이지
            </Title>
          </div>
          <SettingOutlined
            className="text-[var(--icon-black)] text-lg cursor-pointer"
            onClick={() => router.push("/settings")}
          />
        </div>
        <div className="mt-4">
          <Text strong className="text-[var(--text-black)]">빵순이님, 안녕하세요 :)</Text>
        </div>
        <Card className="mt-4 bg-[var(--bg-light-gray)] rounded-xl" styles={{ body: { display: "flex", alignItems: "center", justifyContent: "space-between" } }}>
          <div className="flex items-center">
            <Image src="/assets/sprout.png" alt="새싹" width={40} preview={false} />
            <div className="ml-2">
              <Text strong className="text-[var(--text-black)]">새싹</Text>
              <br />
              <Text className="text-[var(--text-gray)] text-xs">마일리지 1.5% 적립 & 쿠폰팩</Text>
            </div>
          </div>
          <Button className="bg-white text-black border border-gray-300 hover:bg-gray-100 transition" size="small">혜택 보기</Button>
        </Card>
        <Card className="mt-4">
          <Space size="large" wrap={false}>
            {["구매내역", "판매내역", "리뷰", "쿠폰", "포인트"].map((label, index) => (
              <div key={label}>
                <Text className="text-[var(--text-gray)] text-xs">{label}</Text>
                <br />
                <Text strong className="text-[var(--text-black)] text-sm">{["34", "100", "3", "5", "1,000p"][index]}</Text>
              </div>
            ))}
          </Space>
        </Card>
      </div>

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

      <Card className="mt-4 rounded-none">
        <Text className="text-[var(--text-black)] text-base font-semibold block mb-2">최근 본 상품</Text>
        <div
          ref={scrollRef}
          className="flex gap-3 overflow-x-scroll scrollbar-hide cursor-grab px-1"
          style={{ scrollBehavior: "auto" }}
        >
          {recentViewed.length > 0 ? (
            recentViewed.map((product) => (
              <div key={product.id} className="min-w-[160px] max-w-[160px] flex-shrink-0 shadow-sm" style={{ background: "var(--bg-white)" }}>
                <ProductCard
                  variant="recent"
                  product={{
                    id: product.id,
                    name: product.name,
                    imageUrl: product.imageUrls?.[0] ?? "/assets/product/no-image.png",
                    price: product.free ? "무료나눔" : `${product.price.toLocaleString()}원`,
                    tags: product.tags ?? [],
                    likedByMe: product.likedByMe,
                    likeCount: product.likeCount,
                  }}
                />
              </div>
            ))
          ) : (
            <Text className="text-[var(--text-gray)]">최근 본 상품이 없습니다.</Text>
          )}
        </div>
      </Card>

      <div className="mt-4 p-4">
        <Title level={5} className="mb-2 text-[var(--text-black)]">(주) 핏루프 사업자 정보</Title>
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
