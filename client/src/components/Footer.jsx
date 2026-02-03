import React from 'react';
import { Instagram, Linkedin, Twitter, Github, Phone, MessageSquare } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="section-container border-t border-white/5 bg-primary overflow-hidden relative">
            {/* Background Glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-accent/50 to-transparent"></div>

            <div className="flex flex-col items-center relative z-10">
                <div className="text-4xl font-black text-white mb-8 tracking-tighter">
                    N<span className="text-accent">B</span>
                </div>

                <div className="flex flex-wrap justify-center gap-x-10 gap-y-4 text-white/70 font-medium mb-12 uppercase tracking-widest text-sm">
                    <a href="#home" className="hover:text-accent transition-colors">Home</a>
                    <a href="#about" className="hover:text-accent transition-colors">About</a>
                    <a href="#services" className="hover:text-accent transition-colors">Services</a>
                    <a href="#portfolio" className="hover:text-accent transition-colors">Portfolio</a>
                    <a href="#contact" className="hover:text-accent transition-colors">Contact</a>
                </div>

                <div className="flex flex-wrap justify-center gap-6 mb-12">
                    <a
                        href="tel:+919171535280"
                        className="flex items-center gap-3 px-6 py-3 bg-secondary rounded-2xl text-white hover:border-accent border border-transparent transition-all group"
                    >
                        <Phone size={20} className="text-accent group-hover:scale-110 transition-transform" />
                        <span className="font-bold">+91 9171535280</span>
                    </a>
                    <a
                        href="https://wa.me/919171535280"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 px-6 py-3 bg-secondary rounded-2xl text-white hover:border-accent border border-transparent transition-all group"
                    >
                        <MessageSquare size={20} className="text-green-500 group-hover:scale-110 transition-transform" />
                        <span className="font-bold">WhatsApp</span>
                    </a>
                </div>

                <div className="flex gap-6 mb-12">
                    <a href="https://www.linkedin.com/in/nitesh-barkhane-66060b342/" target="_blank" rel="noopener noreferrer" className="p-4 bg-secondary rounded-2xl text-white hover:text-accent hover:scale-110 transition-all border border-white/5"><Linkedin size={24} /></a>
                    <a href="https://github.com/NiteshBarkhane" target="_blank" rel="noopener noreferrer" className="p-4 bg-secondary rounded-2xl text-white hover:text-accent hover:scale-110 transition-all border border-white/5"><Github size={24} /></a>
                </div>

                <div className="w-full h-[1px] bg-white/5 mb-8"></div>

                <p className="text-textSecondary text-sm text-center">
                    © 2024 <span className="text-white font-bold">Nitesh Barkhane</span>. Crafted with precision for the digital age.
                </p>
            </div>
        </footer>
    );
};

export default Footer;
