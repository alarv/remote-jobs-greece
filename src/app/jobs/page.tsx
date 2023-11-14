import React from 'react';
import JobListings from '../components/JobListings';
import { IJob } from '../components/JobListing';
import { IFilters } from '../components/Filters';
import { JobsResponse } from '@/app/api/jobs/route';

async function getJobs(filters: IFilters = {}): Promise<JobsResponse> {
  const params = new URLSearchParams({ ...filters });
  const queryString = params.toString();
  console.log(queryString);

  try {
    const response = await fetch(
      `${process.env.LOCATION_ORIGIN}/api/jobs?${queryString}`,
      { cache: 'force-cache' },
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

  console.log('jobs', jobs);

  return (
    <>
      <main className="mx-auto max-w-5xl py-5 px-2 sm:px-6 lg:px-8">
        <JobListings jobs={jobs} total={total} totalPages={totalPages} />
      </main>
    </>
  );
}
