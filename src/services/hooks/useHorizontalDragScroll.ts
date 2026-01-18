"use client";

import { useRef } from "react";

export default function useHorizontalDragScroll<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const state = useRef({
    isDown: false,
    startX: 0,
    scrollLeft: 0,
  });

  const onMouseDown = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    state.current.isDown = true;
    state.current.startX = e.pageX - el.offsetLeft;
    state.current.scrollLeft = el.scrollLeft;
    el.style.cursor = "grabbing";
  };

  const onMouseLeave = () => {
    const el = ref.current;
    if (!el) return;
    state.current.isDown = false;
    el.style.cursor = "grab";
  };

  const onMouseUp = () => {
    const el = ref.current;
    if (!el) return;
    state.current.isDown = false;
    el.style.cursor = "grab";
  };

  const onMouseMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el || !state.current.isDown) return;
    e.preventDefault();
    const x = e.pageX - el.offsetLeft;
    const walk = (x - state.current.startX) * 1.2; // 드래그 감도
    el.scrollLeft = state.current.scrollLeft - walk;
  };

  const onWheel = (e: React.WheelEvent) => {
    const el = ref.current;
    if (!el) return;
    if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
      el.scrollLeft += e.deltaY;
      e.preventDefault();
    }
  };

  return {
    ref,
    bind: {
      onMouseDown,
      onMouseLeave,
      onMouseUp,
      onMouseMove,
      onWheel,
    },
  };
}
