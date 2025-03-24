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
const changeRentRequestStatus = async (req: Request, res: Response) => {
    try {
      const rentRequest = req.body;
      // console.log(rentRequest);
  
      const result = await rentService.changeStatusFromDB(rentRequest.status, rentRequest.id);
  
      res.status(200).json({
        success: true,
        message: 'Rent Request Status changed successfully',
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
const getRentRequest = async (req: Request, res: Response) => {
    try {
      const user = req.user;
      // console.log(user);
      const {email} = user;
  
      const result = await rentService.getAllRentReqFromDB(email, req.query);
  
      res.status(200).json({
        success: true,
        message: 'Rent Request Lists retrive successfully',
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
const getAllRentRequest = async (req: Request, res: Response) => {
    try {
      const user = req.user;
      // console.log(user);
      const {email} = user;
  
      const result = await rentService.getAllRentReqForOwnLanlordFromDB(email, req.query);
  
      res.status(200).json({
        success: true,
        message: 'Rent Request Lists retrive successfully',
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
const getSingleRentRequest = async (req: Request, res: Response) => {
    try {
      const user = req.user;
      // console.log(user);
      const {email} = user;
      const {id} = req.params;
  
      const result = await rentService.getSingleRentReqFromDB(email, id);
  
      res.status(200).json({
        success: true,
        message: 'Rent Request Info retrive successfully',
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
    getRentRequest,
    getSingleRentRequest,
    getAllRentRequest,
    changeRentRequestStatus
   
   
  };