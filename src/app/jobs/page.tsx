import React from 'react';
import JobListings from '../components/JobListings';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Jobs | Remote Jobs Greece',
  description:
    'Explore a variety of remote job opportunities in Greece with RemoteJobsGreece.gr.',
  openGraph: {
    images: ['https://i.imgur.com/Tamd8rD.png'],
  },
};

type SearchParams = { [key: string]: string | string[] | undefined };

export default async function Jobs() {
  return (
    <>
      <main className="mx-auto max-w-5xl py-5 px-2 sm:px-6 lg:px-8">
        <JobListings />
      </main>
    </>
  );
}
