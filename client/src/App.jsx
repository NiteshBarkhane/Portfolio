import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import Skills from './components/Skills';
import Portfolio from './components/Portfolio';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Dashboard from './pages/Dashboard';

function App() {
    return (
        <Router>
            <div className="bg-primary min-h-screen text-textMain scroll-smooth">
                <Navbar />
                <Routes>
                    <Route path="/" element={
                        <main>
                            <Hero />
                            <Services />
                            <Skills />
                            <Portfolio />
                            <Contact />
                            <Footer />
                        </main>
                    } />
                    <Route path="/admin" element={<Dashboard />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
