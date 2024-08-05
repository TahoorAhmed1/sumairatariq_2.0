/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    minimumCacheTTL: 60,
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
      {
        protocol: "https",
        hostname: "st.ggilab.com",
        pathname: "**",
      },
    ],
  },
};

export default nextConfig;
