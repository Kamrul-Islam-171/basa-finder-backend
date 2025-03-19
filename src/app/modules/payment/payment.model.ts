
import { model, Schema } from 'mongoose';
import { IOrder } from './payment.interface';

const OrderSchema: Schema = new Schema<IOrder>(
  {
    name: { type: String, required: true },
    // product: { type: String, required: true },
    product: { type: Schema.Types.ObjectId, ref: 'ProductModel', required: true },
    email: { type: String, required: true},
    amount: { type: Number, required: true },
    payment_id: { type: String, required: true },
    status: {
      type: String,
      enum: ['pending', 'success', 'failed'],
      default: 'pending',
    },
    delivered: {
      type: String,
      enum: ["Pending","Processing", "Shipped","Delivered"],
      default: 'Pending',
    },
  },
  { timestamps: true },
);

export const OrderModel = model<IOrder>('OrderModel', OrderSchema);
