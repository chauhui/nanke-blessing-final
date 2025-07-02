// lib/auth-options.ts
import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcryptjs";
import { createClient } from "next-sanity";

// Sanity 初始化
const sanityClient = createClient({
  projectId: process.env.SANITY_PROJECT_ID!,
  dataset: process.env.SANITY_DATASET! || "production",
  apiVersion: "2023-05-03",
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
});

import { User } from "next-auth";

// 必須保證 user 回傳 { id, email, name, ... }
async function authorize(credentials: any): Promise<User | null> {
  if (!credentials?.email || !credentials?.password) return null;

  const user = await sanityClient.fetch<{
    _id: string;
    email: string;
    name: string;
    isApproved: boolean;
    isAdmin?: boolean;
    password: string;
  } | null>(
    `*[_type=="userRegistration"&&email==$email][0]`,
    { email: credentials.email }
  );

  // 查無帳號
  if (!user) return null;
  // 未審核
  if (user.isApproved !== true) throw new Error("AccountNotApproved");
  // 密碼錯誤
  const valid = await compare(credentials.password, user.password);
  if (!valid) return null;

  // NextAuth 的 User 必須包含 id 欄位！
  return {
    id: user._id,
    email: user.email,
    name: user.name,
    // 這兩行不是 next-auth 預設 User 欄位，但你 callback 會用到就加上
    isApproved: user.isApproved,
    isAdmin: user.isAdmin || false,
  } as any;
}

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
    error: "/auth/login",
  },

  callbacks: {
    // 不要檢查 isApproved，這邊已經在 authorize 丟例外了
    async signIn({ user }) {
      // 只要 user 存在就 true
      return !!user;
    },
    async redirect({ url, baseUrl }) {
      if (url.startsWith(baseUrl)) return url;
      if (url.startsWith("/")) return new URL(baseUrl + url).toString();
      return baseUrl;
    },
    async jwt({ token, user }) {
      // 一定要有 id
      if (user) {
        token.id = (user as any).id;
        token.email = (user as any).email;
        token.name = (user as any).name;
        // 可以加上 isAdmin 等
      }
      return token;
    },
    async session({ session, token }) {
      // 這邊一定要設 id，不然前端 Session 拿不到 user.id
      session.user = {
        ...session.user,
        id: token.id as string,
        email: token.email as string,
        name: token.name as string,
        // ... 其他欄位
      };
      return session;
    },
  },
};
