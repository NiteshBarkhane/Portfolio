import mongoose from 'mongoose';

const SettingSchema = new mongoose.Schema({
    key: { type: String, required: true, unique: true },
    value: { type: mongoose.Schema.Types.Mixed, required: true },
    category: { type: String, default: 'general' }
}, { timestamps: true });

export default mongoose.model('Setting', SettingSchema);
