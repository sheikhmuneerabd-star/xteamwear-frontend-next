import type { Metadata } from "next";
import "./globals.css";
import { SessionProvider } from "next-auth/react";
import { CartProvider } from "@/context/CartContext";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.bespoketeamwear.com"),
  title: {
    default: "BespokeTeamWear | Custom Team Uniforms & Sublimated Jerseys",
    template: "%s | BespokeTeamWear",
  },
  description:
    "Trusted by more than 1 million teams worldwide. Custom sublimated soccer, basketball, and team jerseys.",
  applicationName: "BespokeTeamWear",
  openGraph: {
    siteName: "BespokeTeamWear",
    title: "BespokeTeamWear | Custom Team Uniforms & Sublimated Jerseys",
    description:
      "Custom sublimated soccer, basketball, and team jerseys at factory-direct rates.",
    url: "/",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "BespokeTeamWear",
              alternateName: ["Bespoke Team Wear"],
              url: "https://www.bespoketeamwear.com/",
            }),
          }}
        />
        <SessionProvider>
          <Toaster position="top-center" reverseOrder={false} />
          <CartProvider>{children}</CartProvider>
        </SessionProvider>
      </body>
    </html>
  );
}