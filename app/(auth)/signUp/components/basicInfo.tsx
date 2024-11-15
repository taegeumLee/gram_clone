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
    <div className="flex flex-col w-full h-screen bg-white p-6">
      <h1 className="text-2xl font-bold my-8 text-gray-800 text-center">
        성별을 알려주세요
      </h1>

      <div className="flex flex-1 gap-4 my-8">
        {/* 여성 선택 영역 */}
        <button
          className={`flex-1 flex flex-col items-center justify-center gap-4 rounded-xl p-6 transition-all
            ${
              selectedGender === "female"
                ? "bg-pink-500 border-2 border-pink-400"
                : "hover:bg-pink-100 border-2 border-transparent"
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
          className={`flex-1 flex flex-col items-center justify-center gap-4 rounded-xl p-6 transition-all
            ${
              selectedGender === "male"
                ? "bg-sky-500 border-2 border-sky-400"
                : "hover:bg-sky-100 border-2 border-transparent"
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

      {/* 트랜스젠더 선택 영역 - 작게 표시 */}
      <div className="flex justify-center mb-8">
        <button
          className={`w-full flex items-center justify-center gap-2 rounded-xl p-3 transition-all
            ${
              selectedGender === "transgender"
                ? "bg-purple-500 border-2 border-purple-400"
                : "hover:bg-purple-100 border-2 border-transparent"
            }`}
          onClick={() => setSelectedGender("transgender")}
        >
          {selectedGender === "transgender" ? (
            <IoTransgender size={40} className="text-white" />
          ) : (
            <IoTransgenderOutline size={40} className="text-purple-400" />
          )}
          <span
            className={`text-xl  ${
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
      <button
        className={`w-full py-4 rounded-xl transition-all ${
          selectedGender
            ? "bg-blue-500 text-white hover:bg-blue-600"
            : "bg-gray-200 text-gray-400 cursor-not-allowed"
        }`}
        onClick={handleNext}
        disabled={!selectedGender}
      >
        다음
      </button>
    </div>
  );
}
