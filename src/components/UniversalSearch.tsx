import React, { useState, useEffect, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, X, BookOpen, Heart, Quote, Zap, Map, Clock, Stars, Library, Compass, MessageSquare, User, ShieldCheck, ChevronRight, Activity, CornerDownLeft, Sparkles } from 'lucide-react';
import { normalizeText } from '../lib/normalize';
import { surahs, Surah } from '../data/quran';
import { zikrs, Zikr } from '../data/zikrs';
import { namesOfAllah, AllahName } from '../data/namesOfAllah';
import { hadiths } from '../data/hadiths';

// Dynamic helper inside component to match text in standard normalize flow
function smartMatch(query: string, target: string): boolean {
  if (!query || !target) return false;
  const nQuery = normalizeText(query);
  const nTarget = normalizeText(target);
  return nTarget.includes(nQuery);
}

interface UniversalSearchProps {
  isOpen: boolean;
  onClose: () => void;
  language: 'ku' | 'ar' | 'en';
  onNavigate: (view: any, params?: any) => void;
}

const SECTIONS = [
  {
    id: 'home',
    title: { ku: 'ماڵەوە (سەرەکی)', ar: 'الرئيسية', en: 'Home Screen' },
    synonyms: ['malawa', 'saraki', 'home', 'main', 'phesheki', 'سەرەکی', 'ماڵەوە', 'الرئيسية', 'البداية'],
    icon: 'Home',
    description: { ku: 'سەرەکیترین بەشی ئەپلیکەیشنەکە', ar: 'الواجهة الرئيسية للتطبيق', en: 'The main dashboard of the app' }
  },
  {
    id: 'quran',
    title: { ku: 'قورئانی پیرۆز', ar: 'القرآن الكريم', en: 'Holy Quran' },
    synonyms: ['quran', 'quran reading', 'ayah', 'ayahs', 'surah', 'surahs', 'juz', 'kurdish quran', 'قورئان', 'ئایەت', 'سورەت', 'جوزء', 'القرآن', 'سورة', 'آية', 'تلاوة'],
    icon: 'BookOpen',
    description: { ku: 'خوێندنەوەی سورەت و ئایەتەکان لەگەڵ تەفسیر', ar: 'قراءة القرآن الكريم والترجمات والتفاسير', en: 'Read Surahs and Ayahs with multiple translation options' }
  },
  {
    id: 'hadith',
    title: { ku: 'فەرموودە دڵنشینەکان', ar: 'الأحاديث الشريفة', en: 'Hadiths' },
    synonyms: ['hadith', 'hadiths', 'bukhari', 'muslim', 'prophet hadith', 'فەرموودە', 'بوخاری', 'موسلیم', 'فەرموودەی پێغەمبەر', 'الحديث', 'الأحاديث', 'البخاري', 'مسلم', 'السنة'],
    icon: 'Heart',
    description: { ku: 'گەڕان بەناو وتە و ڕێنماییەکانی پێغەمبەری خودا (د.خ)', ar: 'مجموعة من الأحاديث النبوية الشريفة المصنّفة', en: 'Browse grouped collections of Prophet Muhammad\'s authentic Hadiths' }
  },
  {
    id: 'zikrs',
    title: { ku: 'زیکر و دوعاکان', ar: 'الأذكار والأدعية', en: 'Supplications & Adhkar' },
    synonyms: ['zikr', 'zikrs', 'adhkar', 'dua', 'supplication', 'morning zikr', 'evening zikr', 'زیکر', 'دوعا', 'پاراستن', 'زیکری بەیانیان', 'زیکری ئێواران', 'الذكر', 'الأذكار', 'الدعاء', 'أذكار الصباح', 'أذكار المساء'],
    icon: 'BookOpen',
    description: { ku: 'زیکر و دوعاکانی بەیانیان، ئێواران و دوای نوێژ', ar: 'أذكار الصباح والمساء وباقي المناسبات والأيام', en: 'Morning, evening, sleeping, and post-prayer authentic Adhkar' }
  },
  {
    id: 'kursi',
    title: { ku: 'ئایەتی کورسی', ar: 'آية الكرسي', en: 'Ayatul Kursi' },
    synonyms: ['ayatul kursi', 'kursi', 'greatest ayah', 'tafsir kursi', 'ئایەتی کورسی', 'کورسی', 'گەورەترین ئایەت', 'تەفسیری کورسی', 'آية الكرسي', 'الكرسي', 'أعظم آية'],
    icon: 'Quote',
    description: { ku: 'گەورەترین ئایەت لە قورئاندا لەگەڵ چەندین تەفسیری فراوان', ar: 'أعظم آية في القرآن الكريم مع تفاسير متعددة متعمقة', en: 'The greatest verse of the Quran with extensive scholarly Tafsirs' }
  },
  {
    id: 'tasbih',
    title: { ku: 'تەسبیحی ئەلیکترۆنی', ar: 'السبحة الإلكترونية', en: 'Tasbih Counter' },
    synonyms: ['tasbih', 'tasbih counter', 'subha', 'counter', 'dhikr counter', 'تەسبیح', 'تەسبیحات', 'ژمارکەری زیکر', 'السبحة', 'مسباح', 'عداد التسبيح', 'استغفار'],
    icon: 'Zap',
    description: { ku: 'ژمارەکردنی زیکر و تەسبیحات بە شێوازێکی بێدەنگ و ساکار', ar: 'عداد رقمي مرن للمسبحة والاستغفار بلمسة بصرية سهلة', en: 'An elegant digital counter for tracking your Tasbih and Istighfar' }
  },
  {
    id: 'hajj',
    title: { ku: 'ڕێبەری حەج و عومرە', ar: 'دليل الحج والعمرة', en: 'Hajj & Umrah Guide' },
    synonyms: ['hajj', 'umrah', 'makkah', 'madinah', 'ihram', 'tawaf', 'حەج', 'عومرە', 'مەککە', 'مەدینە', 'ئیحرام', 'تەواف', 'الحج', 'العمرة', 'مكة', 'المدينة', 'الإحرام', 'الطواف'],
    icon: 'Map',
    description: { ku: 'فێربوونی هەنگاو بە هەنگاوی مناسیکەکانی حەج و عومرە', ar: 'شرح تفصيلي خطوة بخطوة لشعائر الحج والعمرة بالتفصيل', en: 'Comprehensive step-by-step practical walk-through of Hajj and Umrah' }
  },
  {
    id: 'marriage',
    title: { ku: 'ڕێبەری هاوسەرگیری', ar: 'دليل الزواج الإسلامي', en: 'Islamic Marriage Guide' },
    synonyms: ['marriage', 'nikah', 'spouse', 'family', 'love', 'intimacy', 'halal relationship', 'هاوسەرگیری', 'سەرجێیی', 'خێزان', 'هاوسەر', 'خۆشەویستی', 'نیكاح', 'الزواج', 'النكاح', 'الأسرة', 'العلاقة الزوجية'],
    icon: 'Heart',
    description: { ku: 'ڕێنمایی شەرعی و تەندروستی بۆ خێزان و هاوسەران', ar: 'الآداب الشرعية والتوجيهات لبناء أسرة مسلمة سعيدة', en: 'Islamic guidelines and healthy advice for married couples and intimacy' }
  },
  {
    id: 'sabr',
    title: { ku: 'ئارامی و چارەسەری خەم و پەژارە', ar: 'أدعية الصبر والهم', en: 'Patience & Sabr' },
    synonyms: ['sabr', 'patience', 'distress', 'sadness', 'grief', 'depressed', 'ئارامی', 'صبر', 'سەبر', 'خەم', 'پەژارە', 'دڵتەنگی', 'چارەسەری دڵتەنگی', 'الصبر', 'الهم', 'الحزن', 'الضيق', 'تفريج الهم'],
    icon: 'ShieldCheck',
    description: { ku: 'دوعا و سوننەتەکان بۆ لابردنی دڵتەنگی، ترس و خەم', ar: 'محطة روحية في الصبر والتوكل وإزالة الهم والغضب', en: 'Spiritual remedies and invocations during times of hardship and sadness' }
  },
  {
    id: 'istikhara',
    title: { ku: 'نوێژ و دوعای ئیستیخارە', ar: 'دعاء وركوع الاستخارة', en: 'Istikhara Solution' },
    synonyms: ['istikhara', 'decision', 'guidance', 'istikhara prayer', 'ئیستیخارە', 'دوعای ئیستیخارە', 'نوێژی ئیستیخارە', 'الاستخارة', 'دعاء الاستخارة', 'صلاة الاستخارة'],
    icon: 'Compass',
    description: { ku: 'خوێندنەوەی دوعای ئیستیخارە و چۆنیەتی ئەنجامدانی', ar: 'شرح وتلقي نصوص الاستخارة النبوية لاتخاذ القرارات المصيرية', en: 'A detailed manual on how to pray and read the Prophet\'s Istikhara invocation' }
  },
  {
    id: 'chat',
    title: { ku: 'وەڵامدانەوەی زیرەک (Zikr AI)', ar: 'الدردشة الذكية العميقة', en: 'Zikr AI Chat' },
    synonyms: ['chat', 'conversations', 'ai', 'ai assistant', 'zikr ai', 'gemini', 'چات', 'پرسیار و وەڵام', 'زیرەکی دەستکرد', 'الدردشة', 'الذكاء الاصطناعي', 'مساعد ذكي', 'اسأل'],
    icon: 'MessageSquare',
    description: { ku: 'پرسیار بکە و وەڵام وەربگرە لەسەر بابەتەکانی شەریعەت', ar: 'تحدث مع الذكاء الاصطناعي حول شؤون العبادات والأدعية والقرآن', en: 'Interactively ask personal Islamic questions and get smart instant guidance' }
  },
  {
    id: 'profile',
    title: { ku: 'هەژما و هاوکاتی کلاود', ar: 'الملف الشخصي والمزامنة السحابية', en: 'Cloud Account Settings' },
    synonyms: ['profile', 'account', 'sync', 'cloud', 'backup', 'restore', 'email login', 'پڕۆfایل', 'پرۆفایل', 'هەژمار', 'کلاود', 'پاراستنی پێشکەوتن', 'چوونەژوورەوە', 'الحساب', 'المزامنة', 'السحاب', 'تسجيل الدخول', 'النسخ الاحتياطي'],
    icon: 'User',
    description: { ku: 'پاراستنی هەمیشەیی پێشکەوتنەکانت بە کلاود', ar: 'مزامنة داتا الأذكار، مستواك والنقاط بنسخة احتياطية آمنة', en: 'Manage cloud credentials, sign in, and guarantee persistent cloud backup' }
  },
  {
    id: 'stats',
    title: { ku: 'ئاماری بەرەوپێشچوونی ڕۆحی', ar: 'التقدم الروحي والإنجازات', en: 'Spiritual Level Progress' },
    synonyms: ['stats', 'progress', 'charts', 'level', 'xp', 'spirituality', 'ئامار', 'بەرەوپێشچوون', 'شیکار', 'ئاستی ڕۆحی', 'الإنجازات', 'مستواي', 'الإحصائيات', 'منحنى النشاط'],
    icon: 'Zap',
    description: { ku: 'شیکردنەوەی چالاکییەکانت بە درێژایی حەفتە', ar: 'تقدير تقدمك ونقاط الخبرة التي تكسبها من أورادك', en: 'Visual analytics representing your daily invocations, levels, and progress' }
  },
  {
    id: 'prayer-times',
    title: { ku: 'کاتەکانی نوێژ', ar: 'مواقيت الصلاة', en: 'Prayer Times' },
    synonyms: ['prayer times', 'salat times', 'azan', 'adhan', 'qiblah', 'qibla', 'fajr', 'dhuhr', 'asr', 'maghrib', 'isha', 'کاتی نوێژ', 'بانگ', 'فاول', 'قیبلە', 'مواقيت الصلاة', 'صلاة', 'الفجر', 'الظهر', 'العصر', 'المغرب', 'العشاء', 'القبلة'],
    icon: 'Clock',
    description: { ku: 'کاتەکانی نوێژ بەپێی شاری خۆت لەگەڵ قیبلەنما', ar: 'مواقيت الصلوات الخمس بدقة متناهية حسب موقعك والقبلة البصرية', en: 'Highly accurate prayer times based on localization, with smooth visual compass Qibla' }
  },
  {
    id: 'sunnah-prayers',
    title: { ku: 'نوێژە سوننەتەکان', ar: 'السنن الرواتب والمندوبات', en: 'Sunnah Prayers' },
    synonyms: ['sunnah prayers', 'sunnah', 'tahajjud', 'duha', 'wiatr', 'rowatib', 'نوێژی سوننەت', 'تەهەجود', 'نوێژی چێشتەنگاو', 'سوننەتە ڕواتبکان', 'سنن', 'صلاة الضحى', 'قيام الليل', 'الوتر', 'السنن الرواتب'],
    icon: 'BookOpen',
    description: { ku: 'زانیاری لەسەر نوێژە سوننەتە ڕواتبە و بەپێزەکان', ar: 'فهارس مخصصة لفضل وكيفية السنن المؤكدة وصلاة التطوع', en: 'A curated overview of optional Sunnah prayers, Nafilah, and Night vigil' }
  },
  {
    id: 'names',
    title: { ku: 'ناوە جوانەکانی خودا', ar: 'أسماء الله الحسنى', en: '99 Names of Allah' },
    synonyms: ['99 names', 'names of allah', 'allah names', 'asmaa allah', 'ناوەکانی خودا', 'ناوە جوانەکانی ئەڵڵا', 'ئەسماولحوسنا', 'أسماء الله الحسنى', 'الأسماء', 'صفات الله'],
    icon: 'Stars',
    description: { ku: 'ناوە پیرۆزەکانی خودا بە کوردی و ئینگلیزی و مانا گشتگیرەکەی', ar: '٩٩ اسماً لله عز وجل بشروح مبسطة للأسرار والبركات والآثار وعمقها', en: 'The 99 beautiful Names of Allah with transliteration, Kurdish, and English meanings' }
  },
  {
    id: 'stories',
    title: { ku: 'چیرۆکی پێغەمبەران و عیبرەتەکان', ar: 'قصص الأنبياء والعبر', en: 'Prophet Stories' },
    synonyms: ['stories', 'prophet stories', 'quranic stories', 'صحابە', 'چیرۆک', 'پێغەمبەران', 'مێژووی ئیسلام', 'چیرۆک لە قورئان', 'قصص الأنبياء', 'الأنبياء', 'العبر', 'الصحابة', 'قصة'],
    icon: 'Library',
    description: { ku: 'چیرۆکی سەرنجڕاکێشی قورئانی پڕ لە پەند و ئامۆژگاری بۆ ژیان', ar: 'مواقف خالدة وعبر منيرة من حياة الأنبياء والصالحين بأسلوب ممتع', en: 'Heart-warming stories of the Prophets and righteous predecessors filled with wisdom' }
  },
  {
    id: 'youth',
    title: { ku: 'ڕێنمایی و پاسەوانی گەنجان', ar: 'توجيهات فقهية وتربوية للشباب', en: 'Youth Protection Guide' },
    synonyms: ['youth', 'temptations', 'pornography', 'masturbation', 'abstinence', 'self-control', 'گەنج', 'ڕێنمایی بۆ گەنجان', 'پاراستنی چاو', 'ئاڕاستەکردنی حەزەکان', 'الشباب', 'غض البصرية', 'حفظ الفرج', 'الفتن', 'الابتعاد عن الفواحش'],
    icon: 'Quote',
    description: { ku: 'چۆنیەتی ڕووبەڕووبوونەوەی فیتنەی نوێ و پاراستنی پاک داوێنی', ar: 'توجيهات شرعية ونفسية عملية للشباب للوقاية من الشهوات والفتن ومجاهدة النفس', en: 'Practical Islamic and psychological advice for facing modern challenges and self-control' }
  }
];

