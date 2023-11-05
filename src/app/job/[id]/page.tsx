import { notFound } from 'next/navigation';
import React from 'react';
import { Job } from '../../components/JobListing';

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

  return (
    <main className="mx-auto max-w-7xl px-2 py-5 sm:px-6 lg:px-8 ">
      <div className=" mx-auto py-5 rounded-lg">
        <div className="grid grid-cols-5 gap-20 divide-x divide-slate-200 ">
          <div className="col-span-3">
            <h1 className="text-3xl font-semibold">{job.title.rendered}</h1>
            <div className="mt-4" dangerouslySetInnerHTML={markup}></div>
          </div>
          <div className="col-span-2 container ">
            <div className="mx-4	">
              <p className=" font-semibold mt-4">
                Company name: {job.acf.company_name}
              </p>
              <p className="font-semibold mt-4">
                Salary Range: {job.acf.salary_minimum_range}-
                {job.acf.salary_maximum_range}$
              </p>
              <p className="font-semibold">
                Employment type: {job.acf.employment_type}
              </p>
              <p className="font-semibold">Job field: {job.acf.job_field}</p>
              <ul className="flex items-start flex-wrap mt-4">
                <li className="flex mx-1">
                  {job.acf.tags.map((tag) => (
                    <a
                      key={tag.name}
                      className="p-2 px-3 border-purple-800 mb-4 rounded font-medium hover:bg-transparent hover:border-purple-800 border bg-purple-100 text-purple-700 rounded-full text-indigo-500"
                      href="category/all"
                    >
                      {tag.name}
                    </a>
                  ))}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
