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

// 2. 設定思源宋體 (標題用)
const notoSerif = Noto_Serif_TC({
  weight: ['400', '500', '600', '700', '900'],
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
  preload: false, // CJK 字體通常很大，設為 false 讓它按需載入
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
     // ... (請保留原本的 useEffect 內容) ...
  }, [router.events])

  const siteName = '南科福氣教會'
  
  // ... (保留原本的 meta 設定) ...

  return (
    <SessionProvider session={session}>
      <Head>
        <title>{siteName}</title>
        {/* ... Meta tags ... */}
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* 4. 注入字體變數
          使用 style 屬性直接注入變數，這是最穩定的跨瀏覽器做法
      */}
      <main 
        className={`${notoSans.className} font-sans`}
        style={{
          ['--font-sans' as any]: notoSans.style.fontFamily,
          ['--font-serif' as any]: notoSerif.style.fontFamily,
        }}
      >
        <style jsx global>{`
          :root {
            --font-sans: ${notoSans.style.fontFamily};
            --font-serif: ${notoSerif.style.fontFamily};
          }
          /* 強制標題使用宋體 */
          h1, h2, h3, h4, h5, h6, .font-serif {
            font-family: var(--font-serif), "Times New Roman", serif !important;
          }
          /* 強制內文使用黑體 */
          body, p, .font-sans {
            font-family: var(--font-sans), system-ui, sans-serif !important;
          }
        `}</style>
        
        <Component {...pageProps} />
      </main>
    </SessionProvider>
  )
}