/* eslint-disable */
export const genderOptions = [
    { label: "전체", value: "A" },
    { label: "남성", value: "M" },
    { label: "여성", value: "F" }
];

export const categories = [
    { name: "신발", id: "shoes", code: "001", gender: "all" },
    { name: "아우터", id: "outerwear", code: "002", gender: "all" },
    { name: "상의", id: "tops", code: "003", gender: "all" },
    { name: "바지", id: "pants", code: "004", gender: "all" },
    { name: "원피스", id: "dresses", code: "005", gender: "women" },
    { name: "스커트", id: "skirts", code: "006", gender: "women" },
    { name: "가방", id: "bags", code: "007", gender: "all" },
    { name: "패션소품", id: "fashionAccessories", code: "008", gender: "all" },
];

// 중분류
export const subCategories: { [key: string]: { name: string; code: string }[] } = {
    shoes: [
        { name: "전체", code: "000" },
        { name: "스니커즈", code: "001" },
        { name: "패딩/퍼 신발", code: "002" },
        { name: "부츠/워커", code: "003" },
        { name: "구두", code: "004" },
        { name: "샌들/슬리퍼", code: "005" },
        { name: "스포츠화", code: "006" },
        { name: "신발용품", code: "007" },
        { name: "기타", code: "008" }
    ],
    outerwear: [
        { name: "전체", code: "000" },
        { name: "숏패딩/헤비아우터", code: "001" },
        { name: "무스탕/퍼", code: "002" },
        { name: "후드 집업", code: "003" },
        { name: "블루종", code: "004" },
        { name: "레더/라이더스재킷", code: "005" },
        { name: "트러거 재킷", code: "006" },
        { name: "슈트/블레이저재킷", code: "007" },
        { name: "카디건", code: "008" },
        { name: "아노락 재킷", code: "009" },
        { name: "폴리스/뽀글이", code: "010" },
        { name: "트레이닝 재킷", code: "011" },
        { name: "스타디움 재킷", code: "012" },
        { name: "환절기 코트", code: "013" },
        { name: "겨울 코트", code: "014" },
        { name: "롱패딩/헤비아우터", code: "015" },
        { name: "패딩 베스트", code: "016" },
        { name: "기타", code: "017" }
    ],
    tops: [
        { name: "전체", code: "000" },
        { name: "니트/스웨터", code: "001" },
        { name: "맨투맨/스웨트", code: "002" },
        { name: "후드 티셔츠", code: "003" },
        { name: "셔츠/블라우스", code: "004" },
        { name: "피케/카라티셔츠", code: "005" },
        { name: "긴소매 티셔츠", code: "006" },
        { name: "반소매 티셔츠", code: "007" },
        { name: "민소매 티셔츠", code: "008" },
        { name: "기타", code: "009" }
    ],
    pants: [
        { name: "전체", code: "000" },
        { name: "데님 팬츠", code: "001" },
        { name: "트레이닝/조거팬츠", code: "002" },
        { name: "코튼 팬츠", code: "003" },
        { name: "슈트 팬츠/슬랙스", code: "004" },
        { name: "숏 팬츠", code: "005" },
        { name: "레깅스", code: "006" },
        { name: "점프 슈트/오버올", code: "007" },
        { name: "기타", code: "008" }
    ],
    dresses: [
        { name: "전체", code: "000" },
        { name: "미니원피스", code: "001" },
        { name: "미디원피스", code: "002" },
        { name: "맥시원피스", code: "003" },
        { name: "기타", code: "004" }
    ],
    skirts: [
        { name: "전체", code: "000" },
        { name: "미니스커트", code: "001" },
        { name: "미디스커트", code: "002" },
        { name: "롱스커트", code: "003" },
        { name: "기타", code: "004" }
    ],
    bags: [
        { name: "전체", code: "000" },
        { name: "메신저/크로스백", code: "001" },
        { name: "숄더백", code: "002" },
        { name: "백팩", code: "003" },
        { name: "토트백", code: "004" },
        { name: "에코백", code: "005" },
        { name: "보스턴/더블백", code: "006" },
        { name: "웨이스트 백", code: "007" },
        { name: "파우치 백", code: "008" },
        { name: "브리프 케이스", code: "009" },
        { name: "캐리어", code: "010" },
        { name: "가방소품", code: "011" },
        { name: "지갑/머니클립", code: "012" },
        { name: "클러치 백", code: "013" },
        { name: "기타", code: "014" }
    ],
    fashionAccessories: [
        { name: "전체", code: "000" },
        { name: "모자", code: "001" },
        { name: "머플러", code: "002" },
        { name: "주얼리", code: "003" },
        { name: "양말/레그웨어", code: "004" },
        { name: "선글라스/안경태", code: "005" },
        { name: "액세서리", code: "006" },
        { name: "시계", code: "007" },
        { name: "벨트", code: "008" },
        { name: "기타", code: "009" }
    ],
};