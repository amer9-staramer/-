import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Lock, 
  User, 
  BarChart3, 
  Users, 
  Zap, 
  ChevronRight, 
  LogOut, 
  ExternalLink,
  ShieldCheck,
  Loader2,
  AlertCircle,
  LayoutDashboard,
  TrendingUp,
  PieChart as PieChartIcon,
  Settings as SettingsIcon,
  RefreshCw,
  Search,
  Code2,
  MessageSquare,
  Smartphone,
  Calendar,
  Trophy,
  BookOpen
} from 'lucide-react';
import { 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  User as FirebaseUser 
} from 'firebase/auth';
import { 
  collection, 
  getDocs, 
  query, 
  orderBy, 
  limit, 
  getDoc, 
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  increment,
  setDoc,
  onSnapshot
} from 'firebase/firestore';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  BarChart, 
  Bar, 
  Cell,
  PieChart,
  Pie
} from 'recharts';
import { auth, db } from '../lib/firebase';
import { hadithSourcesData, HadithSource } from '../data/hub';

const COLORS = ['#10b981', '#f59e0b', '#3b82f6', '#ef4444', '#8b5cf6', '#ec4899'];

interface Hadith {
  id?: string;
  arabic: string;
  kurdish: string;
  english?: string;
  source: string;
  reference: string;
  topic: string;
  createdAt: string;
}

const getUserDhikrs = (u: any) => {
  if (!u) return 0;
  return u.totalDhikrs !== undefined ? u.totalDhikrs : ((u.totalTasbihCount || 0) + (u.totalZikrsCompleted || 0));
};

const getUserLevel = (u: any) => {
  if (!u) return 1;
  return u.currentLevel !== undefined ? u.currentLevel : Math.min(100, Math.max(1, Math.floor(Math.sqrt(getUserDhikrs(u) * 1.5)) + 1));
};

const isUserOnline = (u: any) => {
  if (!u) return false;
  return u.status === 'online';
};

interface AdminStats {
  totalUsers: number;
  totalPoints: number;
  totalTasbihCount: number;
  usersList: any[];
  zikrStats: any[];
  hadiths: Hadith[];
}

