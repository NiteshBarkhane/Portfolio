import React from 'react';
import { useSettings } from '../context/SettingsContext';
import Icon from './Icon';

const Footer = () => {
    const { getSetting } = useSettings();
    const phone = getSetting('footer_phone', '+919171535280');
    const whatsappLink = getSetting('footer_whatsapp_link', 'https://wa.me/919171535280');
    const linkedin = getSetting('footer_linkedin', 'https://www.linkedin.com/in/nitesh-barkhane-66060b342/');
    const github = getSetting('footer_github', 'https://github.com/NiteshBarkhane');

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
                        href={`tel:${phone}`}
                        className="flex items-center gap-3 px-6 py-3 bg-secondary rounded-2xl text-white hover:border-accent border border-transparent transition-all group"
                    >
                        <Icon path="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" name="Phone" size={20} className="text-accent group-hover:scale-110 transition-transform" />
                        <span className="font-bold">{phone}</span>
                    </a>
                    <a
                        href={whatsappLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 px-6 py-3 bg-secondary rounded-2xl text-white hover:border-accent border border-transparent transition-all group"
                    >
                        <Icon path="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" name="WhatsApp" size={20} className="text-green-500 group-hover:scale-110 transition-transform" />
                        <span className="font-bold">WhatsApp</span>
                    </a>
                </div>

                <div className="flex gap-6 mb-12">
                    <a href={linkedin} target="_blank" rel="noopener noreferrer" className="p-4 bg-secondary rounded-2xl text-white hover:text-accent hover:scale-110 transition-all border border-white/5"><Icon path="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z M4 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" name="LinkedIn" size={24} /></a>
                    <a href={github} target="_blank" rel="noopener noreferrer" className="p-4 bg-secondary rounded-2xl text-white hover:text-accent hover:scale-110 transition-all border border-white/5"><Icon path="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" name="GitHub" size={24} /></a>
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
