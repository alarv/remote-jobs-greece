'use client';

import React, { useCallback, useEffect, useState } from 'react';
import { Filters, IFilters } from './Filters';
import JobListing, { IJob } from './JobListing';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import Pagination from './Pagination';
import { JobsResponse } from '@/app/api/jobs/route';
import Image from 'next/image';
import LoadingSkeleton from '@/app/components/LoadingSkeleton';

interface JobListingProps {}

async function getJobs(
  filters: IFilters = {},
  currentPage: number,
): Promise<JobsResponse> {
  const params = new URLSearchParams({
    ...filters,
  });
  const queryString = params.toString();

  try {
    const response = await fetch(
      `/api/jobs?${queryString}&page=${currentPage}`,
      {
        cache: 'no-store',
      },
    );

    const data = await response.json();
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

async function searchJobs(
  searchTerm: string,
  currentPage: number,
): Promise<JobsResponse> {
  try {
    const response = await fetch(
      `/api/search?searchTerm=${searchTerm}&page=${currentPage}`,
    );

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
  const pathname = usePathname();

  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(true);
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
    setJobs(undefined);
    setIsLoading(true);
    if (searchTerm) {
      searchJobs(searchTerm, currentPage)
        .then((jobsResponse) => parseJobsResponse(jobsResponse))
        .catch(() => setIsError(true));
    } else {
      getJobs(
        Object.fromEntries(searchParams.entries()) as IFilters,
        currentPage,
      )
        .then((jobsResponse) => parseJobsResponse(jobsResponse))
        .catch(() => setIsError(true));
    }
  }, [searchTerm, searchParams, currentPage]);

  useEffect(() => {
    if (searchParams.has('page')) {
      setCurrentPage(parseInt(searchParams.get('page')!));
    }
  }, [searchParams]);

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams);
      params.set(name, value);

      return params.toString();
    },
    [searchParams],
  );

  function filtersChanged(filters: IFilters) {
    const params = new URLSearchParams({ ...filters });
    const queryString = params.toString();

    setFilters(filters);
    setSearchTerm(null);
    setCurrentPage(1);

    router.push(`/jobs?${queryString}`);
  }

  function searchSubmitted(searchTerm: string) {
    setSearchTerm(searchTerm);
  }

  function pageChanged(currentPage: number) {
    setCurrentPage(currentPage);
    router.push(
      pathname + '?' + createQueryString('page', currentPage.toString()),
    );
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
          <div className="flex items-center justify-between py-2">
            <p className="text-xs leading-none text-gray-400">
              Please Note: The job positions currently displayed on our website
              are for demonstration purposes only and do not represent actual
              vacancies. They are intended to showcase the functionality of
              Remote Jobs Greece and provide a preview of how real job listings
              will appear once we start hosting live data. Stay tuned for
              updates as we begin to feature actual remote job opportunities!
            </p>
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
            <>
              <div className="flex items-center justify-center">
                <Image
                  alt="no jobs sad ghost"
                  src="https://i.imgur.com/uvZdUXX.png"
                  width={100}
                  height={100}
                  className="py-3"
                />
              </div>
              {isError ? (
                <p className="p-10 text-sm text-center">An error occurred</p>
              ) : (
                <p className="p-10 text-sm text-center">
                  No jobs were found with your search criteria
                </p>
              )}
            </>
          )}
          {jobs && jobs.map((job) => <JobListing key={job.id} job={job} />)}
        </div>
        <div>
          {!isLoading && (
            <Pagination
              currentPage={currentPage}
              total={totalJobs}
              totalPages={totalPages}
              onPageChanged={pageChanged}
            />
          )}
        </div>
      </div>
    </main>
  );
}
