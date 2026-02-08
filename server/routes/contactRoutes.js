import express from 'express';
import { createContact, getInquiryUsers, getChatMessages, markAsRead, deleteInquiry } from '../controllers/contactController.js';
import { verifyToken } from '../controllers/authController.js';

const router = express.Router();

router.post('/', createContact);
router.get('/users', verifyToken, getInquiryUsers);
router.get('/messages/:email', verifyToken, getChatMessages);
router.post('/read', verifyToken, markAsRead);
router.delete('/:email', verifyToken, deleteInquiry);

export default router;
