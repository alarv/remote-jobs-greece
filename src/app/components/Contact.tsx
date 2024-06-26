'use client';

import React, { ChangeEvent, FormEvent, useState } from 'react';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import RecaptchaNotice from '@/app/components/RecaptchaNotice';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    captchaToken: '',
  });
  const [successMsg, setSuccesssMsg] = useState(false);
  const [errorMsg, setErrorMsg] = useState<undefined | string>(undefined);
  const [isLoading, setIsLoading] = useState(false);

  // Create a hook for the Google recaptcha
  const { executeRecaptcha } = useGoogleReCaptcha();

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const submitForm = async (e: FormEvent) => {
    e.preventDefault();

    if (!executeRecaptcha) {
      console.error('Execute recaptcha not yet available');
      return;
    }
    const captchaToken = await executeRecaptcha('contactForm');

    setIsLoading(true);
    setErrorMsg(undefined);
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          Accept: 'application/json, text/plain, */*',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...formData, captchaToken }),
      });

      if (response.status === 200) {
        setSuccesssMsg(true);
        setTimeout(() => {
          setSuccesssMsg(false);
        }, 5000);
        setFormData({ name: '', email: '', message: '', captchaToken: '' });
      } else {
        const body = await response.json();
        if (body.message === 'reCAPTCHA verification failed.') {
          setErrorMsg(body.message);
        } else {
          setErrorMsg('An error occurred, please try again later');
        }
      }
    } catch (e) {
      setErrorMsg('An error occurred, please try again later');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Contact Us</h1>
      {successMsg && (
        <div
          className="flex items-center p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400"
          role="alert"
        >
          <svg
            className="flex-shrink-0 inline w-4 h-4 me-3"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
          </svg>
          <span className="sr-only">Info</span>
          <div>
            <span className="font-medium">Success!</span> The form was submitted
            successfully! We&apos;ll reply as soon as possible!
          </div>
        </div>
      )}

      {errorMsg && (
        <div
          className="flex items-center p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
          role="alert"
        >
          <svg
            className="flex-shrink-0 inline w-4 h-4 me-3"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
          </svg>
          <span className="sr-only">Info</span>
          <div>
            <span className="font-medium">Error!</span> {errorMsg}
          </div>
        </div>
      )}

      <p className="mb-4">
        We&apos;d love to hear from you! Whether you&apos;re looking for a job
        or an employer, feel free to get in touch through the following form or
        send us an email at: info [at] remotejobsgreece [dot] gr
      </p>

      <form className="space-y-4" onSubmit={submitForm}>
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
            value={formData.name}
            onChange={handleChange}
            className="mt-1 p-2 w-full rounded-md border"
            required={true}
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
            value={formData.email}
            onChange={handleChange}
            className="mt-1 p-2 w-full rounded-md border"
            required={true}
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
            value={formData.message}
            onChange={handleChange}
            className="mt-1 p-2 w-full rounded-md border"
            required={true}
          ></textarea>
        </div>
        <RecaptchaNotice />

        <button
          disabled={isLoading}
          type="submit"
          className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded text-sm text-center mr-2 inline-flex items-center"
        >
          {isLoading && (
            <svg
              className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          )}
          Submit
        </button>
      </form>
    </div>
  );
}
