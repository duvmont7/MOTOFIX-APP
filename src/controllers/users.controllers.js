const AppError = require('../utils/appError');
const bcrypt = require('bcryptjs');
const catchAsync = require('../utils/catchAsync');
const generateJWT = require('../utils/jwt');
const User = require('../models/user.model');

exports.findUsers = catchAsync(async (req, res, next) => {
  const users = await User.findAll({
    where: { status: 'available' },
    attributes: {
      exclude: ['status', 'password'],
    },
  });

  res.json({
    results: users.length,
    status: 'success',
    users,
  });
});

exports.updateUser = catchAsync(async (req, res, next) => {
  const { user } = req;
  const { name, email } = req.body;

  await user.update({ name, email });

  res.status(200).json({
    status: 'success',
    message: `The user with id:${user.id} was updated❗️`,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  });
});

exports.createUser = catchAsync(async (req, res, next) => {
  const { name, email, password, role } = req.body;

  const existingUser = await User.findOne({
    where: {
      email,
    },
  });

  if (existingUser) {
    return res.status(404).json({
      status: 'error',
      message: `There is already a user created in the database with the email: ${email}❗️`,
    });
  }

  const salt = await bcrypt.genSalt(12);
  const encryptedPassword = await bcrypt.hash(password, salt);

  const user = await User.create({
    name: name.toLowerCase(),
    email: email.toLowerCase(),
    password: encryptedPassword,
    role,
  });

  const token = await generateJWT(user.id);

  res.status(201).json({
    message: 'User created successfully❗️',
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  });
});

exports.findUser = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const oneUser = await User.findOne({
    where: {
      id,
      status: 'available',
    },
  });

  if (!oneUser) {
    return res.status(404).json({
      status: 'error',
      message: `User with id: ${id} was not found❗️`,
    });
  }

  return res.status(200).json({
    status: 'success',
    message: 'User found',
    oneUser,
  });
});


exports.deleteUser = catchAsync(async (req, res, next) => {
  const { user } = req;

  await user.update({ status: 'disabled' });

  res.status(200).json({
    status: 'success',
    message: `User with id:${user.id} has been deleted❗️`,
  });
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({
    where: {
      email: email.toLowerCase(),
      status: 'available',
    },
  });

  if (!user) {
    return next(new AppError(`User with email:${email} was not found`, 404));
  }

  // This password the validation is with bcrypt
  if (!(await bcrypt.compare(password, user.password))) {
    return next(new AppError(`Wrong email or password`, 401));
  }

  const token = await generateJWT(user.id);

  res.status(200).json({
    status: 'success',
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  });
});
