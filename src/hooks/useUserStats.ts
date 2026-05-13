
import { useState, useEffect } from 'react';
import { doc, getDoc, setDoc, updateDoc, onSnapshot, addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '../lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { handleFirestoreError, OperationType } from '../lib/firestore-errors';

export interface UserStats {
  points: number;
  level: number;
  totalZikrsCompleted: number;
  totalTasbihCount: number;
  totalAyahsRead: number;
  badges: string[];
  updatedAt?: string;
  joinedAt?: string;
  history?: {
    date: string; // YYYY-MM-DD
    zikrs: number;
    ayahs: number;
    points: number;
  }[];
  wallet?: {
    balance: number;
    lockedBalance: number;
    lastWithdrawalDate?: string;
    unlockedAt?: string; // Date when locked balance becomes available
  };
}

const LEVELS = [
  { level: 1, minPoints: 0, title: { ku: 'دڵێکی تینوو', en: 'Thirsty Heart', ar: 'قلب عطشان' }, color: 'text-red-500', reward: 250 },
  { level: 2, minPoints: 5000, title: { ku: 'دڵێکی بەخەبەر', en: 'Awake Heart', ar: 'قلب يقظ' }, color: 'text-orange-500', reward: 500 },
  { level: 3, minPoints: 15000, title: { ku: 'دڵێکی ئارام', en: 'Peaceful Heart', ar: 'قلب مطمئن' }, color: 'text-emerald-400', reward: 1000 },
  { level: 4, minPoints: 30000, title: { ku: 'دڵێکی زیندوو', en: 'Alive Heart', ar: 'قلب حي' }, color: 'text-emerald-700', reward: 1250 },
  { level: 5, minPoints: 50000, title: { ku: 'دڵێکی ڕەبانی', en: 'Rabani Heart', ar: 'قلب رباني' }, color: 'text-brand-gold', reward: 2000 },
];

export function useUserStats() {
  const [stats, setStats] = useState<UserStats>(() => {
    const saved = localStorage.getItem('user_stats');
    const defaultStats: UserStats = {
      points: 0,
      level: 1,
      totalZikrsCompleted: 0,
      totalTasbihCount: 0,
      totalAyahsRead: 0,
      badges: [],
      updatedAt: new Date().toISOString(),
      joinedAt: new Date().toISOString(),
      history: [],
      wallet: {
        balance: 0,
        lockedBalance: 0
      }
    };
    
    if (!saved) return defaultStats;
    
    const parsed = JSON.parse(saved);
    return {
      ...defaultStats,
      ...parsed,
      joinedAt: parsed.joinedAt || (parsed.history && parsed.history.length > 0 ? parsed.history[0].date : defaultStats.joinedAt),
      history: parsed.history || [],
      wallet: parsed.wallet || defaultStats.wallet
    };
  });

  // Effect to check and apply end-of-month rewards and locking
  useEffect(() => {
    const checkMonthTransition = () => {
      const now = new Date();
      const currentMonthKey = now.toISOString().substring(0, 7); // YYYY-MM
      const lastRewardCheck = localStorage.getItem('last_reward_month');

      if (lastRewardCheck && lastRewardCheck !== currentMonthKey) {
        // Month has changed!
        setStats(prev => {
          const currentWallet = prev.wallet || { balance: 0, lockedBalance: 0 };
          
          if (prev.level < 5 && currentWallet.balance > 0) {
            // Did not reach level 5 (100% completion)
            // Move current balance to locked balance
            const sixMonthsLater = new Date();
            sixMonthsLater.setMonth(sixMonthsLater.getMonth() + 6);
            
            return {
              ...prev,
              wallet: {
                ...currentWallet,
                balance: 0,
                lockedBalance: currentWallet.lockedBalance + currentWallet.balance,
                unlockedAt: sixMonthsLater.toISOString()
              }
            };
          }
          return prev;
        });
      }
      localStorage.setItem('last_reward_month', currentMonthKey);
    };
    checkMonthTransition();
  }, []);

  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid);
        syncWithFirestore(user.uid);
      } else {
        setUserId(null);
      }
    });
    return () => unsubscribe();
  }, []);

  const syncWithFirestore = async (uid: string) => {
    const path = `users/${uid}`;
    try {
      const userDoc = await getDoc(doc(db, 'users', uid));
      if (userDoc.exists()) {
        const firestoreData = userDoc.data() as UserStats;
        if (firestoreData.points > stats.points) {
          setStats(prev => ({
            ...prev,
            ...firestoreData,
            history: firestoreData.history || prev.history || [],
            wallet: firestoreData.wallet || prev.wallet
          }));
        } else {
          await setDoc(doc(db, 'users', uid), {
            ...stats,
            updatedAt: new Date().toISOString()
          }, { merge: true });
        }
      } else {
        await setDoc(doc(db, 'users', uid), {
          ...stats,
          updatedAt: new Date().toISOString()
        });
      }
    } catch (err) {
      handleFirestoreError(err, OperationType.WRITE, path);
    }
  };

  useEffect(() => {
    localStorage.setItem('user_stats', JSON.stringify(stats));
    if (userId) {
      const path = `users/${userId}`;
      const updateRef = async () => {
        try {
          await setDoc(doc(db, 'users', userId), {
            ...stats,
            updatedAt: new Date().toISOString()
          }, { merge: true });
        } catch (err) {
          handleFirestoreError(err, OperationType.WRITE, path);
        }
      };
      updateRef();
    }
  }, [stats, userId]);

  const updateHistory = (type: 'zikr' | 'ayah', amountPoints: number) => {
    const today = new Date().toISOString().split('T')[0];
    
    setStats(prev => {
      const history = [...(prev.history || [])];
      let todayEntry = history.find(h => h.date === today);
      
      if (!todayEntry) {
        todayEntry = { date: today, zikrs: 0, ayahs: 0, points: 0 };
        history.push(todayEntry);
      }
      
      if (type === 'zikr') todayEntry.zikrs += 1;
      else if (type === 'ayah') todayEntry.ayahs += 1;
      
      todayEntry.points += amountPoints;
      
      const newPoints = prev.points + amountPoints;
      let newLevel = prev.level;
      let rewardToAdd = 0;

      LEVELS.forEach(l => {
        if (newPoints >= l.minPoints && l.level > prev.level) {
          newLevel = l.level;
          rewardToAdd += (l as any).reward || 0;
        }
      });

      const currentWallet = prev.wallet || { balance: 0, lockedBalance: 0 };

      return {
        ...prev,
        points: newPoints,
        level: newLevel,
        wallet: {
          ...currentWallet,
          balance: currentWallet.balance + rewardToAdd
        },
        totalAyahsRead: type === 'ayah' ? prev.totalAyahsRead + 1 : prev.totalAyahsRead,
        totalZikrsCompleted: type === 'zikr' ? prev.totalZikrsCompleted + 1 : prev.totalZikrsCompleted,
        history,
        updatedAt: new Date().toISOString()
      };
    });
  };

  const addPoints = (amount: number) => {
    setStats(prev => {
      const newPoints = prev.points + amount;
      const newLevel = LEVELS.reduce((acc, curr) => (newPoints >= curr.minPoints ? curr.level : acc), 1);
      
      return {
        ...prev,
        points: newPoints,
        level: newLevel,
        updatedAt: new Date().toISOString()
      };
    });
  };

  const incrementTasbih = (count: number = 1) => {
    setStats(prev => ({ ...prev, totalTasbihCount: prev.totalTasbihCount + count }));
    addPoints(count); 
  };

  const isFriday = () => new Date().getDay() === 5;

  const completeZikr = (zikrTitle: string = '', basePoints: number = 5) => {
    let finalPoints = basePoints;
    
    // Friday Boost: Salawat
    if (isFriday() && (zikrTitle.includes('صلوات') || zikrTitle.toLowerCase().includes('salawat'))) {
      finalPoints = 10;
    }
    
    updateHistory('zikr', finalPoints); 
  };

  const completeAyah = (isKahf: boolean = false) => {
    let finalPoints = 5;
    
    // Friday Boost: Al-Kahf
    if (isFriday() && isKahf) {
      finalPoints = 10;
    }
    
    updateHistory('ayah', finalPoints); 
  };

  const sendFeedback = async (name: string, message: string) => {
    try {
      await addDoc(collection(db, 'messages'), {
        userId,
        name,
        message,
        timestamp: serverTimestamp(),
        email: auth.currentUser?.email || 'Anonymous'
      });
      return true;
    } catch (e) {
      console.error("Error sending feedback: ", e);
      return false;
    }
  };

  const currentLevelInfo = LEVELS.find(l => l.level === stats.level) || LEVELS[0];
  const nextLevelInfo = LEVELS.find(l => l.level === stats.level + 1);

  return {
    stats,
    addPoints,
    incrementTasbih,
    completeZikr,
    completeAyah,
    currentLevelInfo,
    nextLevelInfo,
    sendFeedback,
    LEVELS
  };
}
