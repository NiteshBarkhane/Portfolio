import express from 'express';
import { getServices, createService, updateService, deleteService, toggleServiceStatus } from '../controllers/serviceController.js';
import { verifyToken } from '../controllers/authController.js';

const router = express.Router();

router.get('/', getServices);
router.post('/', verifyToken, createService);
router.put('/:id', verifyToken, updateService);
// Add this line
router.put('/:id/publish', verifyToken, toggleServiceStatus);

export default router;
