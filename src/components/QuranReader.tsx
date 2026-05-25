import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ChevronRight, 
  ChevronLeft, 
  BookOpen, 
  Settings, 
  Search, 
  ArrowRight,
  Maximize2,
  Minimize2,
  Play,
  Pause,
  Languages,
  Share2
} from 'lucide-react';
import { Surah, Ayah } from '../data/quran';

export function QuranReader({ 
  surah, 
  onBack, 
  language,
  onAyahRead
}: { 
  surah: Surah, 
  onBack: () => void, 
  language: 'ku' | 'ar' | 'en',
  onAyahRead?: (isKahf: boolean) => void
}) {
  const [fontSize, setFontSize] = useState(24);
  const [showTranslations, setShowTranslations] = useState(true);
  const [readAyahs, setReadAyahs] = useState<Set<number>>(new Set());
  
  const ayahs = surah.ayahs || [];

  const handleAyahVisible = (ayahNumber: number) => {
    if (!readAyahs.has(ayahNumber)) {
      setReadAyahs(prev => new Set(prev).add(ayahNumber));
      if (onAyahRead) onAyahRead(surah.number === 18);
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950">
      {/* Header Info - Fixed-ish or Sticky */}
      <div className="sticky top-0 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md z-40 border-b border-slate-100 dark:border-slate-800">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="w-10"></div> {/* Spacer for symmetry */}
          
          <div className="text-center font-kurdish-display">
            <h2 className="text-2xl font-black text-slate-800 dark:text-slate-100">
              {surah.name}
            </h2>
            <p className="text-[10px] font-black text-brand-emerald uppercase tracking-widest mt-1">
              {surah.englishName} • {surah.revelationType}
            </p>
          </div>

          <button 
            onClick={onBack}
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-slate-400"
          >
            <ChevronRight size={24} />
          </button>
        </div>
      </div>

      {/* Main Reading Flow */}
      <div className="max-w-3xl mx-auto px-6 pt-12 pb-40">
        {/* Bismillah */}
        {surah.number !== 1 && surah.number !== 9 && (
          <div className="text-center mb-20">
            <p className="text-5xl font-quran text-slate-800 dark:text-slate-100 opacity-90 leading-relaxed">
              بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ
            </p>
          </div>
        )}

        {/* List of Verses */}
        <div className="space-y-20">
          {ayahs.map((ayah, index) => (
            <motion.div 
              key={ayah.number}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              onViewportEnter={() => handleAyahVisible(ayah.number)}
              viewport={{ once: true, margin: "-50px" }}
              className="relative group"
            >
              {/* Verse Number Bubble */}
              <div className="absolute -top-6 right-0">
                <div className="w-8 h-8 rounded-full bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 flex items-center justify-center text-[10px] font-black text-slate-400 group-hover:text-brand-emerald group-hover:border-brand-emerald/30 transition-colors">
                  {ayah.numberInSurah || index + 1}
                </div>
              </div>

              {/* Share Verse Button */}
              <div className="absolute -top-6 left-0">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    const transStr = typeof ayah.translation === 'string' 
                      ? ayah.translation 
                      : ayah.translation?.ku || ayah.translation?.en || '';
                    const event = new CustomEvent('trigger-share', {
                      detail: { text: ayah.text, translation: transStr, type: 'ayah' }
                    });
                    window.dispatchEvent(event);
                  }}
                  title={language === 'ku' ? 'شێرکردن' : language === 'ar' ? 'مشاركة' : 'Share'}
                  className="w-8 h-8 rounded-full bg-slate-50 dark:bg-slate-900 hover:bg-emerald-50 dark:hover:bg-slate-800 border border-slate-100 dark:border-slate-800 flex items-center justify-center text-slate-400 hover:text-brand-emerald hover:border-brand-emerald/30 transition-colors shadow-sm cursor-pointer active:scale-95"
                >
                  <Share2 size={13} />
                </button>
              </div>

              <div className="flex flex-col gap-10 text-center">
                {/* Arabic Text */}
                <p 
                  className="quran-font leading-[2.2] text-slate-800 dark:text-slate-100 transition-all px-4" 
                  dir="rtl"
                  style={{ fontSize: `${fontSize}px` }}
                >
                  {ayah.text}
                </p>

                {/* Kurdish Translation */}
                {showTranslations && (
                  <div className="relative inline-block max-w-[85%] mx-auto">
                    <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-sky-100 dark:bg-sky-900/30 rounded-full" />
                    <p className="text-lg md:text-xl font-bold text-sky-700/80 dark:text-sky-400/80 leading-relaxed pl-6 text-kurdish-display">
                      {typeof ayah.translation === 'string' ? ayah.translation : ayah.translation?.ku}
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Floating Controls Bar at Bottom Center */}
      <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-50">
        <motion.div 
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="flex items-center gap-2 p-2 bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border border-slate-200 dark:border-slate-800 rounded-[2rem] shadow-2xl"
        >
          {/* Font Size Group */}
          <div className="flex items-center gap-1 bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-1">
            <button 
              onClick={() => setFontSize(Math.min(48, fontSize + 2))}
              className="px-4 py-2 text-sm font-black text-slate-600 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-700 rounded-xl transition-all"
            >
              +A
            </button>
            <div className="w-px h-4 bg-slate-200 dark:bg-slate-700 mx-1" />
            <button 
              onClick={() => setFontSize(Math.max(16, fontSize - 2))}
              className="px-4 py-2 text-sm font-black text-slate-600 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-700 rounded-xl transition-all"
            >
              -A
            </button>
          </div>

          <button 
            onClick={() => setShowTranslations(!showTranslations)}
            className={`w-12 h-12 flex items-center justify-center rounded-2xl transition-all ${showTranslations ? 'bg-brand-emerald text-white shadow-lg shadow-brand-emerald/20' : 'bg-slate-50 dark:bg-slate-800 text-slate-400'}`}
          >
            <Languages size={20} />
          </button>
        </motion.div>
      </div>
    </div>
  );
}
