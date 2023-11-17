/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    API_URL: process.env.API_URL,
    LOCATION_ORIGIN: process.env.LOCATION_ORIGIN,
    CONTACT_API_SECRET: process.env.CONTACT_API_SECRET,
    RECAPTCHA_SECRET_KEY: process.env.RECAPTCHA_SECRET_KEY,
    GA_MEASUREMENT_ID: process.env.GA_MEASUREMENT_ID,
    NEXT_PUBLIC_RECAPTCHA_SITE_KEY: process.env.RECAPTCHA_SITE_KEY,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.imgur.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'hug.ntb.mybluehost.me',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

module.exports = nextConfig;
