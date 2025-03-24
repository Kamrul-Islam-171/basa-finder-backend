import QueryBuilder from '../../builder/QueryBuilder';
import { sendEmail } from '../../utils/sendEmail';
import { ProductModel } from '../Products/product.model';
import { TRentalRequest } from './rent.interface';
import RentalRequest from './rent.model';

const createRentRequestIntoDB = async (rentRequest: TRentalRequest) => {
  const result = (await RentalRequest.create(rentRequest)).populate('houseId');
  const houseInfo = await ProductModel.findOne({_id: rentRequest?.houseId});
  const phoneNo = "01771768463"

const html = `
  <h2>Dear House Owner,</h2>
  <p>I have a rent request for the house at <strong>${houseInfo?.location}</strong>.</p>
  <p><strong>Rent Amount:</strong> ${houseInfo?.rentAmount} Tk</p>
  <p><strong>Move-in Date:</strong> ${rentRequest?.moveInDate}</p>
  <p><strong>Contact no:</strong> ${phoneNo}</p>
  <p>If you have any questions, please contact us.</p>
`;
await sendEmail(rentRequest.requestEmail as string, rentRequest?.ownerEmail as string, undefined, html)

  return result;
};

const getAllRentReqFromDB = async (
  email: string,
  query: Record<string, unknown>,
) => {
  // const res = await RentalRequest.find({requestEmail:email});

  const rentQuery = new QueryBuilder(
    RentalRequest.find({ requestEmail: email }).populate("houseId"),
    query,
  ).paginate();
  const result = await rentQuery.modelQuery;
  const meta = await rentQuery.countTotal();
  return { meta, result };
};
const getAllRentReqForOwnLanlordFromDB = async (
  email: string,
  query: Record<string, unknown>,
) => {
  // const res = await RentalRequest.find({requestEmail:email});

  const rentQuery = new QueryBuilder(
    RentalRequest.find({ ownerEmail: email }).populate("houseId"),
    query,
  ).paginate();
  const result = await rentQuery.modelQuery;
  const meta = await rentQuery.countTotal();
  return { meta, result };
};

const getSingleRentReqFromDB = async (
  email: string,
  id:string
) => {
  const res = await RentalRequest.findOne({requestEmail:email, _id:id}).populate('houseId');
  return res;

  
};

const changeStatusFromDB = async(payload:string, id:string) => {

  const res = await RentalRequest.findByIdAndUpdate({_id:id}, {status: payload}, {new: true});
  const houseInfo = await ProductModel.findOne({_id: res?.houseId});
  // console.log(houseInfo?.rentAmount);

  const subject = res?.status === "approved" 
  ? "Your Rental Request is Approved!" 
  : "Your Rental Request is Rejected!";

  const phoneNo = "01983768473"

const html = `
  <h2>Dear User,</h2>
  <p>Your rental request for the house at <strong>${houseInfo?.location}</strong> has been <strong>${res?.status}</strong>.</p>
  <p><strong>Rent Amount:</strong> ${houseInfo?.rentAmount} Tk</p>
  <p><strong>Move-in Date:</strong> ${res?.moveInDate}</p>
  <p><strong>Contact no:</strong> ${phoneNo}</p>
  <p>If you have any questions, please contact us.</p>
`;

  await sendEmail(res?.ownerEmail as string, res?.requestEmail as string, subject, html)
  // await sendEmail('as9172191@gmail.com' as string, subject, html)
  return res;

}


export const rentService = {
  createRentRequestIntoDB,
  getAllRentReqFromDB,
  getSingleRentReqFromDB,
  getAllRentReqForOwnLanlordFromDB,
  changeStatusFromDB
};
