import { Router } from "express";
import { UserRoutes } from "../modules/Users/user.route";
import { BlogsRoute } from "../modules/blogs/blogs.route";
import { AuthValidationRoute } from "../modules/auth/auth.route";
import { AdminRoutes } from "../modules/Users/user.admin.route";
import { ProductRoutes } from "../modules/Products/product.routes";
import { OrderRoutes } from "../modules/payment/payment.route";
import { rentRequestRoutes } from "../modules/rentRequest/rent.route";

const router = Router();

const moduleroutes = [
    {
        path: '/users',
        route: UserRoutes
    },
    {
        path: '/blogs',
        route: BlogsRoute
    },
    {
        path: '/auth',
        route: AuthValidationRoute
    },
    {
        path: '/admin',
        route: AdminRoutes
    },
    {
        path: '/product',
        route: ProductRoutes
    },
    {
        path: '/orders',
        route: OrderRoutes
    },
    {
        path: '/rentRequest',
        route: rentRequestRoutes
    },

]

moduleroutes.forEach((route) => router.use(route.path, route.route))

export default router;