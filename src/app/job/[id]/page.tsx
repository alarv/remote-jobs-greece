import { IJob } from '@/app/components/JobListing';
import { notFound } from 'next/navigation';

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
    <main className="mx-auto max-w-7xl px-2 py-5 sm:px-6 lg:px-8">
      <h1>{job.title.rendered}</h1>

      <p dangerouslySetInnerHTML={markup}></p>
    </main>
  );
}
