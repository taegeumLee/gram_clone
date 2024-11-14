"use client";

import Link from "next/link";
import React, { useState } from "react";

export default function Phone({
  onNext,
}: {
  onNext: (number: string) => void;
}) {
  const [phoneNumber, setPhoneNumber] = useState("");
  const autoHyphen = (target: string) => {
    const numbers = target.replace(/[^0-9]/g, "").slice(0, 11);

    const formatted = numbers
      .replace(/^(\d{0,3})(\d{0,4})(\d{0,4})$/g, "$1-$2-$3")
      .replace(/(\-{1,2})$/g, "");

    setPhoneNumber(formatted);
  };
  return (
    <div className="flex flex-col h-screen justify-between w-full p-4 bg-white *:text-black">
      {/* 헤더 */}
      <div className="flex items-center mb-6">
        <Link href="/">
          <button className="text-5xl hover:text-black transition-colors text-gray-500">
            ×
          </button>
        </Link>
      </div>

      {/* 메인 콘텐츠 */}
      <div className="h-full flex flex-col items-centers">
        <h1 className="text-2xl font-bold">전화번호를 입력해주세요</h1>
        <p className="text-gray-500 text-sm mb-4">
          안전을 위해 계정 확인이 필요해요
        </p>

        {/* 전화번호 입력 필드 */}
        <input
          type="text"
          value={phoneNumber}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              onNext(phoneNumber);
            }
          }}
          onChange={(e) => {
            autoHyphen(e.target.value);
          }}
          placeholder="010-0000-0000"
          className="w-full text-3xl font-extrabold p-2 border-b border-gray-300 border-none focus:outline-none focus:border-none caret-sky-500"
        />
      </div>

      {/* 하단 버튼 */}
      <button
        onClick={() => onNext(phoneNumber)}
        className="mt-auto w-full p-3 bg-gray-200 text-gray-500 hover:bg-sky-500 hover:text-white transition-colors  rounded-md"
      >
        인증번호 받기
      </button>
    </div>
  );
}
