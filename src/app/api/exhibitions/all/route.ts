import formatDate from "@/lib/formatDate";
import { NextResponse } from "next/server";
import xml2js from "xml2js";
import he from "he";

import {
  RawExhibitionItem,
  PublicApiExhibitionResponse,
} from "@/types/api/exhibitions";
import { Exhibition } from "@/types/models/exhibition";

const NUM_OF_ROWS = 1000;

/**
 * @param url 요청할 API URL
 * @returns 공공 API 응답 구조를 따르는 객체
 */
async function fetchAndParseXml(
  url: string
): Promise<PublicApiExhibitionResponse> {
  const response = await fetch(url);
  const xmlText = await response.text();

  // xml → json 변환
  const parser = new xml2js.Parser({ explicitArray: false });
  const result = (await parser.parseStringPromise(
    xmlText
  )) as PublicApiExhibitionResponse;
  return result;
}

export async function GET() {
  const serviceKey = process.env.PUBLIC_API_KEY;
  const fromDate = "20250101";
  const toDate = "20251231";

  const baseUrl = `http://apis.data.go.kr/B553457/cultureinfo/period2?serviceKey=${serviceKey}&from=${fromDate}&to=${toDate}&numOfrows=${NUM_OF_ROWS}`;

  const allItems: RawExhibitionItem[] = [];

  try {
    // 1. 첫 번째 페이지를 요청하여 totalCount(전체 항목 수)를 가져옴
    const initialUrl = `${baseUrl}&PageNo=1`;
    const initialResult = await fetchAndParseXml(initialUrl);

    // totalCount 값을 추출하고 Number로 변환
    const totalCount = Number(
      initialResult.response.body.totalCount || NUM_OF_ROWS
    );

    if (totalCount === 0) {
      return NextResponse.json([]);
    }
    // const totalCount = 17495;

    // 총 페이지 수 계산
    const totalPages = Math.ceil(totalCount / NUM_OF_ROWS);

    // 2. 첫 번째 페이지의 데이터(items)를 저장
    const initialItems = initialResult.response.body.items?.item;

    if (initialItems) {
      // items가 단일 객체인 경우와 배열인 경우 모두 처리
      if (!Array.isArray(initialItems)) {
        allItems.push(initialItems);
      } else {
        allItems.push(...initialItems);
      }
    }

    // 3. 2페이지부터 마지막 페이지까지 순차적으로 요청
    for (let page = 2; page <= totalPages; page++) {
      const pageUrl = `${baseUrl}&PageNo=${page}`;
      const pageResult = await fetchAndParseXml(pageUrl);

      const pageItems = pageResult.response.body.items?.item;

      if (pageItems) {
        if (!Array.isArray(pageItems)) {
          allItems.push(pageItems);
        } else {
          allItems.push(...pageItems);
        }
      }
    }

    // 4. 수집된 전체 데이터(allItems)를 원하는 형식으로 변환
    const exhibitions: Exhibition[] = allItems.map(
      (item: RawExhibitionItem) => ({
        id: Number(item.seq),
        title: he.decode(item.title),
        location: item.place,
        date: `${formatDate(item.startDate)} - ${formatDate(item.endDate)}`,
        category: item.realmName,
        image: item.thumbnail,
        region: item.area,
        specificRegion: item.sigungu,
        lat: Number(item.gpsY),
        lng: Number(item.gpsX),
      })
    );

    // 전체 데이터를 응답
    return NextResponse.json(exhibitions);
  } catch (error) {
    console.error("API Fetch Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch all pages data" },
      { status: 500 }
    );
  }
}
