"use client"
import React, { useState } from "react";

const ProductRegisterForm: React.FC = () => {
  const [productName, setProductName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [isFree, setIsFree] = useState(false);
  const [includeShipping, setIncludeShipping] = useState(false);
  const [image, setImage] = useState<string | null>(null);
  const [productCondition, setProductCondition] = useState("");
  const [usedCondition, setUsedCondition] = useState("");

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPrice(e.target.value);
    if (e.target.value === "") setIsFree(false);
  };

  const handleFreeClick = () => {
    setIsFree(true);
    setPrice("0");
  };

  return (
    <div className="max-w-md w-full bg-white p-6 pb-16">
      {/* 제목 */}
      <h2 className="text-lg font-semibold text-gray-900 text-center mb-4">상품 1 설정</h2>
      <hr className="border-gray-300 mb-4" />

      {/* 상품명 */}
      <div className="mb-4">
        <label className="text-gray-700 text-sm font-medium">상품명</label>
        <input
          type="text"
          maxLength={30}
          placeholder="최대 30자까지 입력 가능"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          className="w-full p-3 border rounded-md mt-1 text-sm text-gray-900"
        />
      </div>

      {/* 카테고리 */}
      <div className="mb-4">
        <label className="text-gray-700 text-sm font-medium">카테고리</label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full p-3 border rounded-md mt-1 text-sm text-gray-900"
        >
          <option value="">카테고리 선택</option>
          <option value="electronics">전자기기</option>
          <option value="fashion">패션</option>
          <option value="home">홈 & 리빙</option>
        </select>
      </div>

      {/* 판매 가격 */}
      <div className="mb-4 flex items-center space-x-2">
        <input
          type="number"
          placeholder="판매가격 입력"
          value={price}
          onChange={handlePriceChange}
          disabled={isFree}
          className="w-full p-3 border rounded-md text-sm text-gray-900"
        />
        <button
          onClick={handleFreeClick}
          className={`px-4 py-2 rounded-md text-sm font-medium ${
            isFree ? "bg-gray-400 text-white" : "bg-gray-200 text-gray-900"
          }`}
        >
          무료
        </button>
      </div>

      {/* 배송비 포함 여부 */}
      <div className="mb-4">
        <label className="text-gray-700 text-sm font-medium">배송비 포함</label>
        <div className="flex items-center mt-1">
          <input
            type="radio"
            name="shipping"
            checked={includeShipping}
            onChange={() => setIncludeShipping(!includeShipping)}
            className="mr-2"
          />
          <span className="text-sm text-gray-900">배송비 포함</span>
        </div>
      </div>

      {/* 상품 사진 */}
      <div className="mb-4">
        <label className="text-gray-700 text-sm font-medium">사진</label>
        <div className="border rounded-md p-2 flex justify-center items-center h-24 w-24 mt-2">
          {image ? (
            <img src={image} alt="상품 미리보기" className="w-full h-full object-cover" />
          ) : (
            <label className="cursor-pointer">
              <span className="text-gray-500 text-sm">사진 추가</span>
              <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
            </label>
          )}
        </div>
      </div>

      {/* 상품 설명 */}
      <div className="mb-4">
        <label className="text-gray-700 text-sm font-medium">상품 설명</label>
        <textarea
          value="사이즈, 색상, 사용감, 사용기간, 브랜드명, 보증 기간 등 상세한 상품 정보를 입력하면 더욱 수월하게 거래할 수 있습니다."
          readOnly
          className="w-full p-3 border rounded-md mt-1 text-sm text-gray-900 bg-gray-100"
        />
      </div>

      {/* 주의사항 */}
      <div className="mb-4 text-sm text-gray-600">
        <div className="py-2 border-b">
          <span className="text-gray-500">상품등록 완료 전에 읽어주세요</span>
        </div>
        <div className="py-2 border-b">
          <span className="text-gray-500">개인정보 제공 안내를 확인해주세요</span>
        </div>
      </div>

      {/* 저장 버튼 */}
      <button
        className={`w-full p-3 text-white rounded-md font-medium ${
          productName && category && price ? "bg-black" : "bg-gray-400"
        }`}
        disabled={!productName || !category || !price}
      >
        저장하기
      </button>
    </div>
  );
};

export default ProductRegisterForm;
