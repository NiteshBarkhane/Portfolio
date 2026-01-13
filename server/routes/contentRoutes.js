const express = require('express');
const router = express.Router();
const { getAll, createOne, updateOne, deleteOne } = require('../controllers/contentController');
const Project = require('../models/Project');
const Skill = require('../models/Skill');
const Service = require('../models/Service');
const Contact = require('../models/Contact');

// Projects
router.get('/projects', getAll(Project));
router.post('/projects', createOne(Project));
router.put('/projects/:id', updateOne(Project));
router.delete('/projects/:id', deleteOne(Project));

// Skills
router.get('/skills', getAll(Skill));
router.post('/skills', createOne(Skill));
router.put('/skills/:id', updateOne(Skill));
router.delete('/skills/:id', deleteOne(Skill));

// Services
router.get('/services', getAll(Service));
router.post('/services', createOne(Service));
router.put('/services/:id', updateOne(Service));
router.delete('/services/:id', deleteOne(Service));

// Contact (POST only for public, GET/DELETE for admin)
router.post('/contact', createOne(Contact));
router.get('/contact', getAll(Contact));
router.delete('/contact/:id', deleteOne(Contact));

module.exports = router;
