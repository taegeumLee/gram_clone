"use client";

import { useState } from "react";
import { FaSmoking, FaSmokingBan } from "react-icons/fa";
import Layout from "@/components/common/Layout";
import Header from "@/components/common/Header";
import Button from "@/components/common/Button";

interface SmokingProps {
  onNext: () => void;
}

export default function Smoking({ onNext }: SmokingProps) {
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);

  const smokingStatuses = ["자주 피워요", "가끔 피워요", "안 피워요"];

  const getIcon = (status: string) => {
    switch (status) {
      case "자주 피워요":
        return (
          <>
            <FaSmoking className="text-2xl" />
            <FaSmoking className="text-2xl" />
            <FaSmoking className="text-2xl" />
          </>
        );
      case "가끔 피워요":
        return <FaSmoking className="text-2xl" />;
      case "안 피워요":
        return <FaSmokingBan className="text-2xl" />;
      default:
        return null;
    }
  };

  return (
    <Layout className="max-w-2xl mx-auto">
      <Header
        title="흡연은 얼마나 자주 하시나요?"
        subtitle="솔직한 답변이 좋은 매칭으로 이어져요"
      />

      <div className="flex-1 space-y-4">
        {smokingStatuses.map((status) => (
          <button
            key={status}
            onClick={() => setSelectedStatus(status)}
            className={`w-full p-5 text-left rounded-2xl transition-all duration-200
              ${
                selectedStatus === status
                  ? "bg-gradient-to-r from-sky-500 to-sky-600 text-white"
                  : "bg-gray-50 hover:bg-gray-100 text-gray-700 border border-gray-100"
              }
              hover:scale-[1.01] active:scale-[0.99]
            `}
          >
            <div className="flex items-center gap-3">
              {getIcon(status)}
              <span>{status}</span>
            </div>
          </button>
        ))}
      </div>

      <Button onClick={onNext} disabled={!selectedStatus} isFixed>
        다음
      </Button>
    </Layout>
  );
}
