import React from 'react';
import LoadingSkeleton from '@/app/components/LoadingSkeleton';

export default function Loading() {
  return (
    <main className="mx-auto max-w-5xl py-5 px-2 sm:px-6 lg:px-8">
      <LoadingSkeleton />
    </main>
  );
}
