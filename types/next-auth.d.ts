import NextAuth, { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      isApproved: boolean;
      // isAdmin 欄位已移除
    } & DefaultSession['user'];
  }

  interface User {
    id: string;
    isApproved: boolean;
    isAdmin: boolean;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string;
    isApproved: boolean;
    isAdmin: boolean;
  }
}
