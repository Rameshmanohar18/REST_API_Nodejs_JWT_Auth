const Redis = require('ioredis');

let hasLoggedConnectionError = false;

const redis = new Redis(process.env.REDIS_URL, {
  retryStrategy(times) {
    if (times > 3) {
      return null;
    }

    return Math.min(times * 200, 1000);
  }
});

redis.on('error', (error) => {
  if (hasLoggedConnectionError) {
    return;
  }

  hasLoggedConnectionError = true;

  const message = error.message || error.code || 'Redis is not running or REDIS_URL is incorrect';

  console.warn(`Redis connection failed: ${message}`);
  console.warn('Start Redis on localhost:6379, or disable logout token blacklisting while developing.');
});

module.exports = redis;
