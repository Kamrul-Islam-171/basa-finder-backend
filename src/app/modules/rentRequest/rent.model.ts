import mongoose, { Schema } from "mongoose";
import { TRentalRequest } from "./rent.interface";


const RentalRequestSchema = new Schema<TRentalRequest>(
  {
    houseId: { type: String, required: true },
    ownerEmail: { type: String, required: true },
    requestEmail: { type: String, required:true},
    moveInDate: { type: String, required: true },
    duration: { type: String, required: true },
    specialRequests: { type: String, required: false },
    status: { type: String, enum: ["pending", "approved", "rejected"], default: "pending" },
  },
  { timestamps: true } 
);

const RentalRequest = mongoose.model<TRentalRequest>("RentalRequest", RentalRequestSchema);

export default RentalRequest;
