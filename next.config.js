/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    API_URL: process.env.API_URL,
    LOCATION_ORIGIN: process.env.LOCATION_ORIGIN,
    CONTACT_API_SECRET: process.env.CONTACT_API_SECRET,
    RECAPTCHA_SECRET_KEY: process.env.RECAPTCHA_SECRET_KEY,
    GA_MEASUREMENT_ID: process.env.GA_MEASUREMENT_ID,
    ZOHO_CLIENT_ID: process.env.ZOHO_CLIENT_ID,
    ZOHO_CLIENT_SECRET: process.env.ZOHO_CLIENT_SECRET,
    ZOHO_REFRESH_TOKEN: process.env.ZOHO_REFRESH_TOKEN,
    ZOHO_ACCOUNT_ID: process.env.ZOHO_ACCOUNT_ID,
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
