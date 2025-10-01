import { withAuth } from "next-auth/middleware";
import { NextRequest, NextResponse } from "next/server";

// ---- 產生 CSP（含 nonce） ----
function buildCSP(nonce: string): string {
  return [
    "default-src 'self'",
    // 以 nonce 放行當次回應中的 inline/runtime scripts；不再需要 unsafe-inline / unsafe-eval
    `script-src 'self' 'nonce-${nonce}' https://www.googletagmanager.com https://*.google-analytics.com https://apis.google.com https://www.gstatic.com https://www.youtube.com`,
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "img-src 'self' data: https:",
    "font-src 'self' https://fonts.gstatic.com data:",
    "connect-src 'self' https://*.sanity.io https://www.googletagmanager.com https://*.google-analytics.com https://region1.google-analytics.com https://www.googleapis.com https://accounts.google.com https://apidata.googleusercontent.com https:",
    "frame-src https://calendar.google.com https://*.google.com https://www.youtube.com https://www.youtube-nocookie.com",
    "media-src 'self'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'none'",
    "block-all-mixed-content",
    "upgrade-insecure-requests"
  ].join("; ");
}

// ---- 只負責注入 CSP 的 middleware（不做驗證）----
function cspOnlyMiddleware(req: NextRequest) {
  // 產生 nonce
  const nonce = crypto.randomUUID();

  // 把 nonce 放進 request headers，給 _document 取用
  const requestHeaders = new Headers(req.headers);
  requestHeaders.set("x-csp-nonce", nonce);

  // 繼續請求
  const res = NextResponse.next({ request: { headers: requestHeaders } });

  // 在 response headers 設定 CSP
  res.headers.set("Content-Security-Policy", buildCSP(nonce));
  return res;
}

// ---- 會員路徑專用：先驗證，再注入 CSP ----
const authMiddleware = withAuth(
  function onAuth(req: NextRequest) {
    return cspOnlyMiddleware(req);
  },
  {
    pages: { signIn: "/auth/login" }
  }
);

// ---- 總 middleware：會員路徑用 authMiddleware，其它走 cspOnlyMiddleware ----
export default function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname || "";
  if (path.startsWith("/member")) {
    return authMiddleware(req);
  }
  return cspOnlyMiddleware(req);
}

// 讓本 middleware 套用於全站（由我們在程式碼中再細分 /member 與非 /member）
export const config = { matcher: ["/:path*"] };
