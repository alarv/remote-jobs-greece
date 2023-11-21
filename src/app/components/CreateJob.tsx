'use client';

import React, {
  ChangeEvent,
  FormEvent,
  RefObject,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { ReCAPTCHA } from 'react-google-recaptcha';
import 'react-quill/dist/quill.snow.css';
import dynamic from 'next/dynamic';
import {
  employmentTypeCatalog,
  experienceCatalog,
  jobFieldCatalog,
  remoteWorkTypeCatalog,
} from '@/app/model/api.model';
import { serialize } from 'object-to-formdata';

const RECAPTCHA_KEY_ID = '6LeMyxIpAAAAAIgSBtBuI2_MGpbhJKGyw3dfMYTA';
interface CreateJobFields {
  company_name: string;
  company_email: string;
  company_logo: File | undefined;
  employment_type: string[];
  job_field: string;
  experience: string[];
  remote_work_types: string[];
  // languages: string[];
  // working_conditions: {
  //   rendered: string;
  // };
  job_url: string;
  salary_minimum_range?: number;
  salary_maximum_range?: number;
  salary_time_frame?: string;
}

const quillModules = {
  toolbar: [
    [{ header: [1, 2, false] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [
      { list: 'ordered' },
      { list: 'bullet' },
      { indent: '-1' },
      { indent: '+1' },
    ],
    ['link'],
    ['clean'],
  ],
};

interface CreateJobForm {
  title: string;
  content: string;
  fields: CreateJobFields;
  captchaToken: string | null;
}

export default function CreateJob() {
  // initialize ReactQuill dynamically otherwise it causes an import issue
  const ReactQuill = useMemo(
    () => dynamic(() => import('react-quill'), { ssr: false }),
    [],
  );

  const EMPTY_FORM: CreateJobForm = {
    title: '',
    content: '',
    fields: {
      company_name: '',
      company_email: '',
      company_logo: undefined,
      employment_type: [],
      job_field: '',
      experience: [],
      remote_work_types: [],
      job_url: '',
    },
    captchaToken: null,
  };

  const [formData, setFormData] = useState({ ...EMPTY_FORM });
  const [employmentTypes, setEmploymentTypes] = useState<string[]>([]);
  const [remoteWorkTypes, setRemoteWorkTypes] = useState<string[]>([]);
  const [experiences, setExperiences] = useState<string[]>([]);
  const [jobField, setJobField] = useState<string>('');

  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isEmploymentTypeValid, setIsEmploymentTypeValid] = useState(true);
  const [isRemoteWorkTypeValid, setIsRemoteWorkTypeValid] = useState(true);
  const [isExperienceValid, setIsExperienceValid] = useState(true);

  // Create a ref for the reCAPTCHA widget
  const recaptcha: RefObject<ReCAPTCHA> = useRef(null);

  // Create a ref for the file input
  const companyLogoFileRef = useRef<HTMLInputElement>(null);

  function validateEmploymentType() {
    const isValid = formData.fields.employment_type.length > 0;
    setIsEmploymentTypeValid(isValid);
    return isValid;
  }

  function validateRemoteWorkType() {
    const isValid = formData.fields.remote_work_types.length > 0;
    setIsRemoteWorkTypeValid(isValid);
    return isValid;
  }

  function validateExperience() {
    const isValid = formData.fields.experience.length > 0;
    setIsExperienceValid(isValid);
    return isValid;
  }

  function clearForm() {
    setFormData({ ...EMPTY_FORM });
    setEmploymentTypes([]);
    setExperiences([]);
    setJobField('');
    recaptcha?.current?.reset(); // reset recaptcha after submission
    companyLogoFileRef.current!.value = '';
  }

  // create ref for quill rich text editor
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    setIsLoading(true);
    setIsError(false);

    const isEmploymentTypeValid = validateEmploymentType();
    const isExperienceValid = validateExperience();
    const isRemoteWorkTypeValid = validateRemoteWorkType();

    const isFormValid =
      isExperienceValid && isEmploymentTypeValid && isRemoteWorkTypeValid;

    if (!isFormValid) {
      setIsLoading(false);
      return;
    }

    formData.fields['employment_type'] = employmentTypes;
    formData.fields['experience'] = experiences;
    formData.fields['remote_work_types'] = remoteWorkTypes;
    formData.fields['job_field'] = jobField;

    const body = serialize(formData);

    try {
      const response = await fetch('/api/jobs', {
        method: 'POST',
        body,
      });

      if (response.status === 200) {
        setIsSuccess(true);
        setTimeout(() => {
          setIsSuccess(false);
        }, 5000);
        clearForm();
      } else {
        setIsError(true);
      }
    } catch (err) {
      console.error(err);
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
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
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
      setFormData((prevFormData) => ({
        ...prevFormData,
        [e.target.name]: e.target.value,
      }));
    }
  };

  const handleContentChange = (value: string) => {
    setFormData((prevFormData) => ({ ...prevFormData, content: value }));
  };

  const handleRemoteWorkTypeChange = (e: ChangeEvent<HTMLInputElement>) => {
    const item = e.target.value;
    const isChecked = e.target.checked;

    if (isChecked) {
      setRemoteWorkTypes([...remoteWorkTypes, item]);
    } else {
      setRemoteWorkTypes(remoteWorkTypes.filter((el) => el !== item));
    }
  };
  const handleExperienceChange = (e: ChangeEvent<HTMLInputElement>) => {
    const item = e.target.value;
    const isChecked = e.target.checked;

    if (isChecked) {
      setExperiences([...experiences, item]);
    } else {
      setExperiences(experiences.filter((el) => el !== item));
    }
  };

  const handleEmploymentTypeChange = (e: ChangeEvent<HTMLInputElement>) => {
    const item = e.target.value;
    const isChecked = e.target.checked;

    if (isChecked) {
      setEmploymentTypes([...employmentTypes, item]);
    } else {
      setEmploymentTypes(employmentTypes.filter((el) => el !== item));
    }
  };

  const handleJobFieldChange = (e: ChangeEvent<HTMLInputElement>) => {
    const item = e.target.value;
    const isChecked = e.target.checked;

    if (isChecked) {
      setJobField(item);
    } else {
      setJobField('');
    }
  };

  const onCaptchaChange = (value: string | null) => {
    // Set the captcha token when the user completes the reCAPTCHA
    if (value) {
      formData.captchaToken = value;
    }
  };

  useEffect(() => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      fields: {
        ...prevFormData.fields,
        employment_type: employmentTypes,
      },
    }));
  }, [employmentTypes]);

  useEffect(() => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      fields: {
        ...prevFormData.fields,
        remote_work_types: remoteWorkTypes,
      },
    }));
  }, [remoteWorkTypes]);

  useEffect(() => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      fields: {
        ...prevFormData.fields,
        experience: experiences,
      },
    }));
  }, [experiences]);

  useEffect(() => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      fields: {
        ...prevFormData.fields,
        job_field: jobField,
      },
    }));
  }, [jobField]);

  return (
    <>
      <h2 className="text-2xl font-semibold mb-4">Post Your Job Listing</h2>

      <p className="mb-4 text-sm">
        Fill out the form to post your job. After submission, our team will
        review it, typically within 24 hours. Once approved, your job will be
        live on our site, accessible to qualified candidates across Greece.
      </p>
      {isSuccess && (
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
            successfully! The job will be published once it passes the review of
            one of our admins!
          </div>
        </div>
      )}

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

      <form onSubmit={handleSubmit} className="w-full space-y-4">
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
            className="w-full rounded-md p-2 border border-gray-300"
            required
          />
        </div>

        <div className="w-full rounded-md h-30">
          <label
            htmlFor="content"
            className="block text-sm font-medium text-gray-600"
          >
            Job Content
          </label>
          <ReactQuill
            theme="snow"
            value={formData.content}
            onChange={handleContentChange}
            modules={quillModules}
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
            className="w-full rounded-md p-2 border border-gray-300"
            required
          />
        </div>

        <div>
          <label
            htmlFor="fields.company_email"
            className="block text-sm font-medium text-gray-600"
          >
            Company Email
          </label>
          <input
            type="email"
            name="fields.company_email"
            placeholder="Company Email"
            value={formData.fields.company_email}
            onChange={handleChange}
            className="w-full rounded-md p-2 border border-gray-300"
            required
          />
        </div>

        <div>
          <label
            htmlFor="fields.job_url"
            className="block text-sm font-medium text-gray-600"
          >
            Job Url
          </label>
          <input
            type="url"
            name="fields.job_url"
            placeholder="Job Url"
            value={formData.fields.job_url}
            onChange={handleChange}
            className="w-full rounded-md p-2 border border-gray-300"
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
            accept="image/png, image/jpeg"
            name="company_logo"
            ref={companyLogoFileRef}
            onChange={handleFileChange}
            className="block w-full rounded-md p-2 block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer focus:outline-none"
            required
          />
          <p
            className="mt-1 text-sm text-gray-500 dark:text-gray-300"
            id="file_input_help"
          >
            Square image PNG or JPG (MAX. 500x500px).
          </p>
        </div>

        <div>
          <span className="block text-gray-600">Remote Work Type</span>
          <div className="flex items-center gap-4 mt-2 flex-wrap">
            {remoteWorkTypeCatalog.options.map((field) => (
              <label key={field.value} className="flex items-center">
                <input
                  type="checkbox"
                  name="remote_work_type"
                  value={field.value}
                  checked={formData.fields.remote_work_types.includes(
                    field.value,
                  )}
                  onChange={handleRemoteWorkTypeChange}
                  className="rounded border-gray-300 text-indigo-600 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
                <span className="ml-2 text-sm text-gray-600">
                  {field.label}
                </span>
              </label>
            ))}
          </div>

          {!isRemoteWorkTypeValid && (
            <p className="mt-1 text-sm text-red-500">
              Please select at least one remote work type.
            </p>
          )}
        </div>

        <div>
          <span className="block text-gray-600">Employment Type</span>
          <div className="flex items-center gap-4 mt-2 flex-wrap">
            {employmentTypeCatalog.options.map((field) => (
              <label key={field.value} className="flex items-center">
                <input
                  type="checkbox"
                  name="employment_type"
                  value={field.value}
                  checked={formData.fields.employment_type.includes(
                    field.value,
                  )}
                  onChange={handleEmploymentTypeChange}
                  className="rounded border-gray-300 text-indigo-600 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
                <span className="ml-2 text-sm text-gray-600">
                  {field.label}
                </span>
              </label>
            ))}
          </div>
          {!isEmploymentTypeValid && (
            <p className="mt-1 text-sm text-red-500">
              Please select at least one employment type.
            </p>
          )}
        </div>

        <div>
          <span className="block text-gray-600">Experience</span>
          <div className="flex items-center gap-4 mt-2 flex-wrap">
            {experienceCatalog.options.map((field) => (
              <label key={field.value} className="flex items-center">
                <input
                  type="checkbox"
                  name="experience"
                  value={field.value}
                  checked={formData.fields.experience.includes(field.value)}
                  onChange={handleExperienceChange}
                  className="rounded border-gray-300 text-indigo-600 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
                <span className="ml-2 text-sm text-gray-600">
                  {field.label}
                </span>
              </label>
            ))}
          </div>
          {!isExperienceValid && (
            <p className="mt-1 text-sm text-red-500">
              Please select at least one experience type.
            </p>
          )}
        </div>

        <div>
          <span className="block text-gray-600">Job field</span>
          <div className="flex flex-col mt-2 flex-wrap">
            {jobFieldCatalog.options.map((field) => (
              <label key={field.value} className="flex items-center">
                <input
                  type="radio"
                  name="job_field"
                  value={field.value}
                  checked={formData.fields.job_field === field.value}
                  onChange={handleJobFieldChange}
                  className="rounded border-gray-300 text-indigo-600 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  required
                />
                <span className="ml-2 text-sm text-gray-600">
                  {field.label}
                </span>
              </label>
            ))}
          </div>
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

      {isSuccess && (
        <div
          className="flex items-center p-4 mt-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400"
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
            successfully! The job will be published once it passes the review of
            one of our admins!
          </div>
        </div>
      )}

      {isError && (
        <div
          className="flex items-center p-4 mt-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
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
    </>
  );
}
