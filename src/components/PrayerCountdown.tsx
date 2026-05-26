import React, { useState, useEffect, useMemo } from 'react';
import { Coordinates, CalculationMethod, PrayerTimes } from 'adhan';
import { Clock, Hourglass, BellRing } from 'lucide-react';
import { motion } from 'motion/react';

interface PrayerCountdownProps {
  language: 'ku' | 'ar' | 'en';
}

const cities = [
  { nameKu: 'سلیمانی', nameAr: 'السليمانية', nameEn: 'Sulaymaniyah', lat: 35.5668, lng: 45.4161 },
  { nameKu: 'هەولێر', nameAr: 'أربيل', nameEn: 'Erbil', lat: 36.1901, lng: 44.0093 },
  { nameKu: 'دهۆک', nameAr: 'دهوك', nameEn: 'Duhok', lat: 36.8661, lng: 42.9882 },
  { nameKu: 'کەرکوک', nameAr: 'كركوك', nameEn: 'Kirkuk', lat: 35.4687, lng: 44.3924 },
  { nameKu: 'بەغداد', nameAr: 'بغداد', nameEn: 'Baghdad', lat: 33.3152, lng: 44.3661 },
  { nameKu: 'مەککە', nameAr: 'مكة المكرمة', nameEn: 'Mecca', lat: 21.4225, lng: 39.8262 },
  { nameKu: 'مەدینە', nameAr: 'المدينة المنورة', nameEn: 'Medina', lat: 24.4672, lng: 39.6068 },
];

