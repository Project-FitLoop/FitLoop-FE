"use client"
import React, { useState } from "react";
import { categories, subCategories } from "@/data/categories";
import { Modal } from "antd";
import { ExclamationCircleOutlined, RightOutlined } from "@ant-design/icons";

const ProductRegisterForm: React.FC = () => {
  const [productName, setProductName] = useState("");
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [price, setPrice] = useState("");
  const [isFree, setIsFree] = useState(false);
  const [includeShipping, setIncludeShipping] = useState(false);
  const [images, setImages] = useState<string[]>([]);
  const [productCondition, setProductCondition] = useState("");
  const [usedCondition, setUsedCondition] = useState("");
  const [productDescription, setProductDescription] = useState("");
  
  // 모달
  const [isNoticeModalOpen, setIsNoticeModalOpen] = useState(false);
  const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState(false);
  const [isUsedConditionModalOpen, setIsUsedConditionModalOpen] = useState(false);


  
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const uploadedFiles = Array.from(e.target.files).map((file) =>
        URL.createObjectURL(file)
      );
      setImages([...images, ...uploadedFiles]);
    }
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPrice(e.target.value);
    if (e.target.value === "") setIsFree(false);
  };

  const handleFreeClick = () => {
    if (isFree) {
      setIsFree(false);
      setPrice("");
    } else {
      setIsFree(true);
      setPrice("0");
    }
  };

  return (
    <div className="max-w-md w-full bg-white p-6 pb-20">
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

      {/* 대 카테고리 */}
      <div className="mb-4">
        <label className="text-gray-700 text-sm font-medium">카테고리</label>
        <select
          value={category}
          onChange={(e) => {
            setCategory(e.target.value);
            setSubCategory("");
          }}
          className="w-full p-3 border rounded-md mt-1 text-sm text-gray-900"
        >
          <option value="">대 카테고리 선택</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      {/* 중 카테고리 */}
      <div className="mb-4">
        <select
          value={subCategory}
          onChange={(e) => setSubCategory(e.target.value)}
          className="w-full p-3 border rounded-md mt-1 text-sm text-gray-900"
          disabled={!category}
        >
          <option value="">중 카테고리 선택</option>
          {category &&
            subCategories[category]?.map((sub) => (
              <option key={sub.code} value={sub.code}>
                {sub.name}
              </option>
            ))}
        </select>
      </div>

      {/* 판매 가격 */}
      <label className="text-gray-700 text-sm font-medium">판매 가격</label>
      <div className="mb-4 flex items-center space-x-2">
        <input
          type="number"
          placeholder="판매가격 입력"
          value={isFree ? "" : price}
          onChange={handlePriceChange}
          disabled={isFree}
          className="w-full p-3 border rounded-md text-sm text-gray-900"
        />
        <button
          onClick={handleFreeClick}
          className={`flex items-center justify-center px-4 py-2 rounded-md text-sm font-medium ${
            isFree ? "bg-gray-400 text-white" : "bg-gray-200 text-gray-900"
          }`}
          style={{ minWidth: "60px" }}
        >
          무료
        </button>
      </div>

      {/* 배송비 포함 여부 */}
      <div className="mb-4">
        <label className="text-gray-700 text-sm font-medium flex items-center">
          <input
            type="checkbox"
            checked={includeShipping}
            onChange={() => setIncludeShipping(!includeShipping)}
            className="mr-2"
          />
          배송비 포함
        </label>
      </div>

      {/* 상품 사진 */}
      <div className="mb-4">
        <label className="text-gray-700 text-sm font-medium">사진</label>
          <div className="flex flex-wrap gap-2 mt-2">
            {images.map((src, index) => (
              <img key={index} src={src} alt="상품 이미지" className="w-24 h-24 object-cover rounded-md border" />
            ))}
            <label className="w-24 h-24 flex items-center justify-center border rounded-md cursor-pointer text-gray-500 text-sm">
              +
              <input type="file" accept="image/*" onChange={handleImageUpload} multiple className="hidden" />
            </label>
          </div>
      </div>

      {/* 상품 상태 */}
      <div className="mb-4">
        <label className="text-gray-700 text-sm font-medium">상품 상태</label>
        <div className="flex space-x-2 mt-2">
          {["미개봉", "거의 새 상품", "중고"].map((condition) => (
            <button
              key={condition}
              className={`px-4 py-2 rounded-md text-sm font-medium ${
                productCondition === condition ? "bg-gray-900 text-white" : "bg-gray-200 text-gray-900"
              }`}
              onClick={() => setProductCondition(condition)}
            >
              {condition}
            </button>
          ))}
        </div>
      </div>
      {productCondition === "중고" && (
        <div className="mb-4">
          <div className="text-sm text-gray-600 cursor-pointer flex items-center" onClick={() => setIsUsedConditionModalOpen(true)}>
            <ExclamationCircleOutlined className="mr-2" />
            추가 중고 상품 상태 안내
            <RightOutlined className="ml-auto" />
          </div>
        </div>
      )}

      {/* 추가 중고 상품 상태 */}
      {productCondition === "중고" && (
        <div className="mb-4">
          <label className="text-gray-700 text-sm font-medium">추가 중고 상품 상태</label>
          <div className="flex space-x-2 mt-2">
            {["좋음", "보통", "나쁨"].map((condition) => (
              <button
                key={condition}
                className={`px-4 py-2 rounded-md text-sm font-medium ${
                  usedCondition === condition ? "bg-gray-900 text-white" : "bg-gray-200 text-gray-900"
                }`}
                onClick={() => setUsedCondition(condition)}
              >
                {condition}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* 상품 설명 (사용자 입력 가능) */}
      <div className="mb-4">
        <label className="text-gray-700 text-sm font-medium">상품 설명</label>
        <textarea
          placeholder="사이즈, 색상, 사용감, 사용기간, 브랜드명, 보증 기간 등 상세한 상품 정보를 입력하세요."
          value={productDescription}
          onChange={(e) => setProductDescription(e.target.value)}
          className="w-full p-3 border rounded-md mt-1 text-sm text-gray-900"
          style={{ minHeight: "120px" }} // 입력 가능하게 하고 크기 늘림
        />
      </div>

      {/* 주의사항 (모달로 상세 설명) */}
      <div className="mb-4 text-sm text-gray-600">
        <div
          className="py-2 border-b flex items-center text-gray-400 cursor-pointer"
          onClick={() => setIsNoticeModalOpen(true)}
        >
          <ExclamationCircleOutlined className="mr-2" />
          상품등록 완료 전에 읽어주세요
          <RightOutlined className="ml-auto" />
        </div>
        <div
          className="py-2 border-b flex items-center text-gray-400 cursor-pointer"
          onClick={() => setIsPrivacyModalOpen(true)}
        >
          <ExclamationCircleOutlined className="mr-2" />
          개인정보 제공 안내를 확인해주세요
          <RightOutlined className="ml-auto" />
        </div>
      </div>

      {/* 저장 버튼 */}
      <button
        className={`w-full p-3 text-white rounded-md font-medium ${
          productName && category && subCategory && price ? "bg-black" : "bg-gray-400"
        }`}
        disabled={!productName || !category || !subCategory || !price}
      >
        저장하기
      </button>

      {/* 상품 등록 안내 모달 */}
      <Modal
        title="상품 등록 안내"
        open={isNoticeModalOpen}
        onCancel={() => setIsNoticeModalOpen(false)}
        footer={null}
      >
        <p>상품 등록 시 반드시 정확한 정보를 입력해야 합니다.</p>
        <p>- 가격, 카테고리, 상품 설명을 정확하게 작성하세요.</p>
        <p>- 허위 정보를 등록할 경우 서비스 이용이 제한될 수 있습니다.</p>
        <p>- 판매 후 변경이 어려울 수 있으니 신중하게 입력해주세요.</p>
      </Modal>

      {/* 개인정보 제공 안내 모달 */}
      <Modal
        title="개인정보 제공 안내"
        open={isPrivacyModalOpen}
        onCancel={() => setIsPrivacyModalOpen(false)}
        footer={null}
      >
        <p>상품 거래와 관련하여 개인정보가 일부 제공될 수 있습니다.</p>
        <p>- 구매자가 원활한 거래를 위해 연락할 수 있도록 연락처가 공유될 수 있습니다.</p>
        <p>- 개인 정보 보호를 위해 등록된 정보는 암호화하여 저장됩니다.</p>
        <p>- 사용자의 동의 없이 제3자에게 제공되지 않습니다.</p>
      </Modal>

      {/* 추가 중고 상품 상태 모달 */}
      <Modal title="추가 중고 상품 상태 안내" open={isUsedConditionModalOpen} onCancel={() => setIsUsedConditionModalOpen(false)} footer={null}>
        <p>중고 상품의 상태를 정확하게 입력해주세요.</p>
        <p>- 좋음: 사용감이 적고 깨끗한 상태</p>
        <p>- 보통: 사용감이 있으나 기능상 문제 없음</p>
        <p>- 나쁨: 사용감이 크고 일부 흠집이 있을 수 있음</p>
      </Modal>
    </div>
  );
};

export default ProductRegisterForm;
