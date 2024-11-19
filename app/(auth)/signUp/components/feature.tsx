"use client";

import { useState, useEffect } from "react";
import Layout from "@/components/common/Layout";
import Header from "@/components/common/Header";
import Button from "@/components/common/Button";
import db from "@/lib/db";

interface FeatureProps {
  onNext: (data: { features: string[] }) => void;
}

interface Feature {
  id: string;
  name: string;
  userId: string | null;
  createdAt: Date;
}

async function getFeatures() {
  return await db.feature.findMany();
}

export default function Feature({ onNext }: FeatureProps) {
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const [customFeature, setCustomFeature] = useState("");
  const [features, setFeatures] = useState<Feature[]>([]);

  useEffect(() => {
    getFeatures().then((data) => setFeatures(data));
  }, []);

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
        {
          id: Date.now().toString(),
          name: "✨" + customFeature.trim(),
          userId: null,
          createdAt: new Date(),
        },
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
          {features.map(({ name }: { name: string }) => (
            <button
              key={name}
              onClick={() => toggleFeature(name)}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-full border
                transition-all duration-200 text-sm
                ${
                  selectedFeatures.includes(name)
                    ? "border-sky-500 bg-sky-500 text-white"
                    : "border-gray-200 text-gray-600 hover:border-gray-300"
                }`}
            >
              <span>{name}</span>
            </button>
          ))}
        </div>

        <p className="text-sm text-gray-500 mt-4">
          * 최대 5개까지 선택할 수 있어요
        </p>
      </div>

      <div className="fixed bottom-0 left-0 right-0 p-4 flex flex-col gap-2 bg-white">
        <Button
          onClick={() => onNext({ features: selectedFeatures })}
          disabled={selectedFeatures.length === 0}
          isFixed
        >
          다음
        </Button>
        <button
          onClick={() => onNext({ features: [] })}
          className="w-full py-2 text-gray-500 text-sm hover:text-gray-700"
        >
          건너뛰기
        </button>
      </div>
    </Layout>
  );
}
