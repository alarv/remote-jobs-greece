'use client';

import React, { useState } from 'react';
import { Filters, IFilters } from './Filters';
import JobListing, { IJob } from './JobListing';
import { useRouter } from 'next/navigation';
import Pagination from './Pagination';

interface JobListingProps {
  jobs: IJob[];
  total: number;
  totalPages: number;
  onFiltersChange?: (filters: IFilters) => void;
}

export default function JobListings(props: JobListingProps) {
  const jobs = props.jobs;
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);

  function filtersChanged(filters: IFilters) {
    props.onFiltersChange && props.onFiltersChange(filters);

    const params = new URLSearchParams({ ...filters });
    const queryString = params.toString();

    router.replace(`/jobs?${queryString}`);
    router.refresh();
  }

  return (
    <main className="grid md:grid-cols-3 gap-4 ">
      <div>
        <Filters onFiltersChange={filtersChanged} />
      </div>
      <div className="col-span-2">
        <div className="w-full bg-white border border-gray-200 rounded-t-lg  shadow px-3 py-8 ">
          <div className="flex items-center  justify-between ">
            <h5 className="text-xl font-bold leading-none text-gray-900">
              Job Postings{' '}
            </h5>
          </div>
        </div>
        <div className="border shadow border-gray-200 rounded-b-lg grid grid-cols-1 divide-y divide-gray-100">
          {jobs.map((job) => (
            <JobListing key={job.id} job={job} />
          ))}
        </div>
        <div>
          <Pagination
            currentPage={currentPage}
            total={props.total}
            totalPages={props.totalPages}
          />
        </div>
      </div>
    </main>
  );
}
