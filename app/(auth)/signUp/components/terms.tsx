"use client";

import { useState } from "react";
import Link from "next/link";
import Layout from "@/components/common/Layout";
import Header from "@/components/common/Header";
import Button from "@/components/common/Button";

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
      const item = termsList.find((item) => item.id === key);
      return item?.required ? value : true;
    }
  );

  const handleCheckAll = () => {
    setAgreements((prev) => {
      const newValue = !isAllChecked;
      return Object.keys(prev).reduce(
        (acc, key) => ({ ...acc, [key]: newValue }),
        {} as typeof prev
      );
    });
  };

  return (
    <Layout>
      <div className="flex items-center mb-6">
        <Link href="/">
          <button className="text-5xl hover:text-black transition-colors text-gray-500">
            ×
          </button>
        </Link>
      </div>

      <Header title="이용약관에 동의해주세요" />

      <div className="flex-1 space-y-4">
        <label className="flex items-center justify-between gap-3">
          <span className="text-lg font-semibold text-gray-800">전체 동의</span>
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

      <Button onClick={onNext} disabled={!isAllRequiredChecked} isFixed>
        동의하기
      </Button>
    </Layout>
  );
}
