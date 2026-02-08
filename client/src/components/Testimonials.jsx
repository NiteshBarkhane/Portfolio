import React, { useEffect, useState } from 'react';
import api from '../config/api';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

const Testimonials = () => {
    const [testimonials, setTestimonials] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [showForm, setShowForm] = useState(false);
    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    useEffect(() => {
        api.get('/testimonials/featured')
            .then(res => setTestimonials(res.data))
            .catch(err => console.error(err));
    }, []);

    useEffect(() => {
        if (testimonials.length > 0) {
            const interval = setInterval(() => {
                setCurrentIndex(prev => (prev + 3 >= testimonials.length ? 0 : prev + 3));
            }, 5000);
            return () => clearInterval(interval);
        }
    }, [testimonials]);

    const onSubmit = async (data) => {
        const formData = new FormData();
        formData.append('name', data.name);
        formData.append('email', data.email);
        formData.append('company', data.company || '');
        formData.append('rating', data.rating);
        formData.append('text', data.text);
        if (data.userImage?.[0]) {
            formData.append('userImage', data.userImage[0]);
        }

        try {
            await api.post('/testimonials/submit', formData);
            toast.success('Thank you! Your testimonial is pending approval.');
            reset();
            setShowForm(false);
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to submit testimonial');
        }
    };

    const visibleTestimonials = testimonials.slice(currentIndex, currentIndex + 3);

    return (
        <section id="testimonials" className="py-20 bg-primary">
            <div className="container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                >
                    <h2 className="text-4xl font-bold mb-4">
                        Client <span className="text-accent">Testimonials</span>
                    </h2>
                    <p className="text-textSecondary mb-6">What people say about my work</p>
                    <button
                        onClick={() => setShowForm(!showForm)}
                        className="px-6 py-3 bg-accent hover:bg-accent/80 rounded-lg transition-colors"
                    >
                        Leave a Review
                    </button>
                </motion.div>

                <AnimatePresence mode="wait">
                    {showForm && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="max-w-2xl mx-auto mb-12 bg-secondary/50 rounded-xl p-8 border border-accent/20"
                        >
                            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div>
                                        <input
                                            {...register('name', { required: 'Name is required' })}
                                            placeholder="Your Name *"
                                            className="w-full px-4 py-3 bg-primary border border-accent/20 rounded-lg focus:outline-none focus:border-accent"
                                        />
                                        {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
                                    </div>
                                    <div>
                                        <input
                                            {...register('email', {
                                                required: 'Email is required',
                                                pattern: { value: /^\S+@\S+$/i, message: 'Invalid email' }
                                            })}
                                            placeholder="Your Email *"
                                            className="w-full px-4 py-3 bg-primary border border-accent/20 rounded-lg focus:outline-none focus:border-accent"
                                        />
                                        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                                    </div>
                                </div>
                                <input
                                    {...register('company')}
                                    placeholder="Company (Optional)"
                                    className="w-full px-4 py-3 bg-primary border border-accent/20 rounded-lg focus:outline-none focus:border-accent"
                                />
                                <div>
                                    <label className="block mb-2 text-sm">Rating *</label>
                                    <div className="flex gap-2">
                                        {[1, 2, 3, 4, 5].map(star => (
                                            <label key={star} className="cursor-pointer">
                                                <input
                                                    type="radio"
                                                    {...register('rating', { required: 'Rating is required' })}
                                                    value={star}
                                                    className="hidden peer"
                                                />
                                                <span className="text-3xl peer-checked:text-accent text-gray-600">★</span>
                                            </label>
                                        ))}
                                    </div>
                                    {errors.rating && <p className="text-red-500 text-sm mt-1">{errors.rating.message}</p>}
                                </div>
                                <textarea
                                    {...register('text', {
                                        required: 'Testimonial is required',
                                        maxLength: { value: 500, message: 'Max 500 characters' }
                                    })}
                                    placeholder="Write your testimonial/feedback message *"
                                    rows="4"
                                    className="w-full px-4 py-3 bg-primary border border-accent/20 rounded-lg focus:outline-none focus:border-accent resize-none"
                                />
                                {errors.text && <p className="text-red-500 text-sm">{errors.text.message}</p>}
                                <div className="space-y-2">
                                    <label className="block text-sm text-textSecondary">Profile Photo (Optional)</label>
                                    <input
                                        type="file"
                                        {...register('userImage')}
                                        accept="image/*"
                                        className="w-full px-4 py-3 bg-primary border border-accent/20 rounded-lg text-sm text-textSecondary file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-accent/10 file:text-accent hover:file:bg-accent/20"
                                    />
                                </div>
                                <div className="flex gap-4">
                                    <button type="submit" className="flex-1 py-3 bg-accent hover:bg-accent/80 rounded-lg transition-colors">
                                        Submit Review
                                    </button>
                                    <button type="button" onClick={() => setShowForm(false)} className="px-6 py-3 border border-accent/20 rounded-lg hover:bg-accent/10 transition-colors">
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    )}
                </AnimatePresence>

                {testimonials.length > 0 && (
                    <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        {visibleTestimonials.map((testimonial, index) => (
                            <motion.div
                                key={testimonial._id}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-secondary/50 rounded-xl p-6 border border-accent/20"
                            >
                                <div className="flex items-center gap-4 mb-4">
                                    <img
                                        src={testimonial.userImage || `https://ui-avatars.com/api/?name=${testimonial.name}&background=7c3aed&color=fff`}
                                        alt={testimonial.name}
                                        className="w-12 h-12 rounded-full object-cover"
                                    />
                                    <div>
                                        <h4 className="font-semibold">{testimonial.name}</h4>
                                        {testimonial.company && <p className="text-sm text-textSecondary">{testimonial.company}</p>}
                                    </div>
                                </div>
                                <div className="text-accent mb-2">
                                    {'★'.repeat(testimonial.rating)}{'☆'.repeat(5 - testimonial.rating)}
                                </div>
                                <p className="text-textSecondary">{testimonial.text}</p>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
};

export default Testimonials;
