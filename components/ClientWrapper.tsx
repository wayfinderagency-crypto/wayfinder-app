"use client";
import { useState } from "react";
import Navbar from "./Navbar";
import GetStartedModal from "./GetStartedModal";

export default function ClientWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <Navbar onGetStarted={() => setShowModal(true)} />
      {children}
      <GetStartedModal show={showModal} onClose={() => setShowModal(false)} />
    </>
  );
}
