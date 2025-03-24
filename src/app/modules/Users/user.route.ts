import express from 'express';

import { UserController } from './user.controller';
import Auth from '../../middlewares/auth';
import ValidateRequest from '../../middlewares/validateRequests';
import { UserValidation } from './user.validation';
// import ValidateRequest from '../../middlewares/validateRequests';
// import { UserValidation } from './user.validation';
const router = express.Router();

// router.post('/create-user', ValidateRequest(UserValidation.createUserValidation), UserController.createUser);

router.get(
  '/all-users',

  Auth('admin'),
  UserController.getAllCustomers,
);
router.get(
  '/:email',
  Auth('admin', 'landlord', 'tenant'),
  UserController.getSingleCustomer,
);
router.patch(
  '/:userId',
  Auth('admin'),
  UserController.unblockBlockUser,
);
router.post(
  '/change-password',
  Auth('landlord', 'admin', 'tenant'),
  ValidateRequest(UserValidation.changePasswordValidationSchema),
  UserController.changePassword,
);
router.post(
  '/change-profile',
  Auth('landlord', 'admin', 'tenant'),
  //   ValidateRequest(UserValidation.changePasswordValidationSchema),
  UserController.changeProfile,
);
router.post(
  '/change-role/:id',
  Auth('admin'),
  //   ValidateRequest(UserValidation.changePasswordValidationSchema),
  UserController.changeRole,
);

export const UserRoutes = router;
