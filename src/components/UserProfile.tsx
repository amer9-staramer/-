import { useState, useEffect, useMemo } from 'react';
import { apiFetch } from '../lib/apiFetch';
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
import { doc, getDoc, setDoc, runTransaction } from 'firebase/firestore';
import { HomeFavorites } from './HomeFavorites';

interface AvatarRendererProps {
  avatarId: string;
  className?: string;
}

export function AvatarRenderer({ avatarId, className = "w-full h-full" }: AvatarRendererProps) {
  const renderGradients = () => (
    <defs>
      <linearGradient id="grad_man_1" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#0d9488" />
        <stop offset="100%" stopColor="#115e59" />
      </linearGradient>
      <linearGradient id="grad_man_2" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#f59e0b" />
        <stop offset="100%" stopColor="#b45309" />
      </linearGradient>
      <linearGradient id="grad_woman_1" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#ec4899" />
        <stop offset="100%" stopColor="#a21caf" />
      </linearGradient>
      <linearGradient id="grad_woman_2" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#14b8a6" />
        <stop offset="100%" stopColor="#0f766e" />
      </linearGradient>
      <linearGradient id="grad_boy_1" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#f97316" />
        <stop offset="100%" stopColor="#ea580c" />
      </linearGradient>
      <linearGradient id="grad_boy_2" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#3b82f6" />
        <stop offset="100%" stopColor="#1d4ed8" />
      </linearGradient>
      <linearGradient id="grad_girl_1" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#fb7185" />
        <stop offset="100%" stopColor="#e11d48" />
      </linearGradient>
      <linearGradient id="grad_girl_2" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#a855f7" />
        <stop offset="100%" stopColor="#6b21a8" />
      </linearGradient>
    </defs>
  );

  switch (avatarId) {
    case 'avatar_man_1': // Young Active Muslim Man
      return (
        <svg viewBox="0 0 100 100" className={className}>
          {renderGradients()}
          <circle cx="50" cy="50" r="50" fill="url(#grad_man_1)" />
          {/* Clothing */}
          <path d="M25 85 C 35 70, 65 70, 75 85 Z" fill="#ffffff" />
          <path d="M40 70 L 50 82 L 60 70 Z" fill="#e2e8f0" />
          {/* Neck */}
          <rect x="44" y="58" width="12" height="15" rx="3" fill="#ffd0a3" />
          {/* Ears */}
          <circle cx="29" cy="46" r="5" fill="#ffd0a3" />
          <circle cx="71" cy="46" r="5" fill="#ffd0a3" />
          {/* Face */}
          <rect x="31" y="28" width="38" height="38" rx="19" fill="#ffd0a3" />
          {/* Hair */}
          <path d="M30 33 C 28 22, 72 22, 70 33 C 65 25, 35 25, 30 33 Z" fill="#1e293b" />
          <path d="M31 33 C 32 30, 48 24, 55 28 C 65 30, 68 33, 68 33 Z" fill="#1e293b" />
          {/* Beard */}
          <path d="M31 46 C 31 66, 69 66, 69 46 C 65 64, 35 64, 31 46 Z" fill="#334155" />
          <path d="M40 50 C 45 48, 55 48, 60 50 C 60 56, 40 56, 40 50 Z" fill="#1e293b" />
          <circle cx="50" cy="62" r="4" fill="#1e293b" />
          {/* Eyes */}
          <ellipse cx="42" cy="41" rx="2.5" ry="3.5" fill="#0f172a" />
          <ellipse cx="58" cy="41" rx="2.5" ry="3.5" fill="#0f172a" />
          <path d="M39 36 C 41 34, 45 35, 45 36" stroke="#0f172a" strokeWidth="1.5" strokeLinecap="round" fill="none" />
          <path d="M61 36 C 59 34, 55 35, 55 36" stroke="#0f172a" strokeWidth="1.5" strokeLinecap="round" fill="none" />
          {/* Cheeks */}
          <circle cx="36" cy="47" r="2.5" fill="#f43f5e" fillOpacity="0.3" />
          <circle cx="64" cy="47" r="2.5" fill="#f43f5e" fillOpacity="0.3" />
          {/* Nose */}
          <path d="M48 44 C 49 46, 51 46, 52 44" stroke="#e0a070" strokeWidth="1.5" strokeLinecap="round" fill="none" />
          {/* Smile */}
          <path d="M44 49 C 47 54, 53 54, 56 49" stroke="#0f172a" strokeWidth="1.8" strokeLinecap="round" fill="none" />
        </svg>
      );

    case 'avatar_man_2': // Venerable Elder Sheikh with Kufi Cap
      return (
        <svg viewBox="0 0 100 100" className={className}>
          {renderGradients()}
          <circle cx="50" cy="50" r="50" fill="url(#grad_man_2)" />
          {/* Thobe Body */}
          <path d="M22 85 C 32 72, 68 72, 78 85 Z" fill="#f8fafc" />
          <path d="M45 72 L 50 82 L 55 72 Z" fill="#e2e8f0" />
          {/* Neck */}
          <rect x="44" y="60" width="12" height="13" rx="2" fill="#fed7aa" />
          {/* Face */}
          <circle cx="50" cy="43" r="18" fill="#fed7aa" />
          {/* Kufi Cap */}
          <path d="M32 36 C 32 23, 68 23, 68 36 Z" fill="#ffffff" />
          <rect x="32" y="34" width="36" height="3" fill="#e2e8f0" rx="1" />
          {/* Big White/Grey Beard */}
          <path d="M32 45 C 32 68, 68 68, 68 45 C 64 64, 36 64, 32 45 Z" fill="#f1f5f9" />
          <path d="M31 43 C 33 69, 67 69, 69 43" stroke="#cbd5e1" strokeWidth="1" fill="none" />
          <path d="M40 45 C 44 44, 56 44, 60 45 C 58 48, 42 48, 40 45 Z" fill="#e2e8f0" />
          {/* Friendly Eyes */}
          <path d="M41 40 C 43 38, 46 39, 46 41" stroke="#475569" strokeWidth="1.8" strokeLinecap="round" fill="none" />
          <path d="M59 40 C 57 38, 54 39, 54 41" stroke="#475569" strokeWidth="1.8" strokeLinecap="round" fill="none" />
          {/* Nose */}
          <path d="M48 43 Q 50 46 52 43" stroke="#fdba74" strokeWidth="1.5" strokeLinecap="round" fill="none" />
          {/* Kind smile */}
          <path d="M45 48 Q 50 51 55 48" stroke="#475569" strokeWidth="1.5" strokeLinecap="round" fill="none" />
        </svg>
      );

    case 'avatar_woman_1': // Young Hijabi Woman
      return (
        <svg viewBox="0 0 100 100" className={className}>
          {renderGradients()}
          <circle cx="50" cy="50" r="50" fill="url(#grad_woman_1)" />
          {/* Robe/Chest */}
          <path d="M22 88 C 30 73, 70 73, 78 88 Z" fill="#f0abfc" fillOpacity="0.8" />
          {/* Inner bonnet */}
          <path d="M34 38 C 34 26, 66 26, 66 38 Z" fill="#ffffff" />
          {/* Face */}
          <ellipse cx="50" cy="46" rx="14" ry="17" fill="#ffedd5" />
          {/* Pastel Hijab Scarf */}
          <path d="M31 38 C 31 21, 69 21, 69 38 C 69 57, 59 78, 50 78 C 41 78, 31 57, 31 38 Z" fill="#fdf2ff" fillOpacity="0.95" />
          <path d="M34 38 C 34 24, 66 24, 66 38 C 66 52, 59 64, 50 64 C 41 64, 34 52, 34 38 Z" fill="none" stroke="#f5d0fe" strokeWidth="2" />
          {/* Face overlay */}
          <ellipse cx="50" cy="45" rx="12" ry="14" fill="#ffedd5" />
          {/* Eyes */}
          <ellipse cx="44" cy="43" rx="2" ry="3" fill="#1e1b4b" />
          <ellipse cx="56" cy="43" rx="2" ry="3" fill="#1e1b4b" />
          <path d="M41 40 Q 44 38 46 41" stroke="#1e1b4b" strokeWidth="1.5" strokeLinecap="round" fill="none" />
          <path d="M59 40 Q 56 38 54 41" stroke="#1e1b4b" strokeWidth="1.5" strokeLinecap="round" fill="none" />
          {/* Rosy blush cheeks */}
          <circle cx="41" cy="48" r="2" fill="#f43f5e" fillOpacity="0.4" />
          <circle cx="59" cy="48" r="2" fill="#f43f5e" fillOpacity="0.4" />
          {/* Cute small smile */}
          <path d="M46 51 Q 50 54 54 51" stroke="#1e1b4b" strokeWidth="1.5" strokeLinecap="round" fill="none" />
        </svg>
      );

    case 'avatar_woman_2': // Advanced Hijabi Lady
      return (
        <svg viewBox="0 0 100 100" className={className}>
          {renderGradients()}
          <circle cx="50" cy="50" r="50" fill="url(#grad_woman_2)" />
          {/* Abaya Body Dress */}
          <path d="M22 88 C 30 74, 70 74, 78 88 Z" fill="#115e59" />
          {/* Underscarf (Dark bone) */}
          <path d="M35 38 C 35 25, 65 25, 65 38 Z" fill="#2d3748" />
          {/* Oval Skin Face */}
          <ellipse cx="50" cy="45" rx="13" ry="16" fill="#fef08a" fillOpacity="0.9" />
          {/* Outer elegant draped Hijab */}
          <path d="M32 36 C 32 19, 68 19, 68 36 C 68 56, 58 76, 50 76 C 42 76, 32 56, 32 36 Z" fill="#0d9488" />
          <path d="M34 36 C 34 21, 66 21, 66 36 C 66 50, 58 63, 50 63 C 42 63, 34 50, 34 36 Z" fill="none" stroke="#14b8a6" strokeWidth="2.5" />
          {/* Re-assert face */}
          <ellipse cx="50" cy="44" rx="11.5" ry="13.5" fill="#ffd0a3" />
          {/* Refined eyes */}
          <ellipse cx="44" cy="41" rx="2" ry="3" fill="#0f172a" />
          <ellipse cx="56" cy="41" rx="2" ry="3" fill="#0f172a" />
          <path d="M41 38 C 43 36, 46 37, 46 38" stroke="#0f172a" strokeWidth="1.5" strokeLinecap="round" fill="none" />
          <path d="M59 38 C 57 36, 54 37, 54 38" stroke="#0f172a" strokeWidth="1.5" strokeLinecap="round" fill="none" />
          {/* Friendly expression */}
          <circle cx="41" cy="46" r="2.2" fill="#e11d48" fillOpacity="0.25" />
          <circle cx="59" cy="46" r="2.2" fill="#e11d48" fillOpacity="0.25" />
          <path d="M46 49 C 48 52, 52 52, 54 49" stroke="#0f172a" strokeWidth="1.5" strokeLinecap="round" fill="none" />
        </svg>
      );

    case 'avatar_boy_1': // Younger Muslim Boy (~7 years)
      return (
        <svg viewBox="0 0 100 100" className={className}>
          {renderGradients()}
          <circle cx="50" cy="50" r="50" fill="url(#grad_boy_1)" />
          {/* Body and Orange T-shirt */}
          <path d="M25 86 C 33 72, 67 72, 75 86 Z" fill="#ef4444" />
          <rect x="44" y="60" width="12" height="13" rx="2" fill="#ffedd5" />
          {/* Round chubby child face */}
          <circle cx="50" cy="44" r="17" fill="#ffedd5" />
          {/* Adorable little ears */}
          <circle cx="31" cy="44" r="3.5" fill="#ffedd5" />
          <circle cx="69" cy="44" r="3.5" fill="#ffedd5" />
          {/* Cute Fluffy Brown Anime Hair */}
          <path d="M30 38 C 28 24, 72 24, 70 38 C 72 32, 66 22, 50 24 C 34 22, 28 32, 30 38 Z" fill="#7c2d12" />
          <path d="M32 32 C 38 27, 47 28, 50 32 C 53 28, 62 27, 68 32 Z" fill="#7c2d12" />
          {/* Chubby bright eyes */}
          <circle cx="43" cy="43" r="3" fill="#1e293b" />
          <circle cx="57" cy="43" r="3" fill="#1e293b" />
          <circle cx="42" cy="41" r="1" fill="#ffffff" />
          <circle cx="56" cy="41" r="1" fill="#ffffff" />
          {/* Cheeks Blush */}
          <circle cx="38" cy="49" r="3" fill="#fb7185" fillOpacity="0.4" />
          <circle cx="62" cy="49" r="3" fill="#fb7185" fillOpacity="0.4" />
          {/* Smiling tiny cartoon mouth */}
          <path d="M44 49 Q 50 55 56 49" stroke="#1e293b" strokeWidth="2" strokeLinecap="round" fill="none" />
        </svg>
      );

    case 'avatar_boy_2': // Teenage Muslim Boy (~14 years)
      return (
        <svg viewBox="0 0 100 100" className={className}>
          {renderGradients()}
          <rect width="100" height="100" fill="url(#grad_boy_2)" rx="50" />
          {/* Shirt */}
          <path d="M23 85 C 33 70, 67 70, 77 85 Z" fill="#1e3a8a" />
          <path d="M40 70 L 50 82 L 60 70 Z" fill="#ffffff" />
          {/* Neck */}
          <rect x="43" y="58" width="14" height="14" fill="#ffd0a3" />
          {/* Ears */}
          <circle cx="30" cy="45" r="4" fill="#ffd0a3" />
          <circle cx="70" cy="45" r="4" fill="#ffd0a3" />
          {/* Face */}
          <rect x="32" y="27" width="36" height="36" rx="18" fill="#ffd0a3" />
          {/* Styled Teenage Hair */}
          <path d="M30 33 Q 32 18 50 18 Q 68 18 70 33 Q 66 22 50 20 Q 34 22 30 33 Z" fill="#0f172a" />
          <path d="M32 30 C 33 26, 42 22, 50 24 C 58 22, 67 26, 68 30 Z" fill="#0f172a" />
          {/* Eyes */}
          <circle cx="43" cy="40" r="2.5" fill="#0f172a" />
          <circle cx="57" cy="40" r="2.5" fill="#0f172a" />
          <path d="M40 35 Q 43 33 46 35" stroke="#0f172a" strokeWidth="1.5" strokeLinecap="round" fill="none" />
          <path d="M60 35 Q 57 33 54 35" stroke="#0f172a" strokeWidth="1.5" strokeLinecap="round" fill="none" />
          {/* Active teen smile */}
          <path d="M43 47 C 46 51, 54 51, 57 47" stroke="#0f172a" strokeWidth="1.8" strokeLinecap="round" fill="none" />
        </svg>
      );

    case 'avatar_girl_1': // Younger Muslim Girl (~6 years)
      return (
        <svg viewBox="0 0 100 100" className={className}>
          {renderGradients()}
          <circle cx="50" cy="50" r="50" fill="url(#grad_girl_1)" />
          {/* Soft yellow/green robe */}
          <path d="M22 88 C 30 73, 70 73, 78 88 Z" fill="#fef08a" />
          {/* Underscarf (White) */}
          <path d="M36 40 C 36 28, 64 28, 64 40 Z" fill="#ffffff" />
          {/* Chubby face */}
          <circle cx="50" cy="46" r="13" fill="#fed7aa" />
          {/* Soft Pink Mini-Hijab frame */}
          <path d="M33 40 C 33 22, 67 22, 67 40 C 67 56, 59 74, 50 74 C 41 74, 33 56, 33 40 Z" fill="#fecdd3" />
          <path d="M35 40 C 35 25, 65 25, 65 40 C 65 52, 58 64, 50 64 C 42 64, 35 52, 35 40 Z" fill="none" stroke="#fda4af" strokeWidth="2" />
          {/* Face cutout foreground */}
          <circle cx="50" cy="45" r="11" fill="#fed7aa" />
          {/* Twinkly large girl-eyes */}
          <ellipse cx="45" cy="43" rx="2.5" ry="3.5" fill="#1e293b" />
          <ellipse cx="55" cy="43" rx="2.5" ry="3.5" fill="#1e293b" />
          <circle cx="44" cy="41" r="1" fill="#ffffff" />
          <circle cx="54" cy="41" r="1" fill="#ffffff" />
          {/* Sweet blush */}
          <circle cx="41" cy="49" r="2" fill="#e11d48" fillOpacity="0.35" />
          <circle cx="59" cy="49" r="2" fill="#e11d48" fillOpacity="0.35" />
          {/* Happy smile */}
          <path d="M45 49 Q 50 53 55 49" stroke="#1e293b" strokeWidth="1.8" strokeLinecap="round" fill="none" />
        </svg>
      );

    case 'avatar_girl_2': // Teenage Muslim Girl (~13 years)
      return (
        <svg viewBox="0 0 100 100" className={className}>
          {renderGradients()}
          <circle cx="50" cy="50" r="50" fill="url(#grad_girl_2)" />
          {/* Dress */}
          <path d="M22 88 C 30 73, 70 73, 78 88 Z" fill="#f472b6" fillOpacity="0.9" />
          {/* Dark underscarf */}
          <path d="M35 38 C 35 25, 65 25, 65 38 Z" fill="#4c1d95" />
          {/* Elegant oval face */}
          <ellipse cx="50" cy="45" rx="12" ry="15" fill="#ffd0a3" />
          {/* Sky blue draped Hijab */}
          <path d="M31 36 C 31 18, 69 18, 69 36 C 69 56, 59 76, 50 76 C 41 76, 31 56, 31 36 Z" fill="#60a5fa" />
          <path d="M33 36 C 33 21, 67 21, 67 36 C 67 51, 58 63, 50 63 C 42 63, 33 51, 33 36 Z" fill="none" stroke="#93c5fd" strokeWidth="2" />
          {/* Face front placement */}
          <ellipse cx="50" cy="44" rx="11" ry="13.2" fill="#ffd0a3" />
          {/* Cute sweet eyes */}
          <ellipse cx="44" cy="41" rx="2" ry="3" fill="#1e1b4b" />
          <ellipse cx="56" cy="41" rx="2" ry="3" fill="#1e1b4b" />
          <path d="M41 38 Q 44 36 46 38" stroke="#1e1b4b" strokeWidth="1.5" strokeLinecap="round" fill="none" />
          <path d="M59 38 Q 56 36 54 38" stroke="#1e1b4b" strokeWidth="1.5" strokeLinecap="round" fill="none" />
          {/* Elegant light blush cheeks */}
          <circle cx="41" cy="46" r="2" fill="#f43f5e" fillOpacity="0.3" />
          <circle cx="59" cy="46" r="2" fill="#f43f5e" fillOpacity="0.3" />
          {/* Sweet gentle smile */}
          <path d="M46 49 Q 50 52 54 49" stroke="#1d4ed8" strokeWidth="1.8" strokeLinecap="round" fill="none" />
        </svg>
      );

    default: // Dynamic fallback to simple letter icon
      return (
        <svg viewBox="0 0 100 100" className={className}>
          <circle cx="50" cy="50" r="50" fill="#0d9488" />
          <text x="50" y="55" dominantBaseline="middle" textAnchor="middle" fill="#ffffff" fontWeight="bold" fontSize="40">
            {avatarId ? avatarId.trim().charAt(0).toUpperCase() : "Z"}
          </text>
        </svg>
      );
  }
}

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

  // --- SECURITY INTERACTIVE STATES & HANDLERS ---
  const [secEmail, setSecEmail] = useState('');
  const [secPassword, setSecPassword] = useState('');
  const [secRegisterResult, setSecRegisterResult] = useState<any>(null);
  const [secLoading, setSecLoading] = useState(false);
  const [secError, setSecError] = useState<string | null>(null);
  const [secSuccess, setSecSuccess] = useState<string | null>(null);

  // Admin Dashboard States
  const [adminUsers, setAdminUsers] = useState<any[]>([]);
  const [adminRawJson, setAdminRawJson] = useState<string>('');
  const [showAdminRaw, setShowAdminRaw] = useState(false);
  const [adminPasswordInput, setAdminPasswordInput] = useState('');
  const [isAdminVerified, setIsAdminVerified] = useState(false);
  const [adminPinError, setAdminPinError] = useState<string | null>(null);

  // Password Recovery / OTP Simulation States
  const [recoveryEmail, setRecoveryEmail] = useState('');
  const [recoveryOtp, setRecoveryOtp] = useState('');
  const [recoveryNewPassword, setRecoveryNewPassword] = useState('');
  const [recoveryStep, setRecoveryStep] = useState<1 | 2>(1); // 1: Request code, 2: Reset
  const [showRecoveryForm, setShowRecoveryForm] = useState(false);

  // Coding Explainer Mode Option
  const [activeCodeShow, setActiveCodeShow] = useState<'sql' | 'controller' | 'hashing'>('sql');

  const fetchAdminUsers = async () => {
    try {
      const data = await apiFetch('/api/secure/admin-users');
      setAdminUsers(data.users || []);
      setAdminRawJson(JSON.stringify(data, null, 2));
    } catch (err) {
      console.error('Error fetching admin users:', err);
    }
  };

  useEffect(() => {
    // Autoload admin users when verified or on load to keep counts updated silently
    fetchAdminUsers();
  }, []);

  const handleSecRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setSecLoading(true);
    setSecError(null);
    setSecSuccess(null);
    setSecRegisterResult(null);

    try {
      const data = await apiFetch('/api/secure/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: secEmail, password: secPassword }),
      });
      setSecRegisterResult(data);
      setSecSuccess(language === 'ku' ? '✅ بەکارهێنەر بە سەرکەوتوویی لە داتابەیس تۆمارکرا!' : language === 'ar' ? '✅ تم تسجيل المستخدم بأمان في قاعدة البيانات!' : '✅ User securely registered in backend database!');
      setSecEmail('');
      setSecPassword('');
      fetchAdminUsers();
    } catch (err: any) {
      setSecError(err.message);
    } finally {
      setSecLoading(false);
    }
  };

  const handleRequestOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setSecLoading(true);
    setSecError(null);
    setSecSuccess(null);

    try {
      const data = await apiFetch('/api/secure/request-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: recoveryEmail }),
      });
      setSecSuccess(language === 'ku' 
        ? `🔑 کۆدی یەکبارە (OTP): [${data.otpCode}] دروستکرا! نێردرا بۆ ئیمەیڵی بەکارهێنەر.`
        : `🔑 تم توليد رمز الـ OTP بنجاح: [${data.otpCode}]! تم إرساله مبرمجاً كبريد إلكتروني.`
      );
      setRecoveryStep(2);
    } catch (err: any) {
      setSecError(err.message);
    } finally {
      setSecLoading(false);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setSecLoading(true);
    setSecError(null);
    setSecSuccess(null);

    try {
      const data = await apiFetch('/api/secure/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: recoveryEmail,
          otpCode: recoveryOtp,
          newPassword: recoveryNewPassword
        }),
      });
      setSecSuccess(language === 'ku'
        ? '🎉 پاسپۆرت گۆڕدرا! کۆدی OTP بە سەرکەوتوویی بەکارهێنرا و یەکسەر سڕایەوە بۆ پاراستنی ئاسایش.'
        : '🎉 تم تصفير كلمة المرور! رمز الـ OTP تم تدميره فوراً لمنع أي هجوم مستقبلي.'
      );
      setRecoveryEmail('');
      setRecoveryOtp('');
      setRecoveryNewPassword('');
      setRecoveryStep(1);
    } catch (err: any) {
      setSecError(err.message);
    } finally {
      setSecLoading(false);
    }
  };

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

  // Preset spiritual avatars for fallback or quick assign - Beautiful secure vector cartoon IDs
  const avatarPresets = [
    { url: 'avatar_man_1', label: { ku: 'گورجی گەنج (پیاو)', ar: 'شاب نشيط', en: 'Young Active Man' } },
    { url: 'avatar_man_2', label: { ku: 'شیخ و بەتەمەن (پیاو)', ar: 'شيخ وقور', en: 'Venerable Elder Sheikh' } },
    { url: 'avatar_woman_1', label: { ku: 'کچی پاک (باڵاپۆش)', ar: 'فتاة خاشعة محجبة', en: 'Young Devoted Hijabi' } },
    { url: 'avatar_woman_2', label: { ku: 'سەردەمی (باڵاپۆش)', ar: 'سيدة محجبة', en: 'Modern Hijabi' } },
    { url: 'avatar_boy_1', label: { ku: 'منداڵ (دەستپێک)', ar: 'طفل صغير صالح', en: 'Little Boy (7-8 yr)' } },
    { url: 'avatar_boy_2', label: { ku: 'لاو (نەوجەوان)', ar: 'شاب يافع طهور', en: 'Teen Boy (14-15 yr)' } },
    { url: 'avatar_girl_1', label: { ku: 'بچکۆلە (باڵاپۆش)', ar: 'طفلة محجبة صالحة', en: 'Little Hijabi Girl (6-7 yr)' } },
    { url: 'avatar_girl_2', label: { ku: 'کچی گەنج (باڵاپۆش)', ar: 'فتاة محجبة يافعة', en: 'Teen Hijabi Girl (13-14 yr)' } }
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
          
          let assignedNo = stats.userNo || null;
          if (!assignedNo) {
            try {
              assignedNo = await runTransaction(db, async (transaction) => {
                const globalRef = doc(db, 'global_stats', 'main');
                const globalDoc = await transaction.get(globalRef);
                let nextNo = 1;
                if (globalDoc.exists()) {
                  const gData = globalDoc.data();
                  nextNo = ((gData.deviceCount || gData.userCount || 0) as number) + 1;
                }
                transaction.set(globalRef, { deviceCount: nextNo }, { merge: true });
                return nextNo;
              });
            } catch (transErr) {
              console.warn("UserNo transaction failed on registration:", transErr);
              assignedNo = Math.floor(Math.random() * 1000) + 50;
            }
          }

          const extendedData = {
            ...stats,
            deviceId,
            totalDhikrs,
            currentLevel,
            lastActive: new Date().toISOString(),
            status: 'online',
            updatedAt: new Date().toISOString(),
            profileName,
            profileImage,
            dailyGoal,
            role: 'user',
            userNo: assignedNo
          };

          await setDoc(doc(db, 'users', cred.user.uid), extendedData, { merge: true });
          localStorage.setItem('user_stats', JSON.stringify(extendedData));

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
            
            let assignedNo = stats.userNo || null;
            if (!assignedNo) {
              try {
                assignedNo = await runTransaction(db, async (transaction) => {
                  const globalRef = doc(db, 'global_stats', 'main');
                  const globalDoc = await transaction.get(globalRef);
                  let nextNo = 1;
                  if (globalDoc.exists()) {
                    const gData = globalDoc.data();
                    nextNo = ((gData.deviceCount || gData.userCount || 0) as number) + 1;
                  }
                  transaction.set(globalRef, { deviceCount: nextNo }, { merge: true });
                  return nextNo;
                });
              } catch (transErr) {
                console.warn("UserNo transaction failed on sign-in backup:", transErr);
                assignedNo = Math.floor(Math.random() * 1000) + 50;
              }
            }

            const extendedData = {
              ...stats,
              deviceId,
              totalDhikrs,
              currentLevel,
              lastActive: new Date().toISOString(),
              status: 'online',
              updatedAt: new Date().toISOString(),
              profileName,
              profileImage,
              dailyGoal,
              role: 'user',
              userNo: assignedNo
            };

            await setDoc(doc(db, 'users', cred.user.uid), extendedData);
            localStorage.setItem('user_stats', JSON.stringify(extendedData));
            
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
    securityTab: { ku: 'داتابەیس و ئاسایش (Senior) 🛡️', ar: 'البيانات والأمان الكلي 🛡️', en: 'Secure DB & Admin 🛡️' },
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
        <div className="flex flex-wrap sm:flex-nowrap bg-slate-100 dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800 p-1 rounded-2xl max-w-2xl mx-auto mt-6 gap-1">
          <button
            onClick={() => setActiveTab('profile')}
            className={`flex-1 py-2.5 px-2 rounded-xl text-[11px] sm:text-xs font-black transition-all ${
              activeTab === 'profile'
                ? 'bg-white dark:bg-slate-800 text-slate-800 dark:text-white shadow-sm'
                : 'text-slate-400 dark:text-slate-500 hover:text-slate-600'
            }`}
          >
            {langTerms.personalTab[language]}
          </button>

          <button
            onClick={() => setActiveTab('favorites')}
            className={`flex-1 py-2.5 px-2 rounded-xl text-[11px] sm:text-xs font-black transition-all ${
              activeTab === 'favorites'
                ? 'bg-white dark:bg-slate-800 text-slate-800 dark:text-white shadow-sm'
                : 'text-slate-400 dark:text-slate-500 hover:text-slate-600'
            }`}
          >
            {langTerms.favoritesTab[language]}
          </button>

          <button
            onClick={() => setActiveTab('sync')}
            className={`flex-1 py-2.5 px-2 rounded-xl text-[11px] sm:text-xs font-black transition-all ${
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
                    profileImage.startsWith('avatar_') ? (
                      <AvatarRenderer avatarId={profileImage} className="w-full h-full" />
                    ) : (
                      <img src={profileImage} alt="User Profile Picture" className="w-full h-full object-cover" />
                    )
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
                        <AvatarRenderer avatarId={preset.url} className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Premium Database Secure Registration & Recovery Section */}
            <div className="bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-800 rounded-[2.5rem] p-6 sm:p-8 shadow-sm space-y-6 relative overflow-hidden">
              <span className="absolute -right-16 -top-16 w-32 h-32 rounded-full bg-emerald-500/5 blur-3xl pointer-events-none" />
              
              <div className="space-y-1.5 text-center md:text-right">
                <span className="inline-flex items-center gap-1 bg-brand-emerald/10 text-brand-emerald text-[9px] font-black uppercase px-2.5 py-0.5 rounded-full border border-brand-emerald/20">
                  Secure Server Database Area (SHA-512)
                </span>
                <h4 className="text-base font-black text-slate-800 dark:text-white flex items-center justify-center md:justify-start gap-2 pt-1">
                  <Lock size={18} className="text-brand-emerald" />
                  <span>
                    {language === 'ku' ? 'تۆمارکردنی ئەندامی نوێ لە داتابەیس' : language === 'ar' ? 'تسجيل حساب مستخدم آمن بقاعدة البيانات' : 'Secure Database User Account'}
                  </span>
                </h4>
                <p className="text-[11px] font-bold text-slate-400 max-w-xl mx-auto md:mx-0 leading-relaxed">
                  {language === 'ku'
                    ? 'بۆ پاراستنی هەژمارەکەت، دەتوانیت ئیمەیڵێک و تێپەڕەوشەیەک تۆماربکەیت. سێرڤەر بە شێوازێکی تەواو کۆدکراو زانیاریەکان خەزن دەکات.'
                    : language === 'ar'
                    ? 'احمِ حسابك عبر تفعيله بالبريد وكلمة المرور المشفرة بـ PBKDF2 المباشرة على الخادم الآمن.'
                    : 'Provision a hashed secure credentials profile. Real-time encryption secures plain text entry immediately at backend border.'}
                </p>
              </div>

              {/* Toast Messages within Register Form */}
              {secError && (
                <div className="p-4 bg-rose-500/10 border border-rose-500/15 rounded-2xl text-[11px] font-bold text-rose-500 text-center animate-fade-in shadow-sm">
                  ⚠️ {secError}
                </div>
              )}
              {secSuccess && (
                <div className="p-4 bg-emerald-500/10 border border-emerald-500/15 rounded-2xl text-[11px] font-bold text-brand-emerald text-center animate-fade-in shadow-sm">
                  🎉 {secSuccess}
                </div>
              )}

              {/* Inline inputs form */}
              <form onSubmit={handleSecRegister} className="space-y-4 max-w-md mx-auto md:mx-0">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black uppercase tracking-wider text-slate-500 block">
                    {language === 'ku' ? 'ئیمەیڵ' : language === 'ar' ? 'البريد الإلكتروني' : 'Email Address'}
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="example@email.com"
                    value={secEmail}
                    onChange={(e) => setSecEmail(e.target.value)}
                    className="w-full pl-4 pr-4 py-3 bg-slate-50 dark:bg-slate-950/40 border border-slate-150 dark:border-slate-850 rounded-2xl text-xs font-bold text-slate-800 dark:text-white"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-black uppercase tracking-wider text-slate-500 block">
                    {language === 'ku' ? 'تێپەڕەوشە (پاسپۆرت)' : language === 'ar' ? 'كلمة المرور' : 'Secure Password'}
                  </label>
                  <input
                    type="password"
                    required
                    placeholder="••••••••••••"
                    value={secPassword}
                    onChange={(e) => setSecPassword(e.target.value)}
                    className="w-full pl-4 pr-4 py-3 bg-slate-50 dark:bg-slate-950/40 border border-slate-150 dark:border-slate-850 rounded-2xl text-xs font-bold text-slate-800 dark:text-white"
                  />
                </div>

                <button
                  type="submit"
                  disabled={secLoading}
                  className="w-full py-3.5 bg-brand-emerald text-white rounded-2xl text-xs font-black hover:bg-brand-emerald/90 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                >
                  {secLoading ? <RefreshCw size={14} className="animate-spin" /> : <User size={14} />}
                  <span>{language === 'ku' ? 'تۆمارکردنی ئەندامی نوێ' : language === 'ar' ? 'تسجيل حساب مشفر' : 'Register Secure Account'}</span>
                </button>
              </form>

              {/* Interactive Reset Trigger Link */}
              <div className="border-t border-slate-100 dark:border-slate-850/60 pt-4 max-w-md mx-auto md:mx-0 space-y-4">
                <div className="flex justify-between items-center">
                  <button
                    type="button"
                    onClick={() => {
                      setRecoveryStep(1); 
                      setSecSuccess(null); 
                      setSecError(null);
                      setShowRecoveryForm(!showRecoveryForm);
                    }}
                    className="text-xs font-extrabold text-blue-500 hover:text-blue-600 transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <Key size={13} />
                    <span>
                      {language === 'ku' ? '⚙️ گەڕانەوەی پاسپۆرت بە کۆدی کاتی OTP' : language === 'ar' ? '⚙️ استعادة وتصفير كلمة المرور بالـ OTP' : '⚙️ Forgot Password? Recover with OTP Token'}
                    </span>
                  </button>
                </div>

                {showRecoveryForm && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="bg-slate-50 dark:bg-slate-950/40 border border-slate-150 dark:border-slate-850 p-4.5 rounded-3xl space-y-4 text-left"
                  >
                    {recoveryStep === 1 ? (
                      /* Phase 1: Request code */
                      <form onSubmit={handleRequestOtp} className="space-y-3">
                        <div className="space-y-1 text-center md:text-right">
                          <span className="text-[9px] font-black text-amber-500 uppercase block">Step 01 / داواکاری کۆد</span>
                          <p className="text-[10px] font-bold text-slate-400">
                            {language === 'ku' ? 'ئیمەیڵەکە بنووسە بۆ ناردنی کۆد:' : language === 'ar' ? 'أدخل البريد لتوليد كود الاسترداد:' : 'Enter recovery target email address:'}
                          </p>
                        </div>
                        <div className="space-y-1">
                          <input
                            type="email"
                            required
                            placeholder="example@domain.com"
                            value={recoveryEmail}
                            onChange={(e) => setRecoveryEmail(e.target.value)}
                            className="w-full pl-4 pr-4 py-2.5 bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-850 rounded-2xl text-xs font-bold text-slate-800 dark:text-white"
                          />
                        </div>
                        <button
                          type="submit"
                          disabled={secLoading}
                          className="w-full py-2.5 bg-blue-500 text-white rounded-xl text-xs font-black hover:bg-blue-600 active:scale-95 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                        >
                          {secLoading ? <RefreshCw size={12} className="animate-spin" /> : <Mail size={12} />}
                          <span>{language === 'ku' ? 'ناردنی کۆدی کاتی شفرە' : language === 'ar' ? 'طلب رمز الـ OTP' : 'Request OTP Code'}</span>
                        </button>
                      </form>
                    ) : (
                      /* Phase 2: Verify & Reset */
                      <form onSubmit={handleVerifyOtp} className="space-y-3">
                        <p className="text-[10px] font-bold text-emerald-500 dark:text-emerald-400 leading-relaxed text-center bg-emerald-500/10 p-2.5 rounded-xl border border-emerald-500/20">
                          {language === 'ku'
                            ? '💡 کۆدی کاتی دروستبوو! کۆپی بکە لە نۆتیفیکەیشنی گۆشەی سەروو بۆ پڕکردنەوەی خێرا.'
                            : language === 'ar'
                            ? '💡 تم توليد الرمز وهو معروض في خانة النجاح الخضراء العلوية، قم بنسخه لتحديث الباسورد.'
                            : 'Muted OTP simulated. Use code from the green Success panel above to fulfill verification.'}
                        </p>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div className="space-y-1">
                            <label className="text-[9px] font-black uppercase text-slate-450 block">Enter 6-Digit OTP</label>
                            <input
                              type="text"
                              required
                              maxLength={6}
                              placeholder="123456"
                              value={recoveryOtp}
                              onChange={(e) => setRecoveryOtp(e.target.value)}
                              className="w-full pl-3 pr-3 py-2.5 bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-800 rounded-2xl text-xs font-black font-mono tracking-widest text-center text-slate-800 dark:text-white"
                            />
                          </div>

                          <div className="space-y-1">
                            <label className="text-[9px] font-black uppercase text-slate-450 block">New Password Value</label>
                            <input
                              type="password"
                              required
                              placeholder="NewPassword123"
                              value={recoveryNewPassword}
                              onChange={(e) => setRecoveryNewPassword(e.target.value)}
                              className="w-full pl-3 pr-3 py-2.5 bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-800 rounded-2xl text-xs font-bold text-slate-800 dark:text-white"
                            />
                          </div>
                        </div>

                        <div className="flex gap-2 pt-1">
                          <button
                            type="button"
                            onClick={() => setRecoveryStep(1)}
                            className="px-3.5 py-2.5 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-xl text-xs font-black transition-all cursor-pointer"
                          >
                            {language === 'ku' ? 'پاشەکشە' : 'تراجع'}
                          </button>
                          <button
                            type="submit"
                            disabled={secLoading}
                            className="flex-1 py-2.5 bg-brand-emerald text-white rounded-xl text-xs font-black hover:bg-brand-emerald/95 active:scale-95 transition-all flex items-center justify-center gap-1 cursor-pointer"
                          >
                            {secLoading ? <RefreshCw size={12} className="animate-spin" /> : <Check size={12} />}
                            <span>{language === 'ku' ? 'پەسەندکردنی پاسپۆرتی نوێ' : 'تحديث كلمة المرور واستكمال'}</span>
                          </button>
                        </div>
                      </form>
                    )}
                  </motion.div>
                )}
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
            <div className={`grid grid-cols-1 md:grid-cols-2 ${typeof stats.userNo === 'number' ? 'lg:grid-cols-5' : 'lg:grid-cols-4'} gap-4`}>
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

              {typeof stats.userNo === 'number' && (
                <div className="p-5 bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-800 rounded-2xl flex items-center gap-4 relative overflow-hidden shadow-sm">
                  <div className="p-3.5 rounded-2xl bg-indigo-500/10 text-indigo-500">
                    <Trophy size={20} className="animate-bounce" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 block uppercase tracking-wider">
                      {language === 'ku' ? 'ڕیزبەندی ئەندامێتی' : language === 'ar' ? 'ترتيب العضوية' : 'Membership Rank'}
                    </span>
                    <span className="text-xs font-black text-indigo-600 dark:text-indigo-400 pt-0.5 block">
                      #{stats.userNo}
                    </span>
                  </div>
                </div>
              )}
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

        {false && (
          <motion.div
            key="securityTab"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="space-y-8"
          >
            {/* Header Alert Card */}
            <div className="bg-slate-900 border border-slate-800 rounded-[2.5rem] p-6 sm:p-8 text-white relative overflow-hidden shadow-xl">
              <span className="absolute -right-20 -bottom-20 w-48 h-48 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="w-14 h-14 rounded-3xl bg-brand-emerald/20 text-brand-emerald flex items-center justify-center shrink-0">
                  <ShieldCheck size={32} />
                </div>
                <div className="flex-1 space-y-2 text-center md:text-right">
                  <div className="inline-flex items-center gap-2 bg-brand-emerald/15 text-brand-emerald text-[10px] font-black uppercase px-3 py-1 rounded-full border border-brand-emerald/20">
                    Senior Full-Stack Architecture Hub
                  </div>
                  <h3 className="text-xl font-black text-slate-100">
                    {language === 'ku' ? 'ئاسایشی داتابەیس و لۆجیکی تۆمارکردن' : language === 'ar' ? 'سيكوريتي قواعد البيانات وميكانيكية التسجيل' : 'Secure User Database & Masking System'}
                  </h3>
                  <p className="text-xs text-slate-400 font-semibold leading-relaxed max-w-2xl">
                    {language === 'ku'
                      ? 'لێرەوە فێری دوایین پرەنسیپەکانی بەهۆشکردن، بەکارهێنانی هاش و خوێ (Salt)، مۆڵەتەکانی ئادمین و پاراستنی زانیارییە تایبەتییەکان (PII) ببن. ئەم سیستمە پەیوەستە بە فەرمانی ڕاستەقینەی ناو ئەپڵیکەیشن بێکهاتوو لە ئێکسپرێس سێرڤەر.'
                      : language === 'ar'
                      ? 'هنا تجسيد حي لأعلى معايير حماية البيانات الشخصية والأمان. استعرض ميكانيكية تشفير كلمات المرور بصيغة SHA-512، فصل الصلاحيات الأدمين، ونظام الاسترداد الأمن التخيلي المبني على الخادم.'
                      : 'Explore production-grade data privacy patterns. Interact with real-time cryptographic hashing, admin data redaction, and strict OTP destruction workflows tied directly to the backend Express server.'}
                  </p>
                </div>
              </div>
            </div>

            {/* Error & Success Toasts */}
            {secError && (
              <div className="p-4 bg-rose-500/15 border border-rose-500/20 rounded-2xl text-xs font-bold text-rose-500 text-center animate-fade-in shadow-sm">
                ⚠️ {secError}
              </div>
            )}
            {secSuccess && (
              <div className="p-4 bg-emerald-500/15 border border-emerald-500/20 rounded-2xl text-xs font-bold text-brand-emerald text-center animate-fade-in shadow-sm">
                🎉 {secSuccess}
              </div>
            )}

            {/* Part 1: Registration Playground */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Form Block */}
              <div className="bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-800 rounded-[2.5rem] p-6 shadow-sm space-y-5">
                <div className="space-y-1">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">
                    MODULE 01 / REGISTRATION
                  </span>
                  <h4 className="text-base font-black text-slate-800 dark:text-white flex items-center gap-2">
                    <User size={18} className="text-brand-emerald" />
                    <span>{language === 'ku' ? 'تۆمارکردنێکی نوێی پارێزراو' : language === 'ar' ? 'تسجيل مستخدم جديد آمن' : 'Secure Registration Ingest'}</span>
                  </h4>
                  <p className="text-[11px] font-bold text-slate-400 leading-relaxed">
                    {language === 'ku' ? 'ئیمەیڵ و پاسپۆرت بنووسە بۆ تاقیکردنەوەی شێوازی شفرەکردن (Hash + Salt) پێش خەزنکردن.' : language === 'ar' ? 'أدخل تفاصيل الحساب لرؤية مخرجات التشفير وكيف لا يمكن تخزين كلمات المرور كنصوص واضحة.' : 'Submit a registration request to see how the server salts & hashes plain passwords.'}
                  </p>
                </div>

                <form onSubmit={handleSecRegister} className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black uppercase tracking-wider text-slate-500 block">Email Address</label>
                    <input
                      type="email"
                      required
                      placeholder="fatima@example.com"
                      value={secEmail}
                      onChange={(e) => setSecEmail(e.target.value)}
                      className="w-full pl-4 pr-4 py-3 bg-slate-50 dark:bg-slate-950/40 border border-slate-150 dark:border-slate-850 rounded-2xl text-xs font-bold text-slate-800 dark:text-white"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black uppercase tracking-wider text-slate-500 block">Plain Password</label>
                    <input
                      type="password"
                      required
                      placeholder="SecretPass123"
                      value={secPassword}
                      onChange={(e) => setSecPassword(e.target.value)}
                      className="w-full pl-4 pr-4 py-3 bg-slate-50 dark:bg-slate-950/40 border border-slate-150 dark:border-slate-850 rounded-2xl text-xs font-bold text-slate-800 dark:text-white"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={secLoading}
                    className="w-full py-3.5 bg-brand-emerald text-white rounded-2xl text-xs font-black hover:bg-brand-emerald/90 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    {secLoading ? <RefreshCw size={14} className="animate-spin" /> : <User size={14} />}
                    <span>{language === 'ku' ? 'بەکارهێنەر دروست بکە' : language === 'ar' ? 'تسجيل حساب مشفر' : 'Sign Up User'}</span>
                  </button>
                </form>
              </div>

              {/* Encryption Result Output Block */}
              <div className="bg-slate-20/50 dark:bg-slate-950 border border-slate-150 dark:border-slate-850 rounded-[2.5rem] p-6 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-2 pb-3 border-b border-slate-200/50 dark:border-slate-800">
                    <span className="text-[10px] font-extrabold text-slate-400 block uppercase">
                      CRYPTOGRAPHY ENGINE OUTPUT
                    </span>
                    <span className="px-2 py-0.5 bg-brand-emerald/10 text-brand-emerald rounded text-[9px] font-black uppercase border border-brand-emerald/20">
                      SHA-512 SECURED
                    </span>
                  </div>

                  {secRegisterResult ? (
                    <div className="space-y-4 pt-4 text-left">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="p-3 bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-800 rounded-xl">
                          <span className="text-[9px] font-black text-slate-400 block uppercase">AUTO ID</span>
                          <span className="text-sm font-black text-slate-800 dark:text-white">#{secRegisterResult.user?.id}</span>
                        </div>
                        <div className="p-3 bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-800 rounded-xl">
                          <span className="text-[9px] font-black text-slate-400 block uppercase">STATUS</span>
                          <span className="text-sm font-black text-emerald-500">{secRegisterResult.user?.status}</span>
                        </div>
                      </div>

                      <div className="space-y-1">
                        <span className="text-[9px] font-black text-slate-400 uppercase tracking-wider block">Generated Salt (Random 16 bytes)</span>
                        <div className="p-2.5 bg-slate-100 dark:bg-slate-900 rounded-xl text-[10px] font-mono break-all font-bold text-indigo-500">
                          {secRegisterResult.user?.salt}
                        </div>
                      </div>

                      <div className="space-y-1">
                        <span className="text-[9px] font-black text-slate-400 uppercase tracking-wider block">Cryptographic Password Hash (64b output)</span>
                        <div className="p-2.5 bg-slate-105 dark:bg-slate-900 rounded-xl text-[10px] font-mono break-all font-bold text-slate-705 dark:text-slate-300">
                          {secRegisterResult.user?.passwordHash}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="h-44 flex flex-col items-center justify-center text-center space-y-2 opacity-60">
                      <Key className="text-slate-400 animate-pulse animate-duration-3000" size={36} />
                      <p className="text-[11px] font-bold text-slate-400 max-w-xs leading-relaxed">
                        {language === 'ku' ? 'تۆمارکردن لە سێرڤەر نییە. داتاکانت لە فورمەکەی تەنیشت تۆمار بکە!' : language === 'ar' ? 'في انتظار التسجيل... البيانات المشفرة تظهر هنا' : 'Awaiting register. Cryptographic data logs will appear here.'}
                      </p>
                    </div>
                  )}
                </div>

                <div className="text-[10px] font-bold text-slate-405 text-center leading-relaxed mt-4 border-t border-slate-200/50 dark:border-slate-800 pt-3 flex items-center justify-center gap-1.5">
                  <ShieldCheck size={12} className="text-brand-emerald" />
                  <span>{language === 'ku' ? 'سیستەمەکە تێپەڕەوشەی دەق بە روونی پاشەکەوت ناکات.' : language === 'ar' ? 'مبدأ حماية الصفر: الأروارد يزول فور الاستهلاك.' : 'Plain-text passwords are encrypted at backend boundary.'}</span>
                </div>
              </div>

            </div>

            {/* Part 2: Secure Admin Panel with Endpoint Inspection Toggle */}
            <div className="bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-800 rounded-[2.5rem] p-6 sm:p-8 shadow-sm space-y-6">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="space-y-1 text-center sm:text-right">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">
                    MODULE 02 / DATA PRIVACY
                  </span>
                  <h4 className="text-base font-black text-slate-800 dark:text-white flex items-center justify-center sm:justify-start gap-2">
                    <Database size={18} className="text-indigo-500" />
                    <span>{language === 'ku' ? 'داشبۆردی بەڕێوەبەر (ئادمین)' : language === 'ar' ? 'لوحة تحكم المدير (الأدمين)' : 'Admin Dashboard Isolation Screen'}</span>
                  </h4>
                  <p className="text-[11px] font-bold text-slate-400 max-w-xl leading-relaxed">
                    {language === 'ku'
                      ? 'لێرەوە ببینە کە چۆن تەنها ناسنامە (ID) و باری چالاکی بەکارهێنەر دەبینرێن. ئیمەیڵ و تێپەڕەوشە هەرگیز لە ڕێگەی واژۆی API ئادمینەوە ناگوازرێتەوە!'
                      : language === 'ar'
                      ? 'تحقق كيف تلتزم اللوحة بحظر عرض البريد أو كلمات المرور. الواجهة الخلفية مبرمجة لعزل البيانات الشخصية تماماً عن شاشات المراقبة.'
                      : 'Audit our database privacy boundary. The Admin dashboard pulls users from server-side, returning solely user IDs and status metrics.'}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setShowAdminRaw(!showAdminRaw)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-750 text-slate-700 dark:text-slate-200 font-extrabold text-[10px] uppercase tracking-wider rounded-xl transition-all border border-slate-200/50 dark:border-slate-700 flex items-center gap-1.5 cursor-pointer shadow-sm"
                >
                  <FileCode size={13} />
                  <span>{showAdminRaw ? 'Hide Payload' : 'Inspect API JSON'}</span>
                </button>
              </div>

              {showAdminRaw ? (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="overflow-hidden bg-slate-950 text-emerald-400 p-4.5 rounded-2xl text-[11px] font-mono break-all whitespace-pre-wrap relative border border-slate-805 text-left"
                >
                  <span className="absolute right-4 top-3 px-1.5 py-0.5 bg-slate-900 text-[8px] font-extrabold text-slate-400 border border-slate-800 rounded">
                    GET /api/secure/admin-users
                  </span>
                  {adminRawJson}
                </motion.div>
              ) : (
                <div className="overflow-x-auto rounded-3xl border border-slate-150 dark:border-slate-800">
                  <table className="w-full text-center border-collapse text-xs">
                    <thead>
                      <tr className="bg-slate-50 dark:bg-slate-950 text-slate-500 dark:text-slate-400 border-b border-slate-150 dark:border-slate-850 uppercase tracking-widest text-[9px]">
                        <th className="py-4.5 px-4 font-black">User DB Autoincrement ID</th>
                        <th className="py-4.5 px-4 font-black">Email Address</th>
                        <th className="py-4.5 px-4 font-black">Hashed Password Source</th>
                        <th className="py-4.5 px-4 font-black">Status Indicator</th>
                      </tr>
                    </thead>
                    <tbody className="font-semibold text-slate-700 dark:text-slate-350">
                      {adminUsers.map((user, idx) => (
                        <tr key={idx} className="border-b border-slate-100 dark:border-slate-850 hover:bg-slate-50/50 dark:hover:bg-slate-950/20">
                          <td className="py-4 px-4 font-black text-slate-800 dark:text-white">
                            #{user.id}
                          </td>
                          <td className="py-4 px-4 text-rose-500 font-bold tracking-wide italic">
                            🚫 {language === 'ku' ? 'ڕێگەپێندراو نییە (پارێزراو)' : 'محجوب بحكم الخصوصية'} (PII Blocked)
                          </td>
                          <td className="py-4 px-4 text-rose-500 text-[10px] font-mono select-none">
                            🚫 [HASH REDACTED_BY_API]
                          </td>
                          <td className="py-4 px-4">
                            <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-[10px] font-black uppercase ${user.status === 'Active' ? 'bg-emerald-100/50 text-emerald-600 dark:bg-emerald-950/30' : 'bg-amber-100/50 text-amber-600 dark:bg-amber-950/30'}`}>
                              <span className={`w-1.5 h-1.5 rounded-full ${user.status === 'Active' ? 'bg-emerald-500' : 'bg-amber-500 animate-pulse'}`} />
                              {user.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            {/* Part 3: Password Recovery System with OTP Simulation */}
            <div className="bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-800 rounded-[2.5rem] p-6 sm:p-8 shadow-sm space-y-6">
              <div className="text-center sm:text-right">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">
                  MODULE 03 / OTP PASSWORD RECOVERY
                </span>
                <h4 className="text-base font-black text-slate-800 dark:text-white flex items-center justify-center sm:justify-start gap-2">
                  <Key size={18} className="text-amber-500" />
                  <span>{language === 'ku' ? 'پاککردنەوەی تێپەڕەوشە بە کۆدی کاتی (OTP)' : language === 'ar' ? 'استرداد كلمة المرور بالرمز المؤقت' : 'OTP & Secure Password Recovery Engine'}</span>
                </h4>
                <p className="text-[11px] font-bold text-slate-400 max-w-xl leading-relaxed">
                  {language === 'ku'
                    ? 'تاقیکردنەوەی چاککردنەوەی تێپەڕەوشە. کۆدی OTP بە شێوەی کاتی دروست دەبێت و پێویستە دەستبەجێ دوای گۆڕینی پاسپۆرتەکە بسڕدرێتەوە لەناو داتابەیس بۆ ئاسایش.'
                    : language === 'ar'
                    ? 'اطلب رمز التحقق الأحادي ثم قم بإعادة تصفير كلمة المرور. ستلاحظ كيف يتم إلغاء الرمز وحذفه من قاعدة البيانات في ذات جزء الثانية لضمان أمان كامل.'
                    : 'Test the secure recovery loop. OTP codes hold short validity (5 minutes) and are destroyed immediately within the same database transaction after use.'}
                </p>
              </div>

              {recoveryStep === 1 ? (
                /* Step 1: Request OTP Form */
                <form onSubmit={handleRequestOtp} className="max-w-md mx-auto space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black uppercase tracking-wider text-slate-500 block">
                      {language === 'ku' ? 'ئیمەیڵەکە بنووسە بۆ ناردنی کۆد:' : language === 'ar' ? 'البريد المسجل للاسترداد:' : 'Registered Recovery Email'}
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="fatima.alzahra@example.com"
                      value={recoveryEmail}
                      onChange={(e) => setRecoveryEmail(e.target.value)}
                      className="w-full pl-4 pr-4 py-3 bg-slate-50 dark:bg-slate-950/40 border border-slate-150 dark:border-slate-850 rounded-2xl text-xs font-bold text-slate-800 dark:text-white"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={secLoading}
                    className="w-full py-3.5 bg-brand-emerald text-white font-black text-xs rounded-2xl hover:bg-brand-emerald/90 transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    {secLoading ? <RefreshCw size={14} className="animate-spin" /> : <Mail size={14} />}
                    <span>{language === 'ku' ? 'داواکردنی کۆدی OTP' : language === 'ar' ? 'طلب رمز الـ OTP' : 'Request Token OTP'}</span>
                  </button>
                </form>
              ) : (
                /* Step 2: Input OTP & Set New Password Form */
                <form onSubmit={handleVerifyOtp} className="max-w-md mx-auto space-y-4">
                  <div className="bg-amber-50/50 dark:bg-amber-950/10 text-amber-600 dark:text-amber-450 p-4.5 rounded-2xl text-[11px] font-bold border border-amber-200/50 leading-relaxed text-center">
                    {language === 'ku' 
                      ? '💡 کۆدی یەکبارە دروست بووە! کۆدەکەت لە ناو چاڵاکییە کەسکەکە فۆرمی سەرەوە نمایش دەکرێت بۆ تاقیکردنەوە.' 
                      : language === 'ar' 
                      ? '💡 تم توليد الرمز وهو متوفر في صندوق الإرشادات العلوي الأخضر، استخدمه لإكمال التصفير والتدقيق.' 
                      : 'The secure One-Time Password was generated. Check the top green Success notification box to access the simulated OTP inbox.'}
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black uppercase tracking-wider text-slate-500 block">Verification Account</label>
                    <input
                      type="email"
                      required
                      readOnly
                      value={recoveryEmail}
                      className="w-full pl-4 pr-4 py-3 bg-slate-100 dark:bg-slate-900 border border-slate-150 dark:border-slate-800 rounded-2xl text-xs font-bold text-slate-500"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-black uppercase tracking-wider text-slate-500 block">Enter 6-Digit OTP</label>
                      <input
                        type="text"
                        required
                        maxLength={6}
                        placeholder="123456"
                        value={recoveryOtp}
                        onChange={(e) => setRecoveryOtp(e.target.value)}
                        className="w-full pl-4 pr-4 py-3 bg-slate-50 dark:bg-slate-950/40 border border-slate-150 dark:border-slate-850 rounded-2xl text-xs font-mono font-black text-slate-800 dark:text-white tracking-widest text-center"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[10px] font-black uppercase tracking-wider text-slate-500 block">New Password Value</label>
                      <input
                        type="password"
                        required
                        placeholder="NewPassWord123"
                        value={recoveryNewPassword}
                        onChange={(e) => setRecoveryNewPassword(e.target.value)}
                        className="w-full pl-4 pr-4 py-3 bg-slate-50 dark:bg-slate-950/40 border border-slate-150 dark:border-slate-850 rounded-2xl text-xs font-bold text-slate-800 dark:text-white"
                      />
                    </div>
                  </div>

                  <div className="flex gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => setRecoveryStep(1)}
                      className="px-4 py-3 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 text-slate-750 dark:text-slate-205 rounded-xl text-xs font-black transition-all cursor-pointer"
                    >
                      {language === 'ku' ? 'پاشەکشە' : 'رجوع'}
                    </button>
                    <button
                      type="submit"
                      disabled={secLoading}
                      className="flex-1 py-3 bg-brand-emerald text-white font-black text-xs rounded-2xl hover:bg-brand-emerald/90 transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      {secLoading ? <RefreshCw size={14} className="animate-spin" /> : <Check size={14} />}
                      <span>{language === 'ku' ? 'بەجێهێنانی چاککردنەوە و گۆڕین' : 'تحديث كلمة المرور وإتلاف الرمز'}</span>
                    </button>
                  </div>
                </form>
              )}
            </div>

            {/* Part 4: Technical DDL Schemas & Senior Explainer View Box */}
            <div className="bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-800 rounded-[2.5rem] p-6 sm:p-8 shadow-sm space-y-6">
              <div className="space-y-1 pb-4 border-b border-b-slate-100 dark:border-b-slate-850 text-center sm:text-right">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">
                  DEVELOPER TECHNICAL SPECIFICATIONS
                </span>
                <h4 className="text-base font-black text-slate-800 dark:text-white flex items-center justify-center sm:justify-start gap-2">
                  <FileCode size={18} className="text-indigo-500 animate-pulse" />
                  <span>{language === 'ku' ? 'کۆد و پلانی تەکنیکی سیستەمی داتابەیس' : language === 'ar' ? 'شيفرة وهندسة النظام الأمن المكتوبة' : 'Production Schemas & Code Architectures'}</span>
                </h4>
                <p className="text-[11px] font-bold text-slate-400">
                  {language === 'ku' ? 'ئیستا دەتوانیت دیزاینی دەرەکی، مۆڵەتی ئادمین و کۆدی لۆکاڵی تەواوی ئەم کارانە کوپی بکەیت.' : 'كوبر شيفرات SQL، المتحكّمات (Controllers)، وخوارزميات ميكانيكية الهاش للمشاريع الحقيقية.'}
                </p>

                {/* Switcher */}
                <div className="flex bg-slate-50 dark:bg-slate-950 p-1.5 rounded-2xl max-w-sm mt-5 border border-slate-100 dark:border-slate-850 mx-auto sm:mx-0">
                  <button
                    onClick={() => setActiveCodeShow('sql')}
                    className={`flex-1 py-1.5 px-2 rounded-xl text-[10px] sm:text-xs font-black transition-all ${activeCodeShow === 'sql' ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-950 shadow-sm' : 'text-slate-400'}`}
                  >
                    1. SQL Schema (DDL)
                  </button>
                  <button
                    onClick={() => setActiveCodeShow('controller')}
                    className={`flex-1 py-1.5 px-2 rounded-xl text-[10px] sm:text-xs font-black transition-all ${activeCodeShow === 'controller' ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-950 shadow-sm' : 'text-slate-400'}`}
                  >
                    2. API Controller
                  </button>
                  <button
                    onClick={() => setActiveCodeShow('hashing')}
                    className={`flex-1 py-1.5 px-2 rounded-xl text-[10px] sm:text-xs font-black transition-all ${activeCodeShow === 'hashing' ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-950 shadow-sm' : 'text-slate-400'}`}
                  >
                    3. Salt Hashing
                  </button>
                </div>
              </div>

              {activeCodeShow === 'sql' && (
                <div className="space-y-4 font-mono text-[11px] bg-slate-950 text-slate-300 p-5 rounded-2xl overflow-x-auto relative border border-slate-800 text-left">
                  <span className="absolute right-4 top-4 text-[9px] font-black text-slate-500 uppercase tracking-widest bg-slate-900 border border-slate-800 px-2 py-0.5 rounded">sql / postgresql</span>
                  <pre className="leading-5">{`-- Users Table supporting Auto-incrementing Key & String Redactions
CREATE TABLE users (
    id SERIAL PRIMARY KEY,               -- Auto-incrementing user identification key (1, 2, 3...)
    email VARCHAR(255) UNIQUE NOT NULL,  -- Unique constraints, case-insensitive indexable
    password_hash VARCHAR(128) NOT NULL, -- Hex encoded PBKDF2/bcrypt strong password hash
    salt VARCHAR(64) NOT NULL,           -- Unique cryptographic securely generated salt
    status VARCHAR(20) DEFAULT 'Active' CHECK (status IN ('Active', 'Pending')),
    otp_code VARCHAR(6) DEFAULT NULL,    -- Secure transient verification OTP pin
    otp_expires_at BIGINT DEFAULT NULL,  -- OTP expiry timestamp (Date.now() + 5 * 60 * 1000)
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Optimize login and retrieval routines
CREATE UNIQUE INDEX idx_users_email_lower ON users (LOWER(email));`}</pre>
                </div>
              )}

              {activeCodeShow === 'controller' && (
                <div className="space-y-4 font-mono text-[11px] bg-slate-950 text-slate-300 p-5 rounded-2xl overflow-x-auto relative border border-slate-800 text-left">
                  <span className="absolute right-4 top-4 text-[9px] font-black text-slate-500 uppercase tracking-widest bg-slate-900 border border-slate-800 px-2 py-0.5 rounded">typescript / node express</span>
                  <pre className="leading-5">{`import { Request, Response } from 'express';

// Strict Data Redaction Boundary - Blocks email and password leakage on administrative screens
export const getAdminUsersMap = async (req: Request, res: Response) => {
  try {
    // Column Redaction query structure: SELECT ONLY minimal metrics 
    // to strictly preserve data privacy at REST API levels.
    // The columns email, password_hash, salt, and otp_code are strictly excluded!
    const users = await db.query('SELECT id, status FROM users ORDER BY id ASC');

    return res.json({
      success: true,
      description: "PII variables (email/password) are redacted and never left the database boundary.",
      users: users.rows
    });
  } catch (error) {
    return res.status(500).json({ error: "Access Redaction Error" });
  }
};`}</pre>
                </div>
              )}

              {activeCodeShow === 'hashing' && (
                <div className="space-y-4 font-mono text-[11px] bg-slate-950 text-slate-300 p-5 rounded-2xl overflow-x-auto relative border border-slate-800 text-left">
                  <span className="absolute right-4 top-4 text-[9px] font-black text-slate-500 uppercase tracking-widest bg-slate-900 border border-slate-800 px-2 py-0.5 rounded">typescript / cryptography</span>
                  <pre className="leading-5">{`import crypto from 'crypto';

// Hashes a plain-text credentials before inserting into persistent state
export function secureHashCredential(password: string): { hash: string; salt: string } {
  // Generate highly resistant physical cryptographic salt mapping
  const salt = crypto.randomBytes(16).toString('hex');
  
  // Encrypt utilizing strong synchronous pbkdf2 with 1000 iteration indexes
  const hash = crypto.pbkdf2Sync(
    password, 
    salt, 
    1000, 
    64, 
    'sha512'
  ).toString('hex');
  
  return { hash, salt };
}`}</pre>
                </div>
              )}
            </div>

          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
