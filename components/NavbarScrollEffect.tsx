"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function NavbarScrollEffect() {
  const pathname = usePathname();

  useEffect(() => {
    const navbar = document.querySelector(".navbar");
    const navLinks = document.querySelectorAll(".nav-link");
    const collapse = document.getElementById("navbarNav");

    if (!navbar) return;

    // 🔹 Funkcja: ustaw navbar biały (czarny hamburger + linki)
    const setWhite = () => {
      navbar.classList.remove("bg-transparent", "navbar-dark");
      navbar.classList.add("bg-white", "navbar-light");

      navLinks.forEach((link) => {
        link.classList.remove("text-white");
        link.classList.add("text-dark");
      });
    };

    // 🔹 Funkcja: ustaw navbar transparentny (biały hamburger + linki)
    const setTransparent = () => {
      navbar.classList.add("bg-transparent", "navbar-dark");
      navbar.classList.remove("bg-white", "navbar-light");

      navLinks.forEach((link) => {
        link.classList.add("text-white");
        link.classList.remove("text-dark");
      });
    };

    // 🔹 Jeżeli nie jesteśmy na homepage → zawsze biały navbar
    if (pathname !== "/") {
      setWhite();
      return;
    }

    // 🔹 Scroll effect tylko na homepage
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setWhite();
      } else {
        // tylko jeśli menu nie jest otwarte
        if (!collapse?.classList.contains("show")) {
          setTransparent();
        }
      }
    };

    // 🔹 Obsługa otwierania/zamykania menu mobilnego
    const handleShow = () => setWhite();
    const handleHide = () => {
      if (window.scrollY <= 50) setTransparent();
    };

    collapse?.addEventListener("shown.bs.collapse", handleShow);
    collapse?.addEventListener("hidden.bs.collapse", handleHide);
    window.addEventListener("scroll", handleScroll);

    // ustawienie stanu przy wejściu
    handleScroll();

    return () => {
      collapse?.removeEventListener("shown.bs.collapse", handleShow);
      collapse?.removeEventListener("hidden.bs.collapse", handleHide);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [pathname]);

  return null;
}
