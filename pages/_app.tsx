// pages/_app.tsx
import 'swiper/css';
import 'swiper/css/pagination';
import '@/styles/globals.css';

import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  const router = useRouter();

  useEffect(() => {
    // 統一的 page view 紀錄（夾帶目前網域，API 會自行從 header 取 host）
    const track = (url?: string) => {
      const page =
        url ??
        (typeof window !== 'undefined'
          ? window.location.pathname + window.location.search
          : '');

      fetch('/api/track-view', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        keepalive: true,
        body: JSON.stringify({
          page,
          // ✅ API 端讀的是 referer（單 r）
          referer:
            typeof document !== 'undefined' ? document.referrer : '',
          userAgent:
            typeof navigator !== 'undefined' ? navigator.userAgent : '',
        }),
      }).catch((err) => {
        if (process.env.NODE_ENV !== 'production') {
          // 開發時幫你看到錯誤，正式站保持靜默
          console.warn('track-view failed:', err);
        }
      });
    };

    // 首次載入
    track();

    // 路由切換完成時也記錄
    router.events.on('routeChangeComplete', track);
    return () => {
      router.events.off('routeChangeComplete', track);
    };
  }, [router.events]);

  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />
    </SessionProvider>
  );
}
