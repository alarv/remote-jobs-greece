import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy | Remote Jobs Greece',
  description:
    'Learn more about RemoteJobsGreece.gr and our mission to connect job seekers and employers in Greece.',
  openGraph: {
    images: ['https://i.imgur.com/Tamd8rD.png'],
  },
};

export default function PrivacyPolicy() {
  return (
    <>
      <main className="mx-auto max-w-5xl py-5 p-4 sm:px-6 lg:px-8 ">
        <h1 className="text-4xl font-semibold mb-4">Privacy Policy</h1>

        <p className="mb-4">
          Welcome to Remote Jobs Greece, accessible from
          https://www.remotejobsgreece.gr. Our key priority is the privacy of
          our visitors. This Privacy Policy document outlines the types of
          information that is not collected and recorded by Remote Jobs Greece
          and clarifies our practices regarding any personal information you may
          choose to provide.
        </p>

        <p className="mb-4">
          If you have additional questions or require more information about our
          Privacy Policy, please do not hesitate to contact us.
        </p>

        <h2 className="text-2xl font-semibold mb-4">
          No Collection of Personal Data
        </h2>

        <p className="mb-4">
          Remote Jobs Greece is committed to protecting the privacy of our
          visitors. As part of this commitment:
        </p>

        <p className="mb-4">
          We Do Not Store Personal Data: We do not collect or store any personal
          data about you when you visit our website. This includes not storing
          names, email addresses, or any information submitted via forms. No
          User Accounts: Our website does not offer user account registration,
          and therefore, we do not collect or store any account-related
          information. Contact Information: If you contact us directly, we will
          use your contact information only to respond to your query. This
          information is not stored for any other purpose and is not shared with
          any third parties. Information Use
        </p>

        <p className="mb-4">
          As we do not collect personal information, we do not use any such data
          for purposes such as marketing, communication, analytics, or service
          improvement.
        </p>

        <h2 className="text-2xl font-semibold mb-4">Third-Party Links</h2>

        <p className="mb-4">
          Our website may contain links to external sites that are not operated
          by us. Please be aware that we have no control over the content and
          practices of these sites and cannot accept responsibility or liability
          for their respective privacy policies.
        </p>

        <h2 className="text-2xl font-semibold mb-4">Your Consent</h2>

        <p className="mb-4">
          By using our website, you hereby consent to our Privacy Policy and
          agree to its terms.
        </p>

        <h2 className="text-2xl font-semibold mb-4">
          Changes to Our Privacy Policy
        </h2>

        <p className="mb-4">
          We reserve the right to make changes to this privacy policy at any
          time. We will notify you of any changes by posting the new privacy
          policy on this page.
        </p>
        <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
        <p className="mb-4">
          If you have any questions about our privacy practices or this policy,
          please contact us at info [at] remotejobsgreece [dot] gr.
        </p>
      </main>
    </>
  );
}
