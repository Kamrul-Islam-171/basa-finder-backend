import express from 'express';

import Auth from '../../middlewares/auth';
import { rentValition } from './rent.validation';
import ValidateRequest from '../../middlewares/validateRequests';
import { rentControler } from './rent.controller';

const router = express.Router();

//route calls the controller function
router.post(
  '/rent-request',
  Auth('tenant'),
  ValidateRequest(rentValition.rentalRequestSchema),
  rentControler.createRentRequest,
);







export const rentRequestRoutes = router;
