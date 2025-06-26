// lib/auth-options.ts
import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcryptjs";
import { createClient } from "next-sanity";

// —— Sanity 客戶端初始化 ——
const sanityClient = createClient({
  projectId: process.env.SANITY_PROJECT_ID!,           // ← 強烈建議不要用 NEXT_PUBLIC_SANITY_PROJECT_ID，統一寫 SANITY_PROJECT_ID
  dataset:   process.env.SANITY_DATASET! || "production",
  apiVersion: "2023-05-03",
  useCdn:    false,
  token:     process.env.SANITY_API_TOKEN,
});

import { User } from "next-auth";

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
  
  if (!user || user.isApproved !== true) return null;
  const valid = await compare(credentials.password, user.password);
  if (!valid) return null;
  
  return {
    id: user._id,
    email: user.email,
    name: user.name,
    isApproved: user.isApproved,
    isAdmin: user.isAdmin || false,
  };
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email:    { label: "電子郵件", type: "email" },
        password: { label: "密碼",      type: "password" },
      },
      authorize,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,

  session: { strategy: "jwt", maxAge: 30 * 24 * 60 * 60 },
  jwt:     { maxAge: 30 * 24 * 60 * 60 },

  debug: process.env.NODE_ENV === "development",

  pages: {
    signIn: "/auth/login",
    error:  "/auth/login",
  },

  callbacks: {
    async signIn({ user }) {
      if ((user as any).isApproved !== true) {
        throw new Error("AccountNotApproved");
      }
      return true;
    },
    async redirect({ url, baseUrl }) {
      if (url.startsWith(baseUrl)) {
        return url;
      }
      if (url.startsWith("/")) {
        const fullUrl = new URL(baseUrl + url);
        return fullUrl.pathname + fullUrl.search;
      }
      return baseUrl;
    },
    async jwt({ token, user }) {
      if (user) token.id = (user as any).id;
      return token;
    },
    async session({ session, token }) {
      session.user = {
        ...session.user,
        id: token.id as string,
      };
      return session;
    },
  },
};
