import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Stars, BookOpen, MessageSquare, Share2, Copy, Heart, Calendar, Sparkles } from 'lucide-react';
import { zikrs } from '../data/zikrs';
import { hadiths } from '../data/hadiths';
import { sampleAyahs } from '../data/quran';

interface DailyRemindersProps {
  language: 'ku' | 'ar' | 'en';
  t: any;
  favoriteZikrsIds?: string[];
  favoriteSunnahIds?: string[];
  onToggleZikr?: (id: string) => void;
}

interface Inspiration {
  text: string;
  translationKu: string;
  translationEn: string;
  translationAr?: string;
  reference?: string;
  id?: string;
}

// Occasion-specific contents
const fridayContent = {
  id_zikr: "fav_fri_zikr",
  ayah: {
    text: "إِنَّ اللَّهَ وَمَلَائِكَتَهُ يُصَلُّونَ عَلَى النَّبِيِّ يَا أَيُّهَا الَّذِينَ آمَنُوا صَلُّوا عَلَيْهِ وَسَلِّمُوا تَسْلِيمًا",
    translationKu: "بەڕاستی خوا و فریشتەکانی صڵاوات دەنێرن بۆ سەر پێغەمبەر، ئەی ئەوانەی باوەڕتان هێناوە صڵاواتی لەسەر بنێرن و بەتەواوی سەلامی لێبکەن.",
    translationEn: "Indeed, Allah and His angels confer blessing upon the Prophet. O you who have believed, ask [Allah to confer] blessing upon him and ask for him peace.",
    reference: "سورة الأحزاب - ٥٦"
  },
  zikr: {
    text: "اللَّهُمَّ صَلِّ وَسَلِّـمْ عَلَى نَبِیِّنَا مُحَمَّدٍ وَعَلَى آلِهِ وَصَحْبِهِ أَجْمَعِينَ",
    translationKu: "خودایە صڵاوات و سەلام و بەرەکەت بڕێژە بەسەر پێشەوامان محمد و ئال و بەیت و هاوەڵە بەڕێزەکانی کۆی گشتیان.",
    translationEn: "O Allah, send prayers, peace and blessings upon our Prophet Muhammad, and upon his family and companions.",
    reference: "سورة الأحزاب - ٥٦"
  },
  hadith: {
    text: "أَكْثِرُوا الصَّلَاةَ عَلَيَّ يَوْمَ الْجُمُعَةِ وَلَيْلَةَ الْجُمُعَةِ فَمَنْ صَنَعَ ذَلِكَ كُنْتُ لَهُ شَهِيدًا وَشَفِيعًا يَوْمَ الْقِيَامَةِ",
    translationKu: "لە ڕۆژی هەینی و لە شەوی هەینیدا زۆر صڵاواتم بەسەردا بنێرن، چونکە هەرکەسێک وا بکات، لە ڕۆژی دواییدا من دەبمە شایەت و شەفاعەتکار بۆی.",
    translationEn: "Send many blessings upon me on Friday and the night before Friday, for whoever does so, I will be a witness and an intercessor for him on the Day of Resurrection.",
    reference: "البيهقي في الشعب"
  }
};

