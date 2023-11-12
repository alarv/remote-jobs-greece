import React from 'react';
import JobListings from '../components/JobListings';
import { Job } from '../components/JobListing';
import { IFilters } from '../components/Filters';

async function getJobs(filters: IFilters = {}): Promise<Job[]> {
  const params = new URLSearchParams({ ...filters });
  const queryString = params.toString();

  try {
    const response = await fetch(
      `${process.env.LOCATION_ORIGIN}/api/jobs?${queryString}`,
      {
        cache: 'no-store',
      },
    );
    return response.json();
  } catch (err) {
    console.error('page jobs could not be retrieved');
    return [];
  }
}

export default async function Jobs({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const jobs = await getJobs(searchParams);

  return (
    <>
      <main className="mx-auto max-w-5xl py-5 px-2 sm:px-6 lg:px-8">
        <JobListings jobs={jobs} />
      </main>
    </>
  );
}
