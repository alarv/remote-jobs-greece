import React from 'react';
import { Metadata } from 'next';
import CreateJob from '@/app/components/CreateJob';

export const metadata: Metadata = {
  title: 'Create a Job | Remote Jobs Greece',
  description:
    'Create a job and advertise your vacancy at RemoteJobsGreece.gr. Find our contact information and reach out for any inquiries or collaborations.',
  openGraph: {
    images: ['https://i.imgur.com/Tamd8rD.png'],
  },
};

export default function CreateJobPage() {
  return (
    <main className="mx-auto max-w-5xl px-2 py-5 sm:px-6 lg:px-8 py-5 pb-52">
      <CreateJob />
    </main>
  );
}
