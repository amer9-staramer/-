
import { useState, useEffect } from 'react';
import { Compass, Loader2 } from 'lucide-react';
import { motion } from 'motion/react';

interface QiblaFinderProps {
  language: 'ku' | 'ar' | 'en';
  t: any;
}

export function QiblaFinder({ language, t }: QiblaFinderProps) {
  const [heading, setHeading] = useState<number | null>(null);
  const [qiblaDir, setQiblaDir] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Kaaba coordinates
    const kaabaLat = 21.4225;
    const kaabaLng = 39.8262;

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const lat = pos.coords.latitude;
          const lng = pos.coords.longitude;
          
          const y = Math.sin(Math.PI * (kaabaLng - lng) / 180);
          const x = Math.cos(Math.PI * lat / 180) * Math.tan(Math.PI * kaabaLat / 180) - 
                    Math.sin(Math.PI * lat / 180) * Math.cos(Math.PI * (kaabaLng - lng) / 180);
          
          let qibla = Math.atan2(y, x) * 180 / Math.PI;
          qibla = (qibla + 360) % 360;
          setQiblaDir(qibla);
        },
        (err) => setError(err.message)
      );
    } else {
      setError("Geolocation not supported");
    }

    const handler = (e: any) => {
      if (e.webkitCompassHeading !== undefined) {
        setHeading(e.webkitCompassHeading);
      } else if (e.alpha !== null) {
        setHeading(360 - e.alpha);
      }
    };

    window.addEventListener('deviceorientation', handler, true);
    return () => window.removeEventListener('deviceorientation', handler);
  }, []);

  if (error) {
    return (
      <div className="bg-rose-50 p-8 rounded-[3rem] border border-rose-100 text-center">
        <p className="text-rose-600 font-bold">{error}</p>
        <p className="text-xs text-rose-400 mt-2">تکایە دڵنیابەرەوە لە هەبوونی دەستپێگەیشتن بە شوێن (GPS)</p>
      </div>
    );
  }

  if (qiblaDir === null) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="animate-spin text-brand-emerald" size={32} />
      </div>
    );
  }

  const rotation = heading !== null ? qiblaDir - heading : qiblaDir;

  return (
    <div className="flex flex-col items-center space-y-12 py-10">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-black text-brand-emerald">{t.qibla}</h2>
        <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">Distance to Kaaba: ~{2000}km</p>
      </div>

      <div className="relative w-80 h-80 rounded-full border-8 border-slate-100 bg-white shadow-2xl flex items-center justify-center">
        {/* Compass Dial */}
        <motion.div 
          animate={{ rotate: - (heading || 0) }}
          className="absolute inset-0 p-4 transition-transform duration-500"
        >
          <div className="w-full h-full rounded-full border-2 border-slate-50 relative">
             <div className="absolute top-2 left-1/2 -translate-x-1/2 font-black text-rose-500 text-lg">N</div>
             <div className="absolute bottom-2 left-1/2 -translate-x-1/2 font-black text-slate-300 text-lg">S</div>
             <div className="absolute right-2 top-1/2 -translate-y-1/2 font-black text-slate-300 text-lg">E</div>
             <div className="absolute left-2 top-1/2 -translate-y-1/2 font-black text-slate-300 text-lg">W</div>
          </div>
        </motion.div>

        {/* Qibla Needle */}
        <motion.div 
          animate={{ rotate: rotation }}
          className="relative z-10 w-64 h-64 flex items-center justify-center"
        >
           <div className="w-2 h-full flex flex-col items-center justify-between">
              <div className="w-0 h-0 border-l-[15px] border-l-transparent border-r-[15px] border-r-transparent border-b-[40px] border-b-brand-emerald filter drop-shadow-lg shadow-brand-emerald/50"></div>
              <div className="w-4 h-4 bg-slate-200 rounded-full"></div>
              <div className="w-4 h-6 bg-slate-100 rounded-full opacity-20"></div>
           </div>
           
           <div className="absolute top-0 flex flex-col items-center">
              <div className="w-12 h-12 bg-white rounded-2xl shadow-lg border border-slate-100 flex items-center justify-center text-brand-emerald mb-2">
                 <Compass size={24} />
              </div>
              <span className="text-[10px] font-black text-brand-emerald uppercase tracking-widest">مەککە</span>
           </div>
        </motion.div>

        {/* Center Pivot */}
        <div className="absolute w-10 h-10 bg-white rounded-full shadow-lg border-4 border-slate-50 z-20"></div>
      </div>

      <div className="max-w-md w-full bg-brand-emerald/5 p-6 rounded-[2rem] border border-brand-emerald/20 text-center">
        <p className="text-sm font-bold text-brand-emerald leading-relaxed">
          {language === 'ku' ? 'مۆبایلەکەت بە ڕێکی دابنێ بۆ ئەوەی ئاراستەی قیبلە بە وردی نیشان بدرێت.' : language === 'ar' ? 'ضع هاتفك بشكل مستوٍ للحصول على أدق قراءة للقبلة.' : 'Keep your phone flat for the most accurate Qibla reading.'}
        </p>
      </div>
    </div>
  );
}
