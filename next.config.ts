import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  // Dev only: lets a phone on the same home Wi-Fi open the local site at http://<this PC>:3000.
  allowedDevOrigins: ["192.168.*.*"],
};

export default nextConfig;
