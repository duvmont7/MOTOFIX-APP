const express = require('express');

const usersControllers = require('../controllers/users.controllers');

const userRouter = express.Router();

userRouter
  .route('/')
  .get(usersControllers.findUsers)
  .post(usersControllers.createUser);

userRouter
  .route('/:id')
  .get(usersControllers.findUser)
  .patch(usersControllers.updateUser)
  .delete(usersControllers.deleteUser);

module.exports = userRouter;
