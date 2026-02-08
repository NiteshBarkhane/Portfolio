import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Admin from './models/Admin.js';

dotenv.config();

/**
 * Secure Admin Setup Script
 * Run this script once to create the initial admin account.
 * Set ADMIN_USERNAME and ADMIN_PASSWORD in your .env file before running.
 * 
 * Usage: node setup-admin.js
 */

const setupAdmin = async () => {
    try {
        const adminUsername = process.env.ADMIN_USERNAME;
        const adminPassword = process.env.ADMIN_PASSWORD;

        if (!adminUsername || !adminPassword) {
            console.error('❌ Error: ADMIN_USERNAME and ADMIN_PASSWORD must be set in .env file');
            console.log('\nAdd these to your .env file:');
            console.log('ADMIN_USERNAME=your_username');
            console.log('ADMIN_PASSWORD=your_secure_password');
            process.exit(1);
        }

        await mongoose.connect(process.env.MONGO_URI);
        console.log('✅ Connected to MongoDB');

        // Check if admin already exists
        const adminExists = await Admin.findOne({ username: adminUsername });
        if (adminExists) {
            console.log(`⚠️  Admin user '${adminUsername}' already exists. Skipping creation.`);
            process.exit(0);
        }

        // Create new admin
        const newAdmin = new Admin({
            username: adminUsername,
            password: adminPassword
        });
        await newAdmin.save();

        console.log(`✅ Admin user '${adminUsername}' created successfully!`);
        console.log('⚠️  Make sure to keep your credentials secure.');
        process.exit(0);
    } catch (err) {
        console.error('❌ Error setting up admin:', err.message);
        process.exit(1);
    }
};

setupAdmin();
