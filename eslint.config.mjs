import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {     
    rules: {
      // 들여쓰기 2칸
      indent: ["error", 2],
      // 세미콜론 항상 사용하기
      semi: ["error", "always"],
      // 카멜 케이스
      camelcase: ["error", { properties: "always" }],
      // var 사용 안함
      "no-var": "error",
      // 화살표 함수 사용 권장
      "prefer-arrow-callback": "error",
      // 템플릿 문자열 사용
      "prefer-template": "error",
       // 연산자 공백
      "space-infix-ops": "error",
    },
  },
];

export default eslintConfig;
