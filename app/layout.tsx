import type { Metadata } from "next";
import Script from "next/script";
import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.css";
import "./style.css";
import { Comfortaa, Karla } from "next/font/google";
import "@fortawesome/fontawesome-free/css/all.min.css";

import Footer from "@/components/Footer";
import BootstrapClient from "@/components/BootstrapClient";
import ClientWrapper from "@/components/ClientWrapper";
import NavbarScrollEffect from "@/components/NavbarScrollEffect";
import CookieConsent from "@/components/CookieConsent";

const comfortaa = Comfortaa({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const karla = Karla({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
  style: ["normal", "italic"],
  display: "swap",
});

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
  metadataBase: new URL("https://wayfinder-agency.com"),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head></head>
      <body className="bg-white text-black " style={{ margin: 0 }}>
        <ClientWrapper>{children}</ClientWrapper>
        <CookieConsent />
        <Footer />
        <BootstrapClient />
        <NavbarScrollEffect />
      </body>
    </html>
  );
}
