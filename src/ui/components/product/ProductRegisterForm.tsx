"use client";
import React, { useState, useRef } from "react";
import { categories, subCategories } from "@/data/categories";
import { Modal, message } from "antd";
import { ExclamationCircleOutlined, RightOutlined } from "@ant-design/icons";
import { registerProduct } from "@/services/api/productApi";
import { uploadImages } from "@/services/api/imageUpload";
import BackButton from "@/ui/components/common/BackButton";
import Image from "next/image";
import { useRouter } from "next/navigation";

const ProductRegisterForm: React.FC = () => {
  const [productName, setProductName] = useState("");
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [price, setPrice] = useState("");
  const [isFree, setIsFree] = useState(false);
  const [includeShipping, setIncludeShipping] = useState(false);
  const [images, setImages] = useState<string[]>([]);
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [productCondition, setProductCondition] = useState("");
  const [usedCondition, setUsedCondition] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [gender, setGender] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [inputTag, setInputTag] = useState("");
  //화살표 상태
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isSubCategoryOpen, setIsSubCategoryOpen] = useState(false);
  // 모달
  const [isNoticeModalOpen, setIsNoticeModalOpen] = useState(false);
  const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState(false);
  const [isUsedConditionModalOpen, setIsUsedConditionModalOpen] =
    useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      const previews = files.map((file) => URL.createObjectURL(file));

      setImages((prev) => [...prev, ...previews]);
      setImageFiles((prev) => [...prev, ...files]);

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
    setImages((prev) => prev.filter((_, i) => i !== index));
    setImageFiles((prev) => prev.filter((_, i) => i !== index));

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleAddTag = () => {
    const trimmed = inputTag.trim();
    if (trimmed && !tags.includes(trimmed) && tags.length < 5) {
      setTags((prev) => [...prev, trimmed]);
      setInputTag("");
    }
  };

  const handleRemoveTag = (tag: string) => {
    setTags((prev) => prev.filter((t) => t !== tag));
  };

  const handleSave = async () => {
    if (
      !productName ||
      !category ||
      !subCategory ||
      !price ||
      !productCondition ||
      !gender ||
      (productCondition === "중고" && !usedCondition)
    ) {
      message.error("모든 필수 정보를 입력해주세요.");
      return;
    }

    let uploadedUrls: string[] = [];
    if (imageFiles.length > 0) {
      uploadedUrls = await uploadImages(imageFiles);
    }

    const finalProductCondition = usedCondition || productCondition;

    let finalSubCategory = subCategory;
    if (subCategory === "기타" || subCategory === "전체") {
      finalSubCategory = `${category}_${subCategory}`;
    }

    const formData = {
      productName,
      category,
      subCategory: finalSubCategory,
      price: isFree ? 0 : parseInt(price, 10),
      isFree,
      includeShipping,
      gender,
      images: uploadedUrls.length > 0 ? uploadedUrls : ["없음"],
      productCondition: finalProductCondition,
      productDescription,
      tags,
    };

    try {
      await registerProduct(formData);
      message.success("상품이 성공적으로 등록되었습니다.");
      images.forEach((src) => URL.revokeObjectURL(src));

      setProductName("");
      setCategory("");
      setSubCategory("");
      setPrice("");
      setIsFree(false);
      setIncludeShipping(false);
      setGender("");
      setImages([]);
      setImageFiles([]);
      setProductCondition("");
      setUsedCondition("");
      setProductDescription("");

      router.push("/products/complete");
    } catch {
      message.error("상품 등록 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className="max-w-md w-full bg-[var(--bg-white)] p-6 pb-10">
      <div className="flex items-center gap-2 mb-4">
        <BackButton />
        <h2 className="text-lg font-semibold text-[var(--text-black)]">
          상품 등록
        </h2>
      </div>
      <hr className="border-[var(--border-gray)] mb-4" />

      {/* 상품명 */}
      <div className="mb-10">
        <label className="text-[var(--text-dark-gray)] text-lg font-semibold">
          상품명
        </label>
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
        <label className="text-[var(--text-dark-gray)] text-lg font-semibold">
          카테고리
        </label>
        <div className="relative mt-1">
          <select
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
              setSubCategory("");
            }}
            onFocus={() => setIsCategoryOpen(true)}
            onBlur={() => setIsCategoryOpen(false)}
            className="w-full appearance-none p-3 pr-10 border border-[var(--border-light-gray)] rounded-md text-sm text-[var(--text-dark-gray)]"
          >
            <option value="">카테고리 선택</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.name}>
                {cat.name}
              </option>
            ))}
          </select>
          <div
            className={`absolute right-3 top-1/2 transform -translate-y-1/2 transition-transform duration-200 pointer-events-none text-[var(--text-gray)] ${
              isCategoryOpen ? "rotate-90" : ""
            }`}
          >
            <RightOutlined />
          </div>
        </div>
      </div>

      {/* 중 카테고리 */}
      <div className="mb-10">
        <label className="text-[var(--text-dark-gray)] text-lg font-semibold">
          상세 카테고리
        </label>
        <div className="relative mt-1">
          <select
            value={subCategory}
            onChange={(e) => setSubCategory(e.target.value)}
            onFocus={() => setIsSubCategoryOpen(true)}
            onBlur={() => setIsSubCategoryOpen(false)}
            disabled={!category}
            className="w-full appearance-none p-3 pr-10 border border-[var(--border-light-gray)] rounded-md text-sm text-[var(--text-dark-gray)] disabled:bg-[var(--bg-light-gray)]"
          >
            <option value="">상세 카테고리 선택</option>
            {category &&
              subCategories[
                categories.find((cat) => cat.name === category)?.id || ""
              ]
                ?.filter((sub) => sub.name !== "전체")
                .map((sub) => (
                  <option key={sub.code} value={sub.name}>
                    {sub.name}
                  </option>
                ))}
          </select>
          <div
            className={`absolute right-3 top-1/2 transform -translate-y-1/2 transition-transform duration-200 pointer-events-none text-[var(--text-gray)] ${
              isSubCategoryOpen ? "rotate-90" : ""
            }`}
          >
            <RightOutlined />
          </div>
        </div>
      </div>

      {/* 판매 가격 */}
      <label className="text-[var(--text-dark-gray)] text-lg font-semibold">
        판매가격
      </label>
      <div className="mb-1 flex items-center space-x-2">
        <input
          type="number"
          placeholder="판매가격 입력"
          value={isFree ? "" : price}
          onChange={(e) => {
            const value = e.target.value;
            let numericValue = parseInt(value, 10);
            if (isNaN(numericValue) || numericValue < 0) {
              numericValue = 0;
            }
            setPrice(numericValue.toString());
          }}
          onBlur={() => {
            const numericValue = parseInt(price, 10);
            if (numericValue % 10 !== 0) {
              setPrice("0");
            }
          }}
          disabled={isFree}
          className="w-full p-3 border border-[var(--border-light-gray)] rounded-md text-sm text-[var(--text-dark-gray)]"
        />
        <button
          onClick={handleFreeClick}
          className={`flex items-center justify-center px-4 py-2 rounded-md text-sm font-medium border whitespace-nowrap ${
            isFree
              ? "bg-[var(--bg-dark-gray)] text-[var(--text-white)] border-[var(--border-gray)]"
              : "bg-[var(--bg-white)] text-[var(--text-dark-gray)] border-[var(--border-light-gray)]"
          }`}
          style={{ minWidth: "60px" }}
        >
          무료
        </button>
      </div>

      {/* 배송비 포함 여부 */}
      <div className="mb-10">
        <label className="text-[var(--text-gray)] text-sm font-medium flex items-center cursor-pointer">
          <div
            className={`w-4 h-4 flex items-center justify-center rounded-full border ${
              includeShipping
                ? "bg-[var(--bg-dark-gray)]"
                : "bg-[var(--bg-white)] border-[var(--border-light-gray)]"
            }`}
            onClick={() => setIncludeShipping(!includeShipping)}
          >
            {includeShipping && (
              <div className="w-1.5 h-1.5 bg-[var(--icon-white)] rounded-full"></div>
            )}
          </div>
          <span
            className={`ml-2 ${
              includeShipping
                ? "text-[var(--text-black)]"
                : "text-[var(--text-gray)]"
            }`}
          >
            배송비 포함
          </span>
        </label>
      </div>

      {/* 사용대상 */}
      <div className="mb-10">
        <label className="text-[var(--text-dark-gray)] text-lg font-semibold">
          사용대상
        </label>
        <div className="flex justify-center space-x-2 mt-2">
          {["공용", "남성", "여성"].map((option) => (
            <button
              key={option}
              className={`min-w-[100px] px-4 py-2 rounded-md text-sm font-medium border text-center ${
                gender === option
                  ? "border-[var(--border-gray)] bg-[var(--bg-dark-gray)] text-[var(--text-white)]"
                  : "border-[var(--border-gray)] bg-[var(--bg-white)] text-[var(--text-dark-gray)]"
              }`}
              onClick={() => setGender(option)}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      {/* 상품 사진 (여러 장 가능) */}
      <div className="mb-10">
        <label className="text-[var(--text-dark-gray)] text-lg font-semibold">
          사진
        </label>
        <div className="flex flex-wrap gap-2 mt-2">
          {images.map((src, index) => (
            <div key={index} className="relative w-24 h-24">
              <Image
                src={src}
                alt="상품 이미지"
                layout="fill"
                objectFit="cover"
                className="rounded-md border border-[var(--border-light-gray)]"
                unoptimized
              />
              <button
                onClick={() => handleRemoveImage(index)}
                className="absolute top-1 right-1 bg-[rgba(0,0,0,0.6)] text-white text-xs p-1 rounded-full hover:bg-[rgba(0,0,0,0.8)] transition"
              >
                ✕
              </button>
            </div>
          ))}
          <label className="w-24 h-24 flex items-center justify-center border border-[var(--border-light-gray)] rounded-md cursor-pointer text-[var(--text-gray)] text-sm relative">
            +
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              multiple
              className="hidden"
            />
          </label>
        </div>
      </div>

      {/* 상품 상태와 추가 중고 상품 상태 */}
      <div className="mb-10">
        <div>
          <label className="text-[var(--text-dark-gray)] text-lg font-semibold">
            상품상태
          </label>
          <div className="flex space-x-2 mt-2">
            {["미개봉", "중고"].map((condition) => (
              <button
                key={condition}
                className={`px-4 py-2 rounded-md text-sm font-medium border ${
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
          <div className="mt-6">
            <label className="text-[var(--text-dark-gray)] text-lg font-semibold">
              추가 중고 상품 상태 <span className="text-red-500">*</span>
            </label>
            <div className="flex space-x-2 mt-2">
              {["거의 새 상품", "좋음", "보통", "나쁨"].map((condition) => (
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
            {!usedCondition && (
              <p className="text-xs text-red-500 mt-1">추가 상태를 선택해주세요.</p>
            )}
          </div>
        )}
      </div>

      {/* 상품 태그 */}
      <div className="mb-6">
        <label className="text-[var(--text-dark-gray)] text-lg font-semibold">
          상품 태그명
        </label>
        <div className="flex flex-wrap gap-2 mt-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="bg-[var(--bg-light-gray)] px-3 py-1 rounded-full text-sm flex items-center"
            >
              <span>#{tag}</span>
              <button
                onClick={() => handleRemoveTag(tag)}
                className="ml-2 text-gray-500 hover:text-red-500"
              >
                ×
              </button>
            </span>
          ))}
        </div>
        <div className="flex items-center mt-2">
          <span className="text-gray-400 text-sm mr-2">#</span>
          <input
            type="text"
            value={inputTag}
            maxLength={30}
            onChange={(e) => setInputTag(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleAddTag();
              }
            }}
            placeholder="태그 입력 후 Enter"
            className="flex-1 p-2 border border-[var(--border-light-gray)] rounded-md text-sm"
          />
        </div>
        <p className="text-xs text-[var(--text-gray)] mt-1">
          태그는 최대 5개까지 입력할 수 있어요.
        </p>
      </div>

      {/* 상품 설명 (사용자 입력 가능) */}
      <div className="mb-4">
        <label className="text-[var(--text-black)] text-lg font-semibold">
          상품 설명
        </label>
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
          productName && category && subCategory && price
            ? "bg-black"
            : "bg-gray-400"
        }`}
        disabled={!productName || !category || !subCategory || !price}
      >
        저장하기
      </button>

      {/* 상품 등록 안내 모달 */}
      <Modal
        open={isNoticeModalOpen}
        onCancel={() => setIsNoticeModalOpen(false)}
        footer={null}
        centered
        title={
          <h3 className="text-xl font-bold text-center text-gray-800">
            상품 등록 안내
          </h3>
        }
        styles={{
          body: {
            padding: "20px",
            fontSize: "14px",
            color: "#444",
            lineHeight: "1.7",
            maxHeight: "400px",
            overflowY: "auto",
          },
          header: {
            borderBottom: "1px solid #f0f0f0",
          },
        }}
      >
        <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700">
          <li>상품 등록 시 반드시 정확한 정보를 입력해야 합니다.</li>
          <li>가격, 카테고리, 상품 설명을 명확히 작성하세요.</li>
          <li>허위 정보 등록 시 서비스 이용이 제한될 수 있습니다.</li>
          <li>판매 후에는 변경이 어려우니 신중하게 입력해주세요.</li>
        </ul>
      </Modal>

      {/* 개인정보 제공 안내 모달 */}
      <Modal
        open={isPrivacyModalOpen}
        onCancel={() => setIsPrivacyModalOpen(false)}
        footer={null}
        centered
        title={
          <h3 className="text-xl font-bold text-center text-gray-800">
            🔐 개인정보 제공 안내
          </h3>
        }
        styles={{
          body: {
            padding: "20px",
            fontSize: "14px",
            color: "#444",
            lineHeight: "1.7",
          },
        }}
      >
        <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700">
          <li>상품 거래를 위해 일부 개인정보가 제공될 수 있습니다.</li>
          <li>구매자와 원활한 거래를 위해 연락처가 공유될 수 있습니다.</li>
          <li>
            등록된 정보는 암호화되어 저장되며, 제3자에게 제공되지 않습니다.
          </li>
        </ul>
      </Modal>

      {/* 추가 중고 상품 상태 모달 */}
      <Modal
        open={isUsedConditionModalOpen}
        onCancel={() => setIsUsedConditionModalOpen(false)}
        footer={null}
        centered
        title={
          <h3 className="text-xl font-bold text-center text-gray-800">
            중고 상태 안내
          </h3>
        }
        styles={{
          body: {
            padding: "20px",
            fontSize: "14px",
            color: "#444",
            lineHeight: "1.7",
          },
        }}
      >
        <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700">
          <li>거의 새 상품: 사용하지 않았거나 포장만 개봉한 상태</li>
          <li>좋음: 사용감이 적고 상태가 양호함</li>
          <li>보통: 사용감은 있으나 기능에 문제 없음</li>
          <li>나쁨: 사용감이 크고 흠집 등이 있음</li>
        </ul>
      </Modal>
    </div>
  );
};

export default ProductRegisterForm;
