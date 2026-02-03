import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Skills from './components/Skills';
import Portfolio from './components/Portfolio';
import Approach from './components/Approach';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';

import { SettingsProvider } from './context/SettingsContext';

function App() {
    return (
        <SettingsProvider>
            <Router>
                <div className="bg-primary min-h-screen text-textMain scroll-smooth font-sans overflow-x-hidden">
                    <Routes>
                        <Route path="/" element={
                            <>
                                <Navbar />
                                <main>
                                    <Hero />
                                    <About />
                                    <Services />
                                    <Portfolio />
                                    <Approach />
                                    <Contact />
                                </main>
                                <Footer />
                            </>
                        } />
                        <Route path="/admin" element={<Dashboard />} />
                        <Route path="/login" element={<Login />} />
                    </Routes>
                </div>
            </Router>
        </SettingsProvider>
    );
}

export default App;
