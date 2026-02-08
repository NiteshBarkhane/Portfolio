import React, { useEffect, useState } from 'react';
import api from '../config/api';
import { motion } from 'framer-motion';

const Skills = () => {
    const [skills, setSkills] = useState([]);

    useEffect(() => {
        api.get('/skills')
            .then(res => setSkills(res.data))
            .catch(err => console.error(err));
    }, []);

    // Duplicate skills multiple times to ensure seamless infinite scroll
    const duplicatedSkills = [...skills, ...skills, ...skills];

    return (
        <section id="skills" className="py-10 bg-secondary/30 relative overflow-hidden">
            {/* Gradient Masks for seamless effect */}
            <div className="absolute top-0 left-0 h-full w-24 bg-gradient-to-r from-secondary/30 to-transparent z-10 pointer-events-none"></div>
            <div className="absolute top-0 right-0 h-full w-24 bg-gradient-to-l from-secondary/30 to-transparent z-10 pointer-events-none"></div>

            <div className="container mx-auto px-6 mb-8 text-center">
                <p className="text-textSecondary text-sm uppercase tracking-widest font-medium">
                    Powering My Projects
                </p>
                {/* <div className="w-1 h-8 bg-accent mx-auto mt-2 mb-4 rounded-full"></div> */}
            </div>

            <div className="relative flex overflow-hidden group">
                <motion.div
                    className="flex gap-8 md:gap-16 items-center"
                    animate={{
                        x: ["0%", "-33.33%"], // Move by one-third since we tripled the list
                    }}
                    transition={{
                        duration: 20, // Adjust speed: lower is faster
                        repeat: Infinity,
                        ease: "linear",
                        repeatType: "loop" // Standard loop for seamless marquee
                    }}
                >
                    {duplicatedSkills.map((skill, index) => (
                        <div
                            key={`${skill._id}-${index}`}
                            className="flex items-center gap-4 group/item grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100 cursor-default"
                        >
                            <div className="w-12 h-12 md:w-16 md:h-16 flex items-center justify-center bg-white/5 rounded-xl p-2 border border-white/5 group-hover/item:border-accent/40 group-hover/item:bg-accent/10 transition-all shadow-lg">
                                {skill.icon ? (
                                    <img
                                        src={skill.icon}
                                        alt={skill.name}
                                        className="w-full h-full object-contain drop-shadow-md"
                                    />
                                ) : (
                                    <div className="w-full h-full bg-accent/20 rounded-full"></div>
                                )}
                            </div>
                            <span className="text-base md:text-xl font-bold text-white tracking-wide">{skill.name}</span>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default Skills;
