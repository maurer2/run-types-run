import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  typedRoutes: true,
  experimental: {
    useTypeScriptCli: true,
  },
};

export default nextConfig;
