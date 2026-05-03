import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Heart, ChevronDown, ChevronUp, ExternalLink, Check, Zap } from 'lucide-react';
import { candidates } from '../data/mock';
import { useAuth } from '../context/AuthContext';

const PolicyBar = ({ label, score, color }) => (
  <div className="space-y-1.5">
    <div className="flex justify-between items-center">
      <span className="text-xs font-bold uppercase tracking-widest text-white/50">{label}</span>
      <span className="text-xs font-bold text-white/70">{score}%</span>
    </div>
    <div className="h-1 bg-white/10 rounded-full overflow-hidden">
      <motion.div
        className="h-full rounded-full"
        style={{ background: color }}
        initial={{ width: 0 }}
        animate={{ width: `${score}%` }}
        transition={{ duration: 0.8, ease: 'easeOut', delay: 0.1 }}
      />
    </div>
  </div>
);

const CandidateCard = ({ candidate, onSwipe }) => {
  const [showDetail, setShowDetail] = useState(false);

  return (
    <motion.div
      key={candidate.id}
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.2}
      onDragEnd={(_, info) => {
        if (info.offset.x > 120) onSwipe('right');
        else if (info.offset.x < -120) onSwipe('left');
      }}
      initial={{ scale: 0.95, opacity: 0, rotate: -3 }}
      animate={{ scale: 1, opacity: 1, rotate: 0 }}
      exit={{ x: 600, opacity: 0, rotate: 25, transition: { duration: 0.35 } }}
      className="absolute inset-0 glass-card cursor-grab active:cursor-grabbing z-30 overflow-hidden"
      style={{ touchAction: 'none' }}
    >
      {/* Image */}
      <div className="relative h-full">
        <img
          src={candidate.image}
          alt={candidate.name}
          className="w-full h-full object-cover"
          draggable={false}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/30 to-transparent" />
      </div>

      {/* Match badge */}
      <div
        className="absolute top-6 right-6 glass p-3 rounded-2xl flex flex-col items-center rotate-6"
        style={{ boxShadow: `0 0 20px ${candidate.color}66` }}
      >
        <span className="text-3xl font-display leading-none" style={{ color: candidate.color }}>
          {candidate.match}%
        </span>
        <span className="text-[9px] font-bold uppercase tracking-widest text-white/50">MATCH</span>
      </div>

      {/* Stance badge */}
      <div className="absolute top-6 left-6 glass px-3 py-1 rounded-full">
        <span className="text-[9px] font-bold uppercase tracking-widest text-white/60">{candidate.stance}</span>
      </div>

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-6 space-y-3">
        <span
          className="inline-block px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-[0.2em] text-black"
          style={{ background: candidate.color }}
        >
          {candidate.role} · {candidate.party}
        </span>

        <h3 className="text-5xl font-display leading-none uppercase tracking-tight">{candidate.name}</h3>
        <p className="text-white/60 text-sm leading-snug line-clamp-2">"{candidate.bio}"</p>

        {/* Key issues */}
        <div className="flex flex-wrap gap-2">
          {candidate.keyIssues.map(issue => (
            <span key={issue} className="glass px-2 py-1 rounded-full text-[9px] font-bold uppercase tracking-widest text-white/70">
              {issue}
            </span>
          ))}
        </div>

        {/* Detail toggle */}
        <button
          onClick={(e) => { e.stopPropagation(); setShowDetail(v => !v); }}
          className="w-full flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-widest text-white/50 hover:text-white transition-colors py-1"
        >
          Policy Breakdown {showDetail ? <ChevronDown className="w-3 h-3" /> : <ChevronUp className="w-3 h-3" />}
        </button>

        <AnimatePresence>
          {showDetail && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="space-y-2 overflow-hidden"
            >
              {candidate.policies.map(p => (
                <PolicyBar key={p.label} label={p.label} score={p.score} color={candidate.color} />
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Actions */}
        <div className="flex gap-3 pt-1">
          <button
            onClick={(e) => { e.stopPropagation(); onSwipe('left'); }}
            className="flex-1 glass py-3.5 rounded-xl flex items-center justify-center text-red-400 hover:bg-red-400/10 transition-colors border-none shadow-[inset_0_0_0_1px_rgba(248,113,113,0.1)]"
          >
            <X className="w-5 h-5" />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); onSwipe('right'); }}
            className="flex-1 py-3.5 rounded-xl flex items-center justify-center text-white transition-colors"
            style={{ background: candidate.color, boxShadow: `0 0 20px ${candidate.color}66` }}
          >
            <Heart className="w-5 h-5 fill-current" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

const CandidateStack = () => {
  const [ballot, setBallot] = useState([]);
  const [dismissed, setDismissed] = useState([]);
  const [done, setDone] = useState(false);
  const { user } = useAuth();

  const remaining = candidates.filter(c => !ballot.includes(c.id) && !dismissed.includes(c.id));
  const current = remaining[0];

  const handleSwipe = (direction) => {
    if (!current) return;
    const newBallot = direction === 'right' ? [...ballot, current.id] : ballot;
    const newDismissed = direction === 'left' ? [...dismissed, current.id] : dismissed;

    if (direction === 'right') setBallot(newBallot);
    else setDismissed(newDismissed);

    // Check if this was the last card
    if (remaining.length <= 1) {
      setDone(true);
      // Save ballot immediately with up-to-date data (avoids stale closure)
      if (direction === 'right' && newBallot.length > 0) {
        persistBallot(newBallot, user);
      } else if (direction === 'left' && ballot.length > 0) {
        persistBallot(ballot, user);
      }
    }
  };

  const persistBallot = async (candidateIds, currentUser) => {
    try {
      const userId = currentUser?.uid || localStorage.getItem('voteiq_user_id') || `user_${Math.random().toString(36).substr(2, 9)}`;
      if (!localStorage.getItem('voteiq_user_id')) localStorage.setItem('voteiq_user_id', userId);

      const headers = { 'Content-Type': 'application/json' };
      if (currentUser) {
        const token = await currentUser.getIdToken();
        headers['Authorization'] = `Bearer ${token}`;
      }

      const apiBase = import.meta.env.VITE_API_BASE_URL || '';
      await fetch(`${apiBase}/api/ballots`, {
        method: 'POST',
        headers,
        body: JSON.stringify({ user_id: userId, candidate_ids: candidateIds })
      });
    } catch (err) {
      console.error('Failed to save ballot:', err);
    }
  };

  const reset = () => {
    setBallot([]);
    setDismissed([]);
    setDone(false);
  };

  if (done || remaining.length === 0) {
    const chosen = candidates.filter(c => ballot.includes(c.id));
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass-card p-8 space-y-6 max-w-sm mx-auto"
      >
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-full bg-[var(--secondary)]/20 flex items-center justify-center mx-auto">
            <Zap className="w-6 h-6 text-[var(--secondary)]" />
          </div>
          <h3 className="text-3xl font-display uppercase">Your Ballot</h3>
          <p className="text-white/50 text-sm">Based on your swipes</p>
        </div>
        {chosen.length === 0 ? (
          <p className="text-center text-white/40 text-sm">You dismissed all candidates.</p>
        ) : (
          <div className="space-y-3">
            {chosen.map(c => (
              <div key={c.id} className="flex items-center gap-4 glass p-4 rounded-xl">
                <img src={c.image} alt={c.name} className="w-10 h-10 rounded-full object-cover" />
                <div className="flex-1">
                  <p className="font-display text-xl uppercase leading-none">{c.name}</p>
                  <p className="text-white/40 text-xs">{c.party}</p>
                </div>
                <Check className="w-4 h-4 text-[var(--secondary)]" />
              </div>
            ))}
          </div>
        )}
        <button
          onClick={reset}
          className="w-full py-3 rounded-xl text-sm font-bold uppercase tracking-widest glass hover:bg-white/10 transition-colors"
        >
          Restart
        </button>
      </motion.div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Progress */}
      <div className="flex justify-between items-center text-xs font-bold uppercase tracking-widest text-white/30">
        <span>{candidates.indexOf(current) + 1} / {candidates.length}</span>
        <span>{ballot.length} endorsed</span>
      </div>
      <div className="relative w-full aspect-[4/5] max-w-sm mx-auto">
        <AnimatePresence mode="popLayout">
          {current && (
            <CandidateCard key={current.id} candidate={current} onSwipe={handleSwipe} />
          )}
        </AnimatePresence>
        {/* Shadow stack cards */}
        {remaining.length > 1 && (
          <>
            <div className="absolute inset-0 glass-card -z-10 translate-y-3 translate-x-2 rotate-2 opacity-30 scale-[0.97]" />
            <div className="absolute inset-0 glass-card -z-20 translate-y-6 translate-x-4 rotate-4 opacity-15 scale-[0.94]" />
          </>
        )}
      </div>
      <p className="text-center text-white/30 text-xs">← swipe to skip · swipe to endorse →</p>
    </div>
  );
};

export default CandidateStack;
