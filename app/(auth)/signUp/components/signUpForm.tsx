"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";
const Phone = dynamic(() => import("./phone"), { ssr: false });
const Verification = dynamic(() => import("./verification"), { ssr: false });
const Terms = dynamic(() => import("./terms"), { ssr: false });
const BasicInfo = dynamic(() => import("./basicInfo"), { ssr: false });
const Birth = dynamic(() => import("./birth"), { ssr: false });
const Location = dynamic(() => import("./location"), { ssr: false });

type SignUpStep =
  | "phone"
  | "verification"
  | "terms"
  | "basic"
  | "birth"
  | "location"
  | "physical"
  | "background"
  | "religion"
  | "alcohol"
  | "smoking"
  | "photos"
  | "preferences"
  | "interests";

export default function SignUpForm() {
  const [currentStep, setCurrentStep] = useState<SignUpStep>("location");
  const [phoneNumber, setPhoneNumber] = useState<string>("");

  return (
    <div className="h-full w-full flex flex-col items-center">
      <AnimatePresence mode="wait">
        {currentStep === "phone" && (
          <Phone
            onNext={(number: string) => {
              setPhoneNumber(number);
              setCurrentStep("verification");
            }}
          />
        )}
        {currentStep === "verification" && (
          <Verification
            phoneNumber={phoneNumber}
            onNext={() => setCurrentStep("terms")}
          />
        )}
        {currentStep === "terms" && (
          <Terms onNext={() => setCurrentStep("basic")} />
        )}
        {currentStep === "basic" && (
          <BasicInfo onNext={() => setCurrentStep("birth")} />
        )}
        {currentStep === "birth" && (
          <Birth onNext={() => setCurrentStep("location")} />
        )}
        {currentStep === "location" && (
          <Location onNext={() => setCurrentStep("physical")} />
        )}
      </AnimatePresence>
    </div>
  );
}
