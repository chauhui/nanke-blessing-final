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
          {/* 讓 Next 的內嵌 runtime script 具備 nonce，配合 CSP 放行 */}
          <NextScript nonce={nonce} />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
