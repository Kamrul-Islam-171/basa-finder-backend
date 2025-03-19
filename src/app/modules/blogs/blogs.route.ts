
import  express  from 'express';
import { BlogController } from './blogs.controller';
// import ValidateRequest from '../../middlewares/validateRequests';
// import { blogValidation } from './blogs.validation';
// import Auth from '../../middlewares/auth';

const router = express.Router();

// router.post('/',Auth('user'), ValidateRequest(blogValidation.createBlogValidation), BlogController.createBlog);

// router.patch('/:id', Auth('user'), ValidateRequest(blogValidation.updateBlogValidation), BlogController.updateBlog);

// router.delete('/:id',Auth('user'), BlogController.deleteBlog );
router.get('/', BlogController.getBlogs );

export const BlogsRoute = router;