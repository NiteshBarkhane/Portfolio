import React from 'react';
import { motion } from 'framer-motion';
import { useSettings } from '../context/SettingsContext';

const Hero = () => {
    const { getSetting } = useSettings();

    return (
        <section id="home" className="min-h-screen flex flex-col md:flex-row items-center justify-center section-container pt-32 md:pt-40">
            <div className="flex-1 text-center md:text-left">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-xl text-accent font-medium mb-4 tracking-widest uppercase"
                >
                    {getSetting('hero_badge', 'Available for Freelance')}
                </motion.h2>
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="text-4xl md:text-5xl font-bold text-textMain mb-4"
                >
                    {getSetting('hero_name', 'Nitesh Barkhane')}
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="text-5xl sm:text-6xl md:text-8xl font-black text-white leading-[1.1] md:leading-none mb-6 tracking-tighter"
                >
                    {getSetting('hero_main_title_1', 'Web Developer')} <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-neonCyan">
                        {getSetting('hero_main_title_2', 'For Any Idea.')}
                    </span>
                </motion.p>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="text-lg md:text-xl text-textSecondary mb-10 max-w-xl leading-relaxed"
                >
                    {getSetting('hero_description', 'I specialize in turning any digital concept into a high-performance reality. From complex web applications to unique creative websites, I bring the technical depth and professional qualities needed to deliver excellence on every project.')}
                </motion.p>
                <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                    <button className="bg-accent text-white px-10 py-4 rounded-full font-bold hover:shadow-[0_0_20px_rgba(124,58,237,0.5)] hover:scale-105 transition-all">Start a Project</button>
                    <button className="glass-card px-10 py-4 rounded-full font-bold text-white hover:bg-white/10 transition-all">My Journey</button>
                </div>
            </div>
            <div className="flex-1 mt-12 md:mt-0 flex justify-center relative">
                <div className="w-[300px] h-[300px] md:w-[500px] md:h-[500px] bg-accent/20 rounded-full absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 blur-[120px] animate-pulse"></div>
                <div className="relative">
                    <div className="absolute -inset-4 bg-gradient-to-r from-accent to-neonCyan rounded-full opacity-20 blur-2xl"></div>
                    <img
                        src={getSetting('hero_image', '../../assets/heroImage.jpeg')}
                        alt="Nitesh Barkhane"
                        className="w-64 h-64 sm:w-72 sm:h-72 md:w-[450px] md:h-[450px] aspect-square object-cover rounded-full border-4 border-white/10 shadow-2xl relative z-10"
                    />
                </div>
            </div>
        </section>
    );
};

export default Hero;
