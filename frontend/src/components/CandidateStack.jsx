import React from 'react';
import { X, Heart, Info } from 'lucide-react';
import { useCandidates } from '../hooks/useCandidates';

const CandidateStack = () => {
  const { currentCandidate, nextCandidate, thirdCandidate, isWiggling, direction, handleAction } = useCandidates();

  const getCardStyle = (pos) => {
    if (pos === 'top') return "z-30 opacity-100 scale-100 rotate-0";
    if (pos === 'middle') return "z-20 opacity-80 scale-95 rotate-2 translate-y-2";
    if (pos === 'bottom') return "z-10 opacity-60 scale-90 -rotate-2 translate-y-4";
  };

  return (
    <div className="relative w-full aspect-[3/4] max-w-sm mx-auto">
      {/* Background Cards */}
      <div className={`absolute inset-0 bg-slate-800 rounded-[32px] border border-slate-700 transition-all duration-500 ${getCardStyle('bottom')}`}></div>
      <div className={`absolute inset-0 bg-slate-800 rounded-[32px] border border-slate-700 transition-all duration-500 ${getCardStyle('middle')}`}>
         <img src={nextCandidate.image} alt="" className="w-full h-full object-cover rounded-[32px] opacity-20" />
      </div>

      {/* Top Card */}
      <div className={`absolute inset-0 bg-slate-800 rounded-[32px] border border-slate-700 shadow-2xl transition-all duration-400 overflow-hidden ${getCardStyle('top')} ${isWiggling ? 'animate-wiggle' : ''} ${direction === 'pass' ? '-translate-x-[150%] rotate-[-20deg]' : direction === 'save' ? 'translate-x-[150%] rotate-[20deg]' : ''}`}>
        <img src={currentCandidate.image} alt={currentCandidate.name} className="w-full h-full object-cover" />
        
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent"></div>
        
        <div className="absolute bottom-0 left-0 right-0 p-8 space-y-2">
          <div className="inline-block px-3 py-1 rounded-full bg-purple-600 text-[10px] font-bold uppercase tracking-widest text-white mb-2">
            {currentCandidate.role}
          </div>
          <h3 className="text-3xl font-display uppercase tracking-tight">{currentCandidate.name}</h3>
          <p className="text-slate-300 text-sm line-clamp-2">{currentCandidate.bio}</p>
        </div>
      </div>

      {/* Controls */}
      <div className="absolute -bottom-16 left-0 right-0 flex justify-center gap-6">
        <button 
          onClick={() => handleAction('pass')}
          className="w-16 h-16 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-red-400 hover:bg-red-400/10 transition-all active:scale-90"
        >
          <X className="w-8 h-8" />
        </button>
        <button 
          onClick={() => handleAction('save')}
          className="w-20 h-20 rounded-full bg-purple-600 flex items-center justify-center text-white shadow-xl shadow-purple-600/20 hover:bg-purple-500 transition-all active:scale-90 animate-pulse-glow"
        >
          <Heart className="w-10 h-10 fill-current" />
        </button>
        <button className="w-16 h-16 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-blue-400 hover:bg-blue-400/10 transition-all active:scale-90">
          <Info className="w-8 h-8" />
        </button>
      </div>
    </div>
  );
};

export default CandidateStack;
