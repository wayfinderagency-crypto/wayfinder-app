"use client";

import { useState } from "react";
import GetStartedForm from "@/components/GetStartedForm";

export default function GetStartedPage() {
  const [showForm, setShowForm] = useState(false);

  return (
    <section className="get-started mt-5 mt-md-0">
      <GetStartedForm />
    </section>
  );
}
