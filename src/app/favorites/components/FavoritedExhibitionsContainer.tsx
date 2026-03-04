"use client";

import ExhibitionList from "@/app/exhibitions/components/ExhibitionList";
import { convertWishlistArrayToExhibitions } from "@/lib/exhibitionAdapter";
import { useWishList } from "@/hooks/useWishlist";
import { useEffect } from "react";
import EmptyState from "@/components/EmptyState";

export default function FavoritedExhibitionsContainer() {
  const { data, isLoading, isError, isFetching, refetch } = useWishList();

  useEffect(() => {
    refetch();
  }, [refetch]);

  if (isLoading || isFetching) {
    return <div>로딩중...</div>;
  }

  if (isError) {
    return (
      <div className="text-center py-20">
        <p className="text-red-500">데이터를 불러오는데 실패했습니다</p>
      </div>
    );
  }

  if (!data || data?.length === 0)
    return (
      <EmptyState message="아직 좋아요한 전시가 없습니다. 관심있는 전시에 좋아요를 눌러보세요!" />
    );
  const exhibitionData = convertWishlistArrayToExhibitions(data);
  const allWishlistedIds = new Set(data.map((item) => item.item_id));

  return (
    <div className="w-full max-w-5xl flex flex-col items-center gap-2">
      <ExhibitionList data={exhibitionData} wishlistedIds={allWishlistedIds} />
    </div>
  );
}
