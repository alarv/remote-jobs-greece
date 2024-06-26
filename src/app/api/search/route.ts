import { NextRequest, NextResponse } from 'next/server';
import { isDevEnvironment } from '@/app/util/env.util';
import {
  checkRateLimit,
  generateRateLimitHeaders,
  rateLimit,
} from '@/app/util/rate-limit.util';
import { retrievePagesFromHeaders } from '@/app/util/res.util';

const REQUEST_RATE_LIMIT = 10;
const REQUEST_TIME_WINDOW_IN_MS = 60 * 1000; // 60 seconds
const CACHE_KEY_PREFIX = 'search';

const limiter = rateLimit({
  interval: REQUEST_TIME_WINDOW_IN_MS, // 10 minutes
  uniqueTokenPerInterval: 500, // Max 500 users per second
});

export async function GET(request: NextRequest) {
  const apiURL = process.env.API_URL!;
  const jobQueryParam = 'subtype=job';

  const searchTerm = request.nextUrl.searchParams.get('searchTerm');
  const queryString = `search=${searchTerm}&${jobQueryParam}`;

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

  try {
    const url = `${apiURL}/wp-json/wp/v2/search?${queryString}`;
    const response = await fetch(url, {
      cache: isDevEnvironment() ? 'no-cache' : 'force-cache',
    });
    const { total, totalPages } = retrievePagesFromHeaders(response);

    const data = await response.json();
    return Response.json(
      {
        total,
        totalPages,
        data,
      },
      {
        headers: {
          ...generateRateLimitHeaders(limit, limitRemaining),
        },
      },
    );
  } catch (err) {
    console.error('route search could not be retrieved', err);
    return Response.json([]);
  }
}
