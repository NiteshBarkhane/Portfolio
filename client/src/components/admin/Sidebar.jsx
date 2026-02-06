import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
    LayoutDashboard, Folder, Lightbulb, MessageSquare,
    LogOut, Menu, X, Tag
} from 'lucide-react';

const Sidebar = ({ isOpen, setIsOpen }) => {
    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem('adminToken');
        navigate('/login');
    };

    const links = [
        { path: '/admin/cms', label: 'CMS / Content', icon: LayoutDashboard },
        { path: '/admin/services', label: 'Services', icon: Lightbulb },
        { path: '/admin/projects', label: 'Projects', icon: Folder },
        { path: '/admin/categories', label: 'Categories', icon: Tag },
        { path: '/admin/inquiries', label: 'Inquiries', icon: MessageSquare },
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
                            <X size={24} />
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
                                <link.icon size={18} />
                                {link.label}
                            </NavLink>
                        ))}
                    </nav>

                    {/* Footer */}
                    <button
                        onClick={logout}
                        className="mt-auto flex items-center gap-3 px-3 py-2.5 text-red-400 hover:bg-red-400/10 rounded-lg transition-all font-medium"
                    >
                        <LogOut size={18} />
                        Logout
                    </button>
                </div>
            </aside>
        </>
    );
};

export default Sidebar;
