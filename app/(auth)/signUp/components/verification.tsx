"use client";

import React, { useState, useEffect } from "react";
import Layout from "@/components/common/Layout";
import Header from "@/components/common/Header";
import Button from "@/components/common/Button";

interface VerificationProps {
  phoneNumber: string;
  onNext: () => void;
}

export default function Verification({
  phoneNumber,
  onNext,
}: VerificationProps) {
  const [verificationCode, setVerificationCode] = useState(Array(6).fill(""));

  useEffect(() => {
    const firstInput = document.querySelector(
      'input[name="verification-0"]'
    ) as HTMLInputElement;
    if (firstInput) firstInput.focus();
  }, []);

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    if (value.length > 1) return;

    const newCode = [...verificationCode];
    newCode[index] = value;
    setVerificationCode(newCode);

    if (value !== "" && index < 5) {
      const nextInput = document.querySelector(
        `input[name=verification-${index + 1}]`
      ) as HTMLInputElement;
      if (nextInput) nextInput.focus();
    }
    if (index === 5) {
      onNext();
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Backspace" && verificationCode[index] === "" && index > 0) {
      const prevInput = document.querySelector(
        `input[name=verification-${index - 1}]`
      ) as HTMLInputElement;
      if (prevInput) prevInput.focus();
    }
  };

  const isComplete = verificationCode.every((digit) => digit !== "");

  return (
    <Layout>
      <Header title={phoneNumber} subtitle="전송된 인증번호를 입력해주세요" />

      <div className="flex-1 flex flex-col items-center justify-center -mt-20">
        <div className="flex gap-3 w-full justify-center mb-8">
          {verificationCode.map((digit, index) => (
            <input
              key={index}
              type="text"
              inputMode="numeric"
              pattern="\d*"
              name={`verification-${index}`}
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Backspace" && index > 0) {
                  handleKeyDown(index, e);
                }
              }}
              maxLength={1}
              className={`w-14 h-14 text-center text-2xl font-bold rounded-2xl
                transition-all duration-200 focus:outline-none text-gray-800
                border-2 border-gray-200 hover:border-sky-300`}
            />
          ))}
        </div>
      </div>

      <Button onClick={onNext} disabled={!isComplete} isFixed>
        인증하기
      </Button>
    </Layout>
  );
}
