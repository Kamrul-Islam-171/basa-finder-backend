import express from 'express';
import { productControler } from './product.controller';
import ValidateRequest from '../../middlewares/validateRequests';
import { productValidation } from './product.validation';
import Auth from '../../middlewares/auth';

const router = express.Router();

//route calls the controller function
router.post(
  '/add-rent-house',
  Auth('landlord'),
  ValidateRequest(productValidation.productValidationSchema),
  productControler.createProduct,
);
router.get('/get-all-listings', productControler.getAllListings);

router.get(
  '/get-all-listings/:email',
  Auth('landlord'),
  productControler.getAllListingsByEmail,
);

router.get('/:productId', productControler.getProduct);
router.patch('/:id', Auth('landlord'), productControler.updateRentHouse);
// router.put('/:productId', productControler.updateProduct);
router.delete('/:productId', productControler.deleteProduct);

//orders
router.get('/orders/all-products', productControler.getOrderByEmail);
router.get('/order/all-orders', productControler.getAllOrder);

export const ProductRoutes = router;
