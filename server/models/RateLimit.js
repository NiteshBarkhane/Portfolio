import mongoose from 'mongoose';

const rateLimitSchema = new mongoose.Schema({
    identifier: { type: String, required: true, index: true },
    endpoint: { type: String, required: true },
    expiresAt: { type: Date, required: true, index: true }
}, { timestamps: true });

rateLimitSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

export default mongoose.model('RateLimit', rateLimitSchema);
