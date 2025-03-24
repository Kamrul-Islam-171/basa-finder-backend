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
router.post(
  '/change-status',
  Auth('landlord'),
  ValidateRequest(rentValition.changeRequestStatusSchema),
  rentControler.changeRentRequestStatus,
);
router.get(
  '/rent-request',
  Auth('tenant'),
  // ValidateRequest(rentValition.rentalRequestSchema),
  rentControler.getRentRequest,
);

// earch land lodr er jonno. own house er rent req gula lagbe
router.get(
  '/all-rent-request',
  Auth('landlord'),
  // ValidateRequest(rentValition.rentalRequestSchema),
  rentControler.getAllRentRequest,
);
router.get(
  '/rent-request/:id',
  Auth('tenant'),
  // ValidateRequest(rentValition.rentalRequestSchema),
  rentControler.getSingleRentRequest,
);







export const rentRequestRoutes = router;
