import User from '../models/user.js';

export const createUser = async (req, res) => {
  const user = await User.create(req.body);

  res.status(201).json({
    success: true,
    data: user
  });
};

export const getUsers = async (req, res) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;

  const users = await User.find({ isDeleted: false })
    .skip((page - 1) * limit)
    .limit(limit);

  res.json({
    success: true,
    data: users
  });
};

export const getUserById = async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user || user.isDeleted) {
    return res.status(404).json({
      success: false,
      message: 'User not found'
    });
  }

  res.json({
    success: true,
    data: user
  });
};

export const updateUser = async (req, res) => {
  const user = await User.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true
    }
  );

  res.json({
    success: true,
    data: user
  });
};

export const deleteUser = async (req, res) => {
  await User.findByIdAndUpdate(req.params.id, {
    isDeleted: true
  });

  res.json({
    success: true,
    message: 'User soft deleted'
  });
};
