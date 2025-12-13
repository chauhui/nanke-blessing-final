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

// 1. 引入 Google Fonts
import { Noto_Serif_TC, Noto_Sans_TC } from 'next/font/google'

// 2. 設定字體參數
// 思源宋體：用於標題
const notoSerif = Noto_Serif_TC({
  weight: ['400', '500', '600', '700', '900'],
  subsets: ['latin'],
  variable: '--font-serif', // 這會自動在 HTML 生成 CSS 變數 var(--font-serif)
  display: 'swap',
  preload: false,
})

// 思源黑體：用於內文
const notoSans = Noto_Sans_TC({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  variable: '--font-sans', // 這會自動在 HTML 生成 CSS 變數 var(--font-sans)
  display: 'swap',
  preload: false,
})

export default function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  const router = useRouter()
  const lastPathRef = useRef<string>('')

  // GA / Tracking 邏輯保持不變
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
  const siteUrl = 'https://nanke-blessing.vercel.app'
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
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        
        <meta property="og:site_name" content={siteName} />
        <meta property="og:title" content={siteName} />
        <meta property="og:description" content={siteDesc} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={siteUrl} />
        <meta property="og:image" content="/og-image.jpg" />

        <link rel="icon" href="/favicon.ico" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
      </Head>

      {/* 3. 關鍵修正：
         - 移除不必要的 CSS 變數手動映射
         - 直接將 Next.js 產生的 variable class 加入 main
         - 加入 font-sans 讓全站預設黑體
      */}
      <main className={`${notoSans.variable} ${notoSerif.variable} font-sans`}>
        <style jsx global>{`
          /* 4. 強制全站標題使用思源宋體 */
          /* 因為在 tailwind.config.js 設定了 serif 對應 var(--font-serif)，這裡直接呼叫 */
          h1, h2, h3, h4, h5, h6, .font-serif {
            font-family: var(--font-serif), "Times New Roman", serif !important;
          }

          /* 確保內文使用思源黑體 */
          body, p, .font-sans {
            font-family: var(--font-sans), system-ui, -apple-system, sans-serif !important;
          }
        `}</style>

        <Component {...pageProps} />
      </main>
    </SessionProvider>
  )
}