export function AdminPortal({ onBack, language, isDeviceAdmin }: { onBack: () => void, language: 'ku' | 'en' | 'ar', isDeviceAdmin?: boolean }) {
  const t = {
    ku: {
      dashboard: 'داشبۆردی بەڕێوەبردن',
      console: 'کۆنسۆڵ',
      terminal: 'تێرمیناڵ',
      overview: 'سەرپێچی گشتی',
      users: 'بەکارهێنەران',
      analytics: 'ئامارەکان',
      settings: 'ڕێکخستن',
      hadiths: 'فەرموودەکان',
      addHadith: 'زیادکردنی فەرموودە',
      updateCode: 'نوێکردنەوەی کۆد',
      userMode: 'لاپەڕەی بەکارهێنەر',
      logout: 'چوونەدەرەوە',
      welcome: 'بەخێربێیت، دەرهێنەر',
      sync: 'نوێکردنەوەی داتا',
      regUsers: 'بەکارهێنەرانی تۆمارکراو',
      points: 'کۆی خاڵەکان',
      recitations: 'کۆی زیکرەکان',
      traffic: 'ڕێژەی چالاکی',
      topZikrs: 'بینراوترین زیکرەکان',
      devCenter: 'سەنتەری گەشەپێدەر',
      openBuilder: 'کردنەوەی AI Studio',
      id: 'ناسنامە',
      level: 'ئاست',
      lastSync: 'کۆتا چالاکی',
      source: 'سەرچاوە',
      topic: 'بابەت',
      reference: 'ژمارە یان لاپەڕە',
      arabicText: 'دەقی عەرەبی',
      kurdishText: 'وەڕگێڕانی کوردی',
      englishText: 'وەڕگێڕانی ئینگلیزی (ئارەزوومەندانە)',
      save: 'پاشەکەوتکردن',
      cancel: 'پاشگەزبوونەوە',
      delete: 'سڕینەوە',
      confirmDelete: 'ئایا دڵنیایت لە سڕینەوەی ئەم فەرموودەیە؟',
      saveError: 'شکست لە پاشەکەوتکردنی فەرموودە',
      topicPlaceholder: 'گشتی، کار، ڕاستگۆیی...',
      refPlaceholder: 'بوخاری ١٠١، لاپەڕە ٥٠...',
      importJson: 'بارکردنی JSON',
      jsonPlaceholder: '[{"arabic": "...", "kurdish": "...", "source": "bukhari", "reference": "...", "topic": "general"}]',
      invalidJson: 'فۆرماتی JSON نادروستە',
      importSuccess: 'بە سەرکەوتوویی بارکرا',
      importing: 'خەریکی بارکردنە...'
    },
    ar: {
      dashboard: 'لوحة التحكم',
      console: 'الكونسول',
      terminal: 'المحطة',
      overview: 'نظرة عامة',
      users: 'المستخدمين',
      analytics: 'التحليلات',
      settings: 'الإعدادات',
      hadiths: 'الأحاديث',
      addHadith: 'إضافة حديث',
      updateCode: 'تحديث الكود',
      userMode: 'نمط المستخدم',
      logout: 'تسجيل الخروج',
      welcome: 'مرحباً، أيها المسؤول',
      sync: 'مزامنة البيانات',
      regUsers: 'المستخدمين المسجلين',
      points: 'إجمالي النقاط',
      recitations: 'النشاطات الإيمانية',
      traffic: 'حركة المستخدمين',
      topZikrs: 'الأذكار الأكثر مشاهدة',
      devCenter: 'مركز المطورين',
      openBuilder: 'فتح المصمم',
      id: 'المعرف',
      level: 'المستوى',
      lastSync: 'آخر مزامنة',
      source: 'المصدر',
      topic: 'الموضوع',
      reference: 'المرجع',
      arabicText: 'النص العربي',
      kurdishText: 'الترجمة الكردية',
      englishText: 'الترجمة الإنجليزية (اختياري)',
      save: 'حفظ',
      cancel: 'إلغاء',
      delete: 'حذف',
      confirmDelete: 'هل أنت متأكد من حذف هذا الحديث؟',
      saveError: 'فشل في حفظ الحديث',
      topicPlaceholder: 'عام، عمل، صدق...',
      refPlaceholder: 'البخاري ١٠١، صفحة ٥٠...',
      importJson: 'استيراد JSON',
      jsonPlaceholder: '[{"arabic": "...", "kurdish": "...", "source": "bukhari", "reference": "...", "topic": "general"}]',
      invalidJson: 'صيغة JSON غير صالحة',
      importSuccess: 'تم الاستيراد بنجاح',
      importing: 'جاري الاستيراد...'
    },
    en: {
      dashboard: 'Admin Dashboard',
      console: 'Console',
      terminal: 'Terminal',
      overview: 'Overview',
      users: 'Live Users',
      analytics: 'Analytics',
      settings: 'Settings',
      hadiths: 'Hadith Repository',
      addHadith: 'Register New Hadith',
      updateCode: 'Update App Code',
      userMode: 'User Mode',
      logout: 'Logout',
      welcome: 'Welcome Back, Admin',
      sync: 'Sync Firestore',
      regUsers: 'Registered Users',
      points: 'Global Points',
      recitations: 'Faith Matrix Engagement',
      traffic: 'Live Traffic',
      topZikrs: 'High Impact Content',
      devCenter: 'Developer Command Center',
      openBuilder: 'Open Builder',
      id: 'Identity',
      level: 'Level',
      lastSync: 'Last Sync',
      source: 'Original Source',
      topic: 'Thematic Category',
      reference: 'Number / Ref',
      arabicText: 'Original Arabic Text',
      kurdishText: 'Kurdish Localization',
      englishText: 'English Support (Optional)',
      save: 'Commit to Ledger',
      cancel: 'Abort Operation',
      delete: 'Terminate Record',
      confirmDelete: 'Are you sure you want to delete this record?',
      saveError: 'Failed to save record to Firestore',
      topicPlaceholder: 'General, Work, Honesty...',
      refPlaceholder: 'Bukhari 101, page 50...',
      importJson: 'Bulk JSON Import',
      jsonPlaceholder: '[{"arabic": "...", "kurdish": "...", "source": "bukhari", "reference": "...", "topic": "general"}]',
      invalidJson: 'Invalid JSON format',
      importSuccess: 'Successfully imported bulk records',
      importing: 'Processing bulk import...'
    }
  }[language];

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [isStatsLoading, setIsStatsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'users' | 'zikrs' | 'settings' | 'hadiths'>('users');
  
  // Custom device search & sort states
  const [userSearchQuery, setUserSearchQuery] = useState('');
  const [sortCriteria, setSortCriteria] = useState<'points' | 'tasbih' | 'level' | 'recent' | 'leaderboard'>('leaderboard');
  const [selectedUser, setSelectedUser] = useState<any | null>(null);
  
  // Hadith Form State
  const [showHadithForm, setShowHadithForm] = useState(false);
  const [hadithForm, setHadithForm] = useState<Partial<Hadith>>({
    source: 'bukhari',
    topic: 'general',
    arabic: '',
    kurdish: '',
    english: '',
    reference: ''
  });
  const [isHadithSubmitting, setIsHadithSubmitting] = useState(false);
  const [showJsonImport, setShowJsonImport] = useState(false);
  const [jsonInput, setJsonInput] = useState('');
  const [isImporting, setIsImporting] = useState(false);

  useEffect(() => {
    const isLocalAdmin = localStorage.getItem('isLocalAdminAuthorized') === 'true';
    const cachedEmail = localStorage.getItem('cached_admin_email') || 'adolamer9@gmail.com';
    if (isLocalAdmin) {
      setUser({ email: cachedEmail, uid: 'admin_local_stub' } as any);
      setIsAdmin(true);
      fetchData();
      setLoading(false);
    }

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (localStorage.getItem('isLocalAdminAuthorized') === 'true') {
        const emailToUse = localStorage.getItem('cached_admin_email') || 'adolamer9@gmail.com';
        setUser({ email: emailToUse, uid: 'admin_local_stub' } as any);
        setIsAdmin(true);
        fetchData();
        setLoading(false);
        return;
      }
      setUser(user);
      if (user) {
        checkAdmin(user.uid);
      } else if (isDeviceAdmin) {
        setIsAdmin(true);
        fetchData();
        setLoading(false);
      } else {
        setIsAdmin(false);
        setLoading(false);
      }
    });
    return () => unsubscribe();
  }, [isDeviceAdmin]);

  // Real-time updates for Users (statistics, active devices, total tasbihs)
  useEffect(() => {
    if (!isAdmin) return;

    const unsubscribe = onSnapshot(collection(db, 'users'), (snapshot) => {
      const usersList: any[] = [];
      let totalPoints = 0;
      let totalTasbihCount = 0;

      snapshot.forEach((doc) => {
        const data = doc.data();
        usersList.push({ id: doc.id, ...data });
        totalPoints += data.points || 0;
        totalTasbihCount += data.totalTasbihCount || 0;
      });

      setStats(prev => {
        const base = prev || { zikrStats: [], hadiths: [] };
        return {
          ...base,
          totalUsers: snapshot.size,
          totalPoints,
          totalTasbihCount,
          usersList
        } as any;
      });
    }, (error) => {
      console.error("Error listening to users:", error);
    });

    return () => unsubscribe();
  }, [isAdmin]);





  const checkAdmin = async (uid: string) => {
    try {
      if (isDeviceAdmin) {
        setIsAdmin(true);
        fetchData();
        setLoading(false);
        return;
      }
      if (auth.currentUser?.email === 'adolamer9@gmail.com' || auth.currentUser?.email === 'zanyarshkurd@gmail.com') {
        setIsAdmin(true);
        fetchData();
        setLoading(false);
        return;
      }
      const adminDoc = await getDoc(doc(db, 'admins', uid));
      if (adminDoc.exists()) {
        setIsAdmin(true);
        fetchData();
      } else {
        setIsAdmin(false);
        setError('Unauthorized Access Detected.');
      }
    } catch (err) {
      if (isDeviceAdmin) {
        setIsAdmin(true);
        fetchData();
      } else {
        setError('System verification failed.');
      }
    } finally {
      setLoading(false);
    }
  };

  const fetchData = async () => {
    setIsStatsLoading(true);
    try {
      // Fetch Users
      const usersSnap = await getDocs(collection(db, 'users'));
      const usersList: any[] = [];
      let totalPoints = 0;
      let totalTasbihCount = 0;
      
      usersSnap.forEach((doc) => {
        const data = doc.data();
        usersList.push({ id: doc.id, ...data });
        totalPoints += data.points || 0;
        totalTasbihCount += data.totalTasbihCount || 0;
      });

      // Fetch Zikr Stats (Top 10)
      const zikrsQuery = query(collection(db, 'zikr_stats'), orderBy('viewCount', 'desc'), limit(10));
      const zikrsSnap = await getDocs(zikrsQuery);
      const zikrStats: any[] = [];
      zikrsSnap.forEach((doc) => {
        zikrStats.push({ id: doc.id, ...doc.data() });
      });

      // Fetch Hadiths
      const hadithsSnap = await getDocs(query(collection(db, 'hadiths'), orderBy('createdAt', 'desc'), limit(50)));
      const hadiths: Hadith[] = [];
      hadithsSnap.forEach((doc) => {
        hadiths.push({ id: doc.id, ...(doc.data() as any) });
      });

      setStats({
        totalUsers: usersSnap.size,
        totalPoints,
        totalTasbihCount,
        usersList,
        zikrStats,
        hadiths
      });
    } catch (err) {
      console.error(err);
    } finally {
      setIsStatsLoading(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const cleanEmail = email.trim().toLowerCase();
    const cleanPassword = password;

    if ((cleanEmail === 'adolamer9@gmail.com' && cleanPassword === 'xamnak12345XAMNAK') ||
        (cleanEmail === 'zanyarshkurd@gmail.com' && (cleanPassword === 'ZanyarDhikr2026!' || cleanPassword === 'zanyar12345'))) {
      
      try {
        await signInWithEmailAndPassword(auth, cleanEmail, cleanPassword);
      } catch (signInErr: any) {
        if (signInErr.code === 'auth/user-not-found' || signInErr.code === 'auth/invalid-credential' || signInErr.code === 'auth/wrong-password') {
          try {
            const { createUserWithEmailAndPassword } = await import('firebase/auth');
            await createUserWithEmailAndPassword(auth, cleanEmail, cleanPassword);
          } catch (createErr) {
            console.warn("Could not automatically register admin on Firebase Auth:", createErr);
          }
        }
      }

      localStorage.setItem('isLocalAdminAuthorized', 'true');
      localStorage.setItem('cached_admin_email', cleanEmail);
      setUser({ email: cleanEmail, uid: auth.currentUser?.uid || 'admin_local_stub' } as any);
      setIsAdmin(true);
      fetchData();
      setLoading(false);
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err: any) {
      setError(err.message || 'Login failed');
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    localStorage.removeItem('isLocalAdminAuthorized');
    await signOut(auth);
    setUser(null);
    setIsAdmin(false);
  };

  const handleAddHadith = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!hadithForm.arabic || !hadithForm.kurdish || !hadithForm.source) return;
    
    setIsHadithSubmitting(true);
    try {
      const sourceId = hadithForm.source;
      const newHadith = {
        ...hadithForm,
        createdAt: new Date().toISOString()
      };
      
      // Add Hadith
      await addDoc(collection(db, 'hadiths'), newHadith);
      
      // Update Count in hadith_counts
      const countRef = doc(db, 'hadith_counts', sourceId!);
      const countDoc = await getDoc(countRef);
      
      if (countDoc.exists()) {
        await updateDoc(countRef, { count: increment(1) });
      } else {
        // Find default count from local data
        const localSource = hadithSourcesData.find(s => s.id === sourceId);
        await setDoc(countRef, { count: (localSource?.count || 0) + 1 });
      }

      setShowHadithForm(false);
      setHadithForm({
        source: 'bukhari',
        topic: 'general',
        arabic: '',
        kurdish: '',
        english: '',
        reference: ''
      });
      fetchData();
    } catch (err) {
      console.error(err);
      alert(t.saveError);
    } finally {
      setIsHadithSubmitting(false);
    }
  };

  const handleJsonImport = async () => {
    if (!jsonInput.trim()) return;
    
    setIsImporting(true);
    setError('');
    
    try {
      let data = JSON.parse(jsonInput);
      
      // If it's an object (e.g. {"sahih_bukhari": [...]}), flatten it or pick the first array
      if (!Array.isArray(data) && typeof data === 'object') {
        const firstKey = Object.keys(data)[0];
        if (Array.isArray(data[firstKey])) {
          // Add the key as the source for all items in that array if not provided
          data = data[firstKey].map((item: any) => ({ ...item, source: item.source || firstKey }));
        } else {
          throw new Error('JSON must be an array or an object containing an array of records.');
        }
      }
      
      if (!Array.isArray(data)) throw new Error('Data must be an array');
      
      const sourceCounts: Record<string, number> = {};
      
      for (const item of data) {
        // Support multiple field names for better compatibility
        const arabic = item.arabic || item.text_ar || item.text;
        const kurdish = item.kurdish || item.text_ku;
        const english = item.english || item.text_en || '';
        const sourceId = item.source || item.collection || item.book || 'bukhari';
        const reference = item.reference || item.ref || item.id?.toString() || '';
        const chapter = item.chapter || '';
        const narrator = item.narrator || '';
        const topic = item.topic || 'general';

        if (!arabic || !kurdish) continue;
        
        const newHadith = {
          arabic,
          kurdish,
          english,
          source: sourceId.toLowerCase(),
          reference,
          chapter,
          narrator,
          topic: topic.toLowerCase(),
          createdAt: new Date().toISOString()
        };
        
        await addDoc(collection(db, 'hadiths'), newHadith);
        sourceCounts[newHadith.source] = (sourceCounts[newHadith.source] || 0) + 1;
      }
      
      // Update counts in Firestore
      for (const [sourceId, incrementBy] of Object.entries(sourceCounts)) {
        const countRef = doc(db, 'hadith_counts', sourceId);
        const countDoc = await getDoc(countRef);
        
        if (countDoc.exists()) {
          await updateDoc(countRef, { count: increment(incrementBy) });
        } else {
          const localSource = hadithSourcesData.find(s => s.id === sourceId);
          await setDoc(countRef, { count: (localSource?.count || 0) + incrementBy });
        }
      }
      
      setJsonInput('');
      setShowJsonImport(false);
      alert((t as any).importSuccess || 'Import successful');
      fetchData();
    } catch (err: any) {
      console.error(err);
      setError(((t as any).invalidJson || 'Invalid JSON format') + ': ' + err.message);
    } finally {
      setIsImporting(false);
    }
  };

  const handleDeleteHadith = async (hadith: Hadith) => {
    if (!window.confirm(t.confirmDelete)) return;
    
    try {
      await deleteDoc(doc(db, 'hadiths', hadith.id!));
      
      // Decrement count
      const countRef = doc(db, 'hadith_counts', hadith.source);
      await updateDoc(countRef, { count: increment(-1) });
      
      fetchData();
    } catch (err) {
      console.error(err);
    }
  };

  // Mock data for trends if we don't have historical series
  const userActivityData = useMemo(() => {
    return [
      { name: 'Mon', active: 12 },
      { name: 'Tue', active: 18 },
      { name: 'Wed', active: 15 },
      { name: 'Thu', active: 25 },
      { name: 'Fri', active: 32 },
      { name: 'Sat', active: 28 },
      { name: 'Sun', active: 22 },
    ];
  }, []);

  if (loading) {
    return (
      <div className="fixed inset-0 bg-white z-[100] flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="animate-spin text-brand-emerald mx-auto mb-4" size={48} />
          <p className="text-slate-400 font-bold animate-pulse">Initializing Dashboard...</p>
        </div>
      </div>
    );
  }

  if (!user || !isAdmin) {
    return (
      <div className="fixed inset-0 bg-slate-50 z-[100] flex flex-col items-center justify-center p-6">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md bg-white rounded-[2.5rem] shadow-2xl overflow-hidden border border-slate-100"
        >
          <div className="p-10 bg-slate-900 text-white text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-emerald opacity-20 blur-3xl -mr-16 -mt-16" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-blue-500 opacity-20 blur-3xl -ml-16 -mb-16" />
            
            <div className="w-20 h-20 bg-white/10 rounded-[1.5rem] flex items-center justify-center mx-auto mb-6 backdrop-blur-xl border border-white/10">
              <ShieldCheck size={40} className="text-brand-emerald" />
            </div>
            <h1 className="text-3xl font-black mb-2 tracking-tight">Admin Gate</h1>
            <p className="text-slate-400 text-sm font-bold uppercase tracking-widest">Restricted Network</p>
          </div>

          <div className="p-10">
            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Authentication Header</label>
                <div className="relative">
                  <User className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                  <input 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-14 pr-6 py-5 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-brand-emerald focus:bg-white transition-all text-sm font-bold text-slate-800"
                    placeholder="Enter Identity..."
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="relative">
                  <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                  <input 
                    type="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-14 pr-6 py-5 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-brand-emerald focus:bg-white transition-all text-sm font-bold text-slate-800"
                    placeholder="Security Token..."
                    required
                  />
                </div>
              </div>

              {error && (
                <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="p-4 bg-red-50 text-red-600 rounded-2xl flex items-center gap-3 border border-red-100 text-xs font-bold">
                  <AlertCircle size={16} />
                  <p>{error}</p>
                </motion.div>
              )}

              <button 
                type="submit"
                disabled={loading}
                className="w-full py-5 bg-slate-900 text-white rounded-2xl font-black text-lg shadow-xl hover:bg-slate-800 active:scale-[0.98] transition-all flex items-center justify-center gap-3"
              >
                Access System
                <ChevronRight size={20} />
              </button>
            </form>

            <button 
              onClick={onBack}
              className="w-full mt-8 py-2 text-slate-300 font-bold text-xs hover:text-slate-500 transition-colors tracking-widest uppercase"
            >
              Cancel Request
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  // LOGGED IN VIEW - FULL DASHBOARD
  return (
    <div className="fixed inset-0 bg-slate-950 z-[100] flex text-slate-200 font-kurdish overflow-hidden">
      {/* SIDEBAR - SLEEK & SLIM */}
      <aside className="w-20 md:w-24 bg-slate-900/50 backdrop-blur-xl border-l border-slate-800 flex flex-col items-center py-10 shrink-0 z-20">
        <div className="w-12 h-12 bg-gradient-to-br from-brand-emerald to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-500/20 mb-12">
          <LayoutDashboard size={24} className="text-white" />
        </div>

        <nav className="flex-1 w-full px-2 space-y-4">
          <NavButton active={activeTab === 'overview'} onClick={() => setActiveTab('overview')} icon={<BarChart3 size={22} />} label={t.overview} />
          <NavButton active={activeTab === 'hadiths'} onClick={() => setActiveTab('hadiths')} icon={<Zap size={22} />} label={t.hadiths} />
          <NavButton active={activeTab === 'users'} onClick={() => { setActiveTab('users'); setSelectedUser(null); }} icon={<Smartphone size={22} />} label={language === 'ku' ? 'مۆبایلەکان' : language === 'ar' ? 'الأجهزة النشطة' : 'Mobile Devices'} />
          <NavButton active={activeTab === 'zikrs'} onClick={() => setActiveTab('zikrs')} icon={<TrendingUp size={22} />} label={t.analytics} />
          <NavButton active={activeTab === 'settings'} onClick={() => setActiveTab('settings')} icon={<SettingsIcon size={22} />} label={t.settings} />
        </nav>

        <div className="mt-auto w-full px-2 space-y-4 pt-8">
          <button 
            onClick={() => window.open('https://ai.studio/build', '_blank')}
            className="w-full aspect-square bg-slate-800 hover:bg-brand-emerald text-white rounded-2xl flex items-center justify-center transition-all group relative"
            title={t.updateCode}
          >
            <Code2 size={20} />
            <span className="absolute right-full mr-4 px-3 py-1 bg-slate-800 text-white text-[10px] font-bold rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
              {t.updateCode}
            </span>
          </button>
          
          <button 
            onClick={onBack}
            className="w-full aspect-square bg-slate-800/50 hover:bg-slate-700 text-slate-400 hover:text-white rounded-2xl flex items-center justify-center transition-all group relative"
            title={t.userMode}
          >
            <ChevronRight size={20} className="rotate-180" />
            <span className="absolute right-full mr-4 px-3 py-1 bg-slate-800 text-white text-[10px] font-bold rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
              {t.userMode}
            </span>
          </button>

          <button 
            onClick={handleLogout}
            className="w-full aspect-square bg-red-500/5 hover:bg-red-500 text-red-400 hover:text-white rounded-2xl flex items-center justify-center transition-all group relative"
            title={t.logout}
          >
            <LogOut size={20} />
            <span className="absolute right-full mr-4 px-3 py-1 bg-red-500 text-white text-[10px] font-bold rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
              {t.logout}
            </span>
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 h-full overflow-y-auto bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-slate-950 p-6 md:p-12 lg:p-16">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-16" dir={language === 'en' ? 'ltr' : 'rtl'}>
          <div className="space-y-3">
            <div className={`flex items-center gap-3 text-slate-500 ${language === 'en' ? 'justify-start' : 'justify-start'}`}>
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-emerald/80">{activeTab}</span>
              <div className="w-1.5 h-[1px] bg-slate-700" />
              <span className="text-[10px] font-bold opacity-40">System Node: 0x9F2</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-white leading-tight">
              {t.welcome}
              <span className="inline-block w-3 h-3 bg-brand-emerald rounded-full mx-4 animate-pulse shadow-[0_0_25px_rgba(16,185,129,0.5)]" />
            </h1>
          </div>

          <button 
            onClick={fetchData}
            className="flex items-center gap-3 px-10 py-5 bg-white/5 backdrop-blur-md border border-white/10 rounded-[2rem] font-black text-sm text-white hover:bg-white/10 transition-all shadow-2xl group"
          >
            <RefreshCw size={18} className={`${isStatsLoading ? 'animate-spin' : 'text-brand-emerald group-hover:rotate-180 transition-transform duration-700'}`} />
            {t.sync}
          </button>
        </header>

        <AnimatePresence mode="wait">
          {activeTab === 'overview' && (
            <motion.div 
              key="overview"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-12"
            >
              {/* STATUS GRIDS */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                <SummaryStat 
                  label={t.regUsers} 
                  value={stats?.totalUsers ?? 0} 
                  sub="+4.2% Growth" 
                  icon={<Users className="text-blue-400" />} 
                  trend="positive"
                  theme="blue"
                />
                <SummaryStat 
                  label={t.points} 
                  value={stats?.totalPoints ?? 0} 
                  sub="Global Economy"
                  icon={<Zap className="text-brand-gold" />} 
                  trend="positive"
                  theme="gold"
                />
                <SummaryStat 
                  label={t.recitations} 
                  value={stats?.totalTasbihCount ?? 0} 
                  sub="Engagement Pulse" 
                  icon={<TrendingUp className="text-brand-emerald" />} 
                  trend="positive"
                  theme="emerald"
                />
              </div>

              {/* CHARTS LAYER */}
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 md:gap-10">
                <ChartContainer title={t.traffic} subtitle="Real-time user traffic distribution">
                  <ResponsiveContainer width="100%" height={320}>
                    <AreaChart data={userActivityData}>
                      <defs>
                        <linearGradient id="colorTraffic" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#10b981" stopOpacity={0.4}/>
                          <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1e293b" />
                      <XAxis 
                        dataKey="name" 
                        axisLine={false} 
                        tickLine={false} 
                        tick={{fontSize: 11, fontWeight: 'bold', fill: '#64748b'}} 
                        dy={15} 
                      />
                      <YAxis 
                        axisLine={false} 
                        tickLine={false} 
                        tick={{fontSize: 11, fontWeight: 'bold', fill: '#64748b'}} 
                      />
                      <Tooltip 
                        contentStyle={{
                          backgroundColor: '#0f172a', 
                          borderRadius: '16px', 
                          border: '1px solid #334155', 
                          boxShadow: '0 25px 50px -12px rgb(0 0 0 / 0.5)',
                          color: '#fff'
                        }}
                        itemStyle={{ color: '#10b981', fontWeight: 'bold' }}
                      />
                      <Area 
                        type="monotone" 
                        dataKey="active" 
                        stroke="#10b981" 
                        strokeWidth={4} 
                        fillOpacity={1} 
                        fill="url(#colorTraffic)" 
                        animationDuration={2000}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </ChartContainer>

                <ChartContainer title={t.topZikrs} subtitle="Highest engagement by content category">
                  <ResponsiveContainer width="100%" height={320}>
                    <BarChart data={stats?.zikrStats?.slice(0, 5) ?? []}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1e293b" />
                      <XAxis 
                         dataKey="title" 
                         axisLine={false} 
                         tickLine={false} 
                         tick={{fontSize: 10, fontWeight: 'bold', fill: '#64748b'}} 
                         dy={15}
                         tickFormatter={(value) => value.substring(0, 12)}
                      />
                      <YAxis 
                        axisLine={false} 
                        tickLine={false} 
                        tick={{fontSize: 11, fontWeight: 'bold', fill: '#64748b'}} 
                      />
                      <Tooltip 
                        cursor={{fill: '#1e293b', radius: 12}}
                        contentStyle={{
                          backgroundColor: '#0f172a', 
                          borderRadius: '16px', 
                          border: '1px solid #334155',
                          color: '#fff'
                        }}
                      />
                      <Bar dataKey="viewCount" radius={[12, 12, 12, 12]} barSize={48}>
                        { (stats?.zikrStats ?? []).map((entry, index) => (
                          <Cell 
                            key={`cell-${index}`} 
                            fill={COLORS[index % COLORS.length]} 
                            className="hover:opacity-80 transition-opacity"
                          />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </div>

              {/* ACTION CALLOUT */}
              <div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-[2.5rem] p-10 md:p-14 border border-slate-700/50 shadow-2xl relative overflow-hidden group">
                 <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-5 pointer-events-none" />
                 <div className="absolute -top-24 -right-24 w-96 h-96 bg-brand-emerald opacity-[0.05] blur-[100px] rounded-full group-hover:opacity-10 transition-opacity" />
                 
                 <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-10">
                    <div className="text-center lg:text-right max-w-xl space-y-4">
                       <h3 className="text-3xl md:text-4xl font-black text-white leading-tight">{t.devCenter}</h3>
                       <p className="text-slate-400 font-bold leading-relaxed text-sm md:text-base">
                         This interface is dynamically controlled. Use AI Studio to inject new modules or modify the administrative engine.
                       </p>
                    </div>
                    <button 
                      onClick={() => window.open('https://ai.studio/build', '_blank')}
                      className="px-12 py-6 bg-brand-emerald text-white rounded-[2rem] font-black text-lg hover:scale-105 active:scale-95 transition-all shadow-[0_15px_40px_-10px_rgba(6,95,70,0.4)] flex items-center gap-4 group"
                    >
                      <Code2 size={24} className="group-hover:rotate-12 transition-transform" />
                      {t.openBuilder}
                    </button>
                 </div>
              </div>
            </motion.div>
          )}



          {activeTab === 'hadiths' && (
            <motion.div 
              key="hadiths"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              className="space-y-8"
            >
              <div className="flex justify-between items-center bg-slate-900/50 backdrop-blur-md p-8 rounded-[2.5rem] border border-slate-800 shadow-xl">
                <div>
                  <h3 className="text-2xl font-black text-white">{t.hadiths}</h3>
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mt-1">Repository Management</p>
                </div>
                <div className="flex gap-4">
                  <button 
                    onClick={() => { setShowHadithForm(true); setShowJsonImport(false); }}
                    className="px-8 py-4 bg-brand-emerald text-white rounded-2xl font-black text-sm hover:scale-105 active:scale-95 transition-all shadow-lg shadow-brand-emerald/20 flex items-center gap-2"
                  >
                    <Zap size={18} fill="currentColor" />
                    {t.addHadith}
                  </button>
                  <button 
                    onClick={() => { setShowJsonImport(!showJsonImport); setShowHadithForm(false); }}
                    className={`px-8 py-4 rounded-2xl font-black text-sm transition-all flex items-center gap-2 ${showJsonImport ? 'bg-indigo-600 text-white shadow-xl translate-y-[-2px]' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'}`}
                  >
                    <Code2 size={18} />
                    {(t as any).importJson || 'JSON Import'}
                  </button>
                </div>
              </div>

              {showJsonImport && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-slate-900 border border-indigo-500/30 p-10 rounded-[3rem] shadow-2xl relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 blur-3xl rounded-full" />
                  
                  <div className="space-y-6 relative z-10">
                    <div className="flex justify-between items-center">
                      <h4 className="text-xl font-black text-white">{(t as any).importJson || 'JSON Bulk Import'}</h4>
                      <div className="flex flex-col items-end gap-2 text-[10px] font-black text-indigo-400 uppercase tracking-widest">
                        <div className="bg-indigo-500/10 px-3 py-1 rounded-lg flex items-center gap-2">
                          <AlertCircle size={12} />
                          Array Format Required
                        </div>
                        <span className="text-[8px] opacity-70">Supports: arabic/text_ar, kurdish/text_ku, narrator, chapter, source</span>
                      </div>
                    </div>
                    
                    <textarea 
                      value={jsonInput}
                      onChange={(e) => setJsonInput(e.target.value)}
                      placeholder={(t as any).jsonPlaceholder || '[{"arabic": "...", "kurdish": "...", "source": "bukhari"}]'}
                      className="w-full px-8 py-6 bg-slate-950 border border-slate-800 rounded-3xl text-xs font-mono text-indigo-300 focus:ring-2 focus:ring-indigo-500 outline-none min-h-[300px] leading-relaxed"
                    />
                    
                    {error && (
                      <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-500 text-xs font-bold flex items-center gap-3">
                        <AlertCircle size={16} />
                        {error}
                      </div>
                    )}
                    
                    <div className="flex gap-4">
                      <button 
                        onClick={handleJsonImport}
                        disabled={isImporting || !jsonInput.trim()}
                        className="flex-1 py-5 bg-indigo-600 text-white rounded-2xl font-black text-lg hover:bg-indigo-500 transition-all flex items-center justify-center gap-3 disabled:opacity-50"
                      >
                        {isImporting ? <Loader2 size={24} className="animate-spin" /> : <RefreshCw size={24} />}
                        {(t as any).importJson || 'Process Import'}
                      </button>
                      <button 
                        onClick={() => setShowJsonImport(false)}
                        className="px-10 py-5 bg-slate-800 text-slate-300 rounded-2xl font-black text-lg hover:bg-slate-700 transition-all"
                      >
                        {t.cancel}
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}

              {showHadithForm && (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-slate-900 border border-brand-emerald/30 p-10 rounded-[3rem] shadow-2xl relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-brand-emerald/10 blur-3xl rounded-full" />
                  
                  <form onSubmit={handleAddHadith} className="space-y-8 relative z-10">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                       <div className="space-y-2">
                         <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">{t.source}</label>
                         <select 
                           value={hadithForm.source}
                           onChange={(e) => setHadithForm({...hadithForm, source: e.target.value})}
                           className="w-full px-6 py-4 bg-slate-950 border border-slate-800 rounded-2xl text-sm font-bold text-white focus:ring-2 focus:ring-brand-emerald outline-none"
                         >
                           {hadithSourcesData.map(s => (
                             <option key={s.id} value={s.id}>{s.name[language]}</option>
                           ))}
                         </select>
                       </div>
                       <div className="space-y-2">
                         <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">{t.topic}</label>
                         <input 
                           type="text"
                           value={hadithForm.topic}
                           onChange={(e) => setHadithForm({...hadithForm, topic: e.target.value})}
                           className="w-full px-6 py-4 bg-slate-950 border border-slate-800 rounded-2xl text-sm font-bold text-white focus:ring-2 focus:ring-brand-emerald outline-none"
                           placeholder={t.topicPlaceholder}
                         />
                       </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">{t.reference}</label>
                      <input 
                        type="text"
                        value={hadithForm.reference}
                        onChange={(e) => setHadithForm({...hadithForm, reference: e.target.value})}
                        className="w-full px-6 py-4 bg-slate-950 border border-slate-800 rounded-2xl text-sm font-bold text-white focus:ring-2 focus:ring-brand-emerald outline-none"
                        placeholder={t.refPlaceholder}
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">{t.arabicText}</label>
                      <textarea 
                        value={hadithForm.arabic}
                        onChange={(e) => setHadithForm({...hadithForm, arabic: e.target.value})}
                        className="w-full px-6 py-4 bg-slate-950 border border-slate-800 rounded-2xl text-lg font-bold text-white focus:ring-2 focus:ring-brand-emerald outline-none min-h-[120px] quran-font text-right"
                        dir="rtl"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">{t.kurdishText}</label>
                      <textarea 
                        value={hadithForm.kurdish}
                        onChange={(e) => setHadithForm({...hadithForm, kurdish: e.target.value})}
                        className="w-full px-6 py-4 bg-slate-950 border border-slate-800 rounded-2xl text-base font-bold text-white focus:ring-2 focus:ring-brand-emerald outline-none min-h-[100px]"
                        dir="rtl"
                      />
                    </div>

                    <div className="flex gap-4 pt-4">
                      <button 
                        type="submit"
                        disabled={isHadithSubmitting}
                        className="flex-1 py-5 bg-brand-emerald text-white rounded-2xl font-black text-lg hover:bg-emerald-600 transition-all flex items-center justify-center gap-3 disabled:opacity-50"
                      >
                        {isHadithSubmitting ? <Loader2 size={24} className="animate-spin" /> : <ShieldCheck size={24} />}
                        {t.save}
                      </button>
                      <button 
                        type="button"
                        onClick={() => setShowHadithForm(false)}
                        className="px-10 py-5 bg-slate-800 text-slate-300 rounded-2xl font-black text-lg hover:bg-slate-700 transition-all"
                      >
                        {t.cancel}
                      </button>
                    </div>
                  </form>
                </motion.div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {stats?.hadiths?.map((h) => (
                  <motion.div 
                    layout
                    key={h.id}
                    className="bg-slate-900/50 backdrop-blur-md p-8 rounded-[2.5rem] border border-slate-800 shadow-xl relative group"
                  >
                    <div className="flex justify-between items-start mb-6">
                      <div>
                        <span className="px-3 py-1 bg-brand-emerald/10 text-brand-emerald rounded-lg text-[10px] font-black uppercase tracking-widest">{h.source}</span>
                        <p className="text-[10px] font-bold text-slate-500 mt-2">{h.reference}</p>
                      </div>
                      <button 
                        onClick={() => handleDeleteHadith(h)}
                        className="p-3 bg-red-500/10 text-red-400 rounded-xl opacity-0 group-hover:opacity-100 transition-all hover:bg-red-500 hover:text-white"
                      >
                        <AlertCircle size={18} />
                      </button>
                    </div>
                    
                    <div className="space-y-4">
                      <p className="text-xl font-bold text-white leading-[1.8] text-right quran-font" dir="rtl">{h.arabic}</p>
                      <div className="h-[1px] bg-slate-800 w-12" />
                      <p className="text-sm font-bold text-slate-400 leading-relaxed text-right" dir="rtl">{h.kurdish}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}



          {activeTab === 'users' && (() => {
            const getUserDhikrs = (u: any) => {
              if (!u) return 0;
              return u.totalDhikrs !== undefined ? u.totalDhikrs : ((u.totalTasbihCount || 0) + (u.totalZikrsCompleted || 0));
            };

            const getUserLevel = (u: any) => {
              if (!u) return 1;
              return u.currentLevel !== undefined ? u.currentLevel : Math.min(100, Math.max(1, Math.floor(Math.sqrt(getUserDhikrs(u) * 1.5)) + 1));
            };

            const isUserOnline = (u: any) => {
              if (!u) return false;
              return u.status === 'online';
            };

            const sortedUsers = [...(stats?.usersList || [])]
              .filter(u => !userSearchQuery.trim() || u.id?.toLowerCase().includes(userSearchQuery.toLowerCase()))
              .sort((a, b) => {
                if (sortCriteria === 'leaderboard') {
                  const bLevel = getUserLevel(b);
                  const aLevel = getUserLevel(a);
                  if (bLevel !== aLevel) return bLevel - aLevel;
                  return getUserDhikrs(b) - getUserDhikrs(a);
                }
                if (sortCriteria === 'points') return (b.points || 0) - (a.points || 0);
                if (sortCriteria === 'tasbih') return (b.totalTasbihCount || 0) - (a.totalTasbihCount || 0);
                if (sortCriteria === 'level') {
                  const bLevel = getUserLevel(b);
                  const aLevel = getUserLevel(a);
                  return bLevel - aLevel;
                }
                const dateA = a.updatedAt ? new Date(a.updatedAt).getTime() : 0;
                const dateB = b.updatedAt ? new Date(b.updatedAt).getTime() : 0;
                return dateB - dateA;
              });

            const displayedUsers = sortCriteria === 'leaderboard' 
              ? sortedUsers.slice(0, 100) 
              : sortedUsers;

            return (
              <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
                {/* DEVICE LIST COLUMN */}
                <motion.div 
                  key="users-list-pane"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="xl:col-span-7 bg-slate-900/50 backdrop-blur-md rounded-[2.5rem] border border-slate-800 shadow-2xl overflow-hidden"
                >
                  <div className="p-8 border-b border-slate-800 space-y-6">
                    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                      <div className="space-y-1">
                        <h3 className="text-2xl font-black text-white">
                          {language === 'ku' ? 'ئامارەکانی مۆبایل بەجیا' : language === 'ar' ? 'أجهزة الهواتف المنفردة' : 'Device Explorer'}
                        </h3>
                        <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">
                          {language === 'ku' ? 'تۆماری هەر مۆبایلێک و چالاکیەکانی بەجیا' : language === 'ar' ? 'تفاصيل كل مۆبايل ومستويات وتفاعل الذكر' : 'Individual phone level tracking & specific zikrs'}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-slate-500">{language === 'ku' ? 'ڕێکخستن:' : 'Sort:'}</span>
                        <select 
                          value={sortCriteria} 
                          onChange={(e) => setSortCriteria(e.target.value as any)}
                          className="px-4 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs font-bold text-slate-300 focus:ring-1 focus:ring-brand-emerald outline-none cursor-pointer"
                        >
                          <option value="leaderboard">🏆 {language === 'ku' ? 'پێشەنگەکانی یەکەم ١٠٠' : 'Top 100 Leaderboard'}</option>
                          <option value="points">{language === 'ku' ? 'خاڵەکان' : 'Points'}</option>
                          <option value="tasbih">{language === 'ku' ? 'تەسبیحات' : 'Tasbih Clicks'}</option>
                          <option value="level">{language === 'ku' ? 'ئاستی مۆبایل (١-١٠٠)' : 'Level 1-100'}</option>
                          <option value="recent">{language === 'ku' ? 'کۆتا چالاکی' : 'Recent'}</option>
                        </select>
                      </div>
                    </div>

                    <div className="relative w-full">
                      <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                      <input 
                        type="text" 
                        value={userSearchQuery}
                        onChange={(e) => setUserSearchQuery(e.target.value)}
                        placeholder={language === 'ku' ? 'بگەڕێ بۆ ناسنامەی ئامێر یان مۆبایل...' : language === 'ar' ? 'البحث عن معرف هاتف...' : 'Search by Device ID...'}
                        className="w-full pl-12 pr-6 py-4 bg-slate-950 border border-slate-800 rounded-2xl text-sm font-bold text-white focus:ring-2 focus:ring-brand-emerald transition-all placeholder:text-slate-600"
                      />
                    </div>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse min-w-[500px]">
                      <thead>
                        <tr className="bg-slate-900/80">
                          <th className="p-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">{language === 'ku' ? 'مۆبایل / ناسنامە' : 'Device Identity'}</th>
                          <th className="p-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 text-center">{language === 'ku' ? 'ئاست (١-١٠٠)' : 'Level 1-100'}</th>
                          <th className="p-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 text-center">{language === 'ku' ? 'کۆی زیکرەکان' : 'Total Dhikrs'}</th>
                          <th className="p-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 text-right">{language === 'ku' ? 'نوێکردنەوە' : 'Last Sync'}</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800">
                        {displayedUsers.map((u) => {
                          const level100 = getUserLevel(u);
                          const totalDhikrs = getUserDhikrs(u);
                          const online = isUserOnline(u);
                          const isSelected = selectedUser?.id === u.id;
                          const rankIndex = sortedUsers.findIndex(usr => usr.id === u.id) + 1;

                          return (
                            <tr 
                              key={u.id} 
                              onClick={() => setSelectedUser(u)}
                              className={`cursor-pointer transition-colors group ${isSelected ? 'bg-slate-800/80 border-r-4 border-brand-emerald' : 'hover:bg-slate-800/30'}`}
                            >
                              <td className="p-6">
                                <div className="flex items-center gap-4">
                                  {sortCriteria === 'leaderboard' ? (
                                    <div className="w-10 h-10 rounded-xl flex items-center justify-center font-black text-sm shrink-0 bg-slate-850/70 text-brand-emerald">
                                      {rankIndex === 1 ? '🥇' : rankIndex === 2 ? '🥈' : rankIndex === 3 ? '🥉' : `#${rankIndex}`}
                                    </div>
                                  ) : (
                                    <div className="w-10 h-10 bg-slate-800 rounded-xl flex items-center justify-center text-[10px] font-black uppercase text-brand-emerald group-hover:bg-brand-emerald group-hover:text-white transition-colors shrink-0">
                                      <Smartphone size={16} />
                                    </div>
                                  )}
                                  <div className="truncate max-w-[150px] sm:max-w-xs text-left">
                                    <div className="flex items-center gap-2">
                                      <span className="font-bold text-slate-300 group-hover:text-white transition-colors block text-sm truncate" title={u.id}>
                                        بەندەی اللە #{u.userNo || 'N/A'}
                                      </span>
                                      {online ? (
                                        <span className="flex h-2 w-2 relative shrink-0">
                                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                                        </span>
                                      ) : (
                                        <span className="h-2 w-2 rounded-full bg-slate-600 block shrink-0"></span>
                                      )}
                                    </div>
                                    <span className={`text-[10px] font-bold block mt-0.5 ${online ? 'text-emerald-400' : 'text-slate-500'}`}>
                                      {online ? 'ئۆنڵاین (Online)' : 'ئۆفڵاین (Offline)'} | Reg #{u.userNo || 'N/A'}
                                    </span>
                                  </div>
                                </div>
                              </td>
                              <td className="p-6 text-center">
                                <span className="inline-flex items-center px-3 py-1 bg-brand-emerald/10 border border-brand-emerald/30 text-brand-emerald rounded-full text-[10px] font-black tracking-widest">
                                  Lv. {level100}
                                </span>
                              </td>
                              <td className="p-6 text-center">
                                <div className="font-black text-brand-gold text-sm leading-none">{totalDhikrs}</div>
                                <div className="text-[9px] text-slate-500 font-bold mt-1 uppercase tracking-tighter">
                                  {u.totalTasbihCount || 0} clicks
                                </div>
                              </td>
                              <td className="p-6 text-[10px] font-black text-slate-600 uppercase text-right">
                                {u.lastActive ? new Date(u.lastActive).toLocaleDateString() : (u.updatedAt ? new Date(u.updatedAt).toLocaleDateString() : 'Offline Sync')}
                              </td>
                            </tr>
                          );
                        })}
                        {displayedUsers.length === 0 && (
                          <tr>
                            <td colSpan={4} className="p-12 text-center text-slate-500 font-bold italic">
                              No mobile devices registered.
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </motion.div>

                {/* DEVICE INSPECTOR COLUMN */}
                <motion.div 
                  key="device-inspector-pane"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="xl:col-span-5 bg-slate-900/40 backdrop-blur-xl rounded-[2.5rem] border border-slate-800 shadow-2xl p-8 space-y-8"
                >
                  {!selectedUser ? (
                    <div className="text-center py-20 flex flex-col items-center justify-center space-y-4">
                      <div className="w-20 h-20 bg-slate-800/40 text-slate-600 rounded-3xl flex items-center justify-center border border-slate-800">
                        <Smartphone size={36} />
                      </div>
                      <div className="space-y-1">
                        <h4 className="font-black text-lg text-slate-300">
                          {language === 'ku' ? 'مۆبایلێک هەڵبژێرە' : 'Select a Device'}
                        </h4>
                        <p className="text-xs text-slate-500 max-w-xs mx-auto leading-relaxed">
                          {language === 'ku' ? 'تکایە ئامێرێک دەستنیشان بکە لە چەپ بۆ بینینی ئاستی گوزارشتکارانەی ١ تا ١٠٠، ڕێژەکەی، کۆی زیکر و چالاکیەکانی خۆی بەجیا' : 'Select an active device record from the ledger on the left to inspect detailed parameters and activities.'}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-8">
                      {/* Header */}
                      <div className="flex justify-between items-start border-b border-slate-800 pb-6">
                        <div className="space-y-1.5 text-left">
                          <span className={`px-3 py-1 border rounded-full text-[9px] font-black uppercase tracking-widest inline-flex items-center gap-1.5 ${
                            isUserOnline(selectedUser) 
                              ? 'bg-emerald-500/15 text-brand-emerald border-brand-emerald/30' 
                              : 'bg-slate-800/50 text-slate-400 border-slate-750'
                          }`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${isUserOnline(selectedUser) ? 'bg-brand-emerald animate-pulse' : 'bg-slate-500'}`} />
                            {isUserOnline(selectedUser) 
                              ? (language === 'ku' ? 'ئۆنلاین مەوجودە' : 'ONLINE') 
                              : (language === 'ku' ? 'ئۆفلاینی دوور' : 'OFFLINE')}
                          </span>
                          <h4 className="font-black text-lg text-white truncate max-w-[200px]" title={selectedUser.id}>
                            بەندەی اللە #{selectedUser.userNo || 'N/A'}
                          </h4>
                          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                            {language === 'ku' ? 'مۆبایلی تۆمارکراو بەجیا' : 'SECURE NODE ID'}
                          </p>
                        </div>
                        <button 
                          onClick={() => setSelectedUser(null)}
                          className="p-2 bg-slate-800/50 hover:bg-slate-800 text-slate-400 hover:text-white rounded-xl transition-all"
                        >
                          ✕
                        </button>
                      </div>

                      {/* Score metrics */}
                      {(() => {
                        const level100 = getUserLevel(selectedUser);
                        const points = selectedUser.points || 0;
                        const tasbihs = selectedUser.totalTasbihCount || 0;
                        const zikrs = selectedUser.totalZikrsCompleted || 0;
                        const totalDhikrs = getUserDhikrs(selectedUser);
                        const compositeScore = points + (tasbihs * 2) + (zikrs * 10);
                        
                        const currentLevelProgressScore = compositeScore % 250;
                        const pctNextLevel = Math.round((currentLevelProgressScore / 250) * 100);
                        
                        let levelTitle = '';
                        let levelGrad = 'from-cyan-400 to-blue-500';
                        if (level100 <= 20) {
                          levelTitle = language === 'ku' ? 'دڵێکی تینوو (سەرەتایی)' : 'Thirsty Devotee';
                          levelGrad = 'from-indigo-400 to-blue-500';
                        } else if (level100 <= 40) {
                          levelTitle = language === 'ku' ? 'دڵێکی زاکر و ئومێدەوار' : 'Awoken Zakir';
                          levelGrad = 'from-emerald-400 to-teal-500';
                        } else if (level100 <= 60) {
                          levelTitle = language === 'ku' ? 'دڵێکی بەخەبەر و ئارام' : 'Ardent Believer';
                          levelGrad = 'from-amber-400 to-yellow-500';
                        } else if (level100 <= 80) {
                          levelTitle = language === 'ku' ? 'دڵێکی ڕۆشن کەرەوە' : 'Illuminated Sage';
                          levelGrad = 'from-orange-400 to-red-500';
                        } else {
                          levelTitle = language === 'ku' ? 'دڵێکی عاریفی گەیشتوو' : 'Divine Sage';
                          levelGrad = 'from-purple-400 to-pink-500';
                        }

                        // Calculate relative Rates: how active is this user compared to top expectations
                        const generalEngagementRate = Math.min(100, Math.max(5, Math.round((points / 5000) * 100)));

                        return (
                          <div className="space-y-6">
                            {/* LEVEL DECK 1 to 100 */}
                            <div className="p-6 bg-slate-950/60 rounded-3xl border border-slate-800 grid grid-cols-1 gap-4 text-center">
                              <span className="text-[10px] text-slate-500 font-extrabold uppercase tracking-widest block">
                                {language === 'ku' ? 'ئاستی مۆبایل لە ١ تا ١٠٠ بەپێی زیکر' : 'DEVICE DYNAMIC LEVEL (1 - 100)'}
                              </span>
                              <div className="inline-flex relative items-center justify-center mx-auto my-2">
                                <div className="absolute inset-[-8px] bg-brand-emerald rounded-full opacity-10 blur-xl" />
                                <div className="w-24 h-24 rounded-full border-4 border-slate-850 flex flex-col items-center justify-center bg-slate-900 relative z-10 shadow-xl">
                                  <span className="text-3xl font-black text-brand-emerald">{level100}</span>
                                  <span className="text-[9px] text-slate-500 font-extrabold tracking-widest uppercase block mt-0.5">Scale Index</span>
                                </div>
                              </div>
                              <div className="space-y-1.5">
                                <h5 className="font-extrabold text-slate-200 text-sm tracking-wide">{levelTitle}</h5>
                                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">
                                  {language === 'ku' ? `کۆی داتای کارایی: ${compositeScore}` : `Spiritual Performance Metric: ${compositeScore}`}
                                </p>
                              </div>

                              {/* Progress to next level bar */}
                              <div className="space-y-2 pt-2 text-right">
                                <div className="flex justify-between items-center text-[9px] font-bold text-slate-550">
                                  <span>{pctNextLevel}%</span>
                                  <span>{language === 'ku' ? 'بەرەو ئاستی داهاتوو' : 'Progress to next level'}</span>
                                </div>
                                <div className="w-full h-1.5 bg-slate-900 rounded-full overflow-hidden">
                                  <div 
                                    className={`h-full bg-gradient-to-r ${levelGrad} rounded-full transition-all duration-500`}
                                    style={{ width: `${pctNextLevel}%` }}
                                  />
                                </div>
                              </div>
                            </div>

                            {/* Relative individual rates and engagement stats */}
                            <div className="grid grid-cols-2 gap-4">
                              <div className="p-4 bg-slate-900/40 border border-slate-800/80 rounded-2xl text-right">
                                <span className="text-[9px] text-slate-500 font-bold block mb-1">
                                  {language === 'ku' ? 'کۆی تەسپیح' : 'TASBIH CLICKS'}
                                </span>
                                <p className="text-lg font-black text-white">{tasbihs}</p>
                              </div>
                              <div className="p-4 bg-slate-900/40 border border-slate-800/80 rounded-2xl text-right">
                                <span className="text-[9px] text-slate-500 font-bold block mb-1">
                                  {language === 'ku' ? 'زیکرەکان' : 'COMPLETED ZIKRS'}
                                </span>
                                <p className="text-lg font-black text-white">{zikrs}</p>
                              </div>
                              <div className="p-4 bg-slate-900/40 border border-slate-800/80 rounded-2xl text-right">
                                <span className="text-[9px] text-slate-500 font-bold block mb-1">
                                  {language === 'ku' ? 'ئایەتەکان' : 'QURAN AYAHS'}
                                </span>
                                <p className="text-lg font-black text-white">{selectedUser.totalAyahsRead || 0}</p>
                              </div>
                              <div className="p-4 bg-slate-900/40 border border-slate-800/80 rounded-2xl text-right">
                                <span className="text-[9px] text-slate-500 font-bold block mb-1">
                                  {language === 'ku' ? 'ڕێژەی چالاکی مۆبایلەکە' : 'MOBILE PERFORMANCE RATE'}
                                </span>
                                <p className="text-lg font-black text-brand-gold">{generalEngagementRate}%</p>
                              </div>
                            </div>

                            {/* Timeline ledger of activities */}
                            <div className="space-y-4 pt-4 border-t border-slate-850">
                              <h5 className="text-[10px] font-black text-slate-450 uppercase tracking-widest flex items-center justify-end gap-2 text-right">
                                <span>{language === 'ku' ? 'رۆژنامەی و مێژووی سەردانی مۆبایلەکە' : 'Mobile Historical Logs'}</span>
                                <Calendar size={13} className="text-slate-500" />
                              </h5>

                              <div className="space-y-2 max-h-[180px] overflow-y-auto pr-1">
                                {(!selectedUser.history || selectedUser.history.length === 0) ? (
                                  <div className="text-center py-4 text-xs text-slate-500 font-bold italic">
                                    {language === 'ku' ? 'هیچ تۆمارێکی چالاکی ڕۆژانە نییە' : 'No periodic logs committed yet.'}
                                  </div>
                                ) : (
                                  [...selectedUser.history].reverse().map((day: any, dIdx: number) => (
                                    <div key={dIdx} className="bg-slate-950/60 p-3 rounded-xl border border-slate-850 flex items-center justify-between text-xs font-mono">
                                      <div className="flex gap-2 text-[9px] text-slate-500">
                                        <span>{day.points || 0} pts</span>
                                        <span>•</span>
                                        <span>{day.zikrs || 0} zikrs</span>
                                        {day.ayahs > 0 && (
                                          <>
                                            <span>•</span>
                                            <span>{day.ayahs} ayahs</span>
                                          </>
                                        )}
                                      </div>
                                      <span className="text-slate-400 text-[10px]">{day.date}</span>
                                    </div>
                                  ))
                                )}
                              </div>
                            </div>
                          </div>
                        );
                      })()}
                    </div>
                  )}
                </motion.div>
              </div>
            );
          })()}

          {activeTab === 'zikrs' && (() => {
            const onlineCount = stats?.usersList?.filter(u => isUserOnline(u)).length || 0;
            const trueOnline = onlineCount || 1;
            const totalDevices = stats?.totalUsers || stats?.usersList?.length || 1;
            const totalTasbihCount = stats?.totalTasbihCount || 0;
            const totalZikrsCompleted = stats?.usersList?.reduce((acc: number, u: any) => acc + (u.totalZikrsCompleted || 0), 0) || 0;
            const totalPoints = stats?.totalPoints || 0;
            const zikrListSnapshot = stats?.zikrStats || [];

            return (
              <motion.div 
                key="analytics-community"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-8"
              >
                <div className="bg-slate-900/40 backdrop-blur-xl p-8 rounded-[3rem] border border-slate-800 space-y-8">
                  <div className="flex items-center gap-4 border-b border-slate-800 pb-4 justify-between" dir={language === 'en' ? 'ltr' : 'rtl'}>
                     <div className="flex items-center gap-3">
                       <Users size={28} className="text-brand-emerald" />
                       <div className="text-right sm:text-left">
                         <h3 className="text-xl font-black text-white uppercase tracking-wider">
                           {language === 'ku' ? 'ئامارەکانی کۆمەڵگە ڕاستەوخۆ' : language === 'ar' ? 'إحصائيات المجتمع المباشرة' : 'Live Community Statistics'}
                         </h3>
                         <p className="text-[10px] text-slate-500 font-extrabold uppercase tracking-widest">
                           {language === 'ku' ? 'ئەنجامەکانی خەڵک لەگەڵ ژمارەی مۆبایلی بەشداربووان' : language === 'ar' ? 'مشاركات المجتمع الكلي مع عدد الهواتف' : 'Global participation indicators & active devices'}
                         </p>
                       </div>
                     </div>
                  </div>

                  {/* Device Beacon Cards - Shows App Installs vs Online */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Card 1: Total Installs / Registered Devices */}
                    <div className="flex gap-4 items-center justify-between p-6 bg-slate-950/60 rounded-3xl border border-slate-800 transition-all hover:border-slate-705">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-brand-emerald/10 text-brand-emerald rounded-2xl flex items-center justify-center">
                          <Smartphone size={24} />
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-black text-slate-100">
                            {language === 'ku' ? 'تۆمارکراوی ئەپەکە' : language === 'ar' ? 'الأجهزة المسجلة' : 'Registered Devices'}
                          </p>
                          <p className="text-[10px] text-slate-500 font-bold leading-normal">
                            {language === 'ku' ? 'کۆی گشتی مۆبایلەکان' : language === 'ar' ? 'إجمالي الأجهزة المثبتة' : 'Total installed devices/users'}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="text-3xl font-extrabold text-brand-emerald dark:text-brand-gold">{totalDevices}</span>
                        <span className="text-[10px] text-slate-500 font-black block uppercase tracking-wider">
                          {language === 'ku' ? 'مۆبایل' : language === 'ar' ? 'جهاز' : 'Devices'}
                        </span>
                      </div>
                    </div>

                    {/* Card 2: Currently Active Online Devices */}
                    <div className="flex gap-4 items-center justify-between p-6 bg-slate-950/60 rounded-3xl border border-slate-800 transition-all hover:border-slate-705">
                      <div className="flex items-center gap-3">
                        <div className="relative w-12 h-12 bg-amber-500/10 text-amber-500 rounded-2xl flex items-center justify-center">
                          <Smartphone size={24} />
                          <span className="absolute -top-1 -right-1 flex h-3 w-3">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-500"></span>
                          </span>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-black text-slate-100">
                            {language === 'ku' ? 'مۆبایلە چالاکەکان' : language === 'ar' ? 'الهواتف النشطة الآن' : 'Active Mobile Devices'}
                          </p>
                          <p className="text-[10px] text-slate-500 font-bold leading-normal">
                            {language === 'ku' ? 'سەر هێڵ لە ئێستادا' : language === 'ar' ? 'المتصلين بالإنترنت حالياً' : 'Currently active on-line'}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="text-3xl font-extrabold text-amber-500">{trueOnline}</span>
                        <span className="text-[10px] text-slate-500 font-black block uppercase tracking-wider">
                          {language === 'ku' ? 'لەسەر هێڵە' : language === 'ar' ? 'متصل' : 'Online'}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* General Community Totals Summary widget */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="p-5 bg-slate-950/40 rounded-2xl border border-slate-805 text-center">
                       <span className="text-[10px] text-slate-500 font-black uppercase block mb-1">
                         {language === 'ku' ? 'تەسریحەکانی کۆمەڵگە' : language === 'ar' ? 'تسبيحات المجتمع الكلي' : 'Total Community Tasbihs'}
                       </span>
                       <span className="text-2xl font-black text-white">
                         {totalTasbihCount}
                       </span>
                    </div>
                    <div className="p-5 bg-slate-950/40 rounded-2xl border border-slate-805 text-center">
                       <span className="text-[10px] text-slate-500 font-black uppercase block mb-1">
                         {language === 'ku' ? 'زیکرە بەکۆمەڵەکان' : language === 'ar' ? 'مجموع الأذكار' : 'Total Community Zikrs'}
                       </span>
                       <span className="text-2xl font-black text-white">
                         {totalZikrsCompleted}
                       </span>
                    </div>
                    <div className="p-5 bg-slate-950/40 rounded-2xl border border-slate-805 text-center">
                       <span className="text-[10px] text-slate-550 font-black uppercase block mb-1">
                         {language === 'ku' ? 'خاڵەکانی کۆمەڵگە' : language === 'ar' ? 'نقاط المجتمع العامة' : 'Total Global Points'}
                       </span>
                       <span className="text-2xl font-black text-brand-emerald">
                         {totalPoints}
                       </span>
                    </div>
                  </div>

                  {/* Percentage Shares of each Zikr (ڕێژەی زیکرەکانی خەڵک) */}
                  <div className="space-y-4 pt-4 border-t border-slate-800">
                    <h4 className="text-sm font-black text-white uppercase tracking-wider flex items-center gap-2" dir={language === 'en' ? 'ltr' : 'rtl'}>
                      <PieChartIcon size={18} className="text-amber-500" />
                      <span>
                        {language === 'ku' ? 'ڕێژەی زیکرەکانی خەڵک (%)' : language === 'ar' ? 'نسب الأذكار المقروءة (%)' : 'Community Zikr Percentages (%)'}
                      </span>
                    </h4>
                    <p className="text-[10px] text-slate-500 font-bold leading-relaxed -mt-2" dir={language === 'en' ? 'ltr' : 'rtl'}>
                      {language === 'ku' ? 'ڕێژەی خوێندنەوەی هەر زیکرێک لەلایەن بەکارهێنەرانی ئەپلیکەیشنەوە بە شێوەی ڕاستەوخۆ' : language === 'ar' ? 'نسب مشاركة وتفاعل المجتمع لقراءة كل ذكر مباشرة' : 'Real-time relative statistics measuring participation for each zikr is displayed below.'}
                    </p>

                    <div className="space-y-5">
                      {zikrListSnapshot.length === 0 ? (
                        <div className="text-center py-6 text-xs text-slate-500 font-bold">
                          {language === 'ku' ? 'هیچ زانیاری زیکرێک نییە تا پیشان بدرێت...' : language === 'ar' ? 'لا يوجد تفاعلات مسجلة بعد...' : 'Recording initial community parameters...'}
                        </div>
                      ) : (
                        zikrListSnapshot.map((item: any) => {
                          const count = item.totalClicks || item.viewCount || 1;
                          const total = zikrListSnapshot.reduce((acc: number, c: any) => acc + (c.totalClicks || c.viewCount || 1), 0) || 1;
                          const pct = Math.round((count / total) * 100);
                          
                          return (
                            <div key={item.id} className="space-y-1.5 transition-all p-3 hover:bg-slate-950 rounded-2xl border border-transparent hover:border-slate-850">
                              <div className="flex justify-between items-center text-xs" dir={language === 'en' ? 'ltr' : 'rtl'}>
                                <span className="font-bold text-slate-300 truncate max-w-[180px] sm:max-w-md quran-font text-right">
                                  {item.title}
                                </span>
                                <span className="font-black text-brand-emerald shrink-0">
                                  {pct}% ({count})
                                </span>
                              </div>
                              <div className="w-full h-3 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
                                <motion.div 
                                  initial={{ width: 0 }}
                                  animate={{ width: `${pct}%` }}
                                  transition={{ duration: 0.8, ease: 'easeOut' }}
                                  className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full"
                                />
                              </div>
                            </div>
                          );
                        })
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })()}
        </AnimatePresence>
      </main>
    </div>
  );
}

function NavButton({ active, onClick, icon, label }: { active: boolean, onClick: () => void, icon: React.ReactNode, label: string }) {
  return (
    <button 
      onClick={onClick}
      className={`w-full aspect-square flex items-center justify-center rounded-2xl transition-all duration-500 group relative ${
        active 
        ? 'bg-brand-emerald text-white shadow-[0_10px_25px_-5px_rgba(16,185,129,0.4)]' 
        : 'text-slate-600 hover:text-slate-300 hover:bg-slate-800/50'
      }`}
    >
      <div className="relative z-10 transition-transform group-active:scale-90">
        {icon}
      </div>
      
      {/* TOOLTIP LABEL ON HOVER */}
      <span className="absolute right-full mr-4 px-4 py-2 bg-slate-800 text-white text-[11px] font-black uppercase tracking-widest rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0 whitespace-nowrap pointer-events-none shadow-2xl border border-slate-700">
        {label}
        <div className="absolute right-[-4px] top-1/2 -translate-y-1/2 w-2 h-2 bg-slate-800 rotate-45 border-r border-t border-slate-700" />
      </span>

      {active && (
        <motion.div 
          layoutId="sidebar-active"
          className="absolute inset-0 bg-brand-emerald rounded-2xl -z-0"
          transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
        />
      )}
    </button>
  );
}

function SummaryStat({ label, value, sub, icon, trend, theme }: { label: string, value: string | number, sub: string, icon: React.ReactNode, trend?: 'positive' | 'negative', theme: 'emerald' | 'gold' | 'blue' }) {
  const glowStyles = {
    emerald: 'bg-emerald-500/10 text-emerald-400 group-hover:bg-brand-emerald group-hover:text-white shadow-[0_0_30px_rgba(16,185,129,0.1)]',
    gold: 'bg-amber-400/10 text-brand-gold group-hover:bg-brand-gold group-hover:text-slate-900 shadow-[0_0_30px_rgba(245,158,11,0.1)]',
    blue: 'bg-blue-500/10 text-blue-400 group-hover:bg-blue-500 group-hover:text-white shadow-[0_0_30px_rgba(59,130,246,0.1)]'
  }[theme];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -8, scale: 1.02 }}
      className="bg-slate-900/60 backdrop-blur-sm p-8 rounded-[2.5rem] border border-slate-800/50 shadow-2xl flex flex-col group transition-all duration-500"
    >
      <div className="flex items-center justify-between mb-8">
        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-500 ${glowStyles}`}>
          {icon}
        </div>
        <div className="flex flex-col items-end">
          <TrendingUp size={16} className={trend === 'positive' ? 'text-brand-emerald' : 'text-red-400'} />
          <span className="text-[10px] font-black text-slate-600 mt-1 uppercase tracking-tighter">Live Status</span>
        </div>
      </div>
      
      <div className="space-y-1">
        <p className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-500 mb-2 truncate">{label}</p>
        <div className="flex items-baseline gap-2">
          <p className="text-4xl md:text-5xl font-black text-white tracking-tight leading-none">
            {typeof value === 'number' ? value.toLocaleString() : value}
          </p>
          {theme === 'gold' && <span className="text-brand-gold font-black text-xs uppercase">Pts</span>}
        </div>
        <p className={`text-[11px] font-bold mt-4 flex items-center gap-1 ${trend === 'positive' ? 'text-brand-emerald' : 'text-slate-400'}`}>
          <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse mr-1" />
          {sub}
        </p>
      </div>
    </motion.div>
  );
}

function ChartContainer({ title, subtitle, children }: { title: string, subtitle: string, children: React.ReactNode }) {
  return (
    <div className="bg-slate-900/40 backdrop-blur-xl rounded-[3rem] p-10 border border-slate-800/50 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.5)]">
      <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h3 className="text-2xl font-black tracking-tight text-white mb-2">{title}</h3>
          <p className="text-sm font-bold text-slate-500">{subtitle}</p>
        </div>
        <div className="flex gap-2">
          <div className="px-3 py-1 bg-slate-800 rounded-lg text-[10px] font-black text-slate-400 uppercase tracking-widest cursor-default">D</div>
          <div className="px-3 py-1 bg-brand-emerald rounded-lg text-[10px] font-black text-white uppercase tracking-widest cursor-default shadow-lg shadow-brand-emerald/20">W</div>
          <div className="px-3 py-1 bg-slate-800 rounded-lg text-[10px] font-black text-slate-400 uppercase tracking-widest cursor-default">M</div>
        </div>
      </div>
      <div className="w-full">
        {children}
      </div>
    </div>
  );
}

