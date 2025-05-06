'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ProductDetail } from '@/services/api/productApi';
import { CloseOutlined } from '@ant-design/icons';

interface ProductDetailPageProps {
    product: ProductDetail;
}

const ProductDetailPage: React.FC<ProductDetailPageProps> = ({ product }) => {
    const {
        sellerName = '',
        rating = 0,
        reviewCount = 0,
        name,
        category = '',
        tags = [],
        condition = '',
        price,
        description,
        imageUrls = [],
        includeShipping,
        createdAt,
    } = product;

    const [showCarbonInfo, setShowCarbonInfo] = useState(false);
    const [showConditionGuide, setShowConditionGuide] = useState(false);
    const [showShippingInfo, setShowShippingInfo] = useState(false);
    const [liked, setLiked] = useState(false);
    const router = useRouter();

    const toggleCarbon = () => setShowCarbonInfo(!showCarbonInfo);
    const toggleCondition = () => setShowConditionGuide(!showConditionGuide);
    const toggleShippingInfo = () => setShowShippingInfo(!showShippingInfo);
    const toggleLike = () => setLiked(!liked);
    const handleGoBack = () => router.back();

    // 등록일 포맷
    const formattedDate = createdAt ? new Date(createdAt).toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
    }).replace(/\.\s/g, '.').replace(/\.$/, '') : '';

    return (
        <div className="relative flex flex-col min-h-screen px-4 pt-4 pb-24" style={{ background: 'var(--bg-white)', color: 'var(--text-black)' }}>
            {/* 뒤로가기 버튼 */}
            <button
                onClick={handleGoBack}
                className="absolute top-4 left-3 w-10 h-10 flex items-center justify-center"
                aria-label="뒤로가기"
            >
                <CloseOutlined style={{ fontSize: 24, color: '#000000' }} />
            </button>

            {/* 판매자 정보 */}
            <div className="flex items-center space-x-3 mb-3 mt-11">
                <div className="w-24 h-24 rounded-full" style={{ background: 'var(--bg-gray)' }} />
                <div>
                    <p className="font-semibold text-base" style={{ color: 'var(--text-black)' }}>
                        {sellerName} 샵 <span className="ml-1">🌱</span>
                    </p>
                    <p className="text-sm" style={{ color: 'var(--text-gray)' }}>
                        {'★'.repeat(rating)}{'☆'.repeat(5 - rating)} ({reviewCount})
                    </p>
                </div>
            </div>

            {/* 이미지 */}
            <div className="relative w-full aspect-[4/4] rounded-lg mb-1 overflow-hidden" style={{ background: 'var(--bg-gray)' }}>
                {imageUrls.map((url, index) => (
                    <Image
                        key={index}
                        src={url}
                        alt={`product image ${index + 1}`}
                        fill
                        className="object-cover"
                    />
                ))}
            </div>

            {/* 등록일 (이미지 바로 아래 우측 정렬) */}
            {formattedDate && (
                <div className="w-full flex justify-end mb-2">
                    <p className="text-xs" style={{ color: 'var(--text-gray)' }}>
                        등록일: {formattedDate}
                    </p>
                </div>
            )}

            {/* 상품명, 카테고리 */}
            <h1 className="text-xl font-bold">{name}</h1>
            <p className="text-sm mb-2" style={{ color: 'var(--text-gray)' }}>{category}</p>

            {/* 태그 */}
            <div className="flex flex-wrap gap-2 mb-2">
                {tags.map((tag) => (
                    <span key={tag} className="text-xs border rounded-full px-2 py-1" style={{ color: 'var(--text-black)', borderColor: 'var(--border-light-gray)' }}>
                        #{tag}
                    </span>
                ))}
            </div>

            {/* 상태 */}
            <div className="mt-4 mb-3">
                <span className="px-5 py-[10px] text-base rounded-md" style={{ background: 'var(--bg-light-gray)', color: 'var(--text-dark-gray)' }}>
                    {condition || '상태 정보 없음'}
                </span>
            </div>

            {/* 추가 중고 상품 기준 안내 */}
            <button onClick={toggleCondition} className="text-sm underline mb-3 flex items-center gap-1 mt-2" style={{ color: 'var(--text-gray)' }}>
                <span>ⓘ</span> 추가 중고 상품 기준 안내 &gt;
            </button>

            {showConditionGuide && (
                <div className="p-3 rounded-md text-sm mb-3" style={{ background: 'var(--bg-light-gray)', color: 'var(--text-light-gray)' }}>
                    <ul className="list-disc pl-5 space-y-2">
                        <li>거의 새 상품: 사용하지 않았거나 포장만 개봉한 상태</li>
                        <li>좋음: 사용감이 적고 상태가 양호함</li>
                        <li>보통: 사용감은 있으나 기능에 문제 없음</li>
                        <li>나쁨: 사용감이 크고 흠집 등이 있음</li>
                    </ul>
                </div>
            )}

            {/* 상품 설명 */}
            <div className="mt-3">
                <h2 className="text-base font-semibold mb-2">상품 설명</h2>
                <div className="p-4 rounded-md text-sm leading-relaxed whitespace-pre-line" style={{ background: 'var(--bg-gray)', color: 'var(--text-dark-gray)' }}>
                    {description?.trim() ? description : '판매자가 아직 상세 설명을 작성하지 않았습니다.'}
                </div>
            </div>

            {/* 안내 문구 */}
            <p className="text-sm mt-3 mb-2" style={{ color: 'var(--text-gray)' }}>
                사이즈, 색상, 사용감, 사용기간, 브랜드명, 보증 기간 등 상세한 상품정보를 입력하면 더욱 수월하게 거래할 수 있습니다.
            </p>

            {/* 구분선 */}
            <hr className="my-4" style={{ borderColor: 'var(--border-light-gray)' }} />

            {/* 탄소 감축량 안내 */}
            <div className="flex items-center gap-1 text-sm mb-1" style={{ color: 'var(--text-dark-gray)' }}>
                <span>탄소 감축량 :</span>
                <button onClick={toggleCarbon} className="underline flex items-center gap-1">
                    8.7mg의 탄소를 줄일 수 있어요. ⓘ
                </button>
            </div>

            {showCarbonInfo && (
                <div className="p-3 rounded-md text-sm mb-3" style={{ background: 'var(--bg-light-gray)', color: 'var(--text-light-gray)' }}>
                    탄소저감마크란 중고거래를 통해 제품을 생산 및 유통하는 과정에서 발생하는 탄소를 줄인다는 의미의 친환경 거래임을 지원합니다.
                </div>
            )}

            {/* 가격 및 배송비 */}
            <div className="flex justify-end mt-4">
                <div className="flex flex-col items-end text-sm">
                    <span className="text-xl font-bold mb-1">
                        {typeof price === 'number' ? price.toLocaleString() : price}원
                    </span>

                    {!includeShipping ? (
                        <div className="text-xs text-[var(--text-gray)]">
                            배송비 미포함
                            <button className="ml-1 underline" onClick={toggleShippingInfo}>
                                ⓘ
                            </button>
                        </div>
                    ) : (
                        <div className="text-xs text-[var(--text-gray)]">배송비 포함</div>
                    )}
                </div>
            </div>

            {showShippingInfo && (
                <div className="mt-2 p-3 rounded-md text-sm" style={{ background: 'var(--bg-light-gray)', color: 'var(--text-light-gray)' }}>
                    해당 상품의 가격에는 배송비가 포함되어 있지 않으며, 별도로 부과될 수 있습니다. 판매자 정보를 참고해주세요.
                </div>
            )}

            {/* 하단 버튼 */}
            <div className="flex justify-between items-center gap-3 mt-6">
                <button
                    className={`w-12 h-12 text-2xl border ${liked ? 'bg-red-100 text-red-500 border-red-300' : 'bg-white'} flex items-center justify-center rounded-full`}
                    onClick={toggleLike}
                >
                    {liked ? '❤️' : '🤍'}
                </button>

                <button
                    className="flex-1 py-3 text-base font-semibold rounded-full"
                    style={{
                        background: 'var(--bg-gray)',
                        color: 'var(--text-black)',
                        border: '1px solid var(--border-light-gray)',
                    }}
                >
                    장바구니 담기
                </button>

                <button
                    className="flex-1 py-3 text-base font-semibold rounded-full"
                    style={{
                        background: 'var(--bg-black)',
                        color: 'var(--text-white)',
                    }}
                >
                    구매하기
                </button>
            </div>

        </div>
    );
};

export default ProductDetailPage;
