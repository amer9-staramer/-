import { useState, useEffect, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import ReactMarkdown from 'react-markdown';
import { GoogleGenAI } from "@google/genai";
import { Sun, Moon, Sunrise, Stars, Clock, MessageSquare, Menu, X, User, Home, BookOpen, Quote, ChevronLeft, ChevronRight, Heart, Map, Plane, Compass, Languages, Loader2, MapPin, Shirt, Library, Filter, Search, Zap, BarChart, ShieldCheck, Lock, Globe, Grid2X2, Droplets, Utensils, CloudRain, Smile, Frown, ShoppingBag, Users, Coffee, Bell, Trash2, Ghost, Trophy, Send, QrCode } from 'lucide-react';
import { zikrs, Zikr } from './data/zikrs';
import { hadiths } from './data/hadiths';
import { namesOfAllah } from './data/namesOfAllah';
import { patienceWisdom } from './data/patience';
import { loveWisdom } from './data/love';
import { normalizeText } from './lib/normalize';
import { Tasbih } from './components/Tasbih';
import { NamesOfAllah } from './components/NamesOfAllah';
import { PrayerTimes } from './components/PrayerTimes';
import { umrahSteps, hajjStepsExtended, hajjVirtues, umrahVirtues, commonHajjMistakes, tawafDhikrs } from './data/hajj';
import { sacredPlaces, ihramSteps, arafahTasks, haditCollectionsData, hadithTopicsData, miqatsData, ihramClothingData } from './data/hub';
import { marriageSteps, MarriageStep } from './data/marriage';
import { intimacyGuideData } from './data/intimacy';
import { fetchHadithsByBook, HadithGlobal } from './services/hadithService';
import { translations } from './data/translations';
import { surahs, sampleAyahs, Surah, Ayah } from './data/quran';
import { ZikrMarquee } from './components/ZikrMarquee';
import { ZikrCard } from './components/ZikrCard';
import { Stories } from './components/Stories';
import { DailyCard } from './components/DailyCard';
import { youthGuidance } from './data/youthGuidance';
import { useUserStats } from './hooks/useUserStats';
import { onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { doc, getDoc, collection, onSnapshot } from 'firebase/firestore';
import { auth, db } from './lib/firebase';
import { QuranReader } from './components/QuranReader';
import { AIChat } from './components/AIChat';
import { AdminPortal } from './components/AdminPortal';
import { Stats } from './components/Stats';

type Category = 'morning' | 'evening' | 'night' | 'general' | 'travel' | 'rizq' | 'all' | 'prayer' | 'debt' | 'honesty' | 'knowledge' | 'character' | 'parents' | 'patience' | 'love_halal' | 'work' | 'marriage' | 'children' | 'hospitality' | 'wudu' | 'fasting' | 'zakat_sadaqah' | 'hajj_umrah' | 'repentance' | 'dua_supplication' | 'mercy_kindness' | 'brotherhood' | 'neighbor' | 'cleanliness' | 'age_time' | 'lying' | 'envy' | 'forgiveness' | 'tawakkul' | 'quran_reading' | 'greeting' | 'orphan' | 'anger' | 'loyalty' | 'tongue' | 'good_deeds' | 'hereafter' | 'judgment' | 'hijab' | 'food' | 'sleep' | 'healing' | 'building' | 'simplicity' | 'backbiting' | 'justice' | 'bravery' | 'trust' | 'unity' | 'gratitude' | 'prophet_hadith' | 'duha' | 'after_prayer' | 'distress' | 'illness' | 'mosque' | 'clothing' | 'home' | 'ablution' | 'eating' | 'rain' | 'thunder' | 'mirror' | 'sneezing' | 'hardship' | 'market' | 'gathering' | 'waking_up' | 'adhan' | 'toilet' | 'grief';
type View = 'home' | 'zikrs' | 'kursi' | 'hadith' | 'hajj' | 'quran' | 'marriage' | 'tasbih' | 'names' | 'settings' | 'prayer-times' | 'stories' | 'stats' | 'post-of-day' | 'sabr' | 'chat' | 'youth' | 'progress' | 'admin-portal' | 'about' | 'istikhara';
type Language = 'ku' | 'en' | 'ar';
type TafsirType = 'asan' | 'ibnkathir' | 'tabari' | 'zamakhshari';
type HajjType = 'hajj' | 'umrah';
type HajjTab = 'steps' | 'mistakes' | 'virtues' | 'tawaf' | 'miqats';
type QuranEdition = 'ku.asan' | 'ar.muyassar' | 'ar.jalalayn' | 'ar.saadi' | 'ar.ibnkathir' | 'ar.baghawi' | 'ar.qurtubi' | 'ar.tabari' | 'ar.wasit' | 'ar.shaarawi' | 'ar.qutb' | 'en.sahih';

const HADITH_TOPICS = [
  { id: 'All', key: 'all' },
  { id: 'General', key: 'general' },
  { id: 'Prayer', key: 'prayer' },
  { id: 'Debt', key: 'debt' },
  { id: 'Honesty', key: 'honesty' },
  { id: 'Knowledge', key: 'knowledge' },
  { id: 'Character', key: 'character' },
  { id: 'Parents', key: 'parents' },
  { id: 'Patience', key: 'patience' },
  { id: 'Love', key: 'love_halal' },
  { id: 'Work', key: 'work' },
  { id: 'Marriage', key: 'marriage' },
  { id: 'Children', key: 'children' },
  { id: 'Hospitality', key: 'hospitality' },
  { id: 'Wudu', key: 'wudu' },
  { id: 'Fasting', key: 'fasting' },
  { id: 'Zakat', key: 'zakat_sadaqah' },
  { id: 'Hajj', key: 'hajj_umrah' },
  { id: 'Repentance', key: 'repentance' },
  { id: 'Dua', key: 'dua_supplication' },
  { id: 'Mercy', key: 'mercy' },
  { id: 'Brotherhood', key: 'brotherhood' },
  { id: 'Neighbor', key: 'neighbor' },
  { id: 'Cleanliness', key: 'cleanliness' },
  { id: 'Time', key: 'age_time' },
  { id: 'Lying', key: 'lying' },
  { id: 'Envy', key: 'envy' },
  { id: 'Forgiveness', key: 'forgiveness' },
  { id: 'Tawakkul', key: 'tawakkul' },
  { id: 'Quran', key: 'quran_reading' },
  { id: 'Greeting', key: 'greeting' },
  { id: 'Orphan', key: 'orphan' },
  { id: 'Anger', key: 'anger' },
  { id: 'Loyalty', key: 'loyalty' },
  { id: 'Tongue', key: 'tongue' },
  { id: 'GoodDeeds', key: 'good_deeds' },
  { id: 'Hereafter', key: 'hereafter' },
  { id: 'Judgment', key: 'judgment' },
  { id: 'Hijab', key: 'hijab' },
  { id: 'Food', key: 'food' },
  { id: 'Sleep', key: 'sleep' },
  { id: 'Travel', key: 'travel' },
  { id: 'Healing', key: 'healing' },
  { id: 'Building', key: 'building' },
  { id: 'Simplicity', key: 'simplicity' },
  { id: 'Backbiting', key: 'backbiting' },
  { id: 'Justice', key: 'justice' },
  { id: 'Bravery', key: 'bravery' },
  { id: 'Trust', key: 'trust' },
  { id: 'Unity', key: 'unity' },
  { id: 'Gratitude', key: 'gratitude' },
  { id: 'Prophet', key: 'prophet_hadith' },
];

const kursiTafsirs: Record<TafsirType, Record<Language, { name: string, label: string, text: string }>> = {
  asan: {
    ku: {
      name: 'ئاسان',
      label: 'سەردەمیانە',
      text: 'خوا زاتێکه هیج پەرستراوێک نییه شایستەی پەرستن بێت تەنها ئەو نەبێت، کە هەمیشه زیندووە و سەرپەرشتیاری هەموو دروستکراوەکانی دەکات، نه خەو دەیگرێت و نه وەنەوز، هەرچی له ئاسمانەکان و هەرچی له زەویدایه هەر ئەو خاوەنیانه...'
    },
    ar: {
      name: 'آسان',
      label: 'معاصر',
      text: 'الله لا إله إلا هو، الحي الذي لا يموت، والقيوم الذي يقوم بشؤون خلقه، لا تأخذه سنة ولا نوم، له ما في السماوات وما في الأرض...'
    },
    en: {
      name: 'Asan',
      label: 'Modern',
      text: 'Allah - there is no deity except Him, the Ever-Living, the Sustainer of all existence. Neither drowsiness overtakes Him nor sleep. To Him belongs whatever is in the heavens and whatever is on the earth...'
    }
  },
  ibnkathir: {
    ku: {
      name: 'ئیبن کەسیر',
      label: 'فەرموودە',
      text: 'ئەم ئایەتە گەورەترین ئایەتی قورئانە. "الحي القيوم" واتا ئەو زاتەی بەردەوام زیندووە و هەرگیز نامرێت، و هەڵدەستێت بە بەڕێوەبردن و پاراستنی هەموو دروستکراوەکانی...'
    },
    ar: {
      name: 'ابن كثير',
      label: 'فەرموودە',
      text: 'هذه آية الكرسي ولها شأن عظيم، "الحي القيوم" أي: الحي في نفسه الذي لا يموت أبدا، القيوم لغيره، القائم بمصالح خلقه ومدبر شؤونهم.'
    },
    en: {
      name: 'Ibn Kathir',
      label: 'Hadith',
      text: 'This is Ayatul Kursi, the greatest verse in the Quran. "The Ever-Living, the Sustainer" means He who never dies and He who manages and sustains all creation.'
    }
  },
  tabari: {
    ku: {
      name: 'تەبەری',
      label: 'گشتگیر',
      text: 'واتای "الله لا إله إلا هو" ئەوەیە کە تەنها خودا شایستەی پەرستنە نەک بت و هاوشێوەکانی. ئەو زاتەیە کە سەرپەرشتیاری کاروباری هەموو جیهان دەکات بەبێ ئەوەی ماندوو بێت یان خەو بیگرێت...'
    },
    ar: {
      name: 'الطبري',
      label: 'گشتگیر',
      text: 'القول في تأويل قوله تعالى: الله لا إله إلا هو، أخبر الله عباده أن الألوهية له خالصة دون غيره من الأنداد، وهو القائم بمصالح خلقه.'
    },
    en: {
      name: 'Al-Tabari',
      label: 'Comprehensive',
      text: 'The interpretation of "There is no deity except Him" is that God is the only one worthy of worship, excluding all idols. He is the sustainer of His creation.'
    }
  },
  zamakhshari: {
    ku: {
      name: 'زەمەخ شەری',
      label: 'ڕەوانبێژی',
      text: 'لە ڕووی زمانەبانییەوە، پێشخستنی "سنة" (وەنەوز) بەسەر "نوم" (خەو)دا بۆ جوانی و وردی ڕەوانبێژییە، چونکە وەنەوز پێش خەو دێت و خودا لە هەمووی بەدوورە...'
     },
    ar: {
      name: 'الزمخشري',
      label: 'ڕەوانبێژی',
      text: 'قوله تعالى: "لا تأخذه سنة ولا نوم" في تقديم نفي السنة على النوم مبالغة بلاغية دقيقة، لأن السنة تسبق النوم في الطبيعة، فنفاهما الله عنه تنزيهاً.'
    },
    en: {
      name: 'Zamakhshari',
      label: 'Linguistics',
      text: 'Linguistically, placing "drowsiness" before "sleep" is a precise rhetorical flourish, as drowsiness naturally precedes sleep. Allah negates both from Himself.'
    }
  }
};

export default function App() {
  const [language, setLanguage] = useState<Language>('ku');
  const t = translations[language];

  const { stats, addPoints, incrementTasbih, completeZikr, completeAyah, currentLevelInfo, nextLevelInfo, sendFeedback } = useUserStats();
  const [isAdmin, setIsAdmin] = useState(false);
  
  const [feedbackName, setFeedbackName] = useState('');
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [isSendingFeedback, setIsSendingFeedback] = useState(false);
  const [feedbackSent, setFeedbackSent] = useState(false);
  
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (u) => {
      if (u) {
        // Full admin access for specific email OR firestore admin record
        if (u.email === 'adolamer9@gmail.com') {
          setIsAdmin(true);
        } else {
          try {
            const adminDoc = await getDoc(doc(db, 'admins', u.uid));
            setIsAdmin(adminDoc.exists());
          } catch (err) {
            console.error("Error verifying admin status:", err);
            setIsAdmin(false);
          }
        }
      } else {
        setIsAdmin(false);
      }
    });
    return () => unsub();
  }, []);

  const [notificationsEnabled, setNotificationsEnabled] = useState(() => {
    const saved = localStorage.getItem('notificationsEnabled');
    return saved === 'true';
  });

  // Smart Notifications logic
  useEffect(() => {
    const checkNotifications = () => {
      if (!notificationsEnabled) return;
      
      const now = new Date();
      const hour = now.getHours();
      const mins = now.getMinutes();
      const day = now.getDay(); // 5 is Friday

      // Morning Zikr reminder (around 6:00 AM)
      if (hour === 6 && mins === 0) {
        showLocalNotification((t as any).morningZikrReminder || 'Morning Zikr Time', (t as any).morningZikrReminderBody || 'Illuminate your day with remembrance.');
      }

      // Evening Zikr reminder (around 5:00 PM)
      if (hour === 17 && mins === 0) {
        showLocalNotification((t as any).eveningZikrReminder || 'Evening Zikr Time', (t as any).eveningZikrReminderBody || 'Protect yourself with evening remembrance.');
      }

      // Friday Blessing reminder
      if (day === 5 && hour === 9 && mins === 0) {
        showLocalNotification((t as any).fridayReminder || 'Jumuah Mubarak', (t as any).fridayReminderBody || 'Don\'t forget to read Surah Al-Kahf.');
      }

      // Bedtime reminder
      if (hour === 22 && mins === 30) {
        showLocalNotification((t as any).nightReminder || 'Night Remembrance', (t as any).nightReminderBody || 'Read the protection verses before sleep.');
      }
    };

    const showLocalNotification = (title: string, body: string) => {
      if ('Notification' in window && Notification.permission === 'granted') {
        new Notification(title, { body, icon: '/favicon.ico' });
      }
      // Also show in-app toast for demo/fallback
      console.log(`Notification: ${title} - ${body}`);
    };

    const interval = setInterval(checkNotifications, 60000); // Check every minute
    return () => clearInterval(interval);
  }, [notificationsEnabled, t]);

  const requestNotificationPermission = async () => {
    if ('Notification' in window) {
      const permission = await Notification.requestPermission();
      if (permission === 'granted') {
        setNotificationsEnabled(true);
        localStorage.setItem('notificationsEnabled', 'true');
      }
    }
  };

  const [activeCategory, setActiveCategory] = useState<Category>('all');
  const [isHadithDropdownOpen, setIsHadithDropdownOpen] = useState(false);
  const [isAdhkarDropdownOpen, setIsAdhkarDropdownOpen] = useState(false);
  const [fetchedHadiths, setFetchedHadiths] = useState<HadithGlobal[]>([]);
  const [isLoadingHadiths, setIsLoadingHadiths] = useState(false);
  const [hadithError, setHadithError] = useState<string | null>(null);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [currentView, setCurrentView] = useState<View>('home');
  const [sabrFilter, setSabrFilter] = useState<'all' | 'ayah' | 'hadith' | 'story' | 'companion' | 'quote'>('all');
  const [activeTafsir, setActiveTafsir] = useState<TafsirType>('asan');
  const [hajjType, setHajjType] = useState<HajjType>('umrah');
  const [quranSearch, setQuranSearch] = useState('');
  const [selectedSurah, setSelectedSurah] = useState<Surah | null>(null);

  const [ayahs, setAyahs] = useState<Ayah[]>([]);
  const [hajjTab, setHajjTab] = useState<HajjTab>('steps');
  const [quranViewMode, setQuranViewMode] = useState<'reading' | 'tafsir'>('reading');
  
  // Flatten sampleAyahs for easier lookup
  const allAyahs = useMemo(() => {
    return Object.values(sampleAyahs).flat();
  }, []);

  const [globalFontSize, setGlobalFontSize] = useState(16);
  const [themeMode, setThemeMode] = useState<'light' | 'dark'>(() => {
    const saved = localStorage.getItem('themeMode');
    if (saved === 'dark' || saved === 'light') return saved;
    const hour = new Date().getHours();
    return (hour >= 19 || hour < 6) ? 'dark' : 'light';
  });

  useEffect(() => {
    localStorage.setItem('themeMode', themeMode);
    if (themeMode === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [themeMode]);

  const [selectedMarriageCategory, setSelectedMarriageCategory] = useState<MarriageStep['category'] | 'all'>('all');
  const [ihramStep, setIhramStep] = useState(0);
  const [intimacyStep, setIntimacyStep] = useState(0);
  // Navigation state for Hajj/Umrah Hub
  const [activeHajjSubView, setActiveHajjSubView] = useState<'menu' | 'steps' | 'places' | 'ihram' | 'miqats' | 'mistakes' | 'dhikr' | 'planner'>('menu');
  const [activeMarriageSubView, setActiveMarriageSubView] = useState<'menu' | 'content' | 'love'>('menu');
  const [selectedHadithCollection, setSelectedHadithCollection] = useState<'Bukhari' | 'Muslim' | 'Sahih Ibn Khuzaymah' | 'Sahih Ibn Hibban'| 'Sunan Abi Dawud' | 'Sunan al-Tirmidhi' | 'Sunan al-Nasa\'i' | 'Sunan Ibn Majah' | 'Sunan al-Darimi' | 'Sunan al-Daraqutni'>('Bukhari');

  // ... previous states
  const fetchRemoteHadiths = useCallback(async () => {
    setIsLoadingHadiths(true);
    setHadithError(null);
    try {
      const data = await fetchHadithsByBook(selectedHadithCollection);
      setFetchedHadiths(data);
    } catch (error: any) {
      console.error("Hadith fetch error:", error);
      setHadithError(error.message || "Failed to load hadiths");
    } finally {
      setIsLoadingHadiths(false);
    }
  }, [selectedHadithCollection]);

  useEffect(() => {
    fetchRemoteHadiths();
  }, [fetchRemoteHadiths]);

  const displayedHadiths = useMemo(() => {
    const local = hadiths.filter(h => h.collection === selectedHadithCollection);
    if (local.length > 0) return local.map((h, index) => ({
      id: h.id,
      arabicText: h.arabic,
      englishText: h.english || '',
      kurdishText: h.kurdish,
      chapterName: h.chapter,
      narrator: h.narrator,
      hadithNumber: (index + 1),
      book: h.collection
    }));
    return fetchedHadiths.map((h, index) => ({
      ...h,
      hadithNumber: (index + 1)
    }));
  }, [selectedHadithCollection, fetchedHadiths]);
  const [isAgeVerified, setIsAgeVerified] = useState<boolean>(() => {
    return localStorage.getItem('isAgeVerified') === 'true';
  });
  const [showAgeError, setShowAgeError] = useState(false);
  const [ageInput, setAgeInput] = useState('');

  const verifyAge = () => {
    const age = parseInt(ageInput);
    if (!isNaN(age) && age >= 16) {
      setIsAgeVerified(true);
      localStorage.setItem('isAgeVerified', 'true');
      setShowAgeError(false);
    } else {
      setShowAgeError(true);
    }
  };

  // New Quran states
  const [surahAyahCache, setSurahAyahCache] = useState<Record<number, Ayah[]>>({});
  const [isFetchingAyahs, setIsFetchingAyahs] = useState(false);

  const [quranEdition, setQuranEdition] = useState<QuranEdition>('ku.asan');
  const [translatedTafsirs, setTranslatedTafsirs] = useState<Record<string, string>>({});
  const [isTranslating, setIsTranslating] = useState<number | null>(null);
  const [isLoadingQuran, setIsLoadingQuran] = useState(false);
  const [adhkarSearchQuery, setAdhkarSearchQuery] = useState('');
  const [globalFontFamily, setGlobalFontFamily] = useState<'sans' | 'mono' | 'serif'>('sans');
  const [tawafRound, setTawafRound] = useState(1);

  // Fetch Ayahs for a surah
  const fetchSurahAyahs = async (surahNumber: number) => {
    setIsFetchingAyahs(true);
    try {
      const response = await fetch(`https://api.alquran.cloud/v1/surah/${surahNumber}/editions/quran-uthmani,${quranEdition}`);
      const data = await response.json();
      if (data.code === 200 && Array.isArray(data.data)) {
        const arabicEdition = data.data.find((e: any) => e.edition.identifier === 'quran-uthmani') || data.data[0];
        const translationEdition = data.data.find((e: any) => e.edition.identifier !== 'quran-uthmani') || data.data[1];

        const mergedAyahs = arabicEdition.ayahs.map((ayah: any, idx: number) => ({
          ...ayah,
          translation: translationEdition?.ayahs[idx]?.text || ''
        }));

        const baseSurah = surahs.find(s => s.number === surahNumber);
        if (baseSurah) {
          setSelectedSurah({ ...baseSurah, ayahs: mergedAyahs });
        }
        setAyahs(mergedAyahs);
        setCurrentView('quran');
      }
    } catch (error) {
      console.error('Error fetching ayahs:', error);
    } finally {
      setIsFetchingAyahs(false);
    }
  };

  const requestNotifications = requestNotificationPermission;
  const [selectedMiqat, setSelectedMiqat] = useState<string | null>(null);
  const [plannerTasks, setPlannerTasks] = useState<number[]>([]);

  const toggleTask = (id: number) => {
    setPlannerTasks(prev => prev.includes(id) ? prev.filter(t => t !== id) : [...prev, id]);
  };
  const [bookmark, setBookmark] = useState<{ surahNumber: number, ayahNumber: number, surahName: string } | null>(() => {
    const saved = localStorage.getItem('quranBookmark');
    return saved ? JSON.parse(saved) : null;
  });

  const toggleBookmark = (surahNumber: number, ayahNumber: number, surahName: string) => {
    if (bookmark?.surahNumber === surahNumber && bookmark?.ayahNumber === ayahNumber) {
      setBookmark(null);
      localStorage.removeItem('quranBookmark');
    } else {
      const newBookmark = { surahNumber, ayahNumber, surahName };
      setBookmark(newBookmark);
      localStorage.setItem('quranBookmark', JSON.stringify(newBookmark));
    }
  };

  useEffect(() => {
    if (quranViewMode === 'tafsir' && quranEdition.startsWith('ar.') && language !== 'ar') {
      ayahs.forEach(ayah => {
        const textToTranslate = typeof ayah.translation === 'string' ? ayah.translation : '';
        if (textToTranslate && !translatedTafsirs[`${ayah.number}-${quranEdition}`]) {
          handleTranslateTafsir(ayah.number, textToTranslate);
        }
      });
    }
  }, [ayahs, quranEdition, language, quranViewMode]);

  const handleTranslateTafsir = async (ayahNumber: number, originalText: string) => {
    if (translatedTafsirs[`${ayahNumber}-${quranEdition}`]) return;
    
    setIsTranslating(ayahNumber);
    try {
      const response = await fetch('/api/translate-tafsir', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: originalText })
      });
      
      if (!response.ok) throw new Error('Translation failed');
      
      const data = await response.json();
      const translation = data.translatedText;
      
      setTranslatedTafsirs(prev => ({
        ...prev,
        [`${ayahNumber}-${quranEdition}`]: translation
      }));
    } catch (error) {
      console.error('Translation error:', error);
    } finally {
      setIsTranslating(null);
    }
  };

  useEffect(() => {
    if (selectedSurah) {
      const fetchAyahs = async () => {
        setIsLoadingQuran(true);
        try {
          const [arRes, edRes] = await Promise.all([
            fetch(`https://api.alquran.cloud/v1/surah/${selectedSurah.number}/quran-uthmani`),
            fetch(`https://api.alquran.cloud/v1/surah/${selectedSurah.number}/${quranEdition}`)
          ]);

          const arData = await arRes.json();
          const edData = await edRes.json();

          const combinedAyahs = arData.data.ayahs.map((a: any, idx: number) => ({
            number: a.numberInSurah,
            text: a.text,
            juz: a.juz,
            page: a.page,
            hizbQuarter: a.hizbQuarter,
            translation: edData.data.ayahs[idx].text,
          }));

          setAyahs(combinedAyahs);
        } catch (error) {
          console.error('Error fetching Quran:', error);
        } finally {
          setIsLoadingQuran(false);
        }
      };
      fetchAyahs();
    }
  }, [selectedSurah, quranEdition]);

  useEffect(() => {
    // Sync quranEdition with language preferred default if it's the first selection
    if (language === 'ku') setQuranEdition('ku.asan');
    else if (language === 'en') setQuranEdition('en.sahih');
    else if (language === 'ar') setQuranEdition('ar.muyassar');
  }, [language]);

  useEffect(() => {
    // Route detection for admin portal
    if (window.location.pathname === '/admin-portal') {
      setCurrentView('admin-portal');
    }
    
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (selectedSurah && ayahs.length > 0 && bookmark?.surahNumber === selectedSurah.number) {
      setTimeout(() => {
        const element = document.getElementById(`ayah-${bookmark.ayahNumber}`);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 500);
    }
  }, [selectedSurah, ayahs.length, bookmark]);

  const filteredZikrs = useMemo(() => {
    let result = zikrs;
    if (activeCategory !== 'all') {
      result = result.filter(z => z.category === activeCategory);
    }
    if (adhkarSearchQuery.trim()) {
      const q = normalizeText(adhkarSearchQuery);
      result = result.filter(z => 
        normalizeText(z.text).includes(q) || 
        normalizeText(z.translationKu).includes(q) || 
        normalizeText(z.translationEn).includes(q)
      );
    }
    return result;
  }, [activeCategory, adhkarSearchQuery]);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const categories = [
    { id: 'morning', label: t.morning, icon: <Sunrise size={16} /> },
    { id: 'evening', label: t.evening, icon: <Moon size={16} /> },
    { id: 'night', label: t.night, icon: <Stars size={16} /> },
    { id: 'waking_up', label: (t as any).waking_up || 'Waking Up', icon: <Coffee size={16} /> },
    { id: 'adhan', label: (t as any).adhan || 'Adhan', icon: <Bell size={16} /> },
    { id: 'after_prayer', label: (t as any).after_prayer || 'After Prayer', icon: <Clock size={16} /> },
    { id: 'mosque', label: (t as any).mosque || 'Mosque', icon: <Library size={16} /> },
    { id: 'ablution', label: (t as any).ablution || 'Ablution', icon: <Droplets size={16} /> },
    { id: 'toilet', label: (t as any).toilet || 'Toilet', icon: <Trash2 size={16} /> },
    { id: 'travel', label: (t as any).travel, icon: <Plane size={16} /> },
    { id: 'eating', label: (t as any).eating || 'Eating', icon: <Utensils size={16} /> },
    { id: 'distress', label: (t as any).distress, icon: <Heart size={16} /> },
    { id: 'grief', label: (t as any).grief || 'Grief', icon: <Frown size={16} /> },
    { id: 'illness', label: (t as any).illness, icon: <ShieldCheck size={16} /> },
    { id: 'hardship', label: (t as any).hardship || 'Hardship', icon: <Zap size={16} /> },
    { id: 'rain', label: (t as any).rain || 'Rain', icon: <CloudRain size={16} /> },
    { id: 'thunder', label: (t as any).thunder || 'Thunder', icon: <Ghost size={16} /> },
    { id: 'mirror', label: (t as any).mirror || 'Mirror', icon: <User size={16} /> },
    { id: 'sneezing', label: (t as any).sneezing || 'Sneezing', icon: <Smile size={16} /> },
    { id: 'market', label: (t as any).market || 'Market', icon: <ShoppingBag size={16} /> },
    { id: 'gathering', label: (t as any).gathering || 'Gathering', icon: <Users size={16} /> },
    { id: 'clothing', label: (t as any).clothing || 'Clothing', icon: <Shirt size={16} /> },
    { id: 'anger', label: (t as any).anger || 'Anger', icon: <ShieldCheck size={16} /> },
    { id: 'home', label: (t as any).home || 'Home', icon: <Home size={16} /> },
    { id: 'general', label: t.general, icon: <Clock size={16} /> },
  ];

  const Sidebar = () => (
    <>
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={toggleSidebar}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[60]"
          />
        )}
      </AnimatePresence>
      <motion.div
        initial={{ x: '100%', opacity: 0 }}
        animate={{ x: isSidebarOpen ? '0%' : '100%', opacity: isSidebarOpen ? 1 : 0 }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className={`fixed right-0 top-0 bottom-0 w-80 bg-white dark:bg-slate-900 z-[70] shadow-2xl overflow-y-auto border-l border-slate-100 dark:border-slate-800 ${isSidebarOpen ? 'visible' : 'invisible'}`}
      >
          <div className="p-6 bg-brand-emerald text-white flex justify-between items-center shadow-lg border-b border-white/10">
            <h2 className="text-2xl font-black">{t.appName}</h2>
            <button onClick={toggleSidebar} className="p-2 hover:bg-white/10 rounded-full transition-colors text-white/80">
              <X size={24} />
            </button>
          </div>

          <nav className="p-4 space-y-2 mt-4">
          <SidebarLink 
            icon={<Home size={20} />} 
            label={t.homeNav} 
            active={currentView === 'home'} 
            onClick={() => { setCurrentView('home'); setIsSidebarOpen(false); }} 
          />

          <SidebarLink 
            icon={<BookOpen size={20} />} 
            label={t.quran} 
            active={currentView === 'quran'} 
            onClick={() => { setCurrentView('quran'); setIsSidebarOpen(false); setSelectedSurah(null); }} 
          />

          <SidebarLink 
            icon={<Heart size={20} />} 
            label={t.hadith} 
            active={currentView === 'hadith'} 
            onClick={() => { setCurrentView('hadith'); setIsSidebarOpen(false); }} 
          />

          <SidebarLink 
            icon={<BookOpen size={20} />} 
            label={t.zikrs} 
            active={currentView === 'zikrs'} 
            onClick={() => { 
              setCurrentView('zikrs'); 
              setActiveCategory('all'); 
              setIsSidebarOpen(false); 
            }} 
          />

          <SidebarLink 
            icon={<Quote size={20} />} 
            label={t.kursi} 
            active={currentView === 'kursi'} 
            onClick={() => { setCurrentView('kursi'); setIsSidebarOpen(false); }} 
          />

          <SidebarLink 
            icon={<Zap size={20} />} 
            label={t.tasbih} 
            active={currentView === 'tasbih'} 
            onClick={() => { setCurrentView('tasbih'); setIsSidebarOpen(false); }} 
          />

          <SidebarLink 
            icon={<Map size={20} />} 
            label={t.hajj} 
            active={currentView === 'hajj'} 
            onClick={() => { setCurrentView('hajj'); setIsSidebarOpen(false); }} 
          />

          <SidebarLink 
            icon={<Heart size={20} className="text-pink-500" />} 
            label={t.marriage} 
            active={currentView === 'marriage'} 
            onClick={() => { setCurrentView('marriage'); setIsSidebarOpen(false); }} 
          />

          <SidebarLink 
            icon={<ShieldCheck size={20} className="text-indigo-500" />} 
            label={t.sabr} 
            active={currentView === 'sabr'} 
            onClick={() => { setCurrentView('sabr'); setIsSidebarOpen(false); }} 
          />

          <SidebarLink 
            icon={<Compass size={20} className="text-brand-emerald" />} 
            label={t.istikhara} 
            active={currentView === 'istikhara'} 
            onClick={() => { setCurrentView('istikhara'); setIsSidebarOpen(false); }} 
          />

          <SidebarLink 
            icon={<MessageSquare size={20} className="text-brand-emerald" />} 
            label={t.aiChat || 'Zikr AI'} 
            active={currentView === 'chat'} 
            onClick={() => { setCurrentView('chat'); setIsSidebarOpen(false); }} 
          />

          <div className="pt-4 pb-2">
            <p className="text-[10px] uppercase tracking-widest text-slate-400 font-bold px-3 mb-2">{t.more}</p>
            
            <SidebarLink 
              icon={<Zap size={20} className="text-brand-gold" />} 
              label={t.progress || 'My Progress'} 
              active={currentView === 'stats'} 
              onClick={() => { setCurrentView('stats'); setIsSidebarOpen(false); }} 
            />

            <SidebarLink 
              icon={<Clock size={20} />} 
              label={t.prayerTimes} 
              active={currentView === 'prayer-times'} 
              onClick={() => { setCurrentView('prayer-times'); setIsSidebarOpen(false); }} 
            />

            <SidebarLink 
              icon={<Stars size={20} />} 
              label={t.namesOfAllah} 
              active={currentView === 'names'} 
              onClick={() => { setCurrentView('names'); setIsSidebarOpen(false); }} 
            />

            <SidebarLink 
              icon={<Library size={20} className="text-brand-emerald" />} 
              label={t.stories} 
              active={currentView === 'stories'} 
              onClick={() => { setCurrentView('stories'); setIsSidebarOpen(false); }} 
            />

            <SidebarLink 
              icon={<Quote size={20} className="text-indigo-400" />} 
              label={t.youthGuidance || 'Youth Guide'} 
              active={currentView === 'youth'} 
              onClick={() => { setCurrentView('youth'); setIsSidebarOpen(false); }} 
            />

            <SidebarLink 
              icon={<BarChart size={20} className="text-indigo-400" />} 
              label={t.stats} 
              active={currentView === 'stats'} 
              onClick={() => { setCurrentView('stats'); setIsSidebarOpen(false); }} 
            />

            {isAdmin && (
              <SidebarLink 
                icon={<ShieldCheck size={20} className="text-brand-emerald" />} 
                label="Admin Portal" 
                active={currentView === 'admin-portal'} 
                onClick={() => { setCurrentView('admin-portal'); setIsSidebarOpen(false); }} 
              />
            )}

            <SidebarLink 
              icon={<Menu size={20} className="text-slate-400" />} 
              label={t.settings} 
              active={currentView === 'settings'} 
              onClick={() => { setCurrentView('settings'); setIsSidebarOpen(false); }} 
            />

            <SidebarLink 
              icon={<Stars size={20} className="text-slate-400" />} 
              label={(t as any).about} 
              active={currentView === 'about'} 
              onClick={() => { setCurrentView('about'); setIsSidebarOpen(false); }} 
            />
          </div>

          <div className="pt-4">
            <p className="text-[10px] uppercase tracking-widest text-slate-400 font-bold px-3 mb-2">{t.language}</p>
            <div className="flex gap-2 px-2">
              <button 
                onClick={() => setLanguage('ku')}
                className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${language === 'ku' ? 'bg-brand-emerald text-white' : 'bg-slate-100 text-slate-500'}`}
              >کوردی</button>
              <button 
                onClick={() => setLanguage('ar')}
                className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${language === 'ar' ? 'bg-brand-emerald text-white' : 'bg-slate-100 text-slate-500'}`}
              >العربية</button>
              <button 
                onClick={() => setLanguage('en')}
                className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${language === 'en' ? 'bg-brand-emerald text-white' : 'bg-slate-100 text-slate-500'}`}
              >English</button>
            </div>
          </div>
        </nav>
      </motion.div>
    </>
  );

  const zikrOfDay = useMemo(() => {
    const day = new Date().getDate();
    return zikrs[day % zikrs.length];
  }, []);

  const timeContext = useMemo(() => {
    const hour = currentTime.getHours();
    if (hour >= 5 && hour < 11) return { id: 'morning', label: t.morning, icon: <Sunrise className="text-brand-gold" /> };
    if (hour >= 11 && hour < 16) return { id: 'general', label: t.dhuhr, icon: <Sun className="text-amber-500" /> };
    if (hour >= 16 && hour < 19) return { id: 'evening', label: t.evening, icon: <Sun className="text-orange-500" /> };
    return { id: 'night', label: t.night, icon: <Moon className="text-indigo-400" /> };
  }, [currentTime, language]);

  const seasonalAdhkars = useMemo(() => {
    return zikrs.filter(z => z.category === timeContext.id || z.category === 'general').slice(0, 3);
  }, [timeContext]);

  const seasonalHadith = useMemo(() => {
    return hadiths.find(h => h.topic === 'Character' || h.topic === 'General');
  }, []);

  const seasonalWisdom = useMemo(() => {
    const allWisdom = [...patienceWisdom, ...loveWisdom];
    return allWisdom[new Date().getDate() % allWisdom.length];
  }, []);

  const [aboutEmail, setAboutEmail] = useState('');
  const [aboutPassword, setAboutPassword] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [showLoginForm, setShowLoginForm] = useState(false);

  const handleAboutLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggingIn(true);
    setLoginError('');
    try {
      const userCredential = await signInWithEmailAndPassword(auth, aboutEmail, aboutPassword);
      if (userCredential.user.email === 'adolamer9@gmail.com') {
        setCurrentView('admin-portal');
        setShowLoginForm(false);
        setAboutEmail('');
        setAboutPassword('');
      } else {
        setLoginError('This account does not have admin privileges.');
      }
    } catch (err: any) {
      setLoginError(err.message || 'Login failed');
    } finally {
      setIsLoggingIn(false);
    }
  };

  if (isAdmin) {
    return (
      <AdminPortal 
        language={language}
        onBack={() => {
          setIsAdmin(false);
          signOut(auth);
          setCurrentView('home');
        }} 
      />
    );
  }

  return (
    <div className={`min-h-screen flex flex-col ${themeMode === 'dark' ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'} font-${globalFontFamily} transition-colors duration-500 overflow-x-hidden`} style={{ fontSize: `${globalFontSize}px` }}>
      <Sidebar />
      <ZikrMarquee />

      <header className="px-6 py-4 bg-white dark:bg-slate-900 shadow-sm border-b border-slate-100 dark:border-slate-800 sticky top-0 z-30">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <button 
            onClick={toggleSidebar}
            className="p-2.5 bg-brand-emerald text-white rounded-xl shadow-md hover:scale-105 active:scale-95 transition-all"
          >
            <Menu size={20} />
          </button>
          
          <div className="flex-1 flex justify-center items-center gap-4">
            <h1 
              onClick={() => setCurrentView('home')}
              className="text-2xl font-black text-brand-emerald dark:text-brand-gold tracking-tight cursor-pointer hover:opacity-80 transition-opacity"
            >
              {t.appName}
            </h1>
            
            <button 
              onClick={() => setThemeMode(prev => prev === 'light' ? 'dark' : 'light')}
              className="p-2 md:p-3 bg-slate-100 dark:bg-slate-800 rounded-2xl text-slate-500 transition-all hover:scale-110 active:scale-95"
            >
              {themeMode === 'light' ? <Moon size={18} /> : <Sun size={18} />}
            </button>
            
            <div className="flex-1 max-w-xs relative group hidden md:block lg:ml-4">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="text-slate-300 group-focus-within:text-brand-emerald dark:group-focus-within:text-brand-gold transition-colors" size={14} />
              </div>
              <input 
                type="text"
                value={adhkarSearchQuery}
                onChange={(e) => {
                  setAdhkarSearchQuery(e.target.value);
                  if (currentView !== 'zikrs' && currentView !== 'home') setCurrentView('zikrs');
                }}
                placeholder={t.searchAdhkar}
                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-800 rounded-full py-2 pl-9 pr-4 text-xs font-bold outline-none focus:bg-white dark:focus:bg-slate-900 focus:ring-2 focus:ring-brand-emerald/10 focus:border-brand-emerald/30 transition-all dark:text-white"
              />
            </div>
          </div>
          
          <div className="w-10"></div>
        </div>
      </header>

      <main className="flex-1 max-w-4xl mx-auto w-full px-4 py-8 overflow-x-hidden">
        <AnimatePresence mode="wait">
          {currentView === 'about' && (
            <motion.div key="about" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8 pb-20">
              <div className="bg-white dark:bg-slate-900 p-10 rounded-[3rem] shadow-xl border border-slate-100 dark:border-slate-800 text-center space-y-8 max-w-2xl mx-auto">
                <div className="w-20 h-20 bg-brand-emerald/10 text-brand-emerald rounded-3xl flex items-center justify-center mx-auto">
                  <ShieldCheck size={40} />
                </div>
                <div className="space-y-4">
                  <h2 className="text-3xl font-black text-slate-800 dark:text-white">{t.appName}</h2>
                  <p className="text-slate-500 dark:text-slate-400 font-bold leading-relaxed">
                    {t.aboutDescription}
                  </p>
                </div>

                <div className="pt-8 border-t border-slate-50 dark:border-slate-800">
                  <div className="flex items-center gap-3 mb-6 justify-center">
                    <MessageSquare size={20} className="text-brand-emerald" />
                    <h3 className="font-black text-sm uppercase tracking-widest">{t.feedback}</h3>
                  </div>

                  {feedbackSent ? (
                    <motion.div 
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="p-6 bg-emerald-50 dark:bg-brand-emerald/10 text-brand-emerald rounded-3xl border border-emerald-100 dark:border-brand-emerald/20 font-black text-sm"
                    >
                      {t.feedbackSuccess}
                      <button 
                        onClick={() => setFeedbackSent(false)}
                        className="block mx-auto mt-4 text-xs underline opacity-60"
                      >
                        {language === 'ku' ? 'ناردنی نامەیەکی تر' : 'Send another message'}
                      </button>
                    </motion.div>
                  ) : (
                    <form 
                      onSubmit={async (e) => {
                        e.preventDefault();
                        if (!feedbackMessage.trim()) return;
                        setIsSendingFeedback(true);
                        const success = await sendFeedback(feedbackName || 'Anonymous', feedbackMessage);
                        if (success) {
                          setFeedbackSent(true);
                          setFeedbackMessage('');
                          setFeedbackName('');
                        }
                        setIsSendingFeedback(false);
                      }}
                      className="space-y-4"
                    >
                      <input 
                        type="text"
                        placeholder={t.userName}
                        value={feedbackName}
                        onChange={(e) => setFeedbackName(e.target.value)}
                        className="w-full px-5 py-4 bg-slate-50 dark:bg-slate-800 border-none rounded-2xl text-sm font-bold focus:ring-2 focus:ring-brand-emerald transition-all"
                      />
                      <textarea 
                        placeholder={t.message}
                        value={feedbackMessage}
                        onChange={(e) => setFeedbackMessage(e.target.value)}
                        className="w-full px-5 py-4 bg-slate-50 dark:bg-slate-800 border-none rounded-2xl text-sm font-bold focus:ring-2 focus:ring-brand-emerald transition-all h-32 resize-none"
                        required
                      />
                      <button 
                        type="submit"
                        disabled={isSendingFeedback}
                        className="w-full py-4 bg-brand-emerald text-white rounded-2xl font-black text-sm shadow-xl shadow-brand-emerald/20 flex items-center justify-center gap-2 hover:bg-brand-emerald/90 active:scale-95 transition-all"
                      >
                        {isSendingFeedback ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
                        {t.sendMessage}
                      </button>
                    </form>
                  )}
                </div>

                <div className="w-16 h-1 bg-brand-emerald/20 mx-auto rounded-full mt-8"></div>
                
                <AnimatePresence mode="wait">
                  {showLoginForm ? (
                    <motion.form 
                      key="login-form"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      onSubmit={handleAboutLogin}
                      className="w-full max-w-xs mx-auto space-y-4 bg-white dark:bg-slate-900 p-8 rounded-[2rem] border border-slate-100 dark:border-slate-800 shadow-2xl mt-8"
                    >
                      <div className="flex items-center gap-3 mb-6 justify-center">
                        <Lock size={20} className="text-brand-emerald" />
                        <h3 className="font-black text-sm uppercase tracking-widest">{t.adminLogin}</h3>
                      </div>
                      
                      <input 
                        type="email" 
                        placeholder={language === 'ku' ? 'ئیمێڵ' : 'Email'} 
                        value={aboutEmail}
                        onChange={(e) => setAboutEmail(e.target.value)}
                        className="w-full px-5 py-4 bg-slate-50 dark:bg-slate-800 border-none rounded-2xl text-sm font-bold focus:ring-2 focus:ring-brand-emerald transition-all"
                        required
                      />
                      <input 
                        type="password" 
                        placeholder={language === 'ku' ? 'تێپەڕەوشە' : 'Password'} 
                        value={aboutPassword}
                        onChange={(e) => setAboutPassword(e.target.value)}
                        className="w-full px-5 py-4 bg-slate-50 dark:bg-slate-800 border-none rounded-2xl text-sm font-bold focus:ring-2 focus:ring-brand-emerald transition-all"
                        required
                      />
                      
                      {loginError && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-3 bg-red-50 text-red-500 rounded-xl text-[10px] font-black italic border border-red-100">
                          {loginError}
                        </motion.div>
                      )}

                      <button 
                        type="submit" 
                        disabled={isLoggingIn}
                        className="w-full py-4 bg-brand-emerald text-white rounded-2xl font-black text-sm shadow-xl shadow-brand-emerald/20 flex items-center justify-center gap-2 hover:bg-brand-emerald/90 active:scale-95 transition-all"
                      >
                        {isLoggingIn ? <Loader2 size={18} className="animate-spin" /> : (language === 'ku' ? 'چوونەژوورەوە' : 'Log In')}
                      </button>
                      
                      <button 
                        type="button" 
                        onClick={() => setShowLoginForm(false)}
                        className="text-[10px] text-slate-400 font-black uppercase tracking-widest hover:text-slate-600 transition-colors"
                      >
                        {language === 'ku' ? 'داخستن' : 'Close'}
                      </button>
                    </motion.form>
                  ) : (
                    <motion.div 
                      key="lock-trigger"
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      whileHover={{ scale: 1.1 }}
                      className="cursor-pointer p-6 bg-white dark:bg-slate-900 rounded-full shadow-lg border border-slate-100 dark:border-slate-800 group inline-block mt-8 opacity-20 hover:opacity-100 transition-opacity"
                      onDoubleClick={() => setShowLoginForm(true)}
                    >
                      <Lock size={24} className="text-slate-300 dark:text-slate-700 group-hover:text-brand-emerald transition-all duration-500" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

               <div className="text-center mt-12 space-y-2 opacity-60">
                <p className="text-sm font-black text-slate-400 capitalize">{t.rememberMe}</p>
                <div className="flex items-center justify-center gap-4 text-[10px] font-black text-slate-300 uppercase tracking-widest">
                  <span>کوردی</span>
                  <div className="w-1 h-1 bg-slate-300 rounded-full"></div>
                  <span>العربية</span>
                  <div className="w-1 h-1 bg-slate-300 rounded-full"></div>
                  <span>English</span>
                </div>
              </div>
            </motion.div>
          )}

          {currentView === 'chat' && (
            <motion.div key="chat" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <AIChat language={language} t={t} />
            </motion.div>
          )}

          {currentView === 'stats' && (
            <motion.div key="stats" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <Stats language={language} t={t} />
            </motion.div>
          )}

          {currentView === 'youth' && (
             <motion.div key="youth" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                <div className="text-center space-y-4 mb-8">
                  <h2 className="text-3xl font-black text-brand-emerald dark:text-emerald-400">{t.youthGuidance || 'Youth Guidance'}</h2>
                  <p className="text-slate-400 font-bold max-w-md mx-auto">
                    {language === 'en' ? 'Practical advice for young Muslims on habits, faith, and daily life.' : 'ئامۆژگاری و ڕێنمایی بۆ گەنجان دەربارەی ژیان و ئایین.'}
                  </p>
                </div>

                <div className="space-y-4">
                  {youthGuidance.map(item => (
                    <motion.div 
                      key={item.id}
                      className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden"
                    >
                      <div className="p-6 border-b border-slate-50 flex items-start gap-4">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                          item.category === 'habits' ? 'bg-amber-50 text-amber-500' :
                          item.category === 'depression' ? 'bg-indigo-50 text-indigo-500' : 'bg-emerald-50 text-emerald-500'
                        }`}>
                          {item.category === 'habits' ? <Zap size={20} /> : <Heart size={20} />}
                        </div>
                        <h3 className="text-lg font-black text-slate-800 leading-tight">
                          {item.question[language]}
                        </h3>
                      </div>
                      <div className="p-6 bg-slate-50/50">
                        <p className="text-slate-600 font-medium leading-relaxed" dir={language === 'en' ? 'ltr' : 'rtl'}>
                          {item.answer[language]}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
             </motion.div>
          )}

          {currentView === 'stories' && (
            <motion.div key="stories" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <Stories language={language} t={t} />
            </motion.div>
          )}

          {currentView === 'quran' && (
            <motion.div 
              key="quran"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-6"
            >
              {!selectedSurah ? (
                <>
                  <div className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] shadow-xl text-center border border-slate-100 dark:border-slate-800">
                    <h2 className="text-3xl font-black text-brand-emerald dark:text-brand-gold mb-6">{t.quran}</h2>
                    <div className="relative max-w-md mx-auto">
                      <input 
                        type="text" 
                        placeholder={t.searchSurah}
                        value={quranSearch}
                        onChange={(e) => setQuranSearch(e.target.value)}
                        className="w-full pl-12 pr-6 py-4 bg-slate-50 dark:bg-slate-800 rounded-2xl border-none focus:ring-2 focus:ring-brand-emerald/20 transition-all font-bold dark:text-white"
                      />
                      <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-emerald/40 dark:text-brand-gold/40" size={20} />
                    </div>
                    
                    {isFetchingAyahs && (
                      <div className="mt-6 flex flex-col items-center gap-2">
                        <Loader2 className="text-brand-emerald animate-spin" size={32} />
                        <p className="text-[10px] font-black text-brand-emerald uppercase animate-pulse">Downloading...</p>
                      </div>
                    )}
                    <div className="mt-4 flex flex-wrap justify-center gap-2">
                       <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">{language === 'en' ? 'Suggested:' : language === 'ku' ? 'پێشنیارکراو:' : 'مقترح:'}</span>
                       <button onClick={() => setQuranSearch('الكهف')} className="text-xs font-bold text-brand-emerald/60 hover:text-brand-emerald transition-colors">الكهف</button>
                       <button onClick={() => setQuranSearch('يس')} className="text-xs font-bold text-brand-emerald/60 hover:text-brand-emerald transition-colors">يس</button>
                       <button onClick={() => setQuranSearch('الملك')} className="text-xs font-bold text-brand-emerald/60 hover:text-brand-emerald transition-colors">الملك</button>
                    </div>

                    {bookmark && (
                      <div className="mt-8 p-4 bg-brand-gold/5 border border-brand-gold/20 rounded-2xl flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-brand-gold/10 text-brand-gold rounded-xl flex items-center justify-center">
                            <Heart size={20} fill={bookmark ? 'currentColor' : 'none'} />
                          </div>
                          <div className="text-left">
                            <p className="text-[10px] font-black text-brand-gold uppercase tracking-widest">{t.lastRead}</p>
                            <h4 className="font-bold text-slate-800">
                              سورة {bookmark.surahName} • {t.ayahShort} {bookmark.ayahNumber}
                            </h4>
                          </div>
                        </div>
                        <button 
                          onClick={() => fetchSurahAyahs(bookmark.surahNumber)}
                          className="bg-brand-gold text-white px-4 py-2 rounded-xl text-xs font-black shadow-sm hover:shadow-md transition-all"
                        >
                          {language === 'en' ? 'Go' : language === 'ku' ? 'بچۆ' : 'ذهاب'}
                        </button>
                      </div>
                    )}
                  </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {surahs.filter(s => 
                        s.name.includes(quranSearch) || 
                        s.englishName.toLowerCase().includes(quranSearch.toLowerCase()) ||
                        s.number.toString() === quranSearch
                      ).map((s) => (
                      <button 
                        key={s.number}
                        onClick={() => fetchSurahAyahs(s.number)}
                        className="bg-white dark:bg-slate-900 p-4 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800 flex items-center justify-between group hover:shadow-md transition-shadow"
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 bg-slate-50 text-brand-emerald rounded-xl flex items-center justify-center font-black">
                            {s.number}
                          </div>
                          <div className="text-left">
                            <h3 className="text-sm font-black text-slate-800">{s.name}</h3>
                            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{s.englishName}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-xs font-black text-brand-emerald/40">{s.numberOfAyahs} {t.all}</p>
                          <ChevronLeft className="text-slate-200 mt-1" size={18} />
                        </div>
                      </button>
                    ))}
                  </div>
                </>
              ) : (
                <QuranReader 
                  surah={selectedSurah} 
                  onBack={() => setSelectedSurah(null)}
                  language={language}
                  onAyahRead={(isKahf) => completeAyah(isKahf)}
                />
              )}
            </motion.div>
          )}

          {currentView === 'post-of-day' && (
            <motion.div key="post-of-day" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
              <div className="py-10 text-center space-y-4">
                <h2 className="text-3xl font-black text-brand-emerald dark:text-brand-gold">{t.postOfDay}</h2>
                <p className="text-slate-500 font-bold">بۆ بڵاوکردنەوەی زیکرەکان وەک ستۆری بە دیزاینێکی نایاب</p>
              </div>
              <DailyCard language={language} t={t} />
            </motion.div>
          )}

          {currentView === 'sabr' && (
            <motion.div key="sabr" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8 pb-32">
              <div className="text-center py-10 space-y-4">
                <div className="w-16 h-16 bg-indigo-50 dark:bg-indigo-950/30 text-indigo-600 dark:text-indigo-400 rounded-3xl flex items-center justify-center mx-auto shadow-sm">
                  <ShieldCheck size={32} />
                </div>
                <div>
                  <h2 className="text-4xl font-black text-slate-800 dark:text-white mb-2">{t.sabr}</h2>
                  <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">{language === 'en' ? 'Patience is a virtue of life' : 'ئارامی و پاداشتی بێ کۆتایی'}</p>
                </div>
              </div>

              {/* Sabr Navigation Menu */}
              <div className="max-w-3xl mx-auto px-4 sticky top-4 z-30">
                <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-100 dark:border-slate-800 p-2 rounded-2xl shadow-lg flex items-center gap-2 overflow-x-auto no-scrollbar">
                  {[
                    { id: 'all', label: (t as any).sabrAll, icon: <Grid2X2 size={16} /> },
                    { id: 'ayah', label: (t as any).sabrVerses, icon: <BookOpen size={16} /> },
                    { id: 'hadith', label: (t as any).sabrHadiths, icon: <MessageSquare size={16} /> },
                    { id: 'story', label: (t as any).sabrStories, icon: <Library size={16} /> },
                    { id: 'companion', label: (t as any).sabrCompanions, icon: <Users size={16} /> },
                    { id: 'quote', label: (t as any).sabrQuotes, icon: <Quote size={16} /> }
                  ].map((filter) => (
                    <button
                      key={filter.id}
                      onClick={() => setSabrFilter(filter.id as any)}
                      className={`flex-shrink-0 flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-black transition-all ${
                        sabrFilter === filter.id 
                          ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200 dark:shadow-indigo-900/40' 
                          : 'text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800'
                      }`}
                    >
                      {filter.icon}
                      <span className="whitespace-nowrap">{filter.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 gap-6 max-w-3xl mx-auto px-4">
                {patienceWisdom
                  .filter(item => sabrFilter === 'all' || item.type === sabrFilter)
                  .map((item) => (
                  <motion.div 
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    key={item.id} 
                    className="bg-white dark:bg-slate-900 p-8 rounded-[3rem] shadow-sm border border-slate-100 dark:border-slate-800 space-y-6 group hover:shadow-xl transition-all duration-500 relative overflow-hidden"
                  >
                    {/* Decorative Background Icon */}
                    <div className="absolute -right-4 -top-4 text-slate-50/50 dark:text-slate-800/10 transform rotate-12 scale-150 pointer-events-none group-hover:rotate-45 transition-transform duration-1000">
                      {item.type === 'ayah' ? <BookOpen size={120} /> : item.type === 'hadith' ? <MessageSquare size={120} /> : item.type === 'companion' ? <Users size={120} /> : <Quote size={120} />}
                    </div>

                    <div className="flex justify-between items-center relative z-10">
                      <span className="text-[10px] font-black bg-indigo-50 dark:bg-indigo-900/30 text-indigo-500 dark:text-indigo-400 px-4 py-1.5 rounded-full uppercase tracking-widest">
                        {(t as any)[item.type] || item.type}
                      </span>
                      {item.reference && <span className="text-[10px] text-slate-300 dark:text-slate-600 font-bold">{item.reference}</span>}
                    </div>
                    <p className="text-2xl font-bold text-slate-800 dark:text-slate-100 text-center leading-[2.2] quran-font px-4 relative z-10" dir="rtl">{item.textAr}</p>
                    <div className="w-12 h-1 bg-indigo-100 dark:bg-indigo-900/20 mx-auto rounded-full group-hover:w-20 transition-all relative z-10"></div>
                    <p className="text-lg font-bold text-slate-600 dark:text-slate-300 text-center leading-relaxed italic relative z-10">
                      {language === 'en' ? item.textEn : language === 'ar' ? item.textAr : item.textKu}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {currentView === 'istikhara' && (
            <motion.div key="istikhara" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-8 pb-32">
              <div className="text-center py-10 space-y-4">
                <div className="w-16 h-16 bg-brand-emerald/10 text-brand-emerald rounded-3xl flex items-center justify-center mx-auto shadow-sm">
                  <Compass size={32} />
                </div>
                <div>
                  <h2 className="text-4xl font-black text-slate-800 dark:text-white mb-2">{(t as any).istikhara}</h2>
                  <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">
                    {language === 'en' ? 'Seeking guidance from Allah' : 'داواکردنی باشترین بڕیار لە خودای گەورە'}
                  </p>
                </div>
              </div>

              <div className="max-w-3xl mx-auto space-y-8 px-4">
                {/* Definition */}
                <div className="bg-white dark:bg-slate-900 p-8 rounded-[3rem] shadow-sm border border-slate-100 dark:border-slate-800 space-y-4">
                  <h3 className="text-xl font-black text-brand-emerald dark:text-emerald-400 flex items-center gap-2">
                    <Library size={20} />
                    {language === 'en' ? 'Definition' : language === 'ar' ? 'التعريف' : 'پێناسە'}
                  </h3>
                  <p className="text-lg font-bold text-slate-600 dark:text-slate-300 leading-relaxed">
                    {language === 'en' ? 
                      'Prophetic prayer for guidance when a person is hesitant between choices or decisions in life.' : 
                      language === 'ar' ? 
                      'صلاة يؤديها المسلم ليطلب من الله عز وجل خير الأمور في شأنه وحياته.' : 
                      'نوێژێکی سوننەتە کە موسڵمان ئەنجامی دەدات بۆ ئەوەی داوای خێر و چاکە لە خودا بکات کاتێک دەیەوێت بڕیارێک لەسەر کارێکی گرنگ بدات.'}
                  </p>
                </div>

                {/* Steps */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { id: 1, title: language === 'en' ? 'Wudu & Intent' : 'دەستنوێژ و نیەت', content: language === 'en' ? 'Perform valid wudu and have sincere intention.' : 'بە باشی دەستنوێژ بگرە و لە دڵتدا نیەتی نوێژی ئیستخارە بهێنە.' },
                    { id: 2, title: language === 'en' ? 'Two Rak\'ahs' : 'دوو ڕکات نوێژ', content: language === 'en' ? 'Pray two rak\'ahs of sunnah prayer.' : 'دوو ڕکات نوێژی سوننەت ئەنجام بدە.' },
                    { id: 3, title: language === 'en' ? 'The Supplication' : 'خوێندنی دوعاکە', content: language === 'en' ? 'Recite the Istikhara dua after Taslim.' : 'بە تەواو بوونی نوێژەکە، دوعای ئیستخارە بخوێنە.' },
                    { id: 4, title: language === 'en' ? 'The Result' : 'ئەنجامەکە', content: language === 'en' ? 'Observe how your heart feels or circumstances change.' : 'چاوەڕێی ئاسانکاری خودا بکە بۆ کارەکەت.' }
                  ].map((step) => (
                    <div key={step.id} className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-100 dark:border-slate-800 flex gap-4">
                      <div className="w-10 h-10 rounded-xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center flex-shrink-0 text-brand-emerald font-black">
                        {step.id}
                      </div>
                      <div>
                        <h4 className="font-black text-slate-800 dark:text-white mb-1">{step.title}</h4>
                        <p className="text-xs font-bold text-slate-500 leading-relaxed">{step.content}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* The Dua Card */}
                <div className="bg-indigo-600 p-10 rounded-[3.5rem] shadow-xl text-white space-y-8 relative overflow-hidden">
                  <div className="absolute right-0 top-0 opacity-10 transform scale-150 translate-x-1/2 -translate-y-1/2">
                    <Quote size={200} />
                  </div>
                  <h3 className="text-2xl font-black text-center">{language === 'en' ? 'The Supplication (Dua)' : 'دوعای ئیستخارە'}</h3>
                  
                  <div className="space-y-6 text-center">
                    <p className="text-2xl font-black leading-[2.5] quran-font" dir="rtl">
                      اللَّهُمَّ إِنِّي أَسْتَخِيرُكَ بِعِلْمِكَ وَأَسْتَقْدِرُكَ بِقُدْرَتِكَ وَأَسْأَلُكَ مِنْ فَضْلِكَ الْعَظِيمِ، فَإِنَّكَ تَقْدِرُ وَلَا أَقْدِرُ وَتَعْلَمُ وَلَا أَعْلَمُ وَأَنْتَ عَلَّامُ الْغُيُوبِ...
                    </p>
                    <div className="h-px bg-white/20 w-32 mx-auto"></div>
                    <p className="text-lg font-bold leading-relaxed text-indigo-100">
                      {language === 'ku' ? 
                        'خودایە من داوای خێرت لێدەکەم بە زانیاریت، وە داوای هێزت لێدەکەم بە دەسەڵاتت، وە داوای فەزڵی گەورەت لێدەکەم، چونکە تۆ دەتوانیت و من ناتوانم، و تۆ دەزانی و من نازانم، و تۆ زانای بە هەموو شتە نادیارەکان...' :
                        language === 'en' ?
                        'O Allah, I seek Your counsel by Your knowledge and I seek Your assistance by Your power, and I ask You from Your immense favor, for verily You are able while I am not, and You know while I do not, and You are the Knower of the Unseen...' :
                        'اللَّهُمَّ إِنِّي أَسْتَخِيرُكَ بِعِلْمِكَ وَأَسْتَقْدِرُكَ بِقُدْرَتِكَ وَأَسْأَلُكَ مِنْ فَضْلِكَ الْعَظِيمِ، فَإِنَّكَ تَقْدِرُ وَلَا أَقْدِرُ وَتَعْلَمُ وَلَا أَعْلَمُ وَأَنْتَ عَلَّامُ الْغُيُوبِ...'}
                    </p>
                  </div>
                </div>

                {/* Advice Section */}
                <div className="bg-slate-50 dark:bg-slate-800/50 p-8 rounded-[3rem] border border-dashed border-slate-200 dark:border-slate-700">
                  <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                    <ShieldCheck size={18} />
                    {language === 'en' ? 'Important Advice' : 'ئامۆژگاری گرنگ'}
                  </h3>
                  <p className="text-base font-bold text-slate-600 dark:text-slate-300 leading-relaxed">
                    {language === 'en' ? 
                      'After the prayer, if the matter you desired is made easy, then continue with it. If it is blocked or becomes difficult, it may be the sign that there is no good in it for you at this time.' : 
                      language === 'ar' ? 
                      'بعد الصلاة، إذا تيسر الأمر فهو خير بإذن الله، وإن تيسر صرفه عنك فهذا هو الخير أيضاً.' : 
                      'دوای نوێژەکە، ئەگەر کارەکە خێر بێت ئەوا خودا بۆت ئاسان دەکات و دەستت پێدەگات، ئەگەر خێریشی تێدا نەبێت ئەوا خودا لێت دوور دەخاتەوە و دڵت لێی سارد دەکاتەوە.'}
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          {currentView === 'home' && (
            <motion.div key="home" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-12 py-10">
              {/* Simplified Header with Time Label */}
              <div className="text-center space-y-4">
                <div className="inline-flex items-center gap-2 px-6 py-2 bg-brand-emerald/10 dark:bg-brand-emerald/20 text-brand-emerald dark:text-white rounded-full">
                  <Clock size={16} />
                  <span className="text-sm font-black uppercase tracking-widest leading-none">
                    {(() => {
                      const hour = new Date().getHours();
                      if (hour >= 5 && hour < 11) return t.morningCenter;
                      if (hour >= 11 && hour < 16) return t.afternoonCenter;
                      if (hour >= 16 && hour < 20) return t.eveningCenter;
                      return t.nightCenter;
                    })()}
                  </span>
                </div>
                <h2 className="text-4xl font-black text-slate-800 dark:text-white leading-tight">
                  {language === 'ku' ? 'دڵەکان بە زیکری خودا ئارام دەبنەوە' : 'Hearts find rest in the remembrance of Allah'}
                </h2>
              </div>

              <div className="grid grid-cols-1 gap-8 max-w-2xl mx-auto">
                {/* 1. Daily Zikr */}
                <div className="bg-white dark:bg-slate-900 p-8 rounded-[3.5rem] shadow-sm border border-slate-100 dark:border-slate-800 flex flex-col items-center text-center space-y-6">
                   <div className="w-12 h-12 bg-orange-50 dark:bg-orange-950/30 text-orange-500 rounded-2xl flex items-center justify-center">
                     <Stars size={24} />
                   </div>
                   <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest">{t.dailyZikr}</h3>
                   <p className="text-2xl font-black leading-relaxed quran-font text-slate-800 dark:text-slate-100" dir="rtl">
                      {zikrs[Math.floor(Date.now() / 86400000) % zikrs.length].text}
                   </p>
                   <div className="w-12 h-1 bg-brand-emerald/20 rounded-full"></div>
                   <p className="text-base font-bold text-slate-500 dark:text-slate-400 leading-relaxed italic">
                      {language === 'ku' ? zikrs[Math.floor(Date.now() / 86400000) % zikrs.length].translationKu : zikrs[Math.floor(Date.now() / 86400000) % zikrs.length].translationEn}
                   </p>
                </div>

                {/* 2. Daily Ayah */}
                <div className="bg-white dark:bg-slate-900 p-8 rounded-[3.5rem] shadow-sm border border-slate-100 dark:border-slate-800 flex flex-col items-center text-center space-y-6">
                   <div className="w-12 h-12 bg-brand-emerald/5 text-brand-emerald rounded-2xl flex items-center justify-center">
                     <BookOpen size={24} />
                   </div>
                   <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest">{t.dailyAyah}</h3>
                   <p className="text-2xl font-black leading-relaxed quran-font text-slate-800 dark:text-slate-100" dir="rtl" style={{ lineHeight: 2 }}>
                      {allAyahs[Math.floor(Date.now() / 86400000) % allAyahs.length].text}
                   </p>
                   <div className="w-12 h-1 bg-brand-emerald/20 rounded-full"></div>
                   <p className="text-base font-bold text-slate-500 dark:text-slate-400">
                      {(() => {
                        const ayah = allAyahs[Math.floor(Date.now() / 86400000) % allAyahs.length];
                        if (typeof ayah.translation === 'string') return ayah.translation;
                        return ayah.translation?.[language === 'ar' ? 'ku' : language] || ayah.translation?.ku;
                      })()}
                   </p>
                </div>

                {/* 3. Daily Hadith */}
                <div className="bg-white dark:bg-slate-900 p-8 rounded-[3.5rem] shadow-sm border border-slate-100 dark:border-slate-800 flex flex-col items-center text-center space-y-6">
                   <div className="w-12 h-12 bg-blue-50 dark:bg-blue-950/30 text-blue-500 rounded-2xl flex items-center justify-center">
                     <MessageSquare size={24} />
                   </div>
                   <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest">{t.dailyHadith}</h3>
                   <p className="text-xl font-bold leading-relaxed text-slate-800 dark:text-slate-100" dir="rtl">
                      {(() => {
                        const hadith = hadiths[Math.floor(Date.now() / 86401000) % hadiths.length];
                        return language === 'ar' ? hadith.arabic : hadith.kurdish;
                      })()}
                   </p>
                   <div className="px-4 py-1 bg-slate-50 dark:bg-slate-800 rounded-full text-[10px] font-black text-slate-400">
                      {hadiths[Math.floor(Date.now() / 86401000) % hadiths.length].collection}
                   </div>
                </div>

                {/* Quick Access Grid */}
                <div className="pt-8">
                  <div className="flex items-center justify-between mb-6 px-4">
                    <h3 className="text-lg font-black text-slate-800 dark:text-white uppercase tracking-tight">{t.more}</h3>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {[
                      { id: 'zikrs', label: t.zikrs, icon: <Stars className="text-orange-500" /> },
                      { id: 'quran', label: t.quran, icon: <BookOpen className="text-brand-emerald" /> },
                      { id: 'hadiths', label: t.hadith, icon: <MessageSquare className="text-blue-500" /> },
                      { id: 'marriage', label: t.marriageHub, icon: <Heart className="text-rose-500" /> },
                      { id: 'tasbih', label: t.tasbih, icon: <Zap className="text-brand-gold" /> },
                      { id: 'hajj', label: t.hajj, icon: <Compass className="text-indigo-500" /> },
                      { id: 'stories', label: t.stories, icon: <Library className="text-brand-emerald" /> },
                      { id: 'chat', label: t.aiChat || 'AI Chat', icon: <MessageSquare className="text-brand-emerald" /> },
                      { id: 'progress', label: t.progress || 'Progress', icon: <BarChart className="text-indigo-400" /> },
                    ].map((item) => (
                      <button
                        key={item.id}
                        onClick={() => {
                          setCurrentView(item.id as any);
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        className="bg-white dark:bg-slate-900 p-6 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm flex flex-col items-center gap-3 active:scale-95 transition-all group hover:shadow-md"
                      >
                        <div className="w-12 h-12 rounded-2xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center group-hover:scale-110 transition-transform">
                          {item.icon}
                        </div>
                        <span className="text-xs font-black text-slate-700 dark:text-slate-200 uppercase tracking-tight">{item.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {currentView === 'zikrs' && (
            <motion.div 
              key="zikrs"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-6"
            >
              <div className="bg-white dark:bg-slate-900 p-6 rounded-[2.5rem] shadow-sm border border-slate-100 dark:border-slate-800 flex flex-col gap-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-black text-brand-emerald dark:text-brand-gold">
                    {activeCategory === 'all' ? t.zikrs : 
                     categories.find(c => c.id === activeCategory)?.label}
                  </h2>
                </div>

                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Search className="text-slate-400 group-focus-within:text-brand-emerald dark:group-focus-within:text-brand-gold transition-colors" size={18} />
                  </div>
                  <input 
                    type="text"
                    value={adhkarSearchQuery}
                    onChange={(e) => setAdhkarSearchQuery(e.target.value)}
                    placeholder={t.searchAdhkar}
                    className="w-full pl-12 pr-6 py-4 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-800 rounded-2xl text-sm font-bold focus:ring-4 focus:ring-brand-emerald/10 focus:border-brand-emerald/30 outline-none transition-all shadow-inner dark:text-white"
                  />
                </div>
                
                <div className="max-w-xl mx-auto px-4 mt-8">
                  <div className="relative">
                    <button 
                      onClick={() => setIsAdhkarDropdownOpen(!isAdhkarDropdownOpen)}
                      className="w-full flex items-center justify-between gap-3 px-6 py-4 rounded-2xl font-black text-sm transition-all border bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800 text-brand-emerald dark:text-brand-gold shadow-sm hover:border-brand-emerald/30"
                    >
                      <div className="flex items-center gap-3">
                        <Menu size={20} className="text-brand-emerald dark:text-brand-gold" />
                        <span className="dark:text-brand-gold">{t.zikrs}</span>
                      </div>
                      <div className="px-3 py-1 bg-brand-emerald/10 rounded-lg text-[10px] uppercase tracking-widest font-black">
                        {activeCategory === 'all' ? t.all : categories.find(c => c.id === activeCategory)?.label}
                      </div>
                    </button>
                    
                    {/* Dropdown Menu */}
                    <AnimatePresence>
                      {isAdhkarDropdownOpen && (
                        <motion.div 
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          className="absolute top-full left-0 right-0 mt-2 bg-white/95 backdrop-blur-md dark:bg-slate-900/95 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-lg transition-all z-50 overflow-y-auto max-h-[400px] divide-y divide-slate-50 dark:divide-slate-800 scrollbar-thin scrollbar-thumb-slate-200"
                        >
                          <button
                            onClick={() => { setActiveCategory('all'); setIsAdhkarDropdownOpen(false); }}
                            className={`w-full flex items-center justify-between px-6 py-4 text-[12px] font-bold transition-all hover:bg-slate-50 dark:hover:bg-slate-800/50 ${activeCategory === 'all' ? 'text-brand-emerald bg-brand-emerald/5 dark:text-brand-gold' : 'text-slate-500'}`}
                          >
                            <div className="flex items-center gap-3">
                              <Grid2X2 size={16} className={activeCategory === 'all' ? 'text-brand-emerald dark:text-brand-gold' : 'text-slate-300'} />
                              <span>{t.all}</span>
                            </div>
                            {activeCategory === 'all' && <div className="w-2 h-2 rounded-full bg-brand-emerald dark:bg-brand-gold shadow-sm shadow-brand-emerald/20"></div>}
                          </button>
                          {categories.map(c => (
                            <button
                              key={c.id}
                              onClick={() => { setActiveCategory(c.id as any); setIsAdhkarDropdownOpen(false); }}
                              className={`w-full flex items-center justify-between px-6 py-4 text-[12px] font-bold transition-all hover:bg-slate-50 dark:hover:bg-slate-800/50 ${activeCategory === c.id ? 'text-brand-emerald bg-brand-emerald/5 dark:text-brand-gold' : 'text-slate-500'}`}
                            >
                              <div className="flex items-center gap-3">
                                <span className={activeCategory === c.id ? 'text-brand-emerald dark:text-brand-gold' : 'text-slate-300'}>{c.icon}</span>
                                <span>{c.label}</span>
                              </div>
                              {activeCategory === c.id && <div className="w-2 h-2 rounded-full bg-brand-emerald dark:bg-brand-gold shadow-sm shadow-brand-emerald/20"></div>}
                            </button>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-6">
                {filteredZikrs.map((zikr) => (
                  <ZikrCard 
                    key={zikr.id} 
                    zikr={zikr} 
                    language={language} 
                    onIncrement={(title) => incrementTasbih(1, title)}
                    onComplete={(title) => completeZikr(title, zikr.pointsPerComplete || 5)}
                  />
                ))}
              </div>
            </motion.div>
          )}

          {currentView === 'kursi' && (
            <motion.div 
              key="kursi"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-white p-10 rounded-[3rem] shadow-xl border border-slate-100"
            >
              <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                <div className="bg-brand-emerald/10 text-brand-emerald px-6 py-2 rounded-full font-black">ئایەتولکورسی</div>
                
                <div className="flex bg-slate-100 p-1 rounded-2xl overflow-x-auto max-w-full">
                  {Object.keys(kursiTafsirs).map(t => (
                    <button
                      key={t}
                      onClick={() => setActiveTafsir(t as any)}
                      className={`px-4 py-2 text-xs font-bold rounded-xl transition-all whitespace-nowrap flex flex-col items-center gap-0.5 ${activeTafsir === t ? 'bg-white text-brand-emerald shadow-sm' : 'text-slate-400'}`}
                    >
                      <span>{kursiTafsirs[t][language].name}</span>
                      <span className="text-[8px] opacity-60 uppercase tracking-tighter">{kursiTafsirs[t][language].label}</span>
                    </button>
                  ))}
                </div>
              </div>
              <p className="text-2xl md:text-3xl font-bold text-slate-800 leading-[1.8] text-center mb-10" dir="rtl">
                اللَّهُ لَا إِلَهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ لَا تَأْخُذُهُ سِنَةٌ وَلَا نَوْمٌ لَهُ مَا فِي السَّمَاوَاتِ وَمَا فِي الْأَرْضِ مَنْ ذَا الَّذِي يَشْفَعُ عِنْدَهُ إِلَّا بِإِذْنِهِ يَعْلَمُ مَا بَيْنَ أَيْدِيهِمْ وَمَا خَلْفَهُمْ وَلَا يُحِيطُونَ بِشَيْءٍ مِنْ عِلْمِهِ إِلَّا بِمَا شَاءَ وَسِعَ كُرْسِيُّهُ السَّمَاوَاتِ وَالْأَرْضَ وَلَا يَئُودُهُ حِفْظُهُمَا وَهُوَ الْعَلِيُّ الْعَظِيمُ
              </p>
              <div className="w-full h-px bg-slate-100 mb-10"></div>
              <p className="text-xl md:text-2xl text-slate-500 leading-relaxed text-center font-medium">
                {kursiTafsirs[activeTafsir][language].text}
              </p>
            </motion.div>
          )}

          {/* Hadith Section - Unified View */}
          {currentView === 'hadith' && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-8 pb-32"
            >
              <div className="text-center space-y-4 mb-8">
                <h2 className="text-3xl font-black text-brand-emerald dark:text-brand-gold">{t.hadith}</h2>
                <div className="w-16 h-1 bg-brand-emerald/20 mx-auto rounded-full"></div>
                <div className="max-w-xl mx-auto px-4 mt-8">
                  <div className="relative">
                    <button 
                      onClick={() => setIsHadithDropdownOpen(!isHadithDropdownOpen)}
                      className="w-full flex items-center justify-between gap-3 px-6 py-4 rounded-2xl font-black text-sm transition-all border bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800 text-brand-emerald dark:text-brand-gold shadow-sm hover:border-brand-emerald/30"
                    >
                      <div className="flex items-center gap-3">
                        <Menu size={20} className="text-brand-emerald" />
                        <span>{t.hadith}</span>
                      </div>
                      <div className="px-3 py-1 bg-brand-emerald/10 dark:bg-brand-emerald/20 rounded-lg text-[10px] uppercase tracking-widest font-black">
                        {selectedHadithCollection === 'Bukhari' ? (language === 'ku' ? 'بوخاری' : 'Bukhari') : 
                         selectedHadithCollection === 'Muslim' ? (language === 'ku' ? 'موسلیم' : 'Muslim') :
                         selectedHadithCollection === 'Sahih Ibn Khuzaymah' ? (language === 'ku' ? 'ئیبن خوزەیمە' : 'Ibn Khuzaymah') :
                         selectedHadithCollection === 'Sahih Ibn Hibban' ? (language === 'ku' ? 'ئیبن حیبان' : 'Ibn Hibban') :
                         selectedHadithCollection === 'Sunan Abi Dawud' ? (language === 'ku' ? 'ئەبی داود' : 'Abi Dawud') :
                         selectedHadithCollection === 'Sunan al-Tirmidhi' ? (language === 'ku' ? 'تیرمزی' : 'al-Tirmidhi') :
                         selectedHadithCollection === 'Sunan al-Nasa\'i' ? (language === 'ku' ? 'نەسائی' : 'al-Nasa\'i') :
                         selectedHadithCollection === 'Sunan Ibn Majah' ? (language === 'ku' ? 'ئیبن ماجە' : 'Ibn Majah') :
                         selectedHadithCollection === 'Sunan al-Darimi' ? (language === 'ku' ? 'داریمی' : 'al-Darimi') :
                         (language === 'ku' ? 'دارەقوتنی' : 'al-Daraqutni')}
                      </div>
                    </button>
                    
                    {/* Dropdown Menu */}
                    <AnimatePresence>
                      {isHadithDropdownOpen && (
                        <motion.div 
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-2xl transition-all z-20 overflow-hidden divide-y divide-slate-50 dark:divide-slate-800"
                        >
                          {['Bukhari', 'Muslim', 'Sahih Ibn Khuzaymah', 'Sahih Ibn Hibban', 'Sunan Abi Dawud', 'Sunan al-Tirmidhi', 'Sunan al-Nasa\'i', 'Sunan Ibn Majah', 'Sunan al-Darimi', 'Sunan al-Daraqutni'].map(coll => (
                            <button
                              key={coll}
                              onClick={() => { setSelectedHadithCollection(coll as any); setIsHadithDropdownOpen(false); }}
                              className={`w-full flex items-center justify-between px-6 py-4 text-xs font-bold transition-all hover:bg-slate-50 dark:hover:bg-slate-800/50 ${selectedHadithCollection === coll ? 'text-brand-emerald bg-brand-emerald/5' : 'text-slate-500'}`}
                            >
                              <div className="flex items-center gap-3">
                                <Library size={16} className={selectedHadithCollection === coll ? 'text-brand-emerald' : 'text-slate-300'} />
                                <span>
                                  {coll === 'Bukhari' ? (language === 'ku' ? 'بوخاری' : 'Bukhari') : 
                                   coll === 'Muslim' ? (language === 'ku' ? 'موسلیم' : 'Muslim') :
                                   coll === 'Sahih Ibn Khuzaymah' ? (language === 'ku' ? 'ئیبن خوزەیمە' : 'Ibn Khuzaymah') :
                                   coll === 'Sahih Ibn Hibban' ? (language === 'ku' ? 'ئیبن حیبان' : 'Ibn Hibban') :
                                   coll === 'Sunan Abi Dawud' ? (language === 'ku' ? 'ئەبی داود' : 'Abi Dawud') :
                                   coll === 'Sunan al-Tirmidhi' ? (language === 'ku' ? 'تیرمزی' : 'al-Tirmidhi') :
                                   coll === 'Sunan al-Nasa\'i' ? (language === 'ku' ? 'نەسائی' : 'al-Nasa\'i') :
                                   coll === 'Sunan Ibn Majah' ? (language === 'ku' ? 'ئیبن ماجە' : 'Ibn Majah') :
                                   coll === 'Sunan al-Darimi' ? (language === 'ku' ? 'داریمی' : 'al-Darimi') :
                                   (language === 'ku' ? 'دارەقوتنی' : 'al-Daraqutni')}
                                </span>
                              </div>
                              {selectedHadithCollection === coll && <div className="w-2 h-2 rounded-full bg-brand-emerald shadow-sm shadow-brand-emerald/20"></div>}
                            </button>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
                <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">
                  {selectedHadithCollection === 'Bukhari' 
                    ? (language === 'en' ? 'Authentic Narrations from Sahih Bukhari' : 'فەرموودە ڕاستەکانی سەحیحی بوخاری')
                    : selectedHadithCollection === 'Muslim'
                    ? (language === 'en' ? 'Authentic Narrations from Sahih Muslim' : 'فەرموودە ڕاستەکانی سەحیحی موسلیم')
                    : selectedHadithCollection === 'Sahih Ibn Khuzaymah'
                    ? (language === 'en' ? 'Authentic Narrations from Sahih Ibn Khuzaymah' : 'فەرموودە ڕاستەکانی سەحیحی ئیبن خوزەیمە')
                    : selectedHadithCollection === 'Sahih Ibn Hibban'
                    ? (language === 'en' ? 'Authentic Narrations from Sahih Ibn Hibban' : 'فەرموودە ڕاستەکانی سەحیحی ئیبن حیبان')
                    : selectedHadithCollection === 'Sunan Abi Dawud'
                    ? (language === 'en' ? 'Authentic Narrations from Sunan Abi Dawud' : 'فەرموودە ڕاستەکانی سونەنی ئەبو داود')
                    : selectedHadithCollection === 'Sunan al-Tirmidhi'
                    ? (language === 'en' ? 'Authentic Narrations from Sunan al-Tirmidhi' : 'فەرموودە ڕاستەکانی سونەنی تیرمزی')
                    : selectedHadithCollection === 'Sunan al-Nasa\'i'
                    ? (language === 'en' ? 'Authentic Narrations from Sunan al-Nasa\'i' : 'فەرموودە ڕاستەکانی سونەنی نەسائی')
                    : selectedHadithCollection === 'Sunan Ibn Majah'
                    ? (language === 'en' ? 'Authentic Narrations from Sunan Ibn Majah' : 'فەرموودە ڕاستەکانی سونەنی ئیبن ماجە')
                    : selectedHadithCollection === 'Sunan al-Darimi'
                    ? (language === 'en' ? 'Authentic Narrations from Sunan al-Darimi' : 'فەرموودە ڕاستەکانی سونەنی داریمی')
                    : (language === 'en' ? 'Authentic Narrations from Sunan al-Daraqutni' : 'فەرموودە ڕاستەکانی سونەنی دارەقوتنی')
                  }
                </p>
              </div>

              <div className="grid grid-cols-1 gap-6 max-w-2xl mx-auto">
                {isLoadingHadiths ? (
                  <div className="flex flex-col items-center justify-center py-20 gap-4">
                    <Loader2 className="animate-spin text-brand-emerald" size={40} />
                    <p className="text-slate-400 font-bold animate-pulse">{language === 'ku' ? 'باردەکرێت...' : 'Loading Hadiths...'}</p>
                  </div>
                ) : hadithError ? (
                  <div className="text-center py-20 space-y-4">
                    <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto">
                      <X size={32} />
                    </div>
                    <p className="text-slate-500 font-bold">{language === 'ku' ? 'کێشەیەک ڕوویدا لە کاتی هێنانی فەرموودەکان' : 'An error occurred while fetching hadiths'}</p>
                    <button 
                      onClick={fetchRemoteHadiths} 
                      className="bg-brand-emerald text-white px-6 py-2 rounded-xl font-bold"
                    >
                      {language === 'ku' ? 'دووبارە هەوڵبدەرەوە' : 'Retry'}
                    </button>
                  </div>
                ) : displayedHadiths.length > 0 ? (
                  displayedHadiths.map((hadith) => (
                    <motion.div 
                      key={hadith.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden group hover:shadow-xl transition-all duration-500"
                    >
                      <div className="p-6 border-b border-slate-50 dark:border-slate-800 flex justify-between items-center bg-slate-50/30 dark:bg-slate-800/30">
                        <div className="flex items-center gap-3">
                          <span className="w-8 h-8 rounded-lg bg-brand-emerald/10 text-brand-emerald flex items-center justify-center text-xs font-black">
                            {hadith.hadithNumber}
                          </span>
                          <div>
                            <p className="text-[10px] font-black text-brand-emerald uppercase tracking-widest">{hadith.chapterName || t.hadith}</p>
                            {hadith.narrator && <p className="text-[10px] font-bold text-slate-400">{hadith.narrator}</p>}
                          </div>
                        </div>
                        <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">{selectedHadithCollection}</span>
                      </div>

                      <div className="p-8 space-y-6">
                        <p className="text-2xl font-bold text-slate-800 dark:text-slate-100 text-center leading-[2.2] quran-font" dir="rtl">
                          {hadith.arabicText}
                        </p>
                        
                        <div className="w-12 h-0.5 bg-slate-100 dark:bg-slate-800 mx-auto rounded-full transition-all group-hover:w-20"></div>

                        <div className="space-y-4">
                          <p className="text-lg font-bold text-slate-600 dark:text-slate-300 text-center leading-relaxed italic">
                            {hadith.kurdishText || hadith.englishText}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))
                ) : (
                  <div className="text-center py-20 text-slate-400">
                    <MessageSquare size={40} className="mx-auto mb-4 opacity-20" />
                    <p>{t.noHadithsFound}</p>
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {currentView === 'hajj' && activeHajjSubView === 'menu' && (
            <motion.div key="hajj-menu" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
              <div className="text-center space-y-2 mb-12">
                <h2 className="text-4xl font-black text-brand-gold text-kurdish-display">{t.hajjHub}</h2>
                <p className="text-slate-400 font-bold uppercase tracking-[0.3em] text-[10px]">{t.guide} & {t.places}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  { id: 'umrah', icon: <Compass />, title: t.umrahSteps, color: 'bg-brand-emerald/10 text-brand-emerald', action: () => { setHajjType('umrah'); setHajjTab('steps'); setActiveHajjSubView('steps'); } },
                  { id: 'hajj', icon: <Plane />, title: t.hajjSteps, color: 'bg-brand-gold/10 text-brand-gold', action: () => { setHajjType('hajj'); setHajjTab('steps'); setActiveHajjSubView('steps'); } },
                  { id: 'miqats', icon: <MapPin />, title: t.miqats, color: 'bg-indigo-50 text-indigo-500', action: () => { setHajjTab('miqats'); setActiveHajjSubView('miqats'); } },
                  { id: 'places', icon: <Map />, title: t.sacredPlaces, color: 'bg-sky-50 text-sky-500', action: () => { setActiveHajjSubView('places'); } },
                  { id: 'ihram', icon: <Plane />, title: t.ihramGuide, color: 'bg-slate-100 text-slate-600', action: () => { setActiveHajjSubView('ihram'); setIhramStep(0); } },
                  { id: 'planner', icon: <Clock />, title: t.dailyPlanner, color: 'bg-rose-50 text-rose-500', action: () => { setActiveHajjSubView('planner'); } },
                  { id: 'mistakes', icon: <X />, title: t.commonMistakes, color: 'bg-rose-50 text-rose-500', action: () => { setHajjTab('mistakes'); setActiveHajjSubView('mistakes'); } },
                  { id: 'tawaf', icon: <Compass />, title: t.tawafCounter, color: 'bg-amber-50 text-amber-600', action: () => { setHajjTab('tawaf'); setActiveHajjSubView('dhikr'); } },
                ].map((item) => (
                  <button 
                    key={item.id}
                    onClick={item.action}
                    className="p-8 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-[2.5rem] shadow-sm hover:shadow-xl transition-all flex flex-col items-center gap-6 group text-center"
                  >
                    <div className={`w-20 h-20 ${item.color} rounded-3xl flex items-center justify-center group-hover:scale-110 transition-transform shadow-inner`}>
                      {item.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-slate-800 mb-1">{item.title}</h3>
                      <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest leading-relaxed">بۆ زانیاری زیاتر کرتە لێرە بکە</p>
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {currentView === 'hajj' && activeHajjSubView !== 'menu' && (
            <motion.div key="hajj-content" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
              <div className="flex items-center gap-4 mb-8">
                <button 
                  onClick={() => setActiveHajjSubView('menu')}
                  className="p-4 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl text-slate-400 dark:text-slate-500 hover:text-brand-emerald transition-colors shadow-sm"
                >
                  <ChevronLeft size={24} />
                </button>
                <h2 className="text-2xl font-black text-brand-gold text-kurdish-display">
                  {activeHajjSubView === 'steps' ? (hajjType === 'umrah' ? t.umrahSteps : t.hajjSteps) :
                   activeHajjSubView === 'miqats' ? t.miqats :
                   activeHajjSubView === 'places' ? t.sacredPlaces :
                   activeHajjSubView === 'ihram' ? t.ihramGuide :
                   activeHajjSubView === 'planner' ? t.dailyPlanner :
                   activeHajjSubView === 'mistakes' ? t.commonMistakes :
                   activeHajjSubView === 'dhikr' ? t.tawafCounter : ''}
                </h2>
              </div>

              <div className="space-y-8">
                {activeHajjSubView === 'miqats' && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
                    {/* Clothing Section */}
                    <div className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] shadow-sm border border-slate-100 dark:border-slate-800">
                      <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 bg-brand-emerald/10 dark:bg-brand-emerald/20 rounded-xl flex items-center justify-center text-brand-emerald dark:text-brand-emerald">
                          <Shirt size={20} />
                        </div>
                        <h3 className="text-xl font-black text-slate-800 dark:text-slate-100">{t.ihram} {t.guide}</h3>
                      </div>

                                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Men Clothing */}
                        <div className="bg-sky-50/50 p-6 rounded-3xl border border-sky-100 flex flex-col items-center">
                          <div className="w-32 h-44 bg-white rounded-2xl shadow-sm border border-sky-100 mb-4 flex items-center justify-center relative overflow-hidden">
                            <svg viewBox="0 0 100 120" className="w-full h-full text-slate-200">
                              {/* Minimalist Man Ihram representation */}
                              <rect x="30" y="45" width="40" height="60" rx="2" fill="white" stroke="currentColor" strokeWidth="0.5" />
                              <path d="M30 45 Q50 35 70 45" fill="none" stroke="currentColor" strokeWidth="1" />
                              <rect x="30" y="15" width="40" height="30" rx="10" fill="none" stroke="currentColor" strokeWidth="0.2" strokeDasharray="2 2" />
                            </svg>
                            <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
                              <div className="w-20 h-1 bg-white shadow-sm rounded-full mb-1" />
                              <div className="w-20 h-24 bg-white shadow-inner flex flex-col gap-1 p-2">
                                <div className="w-full h-10 border-b border-slate-100" />
                                <div className="w-full h-10" />
                              </div>
                            </div>
                            <span className="absolute bottom-2 text-[8px] font-black text-sky-300 uppercase">ڕیدا و ئیزار</span>
                          </div>
                          <h4 className="font-bold text-sky-800 mb-2 flex items-center gap-2">
                             <User size={16} /> {ihramClothingData.men.title[language]}
                          </h4>
                          <p className="text-sm text-slate-600 mb-4 leading-relaxed text-center">{ihramClothingData.men.description[language]}</p>
                          <div className="space-y-2 w-full">
                            {ihramClothingData.men.notes.map((note, idx) => (
                              <div key={idx} className="flex items-start gap-2 text-xs text-sky-700 font-medium justify-center">
                                <span className="mt-1 w-1.5 h-1.5 rounded-full bg-sky-400 shrink-0" />
                                <span>{note[language]}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Women Clothing */}
                        <div className="bg-rose-50/50 p-6 rounded-3xl border border-rose-100 flex flex-col items-center">
                          <div className="w-32 h-44 bg-white rounded-2xl shadow-sm border border-rose-100 mb-4 flex items-center justify-center relative overflow-hidden">
                            <svg viewBox="0 0 100 120" className="w-full h-full text-slate-200">
                              {/* Minimalist Woman Modest clothing representation */}
                              <path d="M30 20 Q50 10 70 20 L80 110 Q50 115 20 110 Z" fill="white" stroke="currentColor" strokeWidth="0.5" />
                              <circle cx="50" cy="25" r="10" fill="none" stroke="currentColor" strokeWidth="0.2" strokeDasharray="2 2" />
                            </svg>
                            <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
                               <div className="w-16 h-16 bg-white rounded-full shadow-inner mb-2" />
                               <div className="w-20 h-28 bg-white shadow-inner rounded-t-3xl" />
                            </div>
                            <span className="absolute bottom-2 text-[8px] font-black text-rose-300 uppercase">جلی داپۆشراو</span>
                          </div>
                          <h4 className="font-bold text-rose-800 mb-2 flex items-center gap-2">
                             <User size={16} /> {ihramClothingData.women.title[language]}
                          </h4>
                          <p className="text-sm text-slate-600 mb-4 leading-relaxed text-center">{ihramClothingData.women.description[language]}</p>
                          <div className="space-y-2 w-full">
                            {ihramClothingData.women.notes.map((note, idx) => (
                              <div key={idx} className="flex items-start gap-2 text-xs text-rose-700 font-medium justify-center">
                                <span className="mt-1 w-1.5 h-1.5 rounded-full bg-rose-400 shrink-0" />
                                <span>{note[language]}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Miqat Selector Section */}
                    <div className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] shadow-sm border border-slate-100 dark:border-slate-800">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 bg-brand-emerald/10 dark:bg-brand-emerald/20 rounded-xl flex items-center justify-center text-brand-emerald dark:text-brand-emerald">
                          <MapPin size={20} />
                        </div>
                        <h3 className="text-xl font-black text-slate-800 dark:text-slate-100">{t.miqats}</h3>
                      </div>
                      <p className="text-sm text-slate-500 dark:text-slate-400 mb-6 font-medium">{t.miqatDescription}</p>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                        {miqatsData.map(miqat => (
                          <button
                            key={miqat.id}
                            onClick={() => setSelectedMiqat(miqat.id)}
                            className={`p-4 rounded-2xl border text-right transition-all group ${selectedMiqat === miqat.id ? 'bg-brand-emerald border-brand-emerald text-white shadow-lg' : 'bg-slate-50 border-slate-100 text-slate-600 hover:border-brand-emerald'}`}
                          >
                            <p className="text-[10px] font-black uppercase tracking-tighter mb-1 opacity-60">
                              {miqat.region[language]}
                            </p>
                            <p className="font-bold text-sm tracking-tight">{miqat.name[language]}</p>
                          </button>
                        ))}
                      </div>

                      <AnimatePresence mode="wait">
                        {selectedMiqat && (
                          <motion.div
                            key={selectedMiqat}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="bg-brand-emerald/5 p-6 rounded-3xl border border-brand-emerald/10"
                          >
                            {miqatsData.find(m => m.id === selectedMiqat) && (
                              <>
                                <h4 className="text-lg font-black text-brand-emerald mb-4">
                                  {miqatsData.find(m => m.id === selectedMiqat)?.name[language]}
                                </h4>
                                <p className="text-slate-700 font-medium leading-relaxed">
                                  {miqatsData.find(m => m.id === selectedMiqat)?.description[language]}
                                </p>
                              </>
                            )}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </motion.div>
                )}

                {activeHajjSubView === 'steps' && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="space-y-12"
                  >
                    {(hajjType === 'umrah' ? umrahSteps : hajjStepsExtended).map((step, idx) => (
                      <div key={step.id} className="relative">
                        <div className="flex gap-6 items-start">
                          <div className="w-12 h-12 bg-brand-emerald text-white rounded-2xl flex items-center justify-center font-black shrink-0 shadow-lg rotate-3">
                            {idx + 1}
                          </div>
                          <div className="flex-1">
                            <h3 className="text-xl font-bold text-slate-800 mb-2 text-kurdish-display text-right">{step.title[language]}</h3>
                            <p className="text-slate-600 leading-relaxed mb-6 text-kurdish-display text-right">{step.description[language]}</p>
                            
                            <div className="space-y-4">
                              {(step.dua || step.hadith || step.sunnah || step.mistakes || step.menNotes || step.womenNotes) && (
                                <div className="bg-slate-50 p-6 rounded-3xl space-y-4 border border-slate-100">
                                  {step.dua && (
                                    <div className="space-y-2">
                                      <div className="flex items-center gap-2">
                                        <MessageSquare size={14} className="text-brand-emerald" />
                                        <p className="text-[10px] font-black text-brand-emerald uppercase tracking-widest">{t.dua}</p>
                                      </div>
                                      <p className="text-xl font-bold text-slate-800 text-right" dir="rtl">{step.dua.ar}</p>
                                      <p className="text-sm text-slate-500 italic text-right">
                                        {language === 'en' ? step.dua.en : language === 'ku' ? step.dua.ku : ''}
                                      </p>
                                    </div>
                                  )}

                                  {(step.menNotes || step.womenNotes) && (
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4 border-t border-slate-100">
                                      {step.menNotes && (
                                        <div className="space-y-2 p-4 bg-sky-50/50 rounded-2xl border border-sky-100">
                                          <div className="flex items-center gap-2">
                                            <User size={14} className="text-sky-600" />
                                            <p className="text-[10px] font-black text-sky-600 uppercase tracking-widest">{t.menInstructions}</p>
                                          </div>
                                          <p className="text-sm font-bold text-slate-700 leading-relaxed text-kurdish-display text-right">
                                            {language === 'en' ? step.menNotes.en : language === 'ku' ? step.menNotes.ku : step.menNotes.ar}
                                          </p>
                                        </div>
                                      )}
                                      {step.womenNotes && (
                                        <div className="space-y-2 p-4 bg-rose-50/50 rounded-2xl border border-rose-100">
                                          <div className="flex items-center gap-2">
                                            <User size={14} className="text-rose-600" />
                                            <p className="text-[10px] font-black text-rose-600 uppercase tracking-widest">{t.womenInstructions}</p>
                                          </div>
                                          <p className="text-sm font-bold text-slate-700 leading-relaxed text-kurdish-display text-right">
                                            {language === 'en' ? step.womenNotes.en : language === 'ku' ? step.womenNotes.ku : step.womenNotes.ar}
                                          </p>
                                        </div>
                                      )}
                                    </div>
                                  )}

                                  {step.sunnah && (
                                    <div className="space-y-1 pt-2 border-t border-slate-200">
                                      <p className="text-[10px] font-black text-blue-500 uppercase tracking-widest">{t.sunnahLabel}</p>
                                      <p className="text-sm font-bold text-slate-700 text-right" dir="rtl">{step.sunnah.ar}</p>
                                      <p className="text-sm text-slate-500 text-right">
                                        {language === 'en' ? (step.sunnah.en || step.sunnah.ku) : step.sunnah.ku}
                                      </p>
                                    </div>
                                  )}
                                  {step.hadith && (
                                    <div className="space-y-1 pt-2 border-t border-slate-200">
                                      <p className="text-[10px] font-black text-rose-500 uppercase tracking-widest">{t.hadithLabel}</p>
                                      <p className="text-sm font-bold text-slate-700 text-right" dir="rtl">{step.hadith.ar}</p>
                                      <p className="text-sm text-slate-500 text-right">
                                        {language === 'en' ? (step.hadith.en || step.hadith.ku) : step.hadith.ku}
                                      </p>
                                    </div>
                                  )}
                                  {step.mistakes && (
                                    <div className="space-y-1 pt-2 border-t border-slate-200">
                                      <p className="text-[10px] font-black text-amber-600 uppercase tracking-widest">{t.mistakesLabel}</p>
                                      <p className="text-sm text-amber-800 font-medium text-right">{step.mistakes[language]}</p>
                                    </div>
                                  )}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                        {idx < (hajjType === 'umrah' ? umrahSteps : hajjStepsExtended).length - 1 && (
                          <div className="absolute left-6 top-16 bottom-0 w-px bg-dashed border-l border-slate-100 -mb-12"></div>
                        )}
                      </div>
                    ))}
                  </motion.div>
                )}

                {activeHajjSubView === 'mistakes' && (
                  <motion.div 
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="grid grid-cols-1 gap-4"
                  >
                    {commonHajjMistakes.map((m, idx) => (
                      <div key={idx} className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 overflow-hidden relative group">
                        <div className="absolute top-0 left-0 w-1 h-full bg-rose-500"></div>
                        <div className="flex flex-col gap-4">
                          <div>
                            <div className="flex items-center gap-2 mb-2">
                              <span className="w-5 h-5 rounded-full bg-rose-50 text-rose-500 text-[8px] font-black flex items-center justify-center">!</span>
                              <h3 className="text-[10px] font-black text-rose-500 uppercase tracking-widest">{t.mistake}</h3>
                            </div>
                            <p className="text-base font-bold text-slate-800 leading-relaxed text-kurdish-display">
                              {language === 'en' ? m.mistake.en : language === 'ku' ? m.mistake.ku : m.mistake.ar}
                            </p>
                          </div>
                          <div className="pt-4 border-t border-slate-50">
                            <div className="flex items-center gap-2 mb-2">
                              <span className="w-5 h-5 rounded-full bg-brand-emerald/10 text-brand-emerald text-[8px] font-black flex items-center justify-center">✓</span>
                              <h3 className="text-[10px] font-black text-brand-emerald dark:text-emerald-400 uppercase tracking-widest">{t.correction}</h3>
                            </div>
                            <p className="text-sm font-medium text-slate-600 leading-relaxed text-kurdish-display">
                              {language === 'en' ? m.correction.en : language === 'ku' ? m.correction.ku : m.correction.ar}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </motion.div>
                )}

                {hajjTab === 'virtues' && (
                  <motion.div 
                    key="virtues"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="grid grid-cols-1 gap-4"
                  >
                    {(hajjType === 'umrah' ? umrahVirtues : hajjVirtues).map((v, i) => (
                      <div key={i} className="bg-brand-emerald/5 p-8 rounded-[2.5rem] border border-brand-emerald/10 text-center">
                        <Quote size={20} className="text-brand-emerald/20 mx-auto mb-4" />
                        <p className="text-xl font-bold text-slate-800 mb-4 leading-relaxed" dir="rtl">{v.ar}</p>
                        <p className="text-sm text-slate-600 mb-4 text-kurdish-display font-medium">
                          {language === 'en' ? v.en : language === 'ku' ? v.ku : v.ar}
                        </p>
                        <p className="text-[10px] font-black text-brand-emerald/40 uppercase tracking-widest tracking-[0.2em]">{v.ref}</p>
                      </div>
                    ))}
                  </motion.div>
                )}

                {activeHajjSubView === 'places' && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {sacredPlaces.map((place) => (
                        <div key={place.id} className="bg-white rounded-[2.5rem] shadow-sm border border-slate-100 overflow-hidden group">
                          <div className="h-48 overflow-hidden">
                            <img src={place.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                          </div>
                          <div className="p-6">
                            <h3 className="text-xl font-black text-slate-800 mb-2 text-right">{place.name[language]}</h3>
                            <p className="text-sm text-slate-500 leading-relaxed text-right font-medium text-kurdish-display">{place.description[language]}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {activeHajjSubView === 'ihram' && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-xl mx-auto">
                    <div className="bg-white rounded-[3rem] shadow-xl border border-slate-100 overflow-hidden">
                      <div className="h-64 relative overflow-hidden">
                        <AnimatePresence mode="wait">
                          <motion.img 
                            key={ihramStep}
                            initial={{ scale: 1.1, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            transition={{ duration: 0.5 }}
                            src={ihramSteps[ihramStep].image} 
                            className="w-full h-full object-cover" 
                          />
                        </AnimatePresence>
                        <div className="absolute inset-x-0 bottom-0 py-6 px-8 bg-gradient-to-t from-black/80 to-transparent">
                          <h3 className="text-2xl font-black text-white text-right">
                            {ihramSteps[ihramStep].title[language]}
                          </h3>
                        </div>
                        <div className="absolute top-4 left-4 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-black text-white uppercase tracking-widest">
                          Step {ihramStep + 1} / {ihramSteps.length}
                        </div>
                      </div>
                      
                      <div className="p-8">
                        <p className="text-lg text-slate-600 font-medium leading-relaxed mb-8 text-right text-kurdish-display">
                          {ihramSteps[ihramStep].description[language]}
                        </p>

                        <div className="flex gap-4">
                          <button 
                            onClick={() => setIhramStep(prev => Math.max(0, prev - 1))}
                            disabled={ihramStep === 0}
                            className="flex-1 py-4 px-6 bg-slate-100 text-slate-500 rounded-2xl font-black disabled:opacity-20 transition-all font-kurdish-display"
                          >
                            {t.back}
                          </button>
                          <button 
                            onClick={() => {
                              if (ihramStep < ihramSteps.length - 1) setIhramStep(prev => prev + 1);
                              else setActiveHajjSubView('menu');
                            }}
                            className="flex-[2] py-4 px-6 bg-brand-emerald text-white rounded-2xl font-black shadow-lg hover:shadow-xl transition-all font-kurdish-display"
                          >
                            {ihramStep === ihramSteps.length - 1 ? t.done : t.next}
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeHajjSubView === 'planner' && (
                  <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="max-w-xl mx-auto space-y-6">
                    <div className="bg-white p-8 rounded-[3rem] shadow-xl border border-slate-100">
                      <div className="flex items-center gap-4 mb-8">
                        <div className="w-12 h-12 bg-rose-50 text-rose-500 rounded-2xl flex items-center justify-center">
                          <Stars size={24} />
                        </div>
                        <h2 className="text-2xl font-black text-slate-800 text-kurdish-display">{t.arafahDay}</h2>
                      </div>

                      <div className="space-y-3">
                        {arafahTasks.map((task) => (
                          <button 
                            key={task.id}
                            onClick={() => toggleTask(task.id)}
                            className={`w-full p-6 rounded-2xl flex items-center justify-between transition-all border-2 text-kurdish-display ${plannerTasks.includes(task.id) ? 'bg-brand-emerald/5 border-brand-emerald/20 text-brand-emerald' : 'bg-white border-slate-100 text-slate-600'}`}
                          >
                            <span className="text-lg font-bold">{task.title[language]}</span>
                            <div className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all ${plannerTasks.includes(task.id) ? 'bg-brand-emerald border-brand-emerald text-white' : 'border-slate-200 bg-white'}`}>
                              {plannerTasks.includes(task.id) && <Heart size={14} fill="currentColor" />}
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeHajjSubView === 'dhikr' && (
                  <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="max-w-xl mx-auto">
                    <div className="bg-white p-8 rounded-[3rem] shadow-xl border border-slate-100 text-center relative overflow-hidden">
                      <div className="absolute top-0 left-0 w-full h-2 bg-brand-emerald"></div>
                      
                      <div className="mb-6">
                        <div className="inline-flex items-center justify-center bg-brand-emerald/10 px-6 py-2 rounded-full mb-2">
                          <span className="text-3xl font-black text-brand-emerald">{tawafRound}</span>
                          <span className="text-brand-emerald/40 mx-2 text-xl font-black">/</span>
                          <span className="text-xl font-black text-brand-emerald/40">7</span>
                        </div>
                        <h2 className="text-sm font-black text-slate-400 uppercase tracking-[0.2em]">{t.round}</h2>
                      </div>

                      <div className="relative h-64 flex items-center justify-center mb-10">
                        <div className="relative w-40 h-40">
                          <div className="absolute inset-0 bg-slate-900 rounded-xl shadow-2xl overflow-hidden border-4 border-slate-800">
                            <div className="absolute top-8 left-0 w-full h-4 bg-brand-gold shadow-[0_0_15px_rgba(234,179,8,0.3)] flex items-center justify-center overflow-hidden">
                               <div className="flex gap-4 opacity-50">
                                 {[...Array(10)].map((_, i) => (
                                   <div key={i} className="text-[6px] text-white font-black whitespace-nowrap">الله أكبر</div>
                                 ))}
                               </div>
                            </div>
                            <div className="absolute bottom-4 right-4 w-10 h-16 bg-brand-gold/90 rounded-sm border-2 border-brand-gold/50 shadow-inner"></div>
                            <div className="absolute inset-0 bg-gradient-to-tr from-black/60 to-transparent"></div>
                          </div>
                          <div className="absolute -inset-12 border-2 border-dashed border-slate-100 rounded-full animate-[spin_20s_linear_infinite]"></div>
                          <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-white rounded-full border-4 border-brand-emerald shadow-lg flex items-center justify-center z-10">
                            <div className="w-2 h-2 bg-slate-900 rounded-full"></div>
                          </div>
                          <motion.div 
                            animate={{ rotate: (tawafRound - 1) * (360 / 7) }}
                            transition={{ type: "spring", stiffness: 50, damping: 15 }}
                            className="absolute -inset-16 pointer-events-none"
                          >
                            <div className="absolute top-0 left-1/2 -ml-3 w-6 h-6 bg-brand-emerald rounded-full border-4 border-white shadow-xl z-20 flex items-center justify-center"></div>
                          </motion.div>
                        </div>
                      </div>

                      <AnimatePresence mode="wait">
                        <motion.div 
                          key={tawafRound}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="bg-brand-emerald/5 p-8 rounded-[2.5rem] mb-8 border border-brand-emerald/10"
                        >
                          <p className="text-2xl font-bold text-slate-800 mb-4 leading-relaxed quran-font" dir="rtl">
                            {tawafDhikrs[tawafRound - 1].dhikr.ar}
                          </p>
                          <p className="text-base text-brand-emerald font-bold leading-relaxed text-kurdish-display">
                            {language === 'en' ? tawafDhikrs[tawafRound - 1].dhikr.en : language === 'ku' ? tawafDhikrs[tawafRound - 1].dhikr.ku : ''}
                          </p>
                        </motion.div>
                      </AnimatePresence>

                      <div className="flex gap-4">
                        <button 
                          onClick={() => setTawafRound(1)}
                          className="flex-1 bg-slate-100 text-slate-500 py-4 rounded-2xl font-black"
                        >
                          {t.reset}
                        </button>
                        <button 
                          onClick={() => setTawafRound(prev => (prev < 7 ? prev + 1 : 1))}
                          className="flex-[2] bg-brand-emerald text-white py-4 rounded-2xl font-black shadow-lg"
                        >
                          <Compass size={20} className="inline mr-2" />
                          {tawafRound === 7 ? t.reset : t.nextRound}
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.div>
          )}

          {currentView === 'tasbih' && (
            <motion.div key="tasbih" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
              <Tasbih language={language} t={t} onIncrement={incrementTasbih} />
            </motion.div>
          )}

          {currentView === 'names' && (
            <motion.div key="names" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <NamesOfAllah language={language} t={t} />
            </motion.div>
          )}

          {currentView === 'prayer-times' && (
            <motion.div key="prayer-times" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
              <PrayerTimes language={language} t={t} />
            </motion.div>
          )}

          {currentView === 'settings' && (
            <motion.div key="settings" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="max-w-2xl mx-auto space-y-8">
              <div className="bg-white p-10 rounded-[3rem] shadow-sm border border-slate-100">
                <h2 className="text-2xl font-black text-slate-800 mb-8 flex items-center gap-3">
                  <Menu className="text-brand-emerald" />
                  {t.settings}
                </h2>

                <div className="space-y-10">
                  {/* Font Size */}
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <label className="text-sm font-black text-slate-500 uppercase tracking-widest">{t.fontSize}</label>
                      <span className="text-xs font-black text-brand-emerald bg-brand-emerald/10 px-3 py-1 rounded-full">{globalFontSize}px</span>
                    </div>
                    <input 
                      type="range" 
                      min="12" 
                      max="32" 
                      value={globalFontSize}
                      onChange={(e) => setGlobalFontSize(parseInt(e.target.value))}
                      className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-brand-emerald"
                    />
                    <div className="flex justify-between text-[10px] font-bold text-slate-300">
                       <span>Small</span>
                       <span>Medium</span>
                       <span>Large</span>
                    </div>
                  </div>

                  {/* Font Family */}
                  <div className="space-y-4">
                    <label className="text-sm font-black text-slate-500 uppercase tracking-widest">{t.fontFamily}</label>
                    <div className="grid grid-cols-3 gap-3">
                      {[
                        { id: 'kurdish', name: 'Kurdish', label: 'Recommended' },
                        { id: 'sans', name: 'Sans', label: 'Standard' },
                        { id: 'mono', name: 'Mono', label: 'Clean' }
                      ].map(f => (
                        <button
                          key={f.id}
                          onClick={() => setGlobalFontFamily(f.id as any)}
                          className={`p-4 rounded-2xl border-2 transition-all flex flex-col items-center gap-1 ${globalFontFamily === f.id ? 'bg-brand-emerald border-brand-emerald text-white' : 'bg-slate-50 border-slate-100 text-slate-600 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-200'}`}
                        >
                          <span className={`text-lg font-bold font-${f.id}`}>Abc</span>
                          <span className="text-[10px] font-black uppercase tracking-tighter opacity-60">{f.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Dark Mode Toggle */}
                  <div className="space-y-4 pt-6 border-t border-slate-50 dark:border-slate-800">
                    <div className="flex items-center justify-between">
                       <div className="space-y-1">
                         <label className="text-sm font-black text-slate-500 uppercase tracking-widest">{t.darkMode}</label>
                         <p className="text-[10px] text-slate-400 font-bold">بۆ ئاسوودەیی چاوەکانت</p>
                       </div>
                       <button 
                         onClick={() => setThemeMode(prev => prev === 'light' ? 'dark' : 'light')}
                         className={`w-12 h-6 rounded-full relative transition-all ${themeMode === 'dark' ? 'bg-brand-emerald' : 'bg-slate-200'}`}
                       >
                         <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${themeMode === 'dark' ? 'left-7' : 'left-1'}`}></div>
                       </button>
                    </div>
                  </div>

                  {/* Language Quick Toggle */}
                  <div className="space-y-4 pt-6 border-t border-slate-50">
                    <label className="text-sm font-black text-slate-500 uppercase tracking-widest">Notification Alerts</label>
                    <div className="flex items-center justify-between bg-slate-50 p-4 rounded-2xl">
                       <span className="text-sm font-bold text-slate-600">
                         {notificationsEnabled ? 'Alerts are enabled' : 'Enable smart reminders'}
                       </span>
                       <button 
                         onClick={notificationsEnabled ? () => { setNotificationsEnabled(false); localStorage.setItem('notificationsEnabled', 'false'); } : requestNotificationPermission}
                         className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase transition-all ${notificationsEnabled ? 'bg-rose-50 text-rose-500' : 'bg-brand-emerald text-white shadow-md'}`}
                       >
                         {notificationsEnabled ? 'Disable' : 'Enable'}
                       </button>
                    </div>
                  </div>

                  {/* Language Quick Toggle */}
                  <div className="space-y-4 pt-6 border-t border-slate-50">
                    <label className="text-sm font-black text-slate-500 uppercase tracking-widest">{t.language}</label>
                    <div className="flex gap-2">
                      {['ku', 'ar', 'en'].map(l => (
                        <button 
                          key={l}
                          onClick={() => setLanguage(l as any)}
                          className={`flex-1 py-4 rounded-2xl font-black text-sm transition-all ${language === l ? 'bg-slate-800 text-white' : 'bg-slate-50 text-slate-400'}`}
                        >
                          {l === 'ku' ? 'کوردی' : l === 'ar' ? 'العربية' : 'English'}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Notifications */}
                  <div className="space-y-4 pt-6 border-t border-slate-50">
                    <div className="flex items-center justify-between">
                       <div className="space-y-1">
                         <label className="text-sm font-black text-slate-500 uppercase tracking-widest">بیریخستنەوە (Notifications)</label>
                         <p className="text-[10px] text-slate-400 font-bold">بیرخستنەوەی زیکری بەیانیان و ئێواران</p>
                       </div>
                       <button 
                         onClick={requestNotifications}
                         className={`w-12 h-6 rounded-full relative transition-all ${notificationsEnabled ? 'bg-brand-emerald' : 'bg-slate-200'}`}
                       >
                         <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${notificationsEnabled ? 'left-7' : 'left-1'}`}></div>
                       </button>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-brand-emerald/10 p-8 rounded-[3rem] border border-brand-emerald/20 text-center">
                 <p className="text-brand-emerald font-bold text-sm tracking-tight leading-relaxed">
                   {language === 'ku' ? 'هەموو ڕێکخستنەکان لەم ئامێرەدا پاشەکەوت دەبن.' : 'All settings are saved locally on this device.'}
                 </p>
              </div>
            </motion.div>
          )}

          {currentView === 'marriage' && activeMarriageSubView === 'menu' && (
            <motion.div key="marriage-menu" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
              <div className="text-center space-y-2 mb-12">
                <h2 className="text-4xl font-black text-brand-emerald dark:text-brand-gold text-kurdish-display">{t.marriage}</h2>
                <p className="text-slate-400 font-bold uppercase tracking-[0.3em] text-[10px]">{t.guide} & {t.rights}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  { intimacyStep: 0 }, // Dummy for menu
                  { id: 'engagement', icon: <Heart />, title: t.engagement, color: 'bg-rose-50 text-rose-500' },
                  { id: 'nikah', icon: <BookOpen />, title: t.nikah, color: 'bg-sky-50 text-sky-500' },
                  { id: 'rights', icon: <User />, title: t.rights, color: 'bg-brand-emerald/10 text-brand-emerald' },
                  { id: 'pregnancy', icon: <Stars />, title: t.pregnancy, color: 'bg-amber-50 text-amber-500' },
                  { id: 'intimacy', icon: <Heart />, title: t.intimacy, color: 'bg-purple-50 text-purple-500' },
                  { id: 'love', icon: <Heart />, title: t.love, color: 'bg-pink-50 text-pink-500', action: () => setActiveMarriageSubView('love') },
                  { id: 'all', icon: <Menu />, title: t.all || 'هەمووی', color: 'bg-slate-50 text-slate-500' },
                ].filter(c => c.id).map((cat) => (
                  <button 
                    key={cat.id}
                    onClick={cat.action || (() => {
                      setSelectedMarriageCategory(cat.id as any);
                      setActiveMarriageSubView('content');
                    })}
                    className="p-8 bg-white border border-slate-100 rounded-[2.5rem] shadow-sm hover:shadow-xl transition-all flex flex-col items-center gap-6 group text-center"
                  >
                    <div className={`w-20 h-20 ${cat.color} rounded-3xl flex items-center justify-center group-hover:scale-110 transition-transform shadow-inner`}>
                      {cat.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-slate-800 mb-1">{cat.title}</h3>
                      <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest">بۆ زانیاری زیاتر کرتە لێرە بکە</p>
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {currentView === 'marriage' && (activeMarriageSubView === 'content' || activeMarriageSubView === 'love') && (
            <motion.div key="marriage-content" className="space-y-8">
              <div className="flex items-center gap-4 mb-8">
                <button 
                  onClick={() => setActiveMarriageSubView('menu')}
                  className="p-4 bg-white border border-slate-100 rounded-2xl text-slate-400 hover:text-brand-emerald transition-colors shadow-sm"
                >
                  <ChevronLeft size={24} />
                </button>
                <h2 className="text-2xl font-black text-brand-emerald dark:text-emerald-400 text-kurdish-display">
                  {activeMarriageSubView === 'love' ? t.love : (selectedMarriageCategory === 'all' ? t.marriage : ((t as any)[selectedMarriageCategory] || intimacyGuideData[0].title[language]))}
                </h2>
              </div>

              <div className="space-y-6">
                {activeMarriageSubView === 'love' && (
                  <motion.div key="love-view" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8 pb-32">
                    <div className="grid grid-cols-1 gap-6 max-w-3xl mx-auto">
                      {loveWisdom.map((item) => (
                        <div key={item.id} className="bg-white dark:bg-slate-900 p-8 rounded-[3rem] shadow-sm border border-slate-100 dark:border-slate-800 space-y-6 group hover:shadow-xl transition-all duration-500">
                          <div className="flex justify-between items-center">
                            <span className="text-[10px] font-black bg-rose-50 dark:bg-rose-900/30 text-rose-500 px-4 py-1.5 rounded-full uppercase tracking-widest">
                              {(t as any)[item.type] || item.type}
                            </span>
                            {item.reference && <span className="text-[10px] text-slate-300 dark:text-slate-600 font-bold">{item.reference}</span>}
                          </div>
                          <p className="text-2xl font-bold text-slate-800 dark:text-slate-100 text-center leading-[2.2] quran-font px-4" dir="rtl">{item.textAr}</p>
                          <div className="w-12 h-1 bg-rose-100 dark:bg-rose-900/20 mx-auto rounded-full group-hover:w-20 transition-all"></div>
                          <p className="text-lg font-bold text-slate-600 dark:text-slate-300 text-center leading-relaxed italic">
                            {language === 'en' ? item.textEn : language === 'ar' ? item.textAr : item.textKu}
                          </p>
                          {item.noteKu && (
                            <div className="bg-brand-emerald/5 dark:bg-brand-emerald/10 p-6 rounded-[2rem] border border-brand-emerald/10 dark:border-brand-emerald/20 mt-4">
                              <p className="text-[10px] font-black text-brand-emerald uppercase tracking-widest mb-2 flex items-center gap-2">
                                <ShieldCheck size={12} /> {t.noteLabel}
                              </p>
                              <p className="text-sm font-bold text-slate-700 dark:text-brand-emerald/80 leading-relaxed text-right" dir="rtl">
                                {language === 'en' ? (item.noteEn || item.noteKu) : item.noteKu}
                              </p>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
                {selectedMarriageCategory === 'intimacy' && !isAgeVerified && (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="fixed inset-0 bg-black z-[100] flex items-center justify-center p-6 backdrop-blur-xl"
                  >
                    <div className="max-w-md w-full bg-slate-900 border border-slate-800 p-10 rounded-[3rem] text-center space-y-8 relative overflow-hidden">
                      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 via-white to-purple-500" />
                      <div className="w-20 h-20 bg-purple-500/20 rounded-3xl flex items-center justify-center mx-auto text-purple-400">
                        <User size={40} />
                      </div>
                      <div className="space-y-6">
                        <h2 className="text-2xl font-black text-white">{t.ageGateTitle}</h2>
                        <p className="text-slate-400 font-medium leading-relaxed">{t.ageGateDescription}</p>
                        
                        <div className="max-w-[200px] mx-auto">
                          <input 
                            type="number"
                            placeholder="Age / تەمەن"
                            value={ageInput}
                            onChange={(e) => setAgeInput(e.target.value)}
                            className="w-full bg-slate-800 border-2 border-slate-700 rounded-2xl px-6 py-4 text-white text-center font-black text-2xl focus:ring-2 focus:ring-purple-500 outline-none transition-all"
                          />
                        </div>
                      </div>

                      {showAgeError && (
                        <motion.p 
                          initial={{ scale: 0.9, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          className="text-rose-400 text-xs font-black bg-rose-400/10 py-2 rounded-xl"
                        >
                          {t.underAgeWarning}
                        </motion.p>
                      )}

                      <div className="flex flex-col gap-3">
                        <button 
                          onClick={verifyAge}
                          className="w-full py-5 bg-purple-600 hover:bg-purple-500 text-white rounded-2xl font-black transition-all shadow-lg shadow-purple-600/20 active:scale-95"
                        >
                          {t.confirmAge}
                        </button>
                        <button 
                          onClick={() => setActiveMarriageSubView('menu')}
                          className="w-full py-4 text-slate-500 hover:text-slate-300 font-bold transition-colors"
                        >
                          {t.exit}
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}

                {selectedMarriageCategory === 'intimacy' && isAgeVerified && (
                  <motion.div 
                    key="intimacy-guide"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-8"
                  >
                    <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100 relative overflow-hidden">
                      {/* Progress Bar */}
                      <div className="absolute top-0 left-0 w-full h-1 bg-slate-100">
                        <motion.div 
                          className="h-full bg-purple-600"
                          animate={{ width: `${((intimacyStep + 1) / intimacyGuideData.length) * 100}%` }}
                        />
                      </div>

                      <div className="flex justify-between items-center mb-8">
                        <button 
                          onClick={() => setSelectedMarriageCategory('all')}
                          className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400 hover:bg-rose-50 hover:text-rose-500 transition-colors"
                        >
                          <X size={20} />
                        </button>
                        <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">
                          {t.step} {intimacyStep + 1} / {intimacyGuideData.length}
                        </span>
                      </div>

                        <AnimatePresence mode="wait">
                          <motion.div 
                            key={intimacyStep}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="space-y-8"
                          >
                            <div className="text-center space-y-4">
                              <h3 className="text-2xl font-black text-purple-900 dark:text-purple-200">{intimacyGuideData[intimacyStep].title[language]}</h3>
                            <div className="text-lg font-bold text-slate-700 dark:text-slate-300 leading-relaxed text-right md:text-center prose prose-slate max-w-none" dir="rtl">
                              <div className="markdown-body">
                                <ReactMarkdown>
                                  {intimacyGuideData[intimacyStep].content[language]}
                                </ReactMarkdown>
                              </div>
                            </div>
                            </div>

                          {intimacyGuideData[intimacyStep].hadithOrVerse && (
                            <div className="bg-purple-50/50 p-8 rounded-[2rem] border border-purple-100 space-y-6 text-center">
                              <p className="text-xl font-bold text-purple-900 leading-[2]" dir="rtl">
                                {intimacyGuideData[intimacyStep].hadithOrVerse.text[language]}
                              </p>
                              <p className="text-[10px] font-black text-purple-400 uppercase tracking-[0.2em]">
                                {intimacyGuideData[intimacyStep].hadithOrVerse.ref}
                              </p>
                            </div>
                          )}
                        </motion.div>
                      </AnimatePresence>

                      <div className="flex gap-4 mt-12">
                        <button 
                          disabled={intimacyStep === 0}
                          onClick={() => setIntimacyStep(s => s - 1)}
                          className="flex-1 py-5 bg-slate-50 text-slate-400 rounded-2xl font-black text-xs disabled:opacity-20 transition-all hover:bg-slate-100"
                        >
                          {t.prevStep}
                        </button>
                        <button 
                          onClick={() => {
                            if (intimacyStep === intimacyGuideData.length - 1) {
                              setSelectedMarriageCategory('all');
                            } else {
                              setIntimacyStep(s => s + 1);
                            }
                          }}
                          className="flex-[2] py-5 bg-purple-600 text-white rounded-2xl font-black text-xs shadow-lg shadow-purple-600/20 transition-all hover:bg-purple-500 active:scale-95"
                        >
                          {intimacyStep === intimacyGuideData.length - 1 ? t.finish || 'کۆتایی' : t.nextStep}
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}

                {selectedMarriageCategory !== 'intimacy' && marriageSteps
                  .filter(step => selectedMarriageCategory === 'all' || step.category === selectedMarriageCategory)
                  .map((step) => (
                    <div key={step.id} className="bg-white p-8 rounded-[2.5rem] shadow-xl border border-slate-100 overflow-hidden relative">
                      <div className="absolute top-0 right-0 p-4">
                        <span className="text-[10px] font-black bg-pink-50 text-pink-500 px-3 py-1 rounded-full uppercase tracking-tighter">
                          {(t as any)[step.category]}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold text-slate-800 mb-4 text-center">{step.title[language]}</h3>
                      <p className="text-slate-600 leading-relaxed mb-8 text-center font-medium">
                        {step.description[language]}
                      </p>

                      <div className="space-y-6">
                        {step.verse && (
                          <div className="bg-brand-emerald/5 p-6 rounded-[2rem] border border-brand-emerald/10">
                            <p className="text-[10px] font-black text-brand-emerald uppercase tracking-widest mb-4 flex items-center gap-2">
                              <BookOpen size={12} /> {t.verseLabel}
                            </p>
                            <p className="text-xl font-bold text-slate-800 mb-4 text-center leading-[1.8]" dir="rtl">{step.verse.ar}</p>
                            <p className="text-sm font-medium text-slate-600 text-center italic">{step.verse[language === 'ar' ? 'ar' : language === 'en' ? 'en' : 'ku']}</p>
                            <p className="text-[9px] font-black text-brand-emerald/40 text-center mt-4 tracking-widest uppercase">{step.verse.ref}</p>
                          </div>
                        )}
                        {step.hadith && (
                          <div className="bg-amber-50/50 p-6 rounded-[2rem] border border-amber-100">
                            <p className="text-[10px] font-black text-amber-600 uppercase tracking-widest mb-4 flex items-center gap-2">
                              <Quote size={12} /> {t.hadithLabel}
                            </p>
                            <p className="text-xl font-bold text-slate-800 mb-4 text-center leading-[1.8]" dir="rtl">{step.hadith.ar}</p>
                            <p className="text-sm font-medium text-slate-600 text-center italic">{step.hadith[language === 'ar' ? 'ar' : language === 'en' ? 'en' : 'ku']}</p>
                            <p className="text-[9px] font-black text-amber-600/40 text-center mt-4 tracking-widest uppercase">{step.hadith.ref}</p>
                          </div>
                        )}
                        {step.notes && (
                          <div className="bg-rose-50/50 p-6 rounded-[2rem] border border-rose-100">
                            <p className="text-[10px] font-black text-rose-600 uppercase tracking-widest mb-2 flex items-center gap-2">
                              <MessageSquare size={12} /> {t.important_note || 'سەرنج'}
                            </p>
                            <p className="text-sm font-bold text-slate-700 leading-relaxed text-right" dir="rtl">
                              {step.notes[language]}
                            </p>
                          </div>
                        )}
                        {step.warning && (
                          <div className="bg-amber-50 dark:bg-amber-900/10 p-6 rounded-[2rem] border border-amber-100 dark:border-amber-900/20">
                            <p className="text-[10px] font-black text-amber-600 dark:text-amber-400 uppercase tracking-widest mb-2 flex items-center gap-2">
                              <ShieldCheck size={12} /> {t.warningLabel}
                            </p>
                            <p className="text-sm font-bold text-slate-700 dark:text-amber-200/80 leading-relaxed text-right" dir="rtl">
                              {step.warning[language]}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </main>

      <footer className="w-full py-16 px-6 border-t border-slate-100 dark:border-slate-800 mt-12 bg-slate-50/50 dark:bg-slate-900/30">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="flex flex-col items-center gap-2">
            <Heart size={24} className="text-rose-500 fill-rose-500/20" />
            <div className="h-px w-24 bg-gradient-to-r from-transparent via-slate-200 dark:via-slate-700 to-transparent"></div>
          </div>
          
          <div className="space-y-4">
            <p className="text-2xl md:text-3xl font-black text-brand-emerald dark:text-brand-gold font-kufi" dir="rtl">
              {t.ibrahimVerse}
            </p>
            <p className="text-sm md:text-base font-bold text-slate-500 dark:text-slate-400 font-kurdish leading-relaxed max-w-xl mx-auto px-6">
              {t.ibrahimTafsir}
            </p>
            <div className="pt-6">
              <p className="text-[10px] md:text-xs font-medium text-slate-400 italic tracking-widest uppercase opacity-70">
                {t.footerPrayer}
              </p>
            </div>
          </div>
          
          <div className="pt-8 text-[10px] font-black text-slate-300 dark:text-slate-700 uppercase tracking-widest flex items-center justify-center gap-4">
            <div className="w-2 h-2 rounded-full bg-brand-emerald/20"></div>
            {t.footerBranding}
            <div className="w-2 h-2 rounded-full bg-brand-emerald/20"></div>
          </div>
        </div>
      </footer>

      {/* Floating Home Button */}
      <AnimatePresence>
        {currentView !== 'home' && (
          <motion.button
            initial={{ scale: 0, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0, opacity: 0, y: 20 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setCurrentView('home')}
            className="fixed bottom-8 right-8 z-[60] w-14 h-14 bg-brand-emerald text-white rounded-full shadow-2xl flex items-center justify-center hover:bg-emerald-600 transition-colors border-4 border-white dark:border-slate-800"
          >
            <Home size={28} />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}

interface SidebarLinkProps {
  icon: any;
  label: string;
  active: boolean;
  onClick: () => void;
  key?: string | number;
}

function SidebarLink({ icon, label, active, onClick }: SidebarLinkProps) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center justify-between px-4 py-3.5 rounded-2xl transition-all ${
        active 
          ? 'bg-brand-emerald text-white shadow-lg shadow-brand-emerald/20' 
          : 'text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
      }`}
    >
      <div className="flex items-center gap-3">
        <span className={active ? 'text-brand-gold' : 'text-brand-emerald dark:text-brand-gold opacity-60 dark:opacity-80'}>{icon}</span>
        <span className="font-bold text-sm tracking-tight">{label}</span>
      </div>
      {active && <ChevronLeft size={16} />}
    </button>
  );
}
