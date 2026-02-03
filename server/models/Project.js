import mongoose from 'mongoose';

const ProjectSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    image: { type: String },
    category: { type: String }, // Website, App, etc.
    link: { type: String },
    github: { type: String },
}, { timestamps: true });

export default mongoose.model('Project', ProjectSchema);
