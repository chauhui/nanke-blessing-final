// pages/_app.tsx
import 'swiper/css';
import 'swiper/css/pagination';
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function MyApp({
  Component,
  pageProps: { session, ...rest },
}: AppProps) {
  const router = useRouter();

  useEffect(() => {
    // 記錄一次 page view
    const track = (url: string) => {
      fetch('/api/track-view', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          page: url,
          referrer: typeof document !== 'undefined' ? document.referrer : '',
          userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : ''
        })
      });
    };
    // 首次載入
    if (typeof window !== 'undefined') {
      track(window.location.pathname + window.location.search);
    }
    // route change
    router.events.on('routeChangeComplete', track);
    return () => {
      router.events.off('routeChangeComplete', track);
    };
  }, [router.events]);

  return (
    <SessionProvider session={session}>
      <Component {...rest} />
    </SessionProvider>
  );
}
