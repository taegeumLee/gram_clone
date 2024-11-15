"use client";

import { useState } from "react";

interface BirthProps {
  onNext: () => void;
}

export default function Birth({ onNext }: BirthProps) {
  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");
  const [day, setDay] = useState("");

  const isValidDate = () => {
    if (!year || !month || !day) return false;

    const yearNum = parseInt(year);
    const monthNum = parseInt(month);
    const dayNum = parseInt(day);

    // 연도 검증 (1900년 ~ 현재)
    const currentYear = new Date().getFullYear();
    if (yearNum < 1900 || yearNum > currentYear) return false;

    // 월 검증
    if (monthNum < 1 || monthNum > 12) return false;

    // 일 검증
    const lastDay = new Date(yearNum, monthNum, 0).getDate();
    if (dayNum < 1 || dayNum > lastDay) return false;

    return true;
  };

  const handleNext = () => {
    if (isValidDate()) {
      onNext();
    }
  };

  return (
    <div className="flex flex-col min-h-screen justify-between w-full p-6 bg-white">
      <div className="flex-1">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          생일을 알려주세요
        </h1>
        <p className="text-gray-500 text-sm mb-8">
          변경이 어려우니 신중히 입력해주세요
        </p>

        <div className="flex gap-4 mb-8">
          {/* 연도 입력 */}
          <div className="flex-1">
            <input
              type="text"
              value={year}
              onChange={(e) => {
                const val = e.target.value.slice(0, 4);
                setYear(val);
                if (val.length === 4) {
                  document.getElementById("month-input")?.focus();
                }
              }}
              placeholder="2000"
              maxLength={4}
              className="w-full text-2xl font-bold p-3 border-b-2 border-gray-200 focus:border-sky-500 outline-none text-center text-gray-800"
            />
            <p className="text-center text-gray-500 mt-2">년</p>
          </div>

          {/* 월 입력 */}
          <div className="flex-1">
            <input
              id="month-input"
              type="text"
              value={month}
              onChange={(e) => {
                const val = e.target.value;
                if (val === "" || (parseInt(val) <= 12 && val.length <= 2)) {
                  setMonth(val);
                  if (val.length === 2) {
                    document.getElementById("day-input")?.focus();
                  }
                }
              }}
              onKeyDown={(e) => {
                if (e.key === "Backspace" && month === "") {
                  const input = document.querySelector('input[type="text"]');
                  if (input instanceof HTMLInputElement) input.focus();
                }
              }}
              placeholder="11"
              maxLength={2}
              className="w-full text-2xl font-bold p-3 border-b-2 border-gray-200 focus:border-sky-500 outline-none text-center text-gray-800"
            />
            <p className="text-center text-gray-500 mt-2">월</p>
          </div>

          {/* 일 입력 */}
          <div className="flex-1">
            <input
              id="day-input"
              type="text"
              value={day}
              onChange={(e) => {
                const val = e.target.value;
                if (val === "" || (parseInt(val) <= 31 && val.length <= 2)) {
                  setDay(val);
                }
              }}
              onKeyDown={(e) => {
                if (e.key === "Backspace" && day === "") {
                  document.getElementById("month-input")?.focus();
                }
              }}
              placeholder="21"
              maxLength={2}
              className="w-full text-2xl font-bold p-3 border-b-2 border-gray-200 focus:border-sky-500 outline-none text-center text-gray-800"
            />
            <p className="text-center text-gray-500 mt-2">일</p>
          </div>
        </div>
      </div>

      <button
        onClick={handleNext}
        disabled={!isValidDate()}
        className={`w-full p-4 font-medium rounded-xl shadow-sm transition-all duration-200
          ${
            isValidDate()
              ? "bg-sky-500 text-white hover:bg-sky-600 hover:-translate-y-0.5"
              : "bg-gray-200 text-gray-500 cursor-not-allowed"
          }
        `}
      >
        다음
      </button>
    </div>
  );
}
