
import { useState, useEffect } from 'react';
import { doc, getDoc, setDoc, updateDoc, onSnapshot, addDoc, collection, serverTimestamp, increment } from 'firebase/firestore';
import { auth, db } from '../lib/firebase';
import { onAuthStateChanged, signInAnonymously } from 'firebase/auth';
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

  // Find or generate a unique Device ID in LocalStorage
  const [deviceId] = useState<string>(() => {
    let id = localStorage.getItem('device_id');
    if (!id) {
      id = 'dev_' + Math.random().toString(36).substring(2, 9) + '_' + Date.now().toString(36);
      localStorage.setItem('device_id', id);
    }
    return id;
  });

  const [userId, setUserId] = useState<string | null>(null);
  const [isAnonymousUser, setIsAnonymousUser] = useState<boolean>(true);

  // Compute syncId dynamically: if signed in with real email, use the authenticated user ID; otherwise, fallback to deviceId
  const syncId = userId && !isAnonymousUser ? userId : deviceId;

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid);
        setIsAnonymousUser(user.isAnonymous);
      } else {
        setUserId(null);
        setIsAnonymousUser(true);
        // Automatically sign in anonymously so every device gets a unique ID and can talk to Firestore securely
        signInAnonymously(auth).then((cred) => {
          if (cred.user) {
            setUserId(cred.user.uid);
            setIsAnonymousUser(cred.user.isAnonymous);
          }
        }).catch((err) => {
          console.warn("Silent anonymous authentication failed (may be disabled in console):", err);
        });
      }
    });
    return () => unsubscribe();
  }, []);

  const syncWithFirestore = async () => {
    if (!syncId) return;
    try {
      const userDoc = await getDoc(doc(db, 'users', syncId));
      const totalDhikrs = stats.totalTasbihCount + stats.totalZikrsCompleted;
      const currentLevel = Math.min(100, Math.max(1, Math.floor(Math.sqrt(totalDhikrs * 1.5)) + 1));

      const defaultPayload = {
        ...stats,
        deviceId: deviceId, // keep original device tracker
        totalDhikrs: totalDhikrs,
        currentLevel: currentLevel,
        lastActive: new Date().toISOString(),
        status: 'online',
        updatedAt: new Date().toISOString()
      };

      if (userDoc.exists()) {
        const firestoreData = userDoc.data() as any;
        // Merge strategy: if Cloud has higher stats (or is the cloud-restored account), pull it. Otherwise sync local newest.
        if (firestoreData.points > stats.points) {
          setStats(prev => ({
            ...prev,
            ...firestoreData,
            history: firestoreData.history || prev.history || []
          }));
        } else {
          await setDoc(doc(db, 'users', syncId), defaultPayload, { merge: true });
        }
      } else {
        // Increment global device counts if guest
        if (syncId === deviceId) {
          const globalRef = doc(db, 'global_stats', 'main');
          await setDoc(globalRef, {
            deviceCount: increment(1)
          }, { merge: true }).catch((e) => console.warn("Failed to increment deviceCount:", e));
        }

        await setDoc(doc(db, 'users', syncId), defaultPayload);
      }
    } catch (err) {
      console.warn("Firestore syncing failed (offline or unauthenticated):", err);
    }
  };

  // Sync when syncId or auth changes
  useEffect(() => {
    if (syncId) {
      syncWithFirestore();
    }
  }, [syncId]);

  useEffect(() => {
    localStorage.setItem('user_stats', JSON.stringify(stats));
    if (syncId) {
      const updateRef = async () => {
        try {
          const totalDhikrs = stats.totalTasbihCount + stats.totalZikrsCompleted;
          const currentLevel = Math.min(100, Math.max(1, Math.floor(Math.sqrt(totalDhikrs * 1.5)) + 1));

          await setDoc(doc(db, 'users', syncId), {
            ...stats,
            deviceId: deviceId,
            totalDhikrs: totalDhikrs,
            currentLevel: currentLevel,
            lastActive: new Date().toISOString(),
            status: 'online',
            updatedAt: new Date().toISOString()
          }, { merge: true });
        } catch (err) {
          console.warn("Firestore save failed (offline or unauthenticated):", err);
        }
      };
      updateRef();
    }
  }, [stats, syncId, deviceId]);

  // Presence logic: mark online on mount, and offline on unmount or invisibility
  useEffect(() => {
    if (!syncId) return;

    const markOnline = async () => {
      try {
        await setDoc(doc(db, 'users', syncId), {
          status: 'online',
          lastActive: new Date().toISOString()
        }, { merge: true });
      } catch (err) {
        console.warn("Presence: failed to mark online:", err);
      }
    };

    const markOffline = async () => {
      try {
        await setDoc(doc(db, 'users', syncId), {
          status: 'offline',
          lastActive: new Date().toISOString()
        }, { merge: true });
      } catch (err) {
        console.warn("Presence: failed to mark offline:", err);
      }
    };

    markOnline();

    const handleBeforeUnload = () => {
      markOffline();
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        markOffline();
      } else {
        markOnline();
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    window.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      window.removeEventListener('visibilitychange', handleVisibilityChange);
      markOffline();
    };
  }, [deviceId]);

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

  const incrementTasbih = (count: number = 1, zikrTitle: string = '', zikrId?: string) => {
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

    // Update global aggregates & specific zikr stats
    try {
      const globalRef = doc(db, 'global_stats', 'main');
      setDoc(globalRef, {
        totalTasbihCount: increment(count),
        totalPoints: increment(finalPoints)
      }, { merge: true });

      if (zikrId) {
        const statsRef = doc(db, 'zikr_stats', zikrId);
        setDoc(statsRef, {
          id: zikrId,
          title: zikrTitle.substring(0, 50) + '...',
          totalClicks: increment(count),
          viewCount: increment(0),
          lastViewed: new Date().toISOString()
        }, { merge: true });
      }
    } catch (e) {
      console.warn("Error archiving global tasbih statistic:", e);
    }
  };

  const completeZikr = (zikrTitle: string = '', basePoints: number = 5, category: string = 'general', zikrId?: string) => {
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

    // Update global aggregates & specific zikr stats
    try {
      const globalRef = doc(db, 'global_stats', 'main');
      setDoc(globalRef, {
        totalZikrsCount: increment(1),
        totalPoints: increment(finalPoints)
      }, { merge: true });

      if (zikrId) {
        const statsRef = doc(db, 'zikr_stats', zikrId);
        setDoc(statsRef, {
          id: zikrId,
          title: zikrTitle.substring(0, 50) + '...',
          completionCount: increment(1),
          viewCount: increment(0),
          lastViewed: new Date().toISOString()
        }, { merge: true });
      }
    } catch (e) {
      console.warn("Error archiving global zikr completion:", e);
    }
  };

  const completeAyah = (isKahf: boolean = false) => {
    let finalPoints = 5;
    
    // Friday Boost: Al-Kahf
    const holyMultiplier = isHolyTime() ? 2 : 1;
    const khfMultiplier = (isHolyTime() && isKahf) ? 2 : 1;

    finalPoints = finalPoints * holyMultiplier * khfMultiplier;
    
    updateHistory('ayah', finalPoints); 

    // Update global aggregates
    try {
      const globalRef = doc(db, 'global_stats', 'main');
      setDoc(globalRef, {
        totalPoints: increment(finalPoints)
      }, { merge: true });
    } catch (e) {
      console.warn("Error archiving global ayah points:", e);
    }
  };

  const sendFeedback = async (name: string, message: string) => {
    const payload = {
      userId: userId || null,
      name: name || 'Anonymous',
      message: message || '',
      email: auth.currentUser?.email || 'Anonymous'
    };

    try {
      await addDoc(collection(db, 'messages'), {
        userId: payload.userId,
        name: payload.name,
        message: payload.message,
        timestamp: serverTimestamp(),
        email: payload.email
      });
      return true;
    } catch (e: any) {
      console.warn("Could not save feedback to Firestore directly, caching locally for background sync:", e);
      try {
        const pending = JSON.parse(localStorage.getItem('pending_feedbacks') || '[]');
        pending.push({
          ...payload,
          localTimestamp: new Date().toISOString()
        });
        localStorage.setItem('pending_feedbacks', JSON.stringify(pending));
        return true; // Return true because it was safely cached and will be synced as soon as connection is restored
      } catch (storageErr) {
        console.error("Critical: Failed to even cache feedback locally:", storageErr);
        return false;
      }
    }
  };

  // Background sync for offline messages / feedbacks
  useEffect(() => {
    const syncPendingFeedbacks = async () => {
      if (!navigator.onLine) return;
      const pendingStr = localStorage.getItem('pending_feedbacks');
      if (!pendingStr) return;
      try {
        const pending = JSON.parse(pendingStr);
        if (!Array.isArray(pending) || pending.length === 0) return;
        
        console.log(`Syncing ${pending.length} pending feedback messages to Firestore...`);
        const remaining = [];
        
        for (const item of pending) {
          try {
            await addDoc(collection(db, 'messages'), {
              userId: item.userId || null,
              name: item.name || 'Anonymous',
              message: item.message || '',
              timestamp: serverTimestamp(),
              email: item.email || 'Anonymous'
            });
          } catch (writeErr) {
            console.warn("Retrying later: failed to sync pending message:", writeErr);
            remaining.push(item);
          }
        }
        
        if (remaining.length === 0) {
          localStorage.removeItem('pending_feedbacks');
        } else {
          localStorage.setItem('pending_feedbacks', JSON.stringify(remaining));
        }
      } catch (err) {
        console.warn("Error running local feedback sync:", err);
      }
    };

    syncPendingFeedbacks();
    window.addEventListener('online', syncPendingFeedbacks);
    const interval = setInterval(syncPendingFeedbacks, 20000); // Check/sync every 20 seconds
    return () => {
      window.removeEventListener('online', syncPendingFeedbacks);
      clearInterval(interval);
    };
  }, [userId]);

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
    LEVELS,
    deviceId,
    userId,
    isAnonymousUser,
    syncId,
    syncWithFirestore
  };
}
