import { NextRequest, NextResponse } from 'next/server';
import rateLimit, { retrieveIp } from '@/app/util/rate-limit.util';
import { getToken, sendEmail } from '@/app/api/contact/zoho.api';

const REQUEST_RATE_LIMIT = 10;
const REQUEST_TIME_WINDOW_IN_MS = 60 * 1000; // 60 seconds
const CACHE_KEY_PREFIX = 'contact';

const limiter = rateLimit({
  interval: REQUEST_TIME_WINDOW_IN_MS, // 10 minutes
  uniqueTokenPerInterval: 500, // Max 500 users per second
});

export async function POST(request: NextRequest) {
  const apiURL = process.env.API_URL!;

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

  const requestBody = await request.json();

  // Google reCaptcha check
  try {
    const response = await fetch(
      `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${requestBody.captchaToken}`,
      { method: 'POST' },
    );

    if (response.status !== 200) {
      return NextResponse.json(
        { message: 'reCAPTCHA verification failed.' },
        {
          status: 400,
        },
      );
    }
  } catch (e) {
    return NextResponse.json(
      { message: 'reCAPTCHA verification failed.' },
      {
        status: 400,
      },
    );
  }

  try {
    const authToken = await getToken();

    const data = await sendEmail({
      authToken,
      fromAddress: 'info@remotejobsgreece.gr',
      toAddress: 'alarvfm@gmail.com',
      subject: 'Contact form',
      content: `Contact name: ${requestBody.name}. \n
      Contact email: ${requestBody.email} \n\n\n
      
      ${requestBody.message}`,
    });

    return Response.json(data, {
      headers: {
        'X-RateLimit-Limit': limit,
        'X-RateLimit-Remaining': limitRemaining,
      },
    });
  } catch (err) {
    console.error(err);
    return Response.error();
  }
}
