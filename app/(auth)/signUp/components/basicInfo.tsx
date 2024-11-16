"use client";
import { useState } from "react";
import {
  IoManOutline,
  IoWomanOutline,
  IoWoman,
  IoTransgenderOutline,
  IoTransgender,
  IoMan,
} from "react-icons/io5";
import Layout from "@/components/common/Layout";
import Header from "@/components/common/Header";
import Button from "@/components/common/Button";

export default function BasicInfo({ onNext }: { onNext: () => void }) {
  const [selectedGender, setSelectedGender] = useState<
    "male" | "female" | "transgender" | null
  >(null);

  const handleNext = () => {
    if (selectedGender) {
      onNext();
    }
  };

  return (
    <Layout>
      <Header title="성별을 알려주세요" />

      <div className="flex flex-1 gap-4 my-8">
        {/* 여성 선택 영역 */}
        <button
          className={`flex-1 flex flex-col items-center justify-center gap-4 rounded-2xl p-6 transition-all duration-200
            ${
              selectedGender === "female"
                ? "bg-gradient-to-br from-pink-500 to-pink-600"
                : "hover:bg-pink-50 border border-pink-100"
            }`}
          onClick={() => setSelectedGender("female")}
        >
          {selectedGender === "female" ? (
            <IoWoman size={80} className="text-white" />
          ) : (
            <IoWomanOutline size={80} className="text-pink-400" />
          )}
          <span
            className={`text-xl ${
              selectedGender === "female"
                ? "text-white font-bold"
                : "text-pink-400"
            }`}
          >
            여성
          </span>
        </button>

        {/* 남성 선택 영역 */}
        <button
          className={`flex-1 flex flex-col items-center justify-center gap-4 rounded-2xl p-6 transition-all duration-200
            ${
              selectedGender === "male"
                ? "bg-sky-500"
                : "hover:bg-sky-50 border border-sky-100"
            }`}
          onClick={() => setSelectedGender("male")}
        >
          {selectedGender === "male" ? (
            <IoMan size={80} className="text-white" />
          ) : (
            <IoManOutline size={80} className="text-sky-400" />
          )}
          <span
            className={`text-xl ${
              selectedGender === "male"
                ? "text-white font-bold"
                : "text-sky-400"
            }`}
          >
            남성
          </span>
        </button>
      </div>

      {/* 트랜스젠더 선택 영역 */}
      <div className="flex justify-center mb-8">
        <button
          className={`w-full flex items-center justify-center gap-2 rounded-xl p-4 transition-all duration-200
            ${
              selectedGender === "transgender"
                ? "bg-purple-500"
                : "hover:bg-purple-50 border border-purple-100"
            }`}
          onClick={() => setSelectedGender("transgender")}
        >
          {selectedGender === "transgender" ? (
            <IoTransgender size={40} className="text-white" />
          ) : (
            <IoTransgenderOutline size={40} className="text-purple-400" />
          )}
          <span
            className={`text-xl ${
              selectedGender === "transgender"
                ? "text-white font-bold"
                : "text-purple-400"
            }`}
          >
            둘 다 아님
          </span>
        </button>
      </div>

      {/* 다음 버튼 */}
      <Button onClick={handleNext} disabled={!selectedGender}>
        다음
      </Button>
    </Layout>
  );
}
