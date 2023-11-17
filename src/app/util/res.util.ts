import { NextResponse } from 'next/server';

export function retrievePagesFromHeaders(res: Response) {
  const { headers } = res;
  return {
    total: parseInt(headers.get('x-wp-total')!),
    totalPages: parseInt(headers.get('x-wp-totalpages')!),
  };
}
