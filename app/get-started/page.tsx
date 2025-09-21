"use client";

import { useState } from "react";
import GetStartedIntro from "@/components/GetStartedIntro";
import GetStartedForm from "@/components/GetStartedForm";
import { section } from "framer-motion/client";

export default function GetStartedPage() {
  const [showForm, setShowForm] = useState(false);

  return (
    <section className="get-started">
      {!showForm ? (
        <GetStartedIntro onNext={() => setShowForm(true)} />
      ) : (
        <GetStartedForm />
      )}
    </section>
  );
}
