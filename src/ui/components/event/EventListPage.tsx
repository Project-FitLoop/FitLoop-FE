import Link from 'next/link';

const dummyEvents = [
  {
    slug: 'winter-sale',
    title: '겨울 시즌 한정 세일',
    status: '진행중',
    period: '2025.11.01 ~ 2025.11.31',
    highlight: '시즌 아이템 최대 30% 할인',
  },
  {
    slug: 'review-event',
    title: '리뷰 쓰고 포인트 받기',
    status: '종료',
    period: '2025.05.01 ~ 2025.05.31',
    highlight: '리뷰 작성 시 포인트 추첨 지급',
  },
];

export default function EventListPage() {
  return (
    <div
      className="px-4 py-6"
      style={{ background: 'var(--bg-gray)', minHeight: '100vh' }}
    >
      <h1 className="text-lg font-semibold mb-4">이벤트</h1>

      <section className="space-y-3">
        {dummyEvents.map((ev) => (
          <Link
            key={ev.slug}
            href={`/event/${ev.slug}`}
            className="block rounded-md px-4 py-3"
            style={{ background: 'var(--bg-white)' }}
          >
            <div className="flex justify-between items-start gap-3">
              <div className="flex-1">
                <p className="text-sm font-semibold mb-1">{ev.title}</p>
                <p className="text-xs text-gray-500 mb-1">{ev.period}</p>
                <p className="text-xs text-gray-600 line-clamp-1">
                  {ev.highlight}
                </p>
              </div>
              <span
                className="text-xs font-semibold px-2 py-0.5 rounded-full whitespace-nowrap mt-1"
                style={{
                  background:
                    ev.status === '진행중'
                      ? 'rgba(0, 180, 120, 0.1)'
                      : 'rgba(150, 150, 150, 0.1)',
                  color:
                    ev.status === '진행중'
                      ? 'var(--primary)'
                      : 'rgba(120, 120, 120)',
                }}
              >
                {ev.status}
              </span>
            </div>
          </Link>
        ))}
      </section>
    </div>
  );
}
