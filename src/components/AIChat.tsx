
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, Bot, User, Loader2, Sparkles, X } from 'lucide-react';
import { chatWithAI } from '../services/aiService';

interface Message {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

interface AIChatProps {
  language: 'ku' | 'ar' | 'en';
  t: any;
}

export function AIChat({ language, t }: AIChatProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'model',
      text: language === 'en' 
        ? "Assalamu Alaikum! I am Zikr AI. How can I help you with zikrs, Quran, or Hadiths today?"
        : "السَّلاَمُ عَلَيْكُمْ! من یاریدەدەرە زیرەکەکەی زیکرم. چۆن دەتوانم یارمەتیت بدەم دەربارەی زیکرەکان، قورئان، یان فەرموودەکان؟",
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      text: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const history = messages.map(m => ({ role: m.role, parts: m.text }));
      const aiResponse = await chatWithAI(input, history);
      
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: aiResponse || "I didn't quite catch that. Could you rephrase?",
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: "Error connecting to service. Please check your connection or API key.",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[600px] bg-white rounded-[2.5rem] shadow-xl border border-slate-100 overflow-hidden">
      {/* Header */}
      <div className="p-6 bg-gradient-to-r from-brand-emerald to-emerald-700 text-white flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-md">
            <Sparkles size={20} className="text-brand-gold animate-pulse" />
          </div>
          <div>
            <h3 className="font-black text-lg">Zikr AI</h3>
            <p className="text-[10px] font-bold uppercase tracking-widest opacity-70">Religious Assistant</p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-hide">
        {messages.map((message) => (
          <motion.div
            key={message.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`flex gap-3 max-w-[85%] ${message.role === 'user' ? 'flex-row-reverse' : ''}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${message.role === 'user' ? 'bg-slate-100' : 'bg-brand-emerald/10 text-brand-emerald'}`}>
                {message.role === 'user' ? <User size={16} /> : <Bot size={16} />}
              </div>
              <div className={`p-4 rounded-2xl text-sm leading-relaxed ${message.role === 'user' ? 'bg-brand-emerald text-white font-bold rounded-tr-none' : 'bg-slate-50 text-slate-700 font-medium rounded-tl-none'}`} dir={message.role === 'model' && messages[0].text.match(/[\u0600-\u06FF]/) ? 'rtl' : 'auto'}>
                {message.text}
              </div>
            </div>
          </motion.div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="flex gap-3 items-center text-slate-400">
              <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center">
                <Loader2 size={16} className="animate-spin" />
              </div>
              <span className="text-xs font-bold animate-pulse">Thinking...</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 border-t border-slate-50 bg-slate-50/50">
        <div className="flex gap-2 bg-white p-2 rounded-2xl border border-slate-100 shadow-sm focus-within:ring-2 focus-within:ring-brand-emerald/20 transition-all">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder={t.askQuestion || "Ask about a zikr..."}
            className="flex-1 px-4 py-2 text-sm font-medium outline-none bg-transparent"
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            className="w-10 h-10 bg-brand-emerald text-white rounded-xl flex items-center justify-center hover:bg-emerald-600 disabled:opacity-50 transition-all shadow-md active:scale-95"
          >
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
