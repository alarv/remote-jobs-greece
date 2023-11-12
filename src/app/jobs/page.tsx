import React from 'react';
import JobListings from '../components/JobListings';
import { Job } from '../components/JobListing';
import { IFilters } from '../components/Filters';

async function getJobs(filters: IFilters = {}): Promise<Job[]> {
  const apiURL = process.env.API_URL!;

  try {
    const response = await fetch(`${apiURL}/jobs`, { cache: 'no-store' });
    return response.json();
  } catch (err) {
    console.error('jobs could not be retrieved');
    return [];
  }
}

export default async function Jobs() {
  const jobs = await getJobs();
  return (
    <>
      <main className="mx-auto max-w-5xl py-5 px-2 sm:px-6 lg:px-8">
        <JobListings jobs={jobs} />
      </main>
    </>
  );
}
