"use client";

import { useEffect } from "react";

export default function ProgressBar() {
  useEffect(() => {
    if (window.innerWidth < 768) return; // nie działa na telefonach

    const section = document.querySelector<HTMLElement>(".how-we-work");
    const bar = document.querySelector<HTMLElement>(".progress-bar");

    if (!section || !bar) return;

    const handleScroll = () => {
      const rect = section.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      if (rect.top < windowHeight && rect.bottom > 0) {
        const distanceToMiddle = Math.max(0, windowHeight / 2 - rect.top);
        bar.style.height = distanceToMiddle + "px";
      } else if (rect.top >= windowHeight) {
        bar.style.height = "0";
      } else if (rect.bottom <= 0) {
        bar.style.height = rect.height + "px";
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return null;
}
