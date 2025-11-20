"use client";

import { useEffect, useRef, useState } from "react";

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

export default function MapView({ data }: { data: Exhibition[] }) {
  const [selectedExhibition, setSelectedExhibition] =
    useState<Exhibition | null>(null);

  const mapRef = useRef<kakao.maps.Map>(null); //지도 객체 저장
  const markersRef = useRef<kakao.maps.Marker[]>([]); //마커 저장 배열
  const [mapReady, setMapReady] = useState(false);

  useEffect(() => {
    // Kakao SDK 동적 로드
    const script = document.createElement("script");
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_KEY}&autoload=false`;
    document.head.appendChild(script);

    script.onload = () => {
      kakao.maps.load(() => {
        const container = document.getElementById("map");
        if (!container) return;

        const map = new kakao.maps.Map(container, {
          center: new kakao.maps.LatLng(37.5665, 126.978),
          level: 3,
        });

        mapRef.current = map;
        setMapReady(true);
      });
    };
  }, []);

  useEffect(() => {
    if (!mapReady || !mapRef.current) return;
    const map = mapRef.current;

    // 기존 마커 제거
    markersRef.current.forEach((marker) => marker.setMap(null));
    markersRef.current = [];

    // 새 마커 생성
    data.forEach((exh: Exhibition) => {
      const marker = new kakao.maps.Marker({
        map,
        position: new kakao.maps.LatLng(exh.lat, exh.lng),
        title: exh.title,
      });

      markersRef.current.push(marker);

      kakao.maps.event.addListener(marker, "click", () => {
        setSelectedExhibition(exh);
      });
    });
  }, [data, mapReady]);

  return (
    <div className="relative" style={{ width: "100%", height: "600px" }}>
      <div id="map" className="w-full h-full" />
      {selectedExhibition && (
        <div className="absolute z-10 bottom-4 left-1/2 -translate-x-1/2 m-4 bg-white rounded-xl shadow-2xl max-h-[60vh] overflow-y-auto">
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
