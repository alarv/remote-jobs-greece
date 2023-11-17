import React from 'react';
import JobListings from '../components/JobListings';
import { IJob } from '../components/JobListing';
import { IFilters } from '../components/Filters';
import { JobsResponse } from '@/app/api/jobs/route';
import { Metadata } from 'next';
import { prefixFilterKeysWithFilters } from '@/app/jobs/jobs.util';

export const metadata: Metadata = {
  title: 'Jobs | Remote Jobs Greece',
  description:
    'Explore a variety of remote job opportunities in Greece with RemoteJobsGreece.gr.',
  openGraph: {
    images: ['https://i.imgur.com/Tamd8rD.png'],
  },
};

async function getJobs(filters: IFilters = {}): Promise<JobsResponse> {
  const params = new URLSearchParams({
    ...prefixFilterKeysWithFilters(filters),
  });
  const queryString = params.toString();

  try {
    const response = await fetch(
      `${process.env.LOCATION_ORIGIN}/api/jobs?${queryString}`,
      { cache: 'no-store' },
    );

    return response.json();
  } catch (err) {
    console.error('page jobs could not be retrieved');
    return {
      total: 0,
      totalPages: 1,
      data: [],
    };
  }
}

export default async function Jobs({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const response = await getJobs(searchParams);
  const { data: jobs, total, totalPages } = response;

  return (
    <>
      <main className="mx-auto max-w-5xl py-5 px-2 sm:px-6 lg:px-8">
        <JobListings jobs={jobs} total={total} totalPages={totalPages} />
      </main>
    </>
  );
}
