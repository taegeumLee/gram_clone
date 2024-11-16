"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";
import Physical from "./physical";
import Alcohol from "./alcohol";
import Smoking from "./smoking";
import Photos from "./photos";
const Phone = dynamic(() => import("./phone"), { ssr: false });
const Verification = dynamic(() => import("./verification"), { ssr: false });
const Terms = dynamic(() => import("./terms"), { ssr: false });
const BasicInfo = dynamic(() => import("./basicInfo"), { ssr: false });
const Birth = dynamic(() => import("./birth"), { ssr: false });
const Location = dynamic(() => import("./location"), { ssr: false });
const Background = dynamic(() => import("./background"), { ssr: false });
const Job = dynamic(() => import("./job"), { ssr: false });
const Religion = dynamic(() => import("./religion"), { ssr: false });
const Preferences = dynamic(() => import("./preferences"), { ssr: false });
const Interests = dynamic(() => import("./interests"), { ssr: false });
type SignUpStep =
  | "phone"
  | "verification"
  | "terms"
  | "basic"
  | "birth"
  | "location"
  | "physical"
  | "background"
  | "job"
  | "religion"
  | "alcohol"
  | "smoking"
  | "photos"
  | "preferences"
  | "interests";

const STEP_SEQUENCE: Record<SignUpStep, SignUpStep> = {
  phone: "verification",
  verification: "terms",
  terms: "basic",
  basic: "birth",
  birth: "location",
  location: "physical",
  physical: "background",
  background: "job",
  job: "religion",
  religion: "alcohol",
  alcohol: "smoking",
  smoking: "photos",
  photos: "preferences",
  preferences: "interests",
  interests: "phone", // 마지막 단계 처리
};

const STEP_COMPONENTS: Record<SignUpStep, React.ComponentType<any>> = {
  phone: Phone,
  verification: Verification,
  terms: Terms,
  basic: BasicInfo,
  birth: Birth,
  location: Location,
  physical: Physical,
  background: Background,
  job: Job,
  religion: Religion,
  alcohol: Alcohol,
  smoking: Smoking,
  photos: Photos,
  preferences: Preferences,
  interests: Interests,
};

export default function SignUpForm() {
  const [currentStep, setCurrentStep] = useState<SignUpStep>("job");
  const [phoneNumber, setPhoneNumber] = useState<string>("");

  const handleNext = (data?: any) => {
    if (currentStep === "phone" && data) {
      setPhoneNumber(data);
    }
    setCurrentStep(STEP_SEQUENCE[currentStep]);
  };

  const CurrentStepComponent = STEP_COMPONENTS[currentStep];

  return (
    <div className="h-full w-full flex flex-col items-center">
      <AnimatePresence mode="wait">
        <CurrentStepComponent
          key={currentStep}
          onNext={handleNext}
          phoneNumber={currentStep === "verification" ? phoneNumber : undefined}
        />
      </AnimatePresence>
    </div>
  );
}
