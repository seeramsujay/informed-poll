import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { UserCheck, MapPin, Navigation, Zap, ChevronDown, ChevronUp, ExternalLink, CheckCircle } from 'lucide-react';
import { protocols } from '../data/mock';

const ICON_MAP = { UserCheck, MapPin, Navigation, Zap };

const COLOR_MAP = {
  primary: 'var(--primary)',
  secondary: 'var(--secondary)',
  accent: 'var(--accent)',
  white: 'rgba(255,255,255,0.9)',
};

const BORDER_MAP = {
  primary: 'border-[var(--primary)]/40 hover:border-[var(--primary)]',
  secondary: 'border-[var(--secondary)]/40 hover:border-[var(--secondary)]',
  accent: 'border-[var(--accent)]/40 hover:border-[var(--accent)]',
  white: 'border-white/20 hover:border-white/60',
};

const ProtocolCard = ({ protocol }) => {
  const [open, setOpen] = useState(false);
  const [completed, setCompleted] = useState([]);
  const Icon = ICON_MAP[protocol.icon];
  const color = COLOR_MAP[protocol.color];
  const borderClass = BORDER_MAP[protocol.color];

  const toggleStep = (i) => {
    setCompleted(prev => prev.includes(i) ? prev.filter(x => x !== i) : [...prev, i]);
  };

  return (
    <motion.div
      layout
      className={`glass-card p-8 border ${borderClass} transition-all duration-300 group`}
    >
      <div className="flex items-start gap-5">
        <div
          className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 mt-0.5"
          style={{ background: `${color}20`, border: `1px solid ${color}40` }}
        >
          <Icon className="w-7 h-7" style={{ color }} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-2xl font-display" style={{ color }}>{protocol.id}</span>
            <h3 className="text-2xl font-display uppercase tracking-wide">{protocol.title}</h3>
            {completed.length === protocol.steps.length && (
              <span className="ml-auto text-xs font-bold uppercase tracking-widest text-[var(--secondary)] flex items-center gap-1">
                <CheckCircle className="w-3 h-3" /> Done
              </span>
            )}
          </div>
          <p className="text-white/60 text-sm leading-relaxed">{protocol.summary}</p>

          <button
            onClick={() => setOpen(v => !v)}
            className="mt-4 flex items-center gap-2 text-xs font-bold uppercase tracking-widest transition-colors hover:text-white"
            style={{ color }}
          >
            {open ? 'Close Protocol' : 'Execute Protocol'}{' '}
            {open ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="mt-8 space-y-3 border-t border-white/5 pt-8">
              {protocol.steps.map((step, i) => {
                const done = completed.includes(i);
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.08 }}
                    onClick={() => toggleStep(i)}
                    className={`flex gap-4 p-4 rounded-xl cursor-pointer transition-all duration-200 ${
                      done ? 'bg-white/5 opacity-60' : 'glass hover:bg-white/5'
                    }`}
                  >
                    <div
                      className="w-6 h-6 rounded-full border-2 flex-shrink-0 mt-0.5 flex items-center justify-center transition-all"
                      style={{
                        borderColor: done ? color : 'rgba(255,255,255,0.2)',
                        background: done ? `${color}30` : 'transparent',
                      }}
                    >
                      {done && <CheckCircle className="w-3.5 h-3.5" style={{ color }} />}
                    </div>
                    <div>
                      <p className={`text-sm font-bold uppercase tracking-wide mb-1 ${done ? 'line-through text-white/30' : 'text-white'}`}>
                        Step {i + 1}: {step.title}
                      </p>
                      <p className="text-white/50 text-xs leading-relaxed">{step.detail}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Progress bar */}
            <div className="mt-6 space-y-2">
              <div className="flex justify-between items-center text-xs font-bold uppercase tracking-widest text-white/30">
                <span>Progress</span>
                <span>{completed.length} / {protocol.steps.length}</span>
              </div>
              <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  className="h-full rounded-full transition-all duration-500"
                  style={{ width: `${(completed.length / protocol.steps.length) * 100}%`, background: color }}
                />
              </div>
            </div>

            <a
              href={protocol.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-6 text-xs font-bold uppercase tracking-widest hover:opacity-80 transition-opacity"
              style={{ color }}
            >
              {protocol.linkLabel} <ExternalLink className="w-3 h-3" />
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const Protocols = () => {
  return (
    <main className="relative z-10 px-6 lg:px-12 max-w-[1800px] mx-auto py-24 min-h-[80vh]">
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto space-y-12"
      >
        <div className="space-y-4 text-center">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-[var(--primary)]">System Directives</p>
          <h1 className="font-display text-6xl md:text-8xl uppercase italic tracking-tighter leading-none text-white">
            PROTOCOLS
          </h1>
          <p className="text-white/50 max-w-md mx-auto text-sm leading-relaxed">
            Step-by-step execution guides for every phase of the democratic process. Click each protocol to expand and check off your progress.
          </p>
        </div>

        <div className="space-y-6">
          {protocols.map((protocol, i) => (
            <motion.div
              key={protocol.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <ProtocolCard protocol={protocol} />
            </motion.div>
          ))}
        </div>

        <div className="glass-card p-6 text-center border-[var(--secondary)]/30">
          <p className="text-white/40 text-xs leading-relaxed">
            Data sourced from <a href="https://vote.gov" target="_blank" rel="noopener noreferrer" className="text-[var(--secondary)] hover:underline">vote.gov</a>,{' '}
            <a href="https://ncsl.org" target="_blank" rel="noopener noreferrer" className="text-[var(--secondary)] hover:underline">NCSL</a>, and state election authorities. Always verify deadlines with your local elections office.
          </p>
        </div>
      </motion.section>
    </main>
  );
};

export default Protocols;
