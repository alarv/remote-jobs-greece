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
      <div className="w-full bg-white border border-gray-200 rounded-t-lg  shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
      <div className="flex items-center justify-between ">

      <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">
 Job Postings </h5>
 </div>
 </div>
    <div className='border shadow border-gray-200 rounded-b-lg grid grid-cols-1 divide-y divide-gray-100'>
        {jobs.map((job) => (
          <JobListing key={job.id} job={job} />
        ))}
        </div>
      </div>
    </main>
  );
}
