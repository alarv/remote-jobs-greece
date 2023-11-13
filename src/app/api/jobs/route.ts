import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  const apiURL = process.env.API_URL!;

  const searchParams = request.nextUrl.searchParams;
  const queryString = searchParams.toString();

  try {
    const url = `${apiURL}/jobs?${queryString}`;
    const response = await fetch(url, {
      cache: 'no-store',
    });
    const data = await response.json();
    await new Promise<void>((resolve) => {
      setTimeout(() => {
        resolve();
      }, 2000);
    });
    return Response.json(data);
  } catch (err) {
    console.error('route jobs could not be retrieved');
    return Response.json([]);
  }
}
