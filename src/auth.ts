import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { connectDB } from "@/lib/db";
import User from "@/lib/models/User";
import { comparePassword, hashPassword } from "@/lib/auth";
import { authConfig } from "@/auth.config";

export const { handlers, signIn, signOut, auth } = NextAuth({
  ...authConfig,
  session: { strategy: "jwt" },
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        await connectDB();
        const user = await User.findOne({ email: (credentials.email as string).toLowerCase() }).select("+password");

        if (!user) return null;

        const isValid = await comparePassword(credentials.password as string, user.password);
        if (!isValid) return null;

        return {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
          role: user.role,
        };
      },
    }),
  ],
  callbacks: {
    ...authConfig.callbacks,
    async signIn({ user, account }) {
      if (account?.provider === "google") {
        await connectDB();
        const existing = await User.findOne({ email: user.email?.toLowerCase() });

        if (!existing) {
          const userCount = await User.countDocuments();
          await User.create({
            name: user.name,
            email: user.email?.toLowerCase(),
            password: await hashPassword(crypto.randomUUID()),
            role: userCount === 0 ? "admin" : "user",
          });
        }
      }
      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        await connectDB();
        const dbUser = await User.findOne({ email: user.email?.toLowerCase() });
        token.role = dbUser?.role ?? "user";
        token.id = dbUser?._id.toString();
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.role = token.role as "user" | "admin";
        session.user.id = token.id as string;
      }
      return session;
    },
  },
});