import React from 'react';
import { ChevronRight, Sparkles } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative overflow-hidden pt-12 pb-24">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10">
        <div className="absolute top-0 left-1/4 w-72 h-72 bg-purple-600/20 rounded-full blur-[128px] animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-[128px] animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>
      
      <div className="text-center space-y-8 max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-800/50 border border-slate-700 text-sm font-medium text-purple-300 animate-float">
          <Sparkles className="w-4 h-4" />
          <span>Next Generation Democracy</span>
        </div>
        
        <h1 className="text-6xl md:text-8xl font-display leading-[0.9] tracking-tighter">
          YOUR VOTE, <br />
          <span className="bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent italic">ONLY SMARTER.</span>
        </h1>
        
        <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
          Cut through the noise with AI-powered candidate analysis, real-time policy tracking, and personalized voting roadmaps.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <button className="w-full sm:w-auto bg-white text-slate-900 px-8 py-4 rounded-2xl font-bold text-lg flex items-center justify-center gap-2 hover:bg-purple-50 transition-all hover:-translate-y-1 shadow-2xl">
            Start My Journey
            <ChevronRight className="w-5 h-5" />
          </button>
          <button className="w-full sm:w-auto bg-slate-800 text-white px-8 py-4 rounded-2xl font-bold text-lg border border-slate-700 hover:bg-slate-700 transition-all">
            View Live Results
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
