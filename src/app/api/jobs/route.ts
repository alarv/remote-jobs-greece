import { NextRequest, NextResponse } from 'next/server';
import { IJob } from '@/app/components/JobListing';
import { isDevEnvironment } from '@/app/util/env.util';
import { retrievePagesFromHeaders } from '@/app/util/res.util';
import { prefixFilterKeysWithFilters } from '@/app/util/jobs.util';
import {
  checkRateLimit,
  rateLimit,
  retrieveIp,
} from '@/app/util/rate-limit.util';
import { hasInvalidGoogleRecaptcha } from '@/app/util/recaptcha.util';

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
  const apiURL = process.env.API_URL!;

  const prefixedFilters = prefixFilterKeysWithFilters(
    Object.fromEntries(request.nextUrl.searchParams),
  );

  const queryString = new URLSearchParams({ ...prefixedFilters });

  try {
    const url = `${apiURL}/wp-json/wp/v2/jobs?${queryString}`;
    const res = await fetch(url, {
      cache: isDevEnvironment() ? 'no-cache' : 'force-cache',
    });
    if (!res.ok) {
      return Response.error();
    }

    const { total, totalPages } = retrievePagesFromHeaders(res);
    const data = await res.json();

    const response: JobsResponse = {
      total,
      totalPages,
      data,
    };
    return Response.json(response);
  } catch (err) {
    console.error('route jobs could not be retrieved', err);
    throw err;
  }
}

export async function POST(request: NextRequest) {
  const apiURL = process.env.API_URL!;
  const requestBody = await request.json();
  const captchaToken = requestBody.captchaToken;

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
}
