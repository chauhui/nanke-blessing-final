// pages/_app.tsx
import 'swiper/css'
import 'swiper/css/effect-fade'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import '@/styles/globals.css'

import type { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react'
import Head from 'next/head'
import { useRouter } from 'next/router' // 1. 引入路由
import { useEffect } from 'react'     // 2. 引入副作用鉤子

// 字體設定 (維持原本修復好的設定)
import { Noto_Serif_TC, Noto_Sans_TC } from 'next/font/google'

const notoSerif = Noto_Serif_TC({
  weight: ['700'],
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
  preload: false,
})

const notoSans = Noto_Sans_TC({
  weight: ['400', '700'],
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

  // === 關鍵修正：恢復流量統計功能 ===
  useEffect(() => {
    // 定義一個發送流量紀錄的函式
    const handleRouteChange = async (url: string) => {
      try {
        // 發送 POST 請求給 pages/api/track-view.ts
        await fetch('/api/track-view', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          // 傳送當前的網址與時間
          body: JSON.stringify({
            url,
            title: document.title,
            timestamp: new Date().toISOString(),
          }),
        })
      } catch (error) {
        // 默默失敗，不要讓使用者看到錯誤
        console.error('Tracking failed:', error)
      }
    }

    // 1. 網站剛打開時，紀錄第一次 (Initial Load)
    handleRouteChange(window.location.pathname)

    // 2. 監聽路由變化，當使用者換頁時紀錄 (Navigation)
    router.events.on('routeChangeComplete', handleRouteChange)

    // 清除監聽器 (避免重複執行)
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events])
  // ====================================

  return (
    <SessionProvider session={session}>
      <Head>
        <title>南科福氣教會</title>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

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