"use client";

import { useState } from "react";
import Layout from "@/components/common/Layout";
import Header from "@/components/common/Header";
import Button from "@/components/common/Button";

interface InterestsProps {
  onNext: (data: { interests: string[] }) => void;
}

export default function Interests({ onNext }: InterestsProps) {
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [customInterest, setCustomInterest] = useState("");

  const interests = [
    { emoji: "✈️", text: "여행" },
    { emoji: "🎮", text: "게임" },
    { emoji: "📚", text: "독서" },
    { emoji: "🎵", text: "음악" },
    { emoji: "🎨", text: "그림" },
    { emoji: "🏃", text: "운동" },
    { emoji: "🎬", text: "영화" },
    { emoji: "📸", text: "사진" },
    { emoji: "🍳", text: "요리" },
    { emoji: "🐶", text: "반려동물" },
    { emoji: "🌱", text: "식물" },
    { emoji: "✍️", text: "글쓰기" },
    { emoji: "🎭", text: "공연" },
    { emoji: "⚽", text: "스포츠" },
    { emoji: "🎤", text: "노래" },
    { emoji: "💃", text: "댄스" },
    { emoji: "🎯", text: "자기계발" },
    { emoji: "🧘", text: "명상" },
    { emoji: "🎨", text: "공예" },
    { emoji: "🏔️", text: "등산" },
    { emoji: "🚲", text: "자전거" },
    { emoji: "🎱", text: "당구" },
    { emoji: "🎳", text: "볼링" },
    { emoji: "🏊", text: "수영" },
  ];

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
          {interests.map(({ emoji, text }) => (
            <button
              key={text}
              onClick={() => toggleInterest(text)}
              className={`p-3 rounded-xl flex flex-col items-center justify-center gap-1
                border-2 transition-all duration-200
                ${
                  selectedInterests.includes(text)
                    ? "border-sky-500 bg-sky-50 text-sky-500"
                    : "border-gray-200 hover:border-sky-300 text-gray-600"
                }`}
              disabled={
                selectedInterests.length >= 5 &&
                !selectedInterests.includes(text)
              }
            >
              <span className="text-2xl">{emoji}</span>
              <span className="text-sm font-medium">{text}</span>
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
