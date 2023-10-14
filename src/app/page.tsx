import React from 'react';
import Link from 'next/link';

const features = [
  { name: 'Origin', description: 'Designed by Good Goods, Inc.' },
  {
    name: 'Material',
    description:
      'Solid walnut base with rare earth magnets and powder coated steel card cover',
  },
  { name: 'Dimensions', description: '6.25" x 3.55" x 1.15"' },
  { name: 'Finish', description: 'Hand sanded and finished with natural oil' },
  { name: 'Includes', description: 'Wood card tray and 3 refill packs' },
  {
    name: 'Considerations',
    description:
      'Made from natural materials. Grain and color vary with each item.',
  },
];

export default function LandingPage() {
  return (
    <div
      className="min-h-screen landing-page"
      style={{
        background:
          'radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(171,252,255,0.3604035364145658) 35%, rgba(255,181,212,0.13631390056022408) 64%, rgba(255,255,255,1) 100%)',
      }}
    >
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="text-center py-16">
          <h1 className="text-4xl font-bold mb-4">Empowering Greece,</h1>
          <h1 className="text-4xl font-bold mb-4">One Remote Job at a Time</h1>
          <p className="text-xl">
            Find the best remote jobs in Greece, tailored just for you.
          </p>
          <div className="text-center py-16">
            <Link
              href="/jobs"
              className="rounded-md bg-indigo-600 px-3.5 py-2.5 m-5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              Find jobs
            </Link>
            <Link
              href="/about"
              className="text-sm font-semibold leading-6 text-gray-900 hover:text-gray-700"
            >
              Learn more <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </div>
      <div className="mx-auto max-w-2xl items-center gap-x-8 gap-y-16 px-4 py-24 sm:px-6 sm:py-32 lg:max-w-7xl lg:px-8">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Technical Specifications
          </h2>
          <p className="mt-4 text-gray-500">
            The walnut wood card tray is precision milled to perfectly fit a
            stack of Focus cards. The powder coated steel divider separates
            active cards from new ones, or can be used to archive important task
            lists.
          </p>

          <dl className="mt-16">
            {features.map((feature) => (
              <div key={feature.name} className="border-t border-gray-200 pt-4">
                <dt className="font-medium text-gray-900">{feature.name}</dt>
                <dd className="mt-2 text-sm text-gray-500">
                  {feature.description}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}
