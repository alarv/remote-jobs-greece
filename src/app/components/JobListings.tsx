'use client';

import React, { useEffect, useState } from 'react';
import { Filters, IFilters } from './Filters';
import JobListing, { IJob } from './JobListing';
import { useRouter, useSearchParams } from 'next/navigation';
import Pagination from './Pagination';
import Search from '@/app/components/Search';
import { JobsResponse } from '@/app/api/jobs/route';
import { prefixFilterKeysWithFilters } from '@/app/util/jobs.util';
import LoadingSkeleton from '@/app/components/LoadingSkeleton';

interface JobListingProps {}

async function getJobs(filters: IFilters = {}): Promise<JobsResponse> {
  const params = new URLSearchParams({
    ...filters,
  });
  const queryString = params.toString();

  try {
    const response = await fetch(`/api/jobs?${queryString}`, {
      cache: 'no-store',
    });

    const data = await response.json();
    console.log(data);
    return data;
  } catch (err) {
    console.error('page jobs could not be retrieved');
    return {
      total: 0,
      totalPages: 1,
      data: [],
    };
  }
}

async function searchJobs(searchTerm: string): Promise<JobsResponse> {
  try {
    const response = await fetch(`/api/search?searchTerm=${searchTerm}`);

    const data = await response.json();
    console.log(data);
    return data;
  } catch (err) {
    console.error('page jobs could not be retrieved');
    return {
      total: 0,
      totalPages: 1,
      data: [],
    };
  }
}

export default function JobListings(props: JobListingProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [jobs, setJobs] = useState<IJob[] | undefined>();
  const [totalJobs, setTotalJobs] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [searchTerm, setSearchTerm] = useState<string | null>(null);
  const [filters, setFilters] = useState<IFilters>({});
  const [currentPage, setCurrentPage] = useState(1);
  const searchParams = useSearchParams();

  function parseJobsResponse(jobsResponse: JobsResponse) {
    setJobs(jobsResponse.data);
    setTotalJobs(jobsResponse.total);
    setTotalPages(jobsResponse.totalPages);
    setIsLoading(false);
  }

  useEffect(() => {
    if (searchTerm) {
      searchJobs(searchTerm).then((jobsResponse) =>
        parseJobsResponse(jobsResponse),
      );
    } else {
      getJobs(Object.fromEntries(searchParams.entries()) as IFilters).then(
        (jobsResponse) => parseJobsResponse(jobsResponse),
      );
    }
  }, [searchTerm, searchParams]);

  function filtersChanged(filters: IFilters) {
    const params = new URLSearchParams({ ...filters });
    const queryString = params.toString();

    setFilters(filters);
    setSearchTerm(null);

    router.push(`/jobs?${queryString}`);
  }

  function searchSubmitted(searchTerm: string) {
    setSearchTerm(searchTerm);
  }

  return (
    <main className="grid md:grid-cols-3 gap-4 ">
      <div>
        <Filters onFiltersChange={filtersChanged} />
      </div>
      <div className="col-span-2">
        <div className="w-full bg-white border border-gray-200 rounded-t-lg  shadow px-3 py-8 ">
          <div className="flex items-center justify-between">
            <h5 className="text-xl font-bold leading-none text-gray-900">
              Job Postings{' '}
            </h5>
            {/*<Search onSearchSubmitted={searchSubmitted} />*/}
          </div>
        </div>
        <div className="border shadow border-gray-200 rounded-b-lg grid grid-cols-1 divide-y divide-gray-100">
          {isLoading && (
            <div className="p-3">
              <LoadingSkeleton />
            </div>
          )}
          {jobs && jobs.length === 0 && (
            <p className="p-10">No jobs were found with your search criteria</p>
          )}
          {jobs && jobs.map((job) => <JobListing key={job.id} job={job} />)}
        </div>
        <div>
          <Pagination
            currentPage={currentPage}
            total={totalJobs}
            totalPages={totalPages}
          />
        </div>
      </div>
    </main>
  );
}
