const express = require('express');

const repairControllers = require('../controllers/repair.controllers');

const validationMiddleware = require('../middlewares/validations.middleware');
const authMiddleware = require('../middlewares/auth.middleware');
const repairMiddleware = require('../middlewares/repair.middleware');

const router = express.Router();

router
  .route('/')
  .get(
    authMiddleware.protect,
    authMiddleware.restrictTo('employee'),
    repairControllers.findRepairs
  )
  .post(
    validationMiddleware.createRepairValidation,
    authMiddleware.protect,
    repairControllers.createRepair
  );

router
  .use(authMiddleware.protect)
  .use(authMiddleware.restrictTo('employee'))
  .use('/:id', repairMiddleware.validRepair)
  .route('/:id')
  .get(repairControllers.findRepair)
  .patch(authMiddleware.protectAccountOwner, repairControllers.updateRepair)
  .delete(authMiddleware.protectAccountOwner, repairControllers.deleteRepair);

module.exports = router;
