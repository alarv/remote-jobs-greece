import React from 'react';

export default function About() {
  return (
    <>
      <main>
        <h1 className="text-4xl font-bold mb-4">About Remote-jobs-greece.gr</h1>

        <h2 className="text-2xl font-semibold mb-2">Who We Are</h2>
        <p className="mb-4">
          Remote-Jobs-Greece.gr is the ultimate platform dedicated to helping
          people residing in Greece to find their dream remote job. In an age
          where work is becoming increasingly location-independent, we believe
          that you should be able to pursue a fulfilling career without
          compromising on work-life balance.
        </p>

        <h2 className="text-2xl font-semibold mb-2">Our Mission</h2>
        <p className="mb-4">
          Our mission is simple: to connect skilled job seekers with the best
          remote job opportunities in Greece. We aim to become the go-to
          destination for people looking for remote jobs and for companies in
          Greece looking to hire top talent, regardless of where they&apos;re
          located.
        </p>

        <h2 className="text-2xl font-semibold mb-2">What We Offer</h2>

        <h3 className="text-xl font-medium mb-2">For Job Seekers:</h3>
        <ul className="list-disc list-inside mb-4">
          <li>
            A curated list of verified remote job openings across various
            industries.
          </li>
          <li>A user-friendly platform to easily search and apply for jobs.</li>
          <li>
            Resources to help you excel in your remote job search, including
            tips, articles, and webinars.
          </li>
        </ul>

        <h3 className="text-xl font-medium mb-2">For Employers:</h3>
        <ul className="list-disc list-inside mb-4">
          <li>A quick and efficient way to post job listings.</li>
          <li>
            A large pool of qualified candidates interested in remote work.
          </li>
          <li>Affordable packages for posting multiple job listings.</li>
        </ul>

        <h2 className="text-2xl font-semibold mb-2">Why Choose Us?</h2>
        <ul className="list-disc list-inside mb-4">
          <li>
            <strong>Quality over Quantity</strong>: We focus on listing
            high-quality jobs that offer genuine value to our users.
          </li>
          <li>
            <strong>Ease of Use</strong>: Our platform is intuitive and
            straightforward, making your job search or hiring process as simple
            as possible.
          </li>
          <li>
            <strong>Community</strong>: We believe that remote work is more than
            just a job; it&apos;s a lifestyle. Join our community to network,
            share insights, and grow together.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mb-2">Get in Touch</h2>
        <p className="mb-4">
          Have questions? We&apos;d love to hear from you. Contact us at{' '}
          <a href="mailto:contact@remote-jobs-greece.gr" className="underline">
            contact@remote-jobs-greece.gr
          </a>
          .
        </p>
      </main>
    </>
  );
}
