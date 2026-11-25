import type { NextConfig } from 'next';

const base = process.env.GITHUB_PAGES === 'true' ? '/sutra-ui' : '';

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  images: { unoptimized: true },
  reactStrictMode: true,
  ...(base
    ? {
        basePath: base,
        assetPrefix: base,
        env: { NEXT_PUBLIC_BASE_PATH: base },
      }
    : { env: { NEXT_PUBLIC_BASE_PATH: '' } }),
};

export default nextConfig;
