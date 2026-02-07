import React, { useState } from 'react';
import axios from 'axios';
import { useForm, Controller } from 'react-hook-form';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import Icon from './Icon';
import { useSettings } from '../context/SettingsContext';

const Contact = () => {
    const { getSetting } = useSettings();
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState(null); // 'success' | 'error'

    const { register, handleSubmit, control, formState: { errors }, reset } = useForm();

    const onSubmit = async (data) => {
        // Honeypot Check
        if (data.website) {
            // If the hidden 'website' field is filled, it's a bot.
            // Fake a success to fool the bot.
            setStatus('success');
            reset();
            return;
        }

        setLoading(true);
        setStatus(null);
        try {
            await axios.post('http://localhost:5000/api/contact', data);
            setStatus('success');
            reset();
        } catch (error) {
            console.error(error);
            setStatus('error');
        } finally {
            setLoading(false);
        }
    };

    return (
        <section id="contact" className="section-container bg-primary flex flex-col items-center">
            <div className="text-center mb-16">
                <h2 className="text-5xl font-bold text-white mb-6 tracking-tight">
                    {getSetting('contact_title_prefix', "Let's")} <span className="text-accent underline decoration-white/20">{getSetting('contact_title_suffix', "Work Together")}</span>
                </h2>
                <p className="text-textSecondary max-w-2xl mx-auto text-lg leading-relaxed">
                    {getSetting('contact_desc', "Have a project in mind or just want to say hi? Feel free to reach out. I'm always open to discussing new projects, creative ideas, or opportunities to be part of your visions.")}
                </p>
            </div>

            <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 gap-16">
                <div className="space-y-8">
                    <div className="glass-card p-8">
                        <h3 className="text-2xl font-bold text-white mb-4">{getSetting('contact_info_title', "Contact Information")}</h3>
                        <p className="text-textSecondary mb-8 text-lg">{getSetting('contact_info_subtitle', "Prefer a direct message? You can find me on these platforms or drop an email.")}</p>
                        <ul className="space-y-6 text-white">
                            <li className="flex items-center gap-4">
                                <div className="p-3 bg-accent/20 rounded-lg text-accent"><Icon path="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2zM22 6l-10 7L2 6" name="Mail" /></div>
                                <span className="text-lg">{getSetting('contact_email', "niteshbarkhane123@gmail.com")}</span>
                            </li>
                            <li className="flex items-center gap-4">
                                <div className="p-3 bg-accent/20 rounded-lg text-accent"><Icon path="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0zM12 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" name="Map Pin" /></div>
                                <span className="text-lg">{getSetting('contact_location', "Indore, India")}</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    {/* Honeypot Field - Hidden from users */}
                    <input type="text" {...register("website")} style={{ display: 'none' }} tabIndex="-1" autoComplete="off" />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <input
                                {...register("name", { required: "Name is required" })}
                                type="text"
                                placeholder="Your Name"
                                className={`bg-secondary border rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-accent transition-colors text-lg w-full ${errors.name ? 'border-red-500' : 'border-white/10'}`}
                            />
                            {errors.name && <span className="text-red-500 text-sm pl-2">{errors.name.message}</span>}
                        </div>

                        <div className="space-y-2">
                            <input
                                {...register("email", {
                                    required: "Email is required",
                                    pattern: {
                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                        message: "Invalid email address"
                                    }
                                })}
                                type="email"
                                placeholder="Your Email"
                                className={`bg-secondary border rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-accent transition-colors text-lg w-full ${errors.email ? 'border-red-500' : 'border-white/10'}`}
                            />
                            {errors.email && <span className="text-red-500 text-sm pl-2">{errors.email.message}</span>}
                        </div>
                    </div>

                    <div className="space-y-2">
                        <div className="bg-secondary border border-white/10 rounded-2xl focus-within:border-accent transition-colors overflow-hidden">
                            <Controller
                                name="phone"
                                control={control}
                                rules={{ required: "Phone number is required" }}
                                render={({ field }) => (
                                    <PhoneInput
                                        country={'in'}
                                        value={field.value}
                                        onChange={phone => field.onChange(phone)}
                                        inputStyle={{
                                            width: '100%',
                                            height: '60px',
                                            fontSize: '1.125rem',
                                            backgroundColor: 'transparent',
                                            border: 'none',
                                            color: 'white',
                                            paddingLeft: '48px'
                                        }}
                                        buttonStyle={{
                                            backgroundColor: 'transparent',
                                            border: 'none',
                                            paddingLeft: '10px'
                                        }}
                                        dropdownStyle={{
                                            backgroundColor: '#1a1a2e',
                                            color: 'white'
                                        }}
                                    />
                                )}
                            />
                        </div>
                        {errors.phone && <span className="text-red-500 text-sm pl-2">{errors.phone.message}</span>}
                    </div>

                    <div className="space-y-2">
                        <textarea
                            {...register("message", { required: "Message is required" })}
                            placeholder="Your Message"
                            rows="5"
                            className={`bg-secondary border rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-accent transition-colors text-lg w-full resize-none ${errors.message ? 'border-red-500' : 'border-white/10'}`}
                        ></textarea>
                        {errors.message && <span className="text-red-500 text-sm pl-2">{errors.message.message}</span>}
                    </div>

                    {status === 'success' && (
                        <div className="bg-green-500/20 text-green-400 p-4 rounded-xl border border-green-500/30">
                            Message sent successfully! I'll get back to you soon.
                        </div>
                    )}
                    {status === 'error' && (
                        <div className="bg-red-500/20 text-red-400 p-4 rounded-xl border border-red-500/30">
                            Something went wrong. Please try again.
                        </div>
                    )}

                    <button
                        disabled={loading}
                        className="bg-accent text-white px-12 py-4 rounded-full font-bold text-xl hover:shadow-[0_0_20px_rgba(124,58,237,0.5)] transition-all w-full flex items-center justify-center gap-3 disabled:opacity-70"
                    >
                        {loading ? <><Icon path="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" name="Loader" className="animate-spin" /> Sending...</> : <><Icon path="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" name="Send" size={20} /> Send Message</>}
                    </button>
                </form>
            </div>
        </section>
    );
};

export default Contact;
