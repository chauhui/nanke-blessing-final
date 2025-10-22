import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcryptjs";
import { createClient } from "next-sanity";
import type { User } from "next-auth";

/** ================== Sanity ================== */
// 兼容兩種環境變數名稱：SANITY_API_TOKEN 與 SANITY_WRITE_TOKEN
const SANITY_TOKEN =
  process.env.SANITY_API_TOKEN || process.env.SANITY_WRITE_TOKEN || "";

const sanityClient = createClient({
  projectId: process.env.SANITY_PROJECT_ID!,
  dataset: process.env.SANITY_DATASET || "production",
  apiVersion: "2023-05-03",
  useCdn: false,
  token: SANITY_TOKEN, // 必須帶 token 才能讀到受保護文件（含密碼雜湊）
});

/** =============== Credentials.authorize =============== */
// 必須回傳 { id, email, name, ... }
async function authorize(credentials: Record<string, string> | undefined): Promise<User | null> {
  if (!credentials?.email || !credentials?.password) return null;

  const user = await sanityClient.fetch<{
    _id: string;
    email: string;
    name: string;
    isApproved: boolean;
    isAdmin?: boolean;
    password: string; // 雜湊
  } | null>(
    `*[_type=="userRegistration" && email==$email][0]`,
    { email: credentials.email }
  );

  if (!user) return null;                       // 查無帳號 → 交給 NextAuth 顯示「帳密錯誤」
  if (user.isApproved !== true) throw new Error("AccountNotApproved"); // 自訂錯誤代碼

  const ok = await compare(credentials.password, user.password);
  if (!ok) return null;                         // 密碼錯誤

  // 確保回傳含 id / email / name
  return {
    id: user._id,
    email: user.email,
    name: user.name,
    // 自訂欄位（若前端/回呼要用）
    isApproved: user.isApproved,
    isAdmin: user.isAdmin ?? false,
  } as unknown as User;
}

/** ================== NextAuth Options ================== */
export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "電子郵件", type: "email" },
        password: { label: "密碼", type: "password" },
      },
      authorize,
    }),
  ],

  secret: process.env.NEXTAUTH_SECRET,

  session: { strategy: "jwt", maxAge: 30 * 24 * 60 * 60 },
  jwt: { maxAge: 30 * 24 * 60 * 60 },

  debug: process.env.NODE_ENV === "development",

  pages: {
    signIn: "/auth/login",
    error: "/auth/login", // 讓錯誤（含 AccountNotApproved）回到登入頁
  },

  callbacks: {
    // authorize 已處理 isApproved，因此這裡只要 user 存在即可
    async signIn({ user }) {
      return !!user;
    },

    async redirect({ url, baseUrl }) {
      // 站內路徑或完整同網域 URL 都允許
      if (url.startsWith(baseUrl)) return url;
      if (url.startsWith("/")) return new URL(url, baseUrl).toString();
      return baseUrl;
    },

    async jwt({ token, user }) {
      if (user) {
        // 將 user 重要欄位放進 JWT
        token.id = (user as any).id;
        token.email = (user as any).email;
        token.name = (user as any).name;
        token.isAdmin = (user as any).isAdmin ?? false;
      }
      return token;
    },

    async session({ session, token }) {
      // 將 JWT 內容帶到 session.user
      session.user = {
        ...session.user,
        id: token.id as string,
        email: token.email as string,
        name: token.name as string,
        isAdmin: (token as any).isAdmin ?? false,
      } as any;
      return session;
    },
  },
};

// 兼容性：同時提供 default export，方便別處以 default 匯入
export default authOptions;
