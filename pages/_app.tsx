// pages/_app.tsx
import 'swiper/css'
import 'swiper/css/effect-fade'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import '@/styles/globals.css'

import type { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react'
import Head from 'next/head'

// 1. 重新引入 Google Fonts (這是唯一能讓手機電腦一樣的方法)
import { Noto_Serif_TC, Noto_Sans_TC } from 'next/font/google'

// 2. 設定 Noto Serif TC (標題用 - 經典 Japandi 宋體)
const notoSerif = Noto_Serif_TC({
  weight: ['700'],       // 只下載粗體給標題用，減輕負擔
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
  preload: false,        // ⚠️ 關鍵修正：關閉預先載入，解決 AbortError/Timeout 報錯
})

// 3. 設定 Noto Sans TC (內文用 - 乾淨黑體)
const notoSans = Noto_Sans_TC({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
  preload: false,        // ⚠️ 關鍵修正：關閉預先載入
})

export default function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <SessionProvider session={session}>
      <Head>
        <title>南科福氣教會</title>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* 4. 這裡將變數注入到全站，確保手機也能讀到 */}
      <main className={`
        ${notoSans.variable} 
        ${notoSerif.variable} 
        font-sans antialiased text-gray-800
      `}>
        <Component {...pageProps} />
      </main>
    </SessionProvider>
  )
}