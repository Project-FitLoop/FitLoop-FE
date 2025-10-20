import { useEffect, useRef } from "react";

interface Option {
  label: string;
  value: string;
}

interface HorizontalScrollFilterProps {
  options: Option[];
  selectedValue: string;
  onSelect: (value: string) => void;
}

const HorizontalScrollFilter = ({
  options,
  selectedValue,
  onSelect,
}: HorizontalScrollFilterProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const selectedRef = useRef<HTMLButtonElement>(null);

  // 선택된 버튼을 중앙에 스크롤
  useEffect(() => {
    if (containerRef.current && selectedRef.current) {
      const container = containerRef.current;
      const selected = selectedRef.current;

      const offset =
        selected.offsetLeft -
        container.offsetLeft -
        container.clientWidth / 2 +
        selected.clientWidth / 2;

      container.scrollTo({
        left: offset,
        behavior: "smooth",
      });
    }
  }, [selectedValue]);

  return (
    <div
      ref={containerRef}
      className="flex overflow-x-auto scrollbar-hide no-scrollbar space-x-4"
    >
      {options.map((option) => {
        const isSelected = option.value === selectedValue;
        return (
          <button
            key={option.value}
            ref={isSelected ? selectedRef : null}
            onClick={() => onSelect(option.value)}
            className="whitespace-nowrap text-sm px-4 py-2 rounded-full transition"
            style={{
              backgroundColor: isSelected ? "var(--bg-dark-gray)" : "transparent",
              color: isSelected ? "var(--text-white)" : "var(--text-black)",
            }}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
};

export default HorizontalScrollFilter;