// pages/_app.tsx
import 'swiper/css'
import 'swiper/css/effect-fade'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import '../styles/globals.css' // ✅ 路徑正確，保持不動

import type { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

// ❌ 移除：原本會導致 Timeout 的 next/font 引用
// import { Noto_Serif_TC, Noto_Sans_TC } from 'next/font/google'

export default function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  const router = useRouter()

  // === 流量統計邏輯 (保持原樣) ===
  useEffect(() => {
    const handleRouteChange = async (url: string) => {
      try {
        await fetch('/api/track-view', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            page: url, 
            title: document.title,
            timestamp: new Date().toISOString(),
          }),
        })
      } catch (error) {
        console.error('Tracking failed:', error)
      }
    }

    handleRouteChange(window.location.pathname)
    router.events.on('routeChangeComplete', handleRouteChange)
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

        {/* ✅ 新增：改用傳統 CDN 方式載入字體，避開 Next.js 後端下載卡住的問題 */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link 
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@400;700&family=Noto+Serif+TC:wght@700&display=swap" 
          rel="stylesheet" 
        />
      </Head>

      {/* ✅ 手動設定 CSS 變數
         原本 next/font 會自動生成 class，現在我們手動把變數灌進去，
         這樣 Tailwind 設定檔裡面的 'var(--font-sans)' 就能繼續運作，樣式完全不變。
      */}
      <main 
        className="font-sans antialiased text-gray-800"
        style={{
          // @ts-ignore
          '--font-sans': "'Noto Sans TC', sans-serif",
          // @ts-ignore
          '--font-serif': "'Noto Serif TC', serif",
        }}
      >
        <Component {...pageProps} />
      </main>
    </SessionProvider>
  )
}