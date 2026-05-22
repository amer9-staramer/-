import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check, RotateCcw } from 'lucide-react';
import { Zikr } from '../data/zikrs';
import { translations } from '../data/translations';
import { doc, getDoc, setDoc, updateDoc, increment as firestoreIncrement } from 'firebase/firestore';
import { db } from '../lib/firebase';

export interface ZikrCardProps {
  zikr: Zikr;
  language: 'ku' | 'en' | 'ar';
  onComplete?: (zikrTitle: string) => void;
  onIncrement?: (zikrTitle: string) => void;
}

export const ZikrCard = ({ zikr, language, onComplete, onIncrement }: ZikrCardProps) => {
  const [currentCount, setCurrentCount] = useState(0);
  const t = translations[language];

  useEffect(() => {
    // Record view in firestore for analytics
    const trackView = async () => {
      try {
        const statsRef = doc(db, 'zikr_stats', zikr.id.toString());
        const statsSnap = await getDoc(statsRef);
        
        if (statsSnap.exists()) {
          await updateDoc(statsRef, {
            viewCount: firestoreIncrement(1),
            lastViewed: new Date().toISOString()
          });
        } else {
          await setDoc(statsRef, {
            id: zikr.id,
            title: zikr.text.substring(0, 50) + '...',
            viewCount: 1,
            lastViewed: new Date().toISOString()
          });
        }
      } catch (err) {
        console.error('Error tracking zikr view:', err);
      }
    };
    trackView();
  }, [zikr.id, zikr.text]);

  const increment = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (currentCount < zikr.count) {
      const nextCount = currentCount + 1;
      setCurrentCount(nextCount);
      if (onIncrement) onIncrement(zikr.text);
      
      if (nextCount === zikr.count && onComplete) {
        onComplete(zikr.text);
      }
      
      // Increment total count in localStorage for stats
      const total = parseInt(localStorage.getItem('totalZikrs') || '0');
      localStorage.setItem('totalZikrs', (total + 1).toString());
    }
  };

  const reset = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentCount(0);
  };

  const isCompleted = currentCount === zikr.count;

  const translation = language === 'en' ? zikr.translationEn : language === 'ku' ? zikr.translationKu : zikr.translationAr;

  return (
    <motion.div 
      layout
      onClick={increment}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`relative p-6 rounded-2xl cursor-pointer transition-all border-2 ${
        isCompleted 
          ? 'bg-emerald-50 dark:bg-emerald-900/20 border-brand-emerald/20 shadow-inner' 
          : 'bg-white dark:bg-slate-900 border-transparent dark:border-slate-800 shadow-md hover:shadow-xl hover:border-brand-emerald/10'
      }`}
    >
      <div className="flex justify-center items-center mb-6">
        <div 
          onClick={increment}
          className="flex items-center gap-4 bg-slate-50 dark:bg-slate-800/50 px-8 py-3 rounded-2xl border-2 border-brand-emerald/10 hover:border-brand-emerald/30 transition-all active:scale-95 group/counter"
        >
          <div className="text-center">
            <div className="text-[10px] uppercase tracking-widest font-black text-slate-400 mb-1 group-hover/counter:text-brand-emerald dark:group-hover/counter:text-brand-gold transition-colors">
              {language === 'ku' ? 'ماوە' : language === 'ar' ? 'المتبقي' : 'Remaining'}
            </div>
            <div className="flex items-center gap-2">
              <span className="text-4xl font-black text-brand-emerald dark:text-brand-gold">{zikr.count - currentCount}</span>
              {zikr.count > 1 && (
                <div className="flex flex-col text-[10px] font-bold text-slate-300 dark:text-slate-600">
                  <span>/</span>
                  <span>{zikr.count}</span>
                </div>
              )}
            </div>
          </div>
          <button 
            onClick={reset}
            className="p-2 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-full transition-colors text-slate-400 ml-2"
          >
            <RotateCcw size={16} />
          </button>
        </div>
      </div>

      <p className="text-2xl md:text-3xl font-bold text-slate-800 dark:text-slate-100 leading-[1.8] mb-8 text-center quran-font">
        {zikr.text}
      </p>
      
      {translation && (
        <p className="text-lg md:text-xl text-slate-500 dark:text-slate-400 leading-relaxed text-center font-medium opacity-90 max-w-2xl mx-auto border-t border-slate-50 dark:border-slate-800 pt-6">
          {translation}
        </p>
      )}

      {isCompleted && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute inset-x-0 -bottom-2 flex justify-center"
        >
          <div className="bg-brand-emerald text-brand-cream text-[10px] font-bold px-3 py-1 rounded-full shadow-lg">
            {t.completed}
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};
