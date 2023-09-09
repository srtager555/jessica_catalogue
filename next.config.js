/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "127.0.0.1",
        port: "9199", // fb storage btw
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "*",
        port: "",
        pathname: "**",
      },
    ],
  },
};

module.exports = nextConfig;
