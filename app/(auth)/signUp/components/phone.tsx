"use client";

import React, { useState } from "react";
import Layout from "@/components/common/Layout";
import Header from "@/components/common/Header";
import Button from "@/components/common/Button";
import Input from "@/components/common/Input";

interface PhoneProps {
  onNext: (number: string) => void;
}

const Phone: React.FC<PhoneProps> = ({ onNext }) => {
  const [phoneNumber, setPhoneNumber] = useState("");

  const autoHyphen = (target: string) => {
    const numbers = target.replace(/[^0-9]/g, "").slice(0, 11);
    const formatted = numbers
      .replace(/^(\d{0,3})(\d{0,4})(\d{0,4})$/g, "$1-$2-$3")
      .replace(/(\-{1,2})$/g, "");

    setPhoneNumber(formatted);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      onNext(phoneNumber);
    }
  };

  return (
    <Layout>
      <Header
        title="전화번호를 입력해주세요"
        subtitle="안전을 위해 계정 확인이 필요해요"
      />

      <div className="flex-1">
        <Input
          type="text"
          value={phoneNumber}
          onChange={(e) => autoHyphen(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="010-0000-0000"
          className="text-3xl font-bold border-b-2 rounded-none
            placeholder:text-gray-300 caret-sky-500"
        />
      </div>

      <Button
        onClick={() => onNext(phoneNumber)}
        disabled={phoneNumber.length < 12}
        isFixed
      >
        인증번호 받기
      </Button>
    </Layout>
  );
};

export default Phone;
