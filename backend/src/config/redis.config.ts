import Redis from 'ioredis';

const REDIS_URL = process.env.REDIS_URL || 'redis://localhost:6379';

export const redis = new Redis(REDIS_URL);

redis.on('connect', () => {
  console.log('Connected to Redis');
});

redis.on('error', (error) => {
  console.error('Redis connection error:', error);
});

export const CACHE_EXPIRY = {
  ONE_HOUR: 60 * 60,
  ONE_DAY: 60 * 60 * 24,
};

export const clearCache = async (pattern: string): Promise<void> => {
  try {
    const keys = await redis.keys(pattern);
    if (keys.length) {
      await redis.del(keys);
    }
  } catch (error) {
    console.error('Error clearing cache:', error);
  }
}; 