import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  // 요청 헤더에서 Access 토큰을 확인
  const access = req.cookies.get("access");

  // 보호된 경로에 접근하려고 할 때 토큰이 없는 경우 로그인 페이지로 리다이렉트
  if (!access && req.nextUrl.pathname.startsWith("/protected")) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // 토큰이 유효하거나 인증이 필요 없는 경로의 경우 요청을 그대로 전달
  return NextResponse.next();
}

export const config = {
  // 미들웨어가 적용될 경로를 지정
  matcher: ["/protected/:path*"],
};
