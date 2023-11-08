import Footer from '../components/Footer';
import React from 'react';
import Header from '@/app/components/Header';

export default function ContactPage() {
  return (
    <main className="mx-auto max-w-7xl px-2 py-5 sm:px-6 lg:px-8 pb-52 ">
      <h1 className="text-2xl font-semibold mb-4">Contact Us</h1>
      <p className="mb-4">
        We&apos;d love to hear from you! Whether you&apos;re looking for a job
        or an employer, feel free to get in touch.
      </p>

      <form className="space-y-4">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-600"
          >
            Your Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="mt-1 p-2 w-full rounded-md border"
          />
        </div>

        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-600"
          >
            Your Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="mt-1 p-2 w-full rounded-md border"
          />
        </div>

        <div>
          <label
            htmlFor="message"
            className="block text-sm font-medium text-gray-600"
          >
            Your Message
          </label>
          <textarea
            id="message"
            name="message"
            className="mt-1 p-2 w-full rounded-md border"
          ></textarea>
        </div>

        <button
          type="submit"
          className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded"
        >
          Submit
        </button>
      </form>
    </main>
  );
}
