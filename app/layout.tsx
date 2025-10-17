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
  description:
    "Wayfinder Agency is the leading OnlyFans agency in the USA, UK, and Australia. We provide professional OnlyFans management, marketing, and growth support for content creators, influencers, and models.",
  metadataBase: new URL("https://wayfinder-agency.com"),
  icons: {
    icon: "https://res.cloudinary.com/da8w3pd4f/image/upload/v1757858809/ChatGPT-Image-Sep-10_-2025_-09_55_45-PM_kyzipw.webp",
  },
  openGraph: {
    title: "Wayfinder",
    description:
      "Wayfinder Agency is the leading OnlyFans agency in the USA, UK, and Australia. We provide professional OnlyFans management, marketing, and growth support for content creators, influencers, and models.",
    url: "https://wayfinder-agency.com",
    siteName: "Wayfinder Agency",
    images: [
      {
        url: "https://res.cloudinary.com/da8w3pd4f/image/upload/v1757858809/ChatGPT-Image-Sep-10_-2025_-09_55_45-PM_kyzipw.webp",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Wayfinder",
    description:
      "Wayfinder Agency is the leading OnlyFans agency in the USA, UK, and Australia. We provide professional OnlyFans management, marketing, and growth support for content creators, influencers, and models.",
    images: [
      "https://res.cloudinary.com/da8w3pd4f/image/upload/v1757858809/ChatGPT-Image-Sep-10_-2025_-09_55_45-PM_kyzipw.webp",
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta
          name="keywords"
          content="OnlyFans agency, OnlyFans management, marketing, growth, content creators, influencers, models, USA, UK, Australia"
        />
        <link rel="canonical" href="https://wayfinder-agency.com/" />
      </head>
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
