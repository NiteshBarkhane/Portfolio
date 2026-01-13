import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CircularProgress = ({ name, percentage }) => {
    const radius = 70;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (percentage / 100) * circumference;

    return (
        <div className="flex flex-col items-center">
            <div className="relative w-44 h-44 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90">
                    <circle
                        cx="88"
                        cy="88"
                        r={radius}
                        stroke="currentColor"
                        strokeWidth="12"
                        fill="transparent"
                        className="text-secondary"
                    />
                    <circle
                        cx="88"
                        cy="88"
                        r={radius}
                        stroke="currentColor"
                        strokeWidth="12"
                        fill="transparent"
                        strokeDasharray={circumference}
                        style={{ strokeDashoffset }}
                        strokeLinecap="round"
                        className="text-accent transition-all duration-1000 ease-out"
                    />
                </svg>
                <span className="absolute text-2xl font-bold text-textMain">{percentage}%</span>
            </div>
            <span className="mt-4 text-xl font-bold text-textMain">{name}</span>
        </div>
    );
};

const Skills = () => {
    const [skills, setSkills] = useState([]);

    useEffect(() => {
        const fetchSkills = async () => {
            try {
                const res = await axios.get('http://localhost:5000/api/skills');
                setSkills(res.data);
            } catch (err) {
                console.error(err);
            }
        };
        fetchSkills();
    }, []);

    return (
        <section id="skills" className="py-24 px-8 md:px-24 bg-primary">
            <div className="text-center mb-16">
                <h2 className="text-5xl font-bold text-textMain mb-4">My Skills</h2>
                <p className="text-textSecondary max-w-2xl mx-auto">
                    Exploring my technical expertise in design and creative tools.
                </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-12 justify-items-center">
                {skills.map((skill, index) => (
                    <CircularProgress key={index} name={skill.name} percentage={skill.percentage} />
                ))}
            </div>
        </section>
    );
};

export default Skills;
