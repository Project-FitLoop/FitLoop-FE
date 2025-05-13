import { categories, subCategories } from "@/data/categories";

export const getCategoryInfoFromUrl = (
  pathname: string,
  searchParams: URLSearchParams
) => {
  const match = pathname.match(/\/product\/category\/(\d{3})(\d{3})?/);
  if (!match) return null;

  const mainCode = match[1];
  const subCode = match[2];
  const genderParam = searchParams.get("gf");

  // 해당 메인 카테고리에 해당하는 서브카테고리 목록
  const mainCategory = categories.find((cat) => cat.code === mainCode);
  if (!mainCategory) return null;
  const subList = subCategories[mainCategory.id] || [];

  const mainList = categories.map(({ code, name }) => ({
    code,
    name,
  }));

  return {
    categoryCode: mainCategory.code,
    categoryName: mainCategory.name,
    selectedSubCategoryCode: subCode,
    selectedGender: genderParam,
    subCategoryList: subList,
    mainCategoryList: mainList,
  };
};