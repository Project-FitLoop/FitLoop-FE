'use client';

interface EventDetailPageProps {
  slug: string;
}

const EVENT_COPY: Record<
  string,
  {
    title: string;
    period: string;
    status: '진행중' | '종료' | '예정';
    content: string;
  }
> = {
  'winter-sale': {
    title: '겨울 시즌 한정 세일',
    period: '2025.11.01 ~ 2025.11.31',
    status: '진행중',
    content:
      '겨울 시즌 아이템을 최대 30% 할인된 가격으로 만나보세요.\n' +
      '- 인기 아우터, 니트, 머플러, 부츠 등 시즌 한정 특가\n' +
      '- 일부 품목은 재고 소진 시 조기 종료될 수 있습니다.\n\n' +
      '※ 쿠폰과 중복 적용 여부는 상품 상세 페이지에서 확인해 주세요.',
  },
  'review-event': {
    title: '리뷰 쓰고 포인트 받기',
    period: '2025.05.01 ~ 2025.05.31',
    status: '종료',
    content:
      '이벤트 기간 내 구매하신 상품에 솔직한 리뷰를 남겨주신 고객님 중\n' +
      '추첨을 통해 포인트를 지급해 드리는 이벤트였습니다.\n\n' +
      '* 당첨자 및 포인트 지급 관련 안내는 마이페이지 > 알림에서 확인할 수 있습니다.',
  },
};

export default function EventDetailPage({ slug }: EventDetailPageProps) {
  const event = EVENT_COPY[slug] ?? {
    title: '이벤트 상세',
    period: '',
    status: '종료' as const,
    content: '해당 이벤트 정보를 찾을 수 없습니다.',
  };

  const isActive = event.status === '진행중';

  const handleParticipate = () => {
    if (!isActive) return;
    alert('이벤트 참여 화면으로 이동한다고 가정하는 자리입니다.');
  };

  return (
    <div
      className="px-4 py-6"
      style={{ background: 'var(--bg-gray)', minHeight: '100vh' }}
    >
      <h1 className="text-lg font-semibold mb-1">{event.title}</h1>
      {event.period && (
        <p className="text-xs text-gray-500 mb-2">{event.period}</p>
      )}

      <span
        className="inline-block text-xs font-semibold px-2 py-0.5 rounded-full mb-4"
        style={{
          background: isActive
            ? 'rgba(0, 180, 120, 0.1)'
            : 'rgba(150, 150, 150, 0.08)',
          color: isActive ? 'var(--primary)' : 'rgba(120, 120, 120)',
        }}
      >
        {event.status}
      </span>

      <section
        className="rounded-md p-4 mb-4"
        style={{ background: 'var(--bg-white)' }}
      >
        <p className="text-sm text-gray-700 whitespace-pre-line">
          {event.content}
        </p>
      </section>

      <section
        className="rounded-md p-4 mb-4"
        style={{ background: 'var(--bg-white)' }}
      >
        <p className="text-sm font-semibold mb-2">참여 방법 및 유의사항</p>
        <ul className="text-sm text-gray-700 list-disc pl-4 space-y-1">
          <li>이벤트 기간 및 참여 조건을 반드시 확인해 주세요.</li>
          <li>부정 참여가 확인될 경우, 혜택이 회수될 수 있습니다.</li>
          <li>상세 내용은 공지사항 또는 고객센터를 통해 안내됩니다.</li>
        </ul>
      </section>

      {isActive && (
        <button
          className="w-full py-2 rounded-md text-sm font-semibold"
          style={{
            background: 'var(--primary)',
            color: 'var(--bg-white)',
          }}
          onClick={handleParticipate}
        >
          이벤트 참여하기
        </button>
      )}
    </div>
  );
}
