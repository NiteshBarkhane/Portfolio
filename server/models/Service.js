import mongoose from 'mongoose';

const ServiceSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    iconName: { type: String },
    iconPath: { type: String },
    isPublished: { type: Boolean, default: true },
}, { timestamps: true });

export default mongoose.model('Service', ServiceSchema);
