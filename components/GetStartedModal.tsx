"use client";

import { useEffect } from "react";
import GetStartedForm from "./GetStartedForm";
import Image from "next/image";

interface GetStartedModalProps {
  show: boolean;
  onClose: () => void;
}

export default function GetStartedModal({
  show,
  onClose,
}: GetStartedModalProps) {
  useEffect(() => {
    document.body.style.overflow = show ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [show]);

  if (!show) return null;

  return (
    <div
      className={`modal fade ${show ? "show d-block" : ""}`}
      tabIndex={-1}
      onClick={onClose}
      style={{ backgroundColor: "rgba(0,0,0,0.7)" }}
    >
      <div
        className="modal-dialog modal-dialog-centered"
        onClick={(e) => e.stopPropagation()}
        style={{ minWidth: "95%", height: "95%" }}
      >
        <div
          className="modal-content rounded-4 d-flex flex-column"
          style={{ width: "100%", height: "100%", padding: "2rem" }}
        >
          <div className="modal-header border-0">
            <Image
              src="https://res.cloudinary.com/da8w3pd4f/image/upload/v1757862769/Logo-PNG_1_zfa6uz.webp"
              alt="Company Logo"
              width={150}
              height={0}
              style={{ height: "auto" }}
              priority
            />
            <button
              type="button"
              className="btn-close"
              onClick={onClose}
            ></button>
          </div>

          <div className="modal-body d-flex flex-column justify-content-center align-items-center text-center flex-grow-1">
            <GetStartedForm />
          </div>
        </div>
      </div>
    </div>
  );
}
