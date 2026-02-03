import mongoose from 'mongoose';

const SkillSchema = new mongoose.Schema({
    name: { type: String, required: true },
    percentage: { type: Number, required: true },
    icon: { type: String },
}, { timestamps: true });

export default mongoose.model('Skill', SkillSchema);
