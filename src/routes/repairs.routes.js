const express = require('express');

const repairControllers = require('../controllers/repair.controllers');

const validationMiddleware = require('./../middlewares/validations.middleware');

const repairRouter = express.Router();

repairRouter
  .route('/')
  .get(repairControllers.findRepairs)
  .post(validationMiddleware.validRepairs, repairControllers.createRepairs);

repairRouter
  .route('/:id')
  .get(repairControllers.findRepairs)
  .patch(repairControllers.updateRepairs)
  .delete(repairControllers.deleteRepairs);

module.exports = repairRouter;
