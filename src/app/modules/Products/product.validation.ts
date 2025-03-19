import { z } from 'zod';

const productValidationSchema = z.object({
  body: z.object({
    location: z.string().min(1, 'Location is required'),
    amenities: z.array(z.string()).min(1, 'At least one amenity is required'),
    description: z.string().min(1, 'Description is required'),
    imageUrls: z
      .array(z.string().url('Invalid URL'))
      .min(1, 'At least one image URL is required'),
    noOfBedRooms: z.number().min(1, 'Number of bedrooms is required'),
    rentAmount: z.number().min(1, 'Rent amount is required'),
    email: z.string().email('Invalid email address'),
  }),
});

export const productValidation = {
  productValidationSchema,
};
