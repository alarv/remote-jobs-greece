import { LRUCache } from 'lru-cache';
import { NextRequest } from 'next/server';

type Options = {
  uniqueTokenPerInterval?: number;
  interval?: number;
};

export function retrieveIp(req: NextRequest): string | null {
  let ipAddress = req.ip || req.headers.get('x-real-ip');

  const forwardedFor = req.headers.get('x-forwarded-for');
  if (!ipAddress && forwardedFor) {
    ipAddress = forwardedFor?.split(',').at(0) ?? 'Unknown';
  }

  return ipAddress;
}

export default function rateLimit(options?: Options) {
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
