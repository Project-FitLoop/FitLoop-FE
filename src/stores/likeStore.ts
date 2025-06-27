import { create } from 'zustand';

interface LikeStore {
  likedProductIds: Set<number>;
  likeCountMap: Map<number, number>;

  setLiked: (productId: number, liked: boolean) => void;
  setLikeCount: (productId: number, count: number) => void;
  toggleLike: (productId: number, liked: boolean) => void;

  isLiked: (productId: number) => boolean;
  getLikeCount: (productId: number) => number;
}

export const useLikeStore = create<LikeStore>((set, get) => ({
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
}));
