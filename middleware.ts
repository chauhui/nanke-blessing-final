// middleware.ts
import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

const isProd = process.env.NODE_ENV === "production";

// ---- CSP（含 nonce）— 會覆蓋 next.config.js 送出的 baseCSP ----
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
  // Dev 必須允許 eval，否則 Next/webpack 開發模式會白畫面
  if (!isProd) scriptSrc.push("'unsafe-eval'");

  const parts = [
    "default-src 'self'",
    `script-src ${scriptSrc.join(" ")}`,
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "img-src 'self' data: https:",
    "font-src 'self' https://fonts.gstatic.com data:",
    `connect-src 'self' https://*.sanity.io https://www.googletagmanager.com https://*.google-analytics.com https://region1.google-analytics.com https://www.googleapis.com https://accounts.google.com https://apidata.googleusercontent.com ${
      isProd ? "" : "http://localhost:3000"
    } https:`,
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

// 僅排除 Next 靜態/內部與 auth API
export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|api/auth).*)"],
};

export default async function middleware(req: NextRequest) {
  // 產生 nonce 並傳遞給 _document 使用（<NextScript nonce=.../>）
  const nonce = crypto.randomUUID();
  const requestHeaders = new Headers(req.headers);
  requestHeaders.set("x-csp-nonce", nonce);

  // 會員路徑驗證
  const path = req.nextUrl.pathname;
  if (path.startsWith("/member")) {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    if (!token) {
      const url = req.nextUrl.clone();
      url.pathname = "/auth/login";
      url.searchParams.set("callbackUrl", req.nextUrl.pathname + req.nextUrl.search);
      const redirect = NextResponse.redirect(url);
      // 覆蓋 baseCSP，送出 nonce 版 CSP
      redirect.headers.set("Content-Security-Policy", buildCSP(nonce));
      return redirect;
    }
  }

  // 正常放行並覆蓋 baseCSP 為 nonce 版
  const res = NextResponse.next({ request: { headers: requestHeaders } });
  res.headers.set("Content-Security-Policy", buildCSP(nonce));
  return res;
}
