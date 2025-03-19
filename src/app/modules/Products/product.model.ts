import { model, Schema } from 'mongoose';
import {RentHouse } from './product.interface';

const productSchem = new Schema<RentHouse>(
  {
    location: { type: String, required: true },
    amenities: { type: [String], required: true },
    description: { type: String, required: true },
    imageUrls: { type: [String], required: true },
    noOfBedRooms: { type: Number, required: true },
    rentAmount: { type: Number, required: true },
    email: { type: String, required: true }
  },
  { timestamps: true },
);

productSchem.post('save', function (doc, next) {
  next();
});

export const ProductModel = model<RentHouse>('ProductModel', productSchem);
