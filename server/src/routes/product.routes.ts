import express from 'express'
import { deleteProduct, getProductById, newProduct, products, updateProduct } from '../controllers/product.controller';
import { verifyToken } from '../middlewares/jwt.middleware';
const router = express.Router();


router.post('/', verifyToken, newProduct)
router.get('/', verifyToken, products)
router.get('/:productId', verifyToken, getProductById)
router.put('/:productId', verifyToken, updateProduct)
router.delete('/:productId', verifyToken, deleteProduct)

export default router;