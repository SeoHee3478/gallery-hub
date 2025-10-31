"use client";

type Exhibition = {
  id: number;
  title: string;
  location: string;
  date: string;
  category: string;
  image?: string;
  region: string;
};

import { useState } from "react";
import CategoryFilter from "./CategoryFilter";
import ExhibitionList from "./ExhibitionList";
import Spacer from "@/components/ui/Spacer";

export default function ExhibitionContainer({ data }: { data: Exhibition[] }) {
  const [selectedCategory, setSelectedCategory] = useState("전체");
  const [selectedRegion, setSelectedRegion] = useState("전체");

  const filteredData = data.filter((item) => {
    // 모든 필터가 꺼졌으면 전체보기
    if (selectedCategory === "전체" && selectedRegion === "전체") return true;

    // 하나라도 켜져있으면 조건 체크
    const filteredCategory =
      selectedCategory !== "전체" ? item.category === selectedCategory : true;
    const filteredRegion =
      selectedRegion !== "전체" ? item.region === selectedRegion : true;

    return filteredCategory && filteredRegion;
  });

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
      <ExhibitionList data={filteredData} />
    </div>
  );
}
