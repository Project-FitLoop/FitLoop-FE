import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface LikeStore {
  likedProductIds: Set<number>;
  likeCountMap: Map<number, number>;

  setLiked: (productId: number, liked: boolean) => void;
  setLikeCount: (productId: number, count: number) => void;
  toggleLike: (productId: number, liked: boolean) => void;

  isLiked: (productId: number) => boolean;
  getLikeCount: (productId: number) => number;
}

export const useLikeStore = create<LikeStore>()(
  persist(
    (set, get) => ({
      likedProductIds: new Set(),
      likeCountMap: new Map(),

      setLiked: (productId, liked) =>
        set((state) => {
          const likedSet = new Set(state.likedProductIds);
          if (liked) {
            likedSet.add(productId);
          } else {
            likedSet.delete(productId);
          }
          return { likedProductIds: likedSet };
        }),

      setLikeCount: (productId, count) =>
        set((state) => {
          const map = new Map(state.likeCountMap);
          map.set(productId, count);
          return { likeCountMap: map };
        }),

      toggleLike: (productId, liked) =>
        set((state) => {
          const likedSet = new Set(state.likedProductIds);
          if (liked) {
            likedSet.add(productId);
          } else {
            likedSet.delete(productId);
          }

          const map = new Map(state.likeCountMap);
          const prevCount = map.get(productId) ?? 0;
          map.set(productId, liked ? prevCount + 1 : Math.max(prevCount - 1, 0));

          return { likedProductIds: likedSet, likeCountMap: map };
        }),

      isLiked: (productId) => get().likedProductIds.has(productId),
      getLikeCount: (productId) => get().likeCountMap.get(productId) ?? 0,
    }),
    {
      name: 'like-storage',
      storage: {
        getItem: (name) => {
          try {
            let str = null;

            if (typeof window !== 'undefined') {
              str = localStorage.getItem(name); 
            }
            if (!str) return null;

            const raw = JSON.parse(str);
            return {
              state: {
                ...raw.state,
                likedProductIds: new Set(raw.state.likedProductIds),
                likeCountMap: new Map(raw.state.likeCountMap),
              },
            };
          } catch (e) {
            console.error('로컬스토리지에서 like-store 파싱 실패:', e);
            return null;
          }
        },
        setItem: (name, value) => {
          try {
            const state = {
              ...value,
              state: {
                ...value.state,
                likedProductIds: Array.from(value.state.likedProductIds),
                likeCountMap: Array.from(value.state.likeCountMap.entries()),
              },
            };
            localStorage.setItem(name, JSON.stringify(state));
          } catch (e) {
            console.error('로컬스토리지에 like-store 저장 실패:', e);
          }
        },
        removeItem: (name) => localStorage.removeItem(name),
      },
    }
  )
);