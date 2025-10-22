import NextAuth, { NextAuthOptions } from "next-auth";
import baseAuthOptions from "@/lib/auth-options"; // 你原本 export default / export = 的名稱若不同，請改成對應的匯入

// 在不動原設定（providers、callbacks、adapter…）的前提下，僅「疊加」穩定的 cookie 設定
export const authOptions: NextAuthOptions = {
  ...(baseAuthOptions as NextAuthOptions),
  cookies: {
    sessionToken: {
      name:
        process.env.NODE_ENV === "production"
          ? "__Secure-next-auth.session-token"
          : "next-auth.session-token",
      options: {
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
        path: "/",
        // 若需要跨子網域共享登入再開啟（例：.example.com）
        // domain: process.env.AUTH_COOKIE_DOMAIN,
      },
    },
  },
};

export default NextAuth(authOptions);
