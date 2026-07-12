import { NextResponse } from "next/server";
import NextAuth from "next-auth";
import { authConfig } from "@/auth.config";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  console.log("PROXY — path:", req.nextUrl.pathname);
  console.log("PROXY — auth data:", JSON.stringify(req.auth, null, 2));

  const isAdmin = req.auth?.user?.role === "admin";
  const isAdminRoute = req.nextUrl.pathname.startsWith("/admin");

  if (isAdminRoute && !isAdmin) {
    return NextResponse.redirect(new URL("/sign-in", req.url));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/admin/:path*"],
};