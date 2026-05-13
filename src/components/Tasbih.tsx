
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { RefreshCw, List } from 'lucide-react';
import { zikrs } from '../data/zikrs';

interface TasbihProps {
  language: 'ku' | 'ar' | 'en';
  t: any;
  onIncrement?: (count: number) => void;
}

export function Tasbih({ language, t, onIncrement }: TasbihProps) {
  const [count, setCount] = useState(0);
  const [target, setTarget] = useState(33);
  const [total, setTotal] = useState(0);
  const [selectedZikr, setSelectedZikr] = useState(zikrs.find(z => z.id === 'g1') || zikrs[0]);
  const [showZikrList, setShowZikrList] = useState(false);

  const increment = () => {
    const newCount = count + 1;
    const newTotal = total + 1;
    
    if (onIncrement) onIncrement(1);
    
    if (newCount === target) {
      if (navigator.vibrate) {
        navigator.vibrate([100, 50, 100]);
      }
      setCount(0);
    } else {
      if (navigator.vibrate) {
        navigator.vibrate(50);
      }
      setCount(newCount);
    }
    setTotal(newTotal);
  };

  const reset = () => {
    setCount(0);
    setTotal(0);
  };

  const tasbihZikrs = zikrs.filter(z => z.category === 'general' || z.category === 'tasbih');

  return (
    <div className="flex flex-col items-center justify-center space-y-8 py-10">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-black text-brand-emerald">{t.tasbih}</h2>
        <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">{t.total}: {total}</p>
      </div>

      {/* Selected Zikr Display */}
      <div className="w-full max-w-sm">
        <button 
          onClick={() => setShowZikrList(!showZikrList)}
          className="w-full bg-white p-6 rounded-[2.5rem] shadow-sm border border-slate-100 flex flex-col items-center text-center group hover:shadow-md transition-all"
        >
          <div className="flex items-center gap-2 mb-2 text-[10px] font-black text-brand-emerald/40 uppercase tracking-widest">
            <List size={12} /> {t.selectZikr || (language === 'ku' ? 'زیکرێک هەڵبژێرە' : 'Select Zikr')}
          </div>
          <p className="text-xl font-bold text-slate-800 leading-relaxed truncate w-full" dir="rtl">{selectedZikr.text}</p>
          <p className="text-xs font-medium text-slate-400 mt-2 italic">
            {language === 'en' ? selectedZikr.translationEn : selectedZikr.translationKu}
          </p>
        </button>

        <AnimatePresence>
          {showZikrList && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mt-2 bg-white rounded-3xl shadow-xl border border-slate-100 p-2 space-y-1 max-h-60 overflow-y-auto z-20 relative scrollbar-hide"
            >
              {tasbihZikrs.map(z => (
                <button
                  key={z.id}
                  onClick={() => {
                    setSelectedZikr(z);
                    setTarget(z.count || 33);
                    setCount(0);
                    setShowZikrList(false);
                  }}
                  className={`w-full text-right p-4 rounded-2xl transition-all ${selectedZikr.id === z.id ? 'bg-brand-emerald/10 text-brand-emerald' : 'hover:bg-slate-50 text-slate-600'}`}
                  dir="rtl"
                >
                  <p className="font-bold text-sm">{z.text}</p>
                  <p className="text-[10px] opacity-60 mt-1">{language === 'en' ? z.translationEn : z.translationKu}</p>
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="relative group">
        {/* Outer Ring */}
        <div className="w-72 h-72 rounded-full border-8 border-slate-100 flex items-center justify-center relative bg-white shadow-2xl">
          <svg className="absolute inset-0 w-full h-full -rotate-90">
            <circle
              cx="144"
              cy="144"
              r="130"
              fill="none"
              stroke="currentColor"
              strokeWidth="8"
              className="text-brand-emerald/10"
            />
            <motion.circle
              cx="144"
              cy="144"
              r="130"
              fill="none"
              stroke="currentColor"
              strokeWidth="8"
              strokeDasharray="816"
              animate={{ strokeDashoffset: 816 - (816 * count) / target }}
              className="text-brand-emerald"
              strokeLinecap="round"
            />
          </svg>

          {/* Main Button */}
          <button
            onClick={increment}
            className="w-56 h-56 rounded-full bg-brand-emerald text-white shadow-xl shadow-brand-emerald/30 hover:scale-105 active:scale-95 transition-all flex flex-col items-center justify-center relative z-10 overflow-hidden group/btn"
          >
            <span className="text-7xl font-black mb-2">{count}</span>
            <span className="text-xs font-black uppercase tracking-widest opacity-60">
              {language === 'ku' ? 'زیکر بکە' : language === 'ar' ? 'سبح' : 'Zikr'}
            </span>
            <div className="absolute inset-x-0 bottom-0 py-2 bg-black/10 text-[10px] font-black uppercase tracking-tighter">
              {t.target}: {target}
            </div>
          </button>
        </div>

        {/* Reset Button */}
        <button
          onClick={reset}
          className="absolute -bottom-4 -right-4 bg-white p-4 rounded-2xl shadow-lg border border-slate-100 text-slate-400 hover:text-brand-emerald hover:rotate-180 transition-all duration-500"
        >
          <RefreshCw size={24} />
        </button>

        {/* Target Switcher */}
        <div className="absolute -bottom-4 -left-4 flex bg-white rounded-2xl shadow-lg border border-slate-100 overflow-hidden">
          {[33, 99, 100].map(val => (
            <button
              key={val}
              onClick={() => {
                setTarget(val);
                setCount(0);
              }}
              className={`px-4 py-3 text-xs font-black transition-all ${target === val ? 'bg-brand-emerald text-white' : 'text-slate-400 hover:bg-slate-50'}`}
            >
              {val}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
