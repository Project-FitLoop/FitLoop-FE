import Link from "next/link";
import Image from "next/image";

const Header = () => {
  return (
    <div className="flex items-center justify-between px-4 py-3 bg-white shadow-md">
      {/* 뒤로 가기 버튼 */}
      <Link href="/" className="flex items-center text-lg font-bold text-gray-800">
        <Image src="/assets/product-tab/left-arrow.svg" alt="뒤로 가기" width={20} height={20} className="mr-2" />
        상품
      </Link>

      <div className="flex space-x-4">
        <button>
          <Image src="/assets/product-tab/search.svg" alt="검색" width={20} height={20} />
        </button>
        <button>
          <Image src="/assets/product-tab/shopping-bag.svg" alt="장바구니" width={20} height={20} />
        </button>
      </div>
    </div>
  );
};

export default Header;
