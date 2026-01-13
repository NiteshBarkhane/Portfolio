const Project = require('../models/Project');
const Skill = require('../models/Skill');
const Service = require('../models/Service');
const Contact = require('../models/Contact');

// Generic handler for getting all items
exports.getAll = (Model) => async (req, res) => {
    try {
        const items = await Model.find().sort({ createdAt: -1 });
        res.json(items);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Generic handler for creating an item
exports.createOne = (Model) => async (req, res) => {
    try {
        const newItem = new Model(req.body);
        const savedItem = await newItem.save();
        res.status(201).json(savedItem);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Generic handler for updating an item
exports.updateOne = (Model) => async (req, res) => {
    try {
        const updatedItem = await Model.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedItem);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Generic handler for deleting an item
exports.deleteOne = (Model) => async (req, res) => {
    try {
        await Model.findByIdAndDelete(req.params.id);
        res.json({ message: 'Item deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
