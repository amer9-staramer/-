import { useEffect, useState } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../lib/firebase';
import { handleFirestoreError, OperationType } from '../lib/firestore-errors';
import { Loader2, ShieldAlert } from 'lucide-react';
import { motion } from 'motion/react';

interface ProtectedRouteProps {
  children: React.ReactNode;
  onRedirect: () => void;
  language: 'ku' | 'en' | 'ar';
}

export function ProtectedRoute({ children, onRedirect, language }: ProtectedRouteProps) {
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user: User | null) => {
      if (!user) {
        // Not signed in -> redirect
        setAuthorized(false);
        setLoading(false);
        onRedirect();
        if (window.location.pathname === '/admin' || window.location.pathname === '/admin-portal') {
          window.history.replaceState({}, '', '/');
        }
        return;
      }

      // Explicit bypass for hardcoded owner/admin emails
      if (user.email === 'adolamer9@gmail.com' || user.email === 'zanyarshkurd@gmail.com') {
        setAuthorized(true);
        setLoading(false);
        return;
      }

      const userDocRef = doc(db, 'users', user.uid);
      try {
        const userDocSnap = await getDoc(userDocRef);
        if (userDocSnap.exists()) {
          const userData = userDocSnap.data();
          const role = userData?.role;

          if (role === 'admin') {
            setAuthorized(true);
          } else {
            // Role is standard 'user' -> Redirect
            setAuthorized(false);
            onRedirect();
            if (window.location.pathname === '/admin' || window.location.pathname === '/admin-portal') {
              window.history.replaceState({}, '', '/');
            }
          }
        } else {
          // Document doesn't exist yet, user doesn't have a role -> Treat as standard 'user'
          setAuthorized(false);
          onRedirect();
          if (window.location.pathname === '/admin' || window.location.pathname === '/admin-portal') {
            window.history.replaceState({}, '', '/');
          }
        }
      } catch (err) {
        // Enforce Firestore Error standard validation
        try {
          handleFirestoreError(err, OperationType.GET, `users/${user.uid}`);
        } catch (jsonErr: any) {
          setErrorMsg(jsonErr.message || String(err));
        }
        setAuthorized(false);
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [onRedirect]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-950 p-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center gap-4 text-center max-w-sm"
        >
          <Loader2 className="w-10 h-10 text-brand-emerald animate-spin" />
          <p className="text-sm font-bold text-slate-600 dark:text-slate-300">
            {language === 'ku'
              ? 'پشکنینی دەسەڵاتەکان دەکەین، تکایە چاوەڕوان بە...'
              : language === 'ar'
              ? 'جاري التحقق من الصلاحيات، يرجى الانتظار...'
              : 'Verifying permissions, please wait...'}
          </p>
        </motion.div>
      </div>
    );
  }

  if (errorMsg) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-950 p-6">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-slate-900 border border-red-100 dark:border-red-950 p-6 rounded-3xl max-w-sm text-center shadow-xl space-y-4"
        >
          <div className="w-12 h-12 bg-red-100 dark:bg-red-950/45 text-red-500 rounded-full flex items-center justify-center mx-auto">
            <ShieldAlert size={24} />
          </div>
          <h3 className="text-base font-black text-slate-800 dark:text-white">
            {language === 'ku' ? 'خەتای دەستگەیشتن' : language === 'ar' ? 'فشل التحقق' : 'Access Control Error'}
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 font-mono break-all font-medium leading-relaxed">
            {errorMsg}
          </p>
          <button
            onClick={onRedirect}
            className="w-full bg-slate-900 hover:bg-slate-800 text-white font-black text-xs py-3 rounded-xl transition-colors"
          >
            {language === 'ku' ? 'گەڕانەوە بۆ سەرەکی' : language === 'ar' ? 'الرجوع للرئيسية' : 'Go to Home'}
          </button>
        </motion.div>
      </div>
    );
  }

  if (!authorized) {
    return null; // Redirect already triggered in useEffect
  }

  return <>{children}</>;
}
