import JobListings from '@/app/components/JobListings';
import React from 'react';

export default function Jobs() {
  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-between p-24 mx-auto max-w-7xl">
        <JobListings />
      </main>
    </>
  );
}
