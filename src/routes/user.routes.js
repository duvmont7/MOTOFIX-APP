const express = require('express');

const usersControllers = require('../controllers/users.controllers');

const usersMiddleware = require('../middlewares/users.middleware');
const validationMiddleware = require('../middlewares/validations.middleware');
const authMiddleware = require('../middlewares/auth.middleware');

const router = express.Router();

router
  .route('/')
  .get(authMiddleware.protect, usersControllers.findAllUsers)
  .post(validationMiddleware.createUserValidation, usersControllers.createUser);

router.post(
  '/login',
  validationMiddleware.loginUserValidation,
  usersControllers.login
);

router.use(authMiddleware.protect);

router
  .route('/:id')
  .get(usersMiddleware.validUser, usersControllers.findOneUser)
  .patch(
    usersMiddleware.validUser,
    authMiddleware.protectAccountOwner,
    usersControllers.updateUser
  )
  .delete(
    usersMiddleware.validUser,
    authMiddleware.protectAccountOwner,
    usersControllers.deleteUser
  );

module.exports = router;
