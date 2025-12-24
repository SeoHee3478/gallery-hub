"use client";

import { memo } from "react";
import { Calendar, MapPin } from "lucide-react";
import { ExhibitionInfoItem } from "./ExhibitionInfoItem";

interface ExhibitionInfoSectionProps {
  dateRange: string;
  place: string;
  price: string;
}

export const ExhibitionInfoSection = memo(
  ({ dateRange, place, price }: ExhibitionInfoSectionProps) => {
    return (
      <div className="space-y-4">
        <ExhibitionInfoItem
          icon={<Calendar className="w-5 h-5" />}
          label="날짜"
          value={dateRange}
        />
        <ExhibitionInfoItem
          icon={<MapPin className="w-5 h-5" />}
          label="장소"
          value={place}
        />
        <ExhibitionInfoItem
          icon={<div className="text-lg font-semibold">💵</div>}
          label="가격"
          value={price}
        />
      </div>
    );
  }
);

ExhibitionInfoSection.displayName = "ExhibitionInfoSection";
