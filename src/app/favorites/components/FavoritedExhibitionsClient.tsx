"use client";

import { useEffect, useState } from "react";
import FavoritedExhibitionList from "./FavoritedExhibitionList";
import { Exhibition } from "../page";

export default function FavoritedExhibitionsClient() {
  const [exhibitions, setExhibitions] = useState<Exhibition[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWishlist = async () => {
      setLoading(true);
      try {
        const response = await fetch("/api/wishlist");
        const data = await response.json();

        // TODO: API 응답 데이터를 Exhibition 타입으로 매핑
        // 지금은 data.items 또는 data 구조에 맞게 수정 필요
        // 예: setExhibitions(data.items || []);

        console.log("Wishlist data:", data);
        setExhibitions(data.items || data || []);
      } catch (error) {
        console.error("Failed to fetch wishlist:", error);
        setExhibitions([]);
      } finally {
        setLoading(false);
      }
    };

    fetchWishlist();
  }, []);

  // TODO: 전시 삭제 핸들러 구현
  const handleRemoveExhibition = async (id: string) => {
    try {
      const response = await fetch("/api/wishlist", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ item_id: id }),
      });

      if (response.ok) {
        // 삭제 성공 시 로컬 상태에서도 제거
        setExhibitions(exhibitions.filter((ex) => ex.id !== id));
      }
    } catch (error) {
      console.error("Failed to remove exhibition:", error);
    }
  };

  // TODO: 전시 클릭 핸들러 구현
  const handleExhibitionClick = (id: string) => {
    console.log("Navigate to exhibition:", id);
    // 상세 페이지로 이동
    // router.push(`/exhibitions/${id}`);
  };

  return (
    <FavoritedExhibitionList
      exhibitions={exhibitions}
      loading={loading}
      onRemove={handleRemoveExhibition}
      onExhibitionClick={handleExhibitionClick}
    />
  );
}
