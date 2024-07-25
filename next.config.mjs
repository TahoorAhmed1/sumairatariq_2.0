/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    optimizePackageImports: ["package-name"],
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.sumairatariq.com",
        pathname: "**",
      },
      {
        protocol: "http",
        hostname: "localhost",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "testapi.sumairatariq.com",
        pathname: "**",
      },
    ],
  },
};

export default nextConfig;
