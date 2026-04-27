import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Loader2, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const initialMessages = [
  { id: 1, text: "Yo! Ready to get registered? Ask me anything about IDs, deadlines, or how to vote from your dorm.", sender: 'ai' }
];

const mockReplies = [
  "I've got the data on that. Based on your location, you've got until Oct 26th to register online.",
  "Yo! That's a common one. You can definitely use your student ID if it has a photo and signature.",
  "Check the map—your closest polling place is the Student Union, Room 302."
];

const ChatAssistant = () => {
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = (text) => {
    const messageText = typeof text === 'string' ? text : input;
    if (!messageText.trim() || isLoading) return;

    const userMsg = { id: Date.now(), text: messageText, sender: 'user' };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    setTimeout(() => {
      const aiMsg = { 
        id: Date.now() + 1, 
        text: mockReplies[Math.floor(Math.random() * mockReplies.length)], 
        sender: 'ai' 
      };
      setMessages(prev => [...prev, aiMsg]);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="glass-card flex flex-col h-[600px] border-none shadow-2xl">
      <div className="p-4 flex items-center gap-3 bg-white/5 border-b border-white/5">
        <div className="w-2 h-2 rounded-full bg-[var(--secondary)] animate-pulse"></div>
        <span className="font-bold text-[10px] uppercase tracking-widest text-white/60">VoteIQ AI Assistant</span>
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-hide">
        <AnimatePresence>
          {messages.map((msg) => (
            <motion.div 
              key={msg.id} 
              initial={{ opacity: 0, x: msg.sender === 'user' ? 20 : -20 }}
              animate={{ opacity: 1, x: 0 }}
              className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-[85%] p-4 rounded-2xl text-sm leading-relaxed ${
                msg.sender === 'user' 
                  ? 'bg-[var(--primary)] text-white rounded-tr-none shadow-lg' 
                  : 'glass border-l-2 border-l-[var(--secondary)] text-[var(--on-surface)] rounded-tl-none'
              }`}>
                {msg.text}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        
        {isLoading && (
          <div className="flex justify-start">
            <div className="glass p-4 rounded-2xl rounded-tl-none border-l-2 border-l-[var(--secondary)] flex gap-3 items-center">
              <Loader2 className="w-4 h-4 animate-spin text-[var(--secondary)]" />
              <span className="text-sm text-white/60">Thinking...</span>
            </div>
          </div>
        )}
      </div>

      <div className="p-4 bg-white/5 space-y-4">
        <div className="flex gap-2 flex-wrap">
          <button 
            onClick={() => handleSend('What ID do I need?')}
            className="glass px-3 py-1.5 rounded-full text-[10px] font-bold uppercase hover:bg-[var(--secondary)]/20 transition-all border-[var(--secondary)]/30"
          >
            ID Requirements?
          </button>
          <button 
            onClick={() => handleSend('Deadline in NY?')}
            className="glass px-3 py-1.5 rounded-full text-[10px] font-bold uppercase hover:bg-[var(--secondary)]/20 transition-all border-[var(--secondary)]/30"
          >
            Deadlines
          </button>
        </div>
        <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} className="relative group">
          <input 
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about your state's rules..."
            className="w-full bg-[#100d16] border border-neutral-800 rounded-xl py-3 pl-5 pr-12 text-sm text-white focus:ring-1 focus:ring-[var(--secondary)] focus:border-[var(--secondary)] transition-all outline-none"
          />
          <button 
            type="submit"
            className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-[var(--secondary)] text-[var(--surface)] rounded-lg flex items-center justify-center hover:scale-110 active:scale-95 transition-all"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatAssistant;

