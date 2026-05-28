import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BookOpen, RefreshCw, AlertCircle, Clock, ChevronRight, ChevronLeft } from 'lucide-react';
import { apiFetch } from '../lib/apiFetch';

interface AyahItem {
  number: number;
  text: string;
  numberInSurah: number;
  juz: number;
  manzil: number;
  page: number;
  ruku: number;
  hizbQuarter: number;
}

interface SurahEditionResponse {
  code: number;
  status: string;
  data: Array<{
    number: number;
    name: string;
    englishName: string;
    englishNameTranslation: string;
    revelationType: string;
    numberOfAyahs: number;
    ayahs: AyahItem[];
  }>;
}

interface MinuteAyahViewerProps {
  language: 'ku' | 'en' | 'ar';
}

export function MinuteAyahViewer({ language }: MinuteAyahViewerProps) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [surahData, setSurahData] = useState<{
    number: number;
    name: string;
    englishName: string;
    translatedName: string;
    arabicAyahs: AyahItem[];
    kurdishAyahs: AyahItem[];
  } | null>(null);

  // Time-based rotating status
  const [currentMinute, setCurrentMinute] = useState(Math.floor(Date.now() / 60000));
  const [secondsRemaining, setSecondsRemaining] = useState(60 - (new Date().getSeconds()));

  // 1. Determine which Surah to load
  // Thursday = day 4 (0=Sunday, 1=Monday... 4=Thursday)
  const isThursday = useMemo(() => {
    return new Date().getDay() === 4;
  }, [currentMinute]); // Update if minute ticks over midnight

  const targetSurah = isThursday ? 18 : 2; // 18 = Al-Kahf, 2 = Al-Baqarah

  // 2. Fetch or load cached surah data
  useEffect(() => {
    let active = true;
    const fetchSurah = async () => {
      setLoading(true);
      setError(null);

      const cacheKey = `cached_minute_surah_${targetSurah}`;
      const cached = localStorage.getItem(cacheKey);
      
      if (cached) {
        try {
          const parsed = JSON.parse(cached);
          if (parsed && parsed.number === targetSurah && parsed.arabicAyahs?.length > 0) {
            if (active) {
              setSurahData(parsed);
              setLoading(false);
              return;
            }
          }
        } catch (e) {
          console.warn("Cleared corrupted cache key for target surah", e);
          localStorage.removeItem(cacheKey);
        }
      }

      try {
        // Fetch Uthmani text along with Kurdish (ku.asan) translation from Al Quran Cloud
        const responseData = await apiFetch<SurahEditionResponse>(
          `https://api.alquran.cloud/v1/surah/${targetSurah}/editions/quran-uthmani,ku.asan`
        );

        if (responseData && responseData.code === 200 && responseData.data?.length >= 2) {
          const arabicData = responseData.data[0];
          const kurdishData = responseData.data[1];

          const formatted = {
            number: targetSurah,
            name: arabicData.name,
            englishName: arabicData.englishName,
            translatedName: isThursday ? "سورەتی کەهف" : "سورەتی بەقەرە",
            arabicAyahs: arabicData.ayahs,
            kurdishAyahs: kurdishData.ayahs,
          };

          localStorage.setItem(cacheKey, JSON.stringify(formatted));
          
          if (active) {
            setSurahData(formatted);
          }
        } else {
          throw new Error("Could not parse dual edition from Quran cloud.");
        }
      } catch (err: any) {
        console.error("Failed to load minute-by-minute Quran surah:", err);
        if (active) {
          setError(
            language === 'ku'
              ? 'نەتوانرا ئایەتەکان باربکرێن. تکایە هێڵی ئینتەرنێتەکەت کۆنترۆڵ بکە لەرێگەی دوگمەی نوێکردنەوە.'
              : 'Failed to retrieve Surah verses. Please check your network connection.'
          );
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    fetchSurah();

    return () => {
      active = false;
    };
  }, [targetSurah, language]);

  // 3. Setup Timer loop for Minute-based changes and seconds progress
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const nextMinuteStamp = Math.floor(now.getTime() / 60000);
      setCurrentMinute(nextMinuteStamp);
      setSecondsRemaining(60 - now.getSeconds());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // 4. Calculate active Ayah index cleanly based on the stable currentMinute state
  const currentAyah = useMemo(() => {
    if (!surahData || surahData.arabicAyahs.length === 0) return null;
    const total = surahData.arabicAyahs.length;
    // Modulo by total verses so it cycles back to starting ayah once finished
    const index = currentMinute % total;
    
    return {
      index,
      number: surahData.arabicAyahs[index].numberInSurah,
      arabicText: surahData.arabicAyahs[index].text,
      kurdishText: surahData.kurdishAyahs[index]?.text || "",
    };
  }, [surahData, currentMinute]);

  // Force-update manually helper
  const handleReload = () => {
    const cacheKey = `cached_minute_surah_${targetSurah}`;
    localStorage.removeItem(cacheKey);
    // Trigger reset
    setSurahData(null);
    setCurrentMinute(Math.floor(Date.now() / 60000));
  };

  // Share support helper
  const handleShare = () => {
    if (!currentAyah || !surahData) return;
    const refText = `${surahData.englishName} : ${currentAyah.number}`;
    const event = new CustomEvent('trigger-share', {
      detail: { 
        text: currentAyah.arabicText, 
        translation: currentAyah.kurdishText, 
        type: 'ayah' 
      }
    });
    window.dispatchEvent(event);
  };

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-6 md:p-8 rounded-[3rem] shadow-sm max-w-2xl mx-auto relative overflow-hidden mt-8">
      {/* Background soft pattern decoration */}
      <div className="absolute top-0 left-0 w-36 h-36 bg-indigo-500/5 dark:bg-indigo-500/10 rounded-full -ml-16 -mt-16 pointer-events-none" />
      
      {/* Dynamic Progress indicator bar at very top */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-slate-100 dark:bg-slate-800">
        <div 
          className="h-full bg-indigo-500 dark:bg-indigo-400 transition-all duration-1000 ease-linear"
          style={{ width: `${((60 - secondsRemaining) / 60) * 100}%` }}
        />
      </div>

      {/* Header Info */}
      <div className="flex items-center justify-between mb-5 pb-4 border-b border-slate-100/60 dark:border-slate-800/60 relative z-10">
        <div className="flex items-center gap-2.5">
          <div className="p-2 bg-indigo-500/10 rounded-xl text-indigo-500">
            <Clock size={18} className="animate-spin" style={{ animationDuration: '60s' }} />
          </div>
          <div>
            <h3 className="text-xs sm:text-sm font-black text-slate-800 dark:text-white flex items-center gap-1.5">
              <span>{language === 'ku' ? 'ئایەتی خولەکی' : 'Ayah of the Minute'}</span>
              <span className="text-[10px] bg-indigo-500/10 text-indigo-500 px-2 py-0.5 rounded-full font-black animate-pulse">
                {secondsRemaining}s
              </span>
            </h3>
            <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mt-0.5">
              {language === 'ku' 
                ? 'هەر خولەکێک ئایەتێک تاکۆتایی سورەتەکە' 
                : 'One new Verse every single minute'
              }
            </p>
          </div>
        </div>

        {/* Current Surah Indicator Display badge */}
        <div className="flex flex-col items-end">
          <span className="text-xs font-black text-indigo-600 dark:text-indigo-400">
            {surahData ? (language === 'ku' ? surahData.translatedName : surahData.englishName) : '...'}
          </span>
          <span className="text-[9px] font-bold text-slate-400 dark:text-slate-500">
            {isThursday 
              ? (language === 'ku' ? 'پێنجشەممە (سورەتی کەهف)' : 'Thursday (Al-Kahf)') 
              : (language === 'ku' ? 'بەردەوام (سورەتی بەقەرە)' : 'Daily (Al-Baqarah)')
            }
          </span>
        </div>
      </div>

      {/* Dynamic Canvas Area */}
      {loading ? (
        <div className="py-12 flex flex-col items-center justify-center space-y-3">
          <div className="w-8 h-8 border-3 border-indigo-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-xs font-bold text-slate-400 animate-pulse">
            {language === 'ku' ? 'باردەکرێت...' : 'Loading Surah...'}
          </p>
        </div>
      ) : error ? (
        <div className="p-4 bg-rose-500/5 dark:bg-rose-500/10 border border-rose-500/20 rounded-2xl flex flex-col items-center text-center space-y-3">
          <AlertCircle size={30} className="text-rose-500" />
          <p className="text-xs font-bold text-rose-500 max-w-md">{error}</p>
          <button 
            onClick={handleReload}
            className="px-3.5 py-1.5 bg-rose-500 hover:bg-rose-600 text-white font-black text-xs rounded-xl flex items-center gap-1.5 cursor-pointer mt-1"
          >
            <RefreshCw size={13} />
            <span>{language === 'ku' ? 'دووبارە هەوڵبدەرەوە' : 'Retry'}</span>
          </button>
        </div>
      ) : currentAyah ? (
        <AnimatePresence mode="wait">
          <motion.div
            key={currentAyah.index}
            initial={{ opacity: 0, x: 15 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -15 }}
            transition={{ duration: 0.3 }}
            className="space-y-4"
          >
            {/* Arabic Quranic Ayah */}
            <div className="text-center py-4">
              <h2 className="text-xl sm:text-2xl font-black leading-relaxed text-slate-800 dark:text-slate-100 quran-font font-arabic" dir="rtl">
                {currentAyah.arabicText}
              </h2>
            </div>

            {/* Kurdish Translation */}
            {currentAyah.kurdishText && (
              <p className="text-sm font-bold text-slate-500 dark:text-slate-400 leading-relaxed max-w-xl mx-auto text-center italic">
                {currentAyah.kurdishText}
              </p>
            )}

            {/* Status Footer Metrics / Metadata */}
            <div className="flex items-center justify-between pt-5 border-t border-slate-50 dark:border-slate-800/50">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black tracking-widest text-[#a855f7] bg-purple-500/10 px-3 py-1 rounded-full uppercase">
                  {language === 'ku' ? `ئایەتی ${currentAyah.number}` : `Ayah ${currentAyah.number}`}
                </span>
                <span className="text-[10px] font-black tracking-widest text-slate-400 dark:text-slate-500 bg-slate-100 dark:bg-slate-800/40 px-2.5 py-1 rounded-full uppercase">
                  {language === 'ku' ? `خولەکی ${currentAyah.index + 1}` : `Min ${currentAyah.index + 1}`}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleShare}
                  className="px-3 py-1.5 bg-indigo-500/10 text-indigo-500 hover:bg-indigo-500/20 rounded-xl transition-all font-black text-[10px] uppercase flex items-center gap-1 cursor-pointer"
                >
                  <span>{language === 'ku' ? 'بلاوکردنەوە' : 'Share'}</span>
                </button>
                <button
                  onClick={handleReload}
                  className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 rounded-lg"
                  title="Reload or clear cached surah database"
                >
                  <RefreshCw size={13} />
                </button>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      ) : null}
    </div>
  );
}
