"use client";

import { useEffect, useState } from "react";
import exhibitionsData from "@/data/exhibitions.json";

interface Exhibition {
  id: number;
  title: string;
  location: string;
  date: string;
  category: string;
  image: string;
  region: string;
  lat: number;
  lng: number;
}

export default function MapView() {
  const [selectedExhibition, setSelectedExhibition] =
    useState<Exhibition | null>(null);

  useEffect(() => {
    // Kakao SDK 동적 로드
    const script = document.createElement("script");
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_KEY}&autoload=false`;
    document.head.appendChild(script);

    script.onload = () => {
      kakao.maps.load(() => {
        const container = document.getElementById("map");
        if (!container) return;

        const options = {
          center: new kakao.maps.LatLng(37.5665, 126.978),
          level: 3,
        };
        const map = new kakao.maps.Map(container, options);

        // JSON 데이터 기반 마커 추가
        exhibitionsData.forEach((exh: Exhibition) => {
          const marker = new kakao.maps.Marker({
            map,
            position: new kakao.maps.LatLng(exh.lat, exh.lng),
            title: exh.title,
          });

          const infowindow = new kakao.maps.InfoWindow({
            content: `<div style="padding:5px;">${exh.title}</div>`,
          });

          kakao.maps.event.addListener(marker, "click", () => {
            setSelectedExhibition(exh);
            console.log("selectedExhibition", selectedExhibition, "exh", exh);
            infowindow.open(map, marker);
          });
        });
      });
    };
  }, []);

  return (
    <div className="relative" style={{ width: "100%", height: "600px" }}>
      <div id="map" className="w-full h-full" />
      {selectedExhibition && (
        <div className="absolute z-10 bottom-4 left-0 right-0 m-4 bg-white rounded-xl shadow-2xl max-h-[60vh] overflow-y-auto">
          <div className="flex p-4 gap-4">
            {/* 왼쪽: 이미지 */}
            <div className="w-32 h-32 flex-shrink-0">
              <img
                src={selectedExhibition.image}
                alt={selectedExhibition.title}
                className="w-full h-full object-cover rounded-lg"
              />
            </div>

            {/* 오른쪽: 정보 */}
            <div className="flex-1 flex flex-col justify-center">
              <h2 className="text-lg font-bold mb-2">
                {selectedExhibition.title}
              </h2>
              <p className="text-sm text-gray-600 mb-1">
                {selectedExhibition.category}
              </p>
              <p className="text-sm text-gray-600 mb-1">
                {selectedExhibition.date}
              </p>
              <p className="text-sm text-gray-600">
                {selectedExhibition.location}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
