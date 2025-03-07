
import express from 'express';
import AuthMiddleware from '../../middlewares/AuthMiddleware';
import { UserRole } from '../User/user.constant';
import { createInfo, deleteInfo, getAllInfo, updateInfo } from './info.controller';
import validateRequest from '../../middlewares/validateRequest';
import { createInfoSchema } from './info.validation';

const router = express.Router();

router.post('/create-info', AuthMiddleware(UserRole.admin), validateRequest(createInfoSchema), createInfo);
router.delete('/delete-info/:infoId', AuthMiddleware(UserRole.admin), deleteInfo);
router.get('/get-all-info', getAllInfo);
router.put('/update-info/:infoId', updateInfo);




export const InfoRoutes = router;
