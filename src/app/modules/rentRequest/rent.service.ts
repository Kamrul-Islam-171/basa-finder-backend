
import { TRentalRequest } from './rent.interface';
import RentalRequest from './rent.model';



const createRentRequestIntoDB = async (rentRequest: TRentalRequest) => {
  const result = await RentalRequest.create(rentRequest);
  return result;
};

export const rentService = {
    createRentRequestIntoDB,
   
};
  
