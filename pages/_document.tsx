// pages/_document.tsx
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
          <meta name="csp-nonce" content={nonce} />
          {/* ❌ 移除：這裡原本的 Google Fonts link 是導致手機版字體失效的主因 */}
        </Head>
        <body>
          <Main />
          <NextScript nonce={nonce} />
        </body>
      </Html>
    );
  }
}

export default MyDocument;