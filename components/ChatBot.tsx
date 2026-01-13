
import React, { useState, useRef, useEffect } from 'react';
import { getGeminiResponse } from '../services/geminiService';
import { ChatMessage } from '../types';

const ChatBot: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, isTyping]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isTyping) return;

    const userMsg: ChatMessage = { role: 'user', content: input, timestamp: Date.now() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    const history = messages.map(m => ({ role: m.role, content: m.content }));
    const response = await getGeminiResponse(input, history);

    const assistantMsg: ChatMessage = { role: 'assistant', content: response, timestamp: Date.now() };
    setMessages(prev => [...prev, assistantMsg]);
    setIsTyping(false);
  };

  return (
    <div className="fixed bottom-8 right-28 z-[200]">
      {isOpen && (
        <div className="mb-4 w-96 h-[500px] glass border border-primary/20 rounded-3xl flex flex-col shadow-3xl overflow-hidden animate-fade-in origin-bottom-right">
          <div className="p-4 border-b border-white/10 bg-primary/5 flex items-center gap-3">
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-black font-black text-[10px]">IA</div>
            <div>
              <p className="text-xs font-black uppercase tracking-widest">MitZay Assistant</p>
              <p className="text-[8px] text-primary font-bold uppercase tracking-tighter">Powered by Gemini 3</p>
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4 space-y-4 no-scrollbar" ref={scrollRef}>
            {messages.length === 0 && (
              <div className="text-center py-10">
                <p className="text-gray-500 text-xs">¡Hola! Soy el cerebro de MitZay. Pregúntame cómo podemos automatizar tu éxito.</p>
              </div>
            )}
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] p-3 rounded-2xl text-[11px] leading-relaxed ${m.role === 'user' ? 'bg-primary text-black font-medium' : 'glass border border-white/10 text-gray-200'}`}>
                  {m.content}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="glass p-3 rounded-2xl flex gap-1">
                  <span className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce"></span>
                  <span className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce [animation-delay:0.2s]"></span>
                  <span className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce [animation-delay:0.4s]"></span>
                </div>
              </div>
            )}
          </div>

          <form onSubmit={handleSubmit} className="p-4 bg-black/50 border-t border-white/10 flex gap-2">
            <input 
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Escribe tu consulta..."
              className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-xs focus:outline-none focus:border-primary transition-colors"
            />
            <button type="submit" className="p-2 bg-primary text-black rounded-xl hover:scale-105 transition-transform">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>
          </form>
        </div>
      )}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-16 h-16 glass border border-primary/40 rounded-full flex items-center justify-center shadow-2xl hover:bg-primary/10 transition-colors"
      >
        <svg className="w-7 h-7 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
      </button>
    </div>
  );
};

export default ChatBot;
