"use client";

import { useEffect } from "react";

export default function StickySectionsEffect() {
  useEffect(() => {
    const handleScroll = () => {
      const sections = Array.from(
        document.querySelectorAll<HTMLElement>(".sticky-col")
      );

      sections.forEach((section, i) => {
        const next = sections[i + 1];
        const rect = section.getBoundingClientRect();

        if (next) {
          const nextRect = next.getBoundingClientRect();
          const startEffectPoint = 100;

          const progressToTop = Math.min(
            Math.max((startEffectPoint - rect.top) / startEffectPoint, 0),
            1
          );

          const overlap = rect.bottom - nextRect.top;

          let progress: number;
          if (overlap > 0) {
            progress = Math.min(overlap / rect.height, 1);
          } else {
            progress = progressToTop;
          }

          const scale = 1 - progress * 0.1;
          const translate = progress * 15;

          section.style.transform = `scale(${scale}) translateY(${translate}px)`;
        } else {
          const startEffectPoint = 100;
          const progress = Math.min(
            Math.max((startEffectPoint - rect.top) / startEffectPoint, 0),
            1
          );

          const scale = 1 - progress * 0.1;
          const translate = progress * 15;

          section.style.transform = `scale(${scale}) translateY(${translate}px)`;
        }
      });
    };

    // Podpinamy scroll
    window.addEventListener("scroll", handleScroll);

    // Wywołanie od razu przy mount
    handleScroll();

    // Cleanup przy odmontowaniu
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return null; // Komponent nie renderuje nic w JSX
}
