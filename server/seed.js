import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Project from './models/Project.js';
import Service from './models/Service.js';
import Setting from './models/Setting.js';
import Category from './models/Category.js';
import Skill from './models/Skill.js';
import FAQ from './models/FAQ.js';

dotenv.config();

// Initial Data derived from hardcoded frontend values
const categories = [
    { name: 'Web App' },
    { name: 'Landing Page' },
    { name: 'Management System' },
    { name: 'Mobile App' }
];

const projects = [
    {
        title: "Portfolio Website",
        description: "A high-performance portfolio website built with MERN stack.",
        category: "Web App",
        link: "https://yourportfolio.com",
        github: "https://github.com/yourusername/portfolio",
        image: "https://placehold.co/600x600/1a1a2e/7c3aed?text=Portfolio"
    }
];

const services = [
    {
        title: "Web Development",
        description: "Building fast, responsive, and secure websites tailored to your business needs.",
        icon: "Layout"
    },
    {
        title: "App Development",
        description: "Creating seamless mobile experiences for both iOS and Android platforms.",
        icon: "Smartphone"
    },
    {
        title: "UI/UX Design",
        description: "Designing intuitive and visually appealing interfaces that users love.",
        icon: "Palette"
    }
];

const settings = [
    // Hero Section
    { key: "hero_name", value: "Nitesh Barkhane", category: "Hero Section" },
    { key: "hero_badge", value: "Available for Freelance", category: "Hero Section" },
    { key: "hero_main_title_1", value: "Web Developer", category: "Hero Section" },
    { key: "hero_main_title_2", value: "For Any Idea.", category: "Hero Section" },
    { key: "hero_description", value: "I specialize in turning any digital concept into a high-performance reality. From complex web applications to unique creative websites, I bring the technical depth and professional qualities needed to deliver excellence on every project.", category: "Hero Section" },
    { key: "hero_image", value: "", category: "Hero Section" },

    // About Section
    { key: "about_title", value: "Crafting Digital Excellence Since 2023", category: "About Section" },
    { key: "about_desc_1", value: "Based in Indore, India, I started my journey with a passion for turning logic into visual reality. As a versatile Web Developer, I bridge the gap between complex backend systems and beautiful, intuitive front-end designs.", category: "About Section" },
    { key: "about_desc_2", value: "I don't just build websites; I build business solutions. No idea is too big or too niche. From high-scale enterprise platforms to bespoke creative experiments, I ensure the technology stack is modern, scalable, and perfectly aligned with your unique vision.", category: "About Section" },
    { key: "stat_1_label", value: "Projects Completed", category: "About Section" },
    { key: "stat_1_value", value: "10+", category: "About Section" },
    { key: "stat_2_label", value: "Happy Clients", category: "About Section" },
    { key: "stat_2_value", value: "5+", category: "About Section" },
    { key: "stat_3_label", value: "Lines of Code", category: "About Section" },
    { key: "stat_3_value", value: "50k+", category: "About Section" },
    { key: "stat_4_label", value: "Coffee Cups", category: "About Section" },
    { key: "stat_4_value", value: "Infinite", category: "About Section" },

    // Services
    { key: "services_title", value: "Technical Offerings", category: "Services Section" },
    { key: "services_subtitle", value: "I offer comprehensive development capabilities to bring any digital vision to life. From rapid prototyping of new ideas to building robust, enterprise-grade systems, I handle every technical challenge with professional precision.", category: "Services Section" },

    // Portfolio
    { key: "portfolio_title", value: "Featured Projects", category: "Portfolio Section" },
    { key: "portfolio_subtitle", value: "Evidence of versatility. From complex technical architectures to unique creative concepts, these projects showcase my ability to tackle any idea and turn it into a high-performance reality.", category: "Portfolio Section" },

    // Approach
    { key: "approach_title", value: "My Approach", category: "Approach Section" },
    { key: "approach_desc", value: "A transparency-first workflow designed to keep you updated at every stage of the development process.", category: "Approach Section" },

    // Contact
    { key: "contact_title_prefix", value: "Let's", category: "Contact Section" },
    { key: "contact_title_suffix", value: "Work Together", category: "Contact Section" },
    { key: "contact_desc", value: "Have a project in mind or just want to say hi? Feel free to reach out. I'm always open to discussing new projects, creative ideas, or opportunities to be part of your visions.", category: "Contact Section" },
    { key: "contact_info_title", value: "Contact Information", category: "Contact Section" },
    { key: "contact_info_subtitle", value: "Prefer a direct message? You can find me on these platforms or drop an email.", category: "Contact Section" },
    { key: "contact_email", value: "niteshbarkhane123@gmail.com", category: "Contact Section" },
    { key: "contact_location", value: "Indore, India", category: "Contact Section" },

    // Footer
    { key: "footer_phone", value: "+919171535280", category: "Footer" },
    { key: "footer_whatsapp_link", value: "https://wa.me/919171535280", category: "Footer" },
    { key: "footer_linkedin", value: "https://www.linkedin.com/in/nitesh-barkhane-66060b342/", category: "Footer" },
    { key: "footer_github", value: "https://github.com/NiteshBarkhane", category: "Footer" },

    // Pricing Section
    { key: "pricing_title", value: "Transparent Pricing", category: "Pricing Section" },
    { key: "pricing_subtitle", value: "Flexible pricing based on project scope and requirements", category: "Pricing Section" },
    { key: "pricing_note", value: "Pricing is flexible based on project scope, timeline, and requirements. Let's discuss your specific needs.", category: "Pricing Section" },
    { key: "pricing_basic_title", value: "Landing Page", category: "Pricing Section" },
    { key: "pricing_basic_price", value: "₹10,000 - ₹20,000", category: "Pricing Section" },
    { key: "pricing_basic_features", value: "Responsive Design|Contact Form|3-5 Sections|1 Week Delivery", category: "Pricing Section" },
    { key: "pricing_standard_title", value: "Business Website", category: "Pricing Section" },
    { key: "pricing_standard_price", value: "₹30,000 - ₹60,000", category: "Pricing Section" },
    { key: "pricing_standard_features", value: "Multi-page Website|Admin Panel|SEO Optimization|2-3 Weeks Delivery", category: "Pricing Section" },
    { key: "pricing_premium_title", value: "Web Application", category: "Pricing Section" },
    { key: "pricing_premium_price", value: "₹60,000+", category: "Pricing Section" },
    { key: "pricing_premium_features", value: "Full-stack Development|Database Design|API Integration|Custom Timeline", category: "Pricing Section" },

    // Social Media
    { key: "social_twitter", value: "", category: "Social Media" },
    { key: "social_instagram", value: "", category: "Social Media" },
    { key: "social_facebook", value: "", category: "Social Media" },
    { key: "social_youtube", value: "", category: "Social Media" },
    { key: "social_devto", value: "", category: "Social Media" },
    { key: "social_medium", value: "", category: "Social Media" },
    { key: "social_stackoverflow", value: "", category: "Social Media" }
];

