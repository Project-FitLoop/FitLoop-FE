'use client';

import { useCallback, useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import {
  fetchCartItems,
  removeFromCart,
  clearCart,
} from '@/services/api/cartApi';

interface CartItem {
  cartId: number;
  productId: number;
  productName: string;
  price: number;
  category: string;
  sellerNickname: string;
  sellerId: number;
  imageUrls: string[];
}

const CartPage = () => {
  const router = useRouter();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const hasLoaded = useRef(false);

  const loadCart = useCallback(async () => {
    try {
      const items = await fetchCartItems();
      setCartItems(items);
      setSelectedItems([]);
    } catch (err) {
      console.error('장바구니 로딩 실패:', err);
    }
  }, []);

  useEffect(() => {
    if (!hasLoaded.current) {
      loadCart();
      hasLoaded.current = true;
    }
  }, [loadCart]);

  const handleSelect = (productId: number) => {
    setSelectedItems(prev =>
      prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const handleSelectAll = () => {
    if (selectedItems.length === cartItems.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(cartItems.map(item => item.productId));
    }
  };

  const handleDeleteSelected = async () => {
    if (selectedItems.length === cartItems.length) {
      await clearCart();
    } else {
      for (const productId of selectedItems) {
        await removeFromCart(productId);
      }
    }
    await loadCart();
  };

  const total = cartItems
    .filter(item => selectedItems.includes(item.productId))
    .reduce((sum, item) => sum + item.price, 0);

  const groupedBySeller = cartItems
    .filter(item => selectedItems.includes(item.productId))
    .reduce((acc, item) => {
      if (!acc[item.sellerId]) {
        acc[item.sellerId] = {
          total: 0,
          sellerNickname: item.sellerNickname,
        };
      }
      acc[item.sellerId].total += item.price;
      return acc;
    }, {} as Record<number, { total: number; sellerNickname: string }>);

  const handleCheckout = () => {
    if (selectedItems.length === 0) return;
    router.push('/checkout');
  };

  return (
    <div className="bg-white flex flex-col flex-grow">
      <div className={`p-4 ${selectedItems.length === 0 ? 'pb-56' : 'pb-36'}`}>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={selectedItems.length === cartItems.length}
              onChange={handleSelectAll}
              className="appearance-none w-5 h-5 rounded-full border-4 mr-3 border-gray-300 checked:border-black checked:bg-white transition duration-150 ease-in-out"
            />
            <span className="text-sm font-semibold">전체 선택</span>
          </div>
          <button
            onClick={handleDeleteSelected}
            className="text-sm text-gray-400 font-medium"
          >
            상품 삭제
          </button>
        </div>

        <div className="space-y-3">
          {cartItems.map((item) => (
            <div key={item.cartId} className="flex items-center">
              <input
                type="checkbox"
                checked={selectedItems.includes(item.productId)}
                onChange={() => handleSelect(item.productId)}
                className="appearance-none w-5 h-5 rounded-full border-4 mr-3 border-gray-300 checked:border-black checked:bg-white transition duration-150 ease-in-out"
              />

              <div className="flex border rounded-lg overflow-hidden h-24 flex-1">
                <div className="w-24 h-full flex-shrink-0 bg-gray-100 relative">
                  <Image
                    src={item.imageUrls[0]}
                    alt={item.productName}
                    fill
                    sizes="96px"
                    style={{ objectFit: 'cover' }}
                  />
                </div>

                <div className="flex flex-col justify-center px-4 py-2 flex-1">
                  <p className="text-xs text-gray-400 mb-1 whitespace-nowrap overflow-hidden text-ellipsis">
                    {item.sellerNickname}
                  </p>
                  <p className="font-semibold text-sm whitespace-nowrap overflow-hidden text-ellipsis">
                    {item.productName}
                  </p>
                  <p className="text-xs text-gray-400 mt-1 whitespace-nowrap overflow-hidden text-ellipsis">
                    카테고리: {item.category}
                  </p>
                  <p className="text-sm font-bold mt-1 whitespace-nowrap overflow-hidden text-ellipsis">
                    {item.price.toLocaleString()}원
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="sticky bottom-0 px-4 pt-6 pb-4 border-t bg-white z-10">
        <h3 className="text-base font-bold mb-3">결제 예상 금액</h3>
        <div className="space-y-1 text-sm">
          {Object.entries(groupedBySeller).map(([sellerId, data]) => (
            <div key={sellerId} className="flex justify-between">
              <span>{data.sellerNickname}샵 상품 총 금액</span>
              <span>{data.total.toLocaleString()}원</span>
            </div>
          ))}
        </div>

        <hr className="my-4" />

        <div className="flex justify-between font-bold text-base mb-3">
          <span>총 상품 금액</span>
          <span>{total.toLocaleString()}원</span>
        </div>

        <button
          onClick={handleCheckout}
          disabled={selectedItems.length === 0}
          className={`w-full py-3 px-4 font-semibold text-sm flex flex-col items-center justify-center rounded-full
            ${selectedItems.length === 0 ? 'bg-gray-300 cursor-not-allowed text-white' : 'bg-black text-white'}`}
        >
          <div className="flex items-center gap-2">
            <span>{total.toLocaleString()}원 구매하기</span>
            <span className="bg-gray-400 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
              {selectedItems.length}
            </span>
          </div>
        </button>
      </div>
    </div>
  );
};

export default CartPage;
