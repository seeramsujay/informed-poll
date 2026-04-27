import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Heart, Info, Percent } from 'lucide-react';
import { candidates } from '../data/mock';

const CandidateStack = () => {
  const [index, setIndex] = useState(0);
  const currentCandidate = candidates[index];

  const handleSwipe = (direction) => {
    setIndex((prev) => (prev + 1) % candidates.length);
  };

  return (
    <div className="relative w-full aspect-[4/5] max-w-sm mx-auto group">
      <AnimatePresence mode="popLayout">
        <motion.div
          key={currentCandidate.id}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          onDragEnd={(_, info) => {
            if (info.offset.x > 100) handleSwipe('right');
            else if (info.offset.x < -100) handleSwipe('left');
          }}
          initial={{ scale: 0.95, opacity: 0, rotate: -5 }}
          animate={{ scale: 1, opacity: 1, rotate: 0 }}
          exit={{ 
            x: 500, 
            opacity: 0, 
            rotate: 20,
            transition: { duration: 0.3 } 
          }}
          className="absolute inset-0 glass-card cursor-grab active:cursor-grabbing z-30 wiggle-hover"
        >
          <img 
            src={currentCandidate.image} 
            alt={currentCandidate.name} 
            className="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all duration-500" 
          />
          
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--surface)] via-[var(--surface)]/20 to-transparent"></div>
          
          {/* Match Score Badge */}
          <div className="absolute top-6 right-6 glass p-4 rounded-2xl border-[var(--secondary)]/40 flex flex-col items-center neon-glow-secondary rotate-12">
            <span className="text-4xl font-display leading-none">{currentCandidate.match}%</span>
            <span className="text-[10px] font-bold uppercase tracking-tighter opacity-60">MATCH</span>
          </div>

          <div className="absolute bottom-0 left-0 right-0 p-8 space-y-4">
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 rounded-full bg-[var(--primary)] text-[10px] font-bold uppercase tracking-[0.2em] text-white">
                {currentCandidate.role}
              </span>
            </div>
            
            <h3 className="text-5xl font-display leading-none uppercase tracking-tight">
              {currentCandidate.name}
            </h3>
            
            <p className="text-[var(--on-surface)]/70 text-sm leading-snug font-body line-clamp-3">
              "{currentCandidate.bio}"
            </p>

            <div className="flex gap-4 pt-4">
              <button 
                onClick={() => handleSwipe('left')}
                className="flex-1 glass py-4 rounded-xl flex items-center justify-center text-[var(--accent)] hover:bg-white/10 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
              <button 
                onClick={() => handleSwipe('right')}
                className="flex-1 bg-[var(--primary)] py-4 rounded-xl flex items-center justify-center text-white neon-glow-primary"
              >
                <Heart className="w-6 h-6 fill-current" />
              </button>
            </div>
          </div>
        </motion.div>

        {/* Shadow Cards for Stack Effect */}
        <div className="absolute inset-0 glass-card -z-10 translate-y-4 translate-x-2 rotate-2 opacity-40 scale-[0.98]"></div>
        <div className="absolute inset-0 glass-card -z-20 translate-y-8 translate-x-4 rotate-6 opacity-20 scale-[0.95]"></div>
      </AnimatePresence>
    </div>
  );
};

export default CandidateStack;

