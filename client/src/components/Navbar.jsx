import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const navLinks = [
        { name: 'Home', href: '#home' },
        { name: 'About', href: '#about' },
        { name: 'Services', href: '#services' },
        // { name: 'Qualities', href: '#skills' },
        { name: 'Portfolio', href: '#portfolio' },
        { name: 'Approach', href: '#approach' },
        { name: 'Contact', href: '#contact' },
    ];

    return (
        <nav className="fixed top-0 left-0 w-full bg-primary/80 backdrop-blur-xl z-[100] border-b border-white/5">
            <div className="max-w-7xl mx-auto px-6 md:px-12 py-5 flex justify-between items-center">
                <div className="text-3xl font-black text-white tracking-tighter">
                    N<span className="text-accent">B</span>
                </div>

                {/* Desktop Menu */}
                <div className="hidden lg:flex items-center gap-10">
                    <div className="flex gap-8 text-white/70 font-medium">
                        {navLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                className="hover:text-accent transition-colors duration-300 text-sm uppercase tracking-widest"
                            >
                                {link.name}
                            </a>
                        ))}
                    </div>
                    <button className="bg-accent text-white px-7 py-3 rounded-full font-bold hover:shadow-[0_0_20px_rgba(124,58,237,0.4)] transition-all text-sm uppercase">
                        Hire Me
                    </button>
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="lg:hidden text-white p-2"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
            </div>

            {/* Mobile Menu Dropdown */}
            {isOpen && (
                <div className="lg:hidden bg-primary border-b border-white/5 px-6 py-8 flex flex-col gap-6 animate-in slide-in-from-top duration-300">
                    {navLinks.map((link) => (
                        <a
                            key={link.name}
                            href={link.href}
                            onClick={() => setIsOpen(false)}
                            className="text-2xl font-bold text-white hover:text-accent transition-colors"
                        >
                            {link.name}
                        </a>
                    ))}
                    <button className="bg-accent text-white px-8 py-4 rounded-full font-bold text-lg mt-4">
                        Hire Me
                    </button>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
