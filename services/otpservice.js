import redis from '../config/redis.js';

const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

const storeOTP = async (email, otp) => {
  await redis.set(`otp:${email}`, otp, 'EX', 300);
};

const verifyOTP = async (email, otp) => {
  const storedOtp = await redis.get(`otp:${email}`);

  return storedOtp === otp;
};

export {
  generateOTP,
  storeOTP,
  verifyOTP
};
