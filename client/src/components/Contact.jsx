import React from 'react';

const Contact = () => {
    return (
        <section id="contact" className="section-container bg-primary flex flex-col items-center">
            <div className="text-center mb-16">
                <h2 className="text-5xl font-bold text-white mb-6 tracking-tight">Let's <span className="text-accent underline decoration-white/20">Work Together</span></h2>
                <p className="text-textSecondary max-w-2xl mx-auto text-lg leading-relaxed">
                    Have a project in mind or just want to say hi? Feel free to reach out. I'm always open to discussing new projects, creative ideas, or opportunities to be part of your visions.
                </p>
            </div>

            <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 gap-16">
                <div className="space-y-8">
                    <div className="glass-card p-8">
                        <h3 className="text-2xl font-bold text-white mb-4">Contact Information</h3>
                        <p className="text-textSecondary mb-8 text-lg">Prefer a direct message? You can find me on these platforms or drop an email.</p>
                        <ul className="space-y-4 text-white">
                            <li className="flex items-center gap-4">
                                <div className="p-3 bg-accent/20 rounded-lg text-accent">📧</div>
                                <span className="text-lg">niteshbarkhane123@gmail.com</span>
                            </li>
                            <li className="flex items-center gap-4">
                                <div className="p-3 bg-accent/20 rounded-lg text-accent">📍</div>
                                <span className="text-lg">Indore, India</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <form className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <input
                            type="text"
                            placeholder="Your Name"
                            className="bg-secondary border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-accent transition-colors text-lg w-full"
                        />
                        <input
                            type="email"
                            placeholder="Your Email"
                            className="bg-secondary border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-accent transition-colors text-lg w-full"
                        />
                    </div>
                    <textarea
                        placeholder="Your Message"
                        rows="5"
                        className="bg-secondary border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-accent transition-colors text-lg w-full resize-none"
                    ></textarea>
                    <button className="bg-accent text-white px-12 py-4 rounded-full font-bold text-xl hover:shadow-[0_0_20px_rgba(124,58,237,0.5)] transition-all w-full">
                        Send Message
                    </button>
                </form>
            </div>
        </section>
    );
};

export default Contact;
