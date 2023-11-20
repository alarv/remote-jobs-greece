'use client';

import React, {
  ChangeEvent,
  FormEvent,
  RefObject,
  useRef,
  useState,
} from 'react';
import { ReCAPTCHA } from 'react-google-recaptcha';

const RECAPTCHA_KEY_ID = '6LeMyxIpAAAAAIgSBtBuI2_MGpbhJKGyw3dfMYTA';

interface CreateJobFields {
  company_name: string;
  company_logo: File | undefined;
}

interface CreateJobForm {
  title: string;
  content: string;
  fields: CreateJobFields;
  captchaToken: string | null;
}

function generateFormData(data: CreateJobForm) {
  const formData = new FormData();
  for (let dataKey in data) {
    if (dataKey === 'fields') {
      // append nested object
      for (let fieldKey in data[dataKey]) {
        formData.append(
          `fields[${fieldKey}]`,
          (data[dataKey] as any)[fieldKey],
        );
      }
    } else {
      formData.append(dataKey, (data as any)[dataKey]);
    }
  }

  return formData;
}

export default function CreateJob() {
  const EMPTY_FORM: CreateJobForm = {
    title: 'τιτλε',
    content: 'content',
    fields: {
      company_name: 'yes',
      company_logo: undefined,
    },
    captchaToken: null,
  };
  const [formData, setFormData] = useState({ ...EMPTY_FORM });
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Create a ref for the reCAPTCHA widget
  const recaptcha: RefObject<ReCAPTCHA> = useRef(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    setIsLoading(true);
    setIsError(false);

    try {
      const response = await fetch('/api/jobs', {
        method: 'POST',
        body: generateFormData(formData),
      });

      const data = await response.json();
      if (response.status === 200) {
        setIsSuccess(true);
        setTimeout(() => {
          setIsSuccess(false);
        }, 5000);
        setFormData(EMPTY_FORM);
        recaptcha?.current?.reset(); // reset recaptcha after submission
      } else {
        setIsError(true);
      }
    } catch (err) {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      return;
    }
    const file = e.target.files[0];
    const fileSize = file.size / 1024; // in kB

    if (fileSize > 500) {
      alert(
        'Please note: The uploaded company logo exceeds the maximum allowed file size of 500KB. To ensure a smooth upload process, kindly resize your image to meet the size requirements and try again.',
      );
      e.target.value = '';
      return;
    }

    setFormData({
      ...formData,
      fields: {
        ...formData.fields,
        company_logo: e.target!.files![0],
      },
    });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    if (e.target.name.includes('fields.')) {
      const [fieldName, nestedFieldName] = e.target.name.split('.');

      setFormData((prevFormData) => ({
        ...prevFormData,
        [fieldName]: {
          // @ts-ignore
          ...prevFormData[fieldName],
          [nestedFieldName]: e.target.value,
        },
      }));
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const onCaptchaChange = (value: string | null) => {
    // Set the captcha token when the user completes the reCAPTCHA
    if (value) {
      formData.captchaToken = value;
    }
  };

  return (
    <>
      {isError && (
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
            <span className="font-medium">Error!</span> An error occurred,
            please try again later!
          </div>
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-600"
          >
            Job Title
          </label>
          <input
            type="text"
            name="title"
            placeholder="Job Title"
            value={formData.title}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300"
            required
          />
        </div>

        {/* TODO replace this textarea with a rich text editor of your choice */}
        <div>
          <label
            htmlFor="content"
            className="block text-sm font-medium text-gray-600"
          >
            Job Content
          </label>
          <textarea
            placeholder="Job Content"
            name="content"
            value={formData.content}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300"
            required
          />
        </div>

        <div>
          <label
            htmlFor="fields.company_name"
            className="block text-sm font-medium text-gray-600"
          >
            Company Name
          </label>
          <input
            type="text"
            name="fields.company_name"
            placeholder="Company Name"
            value={formData.fields.company_name}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300"
            required
          />
        </div>

        <div>
          <label
            htmlFor="company_logo"
            className="block text-sm font-medium text-gray-600"
          >
            Company Logo
          </label>
          <input
            type="file"
            name="company_logo"
            onChange={handleFileChange}
            className="w-full p-2 border border-gray-300"
            required
          />
        </div>

        <div className="pb-20px">
          <ReCAPTCHA
            size="normal"
            sitekey={RECAPTCHA_KEY_ID}
            onChange={onCaptchaChange}
            ref={recaptcha}
          />
        </div>

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
    </>
  );
}
