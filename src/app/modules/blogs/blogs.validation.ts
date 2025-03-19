import { z } from "zod";

const createBlogValidation = z.object({
    body: z.object({
        title: z.string().min(1, "Title is required"),
        content: z.string().min(1, "Content is required"),
        
    })
})

const updateBlogValidation = z.object({
    body: z.object({
        title: z.string().min(1, "Title is required").optional(),
        content: z.string().min(1, "Content is required").optional(),
    })
})

export const blogValidation = {
    createBlogValidation,
    updateBlogValidation
}
