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

// 1. 引入字體
import { Noto_Serif_TC, Noto_Sans_TC } from 'next/font/google'

// 2. 設定字體
// 注意：這裡我們拿掉 variable 參數，因為我們要直接取用 style.fontFamily
const notoSerif = Noto_Serif_TC({
  weight: ['400', '700'],
  subsets: ['latin'],
  display: 'swap',
  preload: false,
})

const notoSans = Noto_Sans_TC({
  weight: ['400', '700'],
  subsets: ['latin'],
  display: 'swap',
  preload: false, 
})

export default function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  const router = useRouter()
  // ... (保留原本的 GA/Tracking 邏輯，這裡省略以節省空間) ...
  const lastPathRef = useRef<string>('')
  useEffect(() => {
     // ... (請保留原本的 useEffect 內容) ...
  }, [router.events])

  const siteName = '南科福氣教會'

  return (
    <SessionProvider session={session}>
      <Head>
        <title>{siteName}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* 🔥🔥🔥 終極修正：直接樣式注入 (Direct Style Injection) 🔥🔥🔥
         我們不依賴 CSS 變數傳遞，直接把 Next.js 產生的字體名稱 (notoSerif.style.fontFamily)
         寫死在全域樣式中。這是最底層、最暴力的做法。
      */}
      <style jsx global>{`
        :root {
          /* 強制定義 CSS 變數，不管 Tailwind 抓什麼，這裡直接給它真實字體名稱 */
          --font-sans: ${notoSans.style.fontFamily}, system-ui, sans-serif;
          --font-serif: ${notoSerif.style.fontFamily}, "Times New Roman", serif;
        }

        html, body {
          font-family: ${notoSans.style.fontFamily}, system-ui, sans-serif;
        }

        /* 直接針對標題標籤進行「硬覆蓋」 */
        h1, h2, h3, h4, h5, h6, .font-serif {
          font-family: ${notoSerif.style.fontFamily}, "Times New Roman", serif !important;
          font-weight: 700;
        }

        /* 確保內文是黑體 */
        p, .font-sans {
          font-family: ${notoSans.style.fontFamily}, system-ui, sans-serif !important;
        }
      `}</style>

      {/* 這裡只需要 className 來觸發 Next.js 下載字體檔案，不需要負責傳遞變數了 */}
      <main className={`${notoSans.className} ${notoSerif.className}`}>
        <Component {...pageProps} />
      </main>
    </SessionProvider>
  )
}