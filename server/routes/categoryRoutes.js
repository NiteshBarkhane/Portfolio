import express from 'express';
import { getCategories, createCategory, updateCategory, deleteCategory, toggleCategoryStatus } from '../controllers/categoryController.js';
import { verifyToken } from '../controllers/authController.js';

const router = express.Router();

router.get('/', getCategories);
router.post('/', verifyToken, createCategory);
router.put('/:id', verifyToken, updateCategory);
// Add this line
router.put('/:id/publish', verifyToken, toggleCategoryStatus);

export default router;
