import React from 'react';
import JobListing, { IJob } from '@/app/components/JobListing';

async function getJobs(): Promise<IJob[]> {
  const apiURL = process.env.API_URL!;

  try {
    const response = await fetch(`${apiURL}/jobs`, { cache: 'no-store' });
    return response.json();
  } catch (err) {
    console.error('jobs could not be retrieved');
    return [];
  }
}

export default async function JobListings() {
  const jobs = await getJobs();

  return (
    <main className="grid grid-cols-3 gap-4">
      <div>filters</div>
      <div className="col-span-2">
        {jobs.map((job) => (
          <JobListing key={job.id} job={job} />
        ))}
      </div>
    </main>
  );
}