export function UniversalSearch({ isOpen, onClose, language, onNavigate }: UniversalSearchProps) {
  const [query, setQuery] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const resultsContainerRef = useRef<HTMLDivElement>(null);

  // Auto focus input on open
  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setActiveIndex(0);
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [isOpen]);

  // Handle global escape key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  // Compute search results instantly
  const results = useMemo(() => {
    if (!query.trim()) return { sections: [], surahs: [], zikrs: [], names: [], hadiths: [], total: 0 };

    const q = query.trim();

    // 1. Filter Sections
    const matchedSections = SECTIONS.filter(sec => {
      // Direct synonym match
      const directSynonym = sec.synonyms.some(syn => {
        return smartMatch(q, syn);
      });
      // Language Title match
      const titleMatch = smartMatch(q, sec.title.ku) || smartMatch(q, sec.title.ar) || smartMatch(q, sec.title.en);
      // Language Description match
      const descMatch = smartMatch(q, sec.description.ku) || smartMatch(q, sec.description.ar) || smartMatch(q, sec.description.en);

      return directSynonym || titleMatch || descMatch;
    }).map(sec => ({
      ...sec,
      type: 'section',
      uniqueId: `sec-${sec.id}`
    }));

    // 2. Filter Quran Surahs
    const matchedSurahs = surahs.filter(surah => {
      const numberMatch = surah.number.toString() === q;
      const nameMatch = smartMatch(q, surah.name) || smartMatch(q, surah.englishName);
      const translMatch = surah.englishNameTranslation ? smartMatch(q, surah.englishNameTranslation) : false;
      return numberMatch || nameMatch || translMatch;
    }).slice(0, 5).map(surah => ({
      ...surah,
      type: 'surah',
      uniqueId: `surah-${surah.number}`
    }));

    // 3. Filter Adhkars (Zikrs)
    const matchedZikrs = zikrs.filter(zikr => {
      const textMatch = smartMatch(q, zikr.text) || 
                        smartMatch(q, zikr.translationKu) || 
                        smartMatch(q, zikr.translationEn) || 
                        (zikr.translationAr ? smartMatch(q, zikr.translationAr) : false);
      const categoryMatch = smartMatch(q, zikr.category);
      return textMatch || categoryMatch;
    }).slice(0, 6).map(zikr => ({
      ...zikr,
      type: 'zikr',
      uniqueId: `zikr-${zikr.id}`
    }));

    // 4. Filter Names of Allah
    const matchedNames = namesOfAllah.filter(name => {
      const arabicMatch = smartMatch(q, name.arabic);
      const translMatch = smartMatch(q, name.transliteration);
      const meaningMatch = smartMatch(q, name.kurdish) || smartMatch(q, name.meaning);
      return arabicMatch || translMatch || meaningMatch;
    }).slice(0, 5).map(name => ({
      ...name,
      type: 'nameOfAllah',
      uniqueId: `name-${name.id}`
    }));

    // 5. Filter Hadiths
    const matchedHadiths = hadiths.filter(hadith => {
      const topicMatch = smartMatch(q, hadith.topic);
      const textMatch = smartMatch(q, hadith.arabic) || 
                        smartMatch(q, hadith.kurdish) || 
                        (hadith.english ? smartMatch(q, hadith.english) : false) || 
                        (hadith.chapter ? smartMatch(q, hadith.chapter) : false);
      const sourceMatch = hadith.narrator ? smartMatch(q, hadith.narrator) : false;
      return topicMatch || textMatch || sourceMatch;
    }).slice(0, 5).map(hadith => ({
      ...hadith,
      type: 'hadith',
      uniqueId: `hadith-${hadith.id}`
    }));

    const totalCount = matchedSections.length + matchedSurahs.length + matchedZikrs.length + matchedNames.length + matchedHadiths.length;

    return {
      sections: matchedSections,
      surahs: matchedSurahs,
      zikrs: matchedZikrs,
      names: matchedNames,
      hadiths: matchedHadiths,
      total: totalCount
    };
  }, [query]);

  // Flattened results list to support arrow keyboard navigation
  const flatResults = useMemo(() => {
    return [
      ...results.sections,
      ...results.surahs,
      ...results.zikrs,
      ...results.names,
      ...results.hadiths
    ];
  }, [results]);

  // Reset activeIndex when results change
  useEffect(() => {
    setActiveIndex(0);
  }, [query]);

  // Scroll active item smoothly into view
  useEffect(() => {
    if (resultsContainerRef.current) {
      const activeEl = resultsContainerRef.current.querySelector('[data-active="true"]');
      if (activeEl) {
        activeEl.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
      }
    }
  }, [activeIndex]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (flatResults.length === 0) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex(prev => (prev + 1) % flatResults.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex(prev => (prev - 1 + flatResults.length) % flatResults.length);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      const activeItem = flatResults[activeIndex];
      if (activeItem) {
        triggerNavigation(activeItem);
      }
    }
  };

  const triggerNavigation = (item: any) => {
    if (item.type === 'section') {
      onNavigate(item.id);
    } else if (item.type === 'surah') {
      // Set view to quran and load that surah
      onNavigate('quran', { surah: item });
    } else if (item.type === 'zikr') {
      // Set view to zikrs and perhaps direct category
      onNavigate('zikrs', { zikrId: item.id, category: item.category });
    } else if (item.type === 'nameOfAllah') {
      onNavigate('names', { nameId: item.id });
    } else if (item.type === 'hadith') {
      onNavigate('hadith', { hadithId: item.id });
    }
    onClose();
  };

  // Safe UI Texts
  const uiTexts = {
    placeholder: {
      ku: 'بگەڕێ بۆ سورەت، ئایەت، زیکر، فەرموودە یان بەشێکی ئەپەکە...',
      ar: 'ابحث عن سورة، آية، ذكر، حديث أو اسم لله وميزة...',
      en: 'Search any Surah, Ayah, Dhikr, Hadith, Name or feature...'
    },
    noResults: {
      ku: 'هیچ ئەنجامێک نەدۆزرایەوە بۆ گەڕانەکەت. تکایە بە کیبۆردێکی تر تاقی بکەرەوە (کوردی، عەرەبی یان ئینگلیزی).',
      ar: 'لم يتم العثور على أي نتائج لبحثك. يرجى تجربة كتابة مصطلح آخر.',
      en: 'No results matched your search term. Try another query or keyboard language.'
    },
    hotkeys: {
      ku: 'بەکارهێنانی کلیلی سەر/خوارووی کیبۆرد بۆ دیاریکردن و Enter بۆ چوونە سەر لایەنی سەرەکی.',
      ar: 'استخدم أسهم الكيبورد للتنقل وزر Enter للدخول الفوري.',
      en: 'Use Up/Down keyboard keys to navigate results and Enter to select.'
    },
    sectionsTitle: { ku: 'بەشەکانی ئەپ (Synonyms / Features)', ar: 'مزايا وأقسام التطبيق', en: 'App Sections & Synonyms' },
    quranTitle: { ku: 'قورئانی پیرۆز (سووڕەتەکان)', ar: 'سور وآيات القرآن الكريم', en: 'Holy Quran (Surahs)' },
    zikrTitle: { ku: 'زیکر و دوعاکان', ar: 'الأذكار المأثورة', en: 'Authentic Adhkar' },
    namesTitle: { ku: 'ناوە جوانەکانی خودا', ar: 'أسماء الله الحسنى', en: '99 Names of Allah' },
    hadithTitle: { ku: 'فەرموودەکان', ar: 'الأحاديث الشريفة', en: 'Authentic Hadiths' },
    closeBtn: { ku: 'داخستن', ar: 'إغلاق', en: 'Close' },
    popularSearch: { ku: 'گەڕانە باوەکان:', ar: 'عمليات البحث الشائعة:', en: 'Popular searches:' }
  };

  const getSectionIcon = (iconName: string) => {
    switch (iconName) {
      case 'Home': return <Activity size={18} className="text-teal-500" />;
      case 'BookOpen': return <BookOpen size={18} className="text-emerald-500" />;
      case 'Heart': return <Heart size={18} className="text-rose-500" />;
      case 'Quote': return <Quote size={18} className="text-amber-500" />;
      case 'Zap': return <Zap size={18} className="text-brand-gold" />;
      case 'Map': return <Map size={18} className="text-indigo-400" />;
      case 'Clock': return <Clock size={18} className="text-sky-500" />;
      case 'Stars': return <Stars size={18} className="text-pink-500" />;
      case 'Library': return <Library size={18} className="text-violet-500" />;
      case 'Compass': return <Compass size={18} className="text-orange-500" />;
      case 'MessageSquare': return <MessageSquare size={18} className="text-indigo-500" />;
      case 'User': return <User size={18} className="text-slate-500" />;
      case 'ShieldCheck': return <ShieldCheck size={18} className="text-emerald-500" />;
      default: return <Activity size={18} className="text-brand-emerald" />;
    }
  };

  const popularKeywords = [
    { label: { ku: 'تەسبیح', ar: 'السبحة', en: 'Tasbih' }, query: 'tasbih' },
    { label: { ku: 'نوێژ', ar: 'مواقيت الصلاة', en: 'Prayer' }, query: 'prayer' },
    { label: { ku: 'زیکر', ar: 'الذكر', en: 'Zikr' }, query: 'zikr' },
    { label: { ku: 'کاتی نوێژ', ar: 'القبلة', en: 'Qibla' }, query: 'prayer-times' },
    { label: { ku: 'ناوەکانی خودا', ar: 'أسماء الله', en: '99 Names' }, query: 'names' },
    { label: { ku: 'هاوسەرگیری', ar: 'الزواج', en: 'Marriage' }, query: 'marriage' },
    { label: { ku: 'گەنجان', ar: 'الشباب', en: 'Youth' }, query: 'youth' },
    { label: { ku: 'ئیستیخارە', ar: 'الاستخارة', en: 'Istikhara' }, query: 'istikhara' }
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] overflow-y-auto" role="dialog" aria-modal="true">
          {/* Immersive Dark Glassmorphism Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-950/70 backdrop-blur-md transition-all"
          />

          {/* Centered Modal Container */}
          <div className="flex min-h-screen items-start justify-center p-4 sm:p-6 md:p-10 pt-16 sm:pt-28">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              transition={{ type: 'spring', duration: 0.4 }}
              className="relative w-full max-w-2xl bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-800 rounded-3xl shadow-2xl flex flex-col overflow-hidden max-h-[80vh]"
            >
              {/* Top Search Bar */}
              <div className="p-4 sm:p-5 border-b border-slate-100 dark:border-slate-850 flex items-center justify-between gap-4 sticky top-0 bg-white dark:bg-slate-900 z-10">
                <div className="relative flex-1">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500" size={18} />
                  <input
                    ref={inputRef}
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder={uiTexts.placeholder[language]}
                    className="w-full pl-12 pr-4 py-3 sm:py-3.5 bg-slate-50 dark:bg-slate-950 border border-slate-150 dark:border-slate-850 rounded-2xl text-sm font-black text-slate-800 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-emerald/20 focus:border-brand-emerald transition-all"
                    autoComplete="off"
                    autoCorrect="off"
                    spellCheck="false"
                  />
                  {query && (
                    <button
                      type="button"
                      onClick={() => setQuery('')}
                      className="absolute right-4 top-1/2 -translate-y-1/2 p-1.5 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-full transition-colors text-slate-400"
                    >
                      <X size={14} />
                    </button>
                  )}
                </div>

                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 font-extrabold text-xs rounded-xl text-slate-600 dark:text-slate-300 transition-colors"
                >
                  {uiTexts.closeBtn[language]}
                </button>
              </div>

              {/* Scrollable Results Area */}
              <div 
                ref={resultsContainerRef}
                className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 scrollbar-thin scrollbar-thumb-slate-200 dark:scrollbar-thumb-slate-800"
              >
                {!query.trim() ? (
                  /* Initial State: Popular quick searches */
                  <div className="space-y-4 py-4">
                    <div className="flex items-center gap-1.5 text-slate-400 dark:text-slate-500 font-black text-[11px] uppercase tracking-wider">
                      <Sparkles size={14} className="text-brand-gold animate-pulse" />
                      <span>{uiTexts.popularSearch[language]}</span>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                      {popularKeywords.map((kw, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => setQuery(kw.query)}
                          className="p-3 bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-850 hover:bg-brand-emerald/10 hover:border-brand-emerald/20 dark:hover:bg-brand-emerald/25 rounded-2xl text-xs font-black text-slate-700 dark:text-slate-300 text-center transition-all cursor-pointer hover:scale-[1.02]"
                        >
                          {kw.label[language]}
                        </button>
                      ))}
                    </div>
                  </div>
                ) : results.total === 0 ? (
                  /* No Results matched */
                  <div className="text-center py-12 px-6">
                    <div className="w-16 h-16 bg-slate-50 dark:bg-slate-950 rounded-full flex items-center justify-center mx-auto mb-4 border border-dashed border-slate-200 dark:border-slate-800 text-slate-400">
                      <Search size={22} />
                    </div>
                    <p className="text-xs font-black text-slate-700 dark:text-slate-300 max-w-md mx-auto leading-relaxed">
                      {uiTexts.noResults[language]}
                    </p>
                  </div>
                ) : (
                  /* Formatted Grouped Lists of Matches */
                  <div className="space-y-6">
                    {/* A. Sections Matches */}
                    {results.sections.length > 0 && (
                      <div className="space-y-2">
                        <span className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest block">
                          {uiTexts.sectionsTitle[language]}
                        </span>
                        <div className="space-y-1.5">
                          {results.sections.map((sec) => {
                            const isSelected = flatResults[activeIndex]?.uniqueId === sec.uniqueId;
                            return (
                              <div
                                key={sec.uniqueId}
                                data-active={isSelected}
                                onClick={() => triggerNavigation(sec)}
                                className={`p-3.5 rounded-2xl cursor-pointer transition-all flex items-center justify-between gap-3 ${
                                  isSelected 
                                    ? 'bg-slate-100 dark:bg-slate-800 ring-1 ring-brand-emerald/20 shadow-sm' 
                                    : 'hover:bg-slate-50 dark:hover:bg-slate-950 border border-transparent hover:border-slate-100 dark:hover:border-slate-850'
                                }`}
                              >
                                <div className="flex items-center gap-3">
                                  <div className="p-2 bg-white dark:bg-slate-900 rounded-xl border border-slate-100 dark:border-slate-800 shadow-sm">
                                    {getSectionIcon(sec.icon)}
                                  </div>
                                  <div>
                                    <span className="text-xs font-black text-slate-800 dark:text-white block">
                                      {sec.title[language]}
                                    </span>
                                    <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 block leading-tight pt-0.5">
                                      {sec.description[language]}
                                    </span>
                                  </div>
                                </div>
                                {isSelected && (
                                  <CornerDownLeft size={12} className="text-brand-emerald animate-pulse" />
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {/* B. Quran Surahs Matches */}
                    {results.surahs.length > 0 && (
                      <div className="space-y-2">
                        <span className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest block">
                          {uiTexts.quranTitle[language]}
                        </span>
                        <div className="space-y-1.5">
                          {results.surahs.map((surah) => {
                            const isSelected = flatResults[activeIndex]?.uniqueId === surah.uniqueId;
                            return (
                              <div
                                key={surah.uniqueId}
                                data-active={isSelected}
                                onClick={() => triggerNavigation(surah)}
                                className={`p-3.5 rounded-2xl cursor-pointer transition-all flex items-center justify-between gap-3 ${
                                  isSelected 
                                    ? 'bg-slate-100 dark:bg-slate-800 ring-1 ring-brand-emerald/20 shadow-sm' 
                                    : 'hover:bg-slate-50 dark:hover:bg-slate-950 border border-transparent hover:border-slate-100 dark:hover:border-slate-850'
                                }`}
                              >
                                <div className="flex items-center gap-3">
                                  <div className="w-8 h-8 rounded-xl bg-emerald-500/10 text-brand-emerald flex items-center justify-center text-xs font-black">
                                    {surah.number}
                                  </div>
                                  <div>
                                    <span className="text-xs font-black text-slate-800 dark:text-white block">
                                      {surah.englishName} ({surah.name})
                                    </span>
                                    <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 block">
                                      {surah.numberOfAyahs} ayahs • {surah.revelationType}
                                    </span>
                                  </div>
                                </div>
                                {isSelected && (
                                  <CornerDownLeft size={12} className="text-brand-emerald animate-pulse" />
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {/* C. Adhkar (Zikr) Matches */}
                    {results.zikrs.length > 0 && (
                      <div className="space-y-2">
                        <span className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest block">
                          {uiTexts.zikrTitle[language]}
                        </span>
                        <div className="space-y-1.5">
                          {results.zikrs.map((zk) => {
                            const isSelected = flatResults[activeIndex]?.uniqueId === zk.uniqueId;
                            return (
                              <div
                                key={zk.uniqueId}
                                data-active={isSelected}
                                onClick={() => triggerNavigation(zk)}
                                className={`p-3.5 rounded-2xl cursor-pointer transition-all flex items-center justify-between gap-3 ${
                                  isSelected 
                                    ? 'bg-slate-100 dark:bg-slate-800 ring-1 ring-brand-emerald/20 shadow-sm' 
                                    : 'hover:bg-slate-50 dark:hover:bg-slate-950 border border-transparent hover:border-slate-100 dark:hover:border-slate-850'
                                }`}
                              >
                                <div className="flex items-center gap-3">
                                  <div className="w-8 h-8 rounded-xl bg-teal-500/10 text-teal-500 flex items-center justify-center text-xs font-black">
                                    📿
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <span className="text-xs font-black text-slate-800 dark:text-white block truncate leading-tight">
                                      {language === 'en' ? zk.translationEn : zk.translationKu}
                                    </span>
                                    <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 block truncate leading-none mt-1">
                                      {zk.text}
                                    </span>
                                  </div>
                                </div>
                                {isSelected && (
                                  <CornerDownLeft size={12} className="text-brand-emerald animate-pulse" />
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {/* D. Names of Allah Matches */}
                    {results.names.length > 0 && (
                      <div className="space-y-2">
                        <span className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest block">
                          {uiTexts.namesTitle[language]}
                        </span>
                        <div className="space-y-1.5">
                          {results.names.map((nm) => {
                            const isSelected = flatResults[activeIndex]?.uniqueId === nm.uniqueId;
                            return (
                              <div
                                key={nm.uniqueId}
                                data-active={isSelected}
                                onClick={() => triggerNavigation(nm)}
                                className={`p-3.5 rounded-2xl cursor-pointer transition-all flex items-center justify-between gap-3 ${
                                  isSelected 
                                    ? 'bg-slate-100 dark:bg-slate-800 ring-1 ring-brand-emerald/20 shadow-sm' 
                                    : 'hover:bg-slate-50 dark:hover:bg-slate-950 border border-transparent hover:border-slate-100 dark:hover:border-slate-850'
                                }`}
                              >
                                <div className="flex items-center gap-3">
                                  <div className="w-8 h-8 rounded-xl bg-amber-500/10 text-brand-gold flex items-center justify-center text-xs font-black">
                                    ✨
                                  </div>
                                  <div>
                                    <span className="text-xs font-black text-slate-800 dark:text-white block">
                                      {nm.arabic} • {nm.transliteration}
                                    </span>
                                    <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 block">
                                      {nm.kurdish} • {nm.meaning}
                                    </span>
                                  </div>
                                </div>
                                {isSelected && (
                                  <CornerDownLeft size={12} className="text-brand-emerald animate-pulse" />
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {/* E. Hadith Matches */}
                    {results.hadiths.length > 0 && (
                      <div className="space-y-2">
                        <span className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest block">
                          {uiTexts.hadithTitle[language]}
                        </span>
                        <div className="space-y-1.5">
                          {results.hadiths.map((hd) => {
                            const isSelected = flatResults[activeIndex]?.uniqueId === hd.uniqueId;
                            return (
                              <div
                                key={hd.uniqueId}
                                data-active={isSelected}
                                onClick={() => triggerNavigation(hd)}
                                className={`p-3.5 rounded-2xl cursor-pointer transition-all flex items-center justify-between gap-3 ${
                                  isSelected 
                                    ? 'bg-slate-100 dark:bg-slate-800 ring-1 ring-brand-emerald/20 shadow-sm' 
                                    : 'hover:bg-slate-50 dark:hover:bg-slate-950 border border-transparent hover:border-slate-100 dark:hover:border-slate-850'
                                }`}
                              >
                                <div className="flex items-center gap-3">
                                  <div className="w-8 h-8 rounded-xl bg-rose-500/10 text-rose-500 flex items-center justify-center text-xs font-black">
                                    📖
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <span className="text-xs font-black text-slate-800 dark:text-white block">
                                      {hd.topic} ({hd.narrator})
                                    </span>
                                    <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 block truncate leading-none mt-1">
                                      {language === 'en' ? (hd.english || hd.kurdish) : (language === 'ar' ? hd.arabic : hd.kurdish)}
                                    </span>
                                  </div>
                                </div>
                                {isSelected && (
                                  <CornerDownLeft size={12} className="text-brand-emerald animate-pulse" />
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Bottom Hotkeys Helper (Desktop only) */}
              <div className="hidden sm:flex p-3 px-6 bg-slate-50 dark:bg-slate-950 border-t border-slate-100 dark:border-slate-850 justify-between items-center text-[10px] text-slate-400 font-bold">
                <span>{uiTexts.hotkeys[language]}</span>
                <span className="flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded shadow-sm text-[9px]">Esc</kbd> to close
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}
