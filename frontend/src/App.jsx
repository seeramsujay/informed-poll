import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Timeline from './components/Timeline';
import CandidateStack from './components/CandidateStack';
import ChatAssistant from './components/ChatAssistant';
import Footer from './components/Footer';

function App() {
  const [completedSteps, setCompletedSteps] = useState([true, false, false, false]);
  const [candidateIndex, setCandidateIndex] = useState(0);

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--on-surface)] font-body selection:bg-[var(--primary)] selection:text-white overflow-x-hidden">
      {/* Kinetic Background elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
        <div 
          className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full blur-[120px] animate-pulse" 
          style={{ backgroundColor: 'color-mix(in srgb, var(--primary), transparent 90%)' }}
        />
        <div 
          className="absolute bottom-[-5%] right-[-5%] w-[30%] h-[30%] rounded-full blur-[100px]" 
          style={{ backgroundColor: 'color-mix(in srgb, var(--secondary), transparent 90%)' }}
        />
      </div>

      <Navbar />

      <main className="relative z-10">
        {/* Full width Hero */}
        <section className="w-full">
          <Hero />
        </section>

        {/* Fluid Grid Container */}
        <div className="px-6 lg:px-12 max-w-[1800px] mx-auto space-y-32 py-24">
          
          {/* Overlapping Timeline section */}
          <motion.section 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative -mt-40 z-20"
          >
            <Timeline steps={completedSteps} />
          </motion.section>
          
          {/* Main Interaction Split: Fluid 12-column logic */}
          <div className="grid grid-cols-12 gap-8 items-start">
            
            {/* Candidate Stack: Heavy Left */}
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
                <CandidateStack index={candidateIndex} setIndex={setCandidateIndex} />
              </div>
            </motion.section>
            
            {/* AI Assistant: High Intensity Right */}
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
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default App;

