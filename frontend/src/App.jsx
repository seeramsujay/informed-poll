import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Candidates from './pages/Candidates';
import Protocols from './pages/Protocols';
import NeuralSync from './pages/NeuralSync';

function App() {
  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--on-surface)] font-body selection:bg-[var(--primary)] selection:text-white overflow-x-hidden flex flex-col">
      {/* Kinetic Background elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
        <div 
          className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full blur-[120px] animate-pulse" 
          style={{ backgroundColor: 'color-mix(in srgb, var(--primary), transparent 90%)' }}
        />
        <div 
          className="absolute bottom-[-5%] right-[-5%] w-[30%] h-[30%] rounded-full blur-[100px]" 
          style={{ backgroundColor: 'color-mix(in srgb, var(--secondary), transparent 90%)' }}
        />
      </div>

      <Navbar />

      <div className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/candidates" element={<Candidates />} />
          <Route path="/protocols" element={<Protocols />} />
          <Route path="/neural-sync" element={<NeuralSync />} />
        </Routes>
      </div>

      <Footer />
    </div>
  );
}

export default App;

