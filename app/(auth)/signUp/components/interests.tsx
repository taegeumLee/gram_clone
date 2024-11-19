"use client";

import { useState, useEffect } from "react";
import Layout from "@/components/common/Layout";
import Header from "@/components/common/Header";
import Button from "@/components/common/Button";
import db from "@/lib/db";

interface Interest {
  id: string;
  name: string;
  userId: string | null;
  createdAt: Date;
}

async function getInterests() {
  return await db.interest.findMany({
    select: {
      name: true,
      id: true,
      userId: true,
      createdAt: true,
    },
  });
}

interface InterestsProps {
  onNext: (data: { interests: string[] }) => void;
}

export default function Interests({ onNext }: InterestsProps) {
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [customInterest, setCustomInterest] = useState("");
  const [interests, setInterests] = useState<Interest[]>([]);

  useEffect(() => {
    getInterests().then((data) => setInterests(data));
  }, []);

  const toggleInterest = (interest: string) => {
    setSelectedInterests((prev) => {
      if (prev.includes(interest)) {
        return prev.filter((i) => i !== interest);
      }
      if (prev.length >= 5) return prev;
      return [...prev, interest];
    });
  };

  const addCustomInterest = (e: React.FormEvent) => {
    e.preventDefault();
    if (customInterest.trim() && selectedInterests.length < 5) {
      setInterests((prev) => [
        {
          id: Date.now().toString(),
          name: customInterest.trim(),
          userId: null,
          createdAt: new Date(),
        },
        ...prev,
      ]);
      setSelectedInterests((prev) => [...prev, customInterest.trim()]);
      setCustomInterest("");
    }
  };

  return (
    <Layout>
      <Header
        title="관심사를 선택해주세요"
        subtitle="최대 5개까지 선택할 수 있어요"
      />

      <div className="flex-1">
        <form onSubmit={addCustomInterest} className="mb-4">
          <div className="flex gap-2">
            <input
              type="text"
              value={customInterest}
              onChange={(e) => setCustomInterest(e.target.value)}
              placeholder="나만의 관심사를 입력해주세요"
              className="flex-1 px-4 py-2 border-2 border-gray-200 rounded-full text-sm
                focus:outline-none focus:border-sky-500 text-gray-800"
              maxLength={20}
            />
            <button
              type="submit"
              className="px-4 py-2 bg-sky-500 text-white rounded-full text-sm
                hover:bg-sky-600 disabled:opacity-50"
              disabled={!customInterest.trim() || selectedInterests.length >= 5}
            >
              추가
            </button>
          </div>
        </form>

        <div className="grid grid-cols-3 gap-2">
          {interests.map(({ name }) => (
            <button
              key={name}
              onClick={() => toggleInterest(name)}
              className={`p-3 rounded-xl flex flex-col items-center justify-center gap-1
                border-2 transition-all duration-200
                ${
                  selectedInterests.includes(name)
                    ? "border-sky-500 bg-sky-50 text-sky-500"
                    : "border-gray-200 hover:border-sky-300 text-gray-600"
                }`}
              disabled={
                selectedInterests.length >= 5 &&
                !selectedInterests.includes(name)
              }
            >
              <span className="text-sm font-medium">{name}</span>
            </button>
          ))}
        </div>
      </div>

      <Button
        onClick={() => onNext({ interests: selectedInterests })}
        disabled={selectedInterests.length === 0}
        isFixed
      >
        다음
      </Button>
    </Layout>
  );
}
