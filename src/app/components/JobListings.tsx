import React from 'react';
import Job, { IJob } from '@/app/components/Job';

async function getJobs(): Promise<IJob[]> {
  const apiURL = process.env.API_URL!;

  try {
    const response = await fetch(apiURL);
    return response.json();
  } catch (err) {
    console.error('jobs could not be retrieved');
    return [];
  }
}

export default async function JobListings() {
  const jobs = await getJobs();

  return (
    <div>
      <h1>Job Listings</h1>
      {jobs.map((job) => (
        <Job key={job.id} job={job} />
      ))}
    </div>
  );
}
