import mongoose from 'mongoose';

const testimonialSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    company: { type: String, default: '' },
    rating: { type: Number, required: true, min: 1, max: 5 },
    text: { type: String, required: true, maxlength: 500 },
    userImage: { type: String, default: '' },
    isPublished: { type: Boolean, default: false },
    isFeatured: { type: Boolean, default: false },
    submittedIP: { type: String }
}, { timestamps: true });

export default mongoose.model('Testimonial', testimonialSchema);
