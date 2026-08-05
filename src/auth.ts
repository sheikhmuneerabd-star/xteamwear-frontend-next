import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import { connectDB } from "@/lib/db";
import User from "@/lib/models/User";
import { comparePassword, hashPassword } from "@/lib/auth";
import { authConfig } from "@/auth.config";

export const { handlers, signIn, signOut, auth } = NextAuth({
  secret: process.env.AUTH_SECRET || process.env.NEXTAUTH_SECRET
  ...authConfig,
  session: { strategy: "jwt" },
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
        isOtpLogin: { label: "isOtpLogin", type: "text" },
      },
      async authorize(credentials) {
        if (!credentials?.email) return null;

        await connectDB();
        const email = (credentials.email as string).toLowerCase().trim();

        // 🟢 CASE 1: OTP Login Logic
        if (credentials.isOtpLogin === "true") {
          let user = await User.findOne({ email });

          // Agar OTP se login karne wala naya user hai, toh DB me account create kar do
          if (!user) {
            const userCount = await User.countDocuments();
            user = await User.create({
              name: email.split("@")[0],
              email: email,
              password: await hashPassword(crypto.randomUUID()), // Random secure password
              role: userCount === 0 ? "admin" : "user",
            });
          }

          return {
            id: user._id.toString(),
            name: user.name,
            email: user.email,
            role: user.role,
          };
        }

        // 🔵 CASE 2: Normal Password Login Logic
        if (!credentials?.password) return null;

        const user = await User.findOne({ email }).select("+password");
        if (!user || !user.password) return null;

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
        if (!user.email) return false;

        await connectDB();
        const existing = await User.findOne({ email: user.email.toLowerCase() });

        if (!existing) {
          const userCount = await User.countDocuments();
          await User.create({
            name: user.name || user.email.split("@")[0],
            email: user.email.toLowerCase(),
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