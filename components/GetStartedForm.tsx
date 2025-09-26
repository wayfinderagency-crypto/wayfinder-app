"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  GoogleReCaptchaProvider,
  useGoogleReCaptcha,
} from "react-google-recaptcha-v3";

import Step1 from "./Steps/Step1";
import Step2 from "./Steps/Step2";
import Step3 from "./Steps/Step3";
import Step4 from "./Steps/Step4";
import Step5 from "./Steps/Step5";
import Step6 from "./Steps/Step6";

const stepVariants = {
  initial: { opacity: 0, x: 50 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -50 },
};

function FormContent() {
  const [step, setStep] = useState<number>(1);
  const { executeRecaptcha } = useGoogleReCaptcha();
  const [loading, setLoading] = useState(false);

  const initialFormData = {
    fullName: "",
    email: "",
    age: "",
    timeAvailable: "",
    origin: "",
    contentType: "",
    startDate: "",
    hasOnlyFans: false,
    blockedCountries: "",
    pictures: null as FileList | null,
    phone: "",
    socialMedia: "",
    tiktok60: false,
    phonesCount: "1",
  };

  const [formData, setFormData] = useState(initialFormData);

  type FormValue = string | boolean | FileList | null;

  const step1Valid =
    formData.fullName.trim() !== "" && formData.email.trim() !== "";

  const handleChange = (field: string, value: FormValue) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const nextStep = () => setStep((prev) => Math.min(prev + 1, 5));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  const resetForm = () => {
    setFormData(initialFormData);
    setStep(1);
  };

  const handleSubmit = async () => {
    if (!executeRecaptcha) return;

    setLoading(true);
    const token = await executeRecaptcha("form_submit");

    const fd = new FormData();
    fd.append("recaptcha-token", token);

    Object.entries(formData).forEach(([key, val]) => {
      if (key === "pictures" && val instanceof FileList) {
        Array.from(val).forEach((file) => {
          fd.append("pictures", file);
        });
      } else if (val !== null) {
        fd.append(key, String(val));
      }
    });

    const res = await fetch("/api/contact", {
      method: "POST",
      body: fd,
    });

    const data = await res.json();

    if (data.success) {
      setFormData(initialFormData);
      setStep(6);
    } else {
      alert("Failed ❌");
    }
    setLoading(false);
  };

  return (
    <div className="d-flex flex-column align-items-center w-100 p-3">
      <div className="w-100" style={{ maxWidth: 500 }}>
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              variants={stepVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <Step1 data={formData} onChange={handleChange} />
            </motion.div>
          )}
          {step === 2 && (
            <motion.div
              key="step2"
              variants={stepVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <Step2 data={formData} onChange={handleChange} />
            </motion.div>
          )}
          {step === 3 && (
            <motion.div
              key="step3"
              variants={stepVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <Step3 data={formData} onChange={handleChange} />
            </motion.div>
          )}
          {step === 4 && (
            <motion.div
              key="step4"
              variants={stepVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <Step4 data={formData} onChange={handleChange} />
            </motion.div>
          )}
          {step === 5 && (
            <motion.div
              key="step5"
              variants={stepVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <Step5 data={formData} onChange={handleChange} />
            </motion.div>
          )}
          {step === 6 && (
            <motion.div
              key="step6"
              variants={stepVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <Step6 onRestart={resetForm} />
            </motion.div>
          )}
        </AnimatePresence>

        {step < 6 && (
          <div className="mt-5 d-flex justify-content-between w-100">
            {step > 1 ? (
              <button
                className="btn fs-5 px-4 rounded-5 w-45"
                onClick={prevStep}
              >
                Previous
              </button>
            ) : (
              <div style={{ width: "45%" }} />
            )}

            {step < 5 ? (
              <button
                className="btn fs-5 px-4 rounded-5 w-45"
                onClick={nextStep}
                disabled={step === 1 && !step1Valid}
              >
                Next
              </button>
            ) : (
              <button
                className="btn btn-second fs-5 px-4 rounded-5 w-45"
                onClick={handleSubmit}
                disabled={loading}
              >
                {loading ? "Sending..." : "Submit"}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default function GetStartedForm() {
  return (
    <GoogleReCaptchaProvider
      reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}
    >
      <FormContent />
    </GoogleReCaptchaProvider>
  );
}
