import React, { useState, useEffect, useMemo, useCallback } from 'react';
import axios from 'axios';
import { useSettings } from '../context/SettingsContext';
import Icon from './Icon';

const Portfolio = () => {
    const { getSetting } = useSettings();
    const [activeTab, setActiveTab] = useState("All");
    const [projects, setProjects] = useState([]);
    const [categories, setCategories] = useState(["All"]);
    const [showAll, setShowAll] = useState(false);

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
        setShowAll(false);
    }, []);

    const visibleProjects = showAll ? filteredProjects : filteredProjects.slice(0, 3);
    const hasMore = filteredProjects.length > 3;

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
                {visibleProjects.map((project) => (
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
                                        <Icon path="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3" name="External Link" size={14} /> Live View
                                    </a>
                                )}
                                {project.github && (
                                    <a href={project.github} target="_blank" rel="noreferrer" className="flex-1 flex items-center justify-center gap-2 text-xs font-bold bg-white/5 py-2.5 rounded-lg hover:bg-white/20 text-white transition-all">
                                        <Icon path="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" name="GitHub" size={14} /> Code
                                    </a>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* See More/Show Less Button */}
            {hasMore && (
                <div className="mt-16 text-center relative">
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
                    </div>
                    <button
                        onClick={() => setShowAll(!showAll)}
                        className="relative bg-secondary/80 backdrop-blur-sm text-white px-10 py-4 rounded-full font-bold text-sm tracking-wide border border-white/10 hover:border-accent hover:bg-accent/10 transition-all duration-300 shadow-lg hover:shadow-accent/20 group"
                    >
                        <span className="flex items-center gap-2">
                            {showAll ? (
                                <>
                                    Show Less
                                    <svg className="w-4 h-4 transition-transform group-hover:-translate-y-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                                    </svg>
                                </>
                            ) : (
                                <>
                                    See More Projects
                                    <svg className="w-4 h-4 transition-transform group-hover:translate-y-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </>
                            )}
                        </span>
                    </button>
                </div>
            )}
        </section>
    );
};

export default Portfolio;
