import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  const apiURL = process.env.API_URL!;
  const jobQueryParam = 'subtype=job';

  const searchParams = request.nextUrl.searchParams;
  const queryString = `${searchParams.toString()}&${jobQueryParam}`;

  try {
    const url = `${apiURL}/search?${queryString}`;
    const response = await fetch(url, {
      cache: 'force-cache',
    });
    const data = await response.json();
    return Response.json(data);
  } catch (err) {
    console.error('route jobs could not be retrieved');
    return Response.json([]);
  }
}
