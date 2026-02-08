import express from 'express';
import { getSkills, getAllSkills, createSkill, updateSkill, deleteSkill, toggleSkillStatus } from '../controllers/skillController.js';
import { verifyToken } from '../controllers/authController.js';
import { upload } from '../config/cloudinary.js';

const router = express.Router();

router.get('/', getSkills);
router.get('/all', verifyToken, getAllSkills);
router.post('/', verifyToken, upload.single('icon'), createSkill);
router.put('/:id', verifyToken, upload.single('icon'), updateSkill);
// Add this line
router.put('/:id/publish', verifyToken, toggleSkillStatus);

export default router;
