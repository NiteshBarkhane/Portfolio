import React, { useEffect, useState } from 'react';

const Preloader = () => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 2000); // Minimum load time for effect

        const handleLoad = () => setLoading(false);
        window.addEventListener('load', handleLoad);

        return () => {
            window.removeEventListener('load', handleLoad);
            clearTimeout(timer);
        };
    }, []);

    if (!loading) return null;

    return (
        <div className="fixed inset-0 bg-primary z-[9999] flex items-center justify-center">
            <div className="relative flex flex-col items-center">
                <div className="w-20 h-20 border-4 border-white/10 border-t-accent rounded-full animate-spin mb-4"></div>
                <h2 className="text-white text-xl font-bold tracking-[0.2em] animate-pulse">LOADING</h2>
            </div>
        </div>
    );
};

export default Preloader;
