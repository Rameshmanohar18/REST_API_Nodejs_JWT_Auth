const User = require('../models/User');
  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);

  return res.json({
    success: true,
    accessToken,
    refreshToken
  });


exports.refreshToken = async (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.status(401).json({
      message: 'Refresh token required'
    });
  }

  jwt.verify(
    refreshToken,
    process.env.JWT_REFRESH_SECRET,
    (err, decoded) => {
      if (err) {
        return res.status(403).json({
          message: 'Invalid refresh token'
        });
      }

      const accessToken = jwt.sign(
        {
          id: decoded.id
        },
        process.env.JWT_SECRET,
        {
          expiresIn: '15m'
        }
      );

      return res.json({ accessToken });
    }
  );
};

exports.logout = async (req, res) => {
  const token = req.headers.authorization.split(' ')[1];

  await redis.set(token, 'blacklisted', 'EX', 60 * 60 * 24);

  return res.json({
    success: true,
    message: 'Logged out successfully'
  });
};