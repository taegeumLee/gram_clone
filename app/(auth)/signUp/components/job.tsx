"use client";

import { useState } from "react";
import Layout from "@/components/common/Layout";
import Header from "@/components/common/Header";
import Button from "@/components/common/Button";

export default function Job({
  onNext,
}: {
  onNext: (data: { job: string }) => void;
}) {
  const [selectedJob, setSelectedJob] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState("");

  const jobs = [
    "일반",
    "사업가",
    "아르바이트",
    "없음",
    "자영업",
    "준비 중",
    "프리랜서",
    "학생",
    "회사원",
    "공공/군사",
    "공무원",
    "교사/교수",
    "연구원",
    "의사",
    "간호사",
    "약사",
    "엔지니어",
    "개발자",
    "디자이너",
    "예술가",
    "음악가",
    "요리사",
    "운동선수",
    "법조인",
    "금융인",
    "언론인",
    "방송인",
    "작가",
    "번역가",
    "기술자",
  ];

  const filteredJobs = jobs.filter((job) =>
    job.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Layout className="max-w-2xl mx-auto">
      <Header title="직업을 선택해주세요" />

      <div className="flex-1">
        <div className="relative mb-6">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="검색"
            className="w-full p-3 pr-10 border-2 border-gray-200 rounded-xl
              focus:outline-none focus:border-sky-500
              transition-all duration-200 text-gray-800"
          />
          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
            🔍
          </span>
        </div>

        <div className="space-y-3">
          {filteredJobs.map((job) => (
            <button
              key={job}
              onClick={() => setSelectedJob(job)}
              className={`w-full p-3 text-left rounded-xl transition-all duration-200
                ${
                  selectedJob === job
                    ? "bg-sky-500 text-white"
                    : "hover:bg-gray-50 text-gray-700 border border-gray-200"
                }
              `}
            >
              {job}
            </button>
          ))}
        </div>
      </div>

      <Button
        onClick={() => onNext({ job: selectedJob })}
        disabled={!selectedJob}
        isFixed
      >
        다음
      </Button>
    </Layout>
  );
}
