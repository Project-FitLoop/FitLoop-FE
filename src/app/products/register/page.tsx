import ProductRegisterForm from "@/ui/components/product/ProductRegisterForm";

const ProductRegisterPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center overflow-auto">
      <div className="w-full max-w-[400px]">
        <ProductRegisterForm />
      </div>
    </div>
  );
};

export default ProductRegisterPage;
