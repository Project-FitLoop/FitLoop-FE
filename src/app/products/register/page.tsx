import ProductRegisterForm from '@/ui/components/product/ProductRegisterForm';

const ProductRegisterPage = () => {
  return (
    <div className="h-screen flex flex-col bg-white">
      <ProductRegisterForm />
      <div className="h-16 bg-gray-100 flex items-center justify-center border-t">
        <span className="text-gray-600 text-sm"></span>
      </div>
    </div>
  );
};

export default ProductRegisterPage;
