const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const redis = require('../config/redis');
const User = require('../models/User');
const {
  generateAccessToken,
  generateRefreshToken
} = require('../utils/generateToken');

exports.register = async (req, res) => {
  const { name, email, password, role } = req.body;

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    return res.status(400).json({
      success: false,
      message: 'User already exists'
    });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    role
  });

  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);

  return res.status(201).json({
    success: true,
    data: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role
    },
    accessToken,
    refreshToken
  });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email, isDeleted: false }).select('+password');

  if (!user) {
    return res.status(401).json({
      success: false,
      message: 'Invalid email or password'
    });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return res.status(401).json({
      success: false,
      message: 'Invalid email or password'
    });
  }

  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);

  return res.json({
    success: true,
    accessToken,
    refreshToken
  });
};

exports.refreshToken = async (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.status(401).json({
      success: false,
      message: 'Refresh token required'
    });
  }

  try {
    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    const user = await User.findById(decoded.id);

    if (!user || user.isDeleted) {
      return res.status(401).json({
        success: false,
        message: 'Invalid refresh token'
      });
    }

    const accessToken = generateAccessToken(user);

    return res.json({
      success: true,
      accessToken
    });
  } catch (error) {
    return res.status(403).json({
      success: false,
      message: 'Invalid refresh token'
    });
  }
};

exports.logout = async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Token required'
    });
  }

  try {
    await redis.set(token, 'blacklisted', 'EX', 60 * 60 * 24);
  } catch (error) {
    return res.status(503).json({
      success: false,
      message: 'Logout is temporarily unavailable'
    });
  }

  return res.json({
    success: true,
    message: 'Logged out successfully'
  });
};
