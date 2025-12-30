"use client";

import { useEffect, useState } from "react";
import { WishlistItem } from "@/types/models/favoriteExhibition";
import ExhibitionList from "@/app/exhibitions/components/ExhibitionList";
import { convertWishlistArrayToExhibitions } from "@/lib/exhibitionAdapter";

export default function FavoritedExhibitionsClient() {
  const [exhibitions, setExhibitions] = useState<WishlistItem[]>([]);

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const response = await fetch("/api/wishlist");
        const data = await response.json();

        console.log("Wishlist data:", data);
        setExhibitions(data.items || data || []);
      } catch (error) {
        console.error("Failed to fetch wishlist:", error);
        setExhibitions([]);
      }
    };

    fetchWishlist();
  }, []);

  const exhibitionData = convertWishlistArrayToExhibitions(exhibitions);
  return <ExhibitionList data={exhibitionData} />;
}
