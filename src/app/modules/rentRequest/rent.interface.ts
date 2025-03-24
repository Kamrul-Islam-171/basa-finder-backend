import { Types } from "mongoose";

export type TRentalRequest =  {
    houseId: Types.ObjectId;
    ownerEmail: string;
    requestEmail:string;
    moveInDate: string;
    duration: string;
    specialRequests: string;
    status: "pending" | "approved" | "rejected"; 
    isPayment:boolean;
}
  