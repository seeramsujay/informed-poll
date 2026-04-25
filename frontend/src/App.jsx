import React, { useState } from 'react';
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
    <div className="min-h-screen bg-slate-900 text-slate-50 font-body">
      <Navbar />
      <main className="container mx-auto px-4 py-8 space-y-24">
        <Hero />
        <Timeline steps={completedSteps} />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          <div className="space-y-6">
            <h2 className="text-4xl font-display tracking-tight text-purple-400">Evaluate Candidates</h2>
            <p className="text-slate-400 max-w-md">Swipe through candidates to learn about their vision and platform.</p>
            <CandidateStack index={candidateIndex} setIndex={setCandidateIndex} />
          </div>
          
          <div className="space-y-6">
            <h2 className="text-4xl font-display tracking-tight text-blue-400">AI Voting Assistant</h2>
            <p className="text-slate-400 max-w-md">Ask questions about candidates, policies, or the voting process.</p>
            <ChatAssistant />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default App;
