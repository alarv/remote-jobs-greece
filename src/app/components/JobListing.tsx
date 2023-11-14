import React from 'react';

export interface Tag {
  name: string;
}
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
    company_logo: string;
    employment_type: string[];
    job_type: string;
    salary_minimum_range: number;
    salary_maximum_range: number;
    salary_time_frame: string;
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
  job: IJob;
}

export default function JobListing({ job }: JobProps) {
  return (
    <a href={`/job/${job.id}`}>
      <div className="w-full grid grid-cols-3 gap-0 mb-1 px-4 py-4 sm:px-6 bg-white rounded-b-lg border-hidden group hover:bg-indigo-50 hover:shadow-lg hover:border-indigo-500">
        {job.acf.company_logo && (
          <img className="w-14 col-end-1  " src={job.acf.company_logo} alt="" />
        )}

        <div className="col-start-1 col-span-3">
          <p className="col-start-1 col-span-3 font-semibold leading-none text-indigo-700 group-hover:text-indigo-500">
            {job.title.rendered}
          </p>
          <p className="text-sm text-gray-500 truncate py-1">
            {job.acf.company_name}{' '}
          </p>
          <div className="items-center flex">
            <svg
              className="w-3.5 h-3.5 text-gray-800"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 18"
            >
              <path d="M14 2a3.963 3.963 0 0 0-1.4.267 6.439 6.439 0 0 1-1.331 6.638A4 4 0 1 0 14 2Zm1 9h-1.264A6.957 6.957 0 0 1 15 15v2a2.97 2.97 0 0 1-.184 1H19a1 1 0 0 0 1-1v-1a5.006 5.006 0 0 0-5-5ZM6.5 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM8 10H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Z" />
            </svg>
            <p className="text-sm text-gray-900 truncate">
              {job.acf.job_field}{' '}
            </p>
          </div>
        </div>
        <div className="col-start-4 text-center	flex flex-col">
          <p className="bg-indigo-100 group-hover:bg-indigo-600 text-indigo-700 rounded-full px-3 py-1 m-2 text-sm text-indigo-500 group-hover:text-indigo-100">
            {job.acf.employment_type}
          </p>
          <p className="text-sm text-gray-900 truncate px-1">
            {job.acf.salary_minimum_range !== null && (
              <>
                {job.acf.salary_minimum_range}€
                {job.acf.salary_time_frame && `/${job.acf.salary_time_frame}`}
              </>
            )}
          </p>
        </div>
      </div>
    </a>
  );
}
