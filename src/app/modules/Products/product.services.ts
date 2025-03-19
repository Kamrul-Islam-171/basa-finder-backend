import mongoose from 'mongoose';

import { ProductModel } from './product.model';
import QueryBuilder from '../../builder/QueryBuilder';
import { ProductSearchAbleFields } from './product.constant';
import { OrderModel } from '../payment/payment.model';
import { RentHouse } from './product.interface';

const createProductIntoDB = async (product: RentHouse) => {
  const result = await ProductModel.create(product);
  return result;
};

const getAllListingsFromDB = async (query: Record<string, unknown>) => {
  const productQuery = new QueryBuilder(ProductModel.find(), query)
    .search(ProductSearchAbleFields)
    .sort()
    .filter()
    .paginate()
    .fieldsLimiting();
  const result = await productQuery.modelQuery;
  const meta = await productQuery.countTotal();
  return {
    meta,
    result,
  };
};
const getMyAllListingsFromDB = async (query: Record<string, unknown>, email:string) => {
  const productQuery = new QueryBuilder(ProductModel.find({email}), query)
    .search(ProductSearchAbleFields)
    .sort()
    .filter()
    .paginate()
    .fieldsLimiting();
  const result = await productQuery.modelQuery;
  const meta = await productQuery.countTotal();
  return {
    meta,
    result,
  };
};

const getOrdersByEmailFromDB = async (query: Record<string, unknown>) => {

  // here populate('product') e product is the field from orderModel
  const orderQuery = new QueryBuilder(OrderModel.find({status:'success'}).populate('product'), query)
  .filter()
    .paginate()
    .fieldsLimiting();
  const result = await orderQuery.modelQuery;
  const meta = await orderQuery.countTotal();
  return {
    meta,
    result,
  };
};
const getOrdersFromDB = async (query: Record<string, unknown>) => {
  const orderQuery = new QueryBuilder(OrderModel.find({status:'success'}).populate('product'), query)
    .paginate()
    .fieldsLimiting();
  const result = await orderQuery.modelQuery;
  const meta = await orderQuery.countTotal();
  return {
    meta,
    result,
  };
};

const getSingleBikeFromDB = async (id: string) => {
  const result = await ProductModel.findById({
    _id: new mongoose.Types.ObjectId(id),
  });
  return result;
};

const updateHouseIntoDB = async (id: string, product: RentHouse) => {
  // const result = await ProductModel.updateOne({_id : new mongoose.Types.ObjectId(id)}, {...product});

  //update the data and give you the details of updated data
  const result = await ProductModel.findByIdAndUpdate(
    { _id: new mongoose.Types.ObjectId(id) },
    product,
    { new: true },
  );
  return result;
};

const deleteProductFromDB = async (id: string) => {
  const result = await ProductModel.deleteOne({
    _id: new mongoose.Types.ObjectId(id),
  });
  return result;
};

export const productService = {
  createProductIntoDB,
  getAllListingsFromDB,
  getMyAllListingsFromDB,

  getSingleBikeFromDB,
  updateHouseIntoDB,
  deleteProductFromDB,
  getOrdersByEmailFromDB,
  getOrdersFromDB
};
