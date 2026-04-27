import React, { useState } from 'react';
import { motion } from 'framer-motion';

const defaultSteps = [
  { id: 1, title: 'REGISTER', desc: "Take 2 mins. Do it while your coffee brews. It's the only way in.", icon: 'how_to_reg', color: 'var(--secondary)', done: false },
  { id: 2, title: 'GET THE BALLOT', desc: "See exactly what you're voting for before you even step inside.", icon: 'assignment', color: 'var(--primary)', done: false },
  { id: 3, title: 'EARLY VOTE', desc: "Skip the long lines. Vote on your own time. No stress needed.", icon: 'calendar_month', color: 'var(--accent)', done: false },
  { id: 4, title: 'ELECTION DAY', desc: "November 5th. This is the moment. Pull up and make it count.", icon: 'check_circle', color: 'var(--error)', done: false }
];

const Timeline = () => {
  const [steps, setSteps] = useState(defaultSteps);

  const toggleStep = (id) => {
    setSteps(steps.map(step => 
      step.id === id ? { ...step, done: !step.done } : step
    ));
  };

  return (
    <section className="py-12 max-w-7xl mx-auto w-full">
      <div className="mb-12">
        <h2 className="font-display text-5xl md:text-7xl text-white mb-2 uppercase tracking-tight">THE MISSION BRIEFING</h2>
        <div className="h-2 w-32 bg-[var(--secondary)] rounded-full neon-glow-secondary"></div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
        {/* Background Line */}
        <div className="hidden lg:block absolute top-1/2 left-0 w-full h-[2px] border-t-2 border-dashed border-white/10 -z-10"></div>
        
        {steps.map((step, idx) => (
          <motion.div 
            key={step.id}
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: idx * 0.1 }}
            onClick={() => toggleStep(step.id)}
            className={`cursor-pointer glass p-8 rounded-2xl group transition-all relative overflow-hidden h-full flex flex-col active:scale-95 ${
              step.done ? 'border-[var(--secondary)] bg-[var(--secondary)]/10' : 'border-white/10 hover:border-white/30'
            }`}
          >
            <span className="absolute -bottom-4 -right-4 font-display text-[120px] text-white/[0.03] pointer-events-none">
              0{step.id}
            </span>
            <div className="flex justify-between items-start mb-6">
              <span 
                className="material-symbols-outlined text-4xl transition-colors"
                style={{ color: step.done ? 'var(--on-surface)' : step.color }}
              >
                {step.icon}
              </span>
              <span 
                className={`status-badge px-3 py-1 rounded font-bold text-[10px] uppercase transition-colors ${
                  step.done ? 'bg-[var(--secondary)] text-[var(--surface)]' : 'bg-white/10 text-white'
                }`}
                style={!step.done ? { backgroundColor: step.color, color: 'var(--surface)' } : {}}
              >
                {step.done ? 'Done' : 'Action Required'}
              </span>
            </div>
            <h3 className="font-display text-3xl text-white mb-2 uppercase tracking-wide">{step.title}</h3>
            <p className="text-white/60 text-sm leading-relaxed">{step.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Timeline;

