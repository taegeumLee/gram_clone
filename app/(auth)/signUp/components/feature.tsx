"use client";

import { useState } from "react";
import Layout from "@/components/common/Layout";
import Header from "@/components/common/Header";
import Button from "@/components/common/Button";

interface FeatureProps {
  onNext: () => void;
}

export default function Feature({ onNext }: FeatureProps) {
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const [customFeature, setCustomFeature] = useState("");
  const [features, setFeatures] = useState([
    { emoji: "🍜", text: "요리를 잘해요" },
    { emoji: "👖", text: "패션 센스가 좋아요" },
    { emoji: "😊", text: "유머 감각이 있어요" },
    { emoji: "📚", text: "다독가에요" },
    { emoji: "😌", text: "다정해요" },
    { emoji: "🎭", text: "엉덩이가 예뻐요" },
    { emoji: "💬", text: "대화를 잘해요" },
    { emoji: "😏", text: "꼬부기 미인" },
    { emoji: "👋", text: "손이 예뻐요" },
    { emoji: "😍", text: "잘생겼어요" },
    { emoji: "😊", text: "웃는게 예뻐요" },
    { emoji: "🗣️", text: "목소리가 좋아요" },
    { emoji: "👀", text: "쌍꺼풀 있는눈" },
    { emoji: "🔍", text: "보조개" },
    { emoji: "💡", text: "이야기를 잘 들어줘요" },
    { emoji: "🎵", text: "노래를 잘해요" },
    { emoji: "", text: "비율이 좋아요" },
    { emoji: "😘", text: "애교가 많아요" },
    { emoji: "🎨", text: "그림을 잘 그려요" },
    { emoji: "🏃", text: "운동을 좋아해요" },
    { emoji: "🧠", text: "지적호기심이 많아요" },
    { emoji: "🌱", text: "자기 계발을 좋아해요" },
    { emoji: "🤝", text: "신뢰할 수 있어요" },
    { emoji: "⭐", text: "긍정적이에요" },
    { emoji: "🎮", text: "게임을 잘해요" },
    { emoji: "📸", text: "사진 찍는걸 좋아해요" },
    { emoji: "🌟", text: "카리스마 있어요" },
    { emoji: "🎯", text: "목표지향적이에요" },
    { emoji: "🤔", text: "생각이 깊어요" },
    { emoji: "👨‍🍳", text: "요리하는걸 좋아해요" },
    { emoji: "🎧", text: "음악을 좋아해요" },
    { emoji: "✈️", text: "여행을 좋아해요" },
    { emoji: "🐱", text: "동물을 좋아해요" },
    { emoji: "🌈", text: "창의적이에요" },
    { emoji: "💪", text: "의지가 강해요" },
    { emoji: "🤗", text: "포용력이 있어요" },
    { emoji: "🎭", text: "감성적이에요" },
    { emoji: "📱", text: "트렌디해요" },
    { emoji: "🌺", text: "피부가 좋아요" },
    { emoji: "🎪", text: "재능이 많아요" },
    { emoji: "🎯", text: "집중력이 좋아요" },
    { emoji: "🤹", text: "멀티태스킹 잘해요" },
  ]);

  const toggleFeature = (feature: string) => {
    setSelectedFeatures((prev) => {
      if (prev.includes(feature)) {
        return prev.filter((f) => f !== feature);
      }
      if (prev.length >= 5) return prev;
      return [...prev, feature];
    });
  };

  const addCustomFeature = (e: React.FormEvent) => {
    e.preventDefault();
    if (customFeature.trim()) {
      setFeatures((prev) => [
        { emoji: "✨", text: customFeature.trim() },
        ...prev,
      ]);
      setCustomFeature("");
    }
  };

  return (
    <Layout>
      <Header
        title="회원님의 특징을 선택해주세요"
        subtitle="나만의 항목 추가"
      />

      <div className="flex-1">
        <form onSubmit={addCustomFeature} className="mb-4">
          <div className="flex gap-2">
            <input
              type="text"
              value={customFeature}
              onChange={(e) => setCustomFeature(e.target.value)}
              placeholder="나만의 특징을 입력해주세요"
              className="flex-1  px-4 py-2 border border-gray-200 rounded-full text-sm focus:outline-none focus:border-sky-500 text-gray-800"
              maxLength={20}
            />
            <button
              type="submit"
              className="px-4 py-2 bg-sky-500 text-white rounded-full text-sm hover:bg-sky-600 disabled:opacity-50"
              disabled={!customFeature.trim()}
            >
              추가
            </button>
          </div>
        </form>

        <div className="flex flex-wrap gap-2 mb-6">
          {features.map(({ emoji, text }) => (
            <button
              key={text}
              onClick={() => toggleFeature(text)}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-full border
                transition-all duration-200 text-sm
                ${
                  selectedFeatures.includes(text)
                    ? "border-sky-500 bg-sky-500 text-white"
                    : "border-gray-200 text-gray-600 hover:border-gray-300"
                }`}
            >
              <span>{emoji}</span>
              <span>{text}</span>
            </button>
          ))}
        </div>

        <p className="text-sm text-gray-500 mt-4">
          * 최대 5개까지 선택할 수 있어요
        </p>
      </div>

      <div className="fixed bottom-0 left-0 right-0 p-4 flex flex-col gap-2 bg-white">
        <Button
          onClick={onNext}
          disabled={selectedFeatures.length === 0}
          isFixed
        >
          다음
        </Button>
        <button
          onClick={onNext}
          className="w-full py-2 text-gray-500 text-sm hover:text-gray-700"
        >
          건너뛰기
        </button>
      </div>
    </Layout>
  );
}
