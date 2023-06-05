const express = require("express");

//const usersController = require("../controllers/users.controllers");

// const validationMiddleware = require("./../middlewares/validations.middleware");

const userRouter = express.Router();

userRouter
  .route("/")
  .get(usersControllers.findUsers)
  .post(validationMiddleware.validUsers, usersController.createUser);

userRouter
  .route("/:id")
  .get(usersControllers.findUser)
  .patch(usersControllers.updateUser)
  .delete(usersControllers.deleteUser);


module.exports = userRouter;
