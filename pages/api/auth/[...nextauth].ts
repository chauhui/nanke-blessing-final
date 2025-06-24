// pages/api/auth/[...nextauth].ts
import NextAuth from "next-auth";
import { authOptions } from "@/lib/auth-options";

export default NextAuth(authOptions);
