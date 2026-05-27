import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Stars, BookOpen, MessageSquare, Zap, Library, Compass, ChevronRight, ChevronLeft } from 'lucide-react';

interface SectionSliderProps {
  language: 'ku' | 'ar' | 'en';
  onNavigate: (view: any) => void;
}

export function SectionSlider({ language, onNavigate }: SectionSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const sections = [
    {
      id: 'sunnah-prayers',
      icon: <BookOpen className="text-amber-500" size={32} />,
      title: {
        ku: "نوێژی سونەت",
        ar: "السنن والرواتب",
        en: "Sunnah Prayers"
      },
      desc: {
        ku: "دەربارەی نوێژە سونەتەکان، فەزڵ و ژمارەی ڕکاتەکانیان فێرببە.",
        ar: "تعلم عن أنواع النوافل والرواتب اليومية وفضلها العظيم.",
        en: "Learn about the types of Sunnah prayers and their majestic virtues."
      },
      color: "from-amber-500/10 to-orange-500/10 border-amber-500/20 text-amber-600 dark:text-amber-400"
    },
    {
      id: 'zikrs',
      icon: <Stars className="text-orange-500" size={32} />,
      title: {
        ku: "زیکرەکان",
        ar: "الأذكار اليومية",
        en: "Daily Dhikrs"
      },
      desc: {
        ku: "زیکرەکانی بەیانیان، ئێواران و خەوتن بە هەنبانە و وەرگێڕانەوە بخوێنە.",
        ar: "حصن نفسك بأذكار الصباح والمساء والظروف اليومية المأثورة.",
        en: "Protect yourself with morning, evening and daily remembrance compilation."
      },
      color: "from-orange-500/10 to-rose-500/10 border-orange-500/20 text-orange-600 dark:text-orange-400"
    },
    {
      id: 'quran',
      icon: <BookOpen className="text-emerald-500" size={32} />,
      title: {
        ku: "قورئانی پیرۆز",
        ar: "القرآن الكريم",
        en: "The Holy Quran"
      },
      desc: {
        ku: "خوێندنەوەی سوورەتەکان بە تەفسیر و کۆمەڵێک دەنگی بەسۆزەوە.",
        ar: "افهم كتاب الله مع تفاسير ميسرة وتلاوات مباركة خاشعة.",
        en: "Deepen your connection with easy tafsir translation and calm recitations."
      },
      color: "from-emerald-500/10 to-teal-500/10 border-emerald-500/20 text-emerald-600 dark:text-emerald-400"
    },
    {
      id: 'stories',
      icon: <Library className="text-cyan-500" size={32} />,
      title: {
        ku: "چیرۆکی پێغەمبەران",
        ar: "قصص الأنبياء",
        en: "Stories of Prophets"
      },
      desc: {
        ku: "ئامۆژگاری و وانە بەنرخەکانی ژیانی پێغەمبەران بۆ خۆت و منداڵەکانت.",
        ar: "قصص ملهمة وعبر خالدة من حياة الأنبياء والأنبياء الكرام.",
        en: "Inspirational history and golden lessons from the lives of Allah's messengers."
      },
      color: "from-cyan-500/10 to-blue-500/10 border-cyan-500/20 text-cyan-600 dark:text-cyan-400"
    },
    {
      id: 'tasbih',
      icon: <Zap className="text-yellow-500" size={32} />,
      title: {
        ku: "تەزبیحی ئەلیکترۆنی",
        ar: "التسبيح والمسبحة",
        en: "Electronic Tasbih"
      },
      desc: {
        ku: "ژمارەکردنی زیکرەکانت بە شێوازێکی مۆدێرن و جوانی تەسبیح.",
        ar: "عداد تسبيح رائع ومطور لمساعدتك على الإكثار من الاستغفار.",
        en: "Digital tasbih counter crafted with a modern elegant layout to count dhikr."
      },
      color: "from-yellow-500/10 to-amber-500/10 border-yellow-500/20 text-brand-gold"
    },
    {
      id: 'hajj',
      icon: <Compass className="text-indigo-500" size={32} />,
      title: {
        ku: "حەج و عەمرە",
        ar: "الحج والعمرة",
        en: "Hajj & Umrah"
      },
      desc: {
        ku: "فێربوونی هەنگاو بە هەنگاوی مناسیکی حەج و دوعاکانی تەواف.",
        ar: "دليلك الواضح لأداء فريضة الحج والعمرة خطوة بخطوة بالدعاء والذكر.",
        en: "Your visual companion for Hajj and Umrah performance step-by-step with supplication."
      },
      color: "from-indigo-500/10 to-purple-500/10 border-indigo-500/20 text-indigo-600 dark:text-indigo-400"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % sections.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [sections.length]);

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + sections.length) % sections.length);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % sections.length);
  };

  const current = sections[currentIndex];

  return (
    <div className="w-full max-w-2xl mx-auto px-4" dir={language === 'en' ? 'ltr' : 'rtl'}>
      <div 
        onClick={() => onNavigate(current.id as any)}
        className={`bg-gradient-to-br ${current.color} p-6 rounded-[2.5rem] border backdrop-blur-md shadow-sm hover:shadow-md transition-all duration-300 relative overflow-hidden cursor-pointer group flex flex-col md:flex-row items-center justify-between gap-6 active:scale-[0.99]`}
      >
        {/* Subtle background glow effect */}
        <span className="absolute -right-20 -bottom-20 w-36 h-36 rounded-full bg-white/10 blur-2xl pointer-events-none transition-transform group-hover:scale-125" />

        <div className="flex items-center gap-5 flex-col md:flex-row text-center md:text-right">
          <div className="w-16 h-16 rounded-[1.5rem] bg-white dark:bg-slate-900/90 shadow-sm flex items-center justify-center shrink-0 border border-slate-100 dark:border-slate-800 transition-transform group-hover:scale-110">
            {current.icon}
          </div>
          <div className="space-y-1.5">
            <span className="text-[10px] uppercase font-black tracking-widest text-[#d97706] dark:text-brand-gold block">
              {language === 'ku' ? 'بەشکانی ئەپڵیکەیشن' : language === 'ar' ? 'أقسام التطبيق' : 'Featured Section'}
            </span>
            <h3 className="text-xl font-black text-slate-800 dark:text-white transition-colors group-hover:text-brand-emerald">
              {current.title[language] || current.title['en']}
            </h3>
            <p className="text-xs font-bold text-slate-500 dark:text-slate-400 max-w-md line-clamp-2">
              {current.desc[language] || current.desc['en']}
            </p>
          </div>
        </div>

        {/* Carousel controls & Action */}
        <div className="flex items-center gap-3 shrink-0">
          <button 
            type="button"
            onClick={handlePrev}
            className="w-10 h-10 rounded-full border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-center justify-center text-slate-500 hover:text-slate-800 dark:hover:text-white hover:bg-slate-50 transition-all active:scale-90"
          >
            <ChevronLeft size={16} />
          </button>
          
          <button 
            type="button"
            onClick={handleNext}
            className="w-10 h-10 rounded-full border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-center justify-center text-slate-500 hover:text-slate-800 dark:hover:text-white hover:bg-slate-50 transition-all active:scale-90"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      {/* Tiny slide dot indicators */}
      <div className="flex justify-center gap-1.5 mt-3">
        {sections.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`h-1.5 rounded-full transition-all duration-300 ${idx === currentIndex ? 'w-6 bg-brand-emerald' : 'w-1.5 bg-slate-200 dark:bg-slate-800'}`}
          />
        ))}
      </div>
    </div>
  );
}
