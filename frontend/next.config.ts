import type { NextConfig } from 'next';
import path from 'path';

const nextConfig: NextConfig = {
    outputFileTracingRoot: path.join(__dirname, '../'),
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
    async rewrites() {
        return [
            {
                source: '/api/:path*',
                destination: 'http://localhost:5005/api/:path*',
            },
        ];
    },
};

export default nextConfig;