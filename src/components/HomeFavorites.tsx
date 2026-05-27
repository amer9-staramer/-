import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Clock, CheckCircle2, RotateCcw, Stars, BookOpen, Trash2 } from 'lucide-react';
import { zikrs } from '../data/zikrs';
import { sunnahPrayersData } from '../data/sunnahPrayers';

interface HomeFavoritesProps {
  language: 'ku' | 'ar' | 'en';
  favoriteZikrsIds: string[];
  favoriteSunnahIds: string[];
  onToggleZikr: (id: string) => void;
  onToggleSunnah: (id: string) => void;
  onIncrementTasbih: (count: number, title: string, id: string) => void;
  onCompleteZikr: (title: string, points: number, category: string, id: string) => void;
}

export function HomeFavorites({
  language,
  favoriteZikrsIds,
  favoriteSunnahIds,
  onToggleZikr,
  onToggleSunnah,
  onIncrementTasbih,
  onCompleteZikr
}: HomeFavoritesProps) {
  // Local state for tracking Zikr clicks made inside favorites
  const [zikrCounts, setZikrCounts] = useState<{ [id: string]: number }>({});
  
  // Local state for completed Sunnah prayers today
  const [completedSunnah, setCompletedSunnah] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('sunnah_completed_today');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const toggleSunnahLocal = (id: string) => {
    const nextArr = completedSunnah.includes(id)
      ? completedSunnah.filter(item => item !== id)
      : [...completedSunnah, id];
    setCompletedSunnah(nextArr);
    try {
      localStorage.setItem('sunnah_completed_today', JSON.stringify(nextArr));
    } catch {}
  };

  const handleIncrementZikr = (id: string, text: string, targetCount: number) => {
    const current = zikrCounts[id] || 0;
    if (current < targetCount) {
      const nextCount = current + 1;
      setZikrCounts(prev => ({ ...prev, [id]: nextCount }));
      
      onIncrementTasbih(1, text, id);
      
      if (nextCount === targetCount) {
        onCompleteZikr(text, 5, 'general', id);
      }
      
      // Increment total count in localStorage for stats
      const total = parseInt(localStorage.getItem('totalZikrs') || '0');
      localStorage.setItem('totalZikrs', (total + 1).toString());
    }
  };

  const resetZikrLocal = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setZikrCounts(prev => ({ ...prev, [id]: 0 }));
  };

  const favZikrList = zikrs.filter(z => favoriteZikrsIds.includes(z.id));
  const favSunnahList = sunnahPrayersData.sunnah_prayers.filter(sp => favoriteSunnahIds.includes(sp.id));

  if (favZikrList.length === 0 && favSunnahList.length === 0) {
    return null; // Don't block screen space with empty card
  }

  const tLocal = {
    title: {
      ku: "بەشی تایبەت (دڵخوازەکان)",
      ar: "مفضّلتي الخاصة",
      en: "My Favorites"
    },
    subtitle: {
      ku: "ئەو زیکر و سونەتانەی کە دیاریت کردوون بۆ دەستپێگەیشتنی خێرا",
      ar: "أذكارك وصلواتك المفضلة للوصول السريع إليها وتلاوتها",
      en: "Your favorite dhikrs and voluntary prayers listed for quick access"
    },
    favZikrsHeader: {
      ku: "زیکرە دڵخوازەکان",
      ar: "الأذكار المفضلة",
      en: "Favorite Dhikrs"
    },
    favSunnahHeader: {
      ku: "سونەتە دڵخوازەکان",
      ar: "النوافل المفضلة",
      en: "Favorite Sunnahs"
    },
    remove: {
      ku: "لابردن",
      ar: "إزالة",
      en: "Remove"
    },
    completed: {
      ku: "ئەنجامدرا",
      ar: "تمت",
      en: "Done"
    },
    remaining: {
      ku: "ماوە",
      ar: "متبقي",
      en: "Remaining"
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto px-4 space-y-6" dir={language === 'en' ? 'ltr' : 'rtl'}>
      {/* Small title header */}
      <div className="flex items-center gap-2 mb-4">
        <div className="w-8 h-8 rounded-full bg-rose-50 dark:bg-rose-950/40 text-rose-500 flex items-center justify-center">
          <Heart size={16} className="fill-rose-500" />
        </div>
        <div>
          <h3 className="text-lg font-black text-slate-800 dark:text-white">
            {tLocal.title[language]}
          </h3>
          <p className="text-[10px] font-bold text-slate-500 dark:text-slate-400">
            {tLocal.subtitle[language]}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Favorite Zikrs Bento card */}
        {favZikrList.length > 0 && (
          <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-[2.5rem] p-6 space-y-4 shadow-sm relative overflow-hidden">
            <h4 className="text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
              <Stars size={14} className="text-orange-500" />
              <span>{tLocal.favZikrsHeader[language]}</span>
            </h4>

            <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
              {favZikrList.map(zikr => {
                const count = zikrCounts[zikr.id] || 0;
                const isFinished = count === zikr.count;
                const translation = language === 'en' ? zikr.translationEn : language === 'ku' ? zikr.translationKu : zikr.translationAr;

                return (
                  <div
                    key={zikr.id}
                    onClick={() => handleIncrementZikr(zikr.id, zikr.text, zikr.count)}
                    className={`p-4 rounded-3xl border transition-all cursor-pointer active:scale-[0.98] ${
                      isFinished
                        ? 'bg-emerald-50/60 dark:bg-emerald-950/20 border-emerald-500/10'
                        : 'bg-slate-50 dark:bg-slate-950/40 border-slate-100 hover:border-slate-200 dark:border-slate-900'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div className="min-w-0 flex-1">
                        <p className="text-base font-black quran-font text-slate-800 dark:text-slate-100 line-clamp-2">
                          {zikr.text}
                        </p>
                        <p className="text-[10px] text-slate-500 dark:text-slate-400 font-bold line-clamp-1 mt-1">
                          {translation}
                        </p>
                      </div>
                      
                      {/* Counter circle tap */}
                      <div className="flex flex-col items-center gap-2">
                        <div className="w-12 h-12 rounded-full border border-slate-200 dark:border-slate-800 flex flex-col items-center justify-center bg-white dark:bg-slate-950">
                          <span className="text-xs font-black text-brand-emerald">
                            {zikr.count - count}
                          </span>
                          <span className="text-[7px] text-slate-400 font-black leading-none uppercase">
                            {tLocal.remaining[language]}
                          </span>
                        </div>
                        
                        <div className="flex items-center gap-1.5">
                          <button
                            type="button"
                            onClick={(e) => resetZikrLocal(zikr.id, e)}
                            className="p-1 text-slate-350 hover:text-slate-500 rounded-lg bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-850"
                          >
                            <RotateCcw size={10} />
                          </button>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              onToggleZikr(zikr.id);
                            }}
                            className="p-1 text-rose-350 hover:text-rose-500 rounded-lg bg-white dark:bg-slate-900 border border-rose-100/50"
                          >
                            <Trash2 size={10} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Favorite Sunnah Bento card */}
        {favSunnahList.length > 0 && (
          <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-[2.5rem] p-6 space-y-4 shadow-sm relative overflow-hidden">
            <h4 className="text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
              <BookOpen size={14} className="text-indigo-500" />
              <span>{tLocal.favSunnahHeader[language]}</span>
            </h4>

            <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
              {favSunnahList.map(prayer => {
                const isFinished = completedSunnah.includes(prayer.id);

                return (
                  <div
                    key={prayer.id}
                    onClick={() => toggleSunnahLocal(prayer.id)}
                    className={`p-4 rounded-3xl border transition-all cursor-pointer active:scale-[0.98] ${
                      isFinished
                        ? 'bg-emerald-50/60 dark:bg-emerald-950/20 border-emerald-500/10'
                        : 'bg-slate-50 dark:bg-slate-950/40 border-slate-100 hover:border-slate-200 dark:border-slate-900'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-black text-slate-800 dark:text-slate-100">
                          {prayer.title[language] || prayer.title['en']}
                        </p>
                        <div className="flex items-center gap-1.5 mt-1.5">
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-slate-150 dark:bg-slate-800 text-slate-500 text-[9px] font-black">
                            <Clock size={10} />
                            <span>{prayer.rakats} {language === 'ku' ? 'ڕکات' : language === 'ar' ? 'ركعة' : 'Rak\'ahs'}</span>
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5">
                        <button
                          type="button"
                          className={`w-9 h-9 rounded-2xl flex items-center justify-center shrink-0 border transition-all ${
                            isFinished
                              ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-500'
                              : 'bg-white border-slate-200 dark:bg-slate-900 dark:border-slate-800 text-slate-350'
                          }`}
                        >
                          <CheckCircle2 size={18} />
                        </button>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            onToggleSunnah(prayer.id);
                          }}
                          className="p-2 text-rose-350 hover:text-rose-500 rounded-xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-850"
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
