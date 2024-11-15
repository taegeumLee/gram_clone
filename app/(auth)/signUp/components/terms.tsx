"use client";

import { useState } from "react";
import Link from "next/link";

export default function Terms({ onNext }: { onNext: () => void }) {
  const termsList = [
    { id: "service", label: "이용약관 동의", required: true },
    {
      id: "privacy",
      label: "개인정보 수집 및 이용 동의",
      required: true,
    },
    { id: "age", label: "위치정보 이용약관 동의", required: true },
    { id: "marketing", label: "마케팅 수신 동의", required: false },
    {
      id: "notification",
      label: "민감정보 이용 동의",
      required: false,
    },
  ];

  const [agreements, setAgreements] = useState({
    service: false,
    privacy: false,
    age: false,
    marketing: false,
    notification: false,
  });

  const isAllChecked = Object.values(agreements).every((value) => value);

  const isAllRequiredChecked = Object.entries(agreements).every(
    ([key, value]) => {
      const item = [
        { id: "service", required: true },
        { id: "privacy", required: true },
        { id: "age", required: true },
        { id: "marketing", required: false },
        { id: "notification", required: false },
      ].find((item) => item.id === key);

      return item?.required ? value : true;
    }
  );

  const handleCheckAll = () => {
    setAgreements((prev) => {
      const newValue = !isAllChecked;
      return {
        service: newValue,
        privacy: newValue,
        age: newValue,
        marketing: newValue,
        notification: newValue,
      };
    });
  };

  return (
    <div className="flex flex-col min-h-screen justify-between w-full p-6 bg-white">
      <div className="flex items-center mb-6">
        <Link href="/">
          <button className="text-5xl hover:text-black transition-colors text-gray-500">
            ×
          </button>
        </Link>
      </div>

      <div className="flex-1">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          이용약관에 동의해주세요
        </h1>

        <div className="space-y-4">
          <label className="flex items-center justify-between gap-3">
            <span className="text-lg font-semibold text-gray-800">
              전체 동의
            </span>
            <input
              type="checkbox"
              checked={isAllChecked}
              onChange={handleCheckAll}
              className="w-6 h-6 accent-white bg-white hover:bg-white"
            />
          </label>

          <div className="h-px bg-gray-200 my-4" />

          {termsList.map((item) => (
            <label
              key={item.id}
              className="flex items-center justify-between gap-3"
            >
              <span className="text-gray-800">
                {item.label}
                {item.required && (
                  <span className="text-sm text-gray-400 ml-1">필수</span>
                )}
              </span>
              <input
                type="checkbox"
                checked={agreements[item.id as keyof typeof agreements]}
                onChange={(e) =>
                  setAgreements((prev) => ({
                    ...prev,
                    [item.id]: e.target.checked,
                  }))
                }
                className="w-5 h-5 accent-white bg-white hover:bg-white"
              />
            </label>
          ))}
        </div>
      </div>

      <button
        onClick={onNext}
        disabled={!isAllRequiredChecked}
        className={`w-full p-4 font-medium rounded-xl shadow-sm transition-all duration-200
          ${
            isAllRequiredChecked
              ? "bg-sky-500 text-white hover:bg-sky-600 hover:-translate-y-0.5"
              : "bg-gray-200 text-gray-500 cursor-not-allowed"
          }
        `}
      >
        동의하기
      </button>
    </div>
  );
}
