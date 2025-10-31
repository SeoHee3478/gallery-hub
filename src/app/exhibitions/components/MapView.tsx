"use client";

import { useEffect } from "react";
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
            infowindow.open(map, marker);
          });
        });
      });
    };
  }, []);

  return <div id="map" style={{ width: "100%", height: "500px" }} />;
}
