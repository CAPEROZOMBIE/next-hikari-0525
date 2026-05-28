import type { NextConfig } from "next";

const nextConfig: NextConfig = {
   images: {
      remotePatterns: [
         {
            protocol: "https",
            hostname: "images.microcms-assets.io",
         },
      ],
      formats: ["image/avif", "image/webp"],
      qualities: [75, 80, 100],
   },
     devIndicators: false,
    allowedDevOrigins: ["192.168.10.117"],
};

export default nextConfig;
