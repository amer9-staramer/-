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
    // Using a large space for better separation as requested
    const separator = '                                        •                                        ';
    return filtered.map(z => z.text).join(separator);
  }, []);

  return (
    <div className="w-full bg-brand-emerald text-brand-gold py-2 overflow-hidden border-b border-brand-gold/20 shadow-md relative z-40">
      <div className="flex w-max">
        <motion.div 
          className="whitespace-nowrap flex items-center"
          animate={{ x: ["-100%", "0%"] }}
          transition={{ 
            repeat: Infinity, 
            duration: 100, 
            ease: "linear" 
          }}
        >
          {Array.from({ length: 10 }).map((_, i) => (
            <span key={i} className="inline-block px-10 text-sm md:text-base font-bold tracking-wide">
              {timeBasedZikrs} •
            </span>
          ))}
        </motion.div>
        <motion.div 
          className="whitespace-nowrap flex items-center"
          animate={{ x: ["-100%", "0%"] }}
          transition={{ 
            repeat: Infinity, 
            duration: 100, 
            ease: "linear" 
          }}
        >
          {Array.from({ length: 10 }).map((_, i) => (
            <span key={i} className="inline-block px-10 text-sm md:text-base font-bold tracking-wide">
              {timeBasedZikrs} •
            </span>
          ))}
        </motion.div>
      </div>
    </div>
  );
};
