import { DefaultSession } from 'next-auth';
import type { MemberRole } from '@/lib/member-roles';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      isApproved: boolean;
      role: MemberRole;
      authVersion: number;
      mustChangePassword: boolean;
    } & DefaultSession['user'];
  }

  interface User {
    id: string;
    isApproved: boolean;
    role: MemberRole;
    authVersion: number;
    mustChangePassword: boolean;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string;
    isApproved: boolean;
    role: MemberRole;
    authVersion: number;
    mustChangePassword: boolean;
  }
}