const ramadanContent = {
  id_zikr: "fav_ram_zikr",
  ayah: {
    text: "شَهْرُ رَمَضَانَ الَّذِي أُنْزِلَ فِيهِ الْقُرْآنُ هُدًى لِلنَّاسِ وَبَيِّنَاتٍ مِنَ الْهُدَى وَالْفُرْقَانِ فَمَنْ شَهِدَ مِنْكُمُ الشَّهْرَ فَلْيَصُمْهُ",
    translationKu: "مانگی ڕەمەزان ئەو مانگەیە کە قورئانی تێدا نێردراوەتە خوارەوە بۆ ڕێنمایی خەڵکی و بەڵگەی ڕوون بۆ هیدایەت و جیاکەرەوەی حەق و باطل؛ هەرکەسێک گەیشت بەو مانگە با بەڕۆژوو بێت.",
    translationEn: "The month of Ramadhan [is that] in which was revealed the Qur'an, a guidance for the people and clear proofs of guidance and criterion. So whoever sights the month, let him fast it.",
    reference: "سورەتی البقرة - ١٨٥"
  },
  zikr: {
    text: "اللَّهُمَّ إِنَّكَ عَفُوٌّ تُحِبُّ الْعَفْوَ فَاعْفُ عَنِّي",
    translationKu: "خودایە بەڕاستی تۆ یەکجار لێخۆشبووی و حەزت بە لێخۆشبوونە، دەی لە گوناهەکانم خۆشبە.",
    translationEn: "O Allah, You are Most Forgiving, and You love forgiveness, so forgive me.",
    reference: "شەونخونی شەوی قەدر"
  },
  hadith: {
    text: "مَنْ صَامَ رَمَضَانَ إِيمَانًا وَاحْتِسَابًا غُفِرَ لَهُ مَا تَقَدَّمَ مِنْ ذَنْبِهِ",
    translationKu: "هەرکەسێک بە بیروباوەڕی ڕاست و بە ئومێدی بەدەستهێنانی پاداشتی خوداوە مانگی ڕەمەزان بەڕۆژوو بێت، خودا لە هەموو گوناهەکانی ڕابردووی خۆشدەبێت.",
    translationEn: "Whoever fasts Ramadan out of faith and hoping for reward, his previous sins will be forgiven.",
    reference: "صحيح البخاري ومسلم"
  }
};

const arafahContent = {
  id_zikr: "fav_ara_zikr",
  ayah: {
    text: "الْيَوْمَ أَكْمَلْتُ لَكُمْ دِينَكُمْ وَأَتْمَمْتُ عَلَيْكُمْ نِعْمَتِي وَرَضِيتُ لَكُمُ الْإِسْلَامَ دِينًا",
    translationKu: "ئەمڕۆ ئایین و بەرنامەکەتانم بۆ کامڵ و تەواوکرد، و نیعمەتی خۆمم بەسەردا خستن، و ڕازی بووم کە ئیسلام ببێتە ئایین و ناسنامەتان.",
    translationEn: "This day I have perfected for you your religion and completed My favor upon you and have approved for you Islam as religion.",
    reference: "سورەتی المائدة - ٣"
  },
  zikr: {
    text: "لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ، وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ",
    translationKu: "هیچ پەرستراوێک نییە بەهەق جگە لە ئەڵڵا، تاق و تەنهایە و هاوبەشی نییە، پادشایەتی و فەرمانڕەوایی و ستایش هەر شایستەی ئەوە، و توانای بەسەر هەموو شتێکدا هەیە.",
    translationEn: "There is no god but Allah, alone without partner. His is the sovereignty, and His is the praise, and He has power over all things.",
    reference: "باشترین زیکری عارەفە"
  },
  hadith: {
    text: "خَيْرُ الدُّعَاءِ دُعَاءُ يَوْمِ عَرَفَةَ، وَخَيْرُ مَا قُلْتُ أَنَا وَالنَّبِيُّونَ مِنْ قَبْلِي: لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ",
    translationKu: "باشترین و بەپێزترین دوعا، دوعای ڕۆژی عارەفەیە، و باشترین شتێک کە من و پێغەمبەرانی پێش من گوتوومانە: لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ...",
    translationEn: "The best of supplication is the supplication of the Day of Arafah, and the best of what I and the Prophets before me have said is: There is no god but Allah, alone without partner...",
    reference: "سنن الترمذي"
  }
};

