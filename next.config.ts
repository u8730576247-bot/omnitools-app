import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/vox-rex-lex",
        destination: "/vox-rex-lex/index.html",
      },
      {
        source: "/vox-rex-lex/:path*",
        destination: "/vox-rex-lex/:path*",
      },
    ];
  },
};

export default nextConfig;