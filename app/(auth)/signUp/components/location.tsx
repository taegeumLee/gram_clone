"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { IoLocationOutline, IoSearchOutline } from "react-icons/io5";
import Layout from "@/components/common/Layout";
import Header from "@/components/common/Header";
import Button from "@/components/common/Button";

interface Location {
  latitude: number;
  longitude: number;
}

interface LocationProps {
  onNext: (location: Location) => void;
}

interface MapInstance {
  map: naver.maps.Map;
  marker: naver.maps.Marker;
}

export default function Location({ onNext }: LocationProps) {
  const [currentLocation, setCurrentLocation] = useState<Location | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<MapInstance | null>(null);

  const initializeMap = useCallback((location: Location) => {
    if (!mapRef.current) return;

    const position = new naver.maps.LatLng(
      location.latitude,
      location.longitude
    );

    if (mapInstanceRef.current) {
      // 기존 맵 인스턴스가 있으면 위치만 업데이트
      mapInstanceRef.current.map.setCenter(position);
      mapInstanceRef.current.marker.setPosition(position);
    } else {
      // 새로운 맵 인스턴스 생성
      const map = new naver.maps.Map(mapRef.current, {
        center: position,
        zoom: 15,
        scaleControl: false,
        mapDataControl: false,
        zoomControl: true,
      });

      const marker = new naver.maps.Marker({
        position,
        map,
      });

      mapInstanceRef.current = { map, marker };
    }
  }, []);

  const handleLocationUpdate = useCallback(
    (location: Location) => {
      setCurrentLocation(location);
      initializeMap(location);
    },
    [initializeMap]
  );

  const searchLocation = async () => {
    if (!searchQuery.trim()) return;

    setIsLoading(true);
    try {
      const response = await fetch(
        `/api/geocode?query=${encodeURIComponent(searchQuery.trim())}`
      );

      if (!response.ok) {
        console.error("API 응답 에러:", response.status);
        throw new Error(`API 호출 실패: ${response.status}`);
      }

      const data = await response.json();

      if (!data.addresses?.length) {
        throw new Error("검색 결과가 없습니다. 다른 검색어로 시도해주세요.");
      }

      const location = {
        latitude: parseFloat(data.addresses[0].y),
        longitude: parseFloat(data.addresses[0].x),
      };

      handleLocationUpdate(location);
    } catch (error) {
      console.error("위치 검색 실패:", error);
      alert(
        error instanceof Error ? error.message : "위치 검색에 실패했습니다."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const getCurrentLocation = useCallback(() => {
    setIsLoading(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const location = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        };
        handleLocationUpdate(location);
        setIsLoading(false);
      },
      (error) => {
        console.error("위치 정보 획득 실패:", error);
        alert("현재 위치를 가져올 수 없습니다.");
        setIsLoading(false);
      },
      { timeout: 10000, maximumAge: 0 }
    );
  }, [handleLocationUpdate]);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = `https://oapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${process.env.NEXT_PUBLIC_NAVER_CLIENT_ID}`;
    script.async = true;

    script.onload = () => {
      getCurrentLocation();
    };

    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return (
    <Layout>
      <Header
        title="회원님의 위치를 알려주세요"
        subtitle="가까운 사람들을 추천해드려요"
      />

      <div className="flex-1">
        <div className="mb-4 flex gap-2">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="주소를 입력하세요"
            className="flex-1 p-4 border-2 placeholder:text-gray-600 text-gray-800 focus:outline-none focus:border-sky-500 border-gray-200 rounded-xl"
            onKeyPress={(e) => e.key === "Enter" && searchLocation()}
          />
          <button
            onClick={searchLocation}
            disabled={isLoading || !searchQuery.trim()}
            className="p-4 bg-gray-100 rounded-xl hover:bg-gray-200 text-gray-800 cursor-pointer disabled:opacity-50 border-2 border-gray-200"
            aria-label="위치 검색"
          >
            <IoSearchOutline className="text-xl" />
          </button>
        </div>

        <button
          onClick={getCurrentLocation}
          disabled={isLoading}
          className="flex items-center gap-2 w-full p-4
            bg-white border-2 border-gray-200 rounded-2xl text-gray-600
            hover:border-sky-500 hover:text-sky-500
            transition-all duration-200 disabled:opacity-50 mb-4"
        >
          <IoLocationOutline className="text-xl" />
          <span>{isLoading ? "위치 확인 중..." : "현재 위치 사용하기"}</span>
        </button>

        <div className="mb-4 overflow-hidden rounded-xl border-2 border-gray-200">
          <div ref={mapRef} className="w-full h-64" />
        </div>
      </div>

      <Button
        onClick={() => currentLocation && onNext(currentLocation)}
        disabled={!currentLocation}
        isFixed
      >
        다음
      </Button>
    </Layout>
  );
}
