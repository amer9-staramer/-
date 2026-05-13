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
  MessageSquare
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
  setDoc
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

interface AdminStats {
  totalUsers: number;
  totalPoints: number;
  totalTasbihCount: number;
  usersList: any[];
  zikrStats: any[];
  hadiths: Hadith[];
  messages: any[];
}

export function AdminPortal({ onBack, language }: { onBack: () => void, language: 'ku' | 'en' | 'ar' }) {
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
  const [activeTab, setActiveTab] = useState<'overview' | 'users' | 'zikrs' | 'settings' | 'hadiths'>('overview');
  
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
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);
      if (user) {
        checkAdmin(user.uid);
      } else {
        setIsAdmin(false);
        setLoading(false);
      }
    });
    return () => unsubscribe();
  }, []);

  const checkAdmin = async (uid: string) => {
    try {
      if (auth.currentUser?.email === 'adolamer9@gmail.com') {
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
      setError('System verification failed.');
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

      // Fetch Messages
      const msgsSnap = await getDocs(query(collection(db, 'messages'), orderBy('timestamp', 'desc'), limit(50)));
      const messages: any[] = [];
      msgsSnap.forEach((doc) => {
        messages.push({ id: doc.id, ...doc.data() });
      });

      setStats({
        totalUsers: usersSnap.size,
        totalPoints,
        totalTasbihCount,
        usersList,
        zikrStats,
        hadiths,
        messages
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
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err: any) {
      setError(err.message || 'Login failed');
      setLoading(false);
    }
  };

  const handleLogout = async () => {
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
          <NavButton active={activeTab === 'users'} onClick={() => setActiveTab('users')} icon={<Users size={22} />} label={language === 'ku' ? 'نامەکان' : 'Messages'} />
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

          {activeTab === 'users' && (
             <motion.div 
               key="messages"
               initial={{ opacity: 0, x: 20 }}
               animate={{ opacity: 1, x: 0 }}
               className="space-y-8"
             >
               <h3 className="text-2xl font-black text-white px-2">
                 {language === 'ku' ? 'نامەکانی بەکارهێنەران' : 'User Messages'}
               </h3>
               <div className="grid grid-cols-1 gap-6">
                 {stats?.messages.map((msg: any) => (
                   <motion.div 
                     key={msg.id} 
                     initial={{ opacity: 0, y: 10 }}
                     animate={{ opacity: 1, y: 0 }}
                     className="bg-slate-900/40 backdrop-blur-md p-8 rounded-[2rem] border border-slate-800/60 shadow-xl space-y-4 hover:border-brand-emerald/30 transition-all"
                   >
                     <div className="flex justify-between items-start">
                       <div className="flex items-center gap-4">
                         <div className="w-12 h-12 bg-brand-emerald/10 text-brand-emerald rounded-2xl flex items-center justify-center">
                           <User size={24} />
                         </div>
                         <div>
                           <h4 className="font-black text-lg text-white">{msg.name}</h4>
                           <p className="text-xs text-slate-500 font-bold tracking-tight">{msg.email}</p>
                         </div>
                       </div>
                       <span className="text-[10px] text-slate-600 font-black uppercase tracking-widest bg-slate-800/50 px-3 py-1 rounded-full">
                         {msg.timestamp?.toDate ? msg.timestamp.toDate().toLocaleString(language === 'en' ? 'en-US' : 'ar-EG') : 'Processing...'}
                       </span>
                     </div>
                     <div className="bg-slate-950/50 p-6 rounded-2xl border border-slate-800/50">
                       <p className="text-slate-300 font-medium leading-relaxed" dir={language === 'en' ? 'ltr' : 'rtl'}>
                         {msg.message}
                       </p>
                     </div>
                   </motion.div>
                 ))}
                 {(!stats?.messages || stats.messages.length === 0) && (
                    <div className="text-center py-20 bg-slate-900/20 rounded-[3rem] border border-dashed border-slate-800">
                      <MessageSquare className="mx-auto text-slate-700 mb-4" size={48} />
                      <p className="text-slate-500 font-bold italic">No feedback messages yet.</p>
                    </div>
                 )}
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

          {activeTab === 'users' && (
            <motion.div 
              key="users"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="bg-slate-900/50 backdrop-blur-md rounded-[2.5rem] border border-slate-800 shadow-2xl overflow-hidden"
            >
              <div className="p-10 border-b border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="space-y-1 text-center md:text-right">
                  <h3 className="text-2xl font-black text-white">Identity Database</h3>
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Global User Registries</p>
                </div>
                <div className="relative w-full md:w-auto">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                  <input 
                    type="text" 
                    placeholder="Search by Identity..."
                    className="w-full md:w-72 pl-12 pr-6 py-4 bg-slate-950 border border-slate-800 rounded-2xl text-sm font-bold text-white focus:ring-2 focus:ring-brand-emerald transition-all placeholder:text-slate-600"
                  />
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[800px]">
                  <thead>
                    <tr className="bg-slate-900/80">
                      <th className="p-8 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">{t.id}</th>
                      <th className="p-8 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">{t.level}</th>
                      <th className="p-8 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Wealth</th>
                      <th className="p-8 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Cycle Status</th>
                      <th className="p-8 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">{t.lastSync}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800">
                    {stats?.usersList?.map((u) => (
                      <tr key={u.id} className="hover:bg-slate-800/40 transition-colors group">
                        <td className="p-8">
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-slate-800 rounded-xl flex items-center justify-center text-[10px] font-black uppercase text-brand-emerald group-hover:bg-brand-emerald group-hover:text-white transition-colors">
                              {u.id.substring(0, 2)}
                            </div>
                            <span className="font-bold text-slate-300 group-hover:text-white transition-colors">{u.id}</span>
                          </div>
                        </td>
                        <td className="p-8">
                          <span className="px-4 py-2 bg-slate-800 border border-slate-700 text-brand-emerald rounded-full text-[10px] font-black uppercase tracking-widest">Lv.{u.level}</span>
                        </td>
                        <td className="p-8 font-black text-brand-gold text-sm">{u.points} pts</td>
                        <td className="p-8 font-bold text-slate-500 text-xs italic">{u.dailyZikrsCompleted} zikrs this cycle</td>
                        <td className="p-8 text-[10px] font-black text-slate-600 uppercase">
                          {u.updatedAt ? new Date(u.updatedAt).toLocaleDateString() : 'Sync Failure'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}
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

