"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function NavbarScrollEffect() {
  const pathname = usePathname();

  useEffect(() => {
    const navbar = document.querySelector(".navbar");
    const navLinks = document.querySelectorAll(".nav-link");

    if (!navbar) return;

    // 🔹 Domyślne style na wszystkich stronach poza "/"
    if (pathname !== "/") {
      navbar.classList.remove("bg-transparent");
      navbar.classList.add("bg-white");

      navLinks.forEach((link) => {
        link.classList.remove("text-white");
        link.classList.add("text-dark");
      });

      return; // koniec — bez scroll effect
    }

    // 🔹 Scroll effect tylko na "/"
    const handleScroll = () => {
      if (window.scrollY > 50) {
        navbar.classList.remove("bg-transparent");
        navbar.classList.add("bg-white");

        navLinks.forEach((link) => {
          link.classList.remove("text-white");
          link.classList.add("text-dark");
        });
      } else {
        navbar.classList.add("bg-transparent");
        navbar.classList.remove("bg-white");

        navLinks.forEach((link) => {
          link.classList.add("text-white");
          link.classList.remove("text-dark");
        });
      }
    };

    window.addEventListener("scroll", handleScroll);

    // wywołaj od razu żeby ustawić stan przy wejściu na stronę
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [pathname]);

  return null;
}
