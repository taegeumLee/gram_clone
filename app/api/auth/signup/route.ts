import { NextResponse } from "next/server";
import db from "@/lib/db";

export async function POST(request: Request) {
  try {
    const data = await request.json();

    // 필수 필드 검증
    if (
      !data.phoneNumber ||
      !data.gender ||
      !data.birthDate ||
      !data.location ||
      !data.height ||
      !data.preferences
    ) {
      return NextResponse.json(
        { error: "필수 정보가 누락되었습니다." },
        { status: 400 }
      );
    }

    // 사용자 생성
    const user = await db.user.create({
      data: {
        phoneNumber: data.phoneNumber,
        gender: data.gender,
        birthDate: new Date(data.birthDate),
        location: data.location,
        height: data.height,
        education: data.education,
        job: data.job,
        religion: data.religion,
        drinking: data.drinking,
        smoking: data.smoking,
        photos: {
          create: data.photos.map((photo: { url: string; order: number }) => ({
            url: photo.url,
            order: photo.order,
          })),
        },
        interests: {
          create: data.interests.map((name: string) => ({
            name,
          })),
        },
        features: {
          create: data.features.map((name: string) => ({
            name,
          })),
        },
        preferences: {
          create: {
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
        },
      },
    });

    const response = NextResponse.json({ user }, { status: 201 });

    response.cookies.set({
      name: "session",
      value: user.id,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7일
    });

    return response;
  } catch (error) {
    console.error("회원가입 에러:", error);
    return NextResponse.json(
      { error: "회원가입에 실패했습니다." },
      { status: 500 }
    );
  }
}
