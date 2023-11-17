import { NextRequest, NextResponse } from 'next/server';
import { isDevEnvironment } from '@/app/util/env.util';
import rateLimit, { retrieveIp } from '@/app/util/rate-limit.util';
import { retrievePagesFromHeaders } from '@/app/util/res.util';

const REQUEST_RATE_LIMIT = 10;
const REQUEST_TIME_WINDOW_IN_MS = 60 * 1000; // 60 seconds
const CACHE_KEY_PREFIX = 'search';

const limiter = rateLimit({
  interval: REQUEST_TIME_WINDOW_IN_MS, // 10 minutes
  uniqueTokenPerInterval: 500, // Max 500 users per second
});

export async function GET(req: NextRequest) {
  const apiURL = process.env.API_URL!;
  const jobQueryParam = 'subtype=job';

  const searchTerm = req.nextUrl.searchParams.get('searchTerm');

  const queryString = `search=${searchTerm}&${jobQueryParam}`;

  const ip = retrieveIp(req);
  if (!ip) {
    console.warn('req ip could not be retrieved');
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
          'X-RateLimit-Limit': limit,
          'X-RateLimit-Remaining': limitRemaining,
        },
      },
    );
  } catch (err) {
    console.error('route search could not be retrieved', err);
    return Response.json([]);
  }
}
