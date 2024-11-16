"use client";

import { useState } from "react";
import Layout from "@/components/common/Layout";
import Header from "@/components/common/Header";
import Button from "@/components/common/Button";

interface PhysicalProps {
  onNext: (height: number) => void;
}

export default function Physical({ onNext }: PhysicalProps) {
  const [height, setHeight] = useState<string[]>(["", "", ""]);

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    if (value.length > 1) return;

    const newHeight = [...height];
    newHeight[index] = value;
    setHeight(newHeight);

    if (value !== "" && index < 2) {
      const nextInput = document.querySelector(
        `input[name=height-${index + 1}]`
      ) as HTMLInputElement;
      if (nextInput) nextInput.focus();
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Backspace" && height[index] === "" && index > 0) {
      const prevInput = document.querySelector(
        `input[name=height-${index - 1}]`
      ) as HTMLInputElement;
      if (prevInput) prevInput.focus();
    }
  };

  const isValid = height.every((digit) => digit !== "");

  return (
    <Layout>
      <Header
        title="키를 알려주세요"
        subtitle="정확한 매칭을 위해 실제 키를 입력해주세요"
      />

      <div className="flex-1 flex flex-col items-center justify-center -mt-20">
        <div className="flex items-center gap-2 mb-8">
          {height.map((digit, index) => (
            <input
              key={index}
              type="text"
              inputMode="numeric"
              pattern="\d*"
              name={`height-${index}`}
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              maxLength={1}
              className={`w-20 h-20 text-center text-3xl font-bold rounded-2xl
                transition-all duration-200 focus:outline-none
                text-gray-800 bg-white border-2 ${
                  digit !== "" ? "border-sky-500" : "border-gray-200"
                }`}
            />
          ))}
          <span className="text-2xl font-bold text-gray-800 ml-2">cm</span>
        </div>
      </div>

      <Button
        onClick={() => isValid && onNext(parseInt(height.join("")))}
        disabled={!isValid}
        isFixed
      >
        다음
      </Button>
    </Layout>
  );
}
