/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.sumairatariq.com",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "sumairatariq.com",
        pathname: "**",
      },
    ],
  },
};

export default nextConfig;
