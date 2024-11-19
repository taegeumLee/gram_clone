import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

async function main() {
  // 관심사 시드 데이터
  const interests = [
    { emoji: "✈️", name: "여행" },
    { emoji: "🎮", name: "게임" },
    { emoji: "📚", name: "독서" },
    { emoji: "🎵", name: "음악" },
    { emoji: "🎨", name: "그림" },
    { emoji: "🏃", name: "운동" },
    { emoji: "🎬", name: "영화" },
    { emoji: "📸", name: "사진" },
    { emoji: "🍳", name: "요리" },
    { emoji: "🐶", name: "반려동물" },
    { emoji: "🌱", name: "식물" },
    { emoji: "✍️", name: "글쓰기" },
    { emoji: "🎭", name: "공연" },
    { emoji: "⚽", name: "스포츠" },
    { emoji: "🎤", name: "노래" },
    { emoji: "💃", name: "댄스" },
    { emoji: "🎯", name: "자기계발" },
    { emoji: "🧘", name: "명상" },
    { emoji: "🎨", name: "공예" },
    { emoji: "🏔️", name: "등산" },
    { emoji: "🚲", name: "자전거" },
    { emoji: "🎱", name: "당구" },
    { emoji: "🎳", name: "볼링" },
    { emoji: "🏊", name: "수영" },
  ];

  // 특징 시드 데이터
  const features = [
    { emoji: "🍜", name: "요리를 잘해요" },
    { emoji: "👖", name: "패션 센스가 좋아요" },
    { emoji: "😊", name: "유머 감각이 있어요" },
    { emoji: "📚", name: "다독가에요" },
    { emoji: "😌", name: "다정해요" },
    { emoji: "🎭", name: "엉덩이가 예뻐요" },
    { emoji: "💬", name: "대화를 잘해요" },
    { emoji: "😏", name: "꼬부기 미인" },
    { emoji: "👋", name: "손이 예뻐요" },
    { emoji: "😍", name: "잘생겼어요" },
    { emoji: "😊", name: "웃는게 예뻐요" },
    { emoji: "🗣️", name: "목소리가 좋아요" },
    { emoji: "👀", name: "쌍꺼풀 있는눈" },
    { emoji: "🔍", name: "보조개" },
    { emoji: "💡", name: "이야기를 잘 들어줘요" },
    { emoji: "🎵", name: "노래를 잘해요" },
    { emoji: "📏", name: "비율이 좋아요" },
    { emoji: "😘", name: "애교가 많아요" },
    { emoji: "🎨", name: "그림을 잘 그려요" },
    { emoji: "🏃", name: "운동을 좋아해요" },
    { emoji: "🧠", name: "지적호기심이 많아요" },
    { emoji: "🌱", name: "자기 계발을 좋아해요" },
    { emoji: "🤝", name: "신뢰할 수 있어요" },
    { emoji: "⭐", name: "긍정적이에요" },
  ];

  console.log("시드 데이터 생성 시작...");

  // 관심사 데이터 생성
  for (const interest of interests) {
    await db.interest.create({
      data: {
        name: `${interest.emoji} ${interest.name}`,
      },
    });
  }

  // 특징 데이터 생성
  for (const feature of features) {
    await db.feature.create({
      data: {
        name: `${feature.emoji} ${feature.name}`,
      },
    });
  }

  console.log("시드 데이터 생성 완료!");
}

main()
  .catch((e) => {
    console.error("시드 데이터 생성 중 에러 발생:", e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
