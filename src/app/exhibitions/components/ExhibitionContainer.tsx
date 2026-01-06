"use client";

import { useState, useEffect, useRef } from "react";
import { useExhibitions } from "@/hooks/useExhibitions";
import { useWishList } from "@/hooks/useWishlist";
import CategoryFilter from "./CategoryFilter";
import ExhibitionList from "./ExhibitionList";
import Spacer from "@/components/ui/Spacer";
import MapView from "./MapView";

export default function ExhibitionContainer() {
  const [selectedCategory, setSelectedCategory] = useState("전체");
  const [selectedRegion, setSelectedRegion] = useState("전체");

  // 무한스크롤 데이터 fetching
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useExhibitions();
  const { data: wishlistData = [], isLoading } = useWishList();
  const wishlistedIds = new Set(wishlistData.map((item) => item.item_id));

  const observerTarget = useRef<HTMLDivElement>(null);

  // 무한스크롤 설정
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 1.0 }
    );

    const currentTarget = observerTarget.current;
    if (currentTarget) {
      observer.observe(currentTarget);
    }

    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget);
      }
    };
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  // 모든 페이지의 전시 데이터를 하나의 배열로 병합
  const allExhibitions = data?.pages.flatMap((page) => page.exhibitions) ?? [];

  // 필터링 로직 (기존과 동일)
  const filteredData = allExhibitions.filter((item) => {
    if (selectedCategory === "전체" && selectedRegion === "전체") return true;

    const filteredCategory =
      selectedCategory !== "전체" ? item.category === selectedCategory : true;
    const filteredRegion =
      selectedRegion !== "전체" ? item.region === selectedRegion : true;

    return filteredCategory && filteredRegion;
  });

  if (isLoading) {
    return <div>로딩중...</div>;
  }

  return (
    <div className="w-full max-w-5xl flex flex-col items-center gap-2">
      <CategoryFilter
        selected={selectedCategory}
        onChange={setSelectedCategory}
        type={"category"}
      />
      <CategoryFilter
        selected={selectedRegion}
        onChange={setSelectedRegion}
        type={"location"}
      />
      <Spacer height={32} />
      {/* <MapView data={filteredData} /> */}
      <ExhibitionList data={filteredData} wishlistedIds={wishlistedIds} />

      {/* 무한스크롤 트리거 영역 */}
      <div
        ref={observerTarget}
        className="w-full h-20 flex justify-center items-center my-8"
      >
        {isFetchingNextPage && (
          <p className="text-lg text-gray-600">더 불러오는 중...</p>
        )}
        {!hasNextPage && allExhibitions.length > 0 && (
          <p className="text-gray-500">모든 전시를 불러왔습니다</p>
        )}
      </div>
    </div>
  );
}
