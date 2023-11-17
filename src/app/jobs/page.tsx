import React from 'react';
import JobListings from '../components/JobListings';
import { IJob } from '../components/JobListing';
import { IFilters } from '../components/Filters';
import { JobsResponse } from '@/app/api/jobs/route';
import { Metadata } from 'next';
import { prefixFilterKeysWithFilters } from '@/app/util/jobs.util';

export const metadata: Metadata = {
  title: 'Jobs | Remote Jobs Greece',
  description:
    'Explore a variety of remote job opportunities in Greece with RemoteJobsGreece.gr.',
  openGraph: {
    images: ['https://i.imgur.com/Tamd8rD.png'],
  },
};

export default async function Jobs({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  return (
    <>
      <main className="mx-auto max-w-5xl py-5 px-2 sm:px-6 lg:px-8">
        <JobListings />
      </main>
    </>
  );
}
