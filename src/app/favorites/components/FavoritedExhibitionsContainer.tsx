"use client";

import ExhibitionList from "@/app/exhibitions/components/ExhibitionList";
import { convertWishlistArrayToExhibitions } from "@/lib/exhibitionAdapter";
import { useWishList } from "@/hooks/useWishlist";

export default function FavoritedExhibitionsContainer() {
  const { data, isLoading, isError, error } = useWishList();
  if (isLoading) return <></>;
  if (isError) return <>에러가 발생했습니다 {error}</>;
  if (!data) return <>데이터가 없습니다.</>;
  const exhibitionData = convertWishlistArrayToExhibitions(data);
  return <ExhibitionList data={exhibitionData} />;
}
