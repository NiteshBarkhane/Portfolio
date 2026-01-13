import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Smartphone, Layout, Palette } from 'lucide-react';

const iconMap = {
    Smartphone: <Smartphone className="text-accent w-12 h-12" />,
    Layout: <Layout className="text-accent w-12 h-12" />,
    Palette: <Palette className="text-accent w-12 h-12" />,
};

const Services = () => {
    const [services, setServices] = useState([]);

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const res = await axios.get('http://localhost:5000/api/services');
                setServices(res.data);
            } catch (err) {
                console.error(err);
            }
        };
        fetchServices();
    }, []);
    return (
        <section id="services" className="py-24 px-8 md:px-24 bg-primary">
            <div className="text-center mb-16">
                <h2 className="text-4xl font-bold text-textMain mb-4">Services</h2>
                <p className="text-textSecondary max-w-2xl mx-auto">
                    Delivering high-quality design solutions tailored to your needs.
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
