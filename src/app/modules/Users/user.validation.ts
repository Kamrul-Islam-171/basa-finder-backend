import {z} from 'zod';
import { Role } from './user.constant';
const createUserValidation = z.object({
    body: z.object({
       name: z.string().min(1, "Name is required").max(20) ,
       email: z.string().email("{VALUE} is not a valid email type"),
       password: z.string().min(1, "Password is required"),
       role : z.enum([...Role] as [string, ...string[]]).default('user'),
    })
})

const changePasswordValidationSchema = z.object({
    body : z.object({
        
        oldPassword:z.string({required_error:"oldPassword is required !"}),
        newPassword:z.string({required_error:"newPassword is required !"})
    })
})

const blockUserValidation = z.object({
    body: z.object({
        userId:z.string().optional()
    })
})

export const UserValidation = {
    createUserValidation,
    blockUserValidation,
    changePasswordValidationSchema
}