import config from '../../config';
import AppError from '../../errors/AppError';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
// import { OrderModel } from './payment.model';
import { orderService } from './payment.service';
import httpStatus from 'http-status';

const createOrder = catchAsync(async (req, res) => {
  const info = req.body;


  const ressult = await orderService.createPaymentIntoDB(info);
  //   console.log(ressult)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `Product Ordered successfully`,
    data: ressult,
  });
});
const successPayment = catchAsync(async (req, res) => {
  const successInfo = req.body; // this body content is provied by ssl after payment success
  // console.log('sueecess = ', successInfo);

  if (successInfo?.status !== 'VALID') {
    throw new AppError(httpStatus.BAD_REQUEST, 'Invalid Payment');
  }

  await orderService.successOrder(successInfo?.tran_id, successInfo)

  // await OrderModel.findOneAndUpdate(
  //   { payment_id: successInfo?.tran_id }, 
  //   { status: 'success' }, 
  //   { new: true } 
  // );
  res.redirect(`${config.front_end_url}/success`)
  // console.log(updateOrder)
  // sendResponse(res, {
  //   statusCode: httpStatus.OK,
  //   success: true,
  //   message: `Payment is Success`,
  //   data: {},
  // });
});
const failedPayment = catchAsync(async (req, res) => {

  res.redirect(`${config.front_end_url}/fail`)
 
  // sendResponse(res, {
  //   statusCode: httpStatus.BAD_GATEWAY,
  //   success: true,
  //   message: `Payment Failed`,
  //   data: {},
  // });
});
const canceledPayment = catchAsync(async (req, res) => {
  res.redirect(`${config.front_end_url}/cancel`)
 
  // sendResponse(res, {
  //   statusCode: httpStatus.BAD_GATEWAY,
  //   success: true,
  //   message: `Payment Canceled`,
  //   data: {},
  // });
});
export const orderController = {
  createOrder,
  successPayment,
  failedPayment,
  canceledPayment
};
