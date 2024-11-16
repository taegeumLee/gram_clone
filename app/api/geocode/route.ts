import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("query");

  if (!query) {
    return NextResponse.json({ error: "검색어가 필요합니다" }, { status: 400 });
  }

  try {
    const response = await fetch(
      `https://naveropenapi.apigw.ntruss.com/map-geocode/v2/geocode?query=${encodeURIComponent(
        query
      )}`,
      {
        headers: {
          "X-NCP-APIGW-API-KEY-ID": process.env.NAVER_CLIENT_ID!,
          "X-NCP-APIGW-API-KEY": process.env.NAVER_CLIENT_SECRET!,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`네이버 API 호출 실패: ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Geocoding 에러:", error);
    return NextResponse.json(
      { error: "위치 검색에 실패했습니다" },
      { status: 500 }
    );
  }
}
