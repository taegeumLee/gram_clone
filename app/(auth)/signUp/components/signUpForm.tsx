"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";
import Physical from "./physical";
import Alcohol from "./alcohol";
import Smoking from "./smoking";
import Photos from "./photos";
import { useRouter } from "next/navigation";
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
const Feature = dynamic(() => import("./feature"), { ssr: false });
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
  | "feature"
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
  preferences: "feature",
  feature: "interests",
  interests: "interests", // 마지막 단계 처리
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
  feature: Feature,
  interests: Interests,
};

interface SignUpData {
  phoneNumber: string;
  gender: string;
  birthDate: Date | null;
  location: string;
  height: number;
  education?: string;
  job?: string;
  religion?: string;
  drinking?: string;
  smoking?: string;
  photos: string[];
  preferences: {
    gender: string;
    ageRangeMin: number;
    ageRangeMax: number;
    location: string;
    distance: number;
    heightRangeMin: number;
    heightRangeMax: number;
    religion: string;
    drinking: string;
    smoking: string;
  };
  interests: string[];
  features: string[];
}

interface Location {
  latitude: number;
  longitude: number;
}

export default function SignUpForm() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState<SignUpStep>("phone");
  const [signUpData, setSignUpData] = useState<SignUpData>({
    phoneNumber: "",
    gender: "",
    birthDate: null,
    location: "",
    height: 0,
    photos: [],
    interests: [],
    features: [],
    preferences: {
      gender: "",
      ageRangeMin: 0,
      ageRangeMax: 0,
      location: "",
      distance: 0,
      heightRangeMin: 0,
      heightRangeMax: 0,
      religion: "",
      drinking: "",
      smoking: "",
    },
    education: "",
    job: "",
    religion: "",
    drinking: "",
    smoking: "",
  });

  const handleNext = (data?: any) => {
    if (!data) {
      setCurrentStep(STEP_SEQUENCE[currentStep]);
      return;
    }

    setSignUpData((prev) => ({
      ...prev,
      ...data,
    }));

    if (currentStep === "interests") {
      handleSignUp();
      return;
    }

    setCurrentStep(STEP_SEQUENCE[currentStep]);
  };

  const handleSignUp = async () => {
    console.log(signUpData);
    try {
      const sanitizedData = {
        phoneNumber: signUpData.phoneNumber,
        gender: signUpData.gender,
        birthDate: signUpData.birthDate?.toISOString(),
        location: signUpData.location,
        height: signUpData.height,
        education: signUpData.education || null,
        job: signUpData.job || null,
        religion: signUpData.religion || null,
        drinking: signUpData.drinking || null,
        smoking: signUpData.smoking || null,
        photos: signUpData.photos.map((url, index) => ({
          url,
          order: index,
        })),
        preferences: {
          gender: signUpData.preferences.gender,
          ageRangeMin: signUpData.preferences.ageRangeMin,
          ageRangeMax: signUpData.preferences.ageRangeMax,
          location: signUpData.preferences.location,
          distance: signUpData.preferences.distance,
          heightRangeMin: signUpData.preferences.heightRangeMin,
          heightRangeMax: signUpData.preferences.heightRangeMax,
          religion: signUpData.preferences.religion,
          drinking: signUpData.preferences.drinking,
          smoking: signUpData.preferences.smoking,
        },
        interests: signUpData.interests,
        features: signUpData.features,
      };

      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(sanitizedData),
      });

      if (!response.ok) {
        throw new Error("회원가입에 실패했습니다.");
      }

      router.push("/home");
    } catch (error) {
      console.error("회원가입 에러:", error);
      alert("회원가입에 실패했습니다. 다시 시도해주세요.");
    }
  };

  const CurrentStepComponent = STEP_COMPONENTS[currentStep];

  return (
    <div className="h-full w-full flex flex-col items-center">
      <AnimatePresence mode="wait">
        <CurrentStepComponent
          key={currentStep}
          onNext={handleNext}
          phoneNumber={
            currentStep === "verification" ? signUpData.phoneNumber : undefined
          }
        />
      </AnimatePresence>
    </div>
  );
}
