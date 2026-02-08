import express from 'express';
import { getPublishedFAQs, getAllFAQs, createFAQ, updateFAQ, togglePublish, deleteFAQ } from '../controllers/faqController.js';
import { verifyToken } from '../controllers/authController.js';

const router = express.Router();

router.get('/published', getPublishedFAQs);
router.get('/', verifyToken, getAllFAQs);
router.post('/', verifyToken, createFAQ);
router.put('/:id', verifyToken, updateFAQ);
router.put('/:id/publish', verifyToken, togglePublish);
router.delete('/:id', verifyToken, deleteFAQ);

export default router;
