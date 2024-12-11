import { NextResponse } from "next/server";
import db from "@/lib/db";

export async function POST(request: Request) {
  try {
    const data = await request.json();

    return await db.$transaction(async (tx) => {
      // 1. 사용자 생성
      const user = await tx.user.create({
        data: {
          phoneNumber: data.phoneNumber,
          gender: data.gender,
          birthDate: new Date(data.birthDate),
          location: data.location,
          height: data.height,
          education: data.education || null,
          job: data.job || null,
          religion: data.religion || null,
          drinking: data.drinking || null,
          smoking: data.smoking || null,
        },
      });

      // 2. 선호도 생성
      const preference = await tx.preference.create({
        data: {
          gender: data.preferences.gender,
          ageRangeMin: data.preferences.ageRangeMin,
          ageRangeMax: data.preferences.ageRangeMax,
          location: data.preferences.location,
          distance: data.preferences.distance,
          heightRangeMin: data.preferences.heightRangeMin,
          heightRangeMax: data.preferences.heightRangeMax,
          religion: data.preferences.religion,
          drinking: data.preferences.drinking,
          smoking: data.preferences.smoking,
        },
      });

      // User 업데이트하여 preference 연결
      await tx.user.update({
        where: { id: user.id },
        data: {
          preferenceId: preference.id,
        },
      });

      // 3. 사진 생성
      await tx.userPhoto.createMany({
        data: data.photos.map((photo: { url: string; order: number }) => ({
          userId: user.id,
          url: photo.url,
          order: photo.order,
        })),
      });

      // 4. 관심사 연결
      if (data.interests.length > 0) {
        await tx.userInterest.createMany({
          data: data.interests.map((interestId: string) => ({
            userId: user.id,
            interestId,
          })),
        });
      }

      // 5. 특징 연결
      if (data.features.length > 0) {
        await tx.userFeature.createMany({
          data: data.features.map((featureId: string) => ({
            userId: user.id,
            featureId,
          })),
        });
      }

      return NextResponse.json({ success: true, userId: user.id });
    });
  } catch (error) {
    console.error("회원가입 에러:", error);
    return NextResponse.json(
      { error: "회원가입에 실패했습니다." },
      { status: 500 }
    );
  }
}