const skills = [
    { name: 'React', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg', order: 1 },
    { name: 'Node.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg', order: 2 },
    { name: 'MongoDB', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg', order: 3 },
    { name: 'Express', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg', order: 4 },
    { name: 'JavaScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg', order: 5 },
    { name: 'Tailwind CSS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-plain.svg', order: 6 },
    { name: 'Git', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg', order: 7 },
    { name: 'HTML5', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg', order: 8 },
    { name: 'CSS3', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg', order: 9 }
];

const faqs = [
    { 
        question: 'How long does a typical project take?', 
        answer: 'Project timelines vary based on complexity. A landing page takes 1-2 weeks, while a full web application can take 4-8 weeks. I provide detailed timelines during our initial consultation.', 
        order: 1, 
        isPublished: true 
    },
    { 
        question: 'What is your development process?', 
        answer: 'I follow a structured approach: Requirements Gathering → Design & Planning → Development → Testing → Deployment → Support. You\'ll be updated at every stage with regular progress reports.', 
        order: 2, 
        isPublished: true 
    },
    { 
        question: 'Do you provide post-launch support?', 
        answer: 'Yes! I offer 30 days of free bug fixes after launch. I also provide ongoing maintenance packages for updates, security patches, and feature additions.', 
        order: 3, 
        isPublished: true 
    },
    { 
        question: 'What technologies do you use?', 
        answer: 'I specialize in the MERN stack (MongoDB, Express, React, Node.js) with modern tools like Tailwind CSS, Framer Motion, and Cloudinary. I choose technologies based on your project requirements.', 
        order: 4, 
        isPublished: true 
    },
    { 
        question: 'Can you work with my existing website?', 
        answer: 'Absolutely! I can enhance, redesign, or migrate your existing website to modern technologies. I also offer maintenance and feature additions for existing projects.', 
        order: 5, 
        isPublished: true 
    }
];

const seedDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB');

        // Clear existing data (optional, be careful in prod)
        // await Project.deleteMany({});
        // await Service.deleteMany({});
        // await Setting.deleteMany({});
        // await Category.deleteMany({});

        // Upsert Settings (Update if exists, Insert if new)
        for (const setting of settings) {
            await Setting.findOneAndUpdate(
                { key: setting.key },
                setting,
                { upsert: true, new: true }
            );
        }
        console.log('Settings Seeded');

        // Seed Categories
        for (const cat of categories) {
            await Category.findOneAndUpdate(
                { name: cat.name },
                cat,
                { upsert: true }
            );
        }
        console.log('Categories Seeded');

        // Seed Services if empty
        const sCount = await Service.countDocuments();
        if (sCount === 0) {
            await Service.insertMany(services);
            console.log('Services Seeded');
        }

        // Seed Projects if empty
        const pCount = await Project.countDocuments();
        if (pCount === 0) {
            await Project.insertMany(projects);
            console.log('Projects Seeded');
        }

        // Seed Skills if empty
        const skillCount = await Skill.countDocuments();
        if (skillCount === 0) {
            await Skill.insertMany(skills);
            console.log('Skills Seeded');
        }

        // Seed FAQs if empty
        const faqCount = await FAQ.countDocuments();
        if (faqCount === 0) {
            await FAQ.insertMany(faqs);
            console.log('FAQs Seeded');
        }

        console.log('✅ Database Population Complete');
        process.exit();
    } catch (err) {
        console.error('Error seeding database:', err);
        process.exit(1);
    }
};

seedDB();
