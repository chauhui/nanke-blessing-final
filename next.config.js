/** @type {import('next').NextConfig} */

const isProd = process.env.NODE_ENV === "production";

// ---- 基本 CSP（給掃描工具 & 保底用，沒有 nonce）----
const baseCSP = [
  "default-src 'self'",
  "script-src 'self' https://www.googletagmanager.com https://*.google-analytics.com https://apis.google.com https://www.gstatic.com https://www.youtube.com",
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
  ...(isProd ? ["upgrade-insecure-requests"] : [])
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: baseCSP },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=(), interest-cohort=()" },
  { key: "X-DNS-Prefetch-Control", value: "on" },
  { key: "X-XSS-Protection", value: "1; mode=block" }
];

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,

  // ✅ 修正：移除了強制轉址到 member 的規則
  async redirects() {
    return [];
  },

  images: {
    unoptimized: true,
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384]
  },

  trailingSlash: true,

  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders
      }
    ];
  }
};

module.exports = nextConfig;