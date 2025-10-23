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

export default function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  const router = useRouter()
  const lastPathRef = useRef<string>('')

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
  const siteDesc = 'Nanke Blessed & Blessing Church'
  const siteUrl =
    typeof window !== 'undefined'
      ? `https://${window.location.host}`
      : 'https://nanke-blessing.vercel.app'
  const logoUrl = '/icons/icon-512.png' // 放你的 logo 路徑（public/icons/icon-512.png）

  const orgJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: siteName,
    url: siteUrl,
    logo: logoUrl,
    sameAs: [
      // 有社群就填，沒有就留空陣列
    ],
  }

  return (
    <SessionProvider session={session}>
      <Head>
        {/* 基本 */}
        <title>{siteName}</title>
        <meta name="description" content={siteDesc} />
        <meta name="application-name" content={siteName} />

        {/* Open Graph */}
        <meta property="og:site_name" content={siteName} />
        <meta property="og:title" content={siteName} />
        <meta property="og:description" content={siteDesc} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={siteUrl} />
        <meta property="og:image" content="/og-image.jpg" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={siteName} />
        <meta name="twitter:description" content={siteDesc} />
        <meta name="twitter:image" content="/og-image.jpg" />

        {/* Icons */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32.png" />
        <link rel="icon" type="image/png" sizes="192x192" href="/android-chrome-192x192.png" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />

        {/* PWA / manifest */}
        <link rel="manifest" href="/site.webmanifest" />

        {/* 結構化資料 */}
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
      </Head>

      <Component {...pageProps} />
    </SessionProvider>
  )
}
