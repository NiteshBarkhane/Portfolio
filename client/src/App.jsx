import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import Navbar from './components/Navbar';
import Preloader from './components/Preloader';
import BackToTop from './components/BackToTop';
import { SettingsProvider } from './context/SettingsContext';

// Eagerly loaded specific components to ensure LCP (Largest Contentful Paint) is fast
import Hero from './components/Hero';

// Lazy Load Section Components (Code Splitting)
const About = lazy(() => import('./components/About'));
const Services = lazy(() => import('./components/Services'));
const Portfolio = lazy(() => import('./components/Portfolio'));
const Approach = lazy(() => import('./components/Approach'));
const Contact = lazy(() => import('./components/Contact'));
const Footer = lazy(() => import('./components/Footer'));

// Lazy Load Pages
const Login = lazy(() => import('./pages/Login'));
const AdminLayout = lazy(() => import('./layouts/AdminLayout'));
const AdminCMS = lazy(() => import('./pages/admin/AdminCMS'));
const AdminProjects = lazy(() => import('./pages/admin/AdminProjects'));
const AdminServices = lazy(() => import('./pages/admin/AdminServices'));
const AdminCategories = lazy(() => import('./pages/admin/AdminCategories'));
const AdminInquiries = lazy(() => import('./pages/admin/AdminInquiries'));

// Loading Fallback
const SectionLoader = () => (
    <div className="py-20 flex justify-center items-center">
        <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin"></div>
    </div>
);

function App() {
    return (
        <SettingsProvider>
            <Preloader />
            <Toaster position="top-right" reverseOrder={false} />
            <Router>
                <div className="bg-primary min-h-screen text-textMain scroll-smooth font-sans overflow-x-hidden">
                    <Suspense fallback={<SectionLoader />}>
                        <Routes>
                            <Route path="/" element={
                                <>
                                    <Navbar />
                                    <main>
                                        <Hero />
                                        <Suspense fallback={<div className="h-screen"></div>}>
                                            <About />
                                        </Suspense>
                                        <Services />
                                        <Portfolio />
                                        <Approach />
                                        <Contact />
                                    </main>
                                    <Footer />
                                    <BackToTop />
                                </>
                            } />

                            <Route path="/login" element={<Login />} />

                            {/* Admin Routes */}
                            <Route path="/admin" element={<AdminLayout />}>
                                <Route index element={<Navigate to="/admin/cms" replace />} />
                                <Route path="cms" element={<AdminCMS />} />
                                <Route path="projects" element={<AdminProjects />} />
                                <Route path="services" element={<AdminServices />} />
                                <Route path="categories" element={<AdminCategories />} />
                                <Route path="inquiries" element={<AdminInquiries />} />
                            </Route>
                        </Routes>
                    </Suspense>
                </div>
            </Router>
        </SettingsProvider>
    );
}

export default App;
