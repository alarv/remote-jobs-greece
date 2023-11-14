import { notFound } from 'next/navigation';
import React from 'react';
import { Job } from '../../components/JobListing';
import Link from 'next/link';

async function getJob(id: string): Promise<Job | undefined> {
  const apiURL = process.env.API_URL!;

  const res = await fetch(`${apiURL}/jobs/${id}`, { cache: 'no-store' });
  if (!res.ok) {
    return undefined;
  }

  return res.json();
}
export default async function Page({ params }: { params: { id: string } }) {
  const job = await getJob(params.id);
  if (!job) {
    notFound();
  }

  const markup = { __html: job.content.rendered };
  const languagesList = job.acf.languages.join(', ');

  return (
    <main className="mx-auto bg-indigo-600 ">
      <div className="mx-auto max-w-5xl px-2 sm:px-6 lg:px-8">
        <div className="grid grid-cols-6 py-10">
          {/* Title */}
          <div className="text-3xl text-white font-semibold col-span-4 py-3">
            {job.title.rendered}
          </div>
          {/* Apply */}
          <div className="col-end-7 col-span-1 flex md:flex md:flex-grow flex-row justify-end space-x-1 py-3">
            <Link
              href={job.acf.job_url}
              target="_blank"
              className="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-indigo-600 shadow-sm hover:bg-indigo-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              Apply
            </Link>
          </div>
          {/* employment type */}
          <div className="inline-flex max-w-5xl col-start-1 col-span-3 py-3">
            <svg
              className="w-6 h-6 text-white dark:text-white mr-4"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                stroke-linejoin="round"
                stroke-width="2"
                d="M10 6v4l3.276 3.276M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
            <p className="font-semibold text-white mr-4">
              {job.acf.employment_type}
            </p>

            <svg
              className="w-6 h-6 text-white dark:text-white mr-4"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-width="2"
                d="M1 10c1.5 1.5 5.25 3 9 3s7.5-1.5 9-3m-9-1h.01M2 19h16a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1ZM14 5V3a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v2h8Z"
              />
            </svg>

            <p className="font-semibold text-white mr-4">
              {job.acf.experience}
            </p>
          </div>
        </div>
      </div>
      <div className="py-5 bg-white">
        <div className="mx-auto max-w-5xl px-2 sm:px-6 lg:px-8">
          {/* right part of the page */}
          <div className="grid grid-cols-5 gap-20 ">
            <div className="col-span-3">
              <div className="mt-4" dangerouslySetInnerHTML={markup}></div>
            </div>
            <div className="col-span-2 border border-slate-200 border-t-0 border-l-1 border-r-1 border-b-0">
              <div className="mx-4	">
                <p className=" font-semibold mt-4">
                  Company name: {job.acf.company_name}
                </p>
                <p className="font-semibold mt-4">
                     {job.acf.salary_minimum_range > 0 && (
    <>
      Salary Range: {job.acf.salary_minimum_range}€
      {job.acf.salary_time_frame && `/${job.acf.salary_time_frame}`}
    </>
  )}
  </p>
                <p className="font-semibold">Languages: {languagesList}</p>
                <p className="font-semibold">Job field: {job.acf.job_field}</p>
                <ul className="flex items-start flex-wrap mt-4">
                  <li className="flex mx-1">
                    {job.acf.tags.map((tag) => (
                      <p
                        key={tag.name}
                        className="bg-indigo-100 text-indigo-700 rounded-full px-3 py-1 ml-1 text-sm text-indigo-500   "
                      >
                        {tag.name}
                      </p>
                    ))}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
