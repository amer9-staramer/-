
import { motion, AnimatePresence } from 'motion/react';
import { BarChart as BarChartIcon, History, Zap, TrendingUp, Trophy, Star, BookOpen, Calendar, PieChart, Wallet, Lock, Unlock, ChevronRight, QrCode, CreditCard, LogIn, X, ShieldCheck, Smartphone, Users } from 'lucide-react';
import { useMemo, useState, useEffect } from 'react';
import { useUserStats } from '../hooks/useUserStats';
import { PieChart as PieChartRecharts, Pie, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, AreaChart, Area } from 'recharts';
import { collection, query, orderBy, limit, onSnapshot, doc } from 'firebase/firestore';
import { db } from '../lib/firebase';

interface StatsProps {
  language: 'ku' | 'ar' | 'en';
  t: any;
  isDeviceAdmin?: boolean;
}

const DAILY_GOAL = 250;

export function Stats({ language, t, isDeviceAdmin }: StatsProps) {
  const { stats, LEVELS, isHolyTime } = useUserStats();
  const [activeTab, setActiveTab] = useState<'daily' | 'monthly' | 'yearly'>('daily');
  
  const todayDate = new Date().toISOString().split('T')[0];

  const [globalStats, setGlobalStats] = useState({
    deviceCount: 1,
    activeOnlineCount: 0,
    totalPoints: 0,
    totalTasbihCount: 0,
    totalZikrsCount: 0
  });
  const [communityZikrs, setCommunityZikrs] = useState<any[]>([]);

  // Listen to Global Stats or full Users Collection for deep Admin dashboard metrics
  useEffect(() => {
    if (isDeviceAdmin) {
      const unsubscribe = onSnapshot(collection(db, 'users'), (snapshot) => {
        let totalPoints = 0;
        let totalTasbihCount = 0;
        let totalZikrsCompleted = 0;
        let activeOnlineCount = 0;
        const fiveMinutesAgo = Date.now() - 5 * 60 * 1000;

        snapshot.forEach((userDoc) => {
          const data = userDoc.data();
          totalPoints += data.points || 0;
          totalTasbihCount += data.totalTasbihCount || 0;
          totalZikrsCompleted += data.totalZikrsCompleted || 0;

          // Check if user is online in real-time
          const isOnline = data.status === 'online' && data.lastActive && new Date(data.lastActive).getTime() > fiveMinutesAgo;
          if (isOnline) {
            activeOnlineCount++;
          }
        });

        setGlobalStats({
          deviceCount: snapshot.size,
          activeOnlineCount: activeOnlineCount || 1,
          totalPoints,
          totalTasbihCount,
          totalZikrsCount: totalZikrsCompleted
        });
      }, (error) => {
        console.warn("Stats Admin: failed to listen to users collection:", error);
      });
      return () => unsubscribe();
    } else {
      const unsubscribe = onSnapshot(doc(db, 'global_stats', 'main'), (docSnap) => {
        if (docSnap.exists()) {
          const data = docSnap.data();
          setGlobalStats({
            deviceCount: data.deviceCount || 1,
            activeOnlineCount: 0,
            totalPoints: data.totalPoints || 0,
            totalTasbihCount: data.totalTasbihCount || 0,
            totalZikrsCount: data.totalZikrsCount || 0
          });
        }
      }, (error) => {
        console.warn("Error listening to global stats:", error);
      });
      return () => unsubscribe();
    }
  }, [isDeviceAdmin]);

  // Listen to Community Zikr Stats
  useEffect(() => {
    const q = query(collection(db, 'zikr_stats'), orderBy('viewCount', 'desc'), limit(15));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const list: any[] = [];
      snapshot.forEach(docSnap => {
        const data = docSnap.data();
        list.push({ id: docSnap.id, ...data });
      });
      setCommunityZikrs(list);
    }, (error) => {
      console.warn("Error listening to zikr stats:", error);
    });
    return () => unsubscribe();
  }, []);
  
  const intervalStats = useMemo(() => {
    const history = stats.history || [];
    const now = new Date();
    
    if (activeTab === 'daily') {
      return history.find(h => h.date === todayDate) || { zikrs: 0, ayahs: 0, points: 0 };
    }
    
    if (activeTab === 'monthly') {
      const currentMonth = now.getMonth();
      const currentYear = now.getFullYear();
      const filtered = history.filter(h => {
        const d = new Date(h.date);
        return d.getMonth() === currentMonth && d.getFullYear() === currentYear;
      });
      return filtered.reduce((acc, curr) => ({
        zikrs: acc.zikrs + curr.zikrs,
        ayahs: acc.ayahs + curr.ayahs,
        points: acc.points + curr.points,
      }), { zikrs: 0, ayahs: 0, points: 0 });
    }
    
    // Yearly
    const currentYear = now.getFullYear();
    const filtered = history.filter(h => new Date(h.date).getFullYear() === currentYear);
    return filtered.reduce((acc, curr) => ({
      zikrs: acc.zikrs + curr.zikrs,
      ayahs: acc.ayahs + curr.ayahs,
      points: acc.points + curr.points,
    }), { zikrs: 0, ayahs: 0, points: 0 });
  }, [stats.history, activeTab, todayDate]);

  const targetGoal = activeTab === 'daily' ? DAILY_GOAL : activeTab === 'monthly' ? DAILY_GOAL * 30 : DAILY_GOAL * 365;
  const progressPercent = Math.min(100, (intervalStats.points / targetGoal) * 100);

  const pieData = useMemo(() => [
    { name: t.zikrs, value: stats.totalZikrsCompleted || 0, color: '#3B82F6' },
    { name: t.ayahs, value: stats.totalAyahsRead || 0, color: '#F59E0B' },
    { name: t.tasbihs, value: stats.totalTasbihCount || 0, color: '#10B981' },
  ], [stats, t]);

  const heartTitle = useMemo(() => {
    if (progressPercent >= 81) return { ...LEVELS[4].title, color: 'text-brand-gold' };
    if (progressPercent >= 61) return { ...LEVELS[3].title, color: 'text-emerald-700' };
    if (progressPercent >= 41) return { ...LEVELS[2].title, color: 'text-emerald-400' };
    if (progressPercent >= 21) return { ...LEVELS[1].title, color: 'text-orange-500' };
    return { ...LEVELS[0].title, color: 'text-red-500' };
  }, [progressPercent, LEVELS]);

  const chartData = useMemo(() => {
    if (activeTab === 'daily') {
      // Show last 7 days chart
      const days = [];
      for (let i = 6; i >= 0; i--) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        const dateStr = date.toISOString().split('T')[0];
        const entry = stats.history?.find(h => h.date === dateStr);
        days.push({
          name: date.toLocaleDateString(language === 'en' ? 'en-US' : language === 'ar' ? 'ar-SA' : 'ku-IQ', { weekday: 'short' }),
          points: entry?.points || 0
        });
      }
      return days;
    }

    if (activeTab === 'monthly') {
      // Show points by month in current year
      const months = [];
      const currentYear = new Date().getFullYear();
      for (let i = 0; i < 12; i++) {
        const startOfMonth = new Date(currentYear, i, 1);
        const endOfMonth = new Date(currentYear, i + 1, 0);
        const points = stats.history?.filter(h => {
          const d = new Date(h.date);
          return d >= startOfMonth && d <= endOfMonth;
        }).reduce((acc, curr) => acc + curr.points, 0) || 0;
        
        months.push({
          name: startOfMonth.toLocaleDateString(language === 'en' ? 'en-US' : language === 'ar' ? 'ar-SA' : 'ku-IQ', { month: 'short' }),
          points: points
        });
      }
      return months;
    }

    // Yearly: compare recent years
    const years = [];
    const currentYear = new Date().getFullYear();
    for (let i = 2; i >= 0; i--) {
      const year = currentYear - i;
      const points = stats.history?.filter(h => new Date(h.date).getFullYear() === year)
        .reduce((acc, curr) => acc + curr.points, 0) || 0;
      years.push({ name: year.toString(), points });
    }
    return years;
  }, [stats.history, activeTab, language]);

  return (
    <div className="space-y-10 py-10 pb-20">
      {isHolyTime() && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-brand-gold/10 border-2 border-brand-gold/20 p-4 rounded-3xl flex items-center gap-4 mb-6"
        >
          <div className="w-12 h-12 bg-brand-gold rounded-2xl flex items-center justify-center text-white shadow-lg shrink-0">
            <Zap size={24} fill="currentColor" />
          </div>
          <div className="flex-1">
            <h4 className="text-sm font-black text-brand-gold uppercase tracking-widest leading-none mb-1">
              {language === 'ku' ? 'دیاری ڕۆژی هەینی' : language === 'ar' ? 'هدية يوم الجمعة' : "Friday's Gift"}
            </h4>
            <p className="text-[10px] font-bold text-slate-500 leading-tight">
              {language === 'ku' ? 'خاڵەکان دوو هێندە دەبن بۆ هەموو زیکرەکان، وە چوار هێندە بۆ سڵاوات!' : language === 'ar' ? 'النقاط مضاعفة لكل الأذكار، وأربعة أضعاف للصلوات!' : 'Double points for all zikrs, and quadruple for Salawat!'}
            </p>
          </div>
        </motion.div>
      )}

      <div className="flex flex-col items-center justify-center text-center">
        <h2 className={`text-4xl font-black mb-2 transition-colors ${heartTitle.color}`}>{heartTitle[language]}</h2>
        <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">{t.progressSubtitle}</p>
      </div>

      {/* Reward Info Box - Points based */}
      <div className="bg-emerald-50 dark:bg-emerald-900/10 p-6 rounded-[2.5rem] border border-emerald-100 dark:border-emerald-900/20">
        <div className="flex items-center gap-3 mb-4">
          <Trophy size={20} className="text-brand-emerald dark:text-brand-gold" />
          <h3 className="text-sm font-black text-emerald-800 dark:text-emerald-400 uppercase tracking-widest">{language === 'ku' ? 'ئاستەکان و خاڵە پێویستەکان' : 'Levels & Required Points'}</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
          {LEVELS.map(l => (
            <div key={l.level} className="bg-white dark:bg-slate-900 p-4 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800">
              <p className="text-[10px] font-black uppercase text-slate-400 mb-1 leading-tight">{l.title[language]}</p>
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-brand-emerald">{l.level * 20}%</span>
                <span className="text-xs font-black text-brand-gold">{l.minPoints} {language === 'ku' ? 'خاڵ' : 'Pts'}</span>
              </div>
            </div>
          ))}
        </div>
        <p className="text-[10px] font-bold text-emerald-900/60 mt-4 text-center">{t.howToEarn || 'Earn points by reading Zikr, Ayahs, and Tasbih'}</p>
      </div>

      {/* Tabs */}
      <div className="flex bg-slate-100 dark:bg-slate-900 rounded-3xl p-1 max-w-sm mx-auto shadow-inner">
        {(['daily', 'monthly', 'yearly'] as const).map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 py-3 rounded-2xl text-xs font-black uppercase tracking-widest transition-all ${activeTab === tab ? 'bg-white dark:bg-slate-800 text-brand-emerald dark:text-brand-gold shadow-sm' : 'text-slate-400'}`}
          >
            {tab === 'daily' ? (t as any).today || 'Daily' : tab === 'monthly' ? (t as any).monthly || 'Monthly' : (t as any).yearly || 'Yearly'}
          </button>
        ))}
      </div>

      {/* Header Stat Card (The Green Card) */}
      <div className="bg-gradient-to-br from-brand-emerald to-emerald-800 p-8 rounded-[3rem] text-white shadow-2xl shadow-emerald-500/20 relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32 blur-3xl"></div>
        
        <div className="relative z-10 space-y-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-white/10 rounded-[1.5rem] flex items-center justify-center text-brand-gold shadow-inner border border-white/5">
                <Trophy size={32} />
              </div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest opacity-60 mb-1">{t.spiritualLevel || 'Current Level'}</p>
                <h3 className="text-2xl font-black">{heartTitle[language]}</h3>
              </div>
            </div>

            <div className="flex items-center gap-8">
              <div className="text-center">
                <p className="text-[10px] font-black uppercase tracking-widest opacity-60 mb-1">{t.points}</p>
                <p className="text-3xl font-black">{intervalStats.points}</p>
              </div>
            </div>
          </div>

          <div className="space-y-3">
             <div className="h-4 bg-emerald-900/30 rounded-full overflow-hidden p-1 border border-white/5">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${progressPercent}%` }}
                  className="h-full bg-gradient-to-r from-brand-gold to-amber-400 rounded-full relative"
                >
                  <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                </motion.div>
             </div>
             <div className="flex justify-between text-[10px] font-black uppercase tracking-widest opacity-60">
                <span>{Math.round(progressPercent)}% {t.completed}</span>
                <span>{targetGoal} {t.totalGoal}</span>
             </div>
          </div>
        </div>
      </div>

      {/* Level Tiers */}
      <div className="bg-white dark:bg-slate-900 p-8 rounded-[3rem] shadow-sm border border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-10 h-10 bg-slate-50 dark:bg-slate-800 rounded-xl flex items-center justify-center text-brand-emerald dark:text-brand-gold">
            <Trophy size={20} />
          </div>
          <h3 className="text-lg font-black text-slate-800 dark:text-slate-100 uppercase tracking-wider">{t.levelRequirements}</h3>
        </div>
        <div className="space-y-4">
          {LEVELS.map((lvl) => {
            const isUnlocked = stats.points >= lvl.minPoints;
            return (
              <div 
                key={lvl.level}
                className={`p-4 rounded-2xl border transition-all ${isUnlocked ? 'border-brand-emerald/20 bg-brand-emerald/5' : 'border-slate-100 dark:border-slate-800 opacity-60'}`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${isUnlocked ? 'bg-brand-emerald text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-400'}`}>
                      {isUnlocked ? <Trophy size={20} /> : lvl.level}
                    </div>
                    <div>
                      <h4 className={`font-black ${isUnlocked ? 'text-slate-800 dark:text-white' : 'text-slate-400'}`}>
                        {lvl.title[language]}
                      </h4>
                      <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                        {lvl.minPoints} {t.points}
                      </p>
                    </div>
                  </div>
                  {isUnlocked ? (
                    <span className="text-[10px] font-black uppercase bg-brand-emerald text-white px-2 py-1 rounded-md">
                      {t.unlocked}
                    </span>
                  ) : (
                    <div className="w-4 h-4 text-slate-300">
                      <Lock size={16} />
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>



      {/* Activity Chart Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Activity Distribution */}
        <div className="bg-white dark:bg-slate-900 p-8 rounded-[3rem] shadow-sm border border-slate-100 dark:border-slate-800 space-y-8 flex flex-col">
          <div className="flex items-center gap-4">
             <div className="w-10 h-10 bg-slate-50 dark:bg-slate-800 rounded-xl flex items-center justify-center text-slate-400">
               <PieChart size={20} />
             </div>
             <h3 className="text-lg font-black text-slate-800 dark:text-white uppercase tracking-wider">{t.activityDistribution || 'Distribution'}</h3>
          </div>
          
          <div className="flex-1 min-h-[250px]">
             <ResponsiveContainer width="100%" height="100%">
               <PieChartRecharts>
                 <Pie
                   data={pieData}
                   cx="50%"
                   cy="50%"
                   innerRadius={60}
                   outerRadius={80}
                   paddingAngle={5}
                   dataKey="value"
                 >
                   {pieData.map((entry, index) => (
                     <Cell key={`cell-${index}`} fill={entry.color} />
                   ))}
                 </Pie>
                 <Tooltip 
                   contentStyle={{ borderRadius: '1rem', border: 'none', fontWeight: 900, fontSize: '12px' }}
                 />
               </PieChartRecharts>
             </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-3 gap-2">
             {pieData.map(item => (
                <div key={item.name} className="flex flex-col items-center p-2 bg-slate-50 dark:bg-slate-800 rounded-2xl">
                  <div className="w-2 h-2 rounded-full mb-1" style={{ backgroundColor: item.color }}></div>
                  <span className="text-[9px] font-black text-slate-400 uppercase truncate w-full text-center">{item.name}</span>
                  <span className="text-sm font-black text-slate-800 dark:text-white">{item.value}</span>
                </div>
              ))}
          </div>
        </div>

        {/* Activity Chart */}
        <div className="bg-white dark:bg-slate-900 p-8 rounded-[3rem] shadow-sm border border-slate-100 dark:border-slate-800 flex flex-col">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-slate-50 dark:bg-slate-800 rounded-xl flex items-center justify-center text-slate-400">
                <BarChartIcon size={20} />
              </div>
              <h3 className="text-lg font-black text-slate-800 dark:text-white uppercase tracking-wider">{t.activityChart}</h3>
            </div>
          </div>

          <div className="flex-1 min-h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              {activeTab === 'daily' ? (
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#94A3B8', fontSize: 10, fontWeight: 900 }} dy={10} />
                  <YAxis hide />
                  <Tooltip cursor={{ fill: 'transparent' }} contentStyle={{ borderRadius: '1.5rem', border: 'none', boxShadow: '0 10px 40px -10px rgba(0,0,0,0.1)' }} />
                  <Bar dataKey="points" radius={[8, 8, 8, 8]} barSize={25}>
                    {chartData.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={index === 6 ? '#059669' : '#F1F5F9'} />
                    ))}
                  </Bar>
                </BarChart>
              ) : (
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="colorPoints" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#059669" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#059669" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#94A3B8', fontSize: 10, fontWeight: 900 }} dy={10} />
                  <YAxis hide />
                  <Tooltip contentStyle={{ borderRadius: '1.5rem', border: 'none' }} />
                  <Area type="monotone" dataKey="points" stroke="#059669" strokeWidth={4} fillOpacity={1} fill="url(#colorPoints)" />
                </AreaChart>
              )}
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Withdrawal Form Backdrop - REMOVED */}

      {/* Total Lifetime Stats Summary (The Bottom Section) */}
      <div className="bg-slate-50 dark:bg-slate-900/50 p-8 rounded-[3rem] border border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-4 mb-8 border-b border-slate-100 dark:border-slate-800 pb-4">
           <Trophy size={28} className="text-brand-gold" />
           <h3 className="text-xl font-black text-slate-800 dark:text-white uppercase tracking-wider">{t.totalStats}</h3>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="space-y-1">
            <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest">{t.ayahs}</p>
            <p className="text-3xl font-black text-slate-800 dark:text-white">{stats.totalAyahsRead || 0}</p>
          </div>
          <div className="space-y-1">
            <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest">{t.zikrs}</p>
            <p className="text-3xl font-black text-slate-800 dark:text-white">{stats.totalZikrsCompleted || 0}</p>
          </div>
          <div className="space-y-1">
            <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest">{t.tasbihs}</p>
            <p className="text-3xl font-black text-slate-800 dark:text-white">{stats.totalTasbihCount || 0}</p>
          </div>
          <div className="space-y-1">
            <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest">{t.total}</p>
            <p className="text-3xl font-black text-brand-emerald dark:text-emerald-400">{(stats.totalAyahsRead || 0) + (stats.totalZikrsCompleted || 0) + (stats.totalTasbihCount || 0)}</p>
          </div>
        </div>
      </div>

      {/* Realtime Community Dashboard Section - Strictly restricted to authorized admins */}
      {isDeviceAdmin && (
        <div className="bg-white dark:bg-slate-900 p-8 rounded-[3rem] shadow-sm border border-slate-100 dark:border-slate-800 space-y-8">
          <div className="flex items-center gap-4 border-b border-slate-100 dark:border-slate-800 pb-4">
             <Users size={28} className="text-brand-emerald font-black" />
             <div>
               <h3 className="text-xl font-black text-slate-800 dark:text-white uppercase tracking-wider">
                 {language === 'ku' ? 'ئامارەکانی کۆمەڵگە ڕاستەوخۆ' : language === 'ar' ? 'إحصائيات المجتمع المباشرة' : 'Live Community Statistics'}
               </h3>
               <p className="text-[10px] text-slate-400 font-extrabold uppercase tracking-widest">
                 {language === 'ku' ? 'ئەنجامەکانی خەڵک لەگەڵ ژمارەی مۆبایلی بەشداربووان' : language === 'ar' ? 'مشاركات المجتمع الكلي مع عدد الهواتف' : 'Global participation indicators & active devices'}
               </p>
             </div>
          </div>

          {/* Device Beacon Cards - Shows App Installs vs Online */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Card 1: Total Installs / Registered Devices */}
            <div className="flex gap-4 items-center justify-between p-6 bg-emerald-50/50 dark:bg-brand-emerald/10 rounded-3xl border border-emerald-100/55 dark:border-brand-emerald/20 transition-all hover:shadow-md">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-brand-emerald/10 text-brand-emerald rounded-2xl flex items-center justify-center">
                  <Smartphone size={24} />
                </div>
                <div className="text-right sm:text-left">
                  <p className="text-sm font-black text-slate-800 dark:text-slate-100">
                    {language === 'ku' ? 'تۆمارکراوی ئەپەکە' : language === 'ar' ? 'الأجهزة المسجلة' : 'Registered Devices'}
                  </p>
                  <p className="text-[10px] text-slate-400 font-bold leading-normal">
                    {language === 'ku' ? 'کۆی گشتی مۆبایلەکان' : language === 'ar' ? 'إجمالي الأجهزة المثبتة' : 'Total installed devices/users'}
                  </p>
                </div>
              </div>
              <div className="text-center sm:text-right">
                <span className="text-3xl font-extrabold text-brand-emerald dark:text-brand-gold">{globalStats.deviceCount}</span>
                <span className="text-[10px] text-slate-400 font-black block uppercase tracking-wider">
                  {language === 'ku' ? 'مۆبایل' : language === 'ar' ? 'جهاز' : 'Devices'}
                </span>
              </div>
            </div>

            {/* Card 2: Currently Active Online Devices */}
            <div className="flex gap-4 items-center justify-between p-6 bg-amber-50/50 dark:bg-amber-500/10 rounded-3xl border border-amber-100/55 dark:border-amber-500/20 transition-all hover:shadow-md">
              <div className="flex items-center gap-3">
                <div className="relative w-12 h-12 bg-amber-500/10 text-amber-500 rounded-2xl flex items-center justify-center">
                  <Smartphone size={24} />
                  <span className="absolute -top-1 -right-1 flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-500"></span>
                  </span>
                </div>
                <div className="text-right sm:text-left">
                  <p className="text-sm font-black text-slate-800 dark:text-slate-100">
                    {language === 'ku' ? 'مۆبایلە چالاکەکان' : language === 'ar' ? 'الهواتف النشطة الآن' : 'Active Mobile Devices'}
                  </p>
                  <p className="text-[10px] text-slate-400 font-bold leading-normal">
                    {language === 'ku' ? 'سەر هێڵ لە ئێستادا' : language === 'ar' ? 'المتصلين بالإنترنت حالياً' : 'Currently active on-line'}
                  </p>
                </div>
              </div>
              <div className="text-center sm:text-right">
                <span className="text-3xl font-extrabold text-amber-500 dark:text-amber-500">{globalStats.activeOnlineCount}</span>
                <span className="text-[10px] text-slate-400 font-black block uppercase tracking-wider">
                  {language === 'ku' ? 'لەسەر هێڵە' : language === 'ar' ? 'متصل' : 'Online'}
                </span>
              </div>
            </div>
          </div>

          {/* General Community Totals Summary widget */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-5 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100/50 dark:border-slate-800 text-center">
               <span className="text-[10px] text-slate-400 font-black uppercase block mb-1">
                 {language === 'ku' ? 'تەسریحەکانی کۆمەڵگە' : language === 'ar' ? 'تسبيحات المجتمع الكلي' : 'Total Community Tasbihs'}
               </span>
               <span className="text-2xl font-black text-slate-800 dark:text-white">
                 {globalStats.totalTasbihCount || stats.totalTasbihCount || 0}
               </span>
            </div>
            <div className="p-5 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100/50 dark:border-slate-800 text-center">
               <span className="text-[10px] text-slate-400 font-black uppercase block mb-1">
                 {language === 'ku' ? 'زیکرە بەکۆمەڵەکان' : language === 'ar' ? 'مجموع الأذكار' : 'Total Community Zikrs'}
               </span>
               <span className="text-2xl font-black text-slate-800 dark:text-white">
                 {globalStats.totalZikrsCount || stats.totalZikrsCompleted || 0}
               </span>
            </div>
            <div className="p-5 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100/50 dark:border-slate-800 text-center">
               <span className="text-[10px] text-slate-400 font-black uppercase block mb-1">
                 {language === 'ku' ? 'خاڵەکانی کۆمەڵگە' : language === 'ar' ? 'نقاط المجتمع العامة' : 'Total Global Points'}
               </span>
               <span className="text-2xl font-black text-brand-emerald dark:text-brand-gold">
                 {globalStats.totalPoints || stats.points || 0}
               </span>
            </div>
          </div>

          {/* Percentage Shares of each Zikr (ڕێژەی زیکرەکانی خەڵک) */}
          <div className="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-800">
            <h4 className="text-sm font-black text-slate-800 dark:text-slate-100 uppercase tracking-wider flex items-center justify-center sm:justify-start gap-2">
              <PieChart size={18} className="text-amber-500" />
              <span>
                {language === 'ku' ? 'ڕێژەی زیکرەکانی خەڵک (%)' : language === 'ar' ? 'نسب الأذكار المقروءة (%)' : 'Community Zikr Percentages (%)'}
              </span>
            </h4>
            <p className="text-[10px] text-slate-400 font-bold leading-relaxed -mt-2 text-center sm:text-left">
              {language === 'ku' ? 'ڕێژەی خوێندنەوەی هەر زیکرێک لەلایەن بەکارهێنەرانی ئەپلیکەیشنەوە بە شێوەی ڕاستەوخۆ' : language === 'ar' ? 'نسب مشاركة وتفاعل المجتمع لقراءة كل ذكر مباشرة' : 'Real-time relative statistics measuring participation for each zikr is displayed below.'}
            </p>

            <div className="space-y-5">
              {communityZikrs.length === 0 ? (
                <div className="text-center py-6 text-xs text-slate-400 font-bold">
                  {language === 'ku' ? 'هیچ زانیاری زیکرێک نییە تا پیشان بدرێت...' : language === 'ar' ? 'لا يوجد تفاعلات مسجلة بعد...' : 'Recording initial community parameters...'}
                </div>
              ) : (
                communityZikrs.map((item) => {
                  const count = item.totalClicks || item.viewCount || 1;
                  const total = communityZikrs.reduce((acc, c) => acc + (c.totalClicks || c.viewCount || 1), 0) || 1;
                  const pct = Math.round((count / total) * 100);
                  
                  return (
                    <div key={item.id} className="space-y-1.5 transition-all p-3 hover:bg-slate-50 dark:hover:bg-slate-800/50 rounded-2xl">
                      <div className="flex justify-between items-center text-xs">
                        <span className="font-bold text-slate-700 dark:text-slate-300 truncate max-w-[180px] sm:max-w-md quran-font text-right">
                          {item.title}
                        </span>
                        <span className="font-black text-brand-emerald dark:text-brand-gold shrink-0">
                          {pct}% ({count})
                        </span>
                      </div>
                      <div className="w-full h-3 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${pct}%` }}
                          transition={{ duration: 0.8, ease: 'easeOut' }}
                          className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 dark:from-brand-gold dark:to-amber-500 rounded-full"
                        />
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
      )}

      <div className="bg-white dark:bg-slate-900 p-8 rounded-[3rem] shadow-sm border border-slate-100 dark:border-slate-800">
         <div className="flex items-center gap-4 mb-8">
            <div className="w-10 h-10 bg-slate-50 dark:bg-slate-800 rounded-xl flex items-center justify-center text-slate-400">
               <History size={20} />
            </div>
            <h3 className="text-lg font-black text-slate-800 dark:text-slate-100">{t.recentActivity}</h3>
         </div>
         
         <div className="space-y-4">
            {stats.history?.slice(-5).reverse().map((h, i) => (
              <div key={i} className="flex items-center justify-between p-4 rounded-2xl border border-slate-50 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-2 h-2 rounded-full bg-brand-emerald"></div>
                  <div className="flex flex-col">
                    <span className="text-sm font-bold text-slate-600 dark:text-slate-400">
                      {h.date === todayDate ? t.today : h.date}
                    </span>
                    <span className="text-[10px] font-black text-slate-300 uppercase">
                      {h.zikrs} {t.zikrs} • {h.ayahs} {t.ayahs}
                    </span>
                  </div>
                </div>
                <div className="px-3 py-1 bg-brand-emerald/10 text-brand-emerald dark:text-emerald-400 rounded-lg text-[10px] font-black">
                  +{h.points}
                </div>
              </div>
            ))}
         </div>
      </div>

      {/* Quranic Reward Verse */}
      <div className="bg-white dark:bg-slate-900 p-10 rounded-[3rem] shadow-sm border border-slate-100 dark:border-slate-800 text-center space-y-6">
        <div className="w-16 h-16 bg-brand-gold/10 rounded-full flex items-center justify-center text-brand-gold mx-auto">
          <Star size={32} className="fill-current" />
        </div>
        <div className="space-y-4 max-w-2xl mx-auto">
          <p className="text-2xl md:text-3xl font-bold text-slate-800 dark:text-slate-100 leading-relaxed font-arabic" dir="rtl">
            {t.quranReward}
          </p>
          <p className="text-brand-emerald dark:text-emerald-400 font-medium italic leading-relaxed">
            {t.quranRewardTranslation}
          </p>
        </div>
      </div>
    </div>
  );
}
