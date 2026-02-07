import React from 'react';
import { motion } from 'framer-motion';
import { useSettings } from '../context/SettingsContext';
import Icon from './Icon';

const Hero = () => {
    const { getSetting } = useSettings();

    // Reduced particles for better performance
    const particles = Array.from({ length: 35 });

    // Stagger animation for text
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: "easeOut" }
        }
    };

    return (
        <section id="home" className="min-h-screen flex flex-col md:flex-row items-center justify-center section-container pt-24 md:pt-32 relative overflow-hidden">
            {/* Animated Background Particles */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {particles.map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-2 h-2 bg-accent/30 rounded-full"
                        initial={{
                            x: Math.random() * window.innerWidth,
                            y: Math.random() * window.innerHeight,
                        }}
                        animate={{
                            y: [null, Math.random() * window.innerHeight],
                            x: [null, Math.random() * window.innerWidth],
                            opacity: [0.2, 0.5, 0.2],
                        }}
                        transition={{
                            duration: Math.random() * 10 + 10,
                            repeat: Infinity,
                            ease: "linear"
                        }}
                    />
                ))}
            </div>

            <motion.div
                className="flex-1 text-center md:text-left z-10"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                {/* Badge with icon */}
                <motion.div
                    className="inline-flex items-center gap-2 bg-accent/10 border border-accent/20 px-4 py-2 rounded-full mb-6 group hover:bg-accent/20 transition-all cursor-default"
                >
                    <Icon path="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" name="Sparkles" className="w-4 h-4 text-accent animate-pulse" />
                    <span className="text-sm text-accent font-medium tracking-wide">
                        {getSetting('hero_badge', 'Available for Freelance')}
                    </span>
                </motion.div>

                {/* Name with smaller font */}
                <motion.h1
                    variants={itemVariants}
                    className="text-2xl md:text-3xl font-semibold text-textSecondary mb-3"
                >
                    {getSetting('hero_name', 'Nitesh Barkhane')}
                </motion.h1>

                {/* Main title with reduced size */}
                <motion.div variants={itemVariants}>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-4">
                        <span className="inline-block">
                            {getSetting('hero_main_title_1', 'Web Developer')}
                        </span>
                        <br />
                        <span className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-accent via-purple-400 to-neonCyan animate-gradient">
                            {getSetting('hero_main_title_2', 'For Any Idea.')}
                        </span>
                    </h2>
                </motion.div>

                {/* Description with smaller font */}
                <motion.p
                    variants={itemVariants}
                    className="text-sm md:text-base text-textSecondary mb-8 max-w-xl leading-relaxed"
                >
                    {getSetting('hero_description', 'I specialize in turning any digital concept into a high-performance reality. From complex web applications to unique creative websites, I bring the technical depth and professional qualities needed to deliver excellence on every project.')}
                </motion.p>

                {/* Buttons with enhanced animations */}
                <motion.div
                    variants={itemVariants}
                    className="flex flex-wrap gap-4 justify-center md:justify-start"
                >
                    <motion.button
                        onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}
                        className="group bg-accent text-white px-8 py-3 rounded-full font-semibold text-sm flex items-center gap-2 hover:shadow-[0_0_30px_rgba(124,58,237,0.6)] transition-all relative overflow-hidden"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <span className="relative z-10">Start a Project</span>
                        <Icon path="M12 19V5M5 12l7-7 7 7" name="Arrow Right" className="w-4 h-4 group-hover:translate-x-1 transition-transform relative z-10" />
                        <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-purple-600 to-accent"
                            initial={{ x: "-100%" }}
                            whileHover={{ x: 0 }}
                            transition={{ duration: 0.3 }}
                        />
                    </motion.button>

                    <motion.button
                        onClick={() => document.getElementById('about').scrollIntoView({ behavior: 'smooth' })}
                        className="group glass-card px-8 py-3 rounded-full font-semibold text-sm text-white hover:bg-white/10 transition-all flex items-center gap-2"
                    >
                        <Icon path="M16 18l6-6-6-6M8 6l-6 6 6 6" name="Code" className="w-4 h-4" />
                        <span>My Journey</span>
                    </motion.button>
                </motion.div>
            </motion.div>

            {/* Image section with enhanced animations */}
            {/* Image section with enhanced animations */}
            <div className="flex-1 mt-12 md:mt-0 flex justify-center relative z-10">


                <motion.div
                    className="relative"
                >
                    {/* Image - removed hover scale for performance */}
                    <img
                        src={getSetting('hero_image', '../../assets/heroImage.jpeg')}
                        alt="Nitesh Barkhane"
                        className="w-56 h-56 sm:w-64 sm:h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 aspect-square object-cover rounded-full border-4 border-white/10 shadow-2xl relative z-10"
                    />

                </motion.div>
            </div>
        </section>
    );
};

export default Hero;
