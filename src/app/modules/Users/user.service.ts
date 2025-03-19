import mongoose from 'mongoose';
import { TUser } from './user.interface';
import { User } from './user.model';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';
import QueryBuilder from '../../builder/QueryBuilder';
import { JwtPayload } from 'jsonwebtoken';
import  bcrypt  from 'bcrypt';
import config from '../../config';
import { createToken } from '../auth/auth.utils';
const createUserIngoDB = async (payload: TUser) => {
  // console.log(payload)
  const res = await User.create(payload);
  const jwtPayload = {
      email: payload.email,
      role: payload.role,
    };
  
    const accessToken = createToken(
      jwtPayload,
      config.access_secret as string,
      config.access_expire as string,
    );
  
    const refreshToken = createToken(
      jwtPayload,
      config.refresh_secret as string,
      config.refresh_expire as string
    );
  return {res, accessToken, refreshToken};
};
const getAllUsersFromDB = async (query: Record<string, unknown>) => {
  const customerQuery = new QueryBuilder(User.find(), query).filter().paginate().fieldsLimiting();
  const result = await customerQuery.modelQuery;
  const meta = await customerQuery.countTotal();
  return {
    meta,
    result,
  };
};
const getSingleUsersFromDB = async (email:string) => {
  const result = await User.findOne({email});
  return result;
};

const blockUnblockUser = async (id: string, query: Record<string, unknown>) => {
  const user = await User.findOne(new mongoose.Types.ObjectId(id));
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User is not found !!');
  }
  // if (user?.isBlocked) {
  //   throw new AppError(httpStatus.OK, 'User is already blocked !!');
  // }

  const res = await User.findByIdAndUpdate(id, {
    $set: {
      isBlocked: query?.isBlock,
    },
  });
  return res;
};

const changePassword = async (
  userData: JwtPayload,
  payload: { oldPassword: string; newPassword: string }
) => {
  // console.log(userData)
  const {email} = userData;
  const user = await User.findOne({email}).select("email password isBlocked role"); // because in user.model.ts i used return await User.findOne({email}).select("+password");
  // console.log(user)

  // const user = await User.isUserExistsByCustomID(userData?.id);


  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "User is not found!");
  }

  // const isUserDeleted = user?.isDeleted;
  // if (isUserDeleted) {
  //   throw new AppError(httpStatus.FORBIDDEN, "User is Deleted!");
  // }


  const userStauts = user?.isBlocked;
  if (userStauts) {
    throw new AppError(httpStatus.FORBIDDEN, "User is blocked!");
  }




  const isPasswordMatched = await User.isPasswordMaatched(
    payload?.oldPassword,
    user?.password
  );
  if (!isPasswordMatched) {
    throw new AppError(httpStatus.FORBIDDEN, "Password does not match");
  }


  const newHashedPass = await bcrypt.hash(payload?.newPassword, 12);

  await User.findOneAndUpdate(
    { email: userData.email, role: userData.role },
    {
      password: newHashedPass,
      needsPasswordChange: false,
      passwordChangeAt: new Date(),
    }
  );

  return null; // pass pathano jabe na. tai null
};

export const UserService = {
  createUserIngoDB,
  blockUnblockUser,
  getAllUsersFromDB,
  getSingleUsersFromDB,
  changePassword
};
