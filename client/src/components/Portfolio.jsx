import React, { useState, useEffect, useMemo, useCallback } from 'react';
import axios from 'axios';
import { useSettings } from '../context/SettingsContext';
import { ExternalLink, Github } from 'lucide-react';

const Portfolio = () => {
    const { getSetting } = useSettings();
    const [activeTab, setActiveTab] = useState("All");
    const [projects, setProjects] = useState([]);
    const [categories, setCategories] = useState(["All"]);
    const [visibleCount, setVisibleCount] = useState(4); // Feature only 4 by default

    useEffect(() => {
        const fetchData = async () => {
            try {
                const pRes = await axios.get('http://localhost:5000/api/projects');
                setProjects(pRes.data);

                const cRes = await axios.get('http://localhost:5000/api/categories');
                const catNames = ["All", ...cRes.data.map(cat => cat.name)];
                setCategories(catNames);
            } catch (err) {
                console.error(err);
                setCategories(["All", "Web App", "Landing Page", "Management System"]);
            }
        };
        fetchData();
    }, []);

    // Memoize filtered projects to prevent unnecessary recalculations
    const filteredProjects = useMemo(() => {
        if (activeTab === "All") return projects;
        return projects.filter(p => p.category === activeTab);
    }, [activeTab, projects]);

    const handleTabChange = useCallback((cat) => {
        setActiveTab(cat);
        setVisibleCount(4); // Reset to 4 when changing category
    }, []);

    const showAllProjects = () => {
        setVisibleCount(filteredProjects.length);
    };

    return (
        <section id="portfolio" className="section-container">
            <div className="text-center mb-16">
                <h2 className="text-5xl font-bold text-white mb-6 tracking-tight">
                    {getSetting('portfolio_title', "Featured Projects")}
                </h2>
                <p className="text-textSecondary max-w-3xl mx-auto text-lg leading-relaxed mb-10">
                    {getSetting('portfolio_subtitle', "Evidence of versatility. From complex technical architectures to unique creative concepts, these projects showcase my ability to tackle any idea and turn it into a high-performance reality.")}
                </p>

                {/* Categories */}
                <div className="flex flex-wrap justify-center gap-4 mb-12">
                    {categories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => handleTabChange(cat)}
                            className={`px-6 py-2 rounded-lg font-bold text-sm transition-all border ${activeTab === cat
                                ? "bg-accent border-accent text-white shadow-lg shadow-accent/20"
                                : "border-white/10 bg-secondary/50 text-textSecondary hover:border-white/30 hover:text-white"
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            {/* Projects Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredProjects.slice(0, visibleCount).map((project) => (
                    <div key={project._id} className="glass-card p-4 group relative border border-white/5 hover:border-accent/40 transition-all duration-300 flex flex-col h-full">
                        <div className="aspect-video w-full rounded-lg overflow-hidden mb-4 bg-black/20 flex-shrink-0">
                            <img
                                src={project.image || 'https://via.placeholder.com/300?text=No+Image'}
                                alt={project.title}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                loading="lazy" // Native lazy loading
                            />
                        </div>

                        <div className="flex flex-col flex-grow">
                            <h3 className="text-lg font-bold text-white mb-2">{project.title}</h3>
                            <p className="text-textSecondary text-sm line-clamp-5 leading-relaxed mb-4 flex-grow">
                                {project.description}
                            </p>

                            <div className="flex gap-3 mt-auto pt-4 border-t border-white/5">
                                {project.link && (
                                    <a href={project.link} target="_blank" rel="noreferrer" className="flex-1 flex items-center justify-center gap-2 text-xs font-bold bg-white/5 py-2.5 rounded-lg hover:bg-accent text-white transition-all">
                                        <ExternalLink size={14} /> Live View
                                    </a>
                                )}
                                {project.github && (
                                    <a href={project.github} target="_blank" rel="noreferrer" className="flex-1 flex items-center justify-center gap-2 text-xs font-bold bg-white/5 py-2.5 rounded-lg hover:bg-white/20 text-white transition-all">
                                        <Github size={14} /> Code
                                    </a>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* See All Button */}
            {visibleCount < filteredProjects.length && (
                <div className="mt-16 text-center">
                    <button
                        onClick={showAllProjects}
                        className="bg-accent text-white px-8 py-3 rounded-full font-bold text-sm tracking-wide hover:shadow-[0_0_20px_rgba(124,58,237,0.4)] transition-all transform hover:-translate-y-1"
                    >
                        See All Projects
                    </button>
                </div>
            )}
        </section>
    );
};

export default Portfolio;
