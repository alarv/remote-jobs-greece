import React from 'react';
import { Job } from '@/app/job/job';

async function getJobs(): Promise<Job[]> {
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
        <div key={job.id}>
          <h2>{job.title.rendered}</h2>
          <h3>Company: {job.acf.company_name}</h3>
          <div>{job.content.rendered}</div>
        </div>
      ))}
    </div>
  );
}