const eidContent = {
  id_zikr: "fav_eid_zikr",
  ayah: {
    text: "وَلِتُكْمِلُوا الْعِدَّةَ وَلِتُكَبِّرُوا اللَّهَ عَلَى مَا هَدَاكُمْ وَلَعَلَّكُمْ تَشْكُرُونَ",
    translationKu: "تاوەکوو ژمارەی ڕۆژەکانی ڕۆژوو تەواو بکەن، و یادی گەورەیی خودا بکەن بەهۆی ئەو هیدایەتەی پێی بەخشیون، بەڵکو خودای گەورە سوپاس بکەن.",
    translationEn: "And [Allah wants] for you to complete the period and to glorify Allah for that [to] which He has guided you; and perhaps you will be grateful.",
    reference: "سورەتی البقرة - ١٨٥"
  },
  zikr: {
    text: "اللَّهُ أَكْبَرُ اللَّهُ أَكْبَرُ لَا إِلَهَ إِلَّا اللَّهُ، اللَّهُ أَكْبَرُ اللَّهُ أَكْبَرُ وَلِلَّهِ الْحَمْدُ",
    translationKu: "خودا لە هەموو شتێک گەورەترە، خودا گەورەترینە، هیچ پەرستراوێک نییە بەهەق جگە لە خودا، خودا گەورەترینە و سوپاس و ستایش هەر بۆ ئەوە.",
    translationEn: "Allah is the greatest, Allah is the greatest, there is no god but Allah, Allah is the greatest, Allah is the greatest, and to Allah belongs all praise.",
    reference: "تەکبیراتی جەژن"
  },
  hadith: {
    text: "جَعَلَ اللَّهُ تَعَالَى الْفِطْرَ تَهْنِئَةً لِعِبَادِهِ مِنْ صِيَامِهِمْ، وَالْأَضْحَى تَهْنِئَةً لَهُمْ مِنْ نُسُكِهِمْ",
    translationKu: "خوای گەورە جەژنی ڕەمەزانی کردووە بە پیرۆزبایی و پاداشت بۆ ڕۆژووەکەیان، و جەژنی قوربانیشی بە پیرۆزبایی بۆ قوربانی و عیبادەتەکانیان.",
    translationEn: "Allah built Eid al-Fitr as a joy for His servants' fasting, and Eid al-Adha as a joy for their pilgrimage and devotion.",
    reference: "المصادر الإسلامية"
  }
};

const ashuraContent = {
  id_zikr: "fav_ash_zikr",
  ayah: {
    text: "وَجَاوَزْنَا بِبَنِي إِسْرَائِيلَ الْبَحْرَ فَأَتْبَعَهُمْ فِرْعَوْنُ وَجُنُودُهُ بَغْيًا وَعَدْوًا حَتَّى إِذَا أَدْرَكَهُ الْغَرَقُ قَالَ آمَنْتُ",
    translationKu: "و نەوەی ئیسرائیلمان لە دەریایەکە گەیاندە ئەوبەر، فیرعەون و لەشکرەکەی بە جەور و ستەمەوە دوای کەوتن هەتا غەرق بوون یەخەی پێگرت و وت باوەڕم هێنا.",
    translationEn: "And We took the Children of Israel across the sea, and Pharaoh and his soldiers pursued them in tyranny and enmity until, when drowning overtook him, he said, 'I believe...'",
    reference: "سورەتی یونس - ٩٠"
  },
  zikr: {
    text: "لَا إِلَهَ إِلَّا أَنْتَ سُبْحَانَكَ إِنِّي كُنْتُ مِنَ الظَّالِمِينَ",
    translationKu: "پەروەردگارم چاک دەزانم هیچ خوایەک نییە جگە لە تۆ، پاکی و بێگەردی شایستەی تۆیە، بەڕاستی من لە ستەمکاران بووم.",
    translationEn: "There is no deity except You; exalted are You. Indeed, I have been of the wrongdoers.",
    reference: "زیکری تەنگانە"
  },
  hadith: {
    text: "سُئِلَ عَنْ صَوْمِ يَوْمِ عَاشُورَاءَ فَقَالَ: يُكَفِّرُ السَّنَةَ الْمَاضِيَةَ",
    translationKu: "سەبارەت بە ڕۆژووگرتن لە ڕۆژی عاشورادا پرسیاری لێکرا، پێغەمبەری خودا فەرمووی: گوناهی ساڵی ڕابردوو دەسڕێتەوە.",
    translationEn: "Fasting the day of Ashura expiates the sins of the past year.",
    reference: "صحيح مسلم"
  }
};

