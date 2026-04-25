import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Loader2 } from 'lucide-react';
import { initialMessages } from '../data/mock';

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

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMsg = { id: Date.now(), text: input, sender: 'user' };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    // Mock response logic (Phase 1)
    setTimeout(() => {
      const aiMsg = { 
        id: Date.now() + 1, 
        text: "That's a great question about policy. Our data shows that most candidates are focusing on technology and urban development this cycle. Would you like to compare their specific proposals?", 
        sender: 'ai' 
      };
      setMessages(prev => [...prev, aiMsg]);
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="bg-slate-800/30 rounded-[32px] border border-slate-800/50 flex flex-col h-[500px] overflow-hidden">
      <div className="p-6 border-b border-slate-800 flex items-center gap-3 bg-slate-900/40">
        <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center">
          <Bot className="w-6 h-6 text-white" />
        </div>
        <div>
          <h3 className="font-display uppercase tracking-wider">Voting Assistant</h3>
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">Always Online</span>
          </div>
        </div>
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-4 scrollbar-hide">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] p-4 rounded-2xl text-sm leading-relaxed ${
              msg.sender === 'user' 
                ? 'bg-blue-600 text-white rounded-tr-none' 
                : 'bg-slate-800 text-slate-300 rounded-tl-none border border-slate-700'
            }`}>
              {msg.text}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-slate-800 border border-slate-700 p-4 rounded-2xl rounded-tl-none flex gap-2">
              <Loader2 className="w-4 h-4 animate-spin text-blue-500" />
              <span className="text-xs text-slate-500">Processing insights...</span>
            </div>
          </div>
        )}
      </div>

      <form onSubmit={handleSend} className="p-6 pt-0 mt-auto">
        <div className="relative">
          <input 
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask anything about the election..."
            className="w-full bg-slate-900 border border-slate-700 rounded-2xl py-4 pl-6 pr-14 text-sm focus:outline-none focus:border-blue-500 transition-colors"
          />
          <button 
            type="submit"
            className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white hover:bg-blue-500 transition-all active:scale-95"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChatAssistant;
