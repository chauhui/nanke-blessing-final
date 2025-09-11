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
    return () => {
      router.events.off('routeChangeComplete', onRouteChange)
    }
  }, [router.events])

  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />
    </SessionProvider>
  )
}
