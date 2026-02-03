import React from 'react';
import { motion } from 'framer-motion';
import { Zap, ShieldCheck, Cpu, MessageSquare, Target, Lightbulb } from 'lucide-react';

const QualityCard = ({ icon: Icon, title, description, delay }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay }}
        className="glass-card p-8 flex flex-col gap-4 group hover:border-accent/40 transition-all duration-500"
    >
        <div className="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-white transition-all duration-500 shadow-[0_0_20px_rgba(124,58,237,0.1)]">
            <Icon size={28} />
        </div>
        <h3 className="text-2xl font-bold text-white mt-2">{title}</h3>
        <p className="text-textSecondary leading-relaxed">{description}</p>
    </motion.div>
);

const Skills = () => {
    const qualities = [
        {
            icon: Zap,
            title: "Absolute Versatility",
            description: "From complex SaaS architectures to artistic brand experiences, I master any stack required to bring the specific idea to life."
        },
        {
            icon: Target,
            title: "Strategic Execution",
            description: "I don't just write code; I build solutions. I align technical decisions with business goals to ensure maximum project impact."
        },
        {
            icon: ShieldCheck,
            title: "Professional Reliability",
            description: "Clear communication, strict deadline adherence, and a commitment to delivery that working professionals and clients trust."
        },
        {
            icon: Lightbulb,
            title: "Creative Innovation",
            description: "Turning abstract concepts into functional digital reality through out-of-the-box thinking and creative engineering."
        },
        {
            icon: Cpu,
            title: "Technical Excellence",
            description: "A deep focus on performance, scalability, and maintainable clean code that stands the test of time."
        },
        {
            icon: MessageSquare,
            title: "Client-Centric Mindset",
            description: "Collaborative approach with a focus on understanding user needs and providing a seamless freelance experience."
        }
    ];

    return (
        <section id="skills" className="section-container bg-primary relative overflow-hidden">
            {/* Background Glows */}
            <div className="absolute top-1/4 -right-20 w-80 h-80 bg-accent/10 rounded-full blur-[120px] -z-10"></div>
            <div className="absolute bottom-1/4 -left-20 w-80 h-80 bg-neonCyan/10 rounded-full blur-[120px] -z-10"></div>

            <div className="text-center mb-20">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-5xl md:text-6xl font-bold text-white mb-6"
                >
                    Core <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-neonCyan">Professional Qualities</span>
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                    className="text-textSecondary max-w-2xl mx-auto text-lg leading-relaxed"
                >
                    Beyond just tools and technologies, I bring a suite of high-level professional attributes that ensure every project I touch is a success.
                </motion.p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {qualities.map((q, index) => (
                    <QualityCard
                        key={index}
                        icon={q.icon}
                        title={q.title}
                        description={q.description}
                        delay={index * 0.1}
                    />
                ))}
            </div>
        </section>
    );
};

export default Skills;

