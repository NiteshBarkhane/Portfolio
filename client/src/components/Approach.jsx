import React from 'react';
import { motion } from 'framer-motion';
import { useSettings } from '../context/SettingsContext';
import Icon from './Icon';

const Approach = () => {
    const { getSetting } = useSettings();

    const steps = [
        {
            icon: <Icon path="M11 4a7 7 0 0 1 0 14m0-14a7 7 0 0 0 0 14m0-14v14M4 11h14" name="Search" className="w-10 h-10 text-accent" />,
            title: "Discovery & Planning",
            description: "We start by understanding your business goals, target audience, and project requirements to create a detailed roadmap."
        },
        {
            icon: <Icon path="M12 19l7-7 3 3-7 7-3-3z M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z M2 2l7.586 7.586" name="Pen Tool" className="w-10 h-10 text-accent" />,
            title: "Design & Prototyping",
            description: "I craft intuitive user interfaces and experiences, ensuring the design aligns with your brand identity and users' needs."
        },
        {
            icon: <Icon path="M16 18l6-6-6-6M8 6l-6 6 6 6" name="Code" className="w-10 h-10 text-accent" />,
            title: "Development & Integration",
            description: "Using the most effective modern technologies, I build a robust and scalable application with clean code and modern best practices."
        },
        {
            icon: <Icon path="M22 11.08V12a10 10 0 1 1-5.93-9.14M22 4L12 14.01l-3-3" name="Check Circle" className="w-10 h-10 text-accent" />,
            title: "Testing & Launch",
            description: "Rigorous testing ensures a bug-free experience. After your approval, we launch your project to the world."
        }
    ];

    return (
        <section id="approach" className="section-container bg-primary/50 relative overflow-hidden">
            <div className="absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-accent/20 to-transparent -z-10 hidden lg:block"></div>
            <div className="text-center mb-20">
                <h2 className="text-5xl font-bold text-white mb-6">
                    {getSetting('approach_title', "My Approach")}
                </h2>
                <p className="text-textSecondary max-w-2xl mx-auto text-lg leading-relaxed">
                    {getSetting('approach_desc', "A transparency-first workflow designed to keep you updated at every stage of the development process.")}
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 relative">
                {steps.map((step, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        viewport={{ once: true }}
                        className="flex flex-col items-center text-center group"
                    >
                        <div className="w-24 h-24 bg-secondary rounded-full flex items-center justify-center mb-8 border-2 border-transparent group-hover:border-accent group-hover:shadow-[0_0_30px_rgba(124,58,237,0.3)] transition-all duration-500 bg-glass-gradient backdrop-blur-sm">
                            {step.icon}
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-4">{step.title}</h3>
                        <p className="text-textSecondary leading-relaxed">{step.description}</p>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default Approach;
