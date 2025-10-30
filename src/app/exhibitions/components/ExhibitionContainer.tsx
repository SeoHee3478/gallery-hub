"use client";

type Exhibition = {
  id: number;
  title: string;
  location: string;
  date: string;
  category: string;
  image?: string;
};

import { useState } from "react";
import CategoryFilter from "./CategoryFilter";
import ExhibitionList from "./ExhibitionList";

export default function ExhibitionContainer({ data }: { data: Exhibition[] }) {
  const [selectedCategory, setSelectedCategory] = useState("전체");

  const filtered =
    selectedCategory === "전체"
      ? data
      : data.filter((ex) => ex.category === selectedCategory);

  return (
    <div className="w-full max-w-5xl flex flex-col items-center">
      <CategoryFilter
        selected={selectedCategory}
        onChange={setSelectedCategory}
      />
      <ExhibitionList data={filtered} />
    </div>
  );
}
