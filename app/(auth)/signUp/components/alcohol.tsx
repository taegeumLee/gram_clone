"use client";

import { useState } from "react";
import { TbGlassFullFilled, TbGlassFull, TbGlassOff } from "react-icons/tb";
import Button from "@/components/common/Button";
import Layout from "@/components/common/Layout";
import Header from "@/components/common/Header";

interface AlcoholProps {
  onNext: () => void;
}

export default function Alcohol({ onNext }: AlcoholProps) {
  const [selectedFrequency, setSelectedFrequency] = useState<string | null>(
    null
  );

  const frequencies = ["자주 마셔요", "가끔 마셔요", "안 마셔요"];

  const getIcon = (frequency: string) => {
    switch (frequency) {
      case "자주 마셔요":
        return <TbGlassFullFilled className="text-2xl" />;
      case "가끔 마셔요":
        return <TbGlassFull className="text-2xl" />;
      case "안 마셔요":
        return <TbGlassOff className="text-2xl" />;
      default:
        return null;
    }
  };

  return (
    <Layout className="max-w-2xl mx-auto">
      <Header
        title="술은 얼마나 자주 드시나요?"
        subtitle="솔직한 답변이 좋은 매칭으로 이어져요"
      />

      <div className="flex-1 space-y-4">
        {frequencies.map((frequency) => (
          <button
            key={frequency}
            onClick={() => setSelectedFrequency(frequency)}
            className={`w-full p-5 text-left rounded-2xl transition-all duration-200
              ${
                selectedFrequency === frequency
                  ? "bg-gradient-to-r from-sky-500 to-sky-600 text-white"
                  : "bg-gray-50 hover:bg-gray-100 text-gray-700 border border-gray-100"
              }
              hover:scale-[1.01] active:scale-[0.99]
            `}
          >
            <div className="flex items-center gap-3">
              {getIcon(frequency)}
              <span>{frequency}</span>
            </div>
          </button>
        ))}
      </div>

      <Button onClick={onNext} disabled={!selectedFrequency} isFixed>
        다음
      </Button>
    </Layout>
  );
}
