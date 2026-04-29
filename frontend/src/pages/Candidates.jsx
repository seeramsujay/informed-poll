import React from 'react';
import { motion } from 'framer-motion';
import CandidateStack from '../components/CandidateStack';

const Candidates = () => {
  return (
    <main className="relative z-10 px-6 lg:px-12 max-w-[1800px] mx-auto py-24 min-h-[80vh]">
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto space-y-10"
      >
        <div className="space-y-4 text-center">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-[var(--secondary)]">Evaluate Platforms</p>
          <h1 className="font-display text-6xl md:text-8xl uppercase italic tracking-tighter leading-none text-[var(--secondary)]">
            CANDIDATES
          </h1>
          <p className="text-white/50 max-w-md mx-auto text-sm leading-relaxed">
            Swipe right to endorse · swipe left to dismiss · tap "Policy Breakdown" to see where each candidate stands.
          </p>
        </div>

        <div className="relative group mx-auto max-w-sm">
          <div className="absolute -inset-8 bg-gradient-to-r from-[var(--secondary)]/10 to-[var(--primary)]/10 blur-3xl opacity-60 pointer-events-none" />
          <CandidateStack />
        </div>
      </motion.section>
    </main>
  );
};

export default Candidates;
