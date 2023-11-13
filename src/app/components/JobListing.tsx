import React from 'react';

export interface Tag {
  name: string;
}
export interface Job {
  id: number;
  title: {
    rendered: string;
  };
  content: {
    rendered: string;
  };
  acf: {
    company_name: string;
    employment_type: string[];
    job_type: string;
    salary_minimum_range: number;
    salary_maximum_range: number;
    job_field: string[];
    tags: Tag[];
    experience: string;
    languages: string[];
    working_conditions: {
      rendered: string;
    };
    job_url: string;
  };
}

interface JobProps {
  job: Job;
}

export default function JobListing({ job }: JobProps) {
  return (
    <a href={`/job/${job.id}`}>
      <div className="w-full px-3 py-2 bg-white rounded-b-lg border-hidden dark:bg-gray-800 group hover:bg-indigo-50 hover:shadow-lg hover:border-indigo-500 ">
        <div className="flex items-center justify-between mb-4">
          <p className=" font-semibold leading-none  text-indigo-700 group-hover:text-indigo-500">
            {job.title.rendered}
          </p>
          <p className="bg-indigo-100 group-hover:bg-indigo-600 text-indigo-700 rounded-full px-3 py-1 text-sm text-indigo-500 group-hover:text-indigo-100  ">
            {job.acf.employment_type}
          </p>

        </div>
        <div className="flow-root">
          <ul
            role="list"
            className="divide-y divide-gray-200 dark:divide-gray-700"
          >
            <li className="">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                </div>
                <div className="flex-1 min-w-0">
                  <div className='flex items-center	'>
                  <svg className="w-3.5 h-3.5 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
    <path d="M14 2a3.963 3.963 0 0 0-1.4.267 6.439 6.439 0 0 1-1.331 6.638A4 4 0 1 0 14 2Zm1 9h-1.264A6.957 6.957 0 0 1 15 15v2a2.97 2.97 0 0 1-.184 1H19a1 1 0 0 0 1-1v-1a5.006 5.006 0 0 0-5-5ZM6.5 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM8 10H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Z"/>
  </svg>
                  <p className="text-sm text-gray-900 truncate dark:text-white px-1">
                    {job.acf.job_type}{' '}
                  </p>
                  </div>
                  <p className="text-sm text-gray-500 truncate dark:text-gray-400 py-1">
                    {job.acf.company_name}{' '}
                  </p>
                </div>

                <div className="flex items-center text-base font-semibold text-gray-900 dark:text-white">
                  <p> {job.acf.salary_minimum_range}€</p>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </a>
  );
}