export function PrayerCountdown({ language }: PrayerCountdownProps) {
  const [now, setNow] = useState(new Date());

  // Listen to city changes or check localStorage periodically
  const [cityName, setCityName] = useState(() => localStorage.getItem('last_city') || 'Sulaymaniyah');

  useEffect(() => {
    // Keep internal time ticking ticking minute/second-by-second
    const timer = setInterval(() => {
      setNow(new Date());
      // Sync city name in case it changes
      const currentCity = localStorage.getItem('last_city') || 'Sulaymaniyah';
      if (currentCity !== cityName) {
        setCityName(currentCity);
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [cityName]);

  const activeCity = useMemo(() => {
    return cities.find(c => c.nameEn.toLowerCase() === cityName.toLowerCase()) || cities[0];
  }, [cityName]);

  const prayerTimesData = useMemo(() => {
    try {
      const coordinates = new Coordinates(activeCity.lat, activeCity.lng);
      const params = CalculationMethod.MuslimWorldLeague();
      
      const today = new PrayerTimes(coordinates, now, params);
      
      const tomorrowDate = new Date(now);
      tomorrowDate.setDate(tomorrowDate.getDate() + 1);
      const tomorrow = new PrayerTimes(coordinates, tomorrowDate, params);

      return { today, tomorrow };
    } catch (e) {
      console.error('Failed to calculate prayer times in breakdown', e);
      return null;
    }
  }, [activeCity, now]);

  const calculations = useMemo(() => {
    if (!prayerTimesData) return null;
    const { today, tomorrow } = prayerTimesData;

    // We calculate next prayer amongst: Fajr, Dhuhr, Asr, Maghrib, Isha
    const prayerList = [
      { id: 'fajr', nameKu: 'بەیانی', nameAr: 'الفجر', nameEn: 'Fajr', time: today.fajr },
      { id: 'dhuhr', nameKu: 'نیوەڕۆ', nameAr: 'الظهر', nameEn: 'Dhuhr', time: today.dhuhr },
      { id: 'asr', nameKu: 'عەسر', nameAr: 'العصر', nameEn: 'Asr', time: today.asr },
      { id: 'maghrib', nameKu: 'مەغریب', nameAr: 'المغرب', nameEn: 'Maghrib', time: today.maghrib },
      { id: 'isha', nameKu: 'عیشا', nameAr: 'العشاء', nameEn: 'Isha', time: today.isha },
      // tomorrow
      { id: 'fajr-tomorrow', nameKu: 'بەیانی (سبەی)', nameAr: 'الفجر (غداً)', nameEn: 'Fajr (Tomorrow)', time: tomorrow.fajr },
    ];

    // Find first prayer that is strictly in the future
    const currentTimeMs = now.getTime();
    const next = prayerList.find(p => p.time.getTime() > currentTimeMs) || prayerList[5];

    const diffMs = next.time.getTime() - currentTimeMs;
    const totalSeconds = Math.max(0, Math.floor(diffMs / 1000));
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return {
      nextPrayer: next,
      hours,
      minutes,
      seconds,
      totalSeconds
    };
  }, [prayerTimesData, now]);

  if (!calculations) return null;

  const { nextPrayer, hours, minutes, seconds } = calculations;

  // Render text helper for each language
  const getCountdownText = () => {
    const pName = language === 'ku' ? nextPrayer.nameKu : language === 'ar' ? nextPrayer.nameAr : nextPrayer.nameEn;
    
    // Formatting numbers in Arabic/Kurdish numerals if needed, but let's keep digital elegant standard
    if (language === 'ku') {
      if (hours > 0) {
        return (
          <span>
            <strong className="text-brand-gold text-lg font-black">{hours}</strong> کاتژمێر و{' '}
            <strong className="text-brand-gold text-lg font-black">{minutes}</strong> خولەک ماوە بۆ بانگی{' '}
            <span className="text-brand-emerald font-black underline decoration-brand-emerald/40 decoration-wavy underline-offset-4">{pName}</span>
          </span>
        );
      } else {
        return (
          <span>
            <strong className="text-rose-500 text-lg font-black">{minutes}</strong> خولەک و{' '}
            <strong className="text-rose-400 text-base font-bold">{seconds}</strong> چرکە ماوە بۆ بانگی{' '}
            <span className="text-brand-emerald font-black underline decoration-brand-emerald/40 decoration-wavy underline-offset-4">{pName}</span>
          </span>
        );
      }
    } else if (language === 'ar') {
      if (hours > 0) {
        return (
          <span>
            تبقّى <strong className="text-brand-gold text-lg font-black">{hours}</strong> ساعة و{' '}
            <strong className="text-brand-gold text-lg font-black">{minutes}</strong> دقيقة لصلاة{' '}
            <span className="text-brand-emerald font-black underline decoration-brand-emerald/40 decoration-wavy underline-offset-4">{pName}</span>
          </span>
        );
      } else {
        return (
          <span>
            تبقّى <strong className="text-rose-500 text-lg font-black">{minutes}</strong> دقيقة و{' '}
            <strong className="text-rose-400 text-base font-bold">{seconds}</strong> ثانية لصلاة{' '}
            <span className="text-brand-emerald font-black underline decoration-brand-emerald/40 decoration-wavy underline-offset-4">{pName}</span>
          </span>
        );
      }
    } else {
      if (hours > 0) {
        return (
          <span>
            <strong className="text-brand-gold text-lg font-black">{hours}</strong>h and{' '}
            <strong className="text-brand-gold text-lg font-black">{minutes}</strong>m remaining until{' '}
            <span className="text-brand-emerald font-black underline decoration-brand-emerald/40 decoration-wavy underline-offset-4">{pName}</span>
          </span>
        );
      } else {
        return (
          <span>
            <strong className="text-rose-500 text-lg font-black">{minutes}</strong>m and{' '}
            <strong className="text-rose-400 text-base font-bold">{seconds}</strong>s remaining until{' '}
            <span className="text-brand-emerald font-black underline decoration-brand-emerald/40 decoration-wavy underline-offset-4">{pName}</span>
          </span>
        );
      }
    }
  };

  const quoteText = {
    ku: '«کاتێت نوێژ دەکەی واهەست بکە دواین نوێژە»',
    ar: '«عندما تصلي، واهب نفسك كأنها صلاتك الأخيرة»',
    en: '«When you pray, pray as if it were your last prayer»'
  };

  const cityLabel = {
    ku: `بۆ شاری ${activeCity.nameKu}`,
    ar: `لمدينة ${activeCity.nameAr}`,
    en: `for ${activeCity.nameEn}`
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: -8 }} 
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-xl mx-auto mb-8 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-6 rounded-[2.5rem] shadow-sm relative overflow-hidden group hover:shadow-md transition-shadow"
    >
      {/* Background soft glowing orb */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-brand-emerald/5 dark:bg-brand-emerald/10 rounded-full blur-2xl -mr-16 -mt-16 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-brand-gold/5 dark:bg-brand-gold/10 rounded-full blur-2xl -ml-12 -mb-12 pointer-events-none" />

      {/* Spiritual Top Quote (Required: "لە سەرەوەیشی بنوسریت کاتیک نوێژدەکەی واهەست بکە دواین نوێژە") */}
      <div className="text-center mb-4 pb-3 border-b border-slate-50 dark:border-slate-850">
        <span className="text-brand-emerald dark:text-brand-gold font-bold text-xs font-kurdish-display leading-relaxed">
          {quoteText[language]}
        </span>
      </div>

      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-brand-emerald/5 dark:bg-brand-emerald/25 flex items-center justify-center text-brand-emerald animate-pulse">
            {hours === 0 ? <BellRing size={20} className="text-rose-500" /> : <Clock size={20} />}
          </div>
          <div className="text-right">
            <h4 className="text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest flex items-center gap-1">
              <Hourglass size={10} />
              {language === 'ku' ? 'کاتی داهاتووی نوێژ' : language === 'ar' ? 'الوقت المتبقي للصلاة' : 'Upcoming Prayer Countdown'} 
              <span className="text-[10px] text-slate-300 dark:text-slate-600">({cityLabel[language]})</span>
            </h4>
            <p className="text-sm md:text-base font-bold text-slate-700 dark:text-slate-300 mt-1 leading-normal">
              {getCountdownText()}
            </p>
          </div>
        </div>

        {/* Short format countdown indicator badge */}
        <div className="flex flex-col items-center justify-center px-4 py-2 bg-slate-50 dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-750">
          <span className="text-[10px] text-slate-400 font-black uppercase tracking-wider">
            {language === 'ku' ? 'باڵۆن' : language === 'ar' ? 'مؤشر' : 'Time'}
          </span>
          <span className="text-sm font-black text-brand-emerald dark:text-brand-gold tabular-nums">
            {String(hours).padStart(2, '0')}:{String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
          </span>
        </div>
      </div>
    </motion.div>
  );
}
