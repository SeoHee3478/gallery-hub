declare namespace kakao.maps {
  function load(callback: () => void): void;

  class Map {
    constructor(
      container: HTMLElement,
      options: { center: LatLng; level: number }
    );
  }

  class LatLng {
    constructor(lat: number, lng: number);
    getLat(): number;
    getLng(): number;
  }

  class Marker {
    constructor(options: { map: Map; position: LatLng; title?: string });
    setMap(map: Map | null): void;
    setPosition(position: LatLng): void;
  }

  class InfoWindow {
    constructor(options: { content: string });
    open(map: Map, marker: Marker): void;
    close(): void;
  }

  const event: {
    addListener(
      target: Map | Marker,
      eventName: string,
      handler: () => void
    ): void;
  };
}
