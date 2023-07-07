const catchAsync = require('../utils/catchAsync');
const Repairs = require('../models/repairs.model');
const Users = require('../models/users.model');

exports.findRepairs = catchAsync(async (req, res, next) => {
  const repairs = await Repair.findAll({
    where: { status: ['pending', 'completed'] },
    attributes: {
      exclude: ['status'],
    },
    include: [
      {
        model: Users,
      },
    ],
  });

  res.json({
    status: 'success',
    results: repairs.length,
    repairs,
  });
});

exports.updateRepair = catchAsync(async (req, res, next) => {
  const { repair, user } = req;

  const updatedRepair = await repair.update({ status: 'completed' });

  res.status(200).json({
    status: 'success',
    message: 'Repair updated❗️',
    repair: updatedRepair,
    user,
  });
});

exports.createRepair = catchAsync(async (req, res, next) => {
  const { date, motorsNumber, description } = req.body;
  const { id } = req.sessionUser;

  const repair = await Repairs.create({
    date,
    motorsNumber: motorsNumber.toLowerCase(),
    description,
    userId: id,
  });

  res.status(201).json({
    message: 'Motorcycle repair created successfully❗️',
    repair,
  });
});

exports.findRepair = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const oneRepair = await Repairs.findOne({
    where: {
      id,
      status: 'pending',
    },
    include: [
      {
        model: Users,
        attributes: ['id', 'name', 'email', 'role'],
      },
    ],
  });

  if (!oneRepair) {
    return res.status(404).json({
      status: 'error',
      message: `The repair with id: ${id} was not found❗️`,
    });
  }

  return res.status(200).json({
    status: 'success',
    message: 'repair found',
    oneRepair,
  });
});

exports.deleteRepair = catchAsync(async (req, res, next) => {
  const { repair } = req;

  await repair.update({ status: 'cancelled' });

  res.status(200).json({
    status: 'success',
    message: `Repair with id:${repair.id} has been deleted❗️`,
  });
});