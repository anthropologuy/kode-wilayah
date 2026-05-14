import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {

  assetPrefix: isProd
    ? "/kode-wilayah"
    : undefined,

};

export default nextConfig;