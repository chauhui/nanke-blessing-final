// pages/_app.tsx
import 'swiper/css';
import 'swiper/css/pagination';
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";

export default function MyApp({
  Component,
  pageProps: { session, ...rest },
}: AppProps) {
  return (
    <SessionProvider session={session}>
      <Component {...rest} />
    </SessionProvider>
  );
}
