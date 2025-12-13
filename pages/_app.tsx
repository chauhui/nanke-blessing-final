// pages/_app.tsx
import 'swiper/css'
import 'swiper/css/effect-fade'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import '@/styles/globals.css'

import type { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useEffect, useRef } from 'react'
import Head from 'next/head'

// 1. 引入 Google Fonts (思源宋體 & 思源黑體)
import { Noto_Serif_TC, Noto_Sans_TC } from 'next/font/google'

// 2. 設定字體參數
// 思源宋體：用於標題 (h1~h6, font-serif)，營造人文、優雅質感
const notoSerif = Noto_Serif_TC({
  weight: ['400', '500', '600', '700', '900'],
  subsets: ['latin'],
  variable: '--font-serif', // 定義 CSS 變數名稱
  display: 'swap',
  preload: false, // 中文字體較大，建議設為 false 或根據需求調整
})

// 思源黑體：用於內文 (body, p, font-sans)，確保閱讀清晰舒適
const notoSans = Noto_Sans_TC({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
  preload: false,
})

export default function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  const router = useRouter()
  const lastPathRef = useRef<string>('')

  // 保留您原本的追蹤邏輯 (Track View)
  useEffect(() => {
    const getCurrentPath = () =>
      typeof window !== 'undefined'
        ? window.location.pathname + window.location.search
        : ''

    const normalizeReferrer = (raw: string) => {
      if (!raw || typeof window === 'undefined') return ''
      try {
        const u = new URL(raw)
        return u.host === window.location.host ? u.pathname + u.search : raw
      } catch {
        return raw || ''
      }
    }

    const send = (page: string, referrer: string) => {
      try {
        fetch('/api/track-view', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          keepalive: true,
          body: JSON.stringify({
            page,
            referrer: normalizeReferrer(referrer),
            userAgent:
              typeof navigator !== 'undefined' ? navigator.userAgent : '',
            site: typeof window !== 'undefined' ? window.location.host : '',
          }),
        }).catch(() => {})
      } catch {}
    }

    const firstPath = getCurrentPath()
    send(firstPath, typeof document !== 'undefined' ? document.referrer : '')
    lastPathRef.current = firstPath

    const onRouteChange = (nextUrl: string) => {
      const prev = lastPathRef.current || ''
      send(nextUrl, prev)
      lastPathRef.current = nextUrl
    }

    router.events.on('routeChangeComplete', onRouteChange)
    return () => {
      router.events.off('routeChangeComplete', onRouteChange)
    }
  }, [router.events])

  const siteName = '南科福氣教會'
  const siteDesc = '位於台南南科園區，為忙碌的科技人與家庭預備溫暖的信仰與陪伴'
  const siteUrl =
    typeof window !== 'undefined'
      ? `https://${window.location.host}`
      : 'https://nanke-blessing.vercel.app'
  const logoUrl = '/icons/icon-512.png'

  const orgJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: siteName,
    url: siteUrl,
    logo: logoUrl,
    sameAs: [],
  }

  return (
    <SessionProvider session={session}>
      <Head>
        <title>{siteName}</title>
        <meta name="description" content={siteDesc} />
        <meta name="application-name" content={siteName} />

        <meta property="og:site_name" content={siteName} />
        <meta property="og:title" content={siteName} />
        <meta property="og:description" content={siteDesc} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={siteUrl} />
        <meta property="og:image" content="/og-image.jpg" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={siteName} />
        <meta name="twitter:description" content={siteDesc} />
        <meta name="twitter:image" content="/og-image.jpg" />

        <link rel="icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32.png" />
        <link rel="icon" type="image/png" sizes="192x192" href="/android-chrome-192x192.png" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
      </Head>

      {/* 3. 套用字體變數與全局樣式 */}
      {/* 這裡的 className 將 Next.js 下載的字體變數注入到 app 中 */}
      <main className={`${notoSans.variable} ${notoSerif.variable} font-sans`}>
        
        {/* 4. 強制覆蓋 Tailwind 的預設字體 */}
        <style jsx global>{`
          :root {
            /* 定義 CSS 變數，對應到 Google Fonts */
            --font-main: ${notoSans.style.fontFamily};
            --font-heading: ${notoSerif.style.fontFamily};
          }

          /* 預設全站字體為思源黑體 */
          body {
            font-family: var(--font-main), system-ui, -apple-system, sans-serif;
          }

          /* 當您使用 font-serif 時，強制使用思源宋體 */
          .font-serif, h1, h2, h3, h4, h5, h6 {
            font-family: var(--font-heading), "Times New Roman", serif !important;
          }

          /* 當您使用 font-sans 時，強制使用思源黑體 */
          .font-sans {
            font-family: var(--font-main), system-ui, -apple-system, sans-serif !important;
          }
        `}</style>

        <Component {...pageProps} />
      </main>
    </SessionProvider>
  )
}