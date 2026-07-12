import type { Metadata } from "next";
import "./globals.css";
import { SessionProvider } from "next-auth/react";
import { CartProvider } from "@/context/CartContext";

export const metadata: Metadata = {
  title: "Xteamwear | Custom Team Uniforms & Sublimated Jerseys",
  description:
    "Trusted by more than 1 million teams worldwide. Custom sublimated soccer, basketball, and team jerseys.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <SessionProvider>
          <CartProvider>{children}</CartProvider>
        </SessionProvider>
      </body>
    </html>
  );
}