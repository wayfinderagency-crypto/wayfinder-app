"use client";

import { useEffect } from "react";

export default function HomeCollapse() {
  useEffect(() => {
    const collapses = document.querySelectorAll(".collapse");

    collapses.forEach((collapseEl) => {
      const showHandler = () => {
        const button = document.querySelector(
          `[data-bs-target="#${collapseEl.id}"]`
        );
        if (button) {
          const icon = button.querySelector(".icon");
          if (icon) icon.textContent = "−";
        }
      };

      const hideHandler = () => {
        const button = document.querySelector(
          `[data-bs-target="#${collapseEl.id}"]`
        );
        if (button) {
          const icon = button.querySelector(".icon");
          if (icon) icon.textContent = "+";
        }
      };

      collapseEl.addEventListener("shown.bs.collapse", showHandler);
      collapseEl.addEventListener("hidden.bs.collapse", hideHandler);

      // cleanup po odmontowaniu
      return () => {
        collapseEl.removeEventListener("shown.bs.collapse", showHandler);
        collapseEl.removeEventListener("hidden.bs.collapse", hideHandler);
      };
    });
  }, []);

  return null; // nie renderuje nic w DOM
}
