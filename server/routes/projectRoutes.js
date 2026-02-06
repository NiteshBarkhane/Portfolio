import express from 'express';
import { getProjects, createProject, updateProject, deleteProject } from '../controllers/projectController.js';
import { verifyToken } from '../controllers/authController.js';
import { upload } from '../config/cloudinary.js';

const router = express.Router();

router.get('/', getProjects);
router.post('/', verifyToken, upload.single('image'), createProject);
router.put('/:id', verifyToken, upload.single('image'), updateProject);
router.delete('/:id', verifyToken, deleteProject);

export default router;
