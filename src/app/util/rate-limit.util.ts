import { LRUCache } from 'lru-cache';
import { NextRequest, NextResponse } from 'next/server';

type Options = {
  uniqueTokenPerInterval?: number;
  interval?: number;
};

export interface RateLimiter {
  check: (limit: number, cacheKey: string) => RateLimitStatus;
}

export interface RateLimitStatus {
  isRateLimited: boolean;
  limit: string;
  limitRemaining: string;
}

export function retrieveIp(req: NextRequest): string | null {
  let ipAddress = req.headers.get('x-real-ip');

  const forwardedFor = req.headers.get('x-forwarded-for');
  if (!ipAddress && forwardedFor) {
    ipAddress = forwardedFor?.split(',').at(0) ?? 'Unknown';
  }

  return ipAddress;
}

export function rateLimit(options?: Options): RateLimiter {
  const tokenCache = new LRUCache({
    max: options?.uniqueTokenPerInterval || 500,
    ttl: options?.interval || 60000,
  });

  return {
    check: (limit: number, cacheKey: string) => {
      const tokenCount = (tokenCache.get(cacheKey) as number[]) || [0];
      if (tokenCount[0] === 0) {
        tokenCache.set(cacheKey, tokenCount);
      }
      tokenCount[0] += 1;

      const currentUsage = tokenCount[0];
      const isRateLimited = currentUsage >= limit;
      return {
        isRateLimited,
        limit: limit.toString(),
        limitRemaining: isRateLimited ? '0' : `${limit - currentUsage}`,
      };
    },
  };
}

export function checkRateLimit(
  request: NextRequest,
  limiter: RateLimiter,
  requestRateLimit: number,
  cacheKeyPrefix: string,
): RateLimitStatus {
  const ip = retrieveIp(request);
  if (!ip) {
    console.warn('request ip could not be retrieved');
  }

  const { isRateLimited, limit, limitRemaining } = limiter.check(
    requestRateLimit,
    `${cacheKeyPrefix}_${ip}`,
  ); // 10 requests per minute per IP

  return { isRateLimited, limit, limitRemaining };
}

export const generateRateLimitHeaders = (
  limit: string,
  limitRemaining: string,
) => ({
  'X-RateLimit-Limit': limit,
  'X-RateLimit-Remaining': limitRemaining,
});
