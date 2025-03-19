import { Request, Response } from 'express';
import { rentService } from './rent.service';



const createRentRequest = async (req: Request, res: Response) => {
    try {
      const rentRequest = req.body;
  
      const result = await rentService.createRentRequestIntoDB(rentRequest);
  
      res.status(200).json({
        success: true,
        message: 'Rent Request Placed successfully',
        // data: {},
        data: result,
      });
    } catch (error) {
      res.status(404).json({
        success: false,
        message: 'Validation failed',
        error,
      });
    }
  };

  export const rentControler = {
    createRentRequest,
   
   
  };