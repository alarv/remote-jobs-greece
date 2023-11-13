/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    API_URL: process.env.API_URL,
    LOCATION_ORIGIN: process.env.LOCATION_ORIGIN,
  },
};

module.exports = nextConfig;
