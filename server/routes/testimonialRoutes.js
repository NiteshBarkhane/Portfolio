import express from 'express';
import {
    submitTestimonial,
    getFeaturedTestimonials,
    getAllTestimonials,
    togglePublish,
    toggleFeature,
    deleteTestimonial
} from '../controllers/testimonialController.js';
import { verifyToken } from '../controllers/authController.js';
import { upload } from '../config/cloudinary.js';

const router = express.Router();

router.post('/submit', upload.single('userImage'), submitTestimonial);
router.get('/featured', getFeaturedTestimonials);
router.get('/', verifyToken, getAllTestimonials);
router.put('/:id/publish', verifyToken, togglePublish);
router.put('/:id/feature', verifyToken, toggleFeature);
router.delete('/:id', verifyToken, deleteTestimonial);

export default router;
