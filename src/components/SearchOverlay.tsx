'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

interface Props {
  onClose: () => void;
}

export default function SearchOverlay({ onClose }: Props) {
  const router = useRouter();
  const [searchInput, setSearchInput] = useState('');
  const [recentKeywords, setRecentKeywords] = useState<string[]>([]);

  const popularKeywords = [
    '트렌치코트', '운동화', '후드티', '롱부츠', '패딩',
    '슬랙스', '니트', '백팩', '모자', '가디건',
  ];

  useEffect(() => {
    const stored = localStorage.getItem('recentKeywords');
    if (stored) setRecentKeywords(JSON.parse(stored));
  }, []);

  const saveRecentKeyword = (keyword: string) => {
    const updated = [keyword, ...recentKeywords.filter(k => k !== keyword)].slice(0, 10);
    localStorage.setItem('recentKeywords', JSON.stringify(updated));
    setRecentKeywords(updated);
  };

  const executeSearch = (keyword: string) => {
    if (!keyword.trim()) return;
    saveRecentKeyword(keyword.trim());
    setSearchInput('');
    onClose();
    router.push(`/search?keyword=${encodeURIComponent(keyword.trim())}`);
  };

  const removeKeyword = (idx: number) => {
    const updated = recentKeywords.filter((_, i) => i !== idx);
    localStorage.setItem('recentKeywords', JSON.stringify(updated));
    setRecentKeywords(updated);
  };

  const clearAllKeywords = () => {
    localStorage.removeItem('recentKeywords');
    setRecentKeywords([]);
  };

  return (
    <div className="fixed inset-0 bg-white z-[1000] max-w-[400px] mx-auto w-full flex flex-col">
      <div className="px-4 pt-4 pb-2 flex items-center gap-2 border-b border-gray-200">
        <button onClick={onClose}>
          <Image src="/assets/common/left-arrow.svg" alt="뒤로가기" width={24} height={24} />
        </button>
        <div className="flex-1 bg-[#f5f5f5] rounded-full px-4 py-2">
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') executeSearch(searchInput);
            }}
            placeholder="상품, 태그, 챌린지 등을 검색해보세요"
            className="w-full bg-transparent outline-none text-sm text-gray-800"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 pb-4">
        {/* 최근 검색어 */}
        <div className="mt-5">
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-sm font-bold text-gray-900">최근 검색어</h2>
            {recentKeywords.length > 0 && (
              <button className="text-xs text-gray-400" onClick={clearAllKeywords}>전체삭제</button>
            )}
          </div>
          {recentKeywords.length === 0 ? (
            <p className="text-sm text-gray-400">최근 검색어가 없습니다.</p>
          ) : (
            <div className="flex flex-wrap gap-2">
              {recentKeywords.map((keyword, idx) => (
                <div
                  key={idx}
                  className="flex items-center px-3 py-1 rounded-full bg-[#f0f0f0] text-sm text-gray-800 border border-gray-200"
                >
                  <button onClick={() => executeSearch(keyword)} className="mr-1 font-medium">
                    {keyword}
                  </button>
                  <button className="text-gray-400 text-xs" onClick={() => removeKeyword(idx)}>✕</button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* 인기 검색어 */}
        <div className="mt-8">
          <h2 className="text-sm font-bold text-gray-900 mb-3">인기 검색어</h2>
          <ul className="grid grid-cols-2 gap-y-3 text-sm">
            {popularKeywords.map((keyword, idx) => (
              <li key={idx} className="flex items-center space-x-2">
                <span className="text-[#FF3B30] font-bold w-5 text-center text-sm">{idx + 1}</span>
                <button
                  onClick={() => executeSearch(keyword)}
                  className="text-gray-700 text-sm hover:underline"
                >
                  {keyword}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}