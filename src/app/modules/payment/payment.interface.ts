import { Types } from "mongoose";

export interface IOrder {
    name: string;
    email: string;
    amount: number;
    payment_id: string;
    status: "pending" | "success" | "failed";
    // product:string;
    product:Types.ObjectId; // for refferencing
    delivered: "Pending" |"Processing"| "Shipped"| "Delivered"
}