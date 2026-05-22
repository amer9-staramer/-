
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
}

const LEVELS = [
  { level: 1, minPoints: 0, title: { ku: 'دڵێکی تینوو', en: 'Thirsty Heart', ar: 'قلب عطشان' }, color: 'text-red-500' },
  { level: 2, minPoints: 5000, title: { ku: 'دڵێکی بەخەبەر', en: 'Awake Heart', ar: 'قلب يقظ' }, color: 'text-orange-500' },
  { level: 3, minPoints: 15000, title: { ku: 'دڵێکی ئارام', en: 'Peaceful Heart', ar: 'قلب مطمئن' }, color: 'text-emerald-400' },
  { level: 4, minPoints: 30000, title: { ku: 'دڵێکی زیندوو', en: 'Alive Heart', ar: 'قلب حي' }, color: 'text-emerald-700' },
  { level: 5, minPoints: 50000, title: { ku: 'دڵێکی ڕەبانی', en: 'Rabani Heart', ar: 'قلب رباني' }, color: 'text-brand-gold' },
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
      history: []
    };
    
    if (!saved) return defaultStats;
    
    const parsed = JSON.parse(saved);
    return {
      ...defaultStats,
      ...parsed,
      joinedAt: parsed.joinedAt || (parsed.history && parsed.history.length > 0 ? parsed.history[0].date : defaultStats.joinedAt),
      history: parsed.history || []
    };
  });

  // Helper for holytimes (Friday / Friday Eve)
  const isHolyTime = () => {
    const now = new Date();
    const day = now.getDay();
    const hour = now.getHours();
    // Friday starts Thursday after 6 PM (18:00) and ends Friday midnight
    if ((day === 4 && hour >= 18) || (day === 5)) return true;
    return false;
  };

  const getTimingMultiplier = (category: string) => {
    const hour = new Date().getHours();
    if (category === 'morning' && (hour >= 5 && hour < 11)) return 2;
    if (category === 'evening' && (hour >= 16 && hour < 19)) return 2;
    if (category === 'night' && (hour >= 20 || hour < 4)) return 2;
    return 1;
  };

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
    if (!uid) return;
    const path = `users/${uid}`;
    try {
      const userDoc = await getDoc(doc(db, 'users', uid));
      if (userDoc.exists()) {
        const firestoreData = userDoc.data() as UserStats;
        if (firestoreData.points > stats.points) {
          setStats(prev => ({
            ...prev,
            ...firestoreData,
            history: firestoreData.history || prev.history || []
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
      console.warn("Firestore syncing failed (offline or unauthenticated):", err);
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
          console.warn("Firestore save failed (offline or unauthenticated):", err);
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

      LEVELS.forEach(l => {
        if (newPoints >= l.minPoints && l.level > prev.level) {
          newLevel = l.level;
        }
      });

      return {
        ...prev,
        points: newPoints,
        level: newLevel,
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

  const incrementTasbih = (count: number = 1, zikrTitle: string = '') => {
    setStats(prev => ({ ...prev, totalTasbihCount: prev.totalTasbihCount + count }));
    
    // Base points for tasbih is usually 1 point per click
    let finalPoints = count;
    
    // Holy Time Multiplier (Holy Thursday night or Friday day)
    const holyMultiplier = isHolyTime() ? 2 : 1;
    
    // Salawat specific bonus on Holy Times
    const isSalawat = zikrTitle.includes('صلوات') || zikrTitle.toLowerCase().includes('salawat') || zikrTitle.includes('سڵاوات');
    const salawatMultiplier = (isHolyTime() && isSalawat) ? 2 : 1;
    
    finalPoints = count * holyMultiplier * salawatMultiplier;
    
    addPoints(finalPoints); 
  };

  const completeZikr = (zikrTitle: string = '', basePoints: number = 5, category: string = 'general') => {
    let finalPoints = basePoints;
    
    // Holy Time Multiplier (Holy Thursday night or Friday day)
    const holyMultiplier = isHolyTime() ? 2 : 1;
    
    // Timing Multiplier (Morning Zikr in morning, etc.)
    const timingMultiplier = getTimingMultiplier(category);
    
    // Salawat specific bonus on Holy Times
    const isSalawat = zikrTitle.includes('صلوات') || zikrTitle.toLowerCase().includes('salawat') || zikrTitle.includes('سڵاوات');
    const salawatMultiplier = (isHolyTime() && isSalawat) ? 2 : 1;

    finalPoints = basePoints * holyMultiplier * timingMultiplier * salawatMultiplier;
    
    updateHistory('zikr', finalPoints); 
  };

  const completeAyah = (isKahf: boolean = false) => {
    let finalPoints = 5;
    
    // Friday Boost: Al-Kahf
    const holyMultiplier = isHolyTime() ? 2 : 1;
    const kahfMultiplier = (isHolyTime() && isKahf) ? 2 : 1;

    finalPoints = finalPoints * holyMultiplier * kahfMultiplier;
    
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
    isHolyTime,
    currentLevelInfo,
    nextLevelInfo,
    sendFeedback,
    LEVELS
  };
}
