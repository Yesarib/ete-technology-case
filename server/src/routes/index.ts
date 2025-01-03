import express from 'express'
const router = express.Router();
import authRoutes from './auth.routes'
import companyRoutes from './company.routes'
import productRoutes from './product.routes'
import userRoutes from './user.routes'


const routes = () => {
    router.use('/auth', authRoutes)
    router.use('/company', companyRoutes)
    router.use('/product', productRoutes)
    router.use('/user', userRoutes)

    return router;
}

export default routes;