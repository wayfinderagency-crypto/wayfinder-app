"use client";

import { useEffect } from "react";

export default function Stars() {
  useEffect(() => {
    const container = document.querySelector(".stars-container");
    if (!container) return;

    const heartWidth = 20; // opcjonalnie, jeśli CSS serduszka ma szerokość

    const createHeart = () => {
      const heart = document.createElement("div");
      heart.classList.add("heart");

      // losowa pozycja w 80% szerokości kontenera (od 10% do 90%)
      const minPercent = 10;
      const maxPercent = 90;
      const left = Math.random() * (maxPercent - minPercent) + minPercent;
      heart.style.left = `${left}%`;

      // losowy ruch w bok (używany przez CSS --x)
      const x = Math.random() * 20 - 10; // od -10px do 10px
      heart.style.setProperty("--x", `${x}px`);

      container.appendChild(heart);

      setTimeout(() => heart.remove(), 2500); // usuń po animacji
    };

    const interval = setInterval(createHeart, 300);

    return () => clearInterval(interval); // cleanup
  }, []);

  return null;
}
