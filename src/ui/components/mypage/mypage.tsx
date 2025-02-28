"use client";
import React from "react";
import { Card, Button, Carousel } from "antd";
import { SettingOutlined } from "@ant-design/icons";
import styles from "./mypage.module.css";
import { useRouter } from "next/navigation";

const MyPage: React.FC = () => {
  const router = useRouter();
  return (
    <div className={`${styles.container} bg-[#F8F8F8] min-h-screen`}>
      {/* 상단 헤더 */}
      <div className="relative flex items-center mb-4 px-2">
        <h1 className="text-lg font-bold text-[#333] flex-1">마이페이지</h1>
        <SettingOutlined
          className="text-2xl text-[#999] cursor-pointer"
          onClick={() => router.push("/settings")}
        />
      </div>


      {/* 유저 인사 */}
      <div className="text-lg text-[#666] mb-4">빵순이님, 안녕하세요 :)</div>

      {/* 혜택 카드 (회색 배경) */}
      <Card className="flex items-center justify-between bg-[#F2F3F5] border-none p-3 rounded-lg">
        <div className="flex items-center space-x-3">
          <img src="/assets/sprout.png" alt="새싹" className="w-10 h-10 rounded-full" />
          <div className="flex flex-col">
            <span className="font-bold text-sm text-[#333]">새싹</span>
            <span className="text-xs text-[#666]">마일리지 1.5% 적립 & 쿠폰팩</span>
          </div>
        </div>
        <Button className="text-xs bg-[#EDEDED] text-[#333] px-3 py-1 rounded-full border border-[#E0E0E0]">
            혜택 보기
        </Button>
      </Card>

      {/*구매/판매/리뷰/포인트 - 가로 정렬 유지 */}
      <div className={`${styles.statsContainer} grid grid-cols-5 text-center text-[#333] text-sm mb-6`}>
        <div>
          <div className="font-bold text-lg">3</div>
          <div className="text-[#999] text-xs">구매내역</div>
        </div>
        <div>
          <div className="font-bold text-lg">1</div>
          <div className="text-[#999] text-xs">판매내역</div>
        </div>
        <div>
          <div className="font-bold text-lg">2</div>
          <div className="text-[#999] text-xs">리뷰</div>
        </div>
        <div>
          <div className="font-bold text-lg">3</div>
          <div className="text-[#999] text-xs">쿠폰</div>
        </div>
        <div>
          <div className="font-bold text-lg">1,000p</div>
          <div className="text-[#999] text-xs">포인트</div>
        </div>
      </div>

      {/* 회색 구분선 */}
      <div className={styles.divider} />

      {/* 광고 배너 (Carousel) */}
      <div className={styles.carouselWrapper}>
        <Carousel autoplay className={styles.carousel} dots={{ className: styles.dots }}>
          {["advertisement", "business", "marketing"].map((category, index) => (
            <div key={index} className={styles.banner}>
              <img
                src={`https://source.unsplash.com/400x150/?${category}`}
                alt={`광고 배너 ${index + 1}`}
                className={styles.bannerImage}
              />
            </div>
          ))}
        </Carousel>
      </div>

      {/* 회색 구분선 */}
      <div className={styles.divider} />

      {/* 사업자 정보 */}
      <Card className={`${styles.card} bg-white`}>
        <div className="text-md font-bold mb-2 text-[#333]">(주) 핏루프 사업자 정보</div>
        <div className="text-sm text-[#666] mb-1">
          <span className="font-bold">대표이사</span> 곽지은
        </div>
        <div className="text-sm text-[#666] mb-1">
          <span className="font-bold">주소</span> 경기도 성남시 분당구 판교역로
        </div>
        <div className="text-sm text-[#666] mb-1">
          <span className="font-bold">문의 전화</span> 02-1234-5678
        </div>
        <div className="text-sm text-[#666]">
          <span className="font-bold">이메일</span> fitloop@gmail.com
        </div>
      </Card>
    </div>
  );
};

export default MyPage;
