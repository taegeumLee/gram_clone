"use client";

import { useState } from "react";
import Layout from "@/components/common/Layout";
import Header from "@/components/common/Header";
import Button from "@/components/common/Button";
import Input from "@/components/common/Input";

interface ReligionProps {
  onNext: () => void;
}

export default function Religion({ onNext }: ReligionProps) {
  const [selectedReligion, setSelectedReligion] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const religions = [
    "무교",
    "기독교",
    "불교",
    "천주교",
    "이슬람교",
    "힌두교",
    "원불교",
    "유대교",
    "시크교",
    "성공회",
    "동방정교회",
    "민속 신앙",
    "기타",
  ];

  const filteredReligions = religions.filter((religion) =>
    religion.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Layout className="max-w-2xl mx-auto">
      <Header title="종교를 선택해주세요" />

      <div className="flex-1">
        <div className="relative mb-6">
          <Input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="검색"
            className="pr-10"
          />
          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
            🔍
          </span>
        </div>

        <div className="space-y-3">
          {filteredReligions.map((religion) => (
            <button
              key={religion}
              onClick={() => setSelectedReligion(religion)}
              className={`w-full p-4 text-left rounded-xl transition-all duration-200
                ${
                  selectedReligion === religion
                    ? "bg-sky-500 text-white"
                    : "hover:bg-gray-50 text-gray-700 border border-gray-200"
                }
              `}
            >
              {religion}
            </button>
          ))}
        </div>
      </div>

      <Button onClick={onNext} disabled={!selectedReligion} isFixed>
        다음
      </Button>
    </Layout>
  );
}
