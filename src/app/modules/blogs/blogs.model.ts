import { model, Schema } from "mongoose";
import { TBlog } from "./blogs.interface";



const blogSchema = new Schema<TBlog>({
    title: {
        type: String,
        required: [true, "Blog title is required"],
    },
    content: {
        type: String,
        required: [true, "Blog Content is required"],
    },
    author: {
        type: Schema.Types.ObjectId,
        required: [true, 'User id is required'],
        ref: 'User'
    },
    isPublished: {
        type: Boolean,
        default:  true
    }
}, {timestamps: true});



export const Blog = model<TBlog>('Blog', blogSchema);