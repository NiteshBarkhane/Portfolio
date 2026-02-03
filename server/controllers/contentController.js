import Project from '../models/Project.js';
import Skill from '../models/Skill.js';
import Service from '../models/Service.js';
import Contact from '../models/Contact.js';
import Setting from '../models/Setting.js';
import { cloudinary } from '../config/cloudinary.js';

// Generic handler for getting all items
export const getAll = (Model) => async (req, res) => {
    try {
        const items = await Model.find().sort({ createdAt: -1 });
        res.json(items);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Generic handler for creating an item with optional file upload
export const createOne = (Model) => async (req, res) => {
    try {
        const data = { ...req.body };
        if (req.file) {
            data.image = req.file.path; // Cloudinary URL from multer-storage-cloudinary
        }
        const newItem = new Model(data);
        const savedItem = await newItem.save();
        res.status(201).json(savedItem);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Generic handler for updating an item with optional file upload
export const updateOne = (Model) => async (req, res) => {
    try {
        const data = { ...req.body };
        if (req.file) {
            data.image = req.file.path;
        }
        const updatedItem = await Model.findByIdAndUpdate(req.params.id, data, { new: true });
        res.json(updatedItem);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Generic handler for deleting an item
export const deleteOne = (Model) => async (req, res) => {
    try {
        const item = await Model.findById(req.params.id);
        if (item && item.image && item.image.includes('cloudinary')) {
            // Optional: Delete from cloudinary if needed
            // const publicId = item.image.split('/').pop().split('.')[0];
            // await cloudinary.uploader.destroy(`portfolio/${publicId}`);
        }
        await Model.findByIdAndDelete(req.params.id);
        res.json({ message: 'Item deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Settings Handlers
export const getSettings = async (req, res) => {
    try {
        const settings = await Setting.find();
        res.json(settings);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateSetting = async (req, res) => {
    try {
        const { key, value } = req.body;
        const setting = await Setting.findOneAndUpdate({ key }, { value }, { upsert: true, new: true });
        res.json(setting);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const uploadImage = (req, res) => {
    if (!req.file) return res.status(400).json({ message: 'No file uploaded' });
    res.json({ url: req.file.path });
};
