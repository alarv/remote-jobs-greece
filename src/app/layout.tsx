import './globals.css';
import type { Metadata } from 'next';
import React, { ReactNode } from 'react';
import { Onest } from 'next/font/google';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import MainContent from '@/app/components/MainContent';

export const metadata: Metadata = {
  title: 'Remote jobs Greece - Find and Post Remote Jobs in Greece',
  description:
    'Unlock a world of remote work opportunities in Greece with RemoteJobsGreece.gr. Browse listings for freelance, part-time, and full-time remote jobs, or post your own job openings to connect with top talent. Your next career move starts here.',
};

const onestFont = Onest({
  subsets: ['latin'],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={onestFont.className}>
      <body>
        <Header />
        <MainContent>{children}</MainContent>
        <Footer />
      </body>
    </html>
  );
}
