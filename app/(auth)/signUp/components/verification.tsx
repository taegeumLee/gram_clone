"use client";

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

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

  return (
    <div className="flex flex-col min-h-screen justify-between w-full p-6 bg-white">
      {/* 헤더 */}

      {/* 메인 콘텐츠 */}
      <div className="flex-1 flex flex-col items-center justify-center -mt-20">
        <h1 className="text-3xl font-bold mb-2 tracking-tight text-gray-800">
          {phoneNumber}
        </h1>
        <p className="text-gray-500 text-md mb-8">
          전송된 인증번호를 입력해주세요
        </p>

        {/* 6개의 인증번호 입력 칸 */}
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
              className={`w-14 h-14 text-center text-2xl font-semibold border-2 rounded-xl
                shadow-sm transition-all duration-200
                focus:border-sky-500 focus:ring-2 focus:ring-sky-200 focus:outline-none text-gray-800
                ${
                  digit !== ""
                    ? "bg-white border-gray-300"
                    : "bg-gray-50 border-gray-200"
                }
                hover:border-sky-300`}
            />
          ))}
        </div>
      </div>

      {/* 하단 버튼 */}
      <button
        onClick={onNext}
        className="w-full p-4 font-medium bg-gray-200 text-gray-800  hover:text-white rounded-xl shadow-sm hover:bg-sky-500
          transition-all duration-200
          hover:shadow-md hover:-translate-y-0.5
          focus:outline-none focus:ring-2 focus:ring-sky-300"
      >
        인증하기
      </button>
    </div>
  );
}