export function DailyReminders({ 
  language, 
  t, 
  favoriteZikrsIds = [], 
  onToggleZikr 
}: DailyRemindersProps) {
  const [activeTab, setActiveTab] = useState<'ayah' | 'zikr' | 'hadith'>('ayah');
  const [copied, setCopied] = useState(false);

  // Flatten sampleAyahs for fallback
  const allAyahs = useMemo(() => {
    return Object.values(sampleAyahs).flat();
  }, []);

  // Detect current occasion using standardized Hijri and Gregorian logic
  const occasionInfo = useMemo(() => {
    const now = new Date();
    const dayOfWeek = now.getDay(); // 5 is Friday
    
    let hijriDay = 1;
    let hijriMonth = 1;
    try {
      const formatter = new Intl.DateTimeFormat('en-US-u-ca-islamic-umalqura', {
        day: 'numeric',
        month: 'numeric',
      });
      const parts = formatter.formatToParts(now);
      hijriDay = parseInt(parts.find(p => p.type === 'day')?.value || '1', 10);
      hijriMonth = parseInt(parts.find(p => p.type === 'month')?.value || '1', 10);
    } catch (e) {
      console.error("Failed to fetch Hijri details, fallback used:", e);
    }

    if (hijriMonth === 12 && hijriDay === 9) {
      return { id: 'arafah', nameAr: 'يوم عرفة', nameKu: 'ڕۆژی عارەفە', nameEn: 'Day of Arafah', content: arafahContent };
    }
    if (hijriMonth === 12 && hijriDay >= 10 && hijriDay <= 13) {
      return { id: 'eid_adha', nameAr: 'عيد الأضحى المبارك', nameKu: 'جەژنی قوربانی پیرۆز', nameEn: 'Eid al-Adha', content: eidContent };
    }
    if (hijriMonth === 10 && hijriDay === 1) {
      return { id: 'eid_fitr', nameAr: 'عيد الفطر السعيد', nameKu: 'جەژنی ڕەمەزانی پیرۆز', nameEn: 'Eid al-Fitr', content: eidContent };
    }
    if (hijriMonth === 9) {
      return { id: 'ramadan', nameAr: 'شهر رمضان المبارك', nameKu: 'مانگی پیرۆزی ڕەمەزان', nameEn: 'Holy Month of Ramadan', content: ramadanContent };
    }
    if (hijriMonth === 1 && (hijriDay === 9 || hijriDay === 10)) {
      return { id: 'ashura', nameAr: 'يوم عاشوراء', nameKu: 'ڕۆژانی تەسوعا و عاشورا', nameEn: 'Day of Ashura', content: ashuraContent };
    }
    if (dayOfWeek === 5) {
      return { id: 'friday', nameAr: 'يوم الجمعة المبارك', nameKu: 'شەو و ڕۆژی هەینی پیرۆز', nameEn: 'Friday (Jumuah)', content: fridayContent };
    }
    
    return { id: 'normal', nameAr: 'يوم عادي', nameKu: 'ڕۆژێکی نوێ', nameEn: 'Standard Day', content: null };
  }, []);

  // Calculate current item based on the current occasion, with calendar date fallback
  const currentItems = useMemo<Record<'ayah' | 'zikr' | 'hadith', Inspiration>>(() => {
    const dayOfYear = Math.floor((new Date().getTime() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000);
    
    if (occasionInfo.id !== 'normal' && occasionInfo.content) {
      const isZikrFavId = occasionInfo.content.id_zikr;
      return {
        ayah: { ...occasionInfo.content.ayah },
        hadith: { ...occasionInfo.content.hadith },
        zikr: { ...occasionInfo.content.zikr, id: isZikrFavId }
      };
    }

    // Dynamic rotation standard arrays
    const standardZikr = zikrs[dayOfYear % zikrs.length];
    const standardHadith = hadiths[dayOfYear % hadiths.length];
    const standardAyah = allAyahs[dayOfYear % allAyahs.length];

    // Build translation dynamically because standard hadiths/ayahs have custom structures
    let resolvedAyahTranslation = "";
    if (standardAyah) {
      if (typeof standardAyah.translation === 'string') {
        resolvedAyahTranslation = standardAyah.translation;
      } else {
        resolvedAyahTranslation = standardAyah.translation?.[language === 'ar' ? 'ku' : language] || standardAyah.translation?.ku || "";
      }
    }

    return {
      ayah: {
        text: standardAyah?.text || "",
        translationKu: resolvedAyahTranslation,
        translationEn: resolvedAyahTranslation,
        reference: standardAyah ? `${t.dailyAyah} [${standardAyah.number}]` : t.dailyAyah
      },
      hadith: {
        text: standardHadith?.arabic || "",
        translationKu: standardHadith?.kurdish || "",
        translationEn: standardHadith?.english || standardHadith?.kurdish || "",
        reference: standardHadith?.collection || ""
      },
      zikr: {
        text: standardZikr?.text || "",
        translationKu: standardZikr?.translationKu || "",
        translationEn: standardZikr?.translationEn || "",
        reference: t.dailyZikr,
        id: standardZikr?.id || ""
      }
    };
  }, [occasionInfo, allAyahs, language, t]);

  const activeContent = useMemo(() => {
    return currentItems[activeTab];
  }, [currentItems, activeTab]);

  const handleCopy = () => {
    const contentToCopy = `${activeContent.text}\n\n${language === 'en' ? activeContent.translationEn : activeContent.translationKu}\n(${activeContent.reference})`;
    navigator.clipboard.writeText(contentToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = () => {
    const shareTranslation = language === 'en' ? activeContent.translationEn : activeContent.translationKu;
    const event = new CustomEvent('trigger-share', {
      detail: { 
        text: activeContent.text, 
        translation: shareTranslation, 
        type: activeTab === 'ayah' ? 'ayah' : 'zikr' 
      }
    });
    window.dispatchEvent(event);
  };

  const isFavorited = useMemo(() => {
    if (activeTab !== 'zikr' || !activeContent.id) return false;
    return favoriteZikrsIds.includes(activeContent.id);
  }, [favoriteZikrsIds, activeContent, activeTab]);

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-6 md:p-8 rounded-[3rem] shadow-sm max-w-2xl mx-auto relative overflow-hidden">
      {/* Background radial soft pattern */}
      <div className="absolute top-0 right-0 w-48 h-48 bg-brand-emerald/5 dark:bg-brand-emerald/10 rounded-full -mr-24 -mt-24 pointer-events-none"></div>
      
      {/* Header - Occasion Badge */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-5 border-b border-slate-100/60 dark:border-slate-800/60 relative z-10">
        <div className="flex items-center gap-2.5">
          <div className="p-2 bg-brand-emerald/10 rounded-xl text-brand-emerald">
            <Calendar size={18} />
          </div>
          <div>
            <h3 className="text-sm font-black text-slate-800 dark:text-white">
              {language === 'ku' ? 'یادەوەری و یەقینی ئەمڕۆ' : language === 'ar' ? 'نفحات الإيمان والذكر' : "Today's Reminder & Guidance"}
            </h3>
            <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mt-0.5">
              {language === 'ku' ? 'بەپێی ڕۆژژمێری ئیسلامی' : language === 'ar' ? 'حسب التقويم الهجري' : 'Aligned with Islamic Calendar'}
            </p>
          </div>
        </div>

        {/* Dynamic Glowing Occasion Badge */}
        {occasionInfo.id !== 'normal' && (
          <motion.div 
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-brand-emerald/5 dark:bg-brand-emerald/15 text-brand-emerald dark:text-brand-gold border border-brand-emerald/15 dark:border-brand-emerald/30 rounded-full text-xs font-black shadow-sm"
          >
            <Sparkles size={12} className="animate-pulse" />
            <span>
              {language === 'ku' ? occasionInfo.nameKu : language === 'ar' ? occasionInfo.nameAr : occasionInfo.nameEn}
            </span>
          </motion.div>
        )}
      </div>

      {/* Selector Tabs (Exactly matching the gorgeous PrayerTimes tab look) */}
      <div className="grid grid-cols-3 bg-slate-50 dark:bg-slate-800/40 p-1.5 rounded-2xl mb-6 relative z-10">
        {[
          { id: 'ayah', label: language === 'ku' ? 'ئایەتی ڕۆژ' : language === 'ar' ? 'آية اليوم' : 'Daily Ayah', icon: <BookOpen size={14} /> },
          { id: 'zikr', label: language === 'ku' ? 'زیکری ڕۆژ' : language === 'ar' ? 'ذكر اليوم' : 'Daily Zikr', icon: <Stars size={14} /> },
          { id: 'hadith', label: language === 'ku' ? 'فەرموودە' : language === 'ar' ? 'الحديث' : 'Hadith', icon: <MessageSquare size={14} /> }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex items-center justify-center gap-2 py-3 rounded-xl text-xs font-black transition-all ${
              activeTab === tab.id 
                ? 'bg-brand-emerald text-white shadow-md shadow-brand-emerald/10' 
                : 'text-slate-400 dark:text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
            }`}
          >
            {tab.icon}
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Main Dynamic Content Display */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="min-h-[140px] flex flex-col justify-between py-2"
        >
          {/* Text block */}
          <div className="space-y-4 text-center">
            <h2 className="text-2xl font-black leading-relaxed text-slate-800 dark:text-slate-100 quran-font font-arabic" dir="rtl">
              {activeContent.text}
            </h2>
            
            {activeContent.translationKu && (
              <p className="text-sm font-bold text-slate-500 dark:text-slate-400 leading-relaxed max-w-xl mx-auto italic">
                {language === 'en' ? activeContent.translationEn : activeContent.translationKu}
              </p>
            )}

            {activeContent.reference && (
              <span className="inline-block text-[10px] font-black tracking-widest text-slate-300 dark:text-slate-600 uppercase bg-slate-50 dark:bg-slate-800/40 px-3 py-1 rounded-full">
                {activeContent.reference}
              </span>
            )}
          </div>

          {/* Quick Tools Tray */}
          <div className="flex items-center justify-between mt-8 pt-4 border-t border-slate-50 dark:border-slate-800/50">
            {/* Left aligned context actions */}
            <div className="flex gap-2">
              {activeTab === 'zikr' && onToggleZikr && activeContent.id && (
                <button
                  onClick={() => onToggleZikr(activeContent.id!)}
                  className={`p-2.5 rounded-xl border border-slate-100 dark:border-slate-800 transition-all cursor-pointer ${
                    isFavorited
                      ? 'bg-rose-50 dark:bg-rose-950/20 text-rose-500 border-rose-100 dark:border-rose-950/30'
                      : 'bg-slate-50/50 dark:bg-slate-800/40 text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300'
                  }`}
                  title={language === 'ku' ? 'زیادکردن بۆ دڵخوازەکان' : 'Add to Favorites'}
                >
                  <Heart size={16} className={isFavorited ? 'fill-rose-500' : ''} />
                </button>
              )}

              <button
                onClick={handleCopy}
                className="p-2.5 bg-slate-50/50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 text-slate-400 dark:text-slate-500 rounded-xl hover:text-slate-700 dark:hover:text-slate-300 transition-all flex items-center gap-1.5 cursor-pointer text-xs font-black relative"
              >
                <Copy size={15} />
                <span>{copied ? (language === 'ku' ? 'کۆپیکرا!' : 'Copied!') : (language === 'ku' ? 'کۆپی' : 'Copy')}</span>
              </button>
            </div>

            {/* Right Share Button */}
            <button
              onClick={handleShare}
              className="px-4 py-2.5 bg-brand-emerald text-white rounded-xl hover:bg-brand-emerald/90 transition-all flex items-center gap-2 text-xs font-black cursor-pointer shadow-sm"
            >
              <Share2 size={14} />
              <span>{language === 'ku' ? 'بڵاوکردنەوە' : language === 'ar' ? 'مشاركة' : 'Share'}</span>
            </button>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
