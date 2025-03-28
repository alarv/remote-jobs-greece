import { notFound } from 'next/navigation';
import React from 'react';
import { IJob } from '../../components/JobListing';
import Link from 'next/link';
import Image from 'next/image';
import { Metadata, ResolvingMetadata } from 'next';
import { isDevEnvironment } from '@/app/util/env.util';
import { formatNumber } from '@/app/util/number.util';

async function getJob(id: string): Promise<IJob | undefined> {
  const apiURL = process.env.API_URL!;

  const res = await fetch(`${apiURL}/wp-json/wp/v2/jobs/${id}`, {
    cache: isDevEnvironment() ? 'no-cache' : 'force-cache',
  });
  if (!res.ok) {
    return undefined;
  }

  return res.json();
}

type Props = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  // read route params
  const { id } = await params;

  // fetch data
  const job = await getJob(id);

  return {
    title: `${job?.title.rendered ?? 'Job'} | Remote jobs Greece`,
    openGraph: {
      title: `${job?.title.rendered} | Remote jobs Greece`,
      description: 'Take a look at this remote job position in Greece',
      images: ['https://i.imgur.com/Tamd8rD.png'],
    },
  };
}

export default async function Page({ params }: Props) {
  const { id } = await params;

  const job = await getJob(id);
  if (!job) {
    notFound();
  }

  const markupTitle = { __html: job.title.rendered };
  const markupContent = { __html: job.content.rendered };
  const languagesList = job.acf.languages.join(', ');

  return (
    <main className="job mx-auto">
      <div className="bg-indigo-600">
        <div className="mx-auto max-w-5xl px-2 sm:px-6 lg:px-8">
          <div className="grid grid-cols-6 py-4 pl-2 sm:pl-0">
            {/* Title */}
            <div
              className="text-3xl text-white font-semibold col-span-4 py-3"
              dangerouslySetInnerHTML={markupTitle}
            ></div>
            {/* Apply */}
            <div className="col-end-7 col-span-1 flex md:flex md:flex-grow flex-row justify-end space-x-1 py-3 items-center">
              <Link
                href={job.acf.job_url}
                target="_blank"
                className="w-30 h-10 inline-flex items-center rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-indigo-600 shadow-sm hover:bg-indigo-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                Apply{' '}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="ml-2 w-4 h-4 "
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25"
                  />
                </svg>
              </Link>
            </div>
            {/* employment type */}
            <div className="inline-flex max-w-5xl col-start-1 col-span-4 py-3">
              <svg
                className="w-6 h-6 text-white mr-4"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 6v4l3.276 3.276M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
              <p className="font-semibold text-white mr-4">
                {job.acf.employment_type}
              </p>

              <svg
                className="w-6 h-6 text-white mr-4"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeWidth="2"
                  d="M1 10c1.5 1.5 5.25 3 9 3s7.5-1.5 9-3m-9-1h.01M2 19h16a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1ZM14 5V3a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v2h8Z"
                />
              </svg>

              <p className="font-semibold text-white mr-4">
                {job.acf.experience}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="py-5">
        <div className="mx-auto max-w-5xl px-2 sm:px-6 lg:px-8">
          {/* right part of the page */}
          <div className="grid grid-cols-5 gap-5 ">
            <div className="col-span-3">
              <div
                className="pl-2 sm:pl-0 mt-4 job__description"
                dangerouslySetInnerHTML={markupContent}
              ></div>
            </div>
            <div className="col-span-2 border border-slate-200 border-t-0 border-l-1 border-r-1 border-b-0">
              <div className="mx-4">
                <div className="text-center">
                  {job.acf.company_logo && (
                    <Image
                      className="w-25 mr-2"
                      src={job.acf.company_logo}
                      alt=""
                      width={100}
                      height={100}
                    />
                  )}
                </div>
                <p className="font-semibold mt-4">
                  Company: {job.acf.company_name}
                </p>

                {job.acf.salary_minimum_range > 0 &&
                  job.acf.salary_maximum_range > 0 && (
                    <p className="font-semibold mt-4">
                      Salary Range: {formatNumber(job.acf.salary_minimum_range)}
                      -{formatNumber(job.acf.salary_maximum_range)}€
                    </p>
                  )}

                {job.acf.salary_minimum_range === null &&
                  job.acf.salary_maximum_range > 0 && (
                    <p className="font-semibold mt-4">
                      Salary Range: {formatNumber(job.acf.salary_maximum_range)}
                      €
                    </p>
                  )}

                {job.acf.salary_minimum_range > 0 &&
                  job.acf.salary_maximum_range === null && (
                    <p className="font-semibold mt-4">
                      Salary Range: {formatNumber(job.acf.salary_minimum_range)}
                      €
                    </p>
                  )}

                <p className="font-semibold">Languages: {languagesList}</p>
                <p className="font-semibold">Job field: {job.acf.job_field}</p>
                <ul className="flex items-start flex-wrap mt-4">
                  <li className="flex mx-1">
                    {job.acf.tags &&
                      job.acf.tags.map((tag) => (
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
