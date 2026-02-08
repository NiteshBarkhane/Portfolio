import express from 'express';
import { getSkills, getAllSkills, createSkill, updateSkill, deleteSkill } from '../controllers/skillController.js';
import { verifyToken } from '../controllers/authController.js';
import { upload } from '../config/cloudinary.js';

const router = express.Router();

router.get('/', getSkills);
router.get('/all', verifyToken, getAllSkills);
router.post('/', verifyToken, upload.single('icon'), createSkill);
router.put('/:id', verifyToken, upload.single('icon'), updateSkill);
router.delete('/:id', verifyToken, deleteSkill);

export default router;
