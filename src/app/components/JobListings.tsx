'use client';

import React from 'react';
import Filters from './Filters';
import JobListing, { Job } from './JobListing';

interface JobListingProps {
  jobs: Job[];
}

export default function JobListings(props: JobListingProps) {
  const jobs = props.jobs;

  function kouradiTrupio() {
    console.log('filters changed');
  }

  return (
    <main className="grid grid-cols-3 gap-4">
      <div>
        <Filters onFiltersChange={kouradiTrupio} />
      </div>
      <div className="col-span-2">
        <div className="w-full bg-white border border-gray-200 rounded-t-lg  shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
          <div className="flex items-center justify-between ">
            <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">
              Job Postings{' '}
            </h5>
          </div>
        </div>
        <div className="border shadow border-gray-200 rounded-b-lg grid grid-cols-1 divide-y divide-gray-100">
          {jobs.map((job) => (
            <JobListing key={job.id} job={job} />
          ))}
        </div>
      </div>
    </main>
  );
}
