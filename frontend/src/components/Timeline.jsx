import React from 'react';
import { CheckCircle2, Circle } from 'lucide-react';
import { timelineSteps } from '../data/mock';

const Timeline = ({ steps }) => {
  return (
    <section className="bg-slate-800/30 rounded-[32px] p-8 md:p-12 border border-slate-800/50">
      <div className="flex flex-col md:flex-row justify-between gap-8">
        {timelineSteps.map((step, idx) => (
          <div key={step.id} className="flex-1 relative group">
            <div className="flex items-center gap-4 md:flex-col md:items-start md:gap-6">
              <div className={`relative z-10 w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-500 ${
                steps[idx] 
                  ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/20 scale-110' 
                  : 'bg-slate-800 text-slate-500 border border-slate-700'
              }`}>
                {steps[idx] ? <CheckCircle2 className="w-6 h-6" /> : <span className="font-display text-xl">{step.id}</span>}
              </div>
              
              {idx !== timelineSteps.length - 1 && (
                <div className="hidden md:block absolute top-6 left-12 w-full h-0.5 bg-slate-800 -z-0">
                  <div className={`h-full bg-purple-600 transition-all duration-1000 ${steps[idx + 1] ? 'w-full' : 'w-0'}`}></div>
                </div>
              )}
              
              <div className="space-y-1">
                <h3 className={`text-xl font-display uppercase tracking-wider ${steps[idx] ? 'text-white' : 'text-slate-500'}`}>
                  {step.title}
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed max-w-[200px]">
                  {step.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Timeline;
