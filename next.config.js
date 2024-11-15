/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["dapi.kakao.com"],
  },
  env: {
    KAKAO_MAP_APP_KEY: process.env.NEXT_PUBLIC_KAKAO_MAP_APP_KEY,
  },
};

module.exports = nextConfig;
