
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { stories, Story } from '../data/stories';
import { ChevronRight, ChevronLeft, BookOpen, Quote } from 'lucide-react';

interface StoriesProps {
  language: 'ku' | 'ar' | 'en';
  t: any;
}

export function Stories({ language, t }: StoriesProps) {
  const [activeCategory, setActiveCategory] = useState<'prophet' | 'companion' | 'scholar' | 'convert'>('prophet');
  const [selectedStory, setSelectedStory] = useState<Story | null>(null);

  const filteredStories = stories.filter(s => s.category === activeCategory);

  return (
    <div className="space-y-8 py-10">
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-black text-brand-emerald">{t.stories}</h2>
        <div className="flex flex-wrap justify-center gap-2 max-w-2xl mx-auto">
          {[
            { id: 'prophet', label: t.storiesProphets },
            { id: 'companion', label: t.storiesCompanions },
            { id: 'scholar', label: t.storiesScholars || 'زانایان' },
            { id: 'convert', label: t.storiesConverts || 'موسڵمانبوون' }
          ].map(cat => (
            <button
              key={cat.id}
              onClick={() => { setActiveCategory(cat.id as any); setSelectedStory(null); }}
              className={`px-6 py-3 rounded-full text-xs font-black transition-all ${activeCategory === cat.id ? 'bg-brand-emerald text-white shadow-lg shadow-brand-emerald/20 border-brand-emerald' : 'bg-white text-slate-400 border border-slate-100'}`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence mode="wait">
          {filteredStories.map((story, i) => (
            <motion.button
              key={story.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              onClick={() => setSelectedStory(story)}
              className="bg-white dark:bg-slate-900 p-8 rounded-[3rem] shadow-sm border border-slate-100 dark:border-slate-800 text-right group hover:shadow-xl hover:-translate-y-1 transition-all"
            >
              <div className="w-12 h-12 bg-slate-50 dark:bg-slate-800 rounded-2xl flex items-center justify-center text-brand-emerald mb-6 group-hover:bg-brand-emerald group-hover:text-white transition-all">
                <BookOpen size={24} />
              </div>
              <h3 className="text-2xl font-black text-slate-800 dark:text-slate-100 mb-4">{story.title[language]}</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 font-bold line-clamp-3 leading-relaxed">
                {story.content[language]}
              </p>
              <div className="mt-8 flex items-center justify-end gap-2 text-brand-emerald dark:text-brand-gold font-black text-[10px] uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                <span>{language === 'ku' ? 'زیاتر بخوێنەرەوە' : 'Read More'}</span>
                <ChevronLeft size={14} />
              </div>
            </motion.button>
          ))}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {selectedStory && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 flex items-center justify-center p-4"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              className="bg-white dark:bg-slate-900 w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-[3.5rem] shadow-2xl relative"
            >
              <button 
                onClick={() => setSelectedStory(null)}
                className="absolute top-8 left-8 w-12 h-12 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors z-10"
              >
                <ChevronRight size={24} />
              </button>

              <div className="p-10 pt-20 space-y-10">
                <div className="text-center space-y-4">
                  <span className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-emerald dark:text-brand-gold opacity-60">
                    {activeCategory === 'prophet' ? t.storiesProphets : t.storiesCompanions}
                  </span>
                  <h2 className="text-4xl font-black text-slate-800 dark:text-slate-100">{selectedStory.title[language]}</h2>
                </div>

                <div className="prose dark:prose-invert prose-slate max-w-none">
                  <p className="text-xl font-medium text-slate-600 dark:text-slate-300 leading-[2] text-justify" dir={language === 'en' ? 'ltr' : 'rtl'}>
                    {selectedStory.content[language]}
                  </p>
                </div>

                <div className="bg-brand-emerald/5 dark:bg-brand-emerald/10 p-10 rounded-[3rem] border border-brand-emerald/10 dark:border-brand-emerald/20 relative overflow-hidden">
                   <Quote className="absolute top-4 right-4 text-brand-emerald/10 dark:text-brand-emerald/5" size={80} />
                   <div className="relative">
                     <h4 className="text-xs font-black text-brand-emerald dark:text-brand-gold uppercase tracking-widest mb-4">پەند و ئامۆژگاری:</h4>
                     <p className="text-2xl font-black text-slate-800 dark:text-slate-100 leading-tight">
                       {selectedStory.moral[language]}
                     </p>
                   </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
