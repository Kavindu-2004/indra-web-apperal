// lib/auth.ts
import type { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "@/lib/prisma";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),

  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],

  // ✅ required for PrismaAdapter (recommended)
  session: { strategy: "database" },

  pages: {
    signIn: "/account",
  },

  secret: process.env.NEXTAUTH_SECRET,

  callbacks: {
    async session({ session, user }) {
      // ✅ add db user id into session.user.id
      if (session.user) {
        (session.user as { id?: string }).id = user.id;
      }
      return session;
    },
  },
};