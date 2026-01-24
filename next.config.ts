import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'images.unsplash.com',
                pathname: '**',
            },
            {
                protocol: 'https',
                hostname: 'raw.githubusercontent.com',
                pathname: '**',
            },
        ],
        unoptimized: true,
    },
    /*
    async rewrites() {
        // Skip proxying if we are already running on the Render backend
        if (process.env.RENDER) {
            return [];
        }

        return {
            beforeFiles: [
                {
                    source: '/api/:path*',
                    destination: 'https://resume-builder-a6ve.onrender.com/api/:path*',
                },
            ],
        };
    },
    */
};

export default nextConfig;