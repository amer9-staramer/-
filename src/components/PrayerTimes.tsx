
import { useState, useEffect, useMemo } from 'react';
import { Coordinates, CalculationMethod, PrayerTimes as AdhanPrayerTimes } from 'adhan';
import { Clock, MapPin, Loader2, Calendar, Compass, ChevronLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { QiblaFinder } from './QiblaFinder';

interface PrayerTimesProps {
  language: 'ku' | 'ar' | 'en';
  t: any;
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

export function PrayerTimes({ language, t }: PrayerTimesProps) {
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [cityName, setCityName] = useState<string>(() => localStorage.getItem('last_city') || 'Sulaymaniyah');
  const [countryName, setCountryName] = useState<string>(() => localStorage.getItem('last_country') || 'Iraq');
  const [times, setTimes] = useState<any>(null);
  const [nextPrayer, setNextPrayer] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [isCustomMode, setIsCustomMode] = useState(false);
  const [activeTab, setActiveTab] = useState<'times' | 'qibla'>('times');

  const fetchPrayerTimes = async (city: string, country: string) => {
    setLoading(true);
    try {
      const response = await fetch(`https://api.aladhan.com/v1/timingsByCity?city=${city}&country=${country}&method=4`);
      const data = await response.json();
      if (data.code === 200) {
        setTimes(data.data.timings);
        setNextPrayer(null); 
        localStorage.setItem('last_city', city);
        localStorage.setItem('last_country', country);
      }
    } catch (err) {
      console.error("API Error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPrayerTimes(cityName, countryName);
  }, [cityName, countryName]);

  useEffect(() => {
    if (navigator.geolocation && !localStorage.getItem('last_city')) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude });
          setCityName('Auto-detected');
        },
        (err) => console.error(err)
      );
    }
  }, []);

  const hijriDate = useMemo(() => {
    return new Intl.DateTimeFormat('ar-SA-u-ca-islamic-uma', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }).format(new Date());
  }, []);

  const solarDate = useMemo(() => {
    return new Intl.DateTimeFormat(language === 'en' ? 'en-US' : 'ku-Arab', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }).format(new Date());
  }, [language]);

  const prayerList = useMemo(() => {
    if (!times) return [];
    return [
      { id: 'fajr', name: t.fajr, time: times.Fajr },
      { id: 'sunrise', name: t.shuruq, time: times.Sunrise },
      { id: 'dhuhr', name: t.dhuhr, time: times.Dhuhr },
      { id: 'asr', name: t.asr, time: times.Asr },
      { id: 'maghrib', name: t.maghrib, time: times.Maghrib },
      { id: 'isha', name: t.isha, time: times.Isha },
    ];
  }, [times, t]);

  if (loading || !times) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="animate-spin text-brand-emerald" size={32} />
      </div>
    );
  }

  const formatTime = (timeStr: string) => {
    return timeStr; 
  };

  return (
    <div className="space-y-8">
      {activeTab === 'times' ? (
        <>
          {/* City Selector */}
          <div className="bg-white dark:bg-slate-900 p-6 rounded-[2.5rem] shadow-sm border border-slate-100 dark:border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2">
                {cities.map(city => (
                  <button
                    key={city.nameEn}
                    onClick={() => {
                      setCityName(city.nameEn);
                      setCountryName('Iraq');
                      setIsCustomMode(false);
                    }}
                    className={`px-6 py-2.5 rounded-2xl text-xs font-black transition-all flex-shrink-0 ${cityName === city.nameEn && !isCustomMode ? 'bg-brand-emerald text-white shadow-lg shadow-brand-emerald/20' : 'bg-slate-50 dark:bg-slate-800 text-slate-400 dark:text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-700'}`}
                  >
                    {language === 'en' ? city.nameEn : language === 'ar' ? city.nameAr : city.nameKu}
                  </button>
                ))}
                <button
                   onClick={() => setIsCustomMode(!isCustomMode)}
                   className={`px-6 py-2.5 rounded-2xl text-xs font-black transition-all flex-shrink-0 ${isCustomMode ? 'bg-brand-emerald text-white' : 'bg-brand-gold/10 text-brand-gold dark:bg-brand-gold/20 dark:text-brand-gold'}`}
                >
                  {language === 'en' ? 'Custom Location' : 'شوێنی تر'}
                </button>
              </div>
            </div>

            {isCustomMode && (
              <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-50 dark:border-slate-800">
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest px-2">{t.city || 'City'}</label>
                  <input 
                    type="text" 
                    value={cityName}
                    onChange={(e) => setCityName(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-xl px-4 py-2 text-sm font-bold outline-none focus:border-brand-emerald dark:text-white"
                    placeholder="City Name"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest px-2">{t.country || 'Country'}</label>
                  <input 
                    type="text" 
                    value={countryName}
                    onChange={(e) => setCountryName(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-xl px-4 py-2 text-sm font-bold outline-none focus:border-brand-emerald dark:text-white"
                    placeholder="Country Name"
                  />
                </div>
              </motion.div>
            )}
          </div>

          {/* Main Prayer Times Card */}
          <div className="bg-white dark:bg-slate-900 p-8 rounded-[3rem] shadow-sm border border-slate-100 dark:border-slate-800 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 bg-brand-emerald/5 rounded-full -mr-24 -mt-24"></div>
            <div className="flex flex-col md:flex-row md:items-center justify-between relative mb-8 gap-6">
              <div className="space-y-2">
                <div className="flex items-center gap-4">
                  <h2 className="text-3xl font-black text-brand-emerald dark:text-brand-gold">{t.prayerTimes}</h2>
                  <button 
                    onClick={() => setActiveTab('qibla')}
                    className="p-3 bg-brand-emerald/10 dark:bg-brand-emerald/20 text-brand-emerald dark:text-brand-emerald rounded-2xl hover:bg-brand-emerald hover:text-white transition-all shadow-sm"
                    title={t.qibla}
                  >
                    <Compass size={20} />
                  </button>
                </div>
                <div className="flex items-center gap-2 text-slate-400 dark:text-slate-500 font-bold text-xs bg-slate-50 dark:bg-slate-800/50 px-4 py-2 rounded-full w-fit">
                  <MapPin size={12} className="text-brand-emerald" />
                  <span>{cityName}, {countryName}</span>
                </div>
              </div>
              
              <div className="flex flex-col items-end gap-2">
                <div className="flex items-center gap-3 bg-brand-gold/5 dark:bg-brand-gold/10 px-4 py-2 rounded-2xl border border-brand-gold/10 dark:border-brand-gold/20">
                  <Calendar size={16} className="text-brand-gold" />
                  <div className="text-right">
                    <p className="text-[10px] font-black text-brand-gold uppercase tracking-widest">{t.hijri}</p>
                    <p className="text-sm font-bold text-slate-700 dark:text-slate-300">{hijriDate}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 bg-slate-50 dark:bg-slate-800/80 px-4 py-2 rounded-2xl">
                  <Clock size={16} className="text-slate-400 dark:text-slate-500" />
                  <div className="text-right">
                    <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">{t.solar}</p>
                    <p className="text-sm font-bold text-slate-700 dark:text-slate-300">{solarDate}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {prayerList.map((p) => {
                 const isNext = nextPrayer?.toLowerCase() === p.id;
                 return (
                   <motion.div
                     key={p.id}
                     whileHover={{ scale: 1.02 }}
                     className={`p-6 rounded-3xl border-2 transition-all text-center ${isNext ? 'bg-brand-emerald border-brand-emerald text-white shadow-xl shadow-brand-emerald/20' : 'bg-slate-50 dark:bg-slate-800/50 border-slate-100 dark:border-slate-800 text-slate-600 dark:text-slate-300'}`}
                   >
                     <span className={`text-[10px] font-black uppercase tracking-widest block mb-2 ${isNext ? 'text-white/60' : 'text-slate-400 dark:text-slate-500'}`}>
                       {p.name}
                     </span>
                     <span className="text-xl font-black tracking-tight dark:text-white">
                       {formatTime(p.time)}
                     </span>
                     {isNext && (
                       <span className="block mt-2 text-[8px] font-black bg-white/20 px-2 py-1 rounded-full uppercase">
                         {language === 'ku' ? 'داهاتوو' : 'Next'}
                       </span>
                     )}
                   </motion.div>
                 );
              })}
            </div>
          </div>
        </>
      ) : (
        <motion.div 
          initial={{ opacity: 0, x: 20 }} 
          animate={{ opacity: 1, x: 0 }}
          className="space-y-6"
        >
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setActiveTab('times')}
              className="p-3 bg-white border border-slate-100 rounded-2xl text-slate-400 hover:text-brand-emerald transition-all shadow-sm"
            >
              <ChevronLeft size={20} />
            </button>
            <h2 className="text-2xl font-black text-slate-800">{t.qibla}</h2>
          </div>
          <div className="bg-white dark:bg-slate-900 p-4 rounded-[3rem] shadow-sm border border-slate-100 dark:border-slate-800">
            <QiblaFinder language={language} t={t} />
          </div>
        </motion.div>
      )}
    </div>
  );
}

