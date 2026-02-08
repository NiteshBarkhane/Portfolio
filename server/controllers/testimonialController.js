import Testimonial from '../models/Testimonial.js';
import RateLimit from '../models/RateLimit.js';
import nodemailer from 'nodemailer';
import { deleteFromCloudinary } from '../config/cloudinary.js';

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

const sendNotificationEmail = async (testimonial) => {
    try {
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: process.env.EMAIL_USER,
            subject: '⭐ New Testimonial Received',
            html: `
                <h2>New Testimonial Submitted</h2>
                <p><strong>Name:</strong> ${testimonial.name}</p>
                <p><strong>Email:</strong> ${testimonial.email}</p>
                <p><strong>Company:</strong> ${testimonial.company || 'N/A'}</p>
                <p><strong>Rating:</strong> ${'⭐'.repeat(testimonial.rating)}</p>
                <p><strong>Testimonial:</strong></p>
                <p>${testimonial.text}</p>
                <p><a href="${process.env.CLIENT_URL || 'http://localhost:5173'}/admin/testimonials">View in Admin Panel</a></p>
            `
        });
    } catch (error) {
        console.error('Email notification failed:', error);
    }
};

export const submitTestimonial = async (req, res) => {
    try {
        const { name, email, company, rating, text } = req.body;
        const ip = req.ip || req.connection.remoteAddress;

        const existing = await RateLimit.findOne({
            identifier: email.toLowerCase(),
            endpoint: 'testimonial',
            expiresAt: { $gt: new Date() }
        });

        if (existing) {
            return res.status(429).json({ 
                message: 'You can only submit one testimonial per day. Please try again later.' 
            });
        }

        let userImage = '';
        if (req.file) {
            userImage = req.file.path;
        }

        const testimonial = new Testimonial({
            name,
            email: email.toLowerCase(),
            company,
            rating,
            text,
            userImage,
            submittedIP: ip
        });

        await testimonial.save();

        await RateLimit.create({
            identifier: email.toLowerCase(),
            endpoint: 'testimonial',
            expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000)
        });

        sendNotificationEmail(testimonial);

        res.status(201).json({ message: 'Thank you! Your testimonial is pending approval.' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const getFeaturedTestimonials = async (req, res) => {
    try {
        const testimonials = await Testimonial.find({ 
            isPublished: true, 
            isFeatured: true 
        }).sort({ createdAt: -1 }).limit(9);
        res.json(testimonials);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getAllTestimonials = async (req, res) => {
    try {
        const { search } = req.query;
        let query = {};

        if (search) {
            query = {
                $or: [
                    { name: { $regex: search, $options: 'i' } },
                    { email: { $regex: search, $options: 'i' } },
                    { text: { $regex: search, $options: 'i' } }
                ]
            };
        }

        const testimonials = await Testimonial.find(query).sort({ createdAt: -1 });
        res.json({ testimonials, searchTerm: search || '' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const togglePublish = async (req, res) => {
    try {
        const testimonial = await Testimonial.findById(req.params.id);
        if (!testimonial) return res.status(404).json({ message: 'Testimonial not found' });

        testimonial.isPublished = !testimonial.isPublished;
        await testimonial.save();
        res.json(testimonial);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const toggleFeature = async (req, res) => {
    try {
        const testimonial = await Testimonial.findById(req.params.id);
        if (!testimonial) return res.status(404).json({ message: 'Testimonial not found' });

        if (!testimonial.isFeatured) {
            const featuredCount = await Testimonial.countDocuments({ isFeatured: true });
            if (featuredCount >= 9) {
                return res.status(400).json({ message: 'Maximum 9 testimonials can be featured' });
            }
        }

        testimonial.isFeatured = !testimonial.isFeatured;
        await testimonial.save();
        res.json(testimonial);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const deleteTestimonial = async (req, res) => {
    try {
        const testimonial = await Testimonial.findById(req.params.id);
        if (!testimonial) return res.status(404).json({ message: 'Testimonial not found' });

        if (testimonial.userImage) await deleteFromCloudinary(testimonial.userImage);
        await testimonial.deleteOne();
        res.json({ message: 'Testimonial deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
