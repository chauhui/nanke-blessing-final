// src/middleware.ts
import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

const isProd = process.env.NODE_ENV === "production";

function buildCSP(nonce: string): string {
  const scriptSrc = [
    "'self'",
    `'nonce-${nonce}'`,
    "https://www.googletagmanager.com",
    "https://*.google-analytics.com",
    "https://apis.google.com",
    "https://www.gstatic.com",
    "https://www.youtube.com",
  ];
  if (!isProd) scriptSrc.push("'unsafe-eval'");

  const parts = [
    "default-src 'self'",
    `script-src ${scriptSrc.join(" ")}`,
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "img-src 'self' data: https:",
    "font-src 'self' https://fonts.gstatic.com data:",
    `connect-src 'self' https://*.sanity.io https://www.googletagmanager.com https://*.google-analytics.com https://region1.google-analytics.com https://www.googleapis.com https://accounts.google.com https://apidata.googleusercontent.com ${isProd ? "" : "http://localhost:3000"} https:`,
    "frame-src https://calendar.google.com https://*.google.com https://www.youtube.com https://www.youtube-nocookie.com",
    "media-src 'self'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'none'",
    "block-all-mixed-content",
  ];
  if (isProd) parts.push("upgrade-insecure-requests");
  return parts.join("; ");
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|api/auth).*)"],
};

// 🔒 需保護的路徑清單
const PROTECTED_PREFIXES = [
  "/member",
  "/api/member",
  "/api/group-report",
];

export default async function middleware(req: NextRequest) {
  const nonce = crypto.randomUUID();
  const requestHeaders = new Headers(req.headers);
  requestHeaders.set("x-csp-nonce", nonce);

  const path = req.nextUrl.pathname;

  // ✅【白名單放行區 - 絕對優先】
  // 1. 公開頁面：/event-registration, /meal
  // 2. 關鍵 API：雖然 API 在 member 底下，但我們特別開後門給它
  if (
    path.startsWith("/event-registration") || 
    path.startsWith("/member/event-registration") || // ⭐ 已新增：讓會員底下的活動報名頁面不需登入
    path.startsWith("/meal") ||
    path.startsWith("/api/member/event-registration") // 關鍵修正！放行此 API
  ) {
    const res = NextResponse.next({ request: { headers: requestHeaders } });
    res.headers.set("Content-Security-Policy", buildCSP(nonce));
    return res;
  }

  // 🔒 檢查是否在保護名單內
  if (PROTECTED_PREFIXES.some((p) => path.startsWith(p))) {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    
    // 未登入 -> 強制轉址
    if (!token) {
      const url = req.nextUrl.clone();
      url.pathname = "/auth/login";
      url.searchParams.set("callbackUrl", req.nextUrl.pathname + req.nextUrl.search);
      const redirect = NextResponse.redirect(url);
      redirect.headers.set("Content-Security-Policy", buildCSP(nonce));
      return redirect;
    }
  }

  const res = NextResponse.next({ request: { headers: requestHeaders } });
  res.headers.set("Content-Security-Policy", buildCSP(nonce));
  return res;
}