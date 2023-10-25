import React from "react";

export interface IJob {
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
    salary_minimum_range: number;
    salary_maximum_range: number;
    job_type: string;
    job_field: string[];
    job_tag: string[];
  };
}

interface JobProps {
  job: IJob;
}

export default function Job({ job }: JobProps) {
  return (
    <div className="w-full p-4 bg-white sm:p-8 dark:bg-gray-800 dark:border-gray-700">
      <div className="flex items-center justify-between mb-4">
        <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">
Jobs        </h5>
        <a
          href="#"
          className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500"
        >
          View all
        </a>
      </div>
      <div className="flow-root">
        <ul
          role="list"
          className="divide-y divide-gray-200 dark:divide-gray-700"
        >
          <li className="py-3 sm:py-4">
            <div className="flex items-center space-x-4">
              <div className="flex-shrink-0">
                {/*<img className="w-8 h-8 rounded-full" src="/docs/images/people/profile-picture-1.jpg"*/}
                {/*     alt="Neil image"> */}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                {job.acf.company_name}
                </p>
                <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                {job.acf.company_name}                </p>
              </div>
              <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
              <p>  {job.acf.salary_minimum_range}</p>
              </div>
              </div>
              </li>
        </ul>
      </div>
    </div>
  );
}
function newFunction(job: IJob) {
  return job.title;
}

