"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, Variants, Easing } from "framer-motion";

// easing
const easeOut: Easing = [0.42, 0, 0.58, 1];

// variants dla całego navbaru (z dołu)
const navbarVariants: Variants = {
  hidden: { opacity: 0, y: 50 }, // start 50px poniżej
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: easeOut } },
};

interface NavbarProps {
  onGetStarted?: () => void;
}

export default function Navbar({ onGetStarted }: NavbarProps) {
  const pathname = usePathname();
  const isHome = pathname === "/";

  return (
    <motion.nav
      variants={navbarVariants}
      initial="hidden"
      animate="show"
      className={`navbar fixed-top navbar-expand-lg py-4 ${
        isHome ? "bg-transparent" : "bg-white"
      }`}
    >
      <div className="container">
        <Link href="/" className="navbar-brand">
          <Image
            src="https://res.cloudinary.com/da8w3pd4f/image/upload/v1757862769/Logo-PNG_1_zfa6uz.webp"
            alt="Company Logo"
            width={150}
            height={0}
            style={{ height: "auto" }}
            priority
          />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            {["/how-we-work", "/blog", "#faq"].map((href, i) => {
              const label =
                href === "#faq"
                  ? "FAQ"
                  : href.split("/").pop()?.replaceAll("-", " ") || "";
              return (
                <li className="nav-item" key={i}>
                  <Link
                    href={href}
                    className={`nav-link fs-5 fw-bold me-3 ${
                      isHome ? "text-white" : "text-dark"
                    }`}
                  >
                    {label.charAt(0).toUpperCase() + label.slice(1)}
                  </Link>
                </li>
              );
            })}
          </ul>
          <Link href="/get-started">
            <button className="btn fs-5 btn-lg px-4 rounded-5">
              Get started
            </button>
          </Link>
        </div>
      </div>
    </motion.nav>
  );
}
