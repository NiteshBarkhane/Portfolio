import React from 'react';
import { useSettings } from '../context/SettingsContext';
import Icon from './Icon';

const Footer = () => {
    const { getSetting } = useSettings();
    const phone = getSetting('footer_phone', '+919171535280');
    const email = getSetting('footer_email', 'niteshbarkhane123@gmail.com');
    const copyright = getSetting('footer_copyright_text', 'Crafted with precision for the digital age.');
    const tagline = getSetting('footer_tagline', 'Turning logic into visual reality.');

    // Social Links Configuration
    const socialLinks = [
        {
            key: 'footer_github',
            url: getSetting('footer_github'),
            icon: "M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22",
            name: "GitHub"
        },
        {
            key: 'footer_linkedin',
            url: getSetting('footer_linkedin'),
            icon: "M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z M4 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4z",
            name: "LinkedIn"
        },
        {
            key: 'social_twitter',
            url: getSetting('social_twitter'),
            icon: "M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z",
            name: "Twitter"
        },
        {
            key: 'social_instagram',
            url: getSetting('social_instagram'),
            icon: "M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z M17.5 6.5h.01 M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5z",
            name: "Instagram"
        },
        {
            key: 'footer_whatsapp_link',
            url: getSetting('footer_whatsapp_link'),
            icon: "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z", // Using Message for WhatsApp generic if phone not linked
            name: "WhatsApp"
        },
        {
            key: 'social_facebook',
            url: getSetting('social_facebook'),
            icon: "M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z",
            name: "Facebook"
        },
        {
            key: 'social_youtube',
            url: getSetting('social_youtube'),
            icon: "M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z M9.75 15.02l5.75-3.27-5.75-3.27z",
            name: "YouTube"
        }
    ].filter(link => link.url); // Only show links that exist

    return (
        <footer className="section-container border-t border-white/5 bg-primary overflow-hidden relative">
            {/* Background Glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-accent/50 to-transparent"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/5 blur-[100px] rounded-full pointer-events-none"></div>

            <div className="flex flex-col items-center relative z-10 max-w-4xl mx-auto text-center">
                {/* Logo Area */}
                <div className="mb-8">
                    <span className="text-4xl font-black text-white tracking-tighter block mb-2">
                        N<span className="text-accent">B</span>
                    </span>
                    <p className="text-textSecondary text-sm max-w-md mx-auto">{tagline}</p>
                </div>

                {/* Quick Links with Hover Effects */}
                <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 text-white/70 font-medium mb-12 uppercase tracking-widest text-sm">
                    {['Home', 'Services', 'Skills', 'Portfolio', 'Testimonials', 'Pricing', 'Contact'].map((item) => (
                        <a
                            key={item}
                            href={`#${item.toLowerCase()}`}
                            onClick={(e) => {
                                e.preventDefault();
                                const element = document.querySelector(`#${item.toLowerCase()}`);
                                if (element) element.scrollIntoView({ behavior: 'smooth' });
                            }}
                            className="hover:text-accent transition-colors relative group cursor-pointer"
                        >
                            {item}
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent transition-all group-hover:w-full"></span>
                        </a>
                    ))}
                </div>

                {/* Contact Chip */}
                {(phone || email) && (
                    <div className="flex flex-wrap justify-center gap-4 mb-12">
                        {phone && (
                            <a href={`tel:${phone}`} className="flex items-center gap-2 px-5 py-2.5 bg-secondary rounded-full text-white border border-white/5 hover:border-accent hover:bg-accent/10 transition-all group">
                                <Icon path="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" name="Phone" className="text-accent group-hover:scale-110 transition-transform" />
                                <span className="text-sm font-semibold">{phone}</span>
                            </a>
                        )}
                        {email && (
                            <a href={`mailto:${email}`} className="flex items-center gap-2 px-5 py-2.5 bg-secondary rounded-full text-white border border-white/5 hover:border-accent hover:bg-accent/10 transition-all group">
                                <Icon path="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2zM22 6l-10 7L2 6" name="Mail" className="text-accent group-hover:scale-110 transition-transform" />
                                <span className="text-sm font-semibold">Email Me</span>
                            </a>
                        )}
                    </div>
                )}


                {/* Dynamic Social Links */}
                {socialLinks.length > 0 && (
                    <div className="flex justify-center gap-4 mb-12">
                        {socialLinks.map((link) => (
                            <a
                                key={link.key}
                                href={link.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-3 bg-secondary rounded-xl text-white hover:text-white hover:bg-accent hover:-translate-y-1 hover:shadow-lg hover:shadow-accent/30 transition-all border border-white/5"
                                aria-label={link.name}
                            >
                                <Icon path={link.icon} name={link.name} size={20} />
                            </a>
                        ))}
                    </div>
                )}

                <div className="w-full h-[1px] bg-white/5 mb-8 max-w-2xl"></div>

                <p className="text-textSecondary text-xs md:text-sm text-center">
                    © {new Date().getFullYear()} <span className="text-white font-bold">Nitesh Barkhane</span>. {copyright}
                </p>
            </div>
        </footer>
    );
};

export default Footer;
