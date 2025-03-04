import ProductCategoryPage from "@/ui/components/category/productCategory";

export default async function Page({ params }: { params: Promise<{ categoryCode: string }> }) {
  const resolvedParams = await params;

  return <ProductCategoryPage categoryCode={resolvedParams.categoryCode} />;
}
