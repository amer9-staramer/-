
import { motion } from 'motion/react';
import { Share2 } from 'lucide-react';
import { namesOfAllah } from '../data/namesOfAllah';

interface NamesOfAllahProps {
  language: 'ku' | 'ar' | 'en';
  t: any;
}

export function NamesOfAllah({ language, t }: NamesOfAllahProps) {
  return (
    <div className="space-y-12">
      <div className="text-center space-y-4">
        <h2 className="text-4xl font-black text-brand-emerald text-kurdish-display">{t.namesOfAllah}</h2>
        <p className="text-slate-500 font-bold max-w-lg mx-auto" dir="rtl">
          "وَلِلَّهِ الْأَسْمَاءُ الْحُسْنَى فَادْعُوهُ بِهَا"
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {namesOfAllah.map((name, i) => (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.02 }}
            key={name.id}
            className="bg-white dark:bg-slate-900 p-6 rounded-[2.5rem] shadow-sm border border-slate-100 dark:border-slate-800 flex flex-col items-center text-center group hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative"
          >
            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  const event = new CustomEvent('trigger-share', {
                    detail: {
                      text: name.arabic,
                      translation: `${name.transliteration} • ${name.kurdish}\n\n${name.meaning}`,
                      type: 'zikr'
                    }
                  });
                  window.dispatchEvent(event);
                }}
                className="p-1.5 text-slate-400 hover:text-brand-emerald hover:bg-slate-50 rounded-lg transition-all cursor-pointer shadow-sm"
                title={language === 'ku' ? 'شێرکردن' : 'Share'}
              >
                <Share2 size={12} />
              </button>
            </div>

            <div className="w-10 h-10 bg-brand-emerald/5 dark:bg-brand-emerald/20 rounded-xl flex items-center justify-center text-brand-emerald/20 text-[10px] font-black mb-3 group-hover:bg-brand-emerald group-hover:text-white transition-all">
              {name.id}
            </div>
            <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-4 quran-font" dir="rtl">{name.arabic}</h3>
            <div className="space-y-1">
              <p className="text-xs font-black text-brand-emerald dark:text-brand-gold uppercase tracking-tighter">{name.transliteration}</p>
              <p className="text-sm font-bold text-slate-600 dark:text-slate-300 font-kurdish-display">{name.kurdish}</p>
              <p className="text-[10px] text-slate-400 dark:text-slate-500 font-medium leading-relaxed mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                {name.meaning}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
