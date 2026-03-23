// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   /* config options here */
//   images: {
//     remotePatterns: [
//       {
//         protocol: "https",
//         hostname: "www.mocka.com.au",
//         port: "",
//         pathname: "/**",
//         search: "",
//       },
//     ],
//   },
// };

// export default nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.mocka.com.au",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "hotmodagency.com",
        pathname: "/**",
      },
    ],
  },
};

module.exports = nextConfig;
