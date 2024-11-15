"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Phone from "./phone";
import Verification from "./verification";
import Terms from "./terms";
import BasicInfo from "./basicInfo";
import Birth from "./birth";
import Location from "./location";
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
  const [currentStep, setCurrentStep] = useState<SignUpStep>("phone");
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
