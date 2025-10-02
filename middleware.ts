// middleware.ts
import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

const isProd = process.env.NODE_ENV === "production";

// ---- 建立 CSP（含 nonce）----
function buildCSP(nonce: string): string {
  // 基礎的 script-src：使用 nonce 放行本次回應內的 inline/runtime
  const scriptSrc = [
    "'self'",
    `'nonce-${nonce}'`,
    "https://www.googletagmanager.com",
    "https://*.google-analytics.com",
    "https://apis.google.com",
    "https://www.gstatic.com",
    "https://www.youtube.com",
  ];

  // ⚠️ 開發環境必須允許 eval，不然 Next/webpack dev 會白畫面
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

// 僅排除 Next 內部靜態與 auth API，避免不必要處理
export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|api/auth).*)"],
};

export default async function middleware(req: NextRequest) {
  // 1) 產生 nonce，傳給 _document（用於 <NextScript nonce=.../>）
  const nonce = crypto.randomUUID();
  const requestHeaders = new Headers(req.headers);
  requestHeaders.set("x-csp-nonce", nonce);

  // 2) 會員區驗證（僅 /member/*）
  const path = req.nextUrl.pathname;
  if (path.startsWith("/member")) {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    if (!token) {
      const url = req.nextUrl.clone();
      url.pathname = "/auth/login";
      url.searchParams.set("callbackUrl", req.nextUrl.pathname + req.nextUrl.search);
      const res = NextResponse.redirect(url);
      res.headers.set("Content-Security-Policy", buildCSP(nonce));
      return res;
    }
  }

  // 3) 正常放行 + 注入 CSP
  const res = NextResponse.next({ request: { headers: requestHeaders } });
  res.headers.set("Content-Security-Policy", buildCSP(nonce));
  return res;
}
