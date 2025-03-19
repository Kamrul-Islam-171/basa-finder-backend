import express from 'express';

import { orderController } from './payment.controller';
import Auth from '../../middlewares/auth';

const router = express.Router();

router.post(
  '/create-payment',
//   ValidateRequest(orderValidation.orderValidationSchema),
  Auth('tenant'),
  orderController.createOrder,
);
router.post(
  '/success-payment',
  orderController.successPayment,
);
router.post(
  '/failed',
  orderController.failedPayment,
);
router.post(
  '/canceled',
  orderController.canceledPayment,
);

export const OrderRoutes = router;
