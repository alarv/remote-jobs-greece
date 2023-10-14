import JobListings from '@/app/components/JobListings';
import Footer from './components/Footer';
import React from 'react';
import Header from '@/app/components/Header';

export default function Home() {
  return (
    <>
      <main
        className={`flex min-h-screen flex-col items-center justify-between p-24 mx-auto max-w-7xl`}
      >
        <JobListings />
      </main>
    </>
  );
}
