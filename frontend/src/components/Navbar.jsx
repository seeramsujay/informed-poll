import React from 'react';
import { Vote } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-md sticky top-0 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="bg-purple-600 p-1.5 rounded-lg">
            <Vote className="w-6 h-6 text-white" />
          </div>
          <span className="text-2xl font-display tracking-wider">VOTE<span className="text-purple-500">IQ</span></span>
        </div>
        
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
          <a href="#" className="hover:text-purple-400 transition-colors">Candidates</a>
          <a href="#" className="hover:text-purple-400 transition-colors">Process</a>
          <a href="#" className="hover:text-purple-400 transition-colors">Results</a>
          <button className="bg-purple-600 hover:bg-purple-700 text-white px-5 py-2 rounded-full transition-all hover:scale-105 active:scale-95 shadow-lg shadow-purple-500/20">
            Get Started
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
