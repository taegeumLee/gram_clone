"use client";

import { useState } from "react";
import Header from "@/components/common/Header";
import Layout from "@/components/common/Layout";
import Button from "@/components/common/Button";

interface PreferencesProps {
  onNext: () => void;
}

// preferences 타입 정의 추가
interface PreferencesState {
  gender: string;
  ageRange: [number, number];
  location: string;
  distance: number;
  heightRange: [number, number];
  religion: string;
  drinking: string;
  smoking: string;
}

export default function Preferences({ onNext }: PreferencesProps) {
  const [preferences, setPreferences] = useState<PreferencesState>({
    gender: "",
    ageRange: [19, 24],
    location: "인천 미추홀구",
    distance: 20,
    heightRange: [151, 170],
    religion: "선택 안 함",
    drinking: "선택 안 함",
    smoking: "선택 안 함",
  });

  // options 타입 개선
  type OptionFields = "gender" | "religion" | "drinking" | "smoking";
  const options: Record<OptionFields, string[]> = {
    gender: ["남성", "여성"],
    religion: [
      "선택 안 함",
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
    ],
    drinking: ["선택 안 함", "전혀 안 함", "가끔", "자주"],
    smoking: ["선택 안 함", "비흡연", "흡연"],
  };

  return (
    <Layout>
      <Header
        title="선호하는 상대를 설정해주세요"
        subtitle="선호하는 대상과 매칭될 확률이 높아져요"
      />

      <div className="flex-1 space-y-8 pb-24">
        {/* 성별 선택 */}
        <div className="flex items-center justify-between">
          <span className="text-gray-800 w-20">성별</span>
          <div className="flex-1 px-4">
            <div className="flex gap-4">
              {options.gender.map((gender) => (
                <button
                  key={gender}
                  onClick={() =>
                    setPreferences((prev) => ({ ...prev, gender }))
                  }
                  className={`px-4 py-2 rounded-full border ${
                    preferences.gender === gender
                      ? "border-sky-500 bg-sky-500 text-white"
                      : "border-gray-300 text-gray-600"
                  }`}
                >
                  {gender}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 나이 범위 */}
        <div className="flex items-center justify-between">
          <span className="text-gray-800 w-20">나이</span>
          <div className="flex-1 px-4">
            <div className="relative">
              <div className="h-1 bg-gray-200 rounded-full">
                <div
                  className="absolute h-1 bg-sky-500"
                  style={{
                    left: `${
                      ((preferences.ageRange[0] - 19) / (50 - 19)) * 100
                    }%`,
                    right: `${
                      100 - ((preferences.ageRange[1] - 19) / (50 - 19)) * 100
                    }%`,
                  }}
                />
              </div>
              <input
                type="range"
                min={19}
                max={50}
                value={preferences.ageRange[0]}
                onChange={(e) =>
                  setPreferences((prev) => ({
                    ...prev,
                    ageRange: [
                      parseInt(e.target.value),
                      Math.max(parseInt(e.target.value), prev.ageRange[1]),
                    ],
                  }))
                }
                className="absolute w-full -top-1 h-3 appearance-none bg-transparent [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-sky-500"
              />
              <input
                type="range"
                min={19}
                max={50}
                value={preferences.ageRange[1]}
                onChange={(e) =>
                  setPreferences((prev) => ({
                    ...prev,
                    ageRange: [
                      Math.min(prev.ageRange[0], parseInt(e.target.value)),
                      parseInt(e.target.value),
                    ],
                  }))
                }
                className="absolute w-full -top-1 h-3 appearance-none bg-transparent [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-sky-500"
              />
            </div>
          </div>
          <span className="text-gray-800 w-24 text-right">
            {preferences.ageRange[0]}세 ~ {preferences.ageRange[1]}세
          </span>
        </div>

        {/* 위치 */}
        <div className="flex items-center justify-between">
          <span className="text-gray-800 w-20">위치</span>
          <div className="flex-1 px-4 text-gray-800">
            {preferences.location}
          </div>
        </div>

        {/* 거리 */}
        <div className="flex items-center justify-between">
          <span className="text-gray-800 w-20">거리</span>
          <div className="flex-1 px-4">
            <div className="relative">
              <div className="h-1 bg-gray-200 rounded-full">
                <div
                  className="absolute h-1 bg-sky-500"
                  style={{
                    width: `${(preferences.distance / 100) * 100}%`,
                  }}
                />
              </div>
              <input
                type="range"
                min={20}
                max={100}
                step={20}
                value={preferences.distance}
                onChange={(e) =>
                  setPreferences((prev) => ({
                    ...prev,
                    distance: parseInt(e.target.value),
                  }))
                }
                className="absolute w-full -top-1 h-3 appearance-none bg-transparent [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-sky-500"
              />
            </div>
          </div>
          <span className="text-gray-800 w-24 text-right">
            {preferences.distance}km 이내
          </span>
        </div>

        {/* 키 범위 */}
        <div className="flex items-center justify-between">
          <span className="text-gray-800 w-20">키</span>
          <div className="flex-1 px-4">
            <div className="relative">
              <div className="h-1 bg-gray-200 rounded-full">
                <div
                  className="absolute h-1 bg-sky-500"
                  style={{
                    left: `${
                      ((preferences.heightRange[0] - 140) / (200 - 140)) * 100
                    }%`,
                    right: `${
                      100 -
                      ((preferences.heightRange[1] - 140) / (200 - 140)) * 100
                    }%`,
                  }}
                />
              </div>
              <input
                type="range"
                min={140}
                max={200}
                value={preferences.heightRange[0]}
                onChange={(e) =>
                  setPreferences((prev) => ({
                    ...prev,
                    heightRange: [
                      parseInt(e.target.value),
                      Math.max(parseInt(e.target.value), prev.heightRange[1]),
                    ],
                  }))
                }
                className="absolute w-full -top-1 h-3 appearance-none bg-transparent [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-sky-500"
              />
              <input
                type="range"
                min={140}
                max={200}
                value={preferences.heightRange[1]}
                onChange={(e) =>
                  setPreferences((prev) => ({
                    ...prev,
                    heightRange: [
                      Math.min(prev.heightRange[0], parseInt(e.target.value)),
                      parseInt(e.target.value),
                    ],
                  }))
                }
                className="absolute w-full -top-1 h-3 appearance-none bg-transparent [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-sky-500"
              />
            </div>
          </div>
          <span className="text-gray-800 w-24 text-right">
            {preferences.heightRange[0]}cm ~ {preferences.heightRange[1]}cm
          </span>
        </div>

        {/* 종교, 음주, 흡연 선택 옵션 */}
        {["religion", "drinking", "smoking"].map((field) => (
          <div key={field} className="flex items-center justify-between">
            <span className="text-gray-800 w-20">
              {field === "religion"
                ? "종교"
                : field === "drinking"
                ? "음주"
                : "흡연"}
            </span>
            <div className="flex-1 px-4 relative">
              <select
                value={preferences[field as OptionFields]}
                onChange={(e) =>
                  setPreferences((prev) => ({
                    ...prev,
                    [field]: e.target.value,
                  }))
                }
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-gray-600
                  appearance-none bg-white cursor-pointer hover:border-sky-500 transition-colors
                  focus:outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
              >
                {options[field as OptionFields].map((option) => (
                  <option key={option} value={option} className="py-2">
                    {option}
                  </option>
                ))}
              </select>
              <div className="absolute right-7 top-1/2 -translate-y-1/2 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Button onClick={onNext} isFixed>
        다음
      </Button>
    </Layout>
  );
}
