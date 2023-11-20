import React from 'react';
import Contact from '@/app/components/Contact';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact | Remote Jobs Greece',
  description:
    'Get in touch with RemoteJobsGreece.gr. Find our contact information and reach out for any inquiries or collaborations.',
  openGraph: {
    images: ['https://i.imgur.com/Tamd8rD.png'],
  },
};

export default function ContactPage() {
  return (
    <main className="mx-auto max-w-5xl px-2 py-5 sm:px-6 lg:px-8 py-5 pb-52">
      <form></form>
    </main>
  );
}
