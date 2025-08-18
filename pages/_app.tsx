// pages/_app.tsx
import 'swiper/css';
import 'swiper/css/pagination';
import '@/styles/globals.css';

import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect, useRef } from 'react';

export default function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  const router = useRouter();
  // 記住上一個站內路由（路徑+查詢）
  const lastPathRef = useRef<string>('');

  useEffect(() => {
    const getCurrentPath = () =>
      typeof window !== 'undefined'
        ? window.location.pathname + window.location.search
        : '';

    // 站內 referrer 正規化（同站就只送路徑；外站保留完整 URL）
    const normalizeReferrer = (raw: string) => {
      if (!raw || typeof window === 'undefined') return '';
      try {
        const u = new URL(raw);
        return u.host === window.location.host ? u.pathname + u.search : raw;
      } catch {
        // raw 可能不是合法 URL（例如空字串或自訂字串）
        return raw;
      }
    };

    const send = (page: string, referrer: string) => {
      try {
        fetch('/api/track-view', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          keepalive: true,
          body: JSON.stringify({
            page,                                  // 本次頁面
            referrer: normalizeReferrer(referrer), // 上一頁（站內只送路徑）
            userAgent:
              typeof navigator !== 'undefined' ? navigator.userAgent : '',
            site: typeof window !== 'undefined' ? window.location.host : '',
          }),
        }).catch(() => {});
      } catch {
        // ignore
      }
    };

    // 首次載入：referrer 用 document.referrer（可能是外站或空字串）
    const firstPath = getCurrentPath();
    send(firstPath, typeof document !== 'undefined' ? document.referrer : '');
    lastPathRef.current = firstPath;

    // 之後每次內部導航：referrer = 上一個路由；再更新 lastPath
    const onRouteChange = (nextUrl: string) => {
      const prev = lastPathRef.current || '';
      send(nextUrl, prev);
      lastPathRef.current = nextUrl;
    };

    router.events.on('routeChangeComplete', onRouteChange);
    return () => {
      router.events.off('routeChangeComplete', onRouteChange);
    };
  }, [router.events]);

  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />
    </SessionProvider>
  );
}
