import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import { blogService } from "./blogs.service";


const createBlog = catchAsync(async(req, res) => {
    const user = req.user;
    // console.log(user)
    const {email} = user;

    const result = await blogService.createBlogIntoDB(req.body, email)

    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: 'Blog created successfully',
        data: result
    })
})

const updateBlog = catchAsync(async(req, res) => {

    const {id} = req.params;
    const {email} = req.user;
    
    const result = await blogService.updateBlogIntoDB(id as string,req.body, email)

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Blog updated successfully',
        data: result
    })
})

const deleteBlog = catchAsync(async(req, res) => {

    const {id} = req.params;
    const {email} = req.user;
    
    await blogService.deleteBlogFromDB(id, email);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Blog deleted successfully',
        data: null
    })
})

const getBlogs = catchAsync(async(req, res) => {

    // console.log({'req.user': req.user});
    const result = await blogService.getAllBlogs(req.query);
    // console.log(req.cookies)
    

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Blogs fetched successfully',
        data: result
    })
})

const adminDeleteBlog = catchAsync(async(req, res) => {
    const {id} = req.params;
    await blogService.deleteBlogByAdmin(id)
  
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Blog deleted successfully',
        data: {
           
        }
    })
})


export const BlogController = {
    createBlog,
    updateBlog,
    deleteBlog,
    getBlogs,
    adminDeleteBlog
}