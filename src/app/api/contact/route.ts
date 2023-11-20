import { NextRequest, NextResponse } from 'next/server';
import {
  checkRateLimit,
  generateRateLimitHeaders,
  rateLimit,
  retrieveIp,
} from '@/app/util/rate-limit.util';
import { getToken, sendEmail } from '@/app/api/contact/zoho.api';
import { hasInvalidGoogleRecaptcha } from '@/app/util/recaptcha.util';

const REQUEST_RATE_LIMIT = 10;
const REQUEST_TIME_WINDOW_IN_MS = 60 * 1000; // 60 seconds
const CACHE_KEY_PREFIX = 'contact';

const limiter = rateLimit({
  interval: REQUEST_TIME_WINDOW_IN_MS, // 60 seconds
  uniqueTokenPerInterval: 500, // Max 500 users per second
});

export async function POST(request: NextRequest) {
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
        ...generateRateLimitHeaders(limit, limitRemaining),
      },
    });
  } catch (err) {
    console.error(err);
    return Response.error();
  }
}
