import { WishlistItem } from "@/types/models/favoriteExhibition";
import { Exhibition } from "@/types/models/exhibition";
import he from "he";
import formatDate from "./formatDate";

// utils/exhibitionAdapter.ts
export const convertWishlistToExhibition = (
  wishlistItem: WishlistItem
): Exhibition => {
  const details = wishlistItem.details;

  return {
    id: Number(details.seq),
    title: he.decode(details.title),
    location: details.place,
    date: `${formatDate(details.startDate)} - ${formatDate(details.endDate)}`,
    category: details.realmName,
    image: details.imgUrl,
    region: details.area,
    specificRegion: details.sigungu,
    lat: Number(details.gpsY),
    lng: Number(details.gpsX),
  };
};

// 배열 변환용
export const convertWishlistArrayToExhibitions = (
  wishlist: WishlistItem[]
): Exhibition[] => {
  return wishlist.map(convertWishlistToExhibition);
};
