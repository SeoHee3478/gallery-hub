"use client";

import FavoritedExhibitionsClient from "./components/FavoritedExhibitionsClient";

export interface ExhibitionDetails {
  seq: string;
  title: string;
  startDate: string;
  endDate: string;
  place: string;
  realmName: string;
  area: string;
  sigungu: string;
  price: string;
  contents1: string;
  url: string;
  phone: string;
  imgUrl: string;
  gpsX: string;
  gpsY: string;
  placeUrl: string;
  placeAddr: string;
  placeSeq: string;
}

export interface WishlistItem {
  id: number;
  created_at: string;
  user_id: string;
  item_id: string;
  item_type: string;
  details: ExhibitionDetails;
}

export default function FavoritesPage() {
  return <FavoritedExhibitionsClient />;
}
