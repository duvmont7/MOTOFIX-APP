const express = require("express");

const usersController = require("../controllers/users.controllers");

const validationMiddleware = require("./../middlewares/validations.middleware");

const userRouter = express.Router();

userRouter
  .route("/")
  .get(usersController.findUsers)
  .post(validationMiddleware.validUsers, usersController.createUser);

userRouter
  .route("/:id")
  .get(usersController.findUser)
  .patch(usersController.updateUser)
  .delete(usersController.deleteUser);


module.exports = userRouter;
