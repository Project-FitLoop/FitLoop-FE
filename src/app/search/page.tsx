'use client';

import SearchResult from '@/ui/components/search/SearchResult';
import FloatingActionButton from '@/ui/components/common/FloatingActionButton';

export default function SearchPage() {
  return (
    <div
      id="scrollable-container"
      style={{
        height: '100vh',
        overflowY: 'auto',
        scrollBehavior: 'smooth',
      }}
      className="scrollbar-hide"
    >
      <SearchResult />
      <FloatingActionButton />
    </div>
  );
}
