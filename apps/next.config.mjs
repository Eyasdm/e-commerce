import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const nextConfig = {
  turbopack: {
    root: __dirname,
  },
  async rewrites() {
    return [
      {
        source: "/api/v1/:path*",
        destination: "https://technest-cnxo.onrender.com/api/v1/:path*",
      },
      {
        source: "/products/:path*",
        destination: "https://technest-cnxo.onrender.com/products/:path*",
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "8000",
        pathname: "/products/**",
      },
      {
        protocol: "https",
        hostname: "technest-cnxo.onrender.com",
        pathname: "/products/**",
      },
    ],
  },
};

export default nextConfig;
