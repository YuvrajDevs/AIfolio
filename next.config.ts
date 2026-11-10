import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The Services page was renamed to Skills; keep old links working.
  async redirects() {
    return [
      { source: "/services", destination: "/skills", permanent: true },
      { source: "/work/tally", destination: "/work/trueup", permanent: true },
    ];
  },
};

export default nextConfig;
