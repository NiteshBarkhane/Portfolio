import React from 'react';
import { motion } from 'framer-motion';
import { useSettings } from '../context/SettingsContext';

const Pricing = () => {
    const { settings } = useSettings();

    const getFeatures = (featuresString) => {
        return featuresString ? featuresString.split('|') : [];
    };

    const pricingTiers = [
        {
            title: settings.pricing_basic_title || 'Landing Page',
            price: settings.pricing_basic_price || '₹10,000 - ₹20,000',
            features: getFeatures(settings.pricing_basic_features)
        },
        {
            title: settings.pricing_standard_title || 'Business Website',
            price: settings.pricing_standard_price || '₹30,000 - ₹60,000',
            features: getFeatures(settings.pricing_standard_features),
            featured: true
        },
        {
            title: settings.pricing_premium_title || 'Web Application',
            price: settings.pricing_premium_price || '₹60,000+',
            features: getFeatures(settings.pricing_premium_features)
        }
    ];

    return (
        <section id="pricing" className="py-20 bg-primary">
            <div className="container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl font-bold mb-4">
                        {settings.pricing_title || 'Transparent Pricing'}
                    </h2>
                    <p className="text-textSecondary max-w-2xl mx-auto">
                        {settings.pricing_subtitle || 'Flexible pricing based on project scope and requirements'}
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {pricingTiers.map((tier, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className={`bg-secondary/50 rounded-xl p-8 border ${
                                tier.featured ? 'border-accent scale-105' : 'border-accent/20'
                            }`}
                        >
                            {tier.featured && (
                                <span className="bg-accent text-white text-xs px-3 py-1 rounded-full">
                                    Popular
                                </span>
                            )}
                            <h3 className="text-2xl font-bold mt-4 mb-2">{tier.title}</h3>
                            <p className="text-3xl font-bold text-accent mb-6">{tier.price}</p>
                            <ul className="space-y-3 mb-8">
                                {tier.features.map((feature, i) => (
                                    <li key={i} className="flex items-start gap-2 text-textSecondary">
                                        <span className="text-accent mt-1">✓</span>
                                        <span>{feature}</span>
                                    </li>
                                ))}
                            </ul>
                            <a 
                                href="#contact"
                                className="block w-full text-center py-3 bg-accent/10 hover:bg-accent hover:text-white border border-accent rounded-lg transition-all"
                            >
                                Get Started
                            </a>
                        </motion.div>
                    ))}
                </div>

                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="text-center text-textSecondary mt-12 max-w-3xl mx-auto"
                >
                    {settings.pricing_note || 'Pricing is flexible based on project scope, timeline, and requirements. Let\'s discuss your specific needs.'}
                </motion.p>
            </div>
        </section>
    );
};

export default Pricing;
