import Skill from '../models/Skill.js';
import { deleteFromCloudinary } from '../config/cloudinary.js';

export const getSkills = async (req, res) => {
    try {
        const skills = await Skill.find({ isActive: true }).sort({ order: 1 });
        res.json(skills);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getAllSkills = async (req, res) => {
    try {
        const { search } = req.query;
        let query = {};
        if (search) {
            query.name = { $regex: search, $options: 'i' };
        }
        const skills = await Skill.find(query).sort({ order: 1 });
        res.json(skills);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const createSkill = async (req, res) => {
    try {
        const { name, order } = req.body;
        let icon = '';

        if (req.file) {
            icon = req.file.path;
        }

        const skill = new Skill({ name, icon, order: order || 0 });
        await skill.save();
        res.status(201).json(skill);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const updateSkill = async (req, res) => {
    try {
        const { name, order, isActive } = req.body;
        const skill = await Skill.findById(req.params.id);

        if (!skill) return res.status(404).json({ message: 'Skill not found' });

        if (req.file) {
            if (skill.icon) await deleteFromCloudinary(skill.icon);
            skill.icon = req.file.path;
        }

        skill.name = name || skill.name;
        skill.order = order !== undefined ? order : skill.order;
        skill.isActive = isActive !== undefined ? isActive : skill.isActive;

        await skill.save();
        res.json(skill);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const deleteSkill = async (req, res) => {
    try {
        const skill = await Skill.findById(req.params.id);
        if (!skill) return res.status(404).json({ message: 'Skill not found' });

        if (skill.icon) await deleteFromCloudinary(skill.icon);
        await skill.deleteOne();
        res.json({ message: 'Skill deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const toggleSkillStatus = async (req, res) => {
    try {
        const skill = await Skill.findById(req.params.id);
        if (!skill) return res.status(404).json({ message: 'Skill not found' });

        skill.isPublished = !skill.isPublished;
        await skill.save();
        res.json(skill);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
