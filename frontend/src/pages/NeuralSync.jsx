import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Shield, Wifi, Sparkles } from 'lucide-react';
import ChatAssistant from '../components/ChatAssistant';

const QUICK_PROMPTS = [
  "What ID do I need to vote?",
  "How do I register in California?",
  "Can college students vote at school?",
  "What is a provisional ballot?",
  "How long are polling places open?",
  "Can I track my mail-in ballot?",
];

const stats = [
  { icon: Brain, label: 'Model', value: 'Gemini 1.5 Flash', color: 'var(--primary)' },
  { icon: Shield, label: 'Stance', value: 'Non-Partisan', color: 'var(--secondary)' },
  { icon: Wifi, label: 'Source', value: 'Live API', color: 'var(--accent)' },
];

const NeuralSync = () => {
  return (
    <main className="relative z-10 px-6 lg:px-12 max-w-[1800px] mx-auto py-24 min-h-[80vh]">
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-5xl mx-auto space-y-10"
      >
        {/* Header */}
        <div className="space-y-4 text-center">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-[var(--secondary)]">AI Intelligence Layer</p>
          <h1 className="font-display text-6xl md:text-8xl uppercase italic tracking-tighter leading-none text-[var(--primary)]">
            NEURAL-SYNC
          </h1>
          <p className="text-white/50 max-w-lg mx-auto text-sm leading-relaxed">
            Direct line to VoteIQ — your non-partisan AI election guide, powered by Gemini. Ask anything about registration, ballots, candidates, or rights.
          </p>
        </div>

        {/* Stat chips */}
        <div className="flex flex-wrap justify-center gap-4">
          {stats.map(({ icon: Icon, label, value, color }) => (
            <div key={label} className="glass px-5 py-3 rounded-2xl flex items-center gap-3">
              <Icon className="w-4 h-4" style={{ color }} />
              <span className="text-white/40 text-xs font-bold uppercase tracking-widest">{label}:</span>
              <span className="text-white text-xs font-bold">{value}</span>
            </div>
          ))}
        </div>

        {/* Chat + sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-8">
          <ChatAssistant />

          <div className="space-y-5">
            <div className="glass-card p-6 space-y-4">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[var(--secondary)]" />
                <h3 className="text-sm font-bold uppercase tracking-widest">Suggested Questions</h3>
              </div>
              <div className="space-y-2">
                {QUICK_PROMPTS.map(p => (
                  <button
                    key={p}
                    onClick={() => {
                      // dispatch custom event for ChatAssistant to pick up
                      window.dispatchEvent(new CustomEvent('voteiq:prompt', { detail: p }));
                    }}
                    className="w-full text-left glass px-4 py-3 rounded-xl text-xs font-medium text-white/60 hover:text-white hover:bg-white/5 transition-all border-white/5 hover:border-[var(--secondary)]/30"
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>

            <div className="glass-card p-6 border-[var(--primary)]/20 space-y-3">
              <h3 className="text-sm font-bold uppercase tracking-widest text-[var(--primary)]">How it works</h3>
              <ol className="space-y-2">
                {[
                  'Your message → FastAPI backend',
                  'Backend → Gemini 1.5 Flash',
                  'Response streamed back',
                  '100% non-partisan grounding',
                ].map((s, i) => (
                  <li key={i} className="flex gap-3 text-xs text-white/50">
                    <span className="text-[var(--primary)] font-bold flex-shrink-0">{i + 1}.</span>
                    {s}
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </motion.section>
    </main>
  );
};

export default NeuralSync;
