import { useMemo } from 'react';
import { motion } from 'motion/react';
import { zikrs } from '../data/zikrs';

export const ZikrMarquee = () => {
  const timeBasedZikrs = useMemo(() => {
    const hour = new Date().getHours();
    let category: 'morning' | 'evening' | 'night' = 'morning';
    
    if (hour >= 5 && hour < 12) category = 'morning';
    else if (hour >= 16 && hour < 20) category = 'evening';
    else if (hour >= 20 || hour < 5) category = 'night';
    else category = 'morning'; // Default

    const filtered = zikrs.filter(z => z.category === category || z.category === 'general');
    // Using a very large space and ornament for separation
    const separator = '            ۞            '; // Shorter but multiple
    return filtered.map(z => z.text).join(separator);
  }, []);

  return (
    <div className="w-full bg-brand-emerald text-brand-gold py-2 overflow-hidden border-b border-brand-gold/20 shadow-md relative z-40">
      <div className="flex w-max pause-on-hover">
        <div className="whitespace-nowrap flex items-center animate-marquee-rtl pr-[100px]">
          {Array.from({ length: 4 }).map((_, i) => (
            <span key={i} className="inline-block px-10 text-sm md:text-base font-bold tracking-wide">
              {timeBasedZikrs} <span className="mx-20 text-xl">۞</span>
            </span>
          ))}
        </div>
        <div className="whitespace-nowrap flex items-center animate-marquee-rtl pr-[100px]">
          {Array.from({ length: 4 }).map((_, i) => (
            <span key={i} className="inline-block px-10 text-sm md:text-base font-bold tracking-wide">
              {timeBasedZikrs} <span className="mx-20 text-xl">۞</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
