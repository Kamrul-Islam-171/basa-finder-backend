
import  express  from 'express';

import { UserController } from './user.controller';
import Auth from '../../middlewares/auth';
import ValidateRequest from '../../middlewares/validateRequests';
import { UserValidation } from './user.validation';
// import ValidateRequest from '../../middlewares/validateRequests';
// import { UserValidation } from './user.validation';
const router = express.Router();

// router.post('/create-user', ValidateRequest(UserValidation.createUserValidation), UserController.createUser);

router.get('/all-customers', UserController.getAllCustomers)
router.get('/:email', UserController.getSingleCustomer)
router.patch('/:userId', Auth('admin'), UserController.unblockBlockUser);
router.post('/change-password', Auth("landlord"), ValidateRequest(UserValidation.changePasswordValidationSchema), UserController.changePassword)


export const UserRoutes = router;