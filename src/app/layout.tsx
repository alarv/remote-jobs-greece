import './globals.css';
import type { Metadata } from 'next';
import React, { ReactNode } from 'react';
import { Inter } from 'next/font/google';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';

const interFont = Inter({
  subsets: ['latin'],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={interFont.className}>
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
