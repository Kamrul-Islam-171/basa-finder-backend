import { Request, Response } from 'express';
import { productService } from './product.services';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import httpStatus from "http-status";
const createProduct = async (req: Request, res: Response) => {
  try {
    const product = req.body;

    const result = await productService.createProductIntoDB(product);

    res.status(200).json({
      success: true,
      message: 'Rent House created successfully',
      data: result,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: 'Validation failed',
      error,
    });
  }
};

const getAllListings = async (req: Request, res: Response) => {
  try {
    const query = req.query;
    const result = await productService.getAllListingsFromDB(query);
    // console.log(result)
    res.status(200).json({
      success: true,
      message: 'All Listings retrieved successfully',
      data: result,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: 'Something went wrong',
      error,
    });
  }
};
const getAllListingsByEmail = async (req: Request, res: Response) => {
  try {
    // const user = req.user;
    // console.log(user)
    const query = req.query;
    const email = req.params.email;
    const result = await productService.getMyAllListingsFromDB(query, email);
    // console.log(result)
    res.status(200).json({
      success: true,
      message: 'All listings retrieved successfully',
      data: result,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: 'Something went wrong',
      error,
    });
  }
};

const getSingleProduct = async (req: Request, res: Response) => {
  try {
    const productId = req.params.productId;
    const result = await productService.getSingleBikeFromDB(productId);
    res.status(200).json({
      success: true,
      message: 'House Info retrive successfully',
      data: result,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: 'Something went wrong',
      error,
    });
  }
};

const getProduct = catchAsync(async (req, res) => {
  const productId = req.params.productId;
  const result = await productService.getSingleBikeFromDB(productId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `House Retrive successfully`,
    data: result,
  });
});

const updateRentHouse = async (req: Request, res: Response) => {
  try {
    
    const id = req.params.id;
    const updatedProduct = req.body;
    const result = await productService.updateHouseIntoDB(
      id,
      updatedProduct,
    );
    res.status(200).json({
      success: true,
      message: 'House updated successfully',
      data: result,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: 'Something went wrong',
      error,
    });
  }
};

const deleteProduct = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    const result = await productService.deleteProductFromDB(id);
    if (result.deletedCount) {
      res.status(200).json({
        success: true,
        message: 'House deleted successfully',
        data: {},
      });
    } else {
      res.status(200).json({
        success: true,
        message: 'Bike already deleted ',
        data: {},
      });
    }
  } catch (error) {
    res.status(404).json({
      success: false,
      message: 'Something went wrong',
      error,
    });
  }
};

const getOrderByEmail = catchAsync(async (req, res) => {
  // const email = req.params.email;
  // console.log(req.query)
  
  const result = await productService.getOrdersByEmailFromDB(req.query);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `Orders Retrive successfully`,
    data: result,
  });
});
const getAllOrder = catchAsync(async (req, res) => {
  
  // console.log("i am in")
  const result = await productService.getOrdersFromDB(req.query);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `Orders Retrive successfully`,
    data: result,
  });
});


export const productControler = {
  createProduct,
  getAllListings,
  getAllListingsByEmail,

  getSingleProduct,

  updateRentHouse,

  deleteProduct,
  getProduct,
  getOrderByEmail,
  getAllOrder,
 
};
