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
      <div className="w-full p-4 bg-white rounded-b-lg border-hidden sm:p-8 dark:bg-gray-800 group hover:bg-indigo-50 hover:shadow-lg hover:border-indigo-500 ">
        <div className="flex items-center justify-between mb-4">
          <h5 className="text-xl leading-none dark:text-white text-gray-700 group-hover:text-indigo-600">
            {job.title.rendered}
          </h5>
          <p className="bg-indigo-100 group-hover:bg-indigo-600 text-indigo-700 rounded-full px-3 py-1 text-sm text-indigo-500 group-hover:text-indigo-100  ">
            {job.acf.employment_type}
          </p>

          {/*<a*/}
          {/*  href="#"*/}
          {/*  className="text-sm font-medium text-indigo-600 hover:underline dark:text-indigo-500"*/}
          {/*>*/}
          {/*  View all*/}
          {/*</a>*/}
        </div>
        <div className="flow-root">
          <ul
            role="list"
            className="divide-y divide-gray-200 dark:divide-gray-700"
          >
            <li className="py-3 sm:py-4">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  {/*<img className="w-8 h-8 rounded-full" src="/docs/images/people/profile-picture-1.jpg"*/}
                  {/*     alt="Neil image"> */}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                    {job.acf.job_type}{' '}
                  </p>
                  <p className="text-sm text-gray-500 truncate dark:text-gray-400">
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
