import React from 'react';
import { motion } from 'framer-motion';

const Hero = () => {
    return (
        <section id="home" className="min-h-screen flex flex-col md:flex-row items-center justify-center px-8 md:px-24 pt-20">
            <div className="flex-1 text-center md:text-left">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-xl text-textMain mb-2"
                >
                    Hi I am
                </motion.h2>
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="text-3xl font-bold text-accent mb-2"
                >
                    Mahmood Fazile
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="text-6xl md:text-8xl font-black text-textMain leading-tight mb-6"
                >
                    UI/UX <span className="text-accent underline decoration-white">designer</span>
                </motion.p>
                <div className="flex gap-4 justify-center md:justify-start">
                    <button className="bg-accent text-white px-8 py-3 rounded-lg font-bold hover:scale-105 transition-transform">Hire Me</button>
                    <button className="border-2 border-accent text-accent px-8 py-3 rounded-lg font-bold hover:bg-accent hover:text-white transition-all">Download CV</button>
                </div>
            </div>
            <div className="flex-1 mt-12 md:mt-0 flex justify-center relative">
                <div className="w-80 h-80 md:w-[450px] md:h-[450px] bg-accent rounded-full absolute -z-10 blur-[100px] opacity-20"></div>
                <img
                    src="https://via.placeholder.com/500x500" // Replace with actual image later
                    alt="Profile"
                    className="w-80 h-80 md:w-[500px] md:h-[500px] object-cover rounded-full border-8 border-secondary shadow-2xl"
                />
            </div>
        </section>
    );
};

export default Hero;
