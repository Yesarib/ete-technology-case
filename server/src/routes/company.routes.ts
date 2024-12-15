import express from 'express'
import { companies, deleteCompany, getCompanyById, newCompany, updateCompany } from '../controllers/company.controller';
import { verifyToken } from '../middlewares/jwt.middleware';

const router = express.Router();
router.post('/', verifyToken, newCompany)
router.get('/', verifyToken, companies)
router.get('/:companyId', verifyToken, getCompanyById)
router.put('/:companyId', verifyToken, updateCompany)
router.delete('/:companyId', verifyToken, deleteCompany)

export default router;