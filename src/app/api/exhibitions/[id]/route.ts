import { PublicApiExhibitionDetailResponse } from "@/types/api/exhibitionDetail";
import { NextResponse } from "next/server";
import xml2js from "xml2js";

/**
 * @param url 요청할 API URL
 * @returns 공공 API 응답 구조를 따르는 객체
 */
async function fetchAndParseXml(
  url: string
): Promise<PublicApiExhibitionDetailResponse> {
  const response = await fetch(url);
  const xmlText = await response.text();

  // xml → json 변환
  const parser = new xml2js.Parser({ explicitArray: false });
  const result = (await parser.parseStringPromise(
    xmlText
  )) as PublicApiExhibitionDetailResponse;
  return result;
}

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const serviceKey = process.env.PUBLIC_API_KEY;
  const { id: exhibitionId } = await params;

  const baseUrl = `http://apis.data.go.kr/B553457/cultureinfo/detail2?serviceKey=${serviceKey}&seq=${exhibitionId}`;

  try {
    const result = await fetchAndParseXml(baseUrl);
    const item = result?.response.body.items?.item;
    if (!item) {
      return NextResponse.json(
        { error: "Exhibition not found" },
        { status: 404 }
      );
    }

    const cleanedItem = JSON.parse(JSON.stringify(item));

    return NextResponse.json(cleanedItem);
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      {
        error: "Failed to fetch exhibition detail",
      },
      {
        status: 500,
      }
    );
  }
}
