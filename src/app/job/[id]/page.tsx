import { notFound } from 'next/navigation';
import React from 'react';
import { IJob } from '../../components/JobListing';

async function getJob(id: string): Promise<IJob | undefined> {
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

  return (
    <main className="mx-auto max-w-7xl px-2 py-5 sm:px-6 lg:px-8 bg-gray-100">
      <div className="w-4/5 mx-auto p-8 my-8 bg-white shadow-md rounded-lg">
      <h1 className="text-3xl font-semibold">{job.title.rendered}</h1>
      <p className="text-gray-500">{job.acf.company_name}</p>
        <p className="font-semibold mt-4">{job.acf.salary_minimum_range}-{job.acf.salary_maximum_range}$</p>
        <p className="font-semibold">{job.acf.employment_type}</p>
        <p className="font-semibold">{job.acf.job_type}</p>
        <p className="font-semibold">{job.acf.job_field}</p>
        <ul className="flex items-start flex-wrap mt-4">
        <li className="flex mx-1">
            <a className="p-2 px-3 border-purple-800 mb-4 rounded font-medium hover:bg-transparent hover:border-purple-800 border bg-purple-400/25 dark:bg-purple text-purple-800"
                href="category/all">
                {job.acf.job_tag}
            </a>
            </li>
            </ul>
        <p className='mt-4' dangerouslySetInnerHTML={markup}></p>

      </div>
    </main>
  );
}
