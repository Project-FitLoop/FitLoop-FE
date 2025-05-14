'use client';

import Image from 'next/image';
import BackButton from '@/ui/components/common/BackButton';
import { useRouter } from 'next/navigation';

interface HeaderProps {
  title: string;
}

const Header = ({ title }: HeaderProps) => {
  const router = useRouter();

  return (
    <div className="flex items-center justify-between px-4 py-3 bg-white shadow-md">
      <div className="flex items-center space-x-2">
        <BackButton />
        <span className="text-lg text-black font-medium">{title}</span>
      </div>

      <div className="flex space-x-4">
        <button>
          <Image src="/assets/product-tab/search.svg" alt="검색" width={20} height={20} />
        </button>
        <button onClick={() => router.push('/cart')}>
          <Image src="/assets/product-tab/shopping-bag.svg" alt="장바구니" width={20} height={20} />
        </button>
      </div>
    </div>
  );
};

export default Header;
