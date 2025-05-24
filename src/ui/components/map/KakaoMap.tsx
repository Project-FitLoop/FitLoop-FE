'use client';

import { useEffect } from 'react';

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    kakao: any;
  }
}

export default function KakaoMap() {
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const markers: any[] = [];

    const loadMap = async () => {
      const script = document.createElement('script');
      script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_KEY}&autoload=false`;
      script.onload = () => {
        window.kakao.maps.load(() => {
          const container = document.getElementById('kakao-map');
          const options = {
            center: new window.kakao.maps.LatLng(37.5563, 126.9220),
            level: 2,
          };
          const map = new window.kakao.maps.Map(container, options);

          const fetchPlaces = async (center: { La: number; Ma: number }) => {
            const res = await fetch(
              `https://dapi.kakao.com/v2/local/search/keyword.json?query=옷가게&x=${center.La}&y=${center.Ma}&radius=2000`,
              {
                headers: {
                  Authorization: `KakaoAK ${process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY}`,
                },
              }
            );
            const data = await res.json();

            // 기존 마커 삭제
            markers.forEach((m) => m.setMap(null));
            markers.length = 0;

            // 마커 다시 생성
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            data.documents.forEach((place: any) => {
              const marker = new window.kakao.maps.Marker({
                map,
                position: new window.kakao.maps.LatLng(place.y, place.x),
              });

              const infowindow = new window.kakao.maps.InfoWindow({
                content: `<div style="padding:5px;font-size:12px;">${place.place_name}</div>`,
              });

              window.kakao.maps.event.addListener(marker, 'mouseover', () => infowindow.open(map, marker));
              window.kakao.maps.event.addListener(marker, 'mouseout', () => infowindow.close());

              markers.push(marker);
            });
          };

          // 처음에 로드
          fetchPlaces(map.getCenter());

          // 지도가 이동/확대/축소되었을 때 다시 요청
          window.kakao.maps.event.addListener(map, 'idle', () => {
            const center = map.getCenter();
            fetchPlaces(center);
          });
        });
      };
      document.head.appendChild(script);
    };

    loadMap();
  }, []);

  return <div id="kakao-map" className="w-full h-40 rounded-lg" />;
}
