import React, { useState } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import Sidebar from '../components/admin/Sidebar';
import Icon from '../components/Icon';

const AdminLayout = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const token = localStorage.getItem('adminToken');

    if (!token) {
        return <Navigate to="/login" replace />;
    }

    return (
        <div className="min-h-screen bg-primary flex font-sans text-sm">
            {/* Sidebar */}
            <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col min-w-0 lg:ml-64 transition-all duration-300">
                {/* Mobile Header for Toggle */}
                <header className="lg:hidden bg-secondary border-b border-white/5 p-4 flex items-center justify-between sticky top-0 z-30">
                    <div className="text-xl font-black text-white tracking-tighter">
                        Admin<span className="text-accent">Panel</span>
                    </div>
                    <button
                        onClick={() => setIsSidebarOpen(true)}
                        className="text-white p-2 hover:bg-white/5 rounded-lg"
                    >
                        <Icon path="M3 12h18M3 6h18M3 18h18" name="Menu" size={24} />
                    </button>
                </header>

                <main className="flex-1 p-4 md:p-6 overflow-y-auto">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;
