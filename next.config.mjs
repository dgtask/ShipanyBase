import createNextIntlPlugin from "next-intl/plugin";
import { createMDX } from "fumadocs-mdx/next";

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  pageExtensions: ["ts", "tsx", "js", "jsx", "md", "mdx"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*",
      },
    ],
  },
  redirects: async () => {
    return [
      {
        source: "/:locale/privacy-policy",
        destination: "/privacy-policy",
        permanent: false,
      },
      {
        source: "/:locale/terms-of-service",
        destination: "/terms-of-service",
        permanent: false,
      },
    ];
  },
  experimental: {
    turbopackFileSystemCacheForDev: true,
    // Optimize package imports
    optimizePackageImports: [
      "lucide-react",
      "@radix-ui/react-icons",
      "framer-motion",
      "recharts",
      "@tabler/icons-react",
    ],
  },
  reactCompiler: true,
  // Optimize output
  compress: true,
  // Parallel build
  webpack: (config, { isServer }) => {
    // Optimize webpack config
    if (!isServer) {
      config.optimization = {
        ...config.optimization,
        moduleIds: "deterministic",
      };
    }
    return config;
  },
};

const withMDX = createMDX({
  // customise the config file path
  configPath: "./source.config.ts",
});

const withNextIntl = createNextIntlPlugin({
  requestConfig: "./src/core/i18n/request.ts",
});

export default withNextIntl(withMDX(nextConfig));
