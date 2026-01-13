import React from 'react';
import { Instagram, Linkedin, Twitter, Github } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="py-12 px-8 border-t border-secondary bg-primary flex flex-col items-center">
            <div className="text-4xl font-bold text-accent mb-8">MF</div>

            <div className="flex gap-8 text-white font-medium mb-12">
                <a href="#home" className="hover:text-accent transition-colors">Home</a>
                <a href="#about" className="hover:text-accent transition-colors">About</a>
                <a href="#services" className="hover:text-accent transition-colors">Services</a>
                <a href="#portfolio" className="hover:text-accent transition-colors">Portfolio</a>
                <a href="#contact" className="hover:text-accent transition-colors">Contact</a>
            </div>

            <div className="flex gap-6 mb-12">
                <a href="#" className="p-3 bg-secondary rounded-xl text-white hover:text-accent hover:scale-110 transition-all"><Instagram /></a>
                <a href="#" className="p-3 bg-secondary rounded-xl text-white hover:text-accent hover:scale-110 transition-all"><Linkedin /></a>
                <a href="#" className="p-3 bg-secondary rounded-xl text-white hover:text-accent hover:scale-110 transition-all"><Twitter /></a>
                <a href="#" className="p-3 bg-secondary rounded-xl text-white hover:text-accent hover:scale-110 transition-all"><Github /></a>
            </div>

            <p className="text-textSecondary text-sm">
                © 2024 <span className="text-accent font-bold">MF</span> All Rights Reserved, Inc.
            </p>
        </footer>
    );
};

export default Footer;
