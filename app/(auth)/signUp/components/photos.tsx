"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { IoImageOutline, IoClose } from "react-icons/io5";
import Layout from "@/components/common/Layout";
import Header from "@/components/common/Header";
import Button from "@/components/common/Button";

interface PhotosProps {
  onNext: () => void;
}

export default function Photos({ onNext }: PhotosProps) {
  const [photos, setPhotos] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const newPhotos: string[] = [];
    Array.from(files).forEach((file) => {
      if (photos.length + newPhotos.length >= 6) return;
      const imageUrl = URL.createObjectURL(file);
      newPhotos.push(imageUrl);
    });

    setPhotos((prev) => [...prev, ...newPhotos]);
  };

  const removePhoto = (index: number) => {
    setPhotos((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <Layout>
      <Header
        title="프로필 사진을 올려주세요"
        subtitle="최대 6장까지 등록할 수 있어요"
      />

      <div className="flex-1">
        {/* 사진 그리드 */}
        <div className="grid grid-cols-3 gap-2 mb-6">
          {[...Array(6)].map((_, index) => (
            <div
              key={index}
              className="aspect-square relative rounded-xl overflow-hidden border-2 border-dashed border-gray-200"
            >
              {photos[index] ? (
                <div className="relative w-full h-full">
                  <Image
                    src={photos[index]}
                    alt={`Photo ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                  <button
                    onClick={() => removePhoto(index)}
                    className="absolute top-2 right-2 bg-black/50 rounded-full p-1 text-white hover:bg-black/70 transition-colors"
                  >
                    <IoClose size={20} />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full h-full flex flex-col items-center justify-center text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <IoImageOutline size={24} />
                  <span className="text-sm mt-1">
                    {index === 0 ? "필수" : "선택"}
                  </span>
                </button>
              )}
            </div>
          ))}
        </div>

        {/* 파일 입력 */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          onChange={handleImageUpload}
          className="hidden"
        />
      </div>

      <Button onClick={onNext} disabled={photos.length === 0} isFixed>
        다음
      </Button>
    </Layout>
  );
}
