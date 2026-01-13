import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="fixed top-0 left-0 w-full bg-primary/80 backdrop-blur-md z-50 py-4 px-8 flex justify-between items-center border-b border-secondary">
            <div className="text-2xl font-bold text-accent">MF</div>
            <div className="hidden md:flex gap-8 text-white font-medium">
                <a href="#home" className="hover:text-accent transition-colors">Home</a>
                <a href="#about" className="hover:text-accent transition-colors">About</a>
                <a href="#services" className="hover:text-accent transition-colors">Services</a>
                <a href="#portfolio" className="hover:text-accent transition-colors">Portfolio</a>
                <a href="#contact" className="hover:text-accent transition-colors">Contact</a>
            </div>
            <button className="bg-accent text-white px-6 py-2 rounded-lg font-semibold hover:bg-orange-600 transition-all">
                Hire Me
            </button>
        </nav>
    );
};

export default Navbar;
