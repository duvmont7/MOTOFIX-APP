const express = require('express');

const repairControllers = require('../controllers/repair.controllers');

const repairRouter = express.Router();
repairRouter
  .route('/')
  .get(repairControllers.findRepairs)
  .post(repairControllers.createRepairs);

repairRouter
  .route('/:id')
  .get(repairControllers.findRepairs)
  .patch(repairControllers.updateRepairs)
  .delete(repairControllers.deleteRepairs);

module.exports = repairRouter;
