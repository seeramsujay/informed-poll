import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Send, Loader2, Sparkles, Zap, RotateCcw, Copy, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';

const QUICK_PROMPTS = [
  "What ID do I need to vote?",
  "How do I register in California?",
  "Can college students vote at school?",
  "What is a provisional ballot?",
  "How long are polling places open?",
  "Can I track my mail-in ballot?",
];

const TypingIndicator = () => (
  <div className="flex justify-start">
    <div className="glass border-l-2 border-l-[var(--secondary)] p-4 rounded-2xl rounded-tl-none flex gap-2 items-center">
      {[0, 1, 2].map(i => (
        <motion.div
          key={i}
          className="w-1.5 h-1.5 rounded-full bg-[var(--secondary)]"
          animate={{ scale: [1, 1.5, 1], opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 0.8, delay: i * 0.15, repeat: Infinity }}
        />
      ))}
    </div>
  </div>
);

const MessageBubble = ({ msg }) => {
  const [copied, setCopied] = useState(false);
  const isAi = msg.sender === 'ai';

  const copy = async () => {
    await navigator.clipboard.writeText(msg.text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10, x: isAi ? -10 : 10 }}
      animate={{ opacity: 1, y: 0, x: 0 }}
      transition={{ duration: 0.25 }}
      className={`flex ${isAi ? 'justify-start' : 'justify-end'} group`}
    >
      <div className={`relative max-w-[85%] p-4 rounded-2xl text-sm leading-relaxed ${
        isAi
          ? 'glass border-l-2 border-l-[var(--secondary)] text-[var(--on-surface)] rounded-tl-none'
          : 'bg-[var(--primary)] text-white rounded-tr-none shadow-lg'
      }`}>
        {msg.text}
        {isAi && (
          <button
            onClick={copy}
            className="absolute -top-3 -right-3 glass p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
          >
            {copied ? <Check className="w-3 h-3 text-[var(--secondary)]" /> : <Copy className="w-3 h-3 text-white/40" />}
          </button>
        )}
      </div>
    </motion.div>
  );
};

const ChatAssistant = () => {
  const { user } = useAuth();
  const [messages, setMessages] = useState([
    { id: 1, text: "Yo! I'm VoteIQ — your non-partisan AI guide to the ballot. Ask me anything: registration deadlines, ID rules, polling places, candidate platforms.", sender: 'ai' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSend = useCallback(async (text) => {
    const msg = typeof text === 'string' ? text : input;
    if (!msg.trim() || isLoading) return;

    setMessages(prev => [...prev, { id: Date.now(), text: msg, sender: 'user' }]);
    setInput('');
    setIsLoading(true);

    try {
      const headers = { 'Content-Type': 'application/json' };
      if (user) {
        const token = await user.getIdToken();
        headers['Authorization'] = `Bearer ${token}`;
      }

      const apiBase = import.meta.env.VITE_API_BASE_URL || '';
      const res = await fetch(`${apiBase}/api/chat`, {
        method: 'POST',
        headers,
        body: JSON.stringify({ message: msg }),
      });
      const data = await res.json();
      setMessages(prev => [...prev, { id: Date.now() + 1, text: data.reply || 'No response.', sender: 'ai' }]);
    } catch {
      setMessages(prev => [...prev, { id: Date.now() + 1, text: 'Connection error — backend may be offline.', sender: 'ai' }]);
    } finally {
      setIsLoading(false);
    }
  }, [input, isLoading, user]);

  // Wire up sidebar prompt injection from NeuralSync page
  useEffect(() => {
    const handler = (e) => handleSend(e.detail);
    window.addEventListener('voteiq:prompt', handler);
    return () => window.removeEventListener('voteiq:prompt', handler);
  }, [handleSend]);

  const reset = () => {
    setMessages([{ id: 1, text: "Fresh session. What do you want to know?", sender: 'ai' }]);
  };

  return (
    <div className="glass-card flex flex-col h-[620px] border-none shadow-2xl">
      {/* Header */}
      <div className="p-4 flex items-center gap-3 bg-white/5 shadow-[0_1px_0_0_rgba(255,255,255,0.05)] flex-shrink-0">
        <motion.div
          className="w-2 h-2 rounded-full bg-[var(--secondary)]"
          animate={{ opacity: [1, 0.3, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
        <span className="font-bold text-[10px] uppercase tracking-widest text-white/60 flex-1">VoteIQ Neural Sync · AI Active</span>
        <button onClick={reset} className="text-white/30 hover:text-white/70 transition-colors">
          <RotateCcw className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-5 space-y-4 scrollbar-hide">
        <AnimatePresence initial={false}>
          {messages.map(msg => <MessageBubble key={msg.id} msg={msg} />)}
        </AnimatePresence>
        {isLoading && <TypingIndicator />}
      </div>

      {/* Quick prompts */}
      <div className="px-4 pb-2 flex gap-2 flex-wrap flex-shrink-0">
        {QUICK_PROMPTS.slice(0, 3).map(p => (
          <button
            key={p}
            onClick={() => handleSend(p)}
            disabled={isLoading}
            className="glass px-3 py-1.5 rounded-full text-[9px] font-bold uppercase tracking-widest hover:bg-[var(--secondary)]/20 transition-all border-[var(--secondary)]/20 disabled:opacity-40 whitespace-nowrap"
          >
            {p}
          </button>
        ))}
      </div>

      {/* Input */}
      <div className="p-4 bg-white/5 shadow-[0_-1px_0_0_rgba(255,255,255,0.05)] flex-shrink-0">
        <form
          onSubmit={e => { e.preventDefault(); handleSend(); }}
          className="relative flex gap-2"
        >
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Ask about voting rules, deadlines, IDs..."
            disabled={isLoading}
            className="flex-1 bg-[#100d16] border-none shadow-[inset_0_0_0_1px_rgba(255,255,255,0.05)] rounded-xl py-3 pl-4 pr-4 text-sm text-white focus:ring-1 focus:ring-[var(--secondary)] transition-all outline-none disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="w-10 h-10 bg-[var(--secondary)] text-[var(--surface)] rounded-xl flex items-center justify-center hover:scale-105 active:scale-95 transition-all disabled:opacity-40 disabled:scale-100 flex-shrink-0 self-center"
          >
            {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatAssistant;
