import { NextRequest, NextResponse } from 'next/server';
import { IJob } from '@/app/components/JobListing';
import { isDevEnvironment } from '@/app/util/env.util';
import { retrievePagesFromHeaders } from '@/app/util/res.util';
import { prefixFilterKeysWithFilters } from '@/app/util/jobs.util';
import {
  checkRateLimit,
  generateRateLimitHeaders,
  rateLimit,
  retrieveIp,
} from '@/app/util/rate-limit.util';
import { hasInvalidGoogleRecaptcha } from '@/app/util/recaptcha.util';
import { FormData } from 'next/dist/compiled/@edge-runtime/primitives';

 const DUMMY_JOBS_RESPONSE: JobsResponse = {
  total: 3,
  totalPages: 1,
  data: [
    {
      id: 1,
      title: { rendered: "Frontend Developer (React, TypeScript)" },
      content: {
        rendered: "We are looking for a skilled Frontend Developer to join our remote team. You'll work with modern technologies and contribute to exciting projects.",
      },
      acf: {
        company_name: "TechSolutions",
        company_logo: "/logo-placeholder-image.png",
        employment_type: ["Full-time"],
        salary_minimum_range: 2500,
        salary_maximum_range: 3500,
        salary_time_frame: "Monthly",
        job_field: ["Software Development"],
        tags: [{ name: "React" }, { name: "TypeScript" }, { name: "Remote" }],
        experience: "2+ years",
        languages: ["English", "Greek"],
        working_conditions: {
          rendered: "100% remote, flexible working hours, equipment budget.",
        },
        job_url: "https://remotejobsgreece.com/jobs/frontend-developer",
      },
    },
    {
      id: 2,
      title: { rendered: "Digital Marketing Specialist" },
      content: {
        rendered: "Join our team as a Digital Marketing Specialist and help us grow our online presence. You'll work on campaigns, SEO, and content strategy.",
      },
      acf: {
        company_name: "MarketingGenius",
        company_logo: "/logo-placeholder-image.png",
        employment_type: ["Part-time", "Freelance"],
        salary_minimum_range: 1500,
        salary_maximum_range: 2500,
        salary_time_frame: "Monthly",
        job_field: ["Marketing"],
        tags: [{ name: "SEO" }, { name: "Google Ads" }, { name: "Social Media" }],
        experience: "3+ years",
        languages: ["English"],
        working_conditions: {
          rendered: "Fully remote, flexible deadlines, project-based work.",
        },
        job_url: "https://remotejobsgreece.com/jobs/digital-marketing-specialist",
      },
    },
    {
      id: 3,
      title: { rendered: "Customer Support Representative (Greek & English)" },
      content: {
        rendered: "Looking for a friendly and professional customer support representative to assist our Greek-speaking and English-speaking customers.",
      },
      acf: {
        company_name: "SupportHub",
        company_logo: "/logo-placeholder-image.png",
        employment_type: ["Full-time", "Remote"],
        salary_minimum_range: 1800,
        salary_maximum_range: 2200,
        salary_time_frame: "Monthly",
        job_field: ["Customer Support"],
        tags: [{ name: "Support" }, { name: "Remote" }, { name: "Multilingual" }],
        experience: "1+ years",
        languages: ["Greek", "English"],
        working_conditions: {
          rendered: "Work remotely with a supportive team, training provided.",
        },
        job_url: "https://remotejobsgreece.com/jobs/customer-support-representative",
      },
    },
  ],
};


export interface JobsResponse {
  total: number;
  totalPages: number;
  data: IJob[];
}

const REQUEST_RATE_LIMIT = 10;
const REQUEST_TIME_WINDOW_IN_MS = 60 * 5000; // 5 minutes
const CACHE_KEY_PREFIX = 'jobs';

const limiter = rateLimit({
  interval: REQUEST_TIME_WINDOW_IN_MS, // // 5 minutes
  uniqueTokenPerInterval: 500, // Max 500 users per second
});

export async function GET(request: NextRequest) {
  return Response.json(DUMMY_JOBS_RESPONSE)
  // const apiURL = process.env.API_URL!;
  //
  // const prefixedFilters = prefixFilterKeysWithFilters(
  //   Object.fromEntries(request.nextUrl.searchParams),
  // );
  //
  // const queryString = new URLSearchParams({ ...prefixedFilters });
  //
  // try {
  //   const url = `${apiURL}/wp-json/wp/v2/jobs?${queryString}`;
  //   const res = await fetch(url, {
  //     cache: isDevEnvironment() ? 'no-cache' : 'force-cache',
  //   });
  //   if (!res.ok) {
  //     return Response.error();
  //   }
  //
  //   const { total, totalPages } = retrievePagesFromHeaders(res);
  //   const data = await res.json();
  //
  //   const response: JobsResponse = {
  //     total,
  //     totalPages,
  //     data,
  //   };
  //   return Response.json(response);
  // } catch (err) {
  //   console.error('route jobs could not be retrieved', err);
  //   throw err;
  // }
}

export async function POST(request: NextRequest) {
  const apiURL = process.env.API_URL!;
  const formData = await request.formData();
  const captchaToken = formData.get('captchaToken') as string;

  const { isRateLimited, limit, limitRemaining } = checkRateLimit(
    request,
    limiter,
    REQUEST_RATE_LIMIT,
    CACHE_KEY_PREFIX,
  );

  if (isRateLimited) {
    return NextResponse.json(
      { message: 'Rate limited' },
      {
        status: 429,
      },
    );
  }

  const isInvalidGoogleRecaptcha =
    await hasInvalidGoogleRecaptcha(captchaToken);
  if (isInvalidGoogleRecaptcha) {
    return NextResponse.json(
      { message: 'reCAPTCHA verification failed.' },
      {
        status: 400,
      },
    );
  }
  let attachmentId;
  try {
    attachmentId = await uploadMedia(formData);
  } catch (err) {
    console.error(err);
    return Response.error();
  }

  try {
    const headers = new Headers();
    headers.append(
      'Authorization',
      `Basic ${process.env.WORDPRESS_AUTH_HEADER}`,
    );

    formData.set('fields[company_logo]', attachmentId.toString());
    formData.delete('captchaToken');

    const response = await fetch(`${apiURL}/wp-json/wp/v2/jobs`, {
      method: 'POST',
      headers,
      body: formData,
    });

    const data = await response.json();

    if (!response.ok) {
      console.error(data);
      return Response.error();
    }

    return Response.json(
      {},
      {
        headers: {
          ...generateRateLimitHeaders(limit, limitRemaining),
        },
      },
    );
  } catch (err) {
    console.error(err);
    return Response.error();
  }
}

async function uploadMedia(reqFormData: FormData) {
  const apiURL = process.env.API_URL!;
  const media = reqFormData.get('fields[company_logo]') as File;

  if (!media) {
    throw new Error('Company logo missing');
  }

  const formData = new FormData();
  formData.append('file', media);

  const headers = new Headers();
  headers.append('Authorization', `Basic ${process.env.WORDPRESS_AUTH_HEADER}`);

  const requestOptions = {
    method: 'POST',
    headers,
    body: formData,
  };

  const response = await fetch(`${apiURL}/wp-json/wp/v2/media`, requestOptions);

  const mediaResponse = await response.json();
  if (!response.ok) {
    console.error(mediaResponse);
    throw new Error('Could not upload company logo');
  }
  return mediaResponse.id;
}
