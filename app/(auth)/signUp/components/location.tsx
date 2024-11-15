"use client";

import { useEffect, useState, useCallback } from "react";
import { IoLocationOutline, IoSearch } from "react-icons/io5";

interface Location {
  latitude: number;
  longitude: number;
}

interface KakaoPlace {
  y: string;
  x: string;
  place_name: string;
  address_name: string;
}

import dynamic from "next/dynamic";

const KakaoMap = dynamic(
  async () => {
    const { Map } = await import("react-kakao-maps-sdk");
    return Map;
  },
  {
    ssr: false,
    loading: () => <div>지도를 불러오는 중...</div>,
  }
);

const KakaoMapMarker = dynamic(
  async () => {
    const { MapMarker } = await import("react-kakao-maps-sdk");
    return MapMarker;
  },
  {
    ssr: false,
  }
);

interface LocationProps {
  onNext: (location: Location) => void;
}

declare global {
  interface Window {
    kakao: any;
  }
}
export default function Location({ onNext }: LocationProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentLocation, setCurrentLocation] = useState<Location | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isMapReady, setIsMapReady] = useState(false);
  const [places, setPlaces] = useState<KakaoPlace[]>([]);

  const handleError = (message: string) => {
    console.error(message);
    alert(message);
    setIsLoading(false);
  };

  const getCurrentLocation = async () => {
    setIsLoading(true);
    try {
      if (!("geolocation" in navigator)) {
        throw new Error("이 브라우저에서는 위치 정보를 사용할 수 없습니다.");
      }

      const position = await new Promise<GeolocationPosition>(
        (resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject);
        }
      );

      setCurrentLocation({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });
    } catch (error) {
      handleError("위치 정보를 가져오는데 실패했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  const searchPlaces = useCallback(() => {
    if (!searchQuery.trim()) return;

    const ps = new window.kakao.maps.services.Places();
    ps.keywordSearch(searchQuery, (data: KakaoPlace[], status: any) => {
      if (status === window.kakao.maps.services.Status.OK && data[0]) {
        setPlaces(data);
        setCurrentLocation({
          latitude: Number(data[0].y),
          longitude: Number(data[0].x),
        });
      }
    });
  }, [searchQuery]);

  const initializeKakaoMap = useCallback(() => {
    const script = document.createElement("script");
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_APP_KEY}&libraries=services&autoload=false`;
    script.async = true;

    script.onload = () => {
      window.kakao.maps.load(() => {
        setIsMapReady(true);
        getCurrentLocation();
      });
    };

    document.head.appendChild(script);
    return () => {
      document.head.removeChild(script);
    };
  }, []);

  useEffect(() => {
    return initializeKakaoMap();
  }, [initializeKakaoMap]);

  const handleNext = () => {
    if (currentLocation) {
      onNext(currentLocation);
    }
  };

  return (
    <div className="flex flex-col min-h-screen w-full p-6 bg-white">
      {/* 헤더 텍스트 */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          회원님의 위치를 알려주세요
        </h1>
        <p className="text-gray-500 mt-2">가까운 사람들을 추천해드려요</p>
      </div>

      {/* 검색 입력창 */}
      <div className="relative mb-4">
        <IoSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && searchPlaces()}
          placeholder="서울광역시 강남구"
          className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl
            focus:border-sky-500 focus:ring-2 focus:ring-sky-200 focus:outline-none
            transition-all"
        />
      </div>

      {/* 현재 위치 버튼 */}
      <button
        onClick={getCurrentLocation}
        disabled={isLoading}
        className="flex items-center justify-center gap-2 w-full p-4 border-2
          border-gray-200 rounded-xl text-gray-600 hover:border-sky-500
          hover:text-sky-500 transition-all mb-4"
      >
        <IoLocationOutline className="text-xl" />
        <span>{isLoading ? "위치 확인 중..." : "현재 위치 사용하기"}</span>
      </button>

      {/* 지도 영역 */}
      <div className="flex-1 rounded-xl mb-6 overflow-hidden bg-gray-100">
        {isMapReady && currentLocation ? (
          <KakaoMap
            center={{
              lat: currentLocation.latitude,
              lng: currentLocation.longitude,
            }}
            style={{
              width: "100%",
              height: "100%",
            }}
            level={3}
          >
            {currentLocation && (
              <KakaoMapMarker
                position={{
                  lat: currentLocation.latitude,
                  lng: currentLocation.longitude,
                }}
              />
            )}
          </KakaoMap>
        ) : (
          <div>지도를 불러오는 중...</div>
        )}
      </div>

      {/* 다음 버튼 */}
      <button
        onClick={handleNext}
        disabled={!currentLocation && !searchQuery}
        className={`w-full p-4 rounded-xl font-medium transition-all
          ${
            currentLocation || searchQuery
              ? "bg-sky-500 text-white hover:bg-sky-600"
              : "bg-gray-200 text-gray-500 cursor-not-allowed"
          }`}
      >
        다음
      </button>
    </div>
  );
}
