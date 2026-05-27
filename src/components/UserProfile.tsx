import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  User, Camera, Trophy, Sparkles, BookOpen, Calendar, HelpCircle, 
  Trash2, Plus, Edit2, Download, Upload, FileCode, Check, Save, 
  Target, Award, Heart, CheckCircle2, ChevronRight, Activity, FileText,
  Lock, Unlock, Wifi, Cloud, LogOut, RefreshCw, Key, ShieldCheck, Mail, Database
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useUserStats } from '../hooks/useUserStats';
import { auth, db } from '../lib/firebase';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged
} from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { HomeFavorites } from './HomeFavorites';

interface UserProfileProps {
  language: 'ku' | 'ar' | 'en';
  t: any;
  favoriteZikrsIds: string[];
  favoriteSunnahIds: string[];
  onToggleZikr: (id: string) => void;
  onToggleSunnah: (id: string) => void;
  onIncrementTasbih: (count: number, title: string, id: string) => void;
  onCompleteZikr: (title: string, points: number, category: string, id: string) => void;
}

export function UserProfile({ 
  language, 
  t,
  favoriteZikrsIds,
  favoriteSunnahIds,
  onToggleZikr,
  onToggleSunnah,
  onIncrementTasbih,
  onCompleteZikr
}: UserProfileProps) {
  // 1. Personal Info in LocalStorage
  const [profileName, setProfileName] = useState<string>(() => {
    return localStorage.getItem('profile_name') || (language === 'ku' ? 'بەکارھێنەر' : language === 'ar' ? 'مستخدم زيكر' : 'Zikr User');
  });
  
  const [profileImage, setProfileImage] = useState<string>(() => {
    return localStorage.getItem('profile_image') || '';
  });

  const [isEditingName, setIsEditingName] = useState(false);
  const [tempName, setTempName] = useState(profileName);

  // 2. Personal Daily Goal
  const [dailyGoal, setDailyGoal] = useState<number>(() => {
    const saved = localStorage.getItem('profile_daily_goal');
    return saved ? parseInt(saved) : 100;
  });

  const { 
    stats, 
    userId, 
    deviceId, 
    isAnonymousUser, 
    syncId, 
    syncWithFirestore 
  } = useUserStats();

  const [activeTab, setActiveTab] = useState<'profile' | 'favorites' | 'sync'>('profile');

  // Load existing stats dynamically from our hook for continuous real-time rendering
  const userStatsLocal = stats;

  // Track online/network status locally
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Auth/Linking Form States
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authMode, setAuthMode] = useState<'link' | 'signin'>('link');
  const [authError, setAuthError] = useState<string | null>(null);
  const [authSuccess, setAuthSuccess] = useState<string | null>(null);
  const [isAuthLoading, setIsAuthLoading] = useState(false);

  // Calculate today's progress for quick stats
  const todayPoints = useMemo(() => {
    const todayStr = new Date().toISOString().split('T')[0];
    const history = userStatsLocal.history || [];
    const entry = history.find((h: any) => h.date === todayStr);
    return entry ? entry.points : 0;
  }, [userStatsLocal]);

  // Completed Sunnah prayers list
  const completedSunnah = useMemo(() => {
    try {
      const saved = localStorage.getItem('sunnah_completed_today');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  }, []);

  const progressPercentage = Math.round(Math.min(100, (todayPoints / dailyGoal) * 100));

  // Static Local Badges list with checks
  const availableBadges = [
    {
      id: 'thirsty_heart',
      title: { ku: 'دڵێکی تینوو', ar: 'قلب عطشان', en: 'Thirsty Heart' },
      description: { ku: 'یەکەم دەستپێکردنی زیکر', ar: 'بداية تلاوة الأذكار', en: 'First Dhikr started' },
      earned: userStatsLocal.points > 20,
      icon: <Award className="text-orange-400" size={24} />
    },
    {
      id: 'awake_heart',
      title: { ku: 'دڵێکی بەخەبەر', ar: 'قلب يقظ', en: 'Awake Heart' },
      description: { ku: 'گەیشتن بە ٥،٠٠٠ خاڵ', ar: 'الوصول إلى 5,000 نقطة', en: 'Reaching 5,000 points' },
      earned: userStatsLocal.points >= 5000,
      icon: <Award className="text-indigo-400" size={24} />
    },
    {
      id: 'regular_reciter',
      title: { ku: 'خوێنەری بەردەوام', ar: 'المداوم الخاشع', en: 'Frequent Reader' },
      description: { ku: 'خوێندنەوەی ٣٠+ لاپەڕەی قورئان', ar: 'قراءة ٣٠+ صفحة من القرآن', en: 'Read 30+ Quran pages' },
      earned: userStatsLocal.totalAyahsRead > 30,
      icon: <Award className="text-emerald-500" size={24} />
    },
    {
      id: 'sunnah_lover',
      title: { ku: 'نوێژکەری بەیانیان', ar: 'سيد النوافل', en: 'Morning Seeker' },
      description: { ku: 'ئەنجامدانی ٥ نوێژی سونەتی جیاواز', ar: 'أداء ٥ من النوافل والسنن', en: 'Perform 5 distinct Sunnah prayers' },
      earned: completedSunnah.length >= 3,
      icon: <Award className="text-brand-gold animate-bounce" size={24} />
    }
  ];

  // Preset spiritual avatars for fallback or quick assign - 3D cartoon anime style
  const avatarPresets = [
    { url: '/src/assets/images/avatar_man_1_1779920017633.png', label: { ku: 'گورجی گەنج', ar: 'شاب نشيط', en: 'Young Active' } },
    { url: '/src/assets/images/avatar_man_2_1779920036465.png', label: { ku: 'شیخ و وێنە', ar: 'شيخ وقور', en: 'Venerable Elder' } },
    { url: '/src/assets/images/avatar_woman_1_1779920054100.png', label: { ku: 'کچی پاک', ar: 'فتاة خاشعة', en: 'Young Devoted' } },
    { url: '/src/assets/images/avatar_woman_2_1779920070280.png', label: { ku: 'باڵاپۆش', ar: 'سيدة محجبة', en: 'Hijabi Lady' } },
    { url: '/src/assets/images/avatar_boy_1_1779920091213.png', label: { ku: 'منداڵ', ar: 'طفل صغير', en: 'Little Boy' } },
    { url: '/src/assets/images/avatar_boy_2_1779920108812.png', label: { ku: 'لاو', ar: 'شاب فتي', en: 'Teen Boy' } },
    { url: '/src/assets/images/avatar_girl_1_1779920125395.png', label: { ku: 'بچکۆلە', ar: 'طفلة محجبة', en: 'Little Girl' } },
    { url: '/src/assets/images/avatar_girl_2_1779920141256.png', label: { ku: 'کچ', ar: 'فتاة محجبة', en: 'Teen Girl' } }
  ];

  // Weekly activity analytical data for charting
  const weeklyChartData = useMemo(() => {
    const days = [];
    const now = new Date();
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(now.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];
      const entry = userStatsLocal.history?.find((h: any) => h.date === dateStr);
      days.push({
        dayName: date.toLocaleDateString(language === 'en' ? 'en-US' : language === 'ar' ? 'ar-SA' : 'ku-IQ', { weekday: 'short' }),
        points: entry?.points || 0,
        zikrs: entry?.zikrs || 0,
        ayahs: entry?.ayahs || 0
      });
    }
    return days;
  }, [userStatsLocal, language]);

  // Handlers for name
  const handleSaveName = () => {
    setProfileName(tempName);
    localStorage.setItem('profile_name', tempName);
    setIsEditingName(false);
  };

  // Handler for Daily Goal slider change
  const handleGoalChange = (newVal: number) => {
    setDailyGoal(newVal);
    localStorage.setItem('profile_daily_goal', newVal.toString());
  };

  // Convert uploaded image to base64 gallery mimick
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result as string;
        setProfileImage(base64);
        localStorage.setItem('profile_image', base64);
      };
      reader.readAsDataURL(file);
    }
  };

  // 4. Data Export (Offline Backup) as JSON
  const handleExportData = () => {
    const fullBackup = {
      profile: {
        name: profileName,
        image: profileImage,
        daily_goal: dailyGoal
      },
      user_stats: userStatsLocal,
      favorites_zikr: JSON.parse(localStorage.getItem('fav_zikrs') || '[]'),
      favorites_sunnah: JSON.parse(localStorage.getItem('fav_sunnah') || '[]'),
      sunnah_completed_today: JSON.parse(localStorage.getItem('sunnah_completed_today') || '[]'),
      exportDate: new Date().toISOString()
    };

    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(fullBackup, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `Zikr_Profile_Backup_${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  // 5. Data Import (Offline Restore) from JSON file
  const handleImportData = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const parsed = JSON.parse(event.target?.result as string);
          if (parsed.profile) {
            if (parsed.profile.name) {
              setProfileName(parsed.profile.name);
              localStorage.setItem('profile_name', parsed.profile.name);
            }
            if (parsed.profile.image) {
              setProfileImage(parsed.profile.image);
              localStorage.setItem('profile_image', parsed.profile.image);
            }
            if (parsed.profile.daily_goal) {
              setDailyGoal(parsed.profile.daily_goal);
              localStorage.setItem('profile_daily_goal', parsed.profile.daily_goal.toString());
            }
          }
          if (parsed.personal_notes) {
            localStorage.setItem('profile_personal_notes', JSON.stringify(parsed.personal_notes));
          }
          if (parsed.user_stats) {
            localStorage.setItem('user_stats', JSON.stringify(parsed.user_stats));
          }
          if (parsed.favorites_zikr) {
            localStorage.setItem('fav_zikrs', JSON.stringify(parsed.favorites_zikr));
          }
          if (parsed.favorites_sunnah) {
            localStorage.setItem('fav_sunnah', JSON.stringify(parsed.favorites_sunnah));
          }
          if (parsed.sunnah_completed_today) {
            localStorage.setItem('sunnah_completed_today', JSON.stringify(parsed.sunnah_completed_today));
          }

          alert(language === 'ku' ? '✅ داتاکان بە سەرکەوتوویی گەڕێنرانەوە!' : language === 'ar' ? '✅ تم استعادة البيانات والملف الشخصي بنجاح!' : '✅ Binary profile restoration successful!');
          window.location.reload();
        } catch (err) {
          alert(language === 'ku' ? '❌ فایلەکە هەڵەیە یان تێکچووە.' : '❌ Invalid JSON backup file.');
        }
      };
      reader.readAsText(file);
    }
  };

  // 6. Cloud Authentication (Sync Handlers)
  const handleAuthAction = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);
    setAuthSuccess(null);
    setIsAuthLoading(true);

    if (!email || !password) {
      setAuthError(language === 'ku' ? 'تکایە ئیمەیڵ و تێپەڕەوشە بنووسە.' : language === 'ar' ? 'يرجى إدخال البريد الإلكتروني وكلمة المرور.' : 'Please fill in both email and password.');
      setIsAuthLoading(false);
      return;
    }

    try {
      if (authMode === 'link') {
        // Create new account and link current stats
        const cred = await createUserWithEmailAndPassword(auth, email, password);
        if (cred.user) {
          // Sync current stats to the new account path immediately
          const totalDhikrs = stats.totalTasbihCount + stats.totalZikrsCompleted;
          const currentLevel = Math.min(100, Math.max(1, Math.floor(Math.sqrt(totalDhikrs * 1.5)) + 1));
          
          await setDoc(doc(db, 'users', cred.user.uid), {
            ...stats,
            deviceId,
            totalDhikrs,
            currentLevel,
            lastActive: new Date().toISOString(),
            status: 'online',
            updatedAt: new Date().toISOString(),
            profileName,
            profileImage,
            dailyGoal
          }, { merge: true });

          setAuthSuccess(language === 'ku' ? '✅ هەژمارەکەت دروستکرا و نوێترین چالاکییەکانت بە سەرکەوتوویی پاشەکەوت کران!' : language === 'ar' ? '✅ تم إنشاء الحساب وربط داتا الأذكار بنجاح!' : '✅ Account created and linked successfully!');
          setEmail('');
          setPassword('');
        }
      } else {
        // Sign in to retrieve existing stats
        const cred = await signInWithEmailAndPassword(auth, email, password);
        if (cred.user) {
          // Restore stats from Firestore
          const userDoc = await getDoc(doc(db, 'users', cred.user.uid));
          if (userDoc.exists()) {
            const remoteData = userDoc.data() as any;
            localStorage.setItem('user_stats', JSON.stringify(remoteData));
            if (remoteData.profileName) localStorage.setItem('profile_name', remoteData.profileName);
            if (remoteData.profileImage !== undefined) localStorage.setItem('profile_image', remoteData.profileImage);
            if (remoteData.dailyGoal) localStorage.setItem('profile_daily_goal', remoteData.dailyGoal.toString());
            // Trigger actual refresh or state merge
            window.location.reload();
          } else {
            // No profile found on cloud, sync local stats to cloud
            const totalDhikrs = stats.totalTasbihCount + stats.totalZikrsCompleted;
            const currentLevel = Math.min(100, Math.max(1, Math.floor(Math.sqrt(totalDhikrs * 1.5)) + 1));
            await setDoc(doc(db, 'users', cred.user.uid), {
              ...stats,
              deviceId,
              totalDhikrs,
              currentLevel,
              lastActive: new Date().toISOString(),
              status: 'online',
              updatedAt: new Date().toISOString(),
              profileName,
              profileImage,
              dailyGoal
            });
            setAuthSuccess(language === 'ku' ? '✅ چوونەژوورەوە سەرکەوتوو بوو. هیچ زانیارییەک پێشتر لەسەر کلاود فۆرمات نەکرابوو، چالاکییە لۆکاڵییەکانت بۆ کلاود گواسترانەوە.' : language === 'ar' ? '✅ تسجيل الدخول ناجح! تم نقل إحصاءياتك أوفلاين وسنبداً بمزامنتها تلقائياً.' : '✅ Logged in successfully! Created new cloud backup.');
          }
          setEmail('');
          setPassword('');
        }
      }
    } catch (err: any) {
      let msg = err.message;
      if (err.code === 'auth/email-already-in-use') {
        msg = language === 'ku' ? 'ئەم ئیمەیڵە پێشتر بەکارهاتووە.' : language === 'ar' ? 'هذا البريد الإلكتروني مسجل بالفعل.' : 'This email is already in use.';
      } else if (err.code === 'auth/weak-password') {
        msg = language === 'ku' ? 'تێپەڕەوشە پێویستە بەلایەنی کەمەوە ٦ پیت بێت.' : language === 'ar' ? 'تتطلب كلمة المرور ٦ أحرف حد أدنى.' : 'Password must be at least 6 characters.';
      } else if (err.code === 'auth/invalid-email') {
        msg = language === 'ku' ? 'ئەم ئیمەیڵە نادروستە.' : language === 'ar' ? 'صيغة البريد الإلكتروني خاطئة' : 'Invalid email format.';
      } else if (err.code === 'auth/wrong-password' || err.code === 'auth/user-not-found' || err.code === 'auth/invalid-credential') {
        msg = language === 'ku' ? 'ئیمەیڵەکە یان تێپەڕەوشەکە هەڵەیە.' : language === 'ar' ? 'البريد الإلكتروني أو كلمة المرور غير صحيحة.' : 'Incorrect email or password.';
      }
      setAuthError(msg);
    } finally {
      setIsAuthLoading(false);
    }
  };

  const handleForceBackup = async () => {
    setAuthError(null);
    setAuthSuccess(null);
    setIsAuthLoading(true);
    try {
      await syncWithFirestore();
      setAuthSuccess(language === 'ku' ? '✅ هەموو چالاکییەکانت بە سەرکەوتوویی لەگەڵ کلاود هاوتا کران!' : language === 'ar' ? '✅ تم حفظ ومزامنة الداتا الكلية بنجاح!' : '✅ Manual backup successful!');
    } catch (err: any) {
      setAuthError(err.message);
    } finally {
      setIsAuthLoading(false);
    }
  };

  const handleForceRestore = async () => {
    if (!auth.currentUser || auth.currentUser.isAnonymous) return;
    setAuthError(null);
    setAuthSuccess(null);
    setIsAuthLoading(true);
    try {
      const userDoc = await getDoc(doc(db, 'users', auth.currentUser.uid));
      if (userDoc.exists()) {
        const remoteData = userDoc.data() as any;
        localStorage.setItem('user_stats', JSON.stringify(remoteData));
        if (remoteData.profileName) localStorage.setItem('profile_name', remoteData.profileName);
        if (remoteData.profileImage !== undefined) localStorage.setItem('profile_image', remoteData.profileImage);
        if (remoteData.dailyGoal) localStorage.setItem('profile_daily_goal', remoteData.dailyGoal.toString());
        window.location.reload();
      } else {
        setAuthError(language === 'ku' ? 'هیچ زانیارییەک لەسەر کلاود نییە بۆ ئەم هەژمارە.' : language === 'ar' ? 'لم يتم العثور على أي داتا على الكلاود لهذا الحساب.' : 'No cloud backup found for this account.');
      }
    } catch (err: any) {
      setAuthError(err.message);
    } finally {
      setIsAuthLoading(false);
    }
  };

  const handleLogoutAction = async () => {
    if (window.confirm(language === 'ku' ? 'دڵنیایت دەتەوێت بچیتە دەرەوە لەم هەژمارە؟' : language === 'ar' ? 'هل أنت متأكد من رغبتك في تسجيل الخروج؟' : 'Are you sure you want to log out?')) {
      try {
        await signOut(auth);
        localStorage.removeItem('user_stats'); // Clear local stats to avoid lingering cache
        window.location.reload();
      } catch (err: any) {
        setAuthError(err.message);
      }
    }
  };

  // Schema for Developer documentation
  const developerSchemaJSON = `{
  "profile": {
    "name": "${profileName}",
    "profile_picture": "String (Base64 or Cache Path)",
    "daily_goal_xp": ${dailyGoal}
  },
  "activity_tracker": {
    "points_achieved": ${userStatsLocal.points},
    "current_level": ${userStatsLocal.level},
    "total_zikrs_read": ${userStatsLocal.totalZikrsCompleted},
    "total_tasbih_clicks": ${userStatsLocal.totalTasbihCount},
    "total_quran_ayahs": ${userStatsLocal.totalAyahsRead},
    "presents_streak_days": 3
  },
  "saved_notes": [
    {
      "id": "Unique Timestamp String",
      "title": "Supplication at night",
      "text": "O Allah, grant me stability"
    }
  ],
  "saved_favorites": {
    "zikr_ids": ${JSON.stringify(JSON.parse(localStorage.getItem('fav_zikrs') || '[]'))},
    "sunnah_ids": ${JSON.stringify(JSON.parse(localStorage.getItem('fav_sunnah') || '[]'))}
  }
}`;

  const langTerms = {
    title: { ku: 'پرۆفایلی بەکارهێنەر', ar: 'الملف الشخصي والمتابعة', en: 'User Profile & Hub' },
    subtitle: { ku: 'کۆنترۆڵی سەرجەم چالاکییەکان و زانیارییەکانی خۆت بکە بە تەواوی لۆکاڵ.', ar: 'متابعة تفصيلية لنشاطاتك اليومية ومستواك الدائم أوفلاين.', en: 'Take full control of your offline spiritual footprint.' },
    goals: { ku: 'ڕێکخستنی ئامانجی ڕۆژانە', ar: 'تحديد الهدف اليومي (نقاط)', en: 'Daily Activity Target Goal' },
    personalTab: { ku: 'پڕۆفایلی من', ar: 'حسابي', en: 'My Account' },
    favoritesTab: { ku: 'دڵخوازەکان', ar: 'المفضلة', en: 'Favorites' },
    notesTab: { ku: 'تێبینییەکان', ar: 'ملاحظاتي', en: 'Personal Notes' },
    syncTab: { ku: 'هەژمار و هاوکاتی کلاود', ar: 'الحساب والمزامنة السحابية', en: 'Cloud Sync & Account' },
    points: { ku: 'خاڵەکانی ئاست (XP)', ar: 'نقاط الخبرة الكلية', en: 'Spiritual Level Points (XP)' },
    level: { ku: 'ئاستی ئێستا', ar: 'المستوى الحالي', en: 'Current Level' },
    activityTitle: { ku: 'ئاماری چالاکییە لۆکاڵییەکان (ئەم هەفتەیە)', ar: 'تحليلات النشاط الأسبوعي', en: 'Weekly Activity Analyses' },
    badgesTitle: { ku: 'دەستکەوتەکان و باجەکان (Badges)', ar: 'الأوسمة والجوائر الروحية', en: 'Earned Badges & Ribbons' },
    notesCount: { ku: 'کۆی تێبینییەکان', ar: 'المذكرات المغزونة', en: 'Saved Notes' },
    backupBtn: { ku: 'دروسستکردنی باکەپ (Export)', ar: 'نسخة احتياطية (تصدير)', en: 'Offline Backup (Export JSON)' },
    restoreBtn: { ku: 'گەڕاندنەوەی باکەپ (Import)', ar: 'استيراد نسخة (ملف جيسون)', en: 'Restore Backup (Import JSON)' },
    schemaTitle: { ku: 'پێشنیار بۆ دروستکردن یان بەکارهێنانی داتاکان لە Flutter / React Native', ar: 'دليل مطوري الهواتف لحفظ البيانات سحابياً ومحلياً', en: 'Mobile Developer Guide for Offline Storage Schema' }
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto px-4 py-6" dir={language === 'en' ? 'ltr' : 'rtl'}>
      {/* Upper Header Segment */}
      <div className="text-center space-y-3">
        <h2 className="text-3xl sm:text-4xl font-black text-slate-800 dark:text-white leading-tight uppercase tracking-wide flex items-center justify-center gap-2">
          <User className="text-brand-emerald" size={32} />
          <span>{langTerms.title[language]}</span>
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-bold max-w-xl mx-auto leading-relaxed">
          {langTerms.subtitle[language]}
        </p>

        {/* Tab Selection Row */}
        <div className="flex bg-slate-100 dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800 p-1 rounded-2xl max-w-lg mx-auto mt-6">
          <button
            onClick={() => setActiveTab('profile')}
            className={`flex-1 py-2.5 rounded-xl text-xs font-black transition-all ${
              activeTab === 'profile'
                ? 'bg-white dark:bg-slate-800 text-slate-800 dark:text-white shadow-sm'
                : 'text-slate-400 dark:text-slate-500 hover:text-slate-600'
            }`}
          >
            {langTerms.personalTab[language]}
          </button>

          <button
            onClick={() => setActiveTab('favorites')}
            className={`flex-1 py-2.5 rounded-xl text-xs font-black transition-all ${
              activeTab === 'favorites'
                ? 'bg-white dark:bg-slate-800 text-slate-800 dark:text-white shadow-sm'
                : 'text-slate-400 dark:text-slate-500 hover:text-slate-600'
            }`}
          >
            {langTerms.favoritesTab[language]}
          </button>

          <button
            onClick={() => setActiveTab('sync')}
            className={`flex-1 py-2.5 rounded-xl text-xs font-black transition-all ${
              activeTab === 'sync'
                ? 'bg-white dark:bg-slate-800 text-slate-800 dark:text-white shadow-sm'
                : 'text-slate-400 dark:text-slate-500 hover:text-slate-600'
            }`}
          >
            {langTerms.syncTab[language]}
          </button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {activeTab === 'profile' && (
          <motion.div
            key="profileTab"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="space-y-8"
          >
            
            {/* Bento Grid Part 1: Main User Card Panel with Quick Stats Circular Progress */}
            <div className="bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-800 rounded-[2.5rem] p-6 sm:p-8 shadow-sm flex flex-col md:flex-row items-center gap-8 relative overflow-hidden">
              <span className="absolute -right-20 -bottom-20 w-44 h-44 rounded-full bg-emerald-500/5 blur-3xl pointer-events-none" />

              {/* Quick circular progress meter wrapped around profile picture */}
              <div className="relative shrink-0 flex items-center justify-center p-2 rounded-full border-4 border-slate-100 dark:border-slate-850">
                <svg className="w-32 h-32 transform -rotate-90">
                  <circle
                    cx="64"
                    cy="64"
                    r="54"
                    className="stroke-slate-100 dark:stroke-slate-800"
                    strokeWidth="8"
                    fill="transparent"
                  />
                  <motion.circle
                    cx="64"
                    cy="64"
                    r="54"
                    className="stroke-brand-emerald"
                    strokeWidth="8"
                    fill="transparent"
                    strokeDasharray={2 * Math.PI * 54}
                    initial={{ strokeDashoffset: 2 * Math.PI * 54 }}
                    animate={{ strokeDashoffset: (2 * Math.PI * 54) * (1 - progressPercentage / 100) }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    strokeLinecap="round"
                  />
                </svg>

                <div className="absolute inset-4 rounded-full overflow-hidden border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 group">
                  {profileImage ? (
                    <img src={profileImage} alt="User Profile Picture" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-brand-emerald to-teal-600 text-white font-black text-3xl select-none">
                      {profileName ? profileName.trim().charAt(0).toUpperCase() : <User size={36} />}
                    </div>
                  )}

                  {/* Manual upload floating action */}
                  <label className="absolute inset-0 bg-black/40 text-white flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity cursor-pointer text-[10px] font-black uppercase tracking-wider">
                    <Camera size={16} className="mb-0.5" />
                    <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                  </label>
                </div>

                {/* Micro stat Badge showing goal completion percentage */}
                <div className="absolute -bottom-2 bg-emerald-500 text-white text-[10px] font-black px-2.5 py-1 rounded-full shadow-md">
                  {progressPercentage}%
                </div>
              </div>

              {/* User Bio Details */}
              <div className="text-center md:text-right space-y-4 flex-1">
                <div className="space-y-1">
                  {isEditingName ? (
                    <div className="flex items-center gap-2 justify-center md:justify-start">
                      <input
                        type="text"
                        value={tempName}
                        onChange={(e) => setTempName(e.target.value)}
                        className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-3 py-1.5 rounded-xl text-base font-bold text-slate-800 dark:text-white"
                      />
                      <button onClick={handleSaveName} className="p-2 bg-brand-emerald text-white rounded-xl">
                        <Check size={14} />
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center md:justify-start gap-2.5">
                      <h3 className="text-2xl font-black text-slate-800 dark:text-white">
                        {profileName}
                      </h3>
                      <button onClick={() => { setTempName(profileName); setIsEditingName(true); }} className="text-slate-400 hover:text-brand-emerald">
                        <Edit2 size={14} />
                      </button>
                    </div>
                  )}
                  <p className="text-xs font-bold text-slate-400">
                    {language === 'ku' ? 'ئەندام لە کاتی دامەزراندنەوە' : language === 'ar' ? 'التحق بالتطبيق كعاشق مسجل' : 'Spiritual Journey Seeker'}
                  </p>

                  {/* Offline/Online Freedom Status Badges */}
                  <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 pt-1">
                    {(!auth.currentUser || isAnonymousUser) ? (
                      <span className="inline-flex items-center gap-1.5 text-[10px] font-black bg-slate-100 dark:bg-slate-950/60 text-slate-500 rounded-full px-3 py-1 border border-slate-200/50 dark:border-slate-800">
                        <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-ping" />
                        <Unlock size={11} />
                        {language === 'ku' ? 'مێوانی ئۆفلاین (بێ ئیمەیڵ)' : language === 'ar' ? 'حساب زائر محلي' : 'Local Guest (Unlinked)'}
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 text-[10px] font-black bg-emerald-50 dark:bg-emerald-950/40 text-brand-emerald rounded-full px-3 py-1 border border-emerald-100 dark:border-emerald-900/30">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                        <Lock size={11} className="text-brand-emerald" />
                        {language === 'ku' ? 'پارێزراوە لە کلاود' : language === 'ar' ? 'مؤمن سحابياً' : 'Protected on Cloud'}
                      </span>
                    )}
                  </div>
                </div>

                {/* Level / XP System */}
                <div className="grid grid-cols-2 gap-4 max-w-sm mx-auto md:mx-0">
                  <div className="p-4 bg-slate-50 dark:bg-slate-950/40 border border-slate-100 dark:border-slate-850 rounded-2xl text-center">
                    <span className="text-[10px] font-bold text-slate-450 dark:text-slate-500 uppercase block tracking-wider">
                      {langTerms.level[language]}
                    </span>
                    <span className="text-2xl font-black text-brand-emerald">
                      {userStatsLocal.level}
                    </span>
                  </div>

                  <div className="p-4 bg-slate-50 dark:bg-slate-950/40 border border-slate-100 dark:border-slate-850 rounded-2xl text-center">
                    <span className="text-[10px] font-bold text-slate-450 dark:text-slate-500 uppercase block tracking-wider">
                      {langTerms.points[language]}
                    </span>
                    <span className="text-2xl font-black text-indigo-500">
                      {userStatsLocal.points}
                    </span>
                  </div>
                </div>

                {/* Preset quick avatars list if gallery upload is not preferred */}
                <div className="space-y-2 text-center md:text-right w-full">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">
                    {language === 'ku' ? 'وێنەیەکی کارتۆنی هەڵبژێرە:' : language === 'ar' ? 'اختر رمزاً كرتونياً جاهزاً:' : 'Choose a modern cartoon avatar:'}
                  </span>
                  <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 pt-1">
                    {/* Clear/No Avatar Option */}
                    <button
                      type="button"
                      onClick={() => {
                        setProfileImage('');
                        localStorage.setItem('profile_image', '');
                      }}
                      className={`w-9 h-9 rounded-full border flex items-center justify-center text-xs font-black transition-all hover:scale-105 active:scale-95 ${!profileImage ? 'border-brand-emerald bg-emerald-50 dark:bg-emerald-950 text-brand-emerald ring-2 ring-brand-emerald/40' : 'bg-slate-50 dark:bg-slate-800 text-slate-405 border-slate-200'}`}
                      title={language === 'ku' ? 'بێ وێنە' : language === 'ar' ? 'بدون صورة' : 'No Photo'}
                    >
                      <User size={15} />
                    </button>

                    {avatarPresets.map((preset, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => {
                          setProfileImage(preset.url);
                          localStorage.setItem('profile_image', preset.url);
                        }}
                        className={`w-9 h-9 rounded-full border overflow-hidden hover:scale-105 active:scale-95 transition-all relative group ${profileImage === preset.url ? 'border-brand-emerald ring-2 ring-brand-emerald/40' : 'border-slate-200 dark:border-slate-850'}`}
                        title={preset.label[language] || preset.label['en']}
                      >
                        <img src={preset.url} alt={preset.label['en']} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* User Account Freedom Notification Banner */}
            <div className="bg-gradient-to-br from-indigo-50/70 via-emerald-50/30 to-white dark:from-slate-900/60 dark:via-emerald-950/10 dark:to-slate-900 border border-slate-150 dark:border-slate-800/85 p-6 rounded-[2.5rem] relative overflow-hidden shadow-sm flex flex-col md:flex-row items-center gap-5">
              <span className="absolute -left-12 -top-12 w-28 h-28 rounded-full bg-indigo-500/10 dark:bg-indigo-400/5 blur-2xl pointer-events-none" />
              <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 text-indigo-500 flex items-center justify-center shrink-0">
                <Sparkles size={20} className="text-brand-emerald animate-pulse" />
              </div>
              <div className="flex-1 space-y-1 text-center md:text-right">
                <h4 className="text-sm font-black text-slate-800 dark:text-slate-100">
                  {language === 'ku' 
                    ? 'تۆ بە تەواوی ئازادیت لێرە! ✨' 
                    : language === 'ar'
                    ? 'أنت حر بالكامل هنا! ✨'
                    : 'You are completely free here! ✨'}
                </h4>
                <p className="text-[11px] font-bold text-slate-500 dark:text-slate-400 leading-relaxed max-w-2xl">
                  {language === 'ku'
                    ? 'دەتوانیت بە تەواوی بەبێ ئیمەیڵ پێشکەوتنەکانت، ناوت، وێنە کارتۆنییە ڕازاوەکان و ئامانجی ڕۆژانە بە شێوەیەکی ئاڕاستەکراو دەستکاری بکەیت. بەڵام گەر حەزت لێ بێت پێشکەوتنە بێ هاوتاکانت بمێنێتەوە و نەفەوتێت، هەر کاتێک بتەوێت دەتوانیت ئیمەیڵێک ببەستیتەوە لە بەشی "هەژمار و هاوکاتی کلاود".'
                    : language === 'ar'
                    ? 'يمكنك تعديل اسمك، واختيار رمز كرتوني رائع، وتحديد هدفك اليومي بالكامل أوفلاين دون أي قيود أو حاجة لحساب! للاطمئنان وحماية مستواك ونقاطك من الضياع، تذكر أنه يمكنك ربط بريدك الإلكتروني متى شئت في تبويب "الحساب والمزامنة".'
                    : 'Customize your name, select gorgeous cartoon avatars, and manage targets 100% offline. To safeguard your cumulative levels and XP forever, link your secure email anytime in the "Cloud Sync & Account" tab.'}
                </p>
              </div>
              <button 
                type="button"
                onClick={() => setActiveTab('sync')}
                className="px-4 py-2.5 bg-slate-900 dark:bg-white text-white dark:text-slate-950 rounded-2xl font-black text-xs hover:scale-103 active:scale-95 transition-all text-center shrink-0 shadow-sm"
              >
                {language === 'ku' ? 'هاوکاتی لەگەڵ ئیمەیڵ' : language === 'ar' ? 'ربط الحساب' : 'Manage Account'}
              </button>
            </div>

            {/* Quick Profile Target Goal Setting Slider */}
            <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/85 p-6 rounded-[2.5rem] space-y-4">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <Target className="text-orange-500" size={18} />
                  <h4 className="text-sm font-black text-slate-800 dark:text-white">
                    {langTerms.goals[language]}
                  </h4>
                </div>
                <span className="text-sm font-extrabold text-brand-emerald inline-block px-3 py-1 bg-emerald-50 dark:bg-emerald-950/40 rounded-full border border-emerald-100 dark:border-emerald-900/50">
                  {dailyGoal} XP
                </span>
              </div>
              <input
                type="range"
                min="50"
                max="1000"
                step="50"
                value={dailyGoal}
                onChange={(e) => handleGoalChange(parseInt(e.target.value))}
                className="w-full accent-brand-emerald h-1.5 bg-slate-100 dark:bg-slate-850 rounded-full cursor-pointer"
              />
              <p className="text-[10px] text-slate-400 font-bold leading-relaxed text-center">
                {language === 'ku' 
                  ? 'کۆی خاڵەکانی پێویست بۆ بەدەستهێنانی ئامانجی ڕۆژانە ڕێکبخە' 
                  : language === 'ar'
                  ? 'حدد سقف النقاط التي ترغب في تجميعها وتأديتها يومياً لتكسب الأوسمة'
                  : 'Configure the point threshold goals to unlock badges daily'}
              </p>
            </div>

            {/* Weekly Activity Charts */}
            <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-[2.5rem] p-6 shadow-sm space-y-4">
              <div className="flex items-center gap-2">
                <Activity className="text-emerald-500 animate-pulse" size={18} />
                <h4 className="text-sm font-black text-slate-800 dark:text-white">
                  {langTerms.activityTitle[language]}
                </h4>
              </div>

              <div className="h-44 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={weeklyChartData}>
                    <defs>
                      <linearGradient id="colorPoints" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10B981" stopOpacity={0.2}/>
                        <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                      </linearGradient>
                      <linearGradient id="colorZikrs" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#F59E0B" stopOpacity={0.1}/>
                        <stop offset="95%" stopColor="#F59E0B" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                    <XAxis dataKey="dayName" stroke="#94A3B8" fontSize={10} tickLine={false} axisLine={false} />
                    <YAxis stroke="#94A3B8" fontSize={10} tickLine={false} axisLine={false} />
                    <Tooltip contentStyle={{ borderRadius: '1rem', border: 'none', fontStyle: 'bold' }} />
                    <Area type="monotone" dataKey="points" name="XP Points" stroke="#10B981" fillOpacity={1} fill="url(#colorPoints)" strokeWidth={2} />
                    <Area type="monotone" dataKey="zikrs" name="Dhikrs" stroke="#F59E0B" fillOpacity={1} fill="url(#colorZikrs)" strokeWidth={1.5} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Earned Badges block */}
            <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-[2.5rem] p-6 shadow-sm space-y-4">
              <div className="flex items-center gap-2">
                <Trophy className="text-brand-gold" size={18} />
                <h4 className="text-sm font-black text-slate-800 dark:text-white">
                  {langTerms.badgesTitle[language]}
                </h4>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {availableBadges.map((badge) => (
                  <div
                    key={badge.id}
                    className={`p-4 rounded-3xl border flex items-center gap-4 transition-all ${
                      badge.earned
                        ? 'bg-emerald-50/20 dark:bg-emerald-950/10 border-emerald-500/20 text-slate-800 dark:text-slate-100'
                        : 'bg-slate-50 dark:bg-slate-950/30 border-slate-100 dark:border-slate-850 text-slate-400 opacity-60'
                    }`}
                  >
                    <div className={`p-3 rounded-2xl ${badge.earned ? 'bg-emerald-500/10' : 'bg-slate-200/50 dark:bg-slate-800'}`}>
                      {badge.icon}
                    </div>
                    <div>
                      <h5 className="text-sm font-black">
                        {badge.title[language] || badge.title['en']}
                      </h5>
                      <p className="text-[10px] font-semibold text-slate-400">
                        {badge.description[language] || badge.description['en']}
                      </p>
                      {badge.earned && (
                        <span className="text-[9px] font-black text-emerald-500 block mt-1">
                          {language === 'ku' ? 'سەرکەوتووبوو ✓' : language === 'ar' ? 'مكتمل ✓' : 'Unlocked ✓'}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Offline Backup & Restore Controls */}
            <div className="bg-gradient-to-br from-indigo-900/10 to-teal-900/10 backdrop-blur-md border border-slate-200/60 dark:border-slate-800 rounded-[2.5rem] p-6 space-y-4 shadow-sm">
              <h4 className="text-sm font-black text-slate-800 dark:text-white uppercase tracking-wider text-center flex items-center justify-center gap-2">
                <Sparkles className="text-brand-gold" size={16} />
                <span>{language === 'ku' ? 'بەڕێوەبردنی داتا و باکەپ (ئۆفلاین)' : language === 'ar' ? 'النسخ الاحتياطي اليدوي للأجهزة' : 'Offline Backup & Storage Registry'}</span>
              </h4>
              <p className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 leading-relaxed text-center max-w-md mx-auto">
                {language === 'ku'
                  ? 'چونکە ئەپەکە ئۆفلاین کار دەکات، دەتوانیت بە دروستکردنی فایلێکی JSON داتا و پێشکەوتنەکانت پاشەکەوت بکەیت و بیبەیتە سەر مۆبایلێکی تر.'
                  : language === 'ar'
                  ? 'تطبيق زيكر يحترم الخصوصية ويعمل بالكامل بدون خوادم، قم بتحميل ملف داتابيز محلي لتستعيد حسابك عند تغيير هاتفك.'
                  : 'Since the app operates locally with zero credentials required, export a JSON file backup to load progress on other devices safely.'}
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
                <button
                  type="button"
                  onClick={handleExportData}
                  className="px-5 py-3 rounded-2xl bg-slate-900 text-white dark:bg-white dark:text-slate-950 font-black text-xs hover:scale-102 active:scale-95 transition-all flex items-center gap-2"
                >
                  <Download size={14} />
                  <span>{langTerms.backupBtn[language]}</span>
                </button>

                <label className="px-5 py-3 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-800 dark:text-white font-black text-xs hover:scale-102 active:scale-95 transition-all flex items-center gap-2 cursor-pointer">
                  <Upload size={14} />
                  <span>{langTerms.restoreBtn[language]}</span>
                  <input type="file" accept=".json" onChange={handleImportData} className="hidden" />
                </label>
              </div>
            </div>

          </motion.div>
        )}

        {activeTab === 'favorites' && (
          <motion.div
            key="favoritesTab"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="space-y-6"
          >
            <HomeFavorites 
              language={language}
              favoriteZikrsIds={favoriteZikrsIds}
              favoriteSunnahIds={favoriteSunnahIds}
              onToggleZikr={onToggleZikr}
              onToggleSunnah={onToggleSunnah}
              onIncrementTasbih={onIncrementTasbih}
              onCompleteZikr={onCompleteZikr}
              showEmptyState={true}
            />
          </motion.div>
        )}



        {/* Account & Cloud Sync Tab */}
        {activeTab === 'sync' && (
          <motion.div
            key="syncTab"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="space-y-6"
          >
            {/* 1. Cloud Infrastructure Overview Status Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-5 bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-800 rounded-2xl flex items-center gap-4 relative overflow-hidden shadow-sm">
                <div className={`p-3.5 rounded-2xl ${isOnline ? 'bg-emerald-500/10 text-emerald-500' : 'bg-rose-500/10 text-rose-500'}`}>
                  <Wifi size={20} className={isOnline ? 'animate-pulse' : ''} />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-slate-400 block uppercase tracking-wider">
                    {language === 'ku' ? 'تۆڕی ئینتەرنێت' : language === 'ar' ? 'حالة الشبكة' : 'Network Connectivity'}
                  </span>
                  <span className="text-xs font-black text-slate-800 dark:text-white flex items-center gap-1.5 pt-0.5">
                    <span className={`w-2 h-2 rounded-full ${isOnline ? 'bg-emerald-500' : 'bg-rose-500'}`} />
                    {isOnline 
                      ? (language === 'ku' ? 'ئینتەرنێت هەیە' : language === 'ar' ? 'متصل بالإنترنت' : 'Online / Connected') 
                      : (language === 'ku' ? 'ئۆفلاینە' : language === 'ar' ? 'غير متصل بالشبكة' : 'Offline Mode')}
                  </span>
                </div>
              </div>

              <div className="p-5 bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-800 rounded-2xl flex items-center gap-4 relative overflow-hidden shadow-sm">
                <div className={`p-3.5 rounded-2xl ${(!auth.currentUser || isAnonymousUser) ? 'bg-amber-500/10 text-amber-500' : 'bg-indigo-505/10 text-brand-emerald bg-emerald-500/10'}`}>
                  {(!auth.currentUser || isAnonymousUser) ? <Unlock size={20} /> : <Lock size={20} />}
                </div>
                <div>
                  <span className="text-[10px] font-bold text-slate-400 block uppercase tracking-wider">
                    {language === 'ku' ? 'جۆری هەژمار' : language === 'ar' ? 'نوع الحساب' : 'Account Tier'}
                  </span>
                  <span className="text-xs font-black text-slate-800 dark:text-white pt-0.5 block">
                    {(!auth.currentUser || isAnonymousUser) 
                      ? (language === 'ku' ? 'مێوان (کاتى)' : language === 'ar' ? 'حساب زائر محلي' : 'Guest (Unlinked)') 
                      : (language === 'ku' ? 'پەیوەستکراو (کلاود)' : language === 'ar' ? 'حساب مؤمن سحابي' : 'Cloud Safe (Linked)')}
                  </span>
                </div>
              </div>

              <div className="p-5 bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-800 rounded-2xl flex items-center gap-4 relative overflow-hidden shadow-sm">
                <div className="p-3.5 rounded-2xl bg-sky-500/10 text-sky-500">
                  <Database size={20} />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-slate-400 block uppercase tracking-wider">
                    {language === 'ku' ? 'هاوکاتی خۆکار' : language === 'ar' ? 'المزامنة التلقائية' : 'Background Sync'}
                  </span>
                  <span className="text-xs font-black text-sky-500 pt-0.5 flex items-center gap-1.5">
                    <RefreshCw size={12} className="animate-spin" />
                    {language === 'ku' ? 'چالاکە بەردەوام' : language === 'ar' ? 'مفعلة تلقائياً' : 'Active & Secured'}
                  </span>
                </div>
              </div>

              <div className="p-5 bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-800 rounded-2xl flex items-center gap-4 relative overflow-hidden shadow-sm">
                <div className="p-3.5 rounded-2xl bg-orange-500/10 text-orange-500">
                  <Activity size={20} className="animate-pulse" />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-slate-400 block uppercase tracking-wider">
                    {language === 'ku' ? 'کۆی خاڵەکانی کلاود' : language === 'ar' ? 'مجموع نقاط السحاب' : 'Cloud Database Registry'}
                  </span>
                  <span className="text-xs font-black text-slate-800 dark:text-white pt-0.5 block">
                    {stats.points} XP
                  </span>
                </div>
              </div>
            </div>

            {/* Error and Success Alerts */}
            {authError && (
              <div className="p-4 bg-rose-50/50 dark:bg-rose-950/20 border border-rose-500/20 rounded-2xl text-xs font-bold text-rose-500 text-center">
                {authError}
              </div>
            )}
            {authSuccess && (
              <div className="p-4 bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-500/20 rounded-2xl text-xs font-bold text-brand-emerald text-center">
                {authSuccess}
              </div>
            )}

            {/* 2. Interactive Auth Forms & Operations Card */}
            {(!auth.currentUser || isAnonymousUser) ? (
              // Case A: User is Guest (Needs to Link, Backup or Sign In)
              <div className="bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-800 rounded-[2.5rem] p-6 sm:p-8 shadow-sm space-y-6">
                <div className="text-center space-y-2">
                  <h4 className="text-lg font-black text-slate-800 dark:text-white flex items-center justify-center gap-2">
                    <ShieldCheck className="text-brand-emerald" size={22} />
                    <span>{language === 'ku' ? 'پاراستنی پێشکەوتنەکانت لەرێگەی ئیمەیڵ' : language === 'ar' ? 'تأمين تقدمك السحابي برابط بريد' : 'Secure and Link Your Device Progress'}</span>
                  </h4>
                  <p className="text-xs font-bold text-slate-400 leading-relaxed max-w-lg mx-auto">
                    {language === 'ku'
                      ? 'بۆ ئەوەی ئەگەر ئەپەکەت سڕییەوە یان مۆبایلی جیاوازت بەکارهێنا، بتوانیت بە ئاسانی هەموو زانیارەی زیکرەکانت بگێڕیتەوە، زانیارییە لۆکاڵییەکانت بە ئیمەیڵی خۆتەوە ببەستەرەوە.'
                      : language === 'ar'
                      ? 'لتحمي مستواك الحالي ونقاط الأذكار التي حققتها عند إعادة تثبيت التطبيق أو عند تبديل الهواتف، يمكنك ربط بريدك الإلكتروني الشخصي سحابياً بلمحة واحدة.'
                      : 'Sync and backup your current level, Dhikr counters, and achievements in our Firestore Cloud. Provide your credentials to link instantly.'}
                  </p>
                </div>

                {/* Form Mode Tabs Slider */}
                <div className="flex bg-slate-50 dark:bg-slate-950 border border-slate-150 dark:border-slate-850 p-1 rounded-xl max-w-xs mx-auto mb-4">
                  <button
                    type="button"
                    onClick={() => { setAuthMode('link'); setAuthError(null); setAuthSuccess(null); }}
                    className={`flex-1 py-2 rounded-lg text-xs font-black transition-all ${
                      authMode === 'link'
                        ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-950 shadow-sm'
                        : 'text-slate-400 dark:text-slate-500 hover:text-slate-600'
                    }`}
                  >
                    {language === 'ku' ? 'تۆمارکردن (پەیوەستکردن)' : language === 'ar' ? 'إنشاء وربط داتا هاتفك' : 'Register & Link Progress'}
                  </button>
                  <button
                    type="button"
                    onClick={() => { setAuthMode('signin'); setAuthError(null); setAuthSuccess(null); }}
                    className={`flex-1 py-2 rounded-lg text-xs font-black transition-all ${
                      authMode === 'signin'
                        ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-950 shadow-sm'
                        : 'text-slate-400 dark:text-slate-500 hover:text-slate-600'
                    }`}
                  >
                    {language === 'ku' ? 'چوونەژوورەوە' : language === 'ar' ? 'تسجيل الدخول (استرداد)' : 'Sign In & Restore'}
                  </button>
                </div>

                <form onSubmit={handleAuthAction} className="space-y-4 max-w-md mx-auto">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black uppercase tracking-wider text-slate-450 block">
                      {language === 'ku' ? 'ئیمەیڵی تۆ' : language === 'ar' ? 'البريد الإلكتروني' : 'Your Email Addess'}
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        required
                        placeholder="youremail@domain.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-950/40 border border-slate-150 dark:border-slate-850 rounded-2xl text-xs font-bold text-slate-800 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-emerald/30 focus:border-brand-emerald"
                      />
                      <Mail size={14} className="absolute left-4 top-1/2 -convert-y -translate-y-1/2 text-slate-400" />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black uppercase tracking-wider text-slate-450 block">
                      {language === 'ku' ? 'تێپەڕەوشە (شفرە)' : language === 'ar' ? 'كلمة المرور' : 'Secure Password'}
                    </label>
                    <div className="relative">
                      <input
                        type="password"
                        required
                        placeholder={language === 'ku' ? 'بەلایەنی کەمەوە ٦ پیت' : '6 characters minimum'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-950/40 border border-slate-150 dark:border-slate-850 rounded-2xl text-xs font-bold text-slate-800 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-emerald/30 focus:border-brand-emerald"
                      />
                      <Key size={14} className="absolute left-4 top-1/2 -convert-y -translate-y-1/2 text-slate-400" />
                    </div>
                  </div>

                  {/* Submission triggers */}
                  <button
                    type="submit"
                    disabled={isAuthLoading}
                    className="w-full py-4.5 bg-brand-emerald text-white font-black text-xs rounded-2xl shadow-sm shadow-brand-emerald/10 flex items-center justify-center gap-2 hover:bg-brand-emerald/90 transition-all disabled:opacity-50"
                  >
                    {isAuthLoading ? (
                      <RefreshCw size={14} className="animate-spin" />
                    ) : (
                      <Sparkles size={14} />
                    )}
                    <span>
                      {authMode === 'link' 
                        ? (language === 'ku' ? 'پەیوەستکردنی داتاکان بەم ئیمەیڵە' : language === 'ar' ? 'تأمين وحفظ حساب مكمل' : 'Link & Protect My Progress')
                        : (language === 'ku' ? 'چوونەژوورەوە و هێنانی داتاکان' : language === 'ar' ? 'استعادة البيانات ومتابعة الأذكار' : 'Restore Progress & Sign In')}
                    </span>
                  </button>
                </form>
              </div>
            ) : (
              // Case B: User has a Connected Real Cloud Account with email linked
              <div className="bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-800 rounded-[2.5rem] p-6 sm:p-8 shadow-sm space-y-6">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-850">
                  <div className="flex items-center gap-3.5">
                    <div className="p-3 bg-emerald-500/10 text-brand-emerald rounded-2xl">
                      <ShieldCheck size={26} />
                    </div>
                    <div>
                      <h4 className="text-base font-black text-slate-800 dark:text-white leading-tight">
                        {language === 'ku' ? 'هەژمارەکەت پارێزراوە لە کلاود' : language === 'ar' ? 'حسابك مؤمن سحابياً بالكامل!' : 'Your Account is Core-Protected'}
                      </h4>
                      <p className="text-[11px] font-bold text-slate-400">
                        {language === 'ku' ? `چوویتیتە ژوورەوە بە ئیمەیڵی: ${auth.currentUser?.email}` : language === 'ar' ? `مسجل بالبريد الإلكتروني التالي: ${auth.currentUser?.email}` : `Logged in as: ${auth.currentUser?.email}`}
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleLogoutAction}
                    className="px-4 py-2 bg-rose-50/50 dark:bg-rose-950/20 text-rose-500 hover:text-white hover:bg-rose-500 font-extrabold text-xs rounded-xl flex items-center gap-1.5 transition-all self-stretch sm:self-auto justify-center"
                  >
                    <LogOut size={13} />
                    <span>{language === 'ku' ? 'دەرچوون لە هەژمار' : language === 'ar' ? 'تسجيل الخروج' : 'Disconnect'}</span>
                  </button>
                </div>

                <div className="space-y-4">
                  <h5 className="text-xs font-black text-slate-850 dark:text-slate-200 uppercase tracking-widest block">
                    {language === 'ku' ? 'کۆنترۆڵە خێراکانى کلاود' : language === 'ar' ? 'التحكم اليدوي المتقدم ومزامنة البيانات' : 'Cloud Maintenance & Restorations'}
                  </h5>
                  <p className="text-xs font-semibold text-slate-500 dark:text-slate-450 leading-relaxed">
                    {language === 'ku'
                      ? 'داتاکانت بە شێوەیەکی خۆکاری هاوکات دەکرێن. بەڵام دەتوانیت لێرەوە هەڵگرتنی بە زۆر (Force Backup) یان گەڕاندنەوەی زانیارییەکانی سەر کلاود بۆ ناو مۆبایلەکەت (Force Restore) ئەنجام بدەیت.'
                      : language === 'ar'
                      ? 'تتم مزامنة حسابك وأذكارك وتسابيحك تلقائياً وسلسياً في الخلفية. يمكنك تطبيق مزامنة يدوية قسرية للأمان الإجباري والراحة.'
                      : 'While your state is automatically backed up regularly, perform instant cloud synchronization triggers below.'}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                    <button
                      type="button"
                      disabled={isAuthLoading}
                      onClick={handleForceBackup}
                      className="p-5 bg-slate-900 text-white dark:bg-white dark:text-slate-950 rounded-2xl flex flex-col items-center justify-center gap-3 active:scale-95 transition-all outline-none font-bold"
                    >
                      <Cloud className="animate-bounce" size={24} />
                      <div className="text-center">
                        <span className="text-xs font-black block">
                          {language === 'ku' ? 'پاشەکردکردنی دەستبەجێ' : language === 'ar' ? 'حفظ إجباري يدوي' : 'Force Cloud Backup'}
                        </span>
                        <span className="text-[9px] text-slate-400 dark:text-slate-600 font-semibold block mt-0.5">
                          {language === 'ku' ? 'داتاکانی مۆبایل لۆد بکە بۆ کلاود' : language === 'ar' ? 'تصدير داتا الهاتف الحالية للكلاود' : 'Upload device progress to cloud'}
                        </span>
                      </div>
                    </button>

                    <button
                      type="button"
                      disabled={isAuthLoading}
                      onClick={handleForceRestore}
                      className="p-5 bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-800 rounded-2xl flex flex-col items-center justify-center gap-3 active:scale-95 transition-all outline-none font-bold"
                    >
                      <RefreshCw className={isAuthLoading ? 'animate-spin' : ''} size={24} />
                      <div className="text-center">
                        <span className="text-xs font-black block text-slate-800 dark:text-slate-200">
                          {language === 'ku' ? 'هێنانەوەی سەر کلاود' : language === 'ar' ? 'استيراد مجبر كامل' : 'Force Cloud Restore'}
                        </span>
                        <span className="text-[9px] text-slate-400 font-semibold block mt-0.5">
                          {language === 'ku' ? 'داتاکانی کلاود جێگیر بکە لەسەر مۆبایل' : language === 'ar' ? 'أخذ الداتا السحابية ودمجها محلياً' : 'Download and override local progress'}
                        </span>
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
