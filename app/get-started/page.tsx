"use client";

import { useState } from "react";
import GetStartedIntro from "@/components/GetStartedIntro";
import GetStartedForm from "@/components/GetStartedForm";

export default function GetStartedPage() {
  const [showForm, setShowForm] = useState(false);

  return (
    <section className="get-started">
      <GetStartedForm />
    </section>
  );
}
