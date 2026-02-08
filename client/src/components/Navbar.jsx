import React, { useState, useEffect } from 'react';
import Icon from './Icon';
import { useSettings } from '../context/SettingsContext';

const Navbar = () => {
    const { getSetting } = useSettings();
    const [isOpen, setIsOpen] = useState(false);

    // Lock body scroll when mobile menu is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [isOpen]);

    const navLinks = [
        { name: 'Home', href: '#home' },
        // { name: 'About', href: '#about' },
        { name: 'Services', href: '#services' },
        // { name: 'Skills', href: '#skills' },
        { name: 'Portfolio', href: '#portfolio' },
        { name: 'Testimonials', href: '#testimonials' },
        { name: 'Pricing', href: '#pricing' },
        // { name: 'Approach', href: '#approach' },
        { name: 'Contact', href: '#contact' },
    ];

    const resumeLink = getSetting('header_resume_link');
    const logoText = getSetting('header_logo_text', 'NB');
    const hireButtonText = getSetting('header_button_text', 'Hire Me');

    const handleLinkClick = (href) => {
        setIsOpen(false);
        const element = document.querySelector(href);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <>
            <nav className="fixed top-0 left-0 w-full bg-primary/80 backdrop-blur-xl z-[100] border-b border-white/5 transition-all duration-300">
                <div className="max-w-7xl mx-auto px-6 md:px-12 py-5 flex justify-between items-center">
                    {/* Logo */}
                    <a href="#home" className="text-3xl font-black text-white tracking-tighter hover:text-accent transition-colors" onClick={(e) => { e.preventDefault(); handleLinkClick('#home'); }}>
                        {logoText.includes(' ') ? (
                            <>
                                {logoText.split(' ')[0]}<span className="text-accent">{logoText.split(' ').slice(1).join(' ')}</span>
                            </>
                        ) : (
                            <>
                                {logoText.substring(0, 1)}<span className="text-accent">{logoText.substring(1)}</span>
                            </>
                        )}
                    </a>

                    {/* Desktop Menu */}
                    <div className="hidden lg:flex items-center gap-8 xl:gap-10">
                        <div className="flex gap-6 xl:gap-8 text-white/70 font-medium">
                            {navLinks.map((link) => (
                                <a
                                    key={link.name}
                                    href={link.href}
                                    onClick={(e) => { e.preventDefault(); handleLinkClick(link.href); }}
                                    className="hover:text-accent transition-colors duration-300 text-sm uppercase tracking-widest cursor-pointer relative group"
                                >
                                    {link.name}
                                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent transition-all group-hover:w-full"></span>
                                </a>
                            ))}
                        </div>

                        <div className="flex items-center gap-4">
                            {resumeLink && (
                                <a
                                    href={resumeLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-white/80 hover:text-white font-medium text-sm border-b border-white/20 hover:border-accent transition-all pb-0.5"
                                >
                                    Resume
                                </a>
                            )}
                            <button
                                onClick={() => handleLinkClick('#contact')}
                                className="bg-accent text-white px-7 py-3 rounded-full font-bold hover:shadow-[0_0_20px_rgba(124,58,237,0.4)] transition-all text-sm uppercase flex items-center gap-2 group"
                            >
                                {hireButtonText}
                                <Icon path="M5 12h14M12 5l7 7-7 7" name="Arrow" className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </button>
                        </div>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="lg:hidden text-white p-2 hover:bg-white/10 rounded-lg transition-colors"
                        onClick={() => setIsOpen(true)}
                        aria-label="Open Menu"
                    >
                        <Icon path="M3 12h18M3 6h18M3 18h18" name="Menu" size={28} />
                    </button>
                </div>
            </nav>

            {/* Mobile Sidebar Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/60 z-[101] lg:hidden backdrop-blur-sm transition-opacity animate-fade-in"
                    onClick={() => setIsOpen(false)}
                />
            )}

            {/* Mobile Sidebar Drawer */}
            <aside className={`
                fixed top-0 left-0 h-full w-72 bg-secondary border-r border-white/10 z-[102] 
                transform transition-transform duration-300 ease-in-out lg:hidden shadow-2xl
                ${isOpen ? 'translate-x-0' : '-translate-x-full'}
            `}>
                <div className="flex flex-col h-full p-6 relative overflow-hidden">
                    {/* Background decoration */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-accent/10 blur-[50px] rounded-full pointer-events-none" />

                    <div className="flex justify-between items-center mb-10 relative z-10">
                        <div className="text-2xl font-black text-white tracking-tighter">
                            {logoText}
                        </div>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="text-white/50 hover:text-white transition-colors p-2 hover:bg-white/5 rounded-lg"
                        >
                            <Icon path="M18 6L6 18M6 6l12 12" name="Close" size={24} />
                        </button>
                    </div>

                    <div className="flex flex-col gap-2 relative z-10">
                        {navLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                onClick={(e) => { e.preventDefault(); handleLinkClick(link.href); }}
                                className="text-lg font-medium text-textSecondary hover:text-white hover:bg-white/5 px-4 py-3 rounded-xl transition-all flex items-center justify-between group"
                            >
                                {link.name}
                                <Icon path="M9 18l6-6-6-6" name="Chevron" className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity text-accent" />
                            </a>
                        ))}
                        {resumeLink && (
                            <a
                                href={resumeLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-lg font-medium text-textSecondary hover:text-white hover:bg-white/5 px-4 py-3 rounded-xl transition-all flex items-center justify-between group"
                            >
                                Resume
                                <Icon path="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3" name="External" className="w-4 h-4 text-accent" />
                            </a>
                        )}
                    </div>

                    <div className="mt-auto relative z-10 space-y-4">
                        <button
                            onClick={() => handleLinkClick('#contact')}
                            className="bg-accent text-white w-full py-4 rounded-xl font-bold hover:shadow-[0_0_20px_rgba(124,58,237,0.4)] transition-all flex items-center justify-center gap-2 group"
                        >
                            {hireButtonText}
                            <Icon path="M5 12h14M12 5l7 7-7 7" name="Arrow" className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </button>

                        <p className="text-center text-xs text-textSecondary/50">
                            © {new Date().getFullYear()} {logoText}
                        </p>
                    </div>
                </div>
            </aside>
        </>
    );
};

export default Navbar;
