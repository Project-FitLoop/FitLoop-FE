import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// 보호된 경로 목록
const protectedRoutes = [
  "/mypage",
  "/dashboard",
  "/personinfo",
  "/cart",
  "/checkout",
  "/products/register",
];

export function middleware(req: NextRequest) {
  const accessToken = req.cookies.get("access")?.value;
  const refreshToken = req.cookies.get("refresh")?.value;
  const { pathname } = req.nextUrl;

  // reissue는 항상 허용
  if (pathname === "/reissue") return NextResponse.next();

  // 보호된 페이지 여부 확인
  const isProtected = protectedRoutes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  );

  if (!refreshToken && isProtected) {
    const redirectUrl = `/login?redirect=${pathname}&reason=session-expired`;
    return NextResponse.redirect(new URL(redirectUrl, req.url));
  }

  if ((accessToken || refreshToken) && pathname === "/login") {
    return NextResponse.redirect(new URL("/mypage", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/mypage",
    "/dashboard",
    "/personinfo",
    "/cart",
    "/checkout",
    "/products/register",
    "/reissue",
    "/login",
  ],
};
