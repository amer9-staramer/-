
import { motion, AnimatePresence } from 'motion/react';
import { BarChart as BarChartIcon, History, Zap, TrendingUp, Trophy, Star, BookOpen, Calendar, PieChart, Wallet, Lock, Unlock, ChevronRight, QrCode, CreditCard, LogIn, X, ShieldCheck } from 'lucide-react';
import { useMemo, useState } from 'react';
import { useUserStats } from '../hooks/useUserStats';
import { PieChart as PieChartRecharts, Pie, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, AreaChart, Area } from 'recharts';

interface StatsProps {
  language: 'ku' | 'ar' | 'en';
  t: any;
}

const DAILY_GOAL = 250;

export function Stats({ language, t }: StatsProps) {
  const { stats, LEVELS } = useUserStats();
  const [activeTab, setActiveTab] = useState<'daily' | 'monthly' | 'yearly'>('daily');
  const [showWithdrawal, setShowWithdrawal] = useState(false);
  const [isWalletRevealed, setIsWalletRevealed] = useState(false);
  const [isAuth, setIsAuth] = useState(false);
  const [authForm, setAuthForm] = useState({ email: '', password: '' });
  
  const todayDate = new Date().toISOString().split('T')[0];
  
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

  const isEligibleForWithdrawal = useMemo(() => {
    if (!stats.joinedAt) return false;
    
    // 1. Account age >= 60 days
    const joinDate = new Date(stats.joinedAt);
    const now = new Date();
    const daysSinceJoined = Math.floor((now.getTime() - joinDate.getTime()) / (1000 * 60 * 60 * 24));
    const isOldEnough = daysSinceJoined >= 60;

    // 2. Uninterrupted Month Completion (30 days streak meeting DAILY_GOAL)
    const history = stats.history || [];
    let streak = 0;
    for (let i = 0; i < 30; i++) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const dateStr = d.toISOString().split('T')[0];
      const entry = history.find(h => h.date === dateStr);
      if (entry && entry.points >= DAILY_GOAL) {
        streak++;
      } else {
        break;
      }
    }
    const hasUninterruptedMonth = streak >= 30;
    
    return isOldEnough && hasUninterruptedMonth;
  }, [stats.joinedAt, stats.history]);

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
      <div className="flex flex-col items-center justify-center text-center">
        <h2 className={`text-4xl font-black mb-2 transition-colors ${heartTitle.color}`}>{heartTitle[language]}</h2>
        <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">{t.progressSubtitle}</p>
      </div>

      {/* Reward Info Box */}
      <div className="bg-amber-50 dark:bg-amber-900/10 p-6 rounded-[2.5rem] border border-amber-100 dark:border-amber-900/20">
        <div className="flex items-center gap-3 mb-4">
          <Trophy size={20} className="text-brand-gold" />
          <h3 className="text-sm font-black text-amber-800 dark:text-amber-400 uppercase tracking-widest">{t.rewardTiers}</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
          {LEVELS.map(l => (
            <div key={l.level} className="bg-white dark:bg-slate-900 p-4 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800">
              <p className="text-[10px] font-black uppercase text-slate-400 mb-1 leading-tight">{l.title[language]}</p>
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-brand-emerald">{l.level * 20}%</span>
                <span className="text-xs font-black text-brand-gold">{(l as any).reward} {t.iqd}</span>
              </div>
            </div>
          ))}
        </div>
        <p className="text-[10px] font-bold text-amber-900/60 mt-4 text-center">{t.howToEarn}</p>
      </div>

      {/* Tabs */}
      <div className="flex bg-slate-100 dark:bg-slate-900 rounded-3xl p-1 max-w-sm mx-auto shadow-inner">
        {(['daily', 'monthly', 'yearly'] as const).map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 py-3 rounded-2xl text-xs font-black uppercase tracking-widest transition-all ${activeTab === tab ? 'bg-white dark:bg-slate-800 text-brand-emerald shadow-sm' : 'text-slate-400'}`}
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
              
              {/* Interactive Balance Box */}
              <div 
                onDoubleClick={() => setIsWalletRevealed(!isWalletRevealed)}
                className={`bg-emerald-900/40 p-5 rounded-[2rem] border border-white/10 transition-all duration-500 cursor-pointer select-none group/balance active:scale-95 ${isWalletRevealed ? 'ring-4 ring-brand-gold/40 shadow-lg shadow-brand-gold/10' : 'hover:bg-emerald-900/60'}`}
              >
                <p className="text-[10px] font-black uppercase tracking-widest opacity-60 mb-1 leading-none">{t.walletBalance || 'Current Balance'}</p>
                <div className="flex items-center gap-4">
                  <p className="text-2xl font-black">{stats.wallet?.balance || 0} <span className="text-[10px] opacity-50 uppercase">{t.iqd}</span></p>
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-500 ${isWalletRevealed ? 'bg-brand-gold text-white rotate-12' : 'bg-emerald-800/40 text-emerald-300'}`}>
                    <Wallet size={20} />
                  </div>
                </div>
                <p className="text-[8px] font-bold uppercase tracking-widest mt-3 opacity-30 group-hover/balance:opacity-100 transition-opacity whitespace-nowrap">
                   {language === 'ku' ? 'دووجار کلیک بکە - باڵانسی ئێستا' : 'Double click - Current Balance'}
                </p>
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

      <AnimatePresence>
        {isWalletRevealed && (
          <motion.div 
            initial={{ opacity: 0, height: 0, marginTop: 0 }}
            animate={{ opacity: 1, height: 'auto', marginTop: 32 }}
            exit={{ opacity: 0, height: 0, marginTop: 0 }}
            className="overflow-hidden"
          >
            <div className="space-y-8 bg-white dark:bg-slate-900 p-8 rounded-[3.5rem] border border-slate-100 dark:border-slate-800 shadow-xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-brand-gold/10 text-brand-gold rounded-2xl flex items-center justify-center">
                    <Wallet size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-slate-800 dark:text-white uppercase tracking-wider">{t.walletTitle || (language === 'ku' ? 'کیسە و پاداشتەکان' : 'Wallet & Rewards')}</h3>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{t.manageRewards || 'Manage your spiritual rewards'}</p>
                  </div>
                </div>
                <button 
                  onClick={() => setIsWalletRevealed(false)}
                  className="w-10 h-10 bg-slate-50 dark:bg-slate-800 rounded-full flex items-center justify-center text-slate-400 hover:text-rose-500 transition-all"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Balances */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-[2rem] border border-slate-100 dark:border-slate-800">
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">{t.walletBalance}</p>
                  <p className="text-3xl font-black text-slate-800 dark:text-white">{stats.wallet?.balance || 0} <span className="text-xs text-slate-400">{t.iqd}</span></p>
                  <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                    <span className="text-[10px] font-bold tracking-widest text-brand-emerald uppercase">{t.available || 'Available Balance'}</span>
                    <Unlock size={14} className="text-brand-emerald" />
                  </div>
                </div>

                <div className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-[2rem] border border-slate-100 dark:border-slate-800 opacity-60">
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">{language === 'ku' ? 'بڕی قفڵکراو' : 'Locked Amount'}</p>
                  <p className="text-3xl font-black text-slate-800 dark:text-white">{stats.wallet?.lockedBalance || 0} <span className="text-xs text-slate-400">{t.iqd}</span></p>
                  <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                    <span className="text-[10px] font-bold tracking-widest text-slate-400 uppercase">{t.locked || 'Locked'}</span>
                    <Lock size={14} className="text-slate-300" />
                  </div>
                </div>
              </div>

              {/* Payment Methods */}
              <div className="bg-slate-50 dark:bg-slate-800/30 p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 space-y-8">
                <div className="space-y-4">
                  <h4 className="text-sm font-black uppercase text-slate-400 tracking-widest flex items-center gap-2">
                    <CreditCard size={16} />
                    {t.paymentMethod}
                  </h4>
                  <div className="grid grid-cols-3 gap-3">
                    {['FIB', 'FastPay', 'Qi Card'].map((method) => (
                      <button 
                        key={method}
                        className="py-4 bg-white dark:bg-slate-900 rounded-2xl border-2 border-transparent hover:border-brand-emerald/30 transition-all flex flex-col items-center gap-2 shadow-sm"
                      >
                        <div className="w-10 h-10 bg-slate-50 dark:bg-slate-800 rounded-xl flex items-center justify-center text-brand-emerald">
                          <LogIn size={20} />
                        </div>
                        <span className="text-[10px] font-black">{method}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="text-sm font-black uppercase text-slate-400 tracking-widest">{t.accountOrPhone}</h4>
                  <input 
                    type="text" 
                    placeholder="07XX XXX XXXX"
                    className="w-full bg-white dark:bg-slate-900 border-none rounded-2xl py-4 px-6 text-sm font-bold focus:ring-2 focus:ring-brand-emerald/20 transition-all outline-none shadow-sm"
                  />
                </div>

                <div className="pt-4 space-y-4">
                  <button 
                    onClick={() => setShowWithdrawal(true)}
                    className="w-full bg-brand-gold text-white py-5 rounded-[1.5rem] font-black uppercase tracking-widest shadow-lg shadow-brand-gold/20 hover:scale-[1.02] active:scale-95 transition-all text-sm"
                  >
                    {t.withdrawNow}
                  </button>
                  <p className="text-[10px] font-bold text-slate-400 text-center uppercase tracking-widest">
                    {t.minWithdrawalNote}
                  </p>
                </div>
              </div>

              {/* Withdrawal Requirements Notice */}
              <div className="p-6 bg-rose-50 dark:bg-rose-950/20 rounded-[2rem] border border-rose-100 dark:border-rose-900/30 space-y-4">
                <div className="flex items-center gap-3 text-rose-500">
                  <ShieldCheck size={20} />
                  <h4 className="text-xs font-black uppercase tracking-widest">{t.withdrawalRequirements}</h4>
                </div>
                <ul className="text-[10px] font-bold text-slate-500 dark:text-slate-400 space-y-2 list-none">
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-rose-400 mt-1 flex-shrink-0"></div>
                    {t.minCompletionRule}
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-rose-400 mt-1 flex-shrink-0"></div>
                    {t.sixtyDayRule}
                  </li>
                </ul>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

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

      {/* Withdrawal Form Backdrop */}
      <AnimatePresence>
        {showWithdrawal && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/90 backdrop-blur-sm"
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="bg-white dark:bg-slate-900 w-full max-w-md rounded-[3rem] p-8 space-y-8 relative overflow-hidden"
            >
              <button 
                onClick={() => { setShowWithdrawal(false); setIsAuth(false); }}
                className="absolute top-6 right-6 w-10 h-10 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center text-slate-400"
              >
                <X size={20} />
              </button>

              {!isAuth ? (
                <div className="space-y-6">
                  <div className="text-center">
                    <div className="w-20 h-20 bg-brand-emerald/10 text-brand-emerald rounded-[2rem] flex items-center justify-center mx-auto mb-4">
                      <LogIn size={40} />
                    </div>
                    <h3 className="text-2xl font-black text-slate-800 dark:text-slate-100">{t.login || 'Login'}</h3>
                    <p className="text-sm font-bold text-slate-400">{t.authRequired || 'Please login to withdraw'}</p>
                  </div>
                  <div className="space-y-4">
                    <div className="space-y-1">
                      <label className="text-[10px] font-black uppercase text-slate-400 ml-4">{t.email || 'Email'}</label>
                      <input 
                        type="email" 
                        value={authForm.email}
                        onChange={(e) => setAuthForm(prev => ({ ...prev, email: e.target.value }))}
                        className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-2xl p-4 focus:ring-2 focus:ring-brand-emerald transition-all" 
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-black uppercase text-slate-400 ml-4">{t.password || 'Password'}</label>
                      <input 
                        type="password" 
                        value={authForm.password}
                        onChange={(e) => setAuthForm(prev => ({ ...prev, password: e.target.value }))}
                        className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-2xl p-4 focus:ring-2 focus:ring-brand-emerald transition-all" 
                      />
                    </div>
                    <button 
                      onClick={() => setIsAuth(true)}
                      className="w-full bg-slate-900 dark:bg-brand-emerald text-white font-black py-4 rounded-3xl shadow-lg hover:shadow-brand-emerald/20 transition-all uppercase tracking-widest text-sm"
                    >
                      {t.login || 'Login'}
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="text-center">
                    <div className="w-20 h-20 bg-brand-emerald/10 text-brand-emerald rounded-[2rem] flex items-center justify-center mx-auto mb-4">
                      <Wallet size={40} />
                    </div>
                    <h3 className="text-2xl font-black text-slate-800 dark:text-slate-100">{t.withdrawReward}</h3>
                    <p className="text-sm font-bold text-slate-400">{t.withdrawalRules}</p>
                  </div>

                  {(!isEligibleForWithdrawal || progressPercent < 100) ? (
                    <div className="bg-red-50 dark:bg-red-900/10 p-6 rounded-3xl border border-red-100 dark:border-red-900/20 space-y-3">
                      <div className="flex items-center gap-3 text-red-600">
                        <Lock size={20} />
                        <h4 className="font-black text-sm uppercase tracking-widest">{t.locked}</h4>
                      </div>
                      <div className="space-y-2">
                         <p className="text-xs font-bold text-red-600/80 leading-relaxed">
                           {t.withdrawalRequirements || 'Requirements to withdraw:'}
                         </p>
                         <ul className="text-[10px] font-bold text-red-600/60 space-y-1 list-disc pl-4">
                           <li>{t.minCompletionRule}</li>
                           <li>{t.sixtyDayRule}</li>
                         </ul>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      <div className="grid grid-cols-3 gap-3">
                        <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl flex flex-col items-center gap-2 border-2 border-brand-emerald">
                          <QrCode size={24} className="text-brand-emerald" />
                          <span className="text-[10px] font-black uppercase text-slate-400">FIB</span>
                        </div>
                        <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl flex flex-col items-center gap-2">
                          <CreditCard size={24} className="text-slate-400" />
                          <span className="text-[10px] font-black uppercase text-slate-400">FastPay</span>
                        </div>
                        <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl flex flex-col items-center gap-2">
                          <CreditCard size={24} className="text-slate-400" />
                          <span className="text-[10px] font-black uppercase text-slate-400">QiCard</span>
                        </div>
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-black uppercase text-slate-400 ml-4">{t.bankAccount}</label>
                        <textarea 
                          className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-2xl p-4 h-24 focus:ring-2 focus:ring-brand-emerald"
                          placeholder="Paste account number or upload QR text..."
                        />
                      </div>
                      <button className="w-full bg-brand-emerald text-white font-black py-4 rounded-3xl shadow-lg uppercase tracking-widest text-sm">
                        {t.confirm || 'Confirm'}
                      </button>
                    </div>
                  )}

                  <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-2xl text-[10px] font-bold text-slate-400 flex items-center gap-3">
                    <History size={14} />
                    {t.lockRule}
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

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
            <p className="text-3xl font-black text-brand-emerald">{(stats.totalAyahsRead || 0) + (stats.totalZikrsCompleted || 0) + (stats.totalTasbihCount || 0)}</p>
          </div>
        </div>
      </div>

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
                <div className="px-3 py-1 bg-brand-emerald/10 text-brand-emerald rounded-lg text-[10px] font-black">
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
          <p className="text-brand-emerald font-medium italic leading-relaxed">
            {t.quranRewardTranslation}
          </p>
        </div>
      </div>
    </div>
  );
}
