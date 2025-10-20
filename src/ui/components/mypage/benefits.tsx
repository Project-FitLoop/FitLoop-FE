"use client";

import { Card, Typography, Progress, Tag, List, Space, Divider, Image, Tooltip } from "antd";
import { QuestionCircleOutlined, CheckCircleTwoTone } from "@ant-design/icons";
import BackButton from "@/ui/components/common/BackButton";

const { Title, Text } = Typography;

type Tier = { key: string; color: string; baseRate: number; rule: string; perks: string[] };
type Props = {
  data: {
    user: {
      nickname: string;
      tier: string;
      level: number;
      progressToNextPercent: number;
      nextConditionLabel: string;
      coupons: string[];
      points: number;
    };
    tiers: Tier[];
  };
};

const EMOJI: Record<string, string[]> = {
  씨앗: ["🌰","🥜","🌾","🌻","🌷"],
  새싹: ["🌱","🌱","🌱","🌱","🌱"],
  잎새: ["🍃","🍃","🍃","🍃","🍃"],
  가지: ["🌿","🌿","🌿","🌿","🌿"], 
  열매: ["🍎","🍎","🍎","🍎","🍎"],
  나무: ["🌳","🌳","🌳","🌳","🌳"],
};

export default function BenefitPageClient({ data }: Props) {
  const { user, tiers } = data;
  const current = tiers.find(t => t.key === user.tier)!;

  return (
    <div className="max-w-[480px] mx-auto bg-[var(--bg-gray,#f7f7f8)] min-h-screen pb-[80px]">
      {/* 헤더 */}
      <div className="sticky top-0 z-10 bg-white border-b px-4 py-3 flex items-center gap-3">
        <BackButton className="text-lg cursor-pointer" />
        <Title level={4} className="m-0">등급 혜택</Title>
        <div className="ml-auto">
          <Tooltip title="등급 산정은 최근 3개월 누적 결제 기준입니다.">
            <QuestionCircleOutlined className="text-gray-500" />
          </Tooltip>
        </div>
      </div>

      <div className="p-4">
        {/* 현재 등급 카드 */}
        <Card
          style={{ borderRadius: 16, borderColor: current.color }}
          styles={{ body: { padding: 16 } }}
        >
          <Space direction="vertical" size="small" className="w-full">
            <Space className="w-full items-center justify-between">
              <Space size="small" align="center">
                <Image src="/assets/sprout.png" alt="등급" width={32} preview={false} />
                <Text className="text-gray-600">{user.nickname}님 현재 등급</Text>
              </Space>
              <Tag color={current.color} style={{ fontWeight: 600 }}>
                {user.tier} {user.level}
              </Tag>
            </Space>

            <Title level={5} style={{ margin: 0 }}>기본 적립 {current.baseRate}%</Title>
            <Text className="text-gray-600">{current.perks.join(" · ")}</Text>

            <div className="mt-2">
              <Progress percent={user.progressToNextPercent} strokeColor={current.color} showInfo={false} />
              <Text className="text-gray-600">{user.nextConditionLabel}</Text>
            </div>

            <Divider style={{ margin: "8px 0" }} />
            <Space className="w-full items-center justify-between">
              <Text className="text-gray-600">보유 포인트</Text>
              <Text strong>{user.points.toLocaleString()} P</Text>
            </Space>

            <Space direction="vertical" className="w-full">
              <Text className="text-gray-600">보유 쿠폰</Text>
              <Space wrap>
                {user.coupons.map(c => <Tag key={c}>{c}</Tag>)}
              </Space>
            </Space>
          </Space>
        </Card>

        {/* 등급 사다리 */}
        <Card className="mt-4" style={{ borderRadius: 16 }}>
          <Title level={5} className="m-0">등급 사다리</Title>
          <Text className="text-gray-600">최근 3개월 실적 기준으로 매월 1일 업데이트</Text>

          <div className="mt-3 overflow-x-auto scrollbar-hide">
            <div className="flex gap-3 min-w-max">
              {tiers.map((tier) => (
                <div key={tier.key} className="min-w-[110px]">
                  <div className="text-center mb-1" style={{ color: tier.color, fontWeight: 700 }}>
                    {tier.key}
                  </div>
                  <div className="flex items-end gap-[6px]">
                    {[1,2,3,4,5].map((lv) => {
                      const isCurrent = tier.key === user.tier && lv === user.level;
                      return (
                        <div key={lv} className="flex flex-col items-center justify-end">
                          <div
                            className="w-8 rounded-md flex items-center justify-center select-none"
                            style={{
                              height: 44 + lv * 8,
                              background: tier.color,
                              opacity: isCurrent ? 1 : 0.6,
                              boxShadow: isCurrent ? "0 0 0 2px rgba(0,0,0,0.08) inset" : undefined
                            }}
                          >
                            <span style={{ fontSize: 18 }}>
                              {EMOJI[tier.key]?.[lv - 1] ?? "•"}
                            </span>
                          </div>
                          <Text type="secondary" className="text-xs mt-1">{lv}</Text>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* 등급별 혜택 요약 */}
        <Card className="mt-4" style={{ borderRadius: 16 }}>
          <Title level={5} className="m-0">등급별 혜택 요약</Title>
          <List
            className="mt-2"
            itemLayout="vertical"
            dataSource={tiers}
            renderItem={(t) => (
              <List.Item key={t.key}>
                <Space className="w-full items-start justify-between">
                  <Space align="start">
                    <Tag color={t.color} style={{ fontWeight: 600 }}>{t.key}</Tag>
                    <Text>기본 적립 {t.baseRate}%</Text>
                  </Space>
                  <Text type="secondary" className="text-xs">{t.rule}</Text>
                </Space>
                <Space wrap className="mt-2">
                  {t.perks.map(p => (
                    <Tag key={p} icon={<CheckCircleTwoTone twoToneColor={t.color} />} color="default">
                      {p}
                    </Tag>
                  ))}
                </Space>
              </List.Item>
            )}
          />
        </Card>

        {/* 유의사항 */}
        <Card className="mt-4" style={{ borderRadius: 16 }}>
          <Title level={5} className="m-0">이용 안내</Title>
          <ul className="list-disc pl-5 mt-2 text-[13px] text-gray-600 space-y-1">
            <li>등급 산정은 결제 완료 금액 기준이며, 취소·환불 시 실적에서 제외됩니다.</li>
            <li>쿠폰 및 포인트는 일부 상품이나 기획전에서 사용이 제한될 수 있습니다.</li>
            <li>정책은 예고 없이 변경될 수 있으며, 변경 시 공지사항으로 안내됩니다.</li>
          </ul>
        </Card>

        <div className="h-4" />
      </div>
    </div>
  );
}
