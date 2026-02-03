import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Project from './models/Project.js';
import Skill from './models/Skill.js';
import Service from './models/Service.js';

dotenv.config();

// Sample data structure - Replace with your actual data
// DO NOT commit real project data to version control
const projects = [
    // Example:
    // {
    //     title: "Your Project Title",
    //     description: "Your project description",
    //     image: "https://your-image-url.com/image.jpg",
    //     category: "Category Name",
    //     link: "https://your-project-link.com",
    //     github: "https://github.com/your-username/repo"
    // }
];

const skills = [
    // Example:
    // { name: "Skill Name", percentage: 90, icon: "IconName" }
];

const services = [
    // Example:
    // {
    //     title: "Service Title",
    //     description: "Service description",
    //     icon: "IconName"
    // }
];

const seedDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB');

        await Project.deleteMany({});
        await Skill.deleteMany({});
        await Service.deleteMany({});

        await Project.insertMany(projects);
        await Skill.insertMany(skills);
        await Service.insertMany(services);

        console.log('Database Seeded Successfully');
        process.exit();
    } catch (err) {
        console.error('Error seeding database:', err);
        process.exit(1);
    }
};

seedDB();
