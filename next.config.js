/** @type {import('next').NextConfig} */

const withTM = require("next-transpile-modules")([
  "@fullcalendar/common",
  "@fullcalendar/daygrid",
  // "@fullcalendar/timegrid",
  "@fullcalendar/interaction",
  "@fullcalendar/react",
]);

const nextConfig = {
  reactStrictMode: true,
  trailingSlash: true,
  images: {
    loader: "imgix",
    path: "",
    domains: ["firebasestorage.googleapis.com"],
  },
};

module.exports = withTM(nextConfig);
