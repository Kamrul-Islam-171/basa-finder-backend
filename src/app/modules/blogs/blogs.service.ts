
import { Types } from "mongoose";
import { User } from "../Users/user.model";
import { TBlog } from "./blogs.interface"
import { Blog } from "./blogs.model"
import AppError from "../../errors/AppError";
import httpStatus from "http-status";
import QueryBuilder from "../../builder/QueryBuilder";
import { blogSearchAbleField } from "./blogs.constant";
// import { blogSearchAbleField } from "./blogs.constant";

const createBlogIntoDB = async(payload: TBlog, email:string) => {

    // const id: Types.ObjectId = new Types.ObjectId(payload.author)
    // const user = await User.isUserExists(id.toString());
    const user = await User.findOne({email});
    const id: Types.ObjectId = new Types.ObjectId(user?._id)
    payload.author = id;
    // console.log(payload)
    if(!user) {
        throw new AppError(httpStatus.NOT_FOUND, "User is not found")
    }
    const res = await Blog.create(payload);
    return res;
    // return null;
}

const updateBlogIntoDB = async(id: string, payload: Partial<TBlog>, email:string) => {
    // first check if this id is exist
    const isBlogExists = await Blog.findById(id);
    
    if(!isBlogExists) {
        throw new AppError(httpStatus.NOT_FOUND, "Blog is not found!");
    }

    const user = await User.findById(isBlogExists.author);
    if(email !== user?.email) {
        throw new AppError(httpStatus.UNAUTHORIZED, "You are Unathorized to update !!")
    }
    const res = await Blog.findByIdAndUpdate(id, payload, {new: true}).populate('author');
    return res;
}

const deleteBlogFromDB = async(id: string, email: string) => {
    // first check if this id is exist
    const isBlogExists = await Blog.findById(id);
    
    if(!isBlogExists) {
        throw new AppError(httpStatus.NOT_FOUND, "Blog is not found!");
    }

    const user = await User.findById(isBlogExists.author);
    if(email !== user?.email) {
        throw new AppError(httpStatus.UNAUTHORIZED, "You are Unathorized to Delete !!")
    }

    const res = await Blog.findByIdAndDelete(id);
    return res;
}

const getAllBlogs = async(query: Record<string, unknown>) => {
    // console.log(query)
    const blogQuery = new QueryBuilder(Blog.find().populate('author'), query).search(blogSearchAbleField).filter().sort().sortOrder();

    const res = await blogQuery.modelQuery;
    return res;
}

const deleteBlogByAdmin = async(id : string) => {
    const blog = await Blog.findById(id);
    // console.log(blog)
    if(!blog) {
        throw new AppError(httpStatus.NOT_FOUND, "Blog is not found!!")
    }
    const res = await Blog.findByIdAndDelete(id);
    return res;

}

export const blogService = {
    createBlogIntoDB,
    updateBlogIntoDB,
    deleteBlogFromDB,
    getAllBlogs,
    deleteBlogByAdmin
}

