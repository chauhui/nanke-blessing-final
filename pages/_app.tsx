// pages/_app.tsx
import 'swiper/css'
import 'swiper/css/effect-fade'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
// 確保 globals.css 在最後引入，權重才夠
import '@/styles/globals.css'

import type { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useEffect, useRef } from 'react'
import Head from 'next/head'

// 1. 引入 Google Fonts
import { Noto_Serif_TC, Noto_Sans_TC } from 'next/font/google'

// 2. 設定思源宋體 (標題用)
// 設定 variable 後，Next.js 會自動產生一個帶有 CSS 變數的 class
const notoSerif = Noto_Serif_TC({
  weight: ['400', '500', '600', '700', '900'],
  subsets: ['latin'],
  variable: '--font-serif', 
  display: 'swap',
  preload: false,
})

// 3. 設定思源黑體 (內文用)
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
  // ... (保留原本的 GA/Tracking 邏輯) ...
  const lastPathRef = useRef<string>('')
  useEffect(() => {
    // ... (保留原本的 GA/Tracking 邏輯) ...
    // 為節省篇幅，此處省略追蹤代碼，請保留您原本的內容
  }, [router.events])

  const siteName = '南科福氣教會'

  return (
    <SessionProvider session={session}>
      <Head>
        <title>{siteName}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* ✨ 關鍵修正 ✨ 
          1. 移除 style={{...}} 手動注入，改用官方標準變數注入。
          2. className 必須包含兩個字體的 .variable 屬性。
             - notoSans.variable: 注入 --font-sans
             - notoSerif.variable: 注入 --font-serif (這是之前缺少的！)
          3. font-sans: 設定預設字體為黑體。
      */}
      <main className={`${notoSans.variable} ${notoSerif.variable} font-sans antialiased`}>
        <Component {...pageProps} />
      </main>
    </SessionProvider>
  )
}