'use client';

import React, {
  ChangeEvent,
  FormEvent,
  RefObject,
  useRef,
  useState,
} from 'react';
import type { Metadata } from 'next';
import { ReCAPTCHA } from 'react-google-recaptcha';
import { For } from '@babel/types';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [successMsg, setSuccesssMsg] = useState(false);
  // Create a ref for the reCAPTCHA widget
  const recaptcha: RefObject<ReCAPTCHA> = useRef(null);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onCaptchaChange = (value: string | null) => {
    console.log('Captcha value:', value);

    // Set the captcha token when the user completes the reCAPTCHA
    // if (token) {
    //   formData.captchaToken = token;
    // }
  };

  const submitForm = async (e: FormEvent) => {
    e.preventDefault();

    const recaptchaValue = recaptcha.current?.getValue();
    if (!recaptchaValue) {
      alert("Please confirm you're not a robot.");
      return;
    }

    console.log('Form data:', formData);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          Accept: 'application/json, text/plain, */*',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      console.log('response received');
      if (response.status === 200) {
        console.log('response succeeded');
        setSuccesssMsg(true);
        setFormData({ name: '', email: '', message: '' });
        recaptcha?.current?.reset(); // reset recaptcha after submission
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <main className="mx-auto max-w-5xl px-2 py-5 sm:px-6 lg:px-8 py-5 pb-52">
      <h1 className="text-2xl font-semibold mb-4">Contact Us</h1>
      <p className="mb-4">
        We&apos;d love to hear from you! Whether you&apos;re looking for a job
        or an employer, feel free to get in touch.
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
          ></textarea>
        </div>

        <div className="pb-20px">
          <ReCAPTCHA
            size="normal"
            sitekey="YOUR_RECAPTCHA_SITE_KEY"
            onChange={onCaptchaChange}
            ref={recaptcha}
          />
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
