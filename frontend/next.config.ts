import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
    outputFileTracingRoot: path.join(__dirname, "../"),
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "images.unsplash.com",
                pathname: "**",
            },
            {
                protocol: "https",
                hostname: "raw.githubusercontent.com",
                pathname: "**",
            },
        ],
        unoptimized: true,
    },

    async rewrites() {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        if (!apiUrl) return [];

        return [
            {
                source: "/api/:path*",
                destination: `${apiUrl}/api/:path*`,
            },
        ];
    }


};

export default nextConfig;
