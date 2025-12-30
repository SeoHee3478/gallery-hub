"use client";

import ExhibitionList from "@/app/exhibitions/components/ExhibitionList";
import { convertWishlistArrayToExhibitions } from "@/lib/exhibitionAdapter";
import { useWishList } from "@/hooks/useWishlist";

export default function FavoritedExhibitionsContainer() {
  const { data } = useWishList();

  if (data?.length === 0)
    return (
      <div className="text-center py-20">
        <p>아직 좋아요한 전시가 없어요</p>
      </div>
    );
  const exhibitionData = convertWishlistArrayToExhibitions(data);
  return <ExhibitionList data={exhibitionData} />;
}
