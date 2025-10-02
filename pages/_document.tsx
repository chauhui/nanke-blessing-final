import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
  DocumentInitialProps,
} from "next/document";

type Props = DocumentInitialProps & { nonce?: string };

class MyDocument extends Document<Props> {
  static async getInitialProps(ctx: DocumentContext): Promise<Props> {
    const initial = await Document.getInitialProps(ctx);
    // 從 middleware 注入的 request header 取出同一個 nonce
    const h = (ctx.req?.headers as any) || {};
    const raw = h["x-csp-nonce"] ?? h["X-CSP-Nonce"] ?? "";
    const nonce = Array.isArray(raw) ? raw[0] : raw;
    return { ...initial, nonce };
  }

  render() {
    const nonce = (this.props as any).nonce || "";
    return (
      <Html lang="zh-Hant">
        <Head>
          {/* 讓前端可讀取目前回應的 nonce（供你自有 <Script> 使用） */}
          <meta name="csp-nonce" content={nonce} />
          {/* Google Noto Sans TC */}
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
          <link
            href="https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@400;700&display=swap"
            rel="stylesheet"
          />
        </Head>
        <body>
          <Main />
          {/* 讓 Next 的內嵌 runtime 腳本帶 nonce，通過 CSP */}
          <NextScript nonce={nonce} />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
