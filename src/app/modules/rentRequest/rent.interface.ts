export type TRentalRequest =  {
    houseId: string;
    ownerEmail: string;
    requestEmail:string;
    moveInDate: string;
    duration: string;
    specialRequests: string;
    status: "pending" | "approved" | "rejected"; 
}
  