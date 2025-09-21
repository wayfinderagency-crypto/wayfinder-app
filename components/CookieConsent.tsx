"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Script from "next/script";
import { pageview, GA_TRACKING_ID } from "@/lib/gtag";

export default function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);
  const [consent, setConsent] = useState<boolean | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const storedConsent = localStorage.getItem("ga_consent");
    if (storedConsent === "true") setConsent(true);
    else if (storedConsent === "false") setConsent(false);
    else setShowBanner(true);
  }, []);

  useEffect(() => {
    if (consent) pageview(pathname);
  }, [pathname, consent]);

  const acceptCookies = () => {
    localStorage.setItem("ga_consent", "true");
    setConsent(true);
    setShowBanner(false);
    pageview(pathname);
  };

  const rejectCookies = () => {
    localStorage.setItem("ga_consent", "false");
    setConsent(false);
    setShowBanner(false);
  };

  return (
    <>
      {showBanner && (
        <div
          className="d-flex justify-content-between bg-pink py-3 px-5 align-items-center fixed-bottom mb-0 shadow-top"
          role="alert"
        >
          <span>
            This site uses cookies to improve performance and analyse traffic.
          </span>
          <div className="d-flex gap-2">
            <button
              onClick={acceptCookies}
              className="btn btn-second rounded-3 px-4"
            >
              Accept
            </button>
            <button
              onClick={rejectCookies}
              className="btn btn-outline-light rounded-3 px-4"
            >
              Reject
            </button>
          </div>
        </div>
      )}

      {consent && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
            strategy="afterInteractive"
          />
          <Script id="gtag-init" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_TRACKING_ID}');
            `}
          </Script>
        </>
      )}
    </>
  );
}
