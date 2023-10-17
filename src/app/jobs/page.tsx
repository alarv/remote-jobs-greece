import JobListings from '@/app/components/JobListings';
import React from 'react';

export default function Jobs() {
  return (
    <>
      <main className="mx-auto max-w-7xl px-2 py-5 sm:px-6 lg:px-8">
        <JobListings />
      </main>
    </>
  );
}
