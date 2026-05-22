
import { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Share2, Download, Stars, Heart, Quote, BookOpen, MessageSquare, ChevronLeft } from 'lucide-react';
import { zikrs } from '../data/zikrs';
import { patienceWisdom } from '../data/patience';
import { loveWisdom } from '../data/love';
import { hadiths } from '../data/hadiths';

interface DailyCardProps {
  language: 'ku' | 'ar' | 'en';
  t: any;
}

const allWisdom = [...patienceWisdom, ...loveWisdom];

type CardType = 'zikr' | 'wisdom' | 'hadith';

export function DailyCard({ language, t }: DailyCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [type, setType] = useState<CardType>('zikr');
  const [dedicationName, setDedicationName] = useState('');
  const [isDedicating, setIsDedicating] = useState(false);
  
  const dayOfYear = Math.floor((new Date().getTime() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000);
  
  const content = {
    zikr: zikrs[dayOfYear % zikrs.length],
    wisdom: allWisdom[dayOfYear % allWisdom.length],
    hadith: hadiths[dayOfYear % hadiths.length],
  };

  const handleDownload = async () => {
    alert("This card is optimized for your screenshots! Feel free to capture it.");
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        const shareText = type === 'zikr' ? content.zikr.text : 
                         type === 'wisdom' ? content.wisdom.textAr : 
                         content.hadith.arabic;
        await navigator.share({
          title: t.appName,
          text: shareText,
          url: window.location.href,
        });
      } catch (err) {
        console.error('Error sharing:', err);
      }
    } else {
      alert('Sharing is not supported in this browser. You can copy the link!');
    }
  };

  return (
    <div className="space-y-10">
      {/* Type Selector */}
      <div className="flex bg-white dark:bg-slate-900 p-2 rounded-[2rem] shadow-sm border border-slate-100 dark:border-slate-800 max-w-sm mx-auto">
        {(['zikr', 'wisdom', 'hadith'] as const).map((tType) => (
          <button
            key={tType}
            onClick={() => setType(tType)}
            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl text-xs font-black transition-all ${type === tType ? 'bg-brand-emerald text-white shadow-lg' : 'text-slate-400 dark:text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800'}`}
          >
            {tType === 'zikr' && <Stars size={14} />}
            {tType === 'wisdom' && <BookOpen size={14} />}
            {tType === 'hadith' && <MessageSquare size={14} />}
            <span className="capitalize">
              {tType === 'zikr' ? t.zikrs : 
               tType === 'wisdom' ? (language === 'ku' ? 'ئایەت/وتە' : 'Ayah/Quote') : 
               t.hadith}
            </span>
          </button>
        ))}
      </div>

      <motion.div 
        layout
        ref={cardRef}
        className={`aspect-[4/5] w-full max-w-sm mx-auto rounded-[3.5rem] shadow-2xl relative overflow-hidden flex flex-col p-10 text-white transition-colors duration-700 ${
          type === 'zikr' ? 'bg-gradient-to-br from-brand-emerald to-emerald-900' :
          type === 'wisdom' ? 'bg-gradient-to-br from-indigo-600 to-indigo-950' :
          'bg-gradient-to-br from-rose-500 to-rose-900'
        }`}
      >
        {/* Background Patterns */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-brand-gold/10 rounded-full -ml-24 -mb-24 blur-2xl"></div>
        
        {/* Header */}
        <div className="flex items-center justify-between mb-10 relative z-10">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-white/20 rounded-xl flex items-center justify-center">
              {type === 'zikr' ? <Stars size={16} className="text-brand-gold" /> :
               type === 'wisdom' ? <BookOpen size={16} className="text-indigo-200" /> :
               <MessageSquare size={16} className="text-rose-200" />}
            </div>
            <span className="text-[10px] font-black uppercase tracking-[0.2em]">
              {type === 'zikr' ? t.dailyZikr : type === 'wisdom' ? t.dailyAyah : t.dailyHadith}
            </span>
          </div>
          <Heart size={20} className="text-white/40" />
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col justify-center text-center space-y-8 relative z-10">
          <Quote className="mx-auto text-white/10" size={64} />
          
          <AnimatePresence mode="wait">
            <motion.div
              key={type}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="space-y-4"
            >
              <h2 className="text-3xl font-black leading-[1.6] quran-font" dir="rtl">
                {type === 'zikr' ? content.zikr.text : 
                 type === 'wisdom' ? content.wisdom.textAr : 
                 content.hadith.arabic}
              </h2>
              
              <div className="space-y-4">
                <div className="w-12 h-1 bg-brand-gold/40 mx-auto rounded-full"></div>
                <p className="text-lg font-bold text-white/80 leading-relaxed italic">
                  {type === 'zikr' ? (language === 'en' ? content.zikr.translationEn : content.zikr.translationKu) :
                   type === 'wisdom' ? (language === 'en' ? content.wisdom.textEn : content.wisdom.textKu) :
                   (language === 'en' ? (content.hadith.english || content.hadith.kurdish) : content.hadith.kurdish)}
                </p>
              </div>

              {dedicationName && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="pt-4 border-t border-white/10">
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-60 mb-1">
                    {t.sadaqahFor}
                  </p>
                  <p className="text-xl font-black text-brand-gold">{dedicationName}</p>
                </motion.div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Footer */}
        <div className="mt-auto relative z-10 flex flex-col items-center">
          <div className="bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full border border-white/5 flex items-center gap-3">
             <div className="w-6 h-6 bg-white text-brand-emerald rounded-lg flex items-center justify-center text-[10px] font-black uppercase shadow-sm">
                {t.appName?.[0] || 'Z'}
             </div>
             <span className="text-[10px] font-black uppercase tracking-widest opacity-80">{t.appName}</span>
          </div>
        </div>
      </motion.div>

      <div className="max-w-sm mx-auto space-y-4">
        {isDedicating ? (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="flex gap-2">
            <input 
              type="text" 
              value={dedicationName}
              onChange={(e) => setDedicationName(e.target.value)}
              placeholder={t.deceasedNamePlaceholder}
              className="flex-1 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-xl px-4 py-2 text-sm font-bold outline-none focus:ring-2 focus:ring-brand-emerald/20 dark:text-white"
            />
            <button 
              onClick={() => setIsDedicating(false)} 
              className="px-4 py-2 bg-brand-emerald text-white rounded-xl text-xs font-black"
            >
              {t.done}
            </button>
          </motion.div>
        ) : (
          <button 
            onClick={() => setIsDedicating(true)}
            className="w-full py-3 bg-white/50 dark:bg-slate-900/50 border border-dashed border-slate-200 dark:border-slate-800 rounded-2xl text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 hover:bg-white dark:hover:bg-slate-900 hover:text-brand-emerald transition-all"
          >
            + {t.sadaqahJariyah}
          </button>
        )}

        <div className="flex justify-center gap-4">
          <button 
            onClick={handleDownload}
            className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-800 rounded-3xl text-xs font-black text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-all shadow-sm"
          >
            <Download size={14} />
            {t.downloadImage}
          </button>
          <button 
            onClick={handleShare}
            className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-slate-800 dark:bg-brand-emerald text-white rounded-3xl text-xs font-black hover:bg-slate-900 dark:hover:bg-brand-emerald/80 transition-all shadow-lg"
          >
            <Share2 size={14} />
            {t.shareCard}
          </button>
        </div>
      </div>
    </div>
  );
}
