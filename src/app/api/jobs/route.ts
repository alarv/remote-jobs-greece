import { NextRequest } from 'next/server';
import { IJob } from '@/app/components/JobListing';
import { isDevEnvironment } from '@/app/util/env.util';
import { retrievePagesFromHeaders } from '@/app/util/res.util';
import { prefixFilterKeysWithFilters } from '@/app/util/jobs.util';

export interface JobsResponse {
  total: number;
  totalPages: number;
  data: IJob[];
}

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
