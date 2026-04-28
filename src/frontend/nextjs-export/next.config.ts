import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Transpile Three.js ecosystem packages (ESM-only)
  transpilePackages: [
    "three",
    "@react-three/fiber",
    "@react-three/drei",
    "@react-three/postprocessing",
  ],

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
      {
        protocol: "http",
        hostname: "localhost",
      },
    ],
  },

  // Turbopack configuration (stable in Next.js 15)
  experimental: {
    // Turbopack is now the default for `next dev --turbo`
    // Add any Turbopack-specific rules here if needed
  },

  // Ensure server components can import 3D libs without issues
  webpack(config) {
    // Allow importing GLSL shader files
    config.module.rules.push({
      test: /\.(glsl|vs|fs|vert|frag)$/,
      use: "raw-loader",
      exclude: /node_modules/,
    });
    return config;
  },
};

export default nextConfig;
