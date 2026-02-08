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

    const duplicatedSkills = [...skills];

    return (
        <section id="skills" className="py-20 bg-secondary/30">
            <div className="container mx-auto px-6">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-4xl font-bold text-center mb-12"
                >
                    <span className="text-accent">Tech</span> Stack
                </motion.h2>

                <div className="overflow-hidden">
                    <motion.div
                        className="flex gap-12"
                        animate={{ x: [0, "-50%"] }}
                        transition={{
                            duration: 30,
                            repeat: Infinity,
                            repeatType: "reverse",
                            ease: "linear"
                        }}
                    >
                        {duplicatedSkills.map((skill, index) => (
                            <div
                                key={`${skill._id}-${index}`}
                                className="flex flex-col items-center gap-3 min-w-[120px]"
                            >
                                <div className="w-16 h-16 flex items-center justify-center bg-primary/50 rounded-lg p-3 border border-accent/20">
                                    <img
                                        src={skill.icon}
                                        alt={skill.name}
                                        className="w-full h-full object-contain"
                                    />
                                </div>
                                <span className="text-sm text-textSecondary">{skill.name}</span>
                            </div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Skills;
