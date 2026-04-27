import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, Zap } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative pt-20 pb-32 overflow-visible">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] -z-10 pointer-events-none">
        <div className="absolute top-[-10%] left-[10%] w-[500px] h-[500px] bg-[var(--primary)]/30 rounded-full blur-[160px] animate-pulse"></div>
        <div className="absolute bottom-0 right-[10%] w-[600px] h-[600px] bg-[var(--secondary)]/20 rounded-full blur-[180px]" style={{ animationDelay: '2s' }}></div>
      </div>
      
      <div className="max-w-6xl mx-auto px-4 relative">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="space-y-6"
        >
          <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full glass border-[var(--primary)]/30 text-xs font-bold tracking-[0.2em] uppercase text-[var(--secondary)] neon-glow-secondary">
            <Zap className="w-4 h-4 fill-current" />
            <span>No Partisan Lines. Just Facts.</span>
          </div>
          
          <h1 className="text-[clamp(4rem,15vw,12rem)] font-display leading-[0.8] tracking-[-0.02em] uppercase relative">
            <span className="block">VOTE</span>
            <span className="block bg-gradient-to-r from-[var(--primary)] via-[var(--secondary)] to-[var(--accent)] bg-clip-text text-transparent italic">
              LOUDER
            </span>
            {/* Overlapping small text for maximalist feel */}
            <span className="absolute -bottom-4 right-0 text-lg font-body lowercase tracking-widest text-white/40 hidden md:block">
              // interactive.election.guide.v1.0
            </span>
          </h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-end pt-8">
            <div className="space-y-6">
              <p className="text-2xl font-body leading-tight text-[var(--on-surface)]/80 max-w-lg">
                The high-velocity platform for the next generation of voters. <br/>
                <span className="text-white font-bold">Cut the noise. See the data.</span>
              </p>
              
              <div className="flex flex-wrap gap-4">
                <button className="bg-[var(--primary)] text-white px-10 py-5 rounded-2xl font-display text-2xl tracking-wider neon-glow-primary hover:scale-105 transition-transform flex items-center gap-3">
                  STRIKE BACK
                  <ChevronRight className="w-6 h-6" />
                </button>
                <button className="glass px-10 py-5 rounded-2xl font-display text-2xl tracking-wider text-[var(--secondary)] hover:bg-white/10 transition-colors">
                  LIVE PULSE
                </button>
              </div>
            </div>

            <div className="glass-card p-8 rotate-1 hidden md:block">
              <div className="flex justify-between items-center mb-6">
                <span className="text-xs font-bold uppercase tracking-widest text-[var(--secondary)]">Next Milestone</span>
                <span className="text-[var(--success)] text-xs font-bold">ACTIVE</span>
              </div>
              <h3 className="text-4xl font-display mb-2">PRIMARY BALLOT LOCKING</h3>
              <p className="text-sm text-white/60 mb-6 font-body">Nov 15, 2024 — Prepare your roadmap before the window closes.</p>
              <div className="h-4 bg-black/40 rounded-full overflow-hidden border border-white/5">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: '84%' }}
                  transition={{ duration: 1.5, delay: 0.5 }}
                  className="h-full bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)]"
                />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;

