// pages/_app.tsx
import 'swiper/css'
import 'swiper/css/effect-fade'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import '@/styles/globals.css'

import type { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react'
import Head from 'next/head'

// ❌ 移除所有 next/font/google 的引用，不再下載字體

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

      {/* 移除變數注入，只保留基本的 font-sans */}
      <main className="font-sans antialiased text-gray-800">
        <Component {...pageProps} />
      </main>
    </SessionProvider>
  )
}