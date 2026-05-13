import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Loader2, BookOpen, Quote, AlertCircle, Globe, ChevronRight } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { searchHadiths } from '../services/hadithSearchService';

interface HadithSearchProps {
  language: 'ku' | 'en' | 'ar';
  t: any;
}

export function HadithSearch({ language, t }: HadithSearchProps) {
  const [query, setQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setIsSearching(true);
    setError(null);
    setResult(null);

    try {
      const searchResult = await searchHadiths(query, language);
      setResult(searchResult);
    } catch (err: any) {
      setError(err.message || 'An error occurred during search.');
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-slate-900 rounded-[2rem] p-8 shadow-sm border border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-12 h-12 bg-brand-emerald/10 text-brand-emerald rounded-2xl flex items-center justify-center">
            <Globe size={24} />
          </div>
          <div>
            <h3 className="text-xl font-black tracking-tight">{t.hadithSearch || 'AI Hadith Search'}</h3>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{t.searchGrounding || 'Google Search Grounding'}</p>
          </div>
        </div>

        <form onSubmit={handleSearch} className="relative">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300" size={20} />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t.aiHadithSearchPlaceholder || 'Search for keywords (e.g. patience, fasting, honesty)...'}
            className="w-full pl-14 pr-32 py-5 bg-slate-50 dark:bg-slate-800/50 border-none rounded-2xl focus:ring-2 focus:ring-brand-emerald transition-all text-sm font-bold"
          />
          <button
            type="submit"
            disabled={isSearching || !query.trim()}
            className="absolute right-3 top-3 bottom-3 px-6 bg-brand-emerald text-white rounded-xl font-black text-xs hover:scale-105 active:scale-95 transition-all disabled:opacity-50 disabled:scale-100 flex items-center gap-2"
          >
            {isSearching ? <Loader2 size={16} className="animate-spin" /> : <ChevronRight size={16} />}
            {t.search || 'Search'}
          </button>
        </form>
        
        <p className="mt-4 text-[10px] text-slate-400 font-bold italic text-center">
          {t.aiDisclaimer || 'AI results are grounded via Google Search for accuracy. Always verify with original sources.'}
        </p>
      </div>

      <AnimatePresence mode="wait">
        {isSearching && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="bg-white dark:bg-slate-900 rounded-[2rem] p-12 shadow-sm border border-slate-100 dark:border-slate-800 text-center space-y-4"
          >
            <div className="w-16 h-16 bg-brand-emerald/10 text-brand-emerald rounded-full flex items-center justify-center mx-auto mb-2">
              <Loader2 size={32} className="animate-spin" />
            </div>
            <h4 className="text-lg font-black tracking-tight animate-pulse">{t.searchingHadiths || 'Searching authentic sources...'}</h4>
            <p className="text-sm font-bold text-slate-400">{t.groundingSearch || 'This may take a few seconds as we verify citations.'}</p>
          </motion.div>
        )}

        {error && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-900/20 rounded-[2rem] p-8 text-center"
          >
            <AlertCircle size={32} className="text-red-500 mx-auto mb-4" />
            <p className="text-red-600 dark:text-red-400 font-bold">{error}</p>
          </motion.div>
        )}

        {result && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-slate-900 rounded-[2rem] p-8 lg:p-10 shadow-sm border border-slate-100 dark:border-slate-800"
          >
            <div className="flex items-center gap-3 mb-8 pb-6 border-b border-slate-50 dark:border-slate-800">
               <div className="w-10 h-10 bg-brand-emerald rounded-xl flex items-center justify-center text-white">
                 <BookOpen size={20} />
               </div>
               <h4 className="text-xl font-black tracking-tight">{t.foundHadiths || 'Findings'}</h4>
            </div>

            <div className="prose prose-slate dark:prose-invert max-w-none prose-headings:font-black prose-p:font-bold prose-p:leading-relaxed prose-li:font-bold">
              <ReactMarkdown>{result}</ReactMarkdown>
            </div>
            
            <div className="mt-10 pt-8 border-t border-slate-50 dark:border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2 text-slate-400">
                <Quote size={16} />
                <span className="text-[10px] font-black uppercase tracking-widest">{t.verifiedCitation || 'Source Verified'}</span>
              </div>
              <button 
                onClick={() => {
                  setQuery('');
                  setResult(null);
                }}
                className="text-xs font-black text-brand-emerald hover:underline"
              >
                {t.clearSearch || 'New Search'}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
