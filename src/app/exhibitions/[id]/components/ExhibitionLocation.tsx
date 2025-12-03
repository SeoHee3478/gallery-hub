import { MapPin } from "lucide-react";
import { useEffect, useRef } from "react";

interface ExhibitionLocationProps {
  address: string;
  placeUrl?: string;
  lat?: string;
  lng?: string;
}

export function ExhibitionLocation({
  address,
  placeUrl,
  lat,
  lng,
}: ExhibitionLocationProps) {
  const mapRef = useRef<HTMLDivElement>(null);

  // 유효한 좌표인지 확인
  const hasValidCoordinates =
    lat !== undefined && lng !== undefined && lat !== "" && lng !== "";
  console.log(lat, lng);
  useEffect(() => {
    if (!hasValidCoordinates) return;

    // 카카오맵 로드
    window.kakao?.maps.load(() => {
      if (!mapRef.current) return;

      const options = {
        center: new window.kakao.maps.LatLng(parseFloat(lat), parseFloat(lng)),
        level: 3,
      };

      const map = new window.kakao.maps.Map(mapRef.current, options);

      // 마커 추가
      const markerPosition = new window.kakao.maps.LatLng(
        parseFloat(lat),
        parseFloat(lng)
      );
      const marker = new window.kakao.maps.Marker({
        position: markerPosition,
      });
      marker.setMap(map);
    });
  }, [lat, lng, hasValidCoordinates]);

  // 좌표가 없는 경우
  if (!hasValidCoordinates) {
    return (
      <div className="space-y-3">
        <h3 className="text-base md:text-lg font-semibold">Location</h3>
        <div className="relative w-full h-48 md:h-64 rounded-lg overflow-hidden bg-muted/30 flex items-center justify-center">
          <div className="text-center">
            <MapPin className="w-12 h-12 mx-auto text-primary/50 mb-3" />
            <p className="text-sm text-muted-foreground">위치 정보 없음</p>
          </div>
        </div>
        <p className="text-sm">{address || "주소 정보 없음"}</p>
      </div>
    );
  }
  return (
    <div className="space-y-3">
      <h3 className="text-base md:text-lg font-semibold">Location</h3>
      <div
        ref={mapRef}
        className="relative w-full h-48 md:h-64 rounded-lg overflow-hidden"
      />
      <p className="text-sm">{address}</p>
      {placeUrl && (
        <a
          href={`${placeUrl}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-primary hover:underline"
        >
          공식 홈페이지 →
        </a>
      )}
    </div>
  );
}
