"use client";

import FavoritedExhibitionsClient from "./components/FavoritedExhibitionsClient";

export interface Exhibition {
  id: string;
  title: string;
  venue: string;
  startDate: string;
  endDate: string;
  imageUrl: string;
}

export default function FavoritesPage() {
  return <FavoritedExhibitionsClient />;
}
