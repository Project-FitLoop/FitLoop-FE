"use client"
import React, { useState, useRef } from "react";
import { categories, subCategories } from "@/data/categories";
import { Modal } from "antd";
import { ExclamationCircleOutlined, RightOutlined } from "@ant-design/icons";
import { registerProduct } from "@/services/api/productRegister";
import BackButton from "@/ui/components/common/BackButton";

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

  const fileInputRef = useRef<HTMLInputElement>(null);

  
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const uploadedFiles = Array.from(e.target.files).map((file) =>
        URL.createObjectURL(file)
      );
      setImages([...images, ...uploadedFiles]);
      e.target.value = "";
    }
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

  const handleRemoveImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }; 

  const handleSave = async () => {
    if (!productName || !category || !subCategory || !price) {
      alert("모든 필수 정보를 입력해주세요.");
      return;
    }
  
    const formData = {
      productName,
      category,
      subCategory,
      price: isFree ? 0 : parseInt(price, 10),
      isFree,
      includeShipping,
      images, // 이미지 URL 리스트
      productCondition,
      usedCondition: productCondition === "중고" ? usedCondition : null,
      productDescription,
    };
  
    try {
      const response = await registerProduct(formData);
      alert("상품이 성공적으로 등록되었습니다.");
  
      setProductName("");
      setCategory("");
      setSubCategory("");
      setPrice("");
      setIsFree(false);
      setIncludeShipping(false);
      setImages([]);
      setProductCondition("");
      setUsedCondition("");
      setProductDescription("");
    } catch (error) {
      alert("상품 등록 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className="max-w-md w-full bg-[var(--bg-white)] p-6 pb-20">
      <div className="flex items-center gap-2 mb-4">
        <BackButton />
        <h2 className="text-lg font-semibold text-[var(--text-black)]">
          상품 등록
        </h2>
      </div>
      <hr className="border-[var(--border-gray)] mb-4" />

      {/* 상품명 */}
      <div className="mb-10">
        <label className="text-[var(--text-dark-gray)] text-lg font-semibold">상품명</label>
        <input
          type="text"
          maxLength={30}
          placeholder="최대 30자까지 입력 가능"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          className="w-full p-3 border border-[var(--border-light-gray)] rounded-md mt-1 text-sm text-[var(--text-black)]"
        />
      </div>

      {/* 대 카테고리 */}
      <div className="mb-1">
        <label className="text-[var(--text-dark-gray)] text-lg font-semibold">카테고리</label>
        <select
          value={category}
          onChange={(e) => {
            setCategory(e.target.value);
            setSubCategory("");
          }}
          className="w-full p-3 border border-[var(--border-light-gray)] rounded-md mt-1 text-sm text-[var(--text-dark-gray)]"
        >
          <option value="">카테고리 선택</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.name}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      {/* 중 카테고리 */}
      <div className="mb-10">
        <select
          value={subCategory}
          onChange={(e) => setSubCategory(e.target.value)} // 이름 저장
          className="w-full p-3 border border-[var(--border-light-gray)] rounded-md mt-1 text-sm text-[var(--text-dark-gray)]"
          disabled={!category}
        >
          <option value="">상세 카테고리 선택</option>
          {category &&
            subCategories[
              categories.find(cat => cat.name === category)?.id || ""
            ]?.map((sub) => (
              <option key={sub.code} value={sub.name}>
                {sub.name}
              </option>
            ))}
        </select>
      </div>

      {/* 판매 가격 */}
      <label className="text-[var(--text-dark-gray)] text-lg font-semibold">판매가격</label>
      <div className="mb-1 flex items-center space-x-2">
        <input
          type="number"
          placeholder="판매가격 입력"
          value={isFree ? "" : price}
          onChange={(e) => {
            let value = e.target.value;
            let numericValue = parseInt(value, 10);
            if (isNaN(numericValue) || numericValue < 0) {
              numericValue = 0;
            }
            setPrice(numericValue.toString());
          }}
          onBlur={() => {
            let numericValue = parseInt(price, 10);
            if (numericValue % 10 !== 0) {
              setPrice("0");
            }
          }}
          disabled={isFree}
          className="w-full p-3 border border-[var(--border-light-gray)] rounded-md text-sm text-[var(--text-dark-gray)]"
        />
        <button
          onClick={handleFreeClick}
          className={`flex items-center justify-center px-4 py-2 rounded-md text-sm font-medium border whitespace-nowrap
            ${isFree ? "bg-[var(--bg-dark-gray)] text-[var(--text-white)] border-[var(--border-gray)]" 
                    : "bg-[var(--bg-white)] text-[var(--text-dark-gray)] border-[var(--border-light-gray)]"}`}
          style={{ minWidth: "60px" }}
        >
          무료
        </button>
      </div>

      {/* 배송비 포함 여부 */}
      <div className="mb-10">
        <label className="text-[var(--text-gray)] text-sm font-medium flex items-center cursor-pointer">
          <div
            className={`w-4 h-4 flex items-center justify-center rounded-full border 
              ${includeShipping ? "bg-[var(--bg-dark-gray)] " : "bg-[var(--bg-white)] border-[var(--border-light-gray)]"}`}
            onClick={() => setIncludeShipping(!includeShipping)}
          >
            {includeShipping && <div className="w-1.5 h-1.5 bg-[var(--icon-white)] rounded-full"></div>}
          </div>
          <span className={`ml-2 ${includeShipping ? "text-[var(--text-black)]" : "text-[var(--text-gray)]"}`}>
            배송비 포함
          </span>
        </label>
      </div>

      {/* 상품 사진 (여러 장 가능) */}
      <div className="mb-10">
        <label className="text-[var(--text-dark-gray)] text-lg font-semibold">사진</label>
        <div className="flex flex-wrap gap-2 mt-2">
          {images.map((src, index) => (
            <div key={index} className="relative w-24 h-24">
              <img 
                src={src} 
                alt="상품 이미지" 
                className="w-full h-full object-cover rounded-md border border-[var(--border-light-gray)]"
              />
              <button
                onClick={() => handleRemoveImage(index)}
                className="absolute top-1 right-1 bg-[rgba(0,0,0,0.6)] text-white text-xs p-1 rounded-full hover:bg-[rgba(0,0,0,0.8)] transition"
              >
                ✕
              </button>
            </div>
          ))}
          <label className="w-24 h-24 flex items-center justify-center border border-[var(--border-light-gray)] rounded-md cursor-pointer text-[var(--text-gray)] text-sm">
            +
            <input type="file" accept="image/*" onChange={handleImageUpload} multiple className="hidden" />
          </label>
        </div>
      </div>

      {/* 상품 상태와 추가 중고 상품 상태 */}
      <div className="mb-10">
        <div>
          <label className="text-[var(--text-dark-gray)] text-lg font-semibold">상품상태</label>
          <div className="flex space-x-2 mt-2">

            {["미개봉", "거의 새 상품", "중고"].map((condition) => (
              <button
                key={condition}
                className={`px-4 py-2 rounded-md text-sm font-medium border 
                  ${
                    productCondition === condition
                      ? "border-[var(--border-gray)] bg-[var(--bg-dark-gray)] text-[var(--text-white)]"
                      : "border-[var(--border-gray)] bg-[var(--bg-white)] text-[var(--text-dark-gray)]"
                  }`}
                onClick={() => setProductCondition(condition)}
              >
                {condition}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-2">
          <div
            className="text-sm text-[var(--text-gray)] cursor-pointer flex items-center"
            onClick={() => setIsUsedConditionModalOpen(true)}
          >
              <ExclamationCircleOutlined className="mr-2" />
                상품 상태 안내
              <RightOutlined className="ml-auto" />
          </div>
        </div>

        {productCondition === "중고" && (
          <div className="mt-2">

            {/* 추가 중고 상품 상태 */}
            <div className="mt-6">
            <label className="text-[var(--text-dark-gray)] text-lg font-semibold">추가 중고 상품 상태</label>
              <div className="flex space-x-2 mt-2">
                {["좋음", "보통", "나쁨"].map((condition) => (
                  <button
                    key={condition}
                    className={`px-4 py-2 rounded-md text-sm font-medium border ${
                      usedCondition === condition                       
                      ? "border-[var(--border-gray)] bg-[var(--bg-dark-gray)] text-[var(--text-white)]"
                      : "border-[var(--border-gray)] bg-[var(--bg-white)] text-[var(--text-dark-gray)]"
                    }`}
                    onClick={() => setUsedCondition(condition)}
                  >
                    {condition}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>


      {/* 상품 설명 (사용자 입력 가능) */}
      <div className="mb-4">
      <label className="text-[var(--text-black)] text-lg font-semibold">상품 설명</label>
        <textarea
          placeholder="사이즈, 색상, 사용감, 사용기간, 브랜드명, 보증 기간 등 상세한 상품 정보를 입력하면 더욱 수월하게 거래 할 수 있습니다"
          value={productDescription}
          onChange={(e) => setProductDescription(e.target.value)}
          className="w-full p-3 border border-[var(--border-light-gray)] rounded-md mt-1 text-sm text-[var(--text-black)]"
          style={{ minHeight: "120px" }}
        />
      </div>

      {/* 주의사항 (모달로 상세 설명) */}
      <div className="mb-4 text-sm text-gray-600">
        <div
          className="py-2 border-b border-[var(--border-light-gray)] flex items-center text-[var(--text-gray)] cursor-pointer"
          onClick={() => setIsNoticeModalOpen(true)}
        >
          <ExclamationCircleOutlined className="mr-2" />
          상품등록 완료 전에 읽어주세요
          <RightOutlined className="ml-auto" />
        </div>
        <div
          className="py-2 border-b border-[var(--border-light-gray)] flex items-center text-[var(--text-gray)] cursor-pointer"
          onClick={() => setIsPrivacyModalOpen(true)}
        >
          <ExclamationCircleOutlined className="mr-2" />
          개인정보 제공 안내를 확인해주세요
          <RightOutlined className="ml-auto" />
        </div>
      </div>

      {/* 저장 버튼 */}
      <button
        onClick={handleSave}
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
      <Modal title="추가 상품 안내" open={isUsedConditionModalOpen} onCancel={() => setIsUsedConditionModalOpen(false)} footer={null}>
        <p>※ 상품의 상태를 정확하게 입력해주세요.</p>
        <p>- 거의 새 상품: 사용하지 않고 포장만 개봉된 상태</p>
        <p>※ 중고 상품의 경우</p>
        <p>- 좋음: 사용감이 적고 깨끗한 상태</p>
        <p>- 보통: 사용감이 있으나 기능상 문제 없음</p>
        <p>- 나쁨: 사용감이 크고 일부 흠집이 있을 수 있음</p>
      </Modal>
    </div>
  );
};

export default ProductRegisterForm;
