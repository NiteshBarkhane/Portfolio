import React from 'react';

const Contact = () => {
    return (
        <section id="contact" className="py-24 px-8 md:px-24 bg-primary flex flex-col items-center text-center">
            <h2 className="text-5xl font-bold text-textMain mb-4">Contact me</h2>
            <p className="text-textSecondary max-w-2xl mb-12">
                Cultivating Connections: Reach Out And Connect With Me
            </p>

            <form className="w-full max-w-3xl flex flex-col md:flex-row gap-4">
                <input
                    type="email"
                    placeholder="Enter Your Email"
                    className="flex-1 bg-secondary border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-accent transition-colors text-lg"
                />
                <button className="bg-accent text-white px-12 py-4 rounded-2xl font-bold text-xl hover:bg-orange-600 transition-all">
                    Contact Me
                </button>
            </form>
        </section>
    );
};

export default Contact;
