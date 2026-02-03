import express from 'express';
const router = express.Router();
import {
    getAll, createOne, updateOne, deleteOne,
    getSettings, updateSetting, uploadImage
} from '../controllers/contentController.js';
import { login, verifyToken } from '../controllers/authController.js';
import { upload } from '../config/cloudinary.js';

import Project from '../models/Project.js';
import Skill from '../models/Skill.js';
import Service from '../models/Service.js';
import Contact from '../models/Contact.js';

// Auth
router.post('/auth/login', login);

// Projects
router.get('/projects', getAll(Project));
router.post('/projects', verifyToken, upload.single('image'), createOne(Project));
router.put('/projects/:id', verifyToken, upload.single('image'), updateOne(Project));
router.delete('/projects/:id', verifyToken, deleteOne(Project));

// Skills
router.get('/skills', getAll(Skill));
router.post('/skills', verifyToken, createOne(Skill));
router.put('/skills/:id', verifyToken, updateOne(Skill));
router.delete('/skills/:id', verifyToken, deleteOne(Skill));

// Services
router.get('/services', getAll(Service));
router.post('/services', verifyToken, createOne(Service));
router.put('/services/:id', verifyToken, updateOne(Service));
router.delete('/services/:id', verifyToken, deleteOne(Service));

// Settings
router.get('/settings', getSettings);
router.post('/settings', verifyToken, updateSetting);

// Contact
router.post('/contact', createOne(Contact));
router.get('/contact', verifyToken, getAll(Contact));
router.delete('/contact/:id', verifyToken, deleteOne(Contact));

// General Upload
router.post('/upload', verifyToken, upload.single('image'), uploadImage);

export default router;

