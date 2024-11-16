"use client";

import { useState } from "react";
import Layout from "@/components/common/Layout";
import Button from "@/components/common/Button";
import Header from "@/components/common/Header";

interface BackgroundProps {
  onNext: () => void;
}

export default function Background({ onNext }: BackgroundProps) {
  const [selectedEducation, setSelectedEducation] = useState<string | null>(
    null
  );

  const educationLevels = [
    "고등학교",
    "전문대",
    "대학교",
    "석사",
    "박사",
    "기타",
  ];

  return (
    <Layout className="max-w-2xl mx-auto">
      <Header
        title="학력을 선택해주세요"
        subtitle="최종 학력을 선택해 주세요"
      />

      <div className="flex-1 space-y-4">
        {educationLevels.map((level) => (
          <button
            key={level}
            onClick={() => setSelectedEducation(level)}
            className={`w-full p-4 text-left rounded-2xl transition-all duration-200
              ${
                selectedEducation === level
                  ? "bg-gradient-to-r from-sky-500 to-sky-600 text-white"
                  : "bg-gray-50 hover:bg-gray-100 text-gray-700 border border-gray-100"
              }
              hover:scale-[1.01] active:scale-[0.99]
            `}
          >
            {level}
          </button>
        ))}
      </div>

      <Button onClick={onNext} disabled={!selectedEducation} isFixed>
        다음
      </Button>
    </Layout>
  );
}
