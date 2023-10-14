import React, { ReactNode } from 'react';

export default function MainContent({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto max-w-7xl px-2 py-5 sm:px-6 lg:px-8 ">
      {children}
    </div>
  );
}
