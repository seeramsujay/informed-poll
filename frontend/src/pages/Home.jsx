import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Hero from '../components/Hero';
import Timeline from '../components/Timeline';
import CandidateStack from '../components/CandidateStack';
import ChatAssistant from '../components/ChatAssistant';

const Home = () => {
  const [completedSteps, setCompletedSteps] = useState([true, false, false, false]);

  return (
    <main className="relative z-10">
      <section className="w-full">
        <Hero />
      </section>

      <div className="px-6 lg:px-12 max-w-[1800px] mx-auto space-y-32 py-24">
        <motion.section 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative -mt-40 z-20"
        >
          <Timeline steps={completedSteps} />
        </motion.section>
        
        <div className="grid grid-cols-12 gap-8 items-start">
          <motion.section 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="col-span-12 lg:col-span-7 space-y-12"
          >
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="h-px flex-1 bg-gradient-to-r from-[var(--secondary)] to-transparent"></div>
                <h2 className="font-display text-5xl md:text-7xl uppercase italic tracking-tighter leading-none text-[var(--secondary)]">
                  CANDIDATES
                </h2>
              </div>
              <p className="text-xl font-medium tracking-tight text-white/60 max-w-xl">
                SWIPE TO EVALUATE PLATFORMS // COMMIT TO VISION.
              </p>
            </div>
            
            <div className="relative group">
              <div className="absolute -inset-4 bg-gradient-to-r from-[var(--secondary)]/20 to-transparent blur-3xl group-hover:opacity-100 opacity-0 transition-opacity" />
              <CandidateStack />
            </div>
          </motion.section>
          
          <motion.section 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="col-span-12 lg:col-span-5 space-y-12 lg:sticky lg:top-32"
          >
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <h2 className="font-display text-5xl md:text-7xl uppercase italic tracking-tighter leading-none text-[var(--primary)]">
                  ASSISTANT
                </h2>
                <div className="h-px flex-1 bg-gradient-to-l from-[var(--primary)] to-transparent"></div>
              </div>
              <p className="text-xl font-medium tracking-tight text-white/60 text-right">
                NEURAL ANALYSIS ENGINE V2.1
              </p>
            </div>
            
            <ChatAssistant />
          </motion.section>
        </div>

        <motion.section
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="py-24 border-t border-white/5"
        >
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h2 className="font-display text-6xl md:text-8xl uppercase italic tracking-tighter leading-none">
              CIVIC <span className="text-[var(--primary)]">INTELLIGENCE</span>
            </h2>
            <p className="text-white/50 text-lg max-w-2xl mx-auto">
              Access the high-fidelity deep dive on the Indian electoral matrix. From EVM mechanics to voter rights, it's all here.
            </p>
            <div className="pt-8">
              <Link 
                to="/dossier" 
                className="inline-block px-12 py-5 bg-white text-black font-display text-2xl uppercase italic hover:bg-[var(--primary)] hover:text-white transition-all transform hover:-translate-y-1"
              >
                Open Dossier
              </Link>
            </div>
          </div>
        </motion.section>
      </div>
    </main>
  );
};

export default Home;
