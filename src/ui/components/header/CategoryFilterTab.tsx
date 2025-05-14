import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { getCategoryInfoFromUrl } from "@/data/getCategoryInfo";
import HorizontalScrollFilter from "@/ui/components/common/HorizontalScrollFilter";
import { genderOptions } from "@/data/categories";

const CategoryFilterTab = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const info = getCategoryInfoFromUrl(pathname, searchParams);

  if (!info) return null;

  const {
    mainCategoryList,
    subCategoryList,
    selectedGender,
    selectedSubCategoryCode,
    categoryCode
  } = info;

  const handleGenderChange = (gender: string) => {
    const query = new URLSearchParams(searchParams.toString());
    query.set("gf", gender);
    router.push(`?${query.toString()}`);
  };

  const handleMainCategorySelect = (code: string) => {
    const query = new URLSearchParams(searchParams.toString());
    const url = `/product/category/${code}${selectedSubCategoryCode ?? "000"}?${query.toString()}`;
    router.push(url);
  };

  const handleSubCategorySelect = (code: string) => {
    const query = new URLSearchParams(searchParams.toString());
    const url = `/product/category/${categoryCode}${code}?${query.toString()}`;
    router.push(url);
  };

  return (
    <div className="flex flex-col px-4 py-2 space-y-2 border-b" style={{backgroundColor: "var(--bg-white)"}}>
      {/* 성별 필터 */}
      <div className="flex space-x-4">
        {genderOptions.map((option) => {
          const isSelected = selectedGender === option.value;
          return (
            <button
              key={option.value}
              onClick={() => handleGenderChange(option.value)}
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
      {/* 메인카테고리 필터 */}
      <HorizontalScrollFilter
        options={mainCategoryList.map((item) => ({
          label: item.name,
          value: item.code
        }))}
        selectedValue={categoryCode}
        onSelect={handleMainCategorySelect}
      />
      {/* 서브카테고리 필터 */}
      <HorizontalScrollFilter
        options={subCategoryList.map((item) => ({
          label: item.name,
          value: item.code
        }))}
        selectedValue={selectedSubCategoryCode ?? "000"}
        onSelect={handleSubCategorySelect}
      />
    </div>
  );
};

export default CategoryFilterTab;