import { z } from "zod";

 const rentalRequestSchema = z.object({
    body: z.object({
        houseId: z.string().min(1, "House ID is required"),
        ownerEmail: z.string().email("Invalid owner email"),
        requestEmail: z.string().email("Invalid request email"),
        moveInDate: z.string().min(1, "Move-in date is required"), 
        duration: z.string().min(1, "Duration is required"),
        specialRequests: z.string().optional(),
        status: z.enum(["pending", "approved", "rejected"]).default("pending"),
        isPayment:z.boolean().default(false)
      })
 })

 const changeRequestStatusSchema = z.object({
    body: z.object({
        status: z.enum(["pending", "approved", "rejected"]), 
      })
 })

export const rentValition = {
    rentalRequestSchema,
    changeRequestStatusSchema
}
