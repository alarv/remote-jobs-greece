import './globals.css';
import type { Metadata } from 'next';
import React from 'react';
import { Inter } from 'next/font/google';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import CookiesConsent from '@/app/components/CookiesConsent';

const interFont = Inter({
  subsets: ['latin'],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://remotejobsgreece.gr'),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={interFont.className}>
      <body>
        <CookiesConsent />

        <div id="main-container">
          <Header />
          <div id="content">
            {children} {/* Your main content goes here */}
          </div>
          <Footer /> {/* This will be your sticky footer */}
        </div>
      </body>
    </html>
  );
}
