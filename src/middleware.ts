// middleware.ts
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
  const { pathname } = req.nextUrl;

  // reissue 요청은 제외
  if (pathname === "/reissue") return NextResponse.next();

  const isProtected = protectedRoutes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  );

  if (!accessToken && isProtected) {
    const redirectUrl = `/login?redirect=${pathname}&reason=session-expired`;
    return NextResponse.redirect(new URL(redirectUrl, req.url));
  }

  // 로그인 상태인데 /login으로 접근하면 마이페이지로 이동
  if (accessToken && pathname === "/login") {
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
