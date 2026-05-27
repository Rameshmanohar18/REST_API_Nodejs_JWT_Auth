const jwt = require('jsonwebtoken');
const redis = require('../config/redis');

module.exports = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {      
    return res.status(401).json({       
      message: 'Unauthorized'
    });
  }

  let blacklisted = false;

  try {
    blacklisted = await redis.get(token);
  } catch (error) {
    console.warn(`Redis blacklist check skipped: ${error.message}`);
  }

  if (blacklisted) {
    return res.status(401).json({
      message: 'Token blacklisted'
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;

    next();
  } catch (error) {
    return res.status(401).json({
      message: 'Invalid token'
    });
  }
};
