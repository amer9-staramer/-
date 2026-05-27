import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BookOpen, Search, Heart, Clock, CheckCircle2, ChevronRight, Award, Sparkles, AlertCircle } from 'lucide-react';
import { sunnahPrayersData, SunnahPrayer } from '../data/sunnahPrayers';

interface SunnahPrayersProps {
  language: 'ku' | 'ar' | 'en';
  t: any;
}

export function SunnahPrayers({ language, t }: SunnahPrayersProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedId, setSelectedId] = useState<string | null>(null);

  // Hook up simple local storage to track completed prayers for today!
  const [completedToday, setCompletedToday] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('sunnah_completed_today');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Track favorites
  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('fav_sunnah');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const toggleFavorite = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = favorites.includes(id)
      ? favorites.filter(item => item !== id)
      : [...favorites, id];
    setFavorites(updated);
    try {
      localStorage.setItem('fav_sunnah', JSON.stringify(updated));
    } catch (err) {
      console.error(err);
    }
  };

  const toggleCompleted = (id: string, e: React.MouseEvent) => {
    e.stopPropagation(); // Avoid opening/collapsing the card
    const updated = completedToday.includes(id)
      ? completedToday.filter(item => item !== id)
      : [...completedToday, id];
    setCompletedToday(updated);
    try {
      localStorage.setItem('sunnah_completed_today', JSON.stringify(updated));
    } catch (err) {
      console.error(err);
    }
  };

  const uiTexts = {
    title: {
      ku: "نوێژی سونەت",
      ar: "السنن والرواتب",
      en: "Sunnah Prayers"
    },
    subtitle: {
      ku: "ڕێبەرێکی تەواو بۆ نوێژە سونەتەکان، فەزڵ و ژمارەی ڕکاتەکانیان",
      ar: "دليل شامل للصلوات الـمسنونة، فضائلها وعدد ركعاتها المأثورة",
      en: "A complete guide to Sunnah prayers, their virtues, and recommended Rak'ahs"
    },
    searchPlaceholder: {
      ku: "گەڕان لە نێو نوێژە سونەتەکان...",
      ar: "البحث في السنن والرواتب من الصلوات...",
      en: "Search Sunnah prayers..."
    },
    rakats: {
      ku: "ژمارەی ڕکات",
      ar: "عدد الركعات",
      en: "Rak'ahs"
    },
    rakatsUnit: {
      ku: "ڕکات",
      ar: "ركعة",
      en: "Rak'ahs"
    },
    reward: {
      ku: "پاداشت و فەزڵ",
      ar: "الأجر والفضل",
      en: "Virtue & Reward"
    },
    completedTodayBtn: {
      ku: "ئەمرۆ ئەنجاممداوە",
      ar: "صليتها اليوم",
      en: "Prayed Today"
    },
    notCompletedTodayBtn: {
      ku: "دیاریکردن وەک ئەنجامدراو",
      ar: "تحديد كمصلى",
      en: "Mark as Prayed"
    },
    noResults: {
      ku: "هیچ نوێژێکی سونەت بەم ناوە نەدۆزرایەوە.",
      ar: "لم يتم العثور على أي صلاة مسنونة تطابق بحثك.",
      en: "No Sunnah prayers found matching your criteria."
    },
    generalAdvice: {
      ku: "نوێژی سونەت نوقسانی و کەمکوڕی نوێژی فەرز پڕدەکاتەوە لە ڕۆژی دواییدا، و دەبێتە مایەی نزیکبوونەوەی زیاترت لە ڕەحمەتی خوای میهرەبان.",
      ar: "النوافل تجبر ما نقص من الفرائض يوم القيامة وهي أعظم وسيلة للتقرب ومحبة الله عز وجل.",
      en: "Voluntary prayers make up for shortcomings in obligatory prayers on Judgment Day and are the key to unlocking Allah's love."
    }
  };

  const filteredPrayers = useMemo(() => {
    return sunnahPrayersData.sunnah_prayers.filter((prayer) => {
      const title = (prayer.title[language] || '').toLowerCase();
      const desc = (prayer.description[language] || '').toLowerCase();
      const reward = (prayer.reward[language] || '').toLowerCase();
      const q = searchQuery.toLowerCase();
      return title.includes(q) || desc.includes(q) || reward.includes(q);
    });
  }, [searchQuery, language]);

  return (
    <div className="space-y-8 max-w-4xl mx-auto px-4 py-6">
      {/* Header Info */}
      <div className="text-center space-y-4">
        <h2 className="text-3xl sm:text-4xl font-black text-slate-800 dark:text-white leading-tight uppercase tracking-wide flex items-center justify-center gap-3">
          <Sparkles className="text-brand-gold animate-pulse" size={32} />
          <span>{uiTexts.title[language]}</span>
        </h2>
        <p className="text-sm font-bold text-slate-500 dark:text-slate-400 max-w-xl mx-auto">
          {uiTexts.subtitle[language]}
        </p>
      </div>

      {/* Completion Tracker Progress Bar */}
      <div className="bg-gradient-to-br from-indigo-900/10 via-emerald-900/10 to-slate-900/20 backdrop-blur-xl p-6 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 space-y-4 shadow-sm">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4" dir={language === 'en' ? 'ltr' : 'rtl'}>
          <div className="text-center sm:text-right">
            <h4 className="text-sm font-black text-slate-800 dark:text-white uppercase tracking-wider">
              {language === 'ku' ? 'خشتەی چاودێری ئەمرۆ' : language === 'ar' ? 'متابعة النوافل اليومية' : 'Daily Sunnah Tracker'}
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-bold">
              {language === 'ku' 
                ? `ئەمڕۆ ${completedToday.length} نوێژی سونەتت لە کۆی ${sunnahPrayersData.sunnah_prayers.length} ئەنجامداوە` 
                : language === 'ar'
                ? `لقد صليت اليوم ${completedToday.length} من أصل ${sunnahPrayersData.sunnah_prayers.length} من النوافل المسجلة`
                : `You have completed ${completedToday.length} of ${sunnahPrayersData.sunnah_prayers.length} Sunnah prayers today`}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-2xl font-extrabold text-brand-emerald">
              {Math.round((completedToday.length / sunnahPrayersData.sunnah_prayers.length) * 100)}%
            </span>
          </div>
        </div>
        <div className="w-full h-3 bg-slate-250 dark:bg-slate-950 rounded-full overflow-hidden border border-slate-100 dark:border-slate-800/80">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${(completedToday.length / sunnahPrayersData.sunnah_prayers.length) * 100}%` }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="h-full bg-gradient-to-r from-emerald-500 hover:from-emerald-400 to-teal-400 rounded-full"
          />
        </div>
      </div>

      {/* Search Input */}
      <div className="relative">
        <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-slate-400 dark:text-slate-500">
          <Search size={18} />
        </div>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={uiTexts.searchPlaceholder[language]}
          className="w-full pl-12 pr-6 py-4 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/80 rounded-[2rem] text-sm font-bold text-slate-800 dark:text-slate-150 focus:outline-none focus:ring-2 focus:ring-brand-emerald/40 placeholder-slate-400 dark:placeholder-slate-500 shadow-sm transition-all"
          dir={language === 'en' ? 'ltr' : 'rtl'}
        />
      </div>

      {/* Grid of Sunnah prayers cards */}
      <div className="space-y-4">
        <AnimatePresence mode="popLayout">
          {filteredPrayers.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-12 text-sm font-bold text-slate-500 dark:text-slate-400"
            >
              {uiTexts.noResults[language]}
            </motion.div>
          ) : (
            filteredPrayers.map((prayer) => {
              const isSelected = selectedId === prayer.id;
              const isFinished = completedToday.includes(prayer.id);

              return (
                <motion.div
                  key={prayer.id}
                  layout
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  onClick={() => setSelectedId(isSelected ? null : prayer.id)}
                  className={`bg-white dark:bg-slate-900 border ${
                    isSelected ? 'border-indigo-500/30 ring-1 ring-indigo-500/20' : 'border-slate-100 dark:border-slate-800'
                  } rounded-[2.5rem] p-6 shadow-sm hover:shadow-md active:scale-[0.99] transition-all cursor-pointer overflow-hidden relative group`}
                  dir={language === 'en' ? 'ltr' : 'rtl'}
                >
                  {/* Decorative glowing background elements for selected card */}
                  {isSelected && (
                    <span className="absolute -right-16 -top-16 w-32 h-32 rounded-full bg-indigo-500/5 blur-3xl pointer-events-none" />
                  )}

                  {/* Main Row layout for headers */}
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-4 min-w-0">
                      {/* Active Status Ring / CheckCircle indicating if user completed the prayer today */}
                      <button
                        onClick={(e) => toggleCompleted(prayer.id, e)}
                        className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 transition-all ${
                          isFinished
                            ? 'bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-500'
                            : 'bg-slate-50 dark:bg-slate-800 text-slate-400 hover:text-slate-600'
                        }`}
                      >
                        <CheckCircle2 size={24} className={isFinished ? 'stroke-[2.5px]' : 'stroke-[1.5px]'} />
                      </button>

                      <div className="text-right sm:text-left min-w-0">
                        <h3 className="text-lg font-black text-slate-800 dark:text-white truncate max-w-xs sm:max-w-md">
                          {prayer.title[language] || prayer.title['en']}
                        </h3>
                        <div className="flex items-center gap-2 mt-1 flex-wrap">
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-950/40 text-indigo-500 text-[10px] sm:text-xs font-black">
                            <Clock size={12} />
                            <span>{prayer.rakats} {uiTexts.rakatsUnit[language]}</span>
                          </span>
                          
                          {isFinished && (
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-500 text-[10px] sm:text-xs font-black">
                              {language === 'ku' ? 'ئەنجامدراوە ✓' : language === 'ar' ? 'تمت الصلاة ✓' : 'Prayed ✓'}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 text-slate-400 dark:text-slate-500 shrink-0">
                      <button
                        onClick={(e) => toggleFavorite(prayer.id, e)}
                        title={language === 'ku' ? 'بەپسندکردن / لابردن' : language === 'ar' ? 'إضافة/إزالة المفضلة' : 'Toggle Favorite'}
                        className={`p-2.5 rounded-xl border transition-all active:scale-95 flex items-center justify-center shadow-sm ${
                          favorites.includes(prayer.id)
                            ? 'bg-rose-50 dark:bg-rose-950/30 text-rose-500 border-rose-100 dark:border-rose-900/50'
                            : 'bg-slate-50 dark:bg-slate-800/80 hover:text-rose-500 hover:bg-rose-50/50 border-slate-100 dark:border-slate-700/50'
                        }`}
                      >
                        <Heart size={14} className={favorites.includes(prayer.id) ? 'fill-rose-500 text-rose-500' : ''} />
                      </button>

                      <motion.div
                        animate={{ rotate: isSelected ? 90 : 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <ChevronRight size={20} />
                      </motion.div>
                    </div>
                  </div>

                  {/* Expanded content area */}
                  <AnimatePresence initial={false}>
                    {isSelected && (
                      <motion.div
                        initial={{ height: 0, opacity: 0, marginTop: 0 }}
                        animate={{ height: 'auto', opacity: 1, marginTop: 20 }}
                        exit={{ height: 0, opacity: 0, marginTop: 0 }}
                        transition={{ duration: 0.25, ease: 'easeInOut' }}
                        className="border-t border-slate-100 dark:border-slate-800/80 pt-5 space-y-5"
                      >
                        {/* Description block */}
                        <div className="space-y-1.5 text-right sm:text-left">
                          <h4 className="text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest flex items-center gap-1 justify-start">
                            <BookOpen size={14} />
                            <span>{language === 'ku' ? 'دەربارەی نوێژەکە و کاتەکەی:' : language === 'ar' ? 'نبذة عن الصلاة ووقتها:' : 'About & timing:'}</span>
                          </h4>
                          <p className="text-sm font-bold text-slate-600 dark:text-slate-300 leading-relaxed">
                            {prayer.description[language] || prayer.description['en']}
                          </p>
                        </div>

                        {/* Reward block */}
                        <div className="p-5 bg-emerald-50/50 dark:bg-emerald-950/15 border border-emerald-100/50 dark:border-emerald-950/30 rounded-3xl space-y-2 text-right sm:text-left">
                          <h4 className="text-xs font-black text-emerald-600 dark:text-emerald-400 uppercase tracking-widest flex items-center gap-1.5 justify-start">
                            <Award size={14} />
                            <span>{uiTexts.reward[language]}</span>
                          </h4>
                          <p className="text-sm font-extrabold text-slate-700 dark:text-slate-200 leading-relaxed">
                            {prayer.reward[language] || prayer.reward['en']}
                          </p>
                        </div>

                        {/* Fast check-in action inside expansion */}
                        <div className="flex justify-end pt-2">
                          <button
                            type="button"
                            onClick={(e) => toggleCompleted(prayer.id, e)}
                            className={`px-5 py-2.5 rounded-2xl text-xs font-black transition-all ${
                              isFinished
                                ? 'bg-emerald-500/15 hover:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20'
                                : 'bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-350'
                            }`}
                          >
                            {isFinished ? uiTexts.completedTodayBtn[language] : uiTexts.notCompletedTodayBtn[language]}
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })
          )}
        </AnimatePresence>
      </div>

      {/* Decorative General Advice card block */}
      <div className="bg-slate-50 dark:bg-slate-900 border border-dashed border-slate-200 dark:border-slate-800 p-8 rounded-[3rem] space-y-3">
        <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2" dir={language === 'en' ? 'ltr' : 'rtl'}>
          <AlertCircle size={16} />
          <span>{language === 'ku' ? 'ئامۆژگاری زێڕین' : language === 'ar' ? 'فائدة غالية' : 'Preserving the Sunnah'}</span>
        </h4>
        <p className="text-sm font-bold text-slate-500 dark:text-slate-400 leading-relaxed text-right sm:text-left" dir={language === 'en' ? 'ltr' : 'rtl'}>
          {uiTexts.generalAdvice[language]}
        </p>
      </div>
    </div>
  );
}
