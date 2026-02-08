import React from 'react';
import { motion } from 'framer-motion';
import { useSettings } from '../context/SettingsContext';
import Icon from './Icon';

const Hero = () => {
    const { getSetting } = useSettings();

    return (
        <section id="home" className="min-h-screen flex flex-col md:flex-row items-center justify-center section-container pt-24 md:pt-32 relative overflow-hidden">
            {/* Background Gradient - Lighter alternative to particles */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent/10 blur-[150px] -z-10 rounded-full animate-pulse"></div>
            <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-purple-500/10 blur-[150px] -z-10 rounded-full"></div>

            <motion.div
                className="flex-1 text-center md:text-left z-10"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
            >
                {/* Badge */}
                <div className="inline-flex items-center gap-2 bg-accent/10 border border-accent/20 px-4 py-2 rounded-full mb-6">
                    <Icon path="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" name="Sparkles" className="w-4 h-4 text-accent animate-pulse" />
                    <span className="text-sm text-accent font-medium tracking-wide">
                        {getSetting('hero_badge', 'Available for Freelance')}
                    </span>
                </div>

                {/* Name */}
                <h1 className="text-2xl md:text-3xl font-semibold text-textSecondary mb-3">
                    {getSetting('hero_name', 'Nitesh Barkhane')}
                </h1>

                {/* Main Title */}
                <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-tight mb-6">
                    <span className="block">{getSetting('hero_main_title_1', 'Web Developer')}</span>
                    <span className="block text-transparent bg-clip-text bg-gradient-to-r from-accent via-purple-400 to-neonCyan">
                        {getSetting('hero_main_title_2', 'For Any Idea.')}
                    </span>
                </h2>

                {/* Description */}
                <p className="text-textSecondary text-lg mb-8 max-w-xl mx-auto md:mx-0 leading-relaxed">
                    {getSetting('hero_description', 'I specialize in turning any digital concept into a high-performance reality. From complex web applications to unique creative websites, I bring the technical depth to deliver excellence.')}
                </p>

                {/* Buttons */}
                <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                    <button
                        onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}
                        className="bg-accent text-white px-8 py-3 rounded-full font-bold hover:shadow-[0_0_20px_rgba(124,58,237,0.4)] transition-all flex items-center gap-2 group"
                    >
                        <span>Start a Project</span>
                        <Icon path="M12 19V5M5 12l7-7 7 7" name="Arrow" className="group-hover:translate-x-1 transition-transform" />
                    </button>

                    <button
                        onClick={() => document.getElementById('about').scrollIntoView({ behavior: 'smooth' })}
                        className="glass-card px-8 py-3 rounded-full font-bold text-white hover:bg-white/10 transition-all flex items-center gap-2"
                    >
                        <Icon path="M16 18l6-6-6-6M8 6l-6 6 6 6" name="Code" />
                        <span>My Journey</span>
                    </button>
                </div>
            </motion.div>

            {/* Hero Image */}
            {/* <motion.div
                className="flex-1 mt-12 md:mt-0 flex justify-center relative z-10"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
            > */}
            <div className="relative">
                <div className="absolute inset-0 bg-accent/20 rounded-full blur-3xl -z-10 animate-pulse"></div>
                <img
                    src={getSetting('hero_image', '../../assets/heroImage.jpeg')}
                    alt="Profile"
                    className="w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 object-cover rounded-full border-4 border-white/10 shadow-2xl"
                />
            </div>
            {/* </motion.div> */}
        </section>
    );
};

export default Hero;
