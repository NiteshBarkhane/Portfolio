import React, { useState, useEffect } from 'react';
import axios from 'axios';

const categories = ["All", "Web App", "Landing Page", "Management System"];

const Portfolio = () => {
    const [activeTab, setActiveTab] = useState("All");
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const res = await axios.get('http://localhost:5000/api/projects');
                setProjects(res.data);
            } catch (err) {
                console.error(err);
            }
        };
        fetchProjects();
    }, []);

    const filteredProjects = activeTab === "All"
        ? projects
        : projects.filter(p => p.category === activeTab);

    return (
        <section id="portfolio" className="section-container">
            <div className="text-center mb-16">
                <h2 className="text-5xl font-bold text-white mb-6 tracking-tight">Featured <span className="text-accent">Projects</span></h2>
                <p className="text-textSecondary max-w-3xl mx-auto text-lg leading-relaxed mb-10">
                    Evidence of versatility. From complex technical architectures to unique creative concepts, these projects showcase my ability to tackle any idea and turn it into a high-performance reality.
                </p>
                <div className="flex flex-wrap justify-center gap-4 mb-12">
                    {categories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setActiveTab(cat)}
                            className={`px-6 py-2 rounded-lg font-semibold transition-all border-2 ${activeTab === cat
                                ? "bg-accent border-accent text-white"
                                : "border-secondary text-textSecondary hover:border-accent"
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredProjects.map((project, index) => (
                    <div key={index} className="group relative overflow-hidden rounded-3xl bg-secondary aspect-square">
                        <img
                            src={project.image}
                            alt={project.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-accent/90 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center p-6 text-center">
                            <h3 className="text-2xl font-bold text-white mb-2">{project.title}</h3>
                            <p className="text-white/80 mb-6">{project.category}</p>
                            <a
                                href={project.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-block bg-white text-accent px-6 py-2 rounded-full font-bold hover:bg-white/90"
                            >
                                View Project
                            </a>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Portfolio;
