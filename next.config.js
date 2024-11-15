/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "dapi.kakao.com",
      },
    ],
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /react-kakao-maps-sdk/,
      use: "null-loader",
    });
    return config;
  },
  experimental: {
    missingSuspenseWithCSRError: false,
  },
};

module.exports = nextConfig;
