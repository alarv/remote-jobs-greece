import { NextRequest } from 'next/server';
import { isDevEnvironment } from '@/app/util/env.util';
import { IJob } from '@/app/components/JobListing';

export interface JobsResponse {
  total: number;
  totalPages: number;
  data: IJob[];
}

export async function GET(request: NextRequest) {
  const apiURL = process.env.API_URL!;

  const searchParams = request.nextUrl.searchParams;
  const queryString = searchParams.toString();

  try {
    const url = `${apiURL}/jobs?${queryString}`;
    const res = await fetch(url, {
      cache: isDevEnvironment() ? 'no-store' : 'force-cache',
    });
    const { headers } = res;
    const data = await res.json();

    const response: JobsResponse = {
      total: parseInt(headers.get('x-wp-total')!),
      totalPages: parseInt(headers.get('x-wp-totalpages')!),
      data,
    };
    return Response.json(response);
  } catch (err) {
    console.error('route jobs could not be retrieved');
    throw err;
  }
}
