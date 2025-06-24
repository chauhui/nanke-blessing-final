/** @type {import('next').NextConfig} */
const securityHeaders = [
  {
    key: 'Content-Security-Policy',
    value: `
      default-src 'self';
      script-src 'self' 'unsafe-inline' 'unsafe-eval' https://*.google-analytics.com https://www.googletagmanager.com;
      style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
      img-src 'self' data: https:;
      font-src 'self' https://fonts.gstatic.com;
      connect-src 'self' https://*.sanity.io https://*.google-analytics.com;
      frame-src 'self' https://www.youtube.com;
      media-src 'self';
      object-src 'none';
      base-uri 'self';
      form-action 'self';
      frame-ancestors 'none';
      block-all-mixed-content;
      upgrade-insecure-requests;
    `.replace(/\s+/g, ' ').trim(),
  },
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on',
  },
  {
    key: 'X-XSS-Protection',
    value: '1; mode=block',
  },
  {
    key: 'X-Frame-Options',
    value: 'SAMEORIGIN',
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },
  {
    key: 'Referrer-Policy',
    value: 'origin-when-cross-origin',
  },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=()',
  },
];

// 安全相關配置
const securityConfig = {
  // 防止點擊劫持
  xFrameOptions: 'DENY',
  // 防止 MIME 類型嗅探
  xContentTypeOptions: 'nosniff',
  // 啟用 XSS 過濾器
  xXSSProtection: '1; mode=block',
  // 防止 DNS 預取
  xDnsPrefetchControl: 'off',
  // 推薦的 Referrer-Policy
  referrerPolicy: 'strict-origin-when-cross-origin',
  // 功能策略
  featurePolicy: {
    'camera': ["'none'"],
    'geolocation': ["'none'"],
    'microphone': ["'none'"],
    'payment': ["'none'"],
  },
};

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // 在開發環境中強制使用 HTTP
  async rewrites() {
    return process.env.NODE_ENV === 'development' ? [
      {
        source: '/:path*',
        destination: 'http://localhost:3000/:path*',
      },
    ] : [];
  },
  async redirects() {
    return [
      // 永久重定向舊的 URL 到新的 URL
      {
        source: '/event-registration',
        destination: '/member/event-registration',
        permanent: true,
      },
      {
        source: '/event-registration/:path*',
        destination: '/member/event-registration/:path*',
        permanent: true,
      },
    ];
  },
  // 禁用 HTTPS 重定向
  devIndicators: {
    buildActivity: false,
  },
  // 強制使用 HTTP
  experimental: {
    forceSwcTransforms: true,
  },
  images: {
    // 禁用圖片優化，直接使用原始圖片
    unoptimized: true,
    // 允許所有圖片域名
    domains: ['*'],
    // 允許所有遠程圖片
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
    // 禁用圖片大小限制
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  trailingSlash: true,
  async headers() {
    return [
      {
        // 應用於所有路由
        source: '/:path*',
        headers: securityHeaders,
      },
    ];
  },
};
