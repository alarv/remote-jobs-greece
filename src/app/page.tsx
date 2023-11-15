import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Remote jobs Greece - Find and Post Remote Jobs in Greece',
  description:
    'Unlock a world of remote work opportunities in Greece with RemoteJobsGreece.gr. Browse listings for freelance, part-time, and full-time remote jobs, or post your own job openings to connect with top talent. Your next career move starts here.',
  openGraph: {
    images: ['/some-specific-page-image.jpg'],
  },
};

export default function LandingPage() {
  return (
    <div
      className="min-h-screen landing-page "
      style={{
        background:
          'radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(171,252,255,0.3604035364145658) 35%, rgba(255,181,212,0.13631390056022408) 64%, rgba(255,255,255,1) 100%)',
      }}
    >
      <div className="relative isolate px-6 pt-14 lg:px-8">
        <div className="mx-auto max-w-2xl py-16 sm:py-48 lg:py-36">
          <div className="hidden sm:mb-8 sm:flex sm:justify-center"></div>
          <div className="text-center">
            <h1 className="text-5xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Empowering Greece, One Remote Job at a time
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Find the best remote jobs in Greece, tailored just for you.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                href="/jobs"
                className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Get started
              </Link>
              <Link
                href="/about"
                className="text-sm font-semibold leading-6 text-gray-900"
              >
                Learn more <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
