import { NextApiResponse } from 'next';

interface RateLimitOptions {
  interval: number; // 時間間隔（毫秒）
  uniqueTokenPerInterval: number; // 每個時間間隔的最大請求數
}

export default function rateLimit(options: RateLimitOptions) {
  const tokenCache = new Map<string, { count: number; lastReset: number }>();

  return {
    check: (
      res: NextApiResponse,
      limit: number,
      token: string,
      callback: (err: Error | null) => void
    ) => {
      const now = Date.now();
      const tokenInfo = tokenCache.get(token) || { count: 0, lastReset: now };

      // 重置計數器（如果超過間隔）
      if (now - tokenInfo.lastReset > options.interval) {
        tokenInfo.count = 0;
        tokenInfo.lastReset = now;
      }

      // 更新請求計數
      tokenInfo.count += 1;
      tokenCache.set(token, tokenInfo);

      // 設置速率限制標頭
      const remaining = Math.max(0, limit - tokenInfo.count);
      res.setHeader('X-RateLimit-Limit', limit);
      res.setHeader('X-RateLimit-Remaining', remaining);
      res.setHeader('X-RateLimit-Reset', Math.ceil((tokenInfo.lastReset + options.interval) / 1000));

      // 檢查是否超過限制
      if (tokenInfo.count > limit) {
        const err = new Error('Rate limit exceeded');
        callback(err);
        return;
      }

      callback(null);
    },
  };
}
