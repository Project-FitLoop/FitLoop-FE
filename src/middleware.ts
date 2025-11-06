import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const protectedRoutes = [
  "/mypage",
  "/dashboard",
  "/personinfo",
  "/cart",
  "/checkout",
  "/products/register",
];

const adminProtectedRoutes = [
  "/dashboard",
];

function decodeJwtPayload(token: string): any | null {
  try {
    const base64Url = token.split(".")[1];
    if (!base64Url) return null;
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const json = atob(base64);
    return JSON.parse(json);
  } catch {
    return null;
  }
}

export function middleware(req: NextRequest) {
  const accessToken = req.cookies.get("access")?.value;
  const refreshToken = req.cookies.get("refresh")?.value;
  const { pathname } = req.nextUrl;

  if (pathname === "/reissue") return NextResponse.next();

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

  const isAdminPath = adminProtectedRoutes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  );

  if (isAdminPath) {
    if (!accessToken) {
      const redirectUrl = `/login?redirect=${pathname}`;
      return NextResponse.redirect(new URL(redirectUrl, req.url));
    }

    const payload = decodeJwtPayload(accessToken);
    const role: string | undefined = payload?.role;
    const isAdmin = role === "ADMIN" || role === "ROLE_ADMIN";

    if (!isAdmin) {
      const url = req.nextUrl.clone();
      url.pathname = "/";
      return NextResponse.redirect(url);
    }
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
