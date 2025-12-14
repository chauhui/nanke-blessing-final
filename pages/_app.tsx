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

// 2. 設定字體，並定義 CSS 變數名稱
const notoSerif = Noto_Serif_TC({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-serif', // 這會產生 CSS 變數 var(--font-serif)
  display: 'swap',
  preload: false,
})

const notoSans = Noto_Sans_TC({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-sans', // 這會產生 CSS 變數 var(--font-sans)
  display: 'swap',
  preload: false, 
})

export default function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  // ... (保留您的其他邏輯)

  return (
    <SessionProvider session={session}>
      <Head>
        <title>南科福氣教會</title>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* 關鍵修正：
         透過 className 注入變數。
         這會讓 html 標籤自動帶有 --font-serif 和 --font-sans 這兩個 CSS 變數
      */}
      <main className={`${notoSans.variable} ${notoSerif.variable} font-sans antialiased`}>
        <Component {...pageProps} />
      </main>
    </SessionProvider>
  )
}