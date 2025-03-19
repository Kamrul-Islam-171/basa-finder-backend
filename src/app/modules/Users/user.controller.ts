import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import { UserService } from "./user.service";

const createUser = catchAsync(async(req, res) => {

    const result = await UserService.createUserIngoDB(req.body)
    const {_id, email, name} = result.res;
    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: 'User registered successfully',
        data: {
            _id,
            name,
            email,
            accessToken: result.accessToken,
            refreshToken: result.refreshToken,
        }
    })
})

const unblockBlockUser = catchAsync(async(req, res) => {
    const {userId} = req.params;
    const query = req.query;
    await UserService.blockUnblockUser(userId, query);
    // console.log(query)
  
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: `User ${query?.isBlock === 'true' ? 'blocked' : 'unblocked'} successfully`,
        data: {
           
        }
    })
})
const getAllCustomers = catchAsync(async(req, res) => {
    const query = req.query;
    
    const result = await UserService.getAllUsersFromDB(query);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'User retrives successfully',
        data: result
    })
})
const getSingleCustomer = catchAsync(async(req, res) => {
    const {email} = req.params;
    
    const result = await UserService.getSingleUsersFromDB(email);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'User retrives successfully',
        data: result
    })
})

const changePassword = catchAsync(async(req, res) => {
    
    // console.log(req.user, req.body);
    
    const {...passwordData} = req.body;
     await UserService.changePassword(req.user, passwordData);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Password changed successfully',
        data: {}
        // data: null
    })
})



export const UserController = {
    createUser,
    unblockBlockUser,
    getAllCustomers,
    getSingleCustomer,
    changePassword
    
}