import React from 'react';
import { motion } from 'framer-motion';
import { Target, Zap, ShieldCheck } from 'lucide-react';
import { useSettings } from '../context/SettingsContext';

const About = () => {
    const { getSetting } = useSettings();

    const stats = [
        { label: getSetting('stat_1_label', 'Projects Completed'), value: getSetting('stat_1_value', '10+') },
        { label: getSetting('stat_2_label', 'Happy Clients'), value: getSetting('stat_2_value', '5+') },
        { label: getSetting('stat_3_label', 'Lines of Code'), value: getSetting('stat_3_value', '50k+') },
        { label: getSetting('stat_4_label', 'Coffee Cups'), value: getSetting('stat_4_value', 'Infinite') },
    ];

    const values = [
        {
            icon: <Target className="text-accent w-8 h-8" />,
            title: getSetting('value_1_title', "Result-Oriented"),
            description: getSetting('value_1_desc', "I focus on the end-goal of your business, ensuring every line of code adds value and improves user engagement.")
        },
        {
            icon: <Zap className="text-accent w-8 h-8" />,
            title: getSetting('value_2_title', "High Performance"),
            description: getSetting('value_2_desc', "Performance isn't just a feature; it's a requirement. I optimize for speed, responsiveness, and accessibility.")
        },
        {
            icon: <ShieldCheck className="text-accent w-8 h-8" />,
            title: getSetting('value_3_title', "Clean & Secure"),
            description: getSetting('value_3_desc', "Writing maintainable, secure code using industry standards so your application can scale without technical debt.")
        }
    ];

    return (
        <section id="about" className="section-container bg-primary overflow-hidden">
            <div className="flex flex-col lg:flex-row gap-16 items-center">
                <div className="flex-1">
                    <motion.h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                        {getSetting('about_title', 'Crafting Digital Excellence Since 2023')}
                    </motion.h2>
                    <p className="text-textSecondary text-lg leading-relaxed mb-8">
                        {getSetting('about_desc_1', 'Based in Indore, India, I started my journey with a passion for turning logic into visual reality. As a versatile Web Developer, I bridge the gap between complex backend systems and beautiful, intuitive front-end designs, regardless of the industry or technology stack.')}
                    </p>
                    <p className="text-textSecondary text-lg leading-relaxed mb-12">
                        {getSetting('about_desc_2', 'I don\'t just build websites; I build business solutions. No idea is too big or too niche. From high-scale enterprise platforms to bespoke creative experiments, I ensure the technology stack is modern, scalable, and perfectly aligned with your unique vision.')}
                    </p>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {stats.map((stat, index) => (
                            <div key={index}>
                                <h3 className="text-3xl font-bold text-white mb-1">{stat.value}</h3>
                                <p className="text-textSecondary text-sm uppercase tracking-wider">{stat.label}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="flex-1 w-full">
                    <div className="space-y-6">
                        {values.map((v, i) => (
                            <motion.div
                                key={i}
                                className="glass-card p-8 flex gap-6 items-start hover:scale-[1.02] transition-transform"
                            >
                                <div className="p-4 bg-accent/10 rounded-2xl shrink-0">
                                    {v.icon}
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold text-white mb-2">{v.title}</h3>
                                    <p className="text-textSecondary leading-relaxed">{v.description}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
