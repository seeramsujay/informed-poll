import React from 'react';
import { Zap, MessageCircle, Globe, Network, Cpu } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="mt-32 border-t border-white/5 bg-black/40 backdrop-blur-xl pt-32 pb-12 overflow-hidden relative">
      <div className="absolute top-0 right-0 w-[50%] h-[1px] bg-gradient-to-r from-transparent via-[var(--primary)] to-transparent opacity-50" />
      
      <div className="max-w-[1800px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 mb-32">
          
          <div className="md:col-span-4 space-y-8">
            <div className="flex items-center gap-4">
              <div className="bg-[var(--primary)] p-2 rounded-xl">
                <Zap className="w-6 h-6 text-white fill-white" />
              </div>
              <span className="text-3xl font-display tracking-tighter leading-none italic">
                INFORMED <span className="text-[var(--primary)]">POLL</span>
              </span>
            </div>
            <p className="text-white/40 text-sm leading-relaxed max-w-sm uppercase tracking-wider font-medium">
              Architecting the future of democratic participation through high-fidelity data synthesis and autonomous neural verification.
            </p>
            <div className="flex gap-4">
              {[MessageCircle, Globe, Network].map((Icon, i) => (
                <a key={i} href="#" className="w-12 h-12 flex items-center justify-center border border-white/10 rounded-none hover:bg-[var(--primary)] hover:border-[var(--primary)] transition-all">
                  <Icon className="w-5 h-5 text-white" />
                </a>
              ))}
            </div>
          </div>
          
          <div className="md:col-span-2 space-y-8">
            <h4 className="font-display text-2xl uppercase italic tracking-tighter text-white">System</h4>
            <ul className="space-y-4 text-xs font-bold uppercase tracking-[0.2em] text-white/40">
              <li><a href="#" className="hover:text-[var(--primary)] transition-colors">Neural-Net</a></li>
              <li><a href="#" className="hover:text-[var(--primary)] transition-colors">Ledger-Auth</a></li>
              <li><a href="#" className="hover:text-[var(--primary)] transition-colors">Sync-Status</a></li>
              <li><a href="#" className="hover:text-[var(--primary)] transition-colors">Core-Protocol</a></li>
            </ul>
          </div>
          
          <div className="md:col-span-2 space-y-8">
            <h4 className="font-display text-2xl uppercase italic tracking-tighter text-white">Archives</h4>
            <ul className="space-y-4 text-xs font-bold uppercase tracking-[0.2em] text-white/40">
              <li><a href="#" className="hover:text-[var(--primary)] transition-colors">Manifesto</a></li>
              <li><a href="#" className="hover:text-[var(--primary)] transition-colors">Whitepaper</a></li>
              <li><a href="#" className="hover:text-[var(--primary)] transition-colors">Node-Maps</a></li>
              <li><a href="#" className="hover:text-[var(--primary)] transition-colors">Legal-Void</a></li>
            </ul>
          </div>
          
          <div className="md:col-span-4 space-y-8">
            <h4 className="font-display text-2xl uppercase italic tracking-tighter text-white">Neural Subscription</h4>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/40">Direct-to-mind update stream.</p>
            <div className="flex gap-0">
              <input 
                type="text" 
                placeholder="USER@IDENT.NET" 
                className="bg-white/5 border border-white/10 border-r-0 px-6 py-4 text-xs font-bold uppercase tracking-widest w-full focus:outline-none focus:border-[var(--primary)] transition-colors" 
              />
              <button className="bg-[var(--primary)] px-8 py-4 text-xs font-black uppercase tracking-widest text-white hover:bg-[var(--secondary)] transition-colors">
                Link
              </button>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-center pt-12 border-t border-white/5 gap-8">
          <div className="flex items-center gap-4 text-[10px] font-black tracking-[0.4em] text-white/20 uppercase">
            <Cpu className="w-4 h-4" />
            <p>© 2026 INFORMED POLL // KINETIC-CORE. NO RIGHTS RESERVED.</p>
          </div>
          <div className="flex gap-12 text-[10px] font-black tracking-[0.4em] text-white/20 uppercase">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <a href="#" className="hover:text-white transition-colors">Protocol</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

