// next.config.ts
import type { NextConfig } from 'next'

const isProd = process.env.NODE_ENV === 'production'

/** CSP：開發要放寬，正式收斂（之後可再進一步改 nonce/hash） */
const devCSP = `
  default-src 'self';
  script-src 'self' 'unsafe-inline' 'unsafe-eval' blob: https://www.googletagmanager.com https://*.google-analytics.com;
  style-src  'self' 'unsafe-inline' https://fonts.googleapis.com;
  img-src    'self' data: https:;
  font-src   'self' https://fonts.gstatic.com;
  connect-src 'self' ws: wss: https://*.sanity.io https://*.google-analytics.com;
  frame-src  'self' https://www.youtube.com https://www.youtube-nocookie.com https://calendar.google.com;
  base-uri   'self';
  form-action 'self';
  frame-ancestors 'none';
  upgrade-insecure-requests;
`.replace(/\s+/g, ' ').trim()

const prodCSP = `
  default-src 'self';
  script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://*.google-analytics.com;
  style-src  'self' 'unsafe-inline' https://fonts.googleapis.com;
  img-src    'self' data: https:;
  font-src   'self' https://fonts.gstatic.com;
  connect-src 'self' https://*.sanity.io https://*.google-analytics.com;
  frame-src  'self' https://www.youtube.com https://www.youtube-nocookie.com https://calendar.google.com;
  base-uri   'self';
  form-action 'self';
  frame-ancestors 'none';
  upgrade-insecure-requests;
`.replace(/\s+/g, ' ').trim()

const securityHeadersBase = [
  { key: 'Content-Security-Policy', value: isProd ? prodCSP : devCSP },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'X-Frame-Options', value: 'DENY' }, // 與 frame-ancestors 一致
  { key: 'X-DNS-Prefetch-Control', value: 'on' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
] as const

const nextConfig: NextConfig = {
  reactStrictMode: true,
  swcMinify: true,

  // 圖片最佳化：白名單必要來源
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      { protocol: 'https', hostname: 'cdn.sanity.io' }, // Sanity 圖片 CDN
      { protocol: 'https', hostname: 'i.ytimg.com' },   // 若用到 YouTube 縮圖
    ],
  },

  trailingSlash: true,

  // 你原本的永久導向（保留）
  async redirects() {
    return [
      { source: '/event-registration', destination: '/member/event-registration', permanent: true },
      { source: '/event-registration/:path*', destination: '/member/event-registration/:path*', permanent: true },
    ]
  },

  // 全站安全標頭
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          ...securityHeadersBase,
          ...(isProd
            ? [{ key: 'Strict-Transport-Security', value: 'max-age=31536000; includeSubDomains; preload' }]
            : []),
        ],
      },
    ]
  },
}

export default nextConfig
