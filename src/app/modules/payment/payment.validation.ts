import { z } from "zod";

export const orderValidationSchema = z.object({
  body: z.object({
    name: z
      .string()
      .min(1, { message: "Name is required and cannot be empty." }),

    email: z
      .string()
      .email({ message: "Invalid email format." })
      .min(1, { message: "Email is required and cannot be empty." }),

    amount: z
      .number()
      .positive({ message: "Amount must be a positive number." })
      .refine((value) => value > 0, {
        message: "Amount must be greater than zero.",
      }),

    payment_id: z
      .string()
      .min(1, { message: "Payment ID is required and cannot be empty." }),

    status: z.enum(["pending", "success", "failed"], {
      message: "Status must be one of: pending, success, failed.",
    }),
  }),
});

export const orderValidation = {
    orderValidationSchema
}
