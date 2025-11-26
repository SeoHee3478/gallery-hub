import formatDate from "@/lib/formatDate";
import getYYYYMMDD from "@/lib/getYYYYMMDD";
import { NextRequest, NextResponse } from "next/server";
import xml2js from "xml2js";
import he from "he";
import {
  RawExhibitionItem,
  PublicApiExhibitionResponse,
} from "@/types/api/exhibitions";
import { Exhibition } from "@/types/models/exhibition";

const NUM_OF_ROWS = 20; // 한 번에 가져올 데이터 수

async function fetchAndParseXml(
  url: string
): Promise<PublicApiExhibitionResponse> {
  const response = await fetch(url);
  const xmlText = await response.text();
  const parser = new xml2js.Parser({ explicitArray: false });
  const result = (await parser.parseStringPromise(
    xmlText
  )) as PublicApiExhibitionResponse;
  return result;
}

export async function GET(request: NextRequest) {
  const serviceKey = process.env.PUBLIC_API_KEY;
  const searchParams = request.nextUrl.searchParams;
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || String(NUM_OF_ROWS));

  const today = new Date();
  const fromDate = getYYYYMMDD(today);
  const toDate = getYYYYMMDD(
    new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000)
  );

  const url = `http://apis.data.go.kr/B553457/cultureinfo/period2?serviceKey=${serviceKey}&from=${fromDate}&to=${toDate}&numOfrows=${limit}&PageNo=${page}`;

  try {
    const result = await fetchAndParseXml(url);
    const totalCount = Number(result.response.body.totalCount || 0);

    if (totalCount === 0) {
      return NextResponse.json({
        exhibitions: [],
        totalCount: 0,
        currentPage: page,
        hasMore: false,
      });
    }

    const items = result.response.body.items?.item;
    const itemsArray: RawExhibitionItem[] = items
      ? Array.isArray(items)
        ? items
        : [items]
      : [];

    const exhibitions: Exhibition[] = itemsArray.map(
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

    const hasMore = page * limit < totalCount;

    return NextResponse.json({
      exhibitions,
      totalCount,
      currentPage: page,
      hasMore,
    });
  } catch (error) {
    console.error("API Fetch Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch data" },
      { status: 500 }
    );
  }
}
