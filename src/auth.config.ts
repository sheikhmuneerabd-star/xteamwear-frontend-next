import type { NextAuthConfig } from "next-auth";

export const authConfig: NextAuthConfig = {
  session: { strategy: "jwt" },
  pages: {
    signIn: "/sign-in",
  },
  callbacks: {
    session({ session, token }) {
      if (session.user) {
        session.user.role = token.role as "user" | "admin";
        session.user.id = token.id as string;
      }
      return session;
    },
  },
  providers: [],
};