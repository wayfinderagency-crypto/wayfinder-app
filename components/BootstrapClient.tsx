"use client";

import { useEffect } from "react";

export default function BootstrapClient() {
  useEffect(() => {
    // import dynamiczny działa tylko w przeglądarce
    import("bootstrap/dist/js/bootstrap.bundle.min")
      .then(() => console.log("Bootstrap JS załadowany!"))
      .catch((err) => console.error("Błąd ładowania Bootstrapa:", err));
  }, []);

  return null; // komponent nic nie renderuje
}
