const mongoose = require('mongoose');

const SkillSchema = new mongoose.Schema({
    name: { type: String, required: true },
    percentage: { type: Number, required: true },
    icon: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('Skill', SkillSchema);
