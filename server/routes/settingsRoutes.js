import express from 'express';
import { getSettings, updateSetting } from '../controllers/settingsController.js'; // Adjust if previously contentController
import { verifyToken } from '../controllers/authController.js';
import { upload } from '../config/cloudinary.js';

const router = express.Router();

router.get('/', getSettings);
router.post('/', verifyToken, upload.single('image'), updateSetting);

export default router;
