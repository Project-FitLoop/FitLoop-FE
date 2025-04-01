import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// 보호된 경로 목록을 별도로 관리
const protectedRoutes = ["/personinfo", "/dashboard", "/mypage","/products/register" ];

export function middleware(req: NextRequest) {
  const accessToken = req.cookies.get("access")?.value;

  const isProtected = protectedRoutes.some(
    (route) =>
      req.nextUrl.pathname === route ||
      req.nextUrl.pathname.startsWith(`${route}/`)
  );

  if (!accessToken && isProtected) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}
