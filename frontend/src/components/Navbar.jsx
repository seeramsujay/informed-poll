import React from 'react';
import { Vote, Menu, Zap } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="glass sticky top-0 z-[100] border-x-0 border-t-0 border-b border-white/10">
      <div className="max-w-[1800px] mx-auto px-6 lg:px-12 h-24 flex items-center justify-between">
        <div className="flex items-center gap-4 group cursor-pointer">
          <div className="bg-[var(--primary)] p-2.5 rounded-xl neon-glow-primary transform group-hover:rotate-12 transition-transform">
            <Zap className="w-7 h-7 text-white fill-white" />
          </div>
          <div className="flex flex-col">
            <span className="text-3xl font-display tracking-tighter leading-none italic">
              INFORMED <span className="text-[var(--primary)]">POLL</span>
            </span>
            <span className="text-[10px] font-bold tracking-[0.3em] text-white/40 uppercase leading-none mt-1">
              Decentralized Consensus V4.2
            </span>
          </div>
        </div>
        
        <div className="hidden lg:flex items-center gap-12 text-sm font-bold uppercase tracking-widest">
          {['Candidates', 'Protocols', 'Neural-Sync'].map((item) => (
            <a 
              key={item}
              href={`#${item.toLowerCase()}`} 
              className="relative text-white/70 hover:text-[var(--primary)] transition-colors group"
            >
              {item}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-[var(--primary)] transition-all group-hover:w-full"></span>
            </a>
          ))}
          
          <button className="relative overflow-hidden bg-white text-black px-8 py-3 rounded-none font-display text-xl uppercase italic hover:bg-[var(--primary)] hover:text-white transition-all transform hover:-translate-y-1 hover:shadow-[0_10px_20px_rgba(110,0,255,0.3)]">
            Connect Identity
          </button>
        </div>

        <button className="lg:hidden p-2 text-white">
          <Menu className="w-8 h-8" />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;

