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

// 2. 設定字體
// 注意：這裡不設定 variable 參數，因為我們要手動注入
const notoSerif = Noto_Serif_TC({
  weight: ['400', '500', '600', '700', '900'],
  subsets: ['latin'],
  display: 'swap',
  preload: false,
})

const notoSans = Noto_Sans_TC({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
  preload: false,
})

export default function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  const router = useRouter()
  const lastPathRef = useRef<string>('')

  // GA / Tracking 保持不變
  useEffect(() => {
    const getCurrentPath = () =>
      typeof window !== 'undefined'
        ? window.location.pathname + window.location.search
        : ''
    // ... (保留您的追蹤程式碼) ...
    const normalizeReferrer = (raw: string) => {
      if (!raw || typeof window === 'undefined') return ''
      try {
        const u = new URL(raw)
        return u.host === window.location.host ? u.pathname + u.search : raw
      } catch { return raw || '' }
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
            userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : '',
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
    return () => { router.events.off('routeChangeComplete', onRouteChange) }
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

      {/* ✨ 關鍵修復 ✨ 
         我們直接將字體名稱注入到 :root 的 CSS 變數中。
         這樣做保證 CSS 變數在任何地方（包含手機）都讀得到正確的 Font Family。
      */}
      <style jsx global>{`
        :root {
          --font-sans: ${notoSans.style.fontFamily}, system-ui, -apple-system, sans-serif;
          --font-serif: ${notoSerif.style.fontFamily}, "Times New Roman", "Songti TC", serif;
        }

        /* 雙重保險：強制覆蓋 Tailwind 的類別 */
        .font-sans {
          font-family: var(--font-sans) !important;
        }
        
        .font-serif {
          font-family: var(--font-serif) !important;
        }

        /* 讓標題預設就是宋體，不用每次都加 font-serif */
        h1, h2, h3, h4, h5, h6 {
          font-family: var(--font-serif) !important;
        }

        body {
          font-family: var(--font-sans);
        }
      `}</style>

      {/* 將 className 加在最外層，
        有些瀏覽器需要實體 class 才能觸發字體下載 
      */}
      <main className={`${notoSans.className} ${notoSerif.className}`}>
        <Component {...pageProps} />
      </main>
    </SessionProvider>
  )
}