import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSettings } from '../context/SettingsContext';
import { Smartphone, Layout, Palette, Globe, Server, Zap, Database } from 'lucide-react';

const iconMap = {
    Smartphone: <Smartphone className="text-accent w-12 h-12" />,
    Layout: <Layout className="text-accent w-12 h-12" />,
    Palette: <Palette className="text-accent w-12 h-12" />,
    Globe: <Globe className="text-accent w-12 h-12" />,
    Server: <Server className="text-accent w-12 h-12" />,
    Zap: <Zap className="text-accent w-12 h-12" />,
    Database: <Database className="text-accent w-12 h-12" />,
};

const Services = () => {
    const { getSetting } = useSettings();
    const [services, setServices] = useState([]);

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const sres = await axios.get('http://localhost:5000/api/services');
                setServices(sres.data);
            } catch (err) {
                console.error(err);
            }
        };
        fetchServices();
    }, []);

    return (
        <section id="services" className="section-container bg-primary relative">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent/5 blur-[150px] -z-10 rounded-full"></div>
            <div className="text-center mb-20">
                <h2 className="text-5xl font-bold text-white mb-6 tracking-tight">
                    {getSetting('services_title', "Technical Offerings")}
                </h2>
                <p className="text-textSecondary max-w-2xl mx-auto text-lg leading-relaxed">
                    {getSetting('services_subtitle', "I offer comprehensive development capabilities to bring any digital vision to life. From rapid prototyping of new ideas to building robust, enterprise-grade systems, I handle every technical challenge with professional precision.")}
                </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {services.map((service, index) => (
                    <div key={index} className="bg-secondary p-10 rounded-3xl hover:border-accent border border-transparent transition-all group">
                        <div className="mb-6 group-hover:scale-110 transition-transform">
                            {iconMap[service.icon] || <Layout className="text-accent w-12 h-12" />}
                        </div>
                        <h3 className="text-2xl font-bold text-textMain mb-4">{service.title}</h3>
                        <p className="text-textSecondary leading-relaxed">{service.description}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Services;
