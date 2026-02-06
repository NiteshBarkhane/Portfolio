import Contact from '../models/Contact.js';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

export const createContact = async (req, res) => {
    try {
        const { name, email, phone, message } = req.body;
        const newContact = new Contact({ name, email, phone, message });
        await newContact.save();

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: 'niteshbarkhane123@gmail.com',
            subject: `New Portfolio Inquiry from ${name}`,
            text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone || 'N/A'}\n\nMessage:\n${message}`
        };

        try {
            await transporter.sendMail(mailOptions);
        } catch (error) {
            console.error('Email error:', error);
        }

        res.status(201).json(newContact);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const getInquiryUsers = async (req, res) => {
    try {
        const users = await Contact.aggregate([
            { $sort: { createdAt: -1 } },
            {
                $group: {
                    _id: "$email",
                    name: { $first: "$name" },
                    email: { $first: "$email" },
                    phone: { $first: "$phone" },
                    recentMessage: { $first: "$message" },
                    createdAt: { $first: "$createdAt" },
                    unreadCount: { $sum: { $cond: [{ $eq: ["$isRead", false] }, 1, 0] } }
                }
            },
            { $sort: { createdAt: -1 } }
        ]);
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getChatMessages = async (req, res) => {
    try {
        const messages = await Contact.find({ email: req.params.email }).sort({ createdAt: 1 });
        res.json(messages);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const markAsRead = async (req, res) => {
    try {
        await Contact.updateMany({ email: req.body.email, isRead: false }, { isRead: true });
        res.json({ message: 'Marked as read' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteInquiry = async (req, res) => {
    try {
        await Contact.deleteMany({ email: req.params.email });
        res.json({ message: 'Inquiry deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
