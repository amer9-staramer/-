
import { useState } from 'react';
import { motion } from 'motion/react';
import { Wallet, Calculator, AlertCircle } from 'lucide-react';

interface ZakatCalculatorProps {
  language: 'ku' | 'ar' | 'en';
  t: any;
}

export function ZakatCalculator({ language, t }: ZakatCalculatorProps) {
  const [amount, setAmount] = useState<string>('');
  const [result, setResult] = useState<number | null>(null);
  
  // Nissab is approx 85g of gold. Let's assume a static value for demo or a placeholder calculation
  const NISSAB_THRESHOLD = 5000; // Example threshold in generic currency

  const calculate = () => {
    const numAmount = parseFloat(amount);
    if (isNaN(numAmount)) return;
    
    if (numAmount >= NISSAB_THRESHOLD) {
      setResult(numAmount * 0.025); // 2.5% Zakat
    } else {
      setResult(0);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8 py-10">
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-black text-brand-emerald">{t.zakat}</h2>
        <p className="text-slate-500 font-bold">{language === 'ku' ? 'پاککردنەوەی سەرمایەکەت ئەرکێکی پیرۆزە' : 'Purifying your wealth is a sacred duty'}</p>
      </div>

      <div className="bg-white dark:bg-slate-900 p-8 rounded-[3rem] shadow-sm border border-slate-100 dark:border-slate-800 space-y-6">
        <div className="space-y-2">
          <label className="text-xs font-black text-slate-400 uppercase tracking-widest px-2">{t.zakatAmount}</label>
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Wallet size={18} className="text-slate-300 group-focus-within:text-brand-emerald transition-colors" />
            </div>
            <input 
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.00"
              className="w-full pl-12 pr-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-lg font-bold outline-none focus:ring-4 focus:ring-brand-emerald/10 focus:border-brand-emerald/30 transition-all"
            />
          </div>
        </div>

        <button 
          onClick={calculate}
          className="w-full bg-brand-emerald text-white py-4 rounded-2xl font-black flex items-center justify-center gap-2 shadow-lg shadow-brand-emerald/20 hover:scale-[1.02] active:scale-95 transition-all"
        >
          <Calculator size={20} />
          {t.calculate}
        </button>

        {result !== null && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="pt-6 border-t border-slate-50"
          >
            {result > 0 ? (
              <div className="bg-brand-emerald/5 p-6 rounded-3xl border border-brand-emerald/10 flex flex-col items-center text-center">
                <span className="text-xs font-black text-brand-emerald uppercase tracking-widest mb-2">{t.zakatResult}</span>
                <span className="text-4xl font-black text-brand-emerald">{result.toLocaleString()}</span>
                <p className="text-xs text-slate-400 mt-4 font-bold">بڕی ٢.٥٪ لە کۆی گشتی سەرمایەکەت</p>
              </div>
            ) : (
              <div className="bg-amber-50 p-6 rounded-3xl border border-amber-100 flex items-center gap-4 text-amber-600">
                <AlertCircle size={24} />
                <p className="text-sm font-bold">{t.nisabWarning}</p>
              </div>
            )}
          </motion.div>
        )}
      </div>

      <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-[2.5rem] border border-dashed border-slate-200 dark:border-slate-700">
        <h4 className="text-sm font-black text-slate-800 dark:text-slate-100 mb-4">{language === 'ku' ? 'تێبینییە گرنگەکان:' : 'Important Notes:'}</h4>
        <ul className="text-xs text-slate-500 dark:text-slate-400 font-bold space-y-3 list-disc pr-4" dir="rtl">
          <li>{language === 'ku' ? 'زەکات تەنها لەو سەرمایەیە دەدرێت کە ساڵێکی بەسەردا تێپەڕ بووە.' : 'Zakat is only paid on wealth held for a full lunar year.'}</li>
          <li>{language === 'ku' ? 'نیسابی زەکات یەکسانە بە نرخی ٨٥ گرام ئاڵتوونی پاک.' : 'Nisab is equivalent to the price of 85g of pure gold.'}</li>
          <li>{language === 'ku' ? 'ئەم حیسابکەرە تەنها بۆ هاوکارییە و باشترە لەگەڵ مامۆستایەکی ئاینی ڕاوێژ بکەیت.' : 'This calculator is for guidance; consult a scholar for specific cases.'}</li>
        </ul>
      </div>
    </div>
  );
}
