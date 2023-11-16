import { NextRequest, NextResponse } from 'next/server';
import { isDevEnvironment } from '@/app/util/env.util';
import rateLimit, { retrieveIp } from '@/app/util/rate-limit.util';

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

  const searchParams = request.nextUrl.searchParams;
  const queryString = `${searchParams.toString()}&${jobQueryParam}`;

  const ip = retrieveIp(request);
  if (!ip) {
    console.warn('request ip could not be retrieved');
  }

  const { isRateLimited, limit, limitRemaining } = limiter.check(
    REQUEST_RATE_LIMIT,
    `${CACHE_KEY_PREFIX}_${ip}`,
  ); // 10 requests per minute per IP

  if (isRateLimited) {
    return NextResponse.json(
      { message: 'Rate limited' },
      {
        status: 429,
      },
    );
  }

  try {
    const url = `${apiURL}/search?${queryString}`;
    const response = await fetch(url, {
      cache: isDevEnvironment() ? 'no-cache' : 'force-cache',
    });
    const data = await response.json();
    return Response.json(data, {
      headers: {
        'X-RateLimit-Limit': limit,
        'X-RateLimit-Remaining': limitRemaining,
      },
    });
  } catch (err) {
    console.error('route jobs could not be retrieved');
    return Response.json([]);
  }
}
