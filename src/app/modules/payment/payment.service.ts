/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from 'mongoose';
import { ProductModel } from '../Products/product.model';
import { ObjectId } from 'mongodb';
import config from '../../config';
import axios from 'axios';
import { OrderModel } from './payment.model';
// import AppError from '../../errors/AppError';
// import httpStatus from 'http-status';

type TOrder = {
  name: string;
  email: string;
  address: string;
  productId: string;
  paymentMethod:string;
  totalPrice: number;

};

const createPaymentIntoDB = async (product: TOrder) => {
  const productInfo = await ProductModel.findById({
    _id: new mongoose.Types.ObjectId(product?.productId),
  });


  // console.log(product);
  // if(product.paymentMethod === 'BDT') {
  //   productInfo.price = productInfo.price * 100;
  // }
  let total = productInfo?.rentAmount;
  if(product.paymentMethod === 'BDT') {
    total = parseInt((Number(total) * 83.18).toString());
  }

  const transactionId = new ObjectId().toString(); // shoulbe be unique

  const initialData = {
    store_id: config.store_id,
    store_passwd: config.store_pass,
    // total_amount: productInfo?.price, // this price should be calculated and get from backend for security purpose
    // total_amount: product?.totalPrice, 
    total_amount: total, // this price should be calculated and get from backend for security purpose
    currency: product?.paymentMethod,
    tran_id: transactionId, // use unique tran_id for each api call
    // success_url: 'http://localhost:5000/api/orders/success-payment',
    success_url: `${config.back_end_url}/api/orders/success-payment`, // backend e ei route thaka lagbe
    fail_url: `${config.back_end_url}/api/orders/failed`,
    cancel_url: `${config.back_end_url}/api/orders/canceled`,
    // ipn_url: 'http://localhost:3030/ipn',
    shipping_method: 'Courier',
    product_name: 'Computer.',
    product_category: 'Electronic',
    product_profile: 'general',
    cus_name: product?.name,
    cus_email: product?.email,
    cus_add1: product?.address,
    cus_add2: 'Dhaka',
    cus_city: 'Dhaka',
    cus_state: 'Dhaka',
    cus_postcode: '1000',
    cus_country: 'Bangladesh',
    cus_phone: '01711111111',
    cus_fax: '01711111111',
    ship_name: product?.name,
    ship_add1: 'Dhaka',
    ship_add2: 'Dhaka',
    ship_city: 'Dhaka',
    ship_state: 'Dhaka',
    ship_postcode: 1000,
    ship_country: 'Bangladesh',
  };

  // needs to use transaction roll back

  const response = await axios.post(
    'https://sandbox.sslcommerz.com/gwprocess/v4/api.php',
    initialData,
    {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    },
  );
  // console.log(response)

  // if (!response.data?.GatewayPageURL) {
  //   throw new AppError(
  //     httpStatus.BAD_GATEWAY,
  //     'Failed to get payment URL from SSLCommerz',
  //   );
  // }

  // now save the datainto new collection
  const orderInfo = {
    name: product?.name,
    email: product?.email,
    amount: productInfo?.rentAmount,
    payment_id: transactionId,
    product: product?.productId,
    status: 'pending',
  };

  const Saveres = await OrderModel.create(orderInfo);

  if (Saveres) {
    return {
      paymentUrl: response.data?.GatewayPageURL,
    };
  }
 
};



const successOrder = async (id: string, successInfo: any) => {
  await OrderModel.findOneAndUpdate(
    { payment_id: successInfo?.tran_id },
    { status: 'success' },
    { new: true },
  );
  const orderData = await OrderModel.findOne({
    payment_id: successInfo?.tran_id,
  });
  // console.log('order = ', orderData);
  const Saveres = await ProductModel.findByIdAndUpdate(
    {_id: orderData?.product},
    { $inc: { quantity: -1 } },
    {new: true },
  );

  // if(Saveres?.quantity === 0) {
  //   // console.log("i am in = ", res?.quantity)
  //   await ProductModel.findByIdAndUpdate(
  //     {_id: orderData?.product},
  //     {inStock: false},
  //     {new: true },
  //   );
  //   // console.log("i am int ", res)
  // }
  // console.log(Saveres)

  return {
    message: "Order done"
  };
};

export const orderService = {
  createPaymentIntoDB,
  successOrder,
};
