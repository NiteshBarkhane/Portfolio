import React from 'react';
import { motion } from 'framer-motion';
import { Search, PenTool, Code, CheckCircle } from 'lucide-react';

const Approach = () => {
    const steps = [
        {
            icon: <Search className="w-10 h-10 text-accent" />,
            title: "Discovery & Planning",
            description: "We start by understanding your business goals, target audience, and project requirements to create a detailed roadmap."
        },
        {
            icon: <PenTool className="w-10 h-10 text-accent" />,
            title: "Design & Prototyping",
            description: "I craft intuitive user interfaces and experiences, ensuring the design aligns with your brand identity and users' needs."
        },
        {
            icon: <Code className="w-10 h-10 text-accent" />,
            title: "Development & Integration",
            description: "Using the most effective modern technologies, I build a robust and scalable application with clean code and modern best practices."
        },
        {
            icon: <CheckCircle className="w-10 h-10 text-accent" />,
            title: "Testing & Launch",
            description: "Rigorous testing ensures a bug-free experience. After your approval, we launch your project to the world."
        }
    ];

    return (
        <section id="approach" className="section-container bg-primary/50 relative overflow-hidden">
            <div className="absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-accent/20 to-transparent -z-10 hidden lg:block"></div>
            <div className="text-center mb-20">
                <h2 className="text-5xl font-bold text-white mb-6">My <span className="text-accent">Approach</span></h2>
                <p className="text-textSecondary max-w-2xl mx-auto text-lg leading-relaxed">
                    A transparency-first workflow designed to keep you updated at every stage of the development process.
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
