import mongoose from 'mongoose';

const skillSchema = new mongoose.Schema({
    name: { type: String, required: true },
    icon: { type: String, required: true },
    order: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
    isPublished: { type: Boolean, default: true }
}, { timestamps: true });

export default mongoose.model('Skill', skillSchema);
