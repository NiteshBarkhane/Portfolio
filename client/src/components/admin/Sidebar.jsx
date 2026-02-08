import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import Icon from '../Icon';

const Sidebar = ({ isOpen, setIsOpen }) => {
    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem('adminToken');
        navigate('/login');
    };

    const links = [
        { path: '/admin/cms', label: 'CMS / Content', icon: 'M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z' },
        { path: '/admin/services', label: 'Services', icon: 'M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z' },
        { path: '/admin/projects', label: 'Projects', icon: 'M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z' },
        { path: '/admin/categories', label: 'Categories', icon: 'M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82zM7 7h.01' },
        { path: '/admin/skills', label: 'Skills', icon: 'M22 12h-4l-3 9L9 3l-3 9H2' },
        { path: '/admin/testimonials', label: 'Testimonials', icon: 'M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z' },
        { path: '/admin/faqs', label: 'FAQs', icon: 'M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3M12 17h.01' },
        { path: '/admin/inquiries', label: 'Inquiries', icon: 'M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z' },
    ];

    return (
        <>
            {/* Mobile Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                    onClick={() => setIsOpen(false)}
                />
            )}

            {/* Sidebar Container */}
            <aside className={`
                fixed top-0 left-0 h-full bg-secondary border-r border-white/5 
                w-64 z-50 transition-transform duration-300 ease-in-out
                ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
            `}>
                <div className="flex flex-col h-full p-4">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-8">
                        <div className="text-xl font-black text-white tracking-tighter">
                            Admin<span className="text-accent">Panel</span>
                        </div>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="lg:hidden text-white/50 hover:text-white"
                        >
                            <Icon path="M18 6L6 18M6 6l12 12" name="Close" size={24} />
                        </button>
                    </div>

                    {/* Navigation */}
                    <nav className="flex-1 space-y-1">
                        {links.map((link) => (
                            <NavLink
                                key={link.path}
                                to={link.path}
                                onClick={() => setIsOpen(false)}
                                className={({ isActive }) => `
                                    flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all font-medium
                                    ${isActive
                                        ? 'bg-accent text-white shadow-md'
                                        : 'text-textSecondary hover:bg-white/5 hover:text-white'}
                                `}
                            >
                                <Icon path={link.icon} name={link.label} size={18} />
                                {link.label}
                            </NavLink>
                        ))}
                    </nav>

                    {/* Footer */}
                    <button
                        onClick={logout}
                        className="mt-auto flex items-center gap-3 px-3 py-2.5 text-red-400 hover:bg-red-400/10 rounded-lg transition-all font-medium"
                    >
                        <Icon path="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9" name="Logout" size={18} />
                        Logout
                    </button>
                </div>
            </aside>
        </>
    );
};

export default Sidebar;
