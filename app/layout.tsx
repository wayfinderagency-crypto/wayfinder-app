import type { Metadata } from "next";
import Script from "next/script";
import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.css";
import "./style.css";

import Footer from "@/components/Footer";
import BootstrapClient from "@/components/BootstrapClient";
import ClientWrapper from "@/components/ClientWrapper";
import NavbarScrollEffect from "@/components/NavbarScrollEffect";
import CookieConsent from "@/components/CookieConsent";

export const metadata: Metadata = {
  title: {
    default: "Wayfinder",
    template: "%s | Agency",
  },
  icons: {
    icon: "https://res.cloudinary.com/da8w3pd4f/image/upload/v1757858809/ChatGPT-Image-Sep-10_-2025_-09_55_45-PM_kyzipw.webp",
  },
  description:
    "Wayfinder Agency is the leading OnlyFans agency in the USA, UK, and Australia. We provide professional OnlyFans management, marketing, and growth support for content creators, influencers, and models.",
  metadataBase: new URL("http://localhost:3000"),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Comfortaa:wght@300..700&family=Karla:ital,wght@0,200..800;1,200..800&display=swap"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css"
          integrity="sha512-Evv84Mr4kqVGRNSgIGL/F/aIDqQb7xQ2vcrdIwxfjThSH8CSR7PBEakCr51Ck+w+/U6swU2Im1vVX0SVk9ABhg=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
      </head>
      <body className="bg-white text-black" style={{ margin: 0 }}>
        <ClientWrapper>{children}</ClientWrapper>
        <CookieConsent />
        <Footer />
        <BootstrapClient />
        <NavbarScrollEffect />
      </body>
    </html>
  );
}
