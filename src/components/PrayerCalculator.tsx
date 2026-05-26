import React, { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { Calendar, Award, User, Clock, AlertCircle, Quote, RefreshCw } from 'lucide-react';

interface PrayerCalculatorProps {
  language: 'ku' | 'ar' | 'en';
}

export function PrayerCalculator({ language }: PrayerCalculatorProps) {
  // Birth state (empty by default, with guiding placeholders)
  const [birthDayStr, setBirthDayStr] = useState<string>('');
  const [birthMonthStr, setBirthMonthStr] = useState<string>('');
  const [birthYearStr, setBirthYearStr] = useState<string>('');

  // Present/Current Date state (pre-filled with today's date but fully editable)
  const today = new Date();
  const [currentDayStr, setCurrentDayStr] = useState<string>(today.getDate().toString());
  const [currentMonthStr, setCurrentMonthStr] = useState<string>((today.getMonth() + 1).toString());
  const [currentYearStr, setCurrentYearStr] = useState<string>(today.getFullYear().toString());

  // Count 10 years of age as not obligated (as specified by user: "دەساڵی تەمەنی وەک فەرزنەبوون ئەژماربکە")
  const freeYears = 10;

  // Let's provide localized texts
  const translations = {
    ku: {
      title: 'حیساباتی تەمەن و نوێژەکانت',
      subtitle: 'بەپێی قورئان و فەرموودە شەرعییەکان، ژیانت بۆ پەرستش حساب بکە',
      quote: '«کاتێک نوێژ دەکەیت، وا هەست بکە دواین نوێژتە»',
      birthLabel: 'ڕێکەوتی لەدایکبوون',
      birthLabelSub: 'ڕۆژ، مانگ و ساڵی لەدایکبوونی خۆت تێبنووسە',
      currentLabel: 'ڕێکەوتی ئێستا (یاخود ڕێکەوتی مەبەست)',
      currentLabelSub: 'دەتوانیت ڕێکەوتی ئەمڕۆ بگۆڕیت بۆ مێژوویەکی تر لێرە',
      dayPlaceholder: 'ڕۆژ (نمونە: ١٥)',
      monthPlaceholder: 'مانگ (نمونە: ٥)',
      yearPlaceholder: 'ساڵ (نمونە: ١٩٩٥)',
      dayLabel: 'ڕۆژ',
      monthLabel: 'مانگ',
      yearLabel: 'ساڵ',
      notObligatedYears: 'ساڵانی پێش فەرزبوون',
      notObligatedYearsDesc: '١٠ ساڵی سەرەتای تەمەن کە نوێژت تیا فەرز نەبووە (لێدەردەکرێت)',
      resultsTitle: 'ئەنجامەکانی پێوانە و حیسابات',
      ageLabel: 'تەمەنی گشتیت',
      yearsObligated: 'ماوەی فەرزبوونی نوێژ',
      daysObligated: 'کۆی ڕۆژانی فەرزبوون',
      totalPrayers: 'کۆی نوێژە فەرزەکان',
      totalRakat: 'کۆی ڕەکاتە فەرزەکان',
      rakatUnit: 'ڕەکات (١٧ ڕەکات ڕۆژانە)',
      encouragementTitle: 'ڕێنمایی و هاندانی شەرعی بۆ نوێژە قەزاکان',
      encouragementText: 'هیچ کات درەنگ نییە بۆ دەستپێکردنەوە و قەرەبووکردنەوەی نوێژە فەوتاوەکان. زانایان ئامۆژگاری دەکەن کە لەگەڵ هەر نوێژە فەرزێکی ئێستاتتدا، نوێژێکی قەزا (بۆ نمونە نیوەڕۆیەک لەگەڵ نیوەڕۆیەک) بکیتەوە تا وردە وردە هەمووی پاک ببێتەوە.',
      fajr: 'بەیانی (٢ ڕەکات)',
      dhuhr: 'نیوەڕۆ (٤ ڕەکات)',
      asr: 'عەسر (٤ ڕەکات)',
      maghrib: 'مەغریب (٣ ڕەکات)',
      isha: 'عیشا (٤ ڕەکات)',
      missingInputWarning: 'تکایە ڕۆژ، مانگ و ساڵی لەدایکبوونت لە خانەی سەرەوە بنووسە بۆ پیشاندانی وردەکارییەکان.',
      resetBtn: 'دوبارە ڕێکخستنەوە بۆ مێژووی ئەمڕۆ',
      obligatedPeriodStr: 'ساڵ نوێژ فەرزە لەسەرت'
    },
    ar: {
      title: 'حاسبة العمر وصلواتك التكليفية',
      subtitle: 'احسب سنين التكليف والصلوات والركعات الفائتة وفق الشريعة الإسلامية',
      quote: '«عندما تصلي، واهب نفسك كأنها صلاتك الأخيرة»',
      birthLabel: 'تاريخ الميلاد المكلّف',
      birthLabelSub: 'أدخل يوم وشهر وسنة ميلادك',
      currentLabel: 'التاريخ الحالي (التكليفي المطلوب)',
      currentLabelSub: 'يمكنك تعديل تاريخ اليوم لحساب الأوقات بتواريخ مخصصة',
      dayPlaceholder: 'اليوم (مثال: ١٥)',
      monthPlaceholder: 'الشهر (مثال: ٥)',
      yearPlaceholder: 'السنة (مثال: ١٩٩٥)',
      dayLabel: 'اليوم',
      monthLabel: 'الشهر',
      yearLabel: 'السنة',
      notObligatedYears: 'سنوات ما قبل التكليف',
      notObligatedYearsDesc: 'تم استبعاد ١٠ سنوات من بداية العمر لعدم وجود تكليف بالصلاة قسراً',
      resultsTitle: 'نتائج الحساب والفرض الشرعي',
      ageLabel: 'العمر الإجمالي الحالي',
      yearsObligated: 'سنوات فرض التكليف بالصلاة',
      daysObligated: 'إجمالي أيام الفرض والتكليف',
      totalPrayers: 'إجمالي الصلوات المفروضة',
      totalRakat: 'إجمالي الركعات المطلوبة',
      rakatUnit: 'ركعة (١٧ ركعة يومياً)',
      encouragementTitle: 'شرعيات وهداية لقضاء الفوائت',
      encouragementText: 'لم يفت الأوان بعد للرجوع إلى الله وقضاء ما فاتك من الصلوات. ينصح العلماء بقضاء صلاة واحدة فائتة مع كل صلاة حاضرة (مثلاً: ظهرين معاً) لتسديد دينك لله بيسر وسهولة.',
      fajr: 'الفجر (ركعتان)',
      dhuhr: 'الظهر (٤ ركعات)',
      asr: 'العصر (٤ ركعات)',
      maghrib: 'المغرب (٣ ركعات)',
      isha: 'العشاء (٤ ركعات)',
      missingInputWarning: 'يرجى إدخال اليوم والشهر والسنة في الحقول أعلاه لحساب صلواتك التكليفية بدقة.',
      resetBtn: 'إعادة ضبط التاريخ إلى اليوم الحالي',
      obligatedPeriodStr: 'سنوات التكليف الشرعية المفروضة'
    },
    en: {
      title: 'Islamic Age & Prayer Obligation Calculator',
      subtitle: 'Calculate your years of religious duty, fard prayers, and total Rakat',
      quote: '«When you pray, pray as if it were your last prayer»',
      birthLabel: 'Date of Birth',
      birthLabelSub: 'Enter your birth day, month, and year',
      currentLabel: 'As-of Date (Current / Reference Date)',
      currentLabelSub: 'You can modify today\'s date to see historic or custom calculations',
      dayPlaceholder: 'Day (e.g., 15)',
      monthPlaceholder: 'Month (e.g., 5)',
      yearPlaceholder: 'Year (e.g., 1995)',
      dayLabel: 'Day',
      monthLabel: 'Month',
      yearLabel: 'Year',
      notObligatedYears: 'Non-Obligated Childhood Years',
      notObligatedYearsDesc: 'First 10 years of childhood are considered free from religious prayer obligations (subtracted)',
      resultsTitle: 'Obligation Calculation Results',
      ageLabel: 'Your Total Age',
      yearsObligated: 'Years of Devout Obligation',
      daysObligated: 'Total Days of Obligation',
      totalPrayers: 'Total Obligatory Prayers',
      totalRakat: 'Obligated Rak\'ats',
      rakatUnit: 'Rak\'at (17 Rakat/day)',
      encouragementTitle: 'Spiritual Advice for Missed Prayers',
      encouragementText: 'It is never too late to turn back to Allah and make up missed prayers. Many scholars suggest praying one missed prayer alongside each current fard prayer (e.g., praying Dhuhr Qada with today\'s Dhuhr) to gradually pay off the debt comfortably.',
      fajr: 'Fajr (2 Rak\'ats)',
      dhuhr: 'Dhuhr (4 Rak\'ats)',
      asr: 'Asr (4 Rak\'ats)',
      maghrib: 'Maghrib (3 Rak\'ats)',
      isha: 'Isha (4 Rak\'ats)',
      missingInputWarning: 'Please enter your birth day, month, and year in the fields above to show calculations.',
      resetBtn: 'Reset Current Date to Today',
      obligatedPeriodStr: 'Years of Prayer Obligated Upon You'
    }
  };

  const t = translations[language];

  // Function to safely clean and parse date components
  const parsedDates = useMemo(() => {
    const bDay = parseInt(birthDayStr);
    const bMonth = parseInt(birthMonthStr);
    const bYear = parseInt(birthYearStr);

    const cDay = parseInt(currentDayStr) || today.getDate();
    const cMonth = parseInt(currentMonthStr) || (today.getMonth() + 1);
    const cYear = parseInt(currentYearStr) || today.getFullYear();

    const isBirthValid = !isNaN(bDay) && !isNaN(bMonth) && !isNaN(bYear) && bDay > 0 && bDay <= 31 && bMonth > 0 && bMonth <= 12 && bYear >= 1900 && bYear <= cYear;
    const isCurrentValid = !isNaN(cDay) && !isNaN(cMonth) && !isNaN(cYear) && cDay > 0 && cDay <= 31 && cMonth > 0 && cMonth <= 12 && cYear >= 1900;

    return {
      bDay, bMonth, bYear,
      cDay, cMonth, cYear,
      isBirthValid,
      isCurrentValid
    };
  }, [birthDayStr, birthMonthStr, birthYearStr, currentDayStr, currentMonthStr, currentYearStr]);

  // Performs calculations
  const stats = useMemo(() => {
    if (!parsedDates.isBirthValid || !parsedDates.isCurrentValid) {
      return null;
    }

    const { bDay, bMonth, bYear, cDay, cMonth, cYear } = parsedDates;

    // Build specific Date objects
    // Note: Month in JS Date is 0-indexed
    const birthDate = new Date(bYear, bMonth - 1, bDay);
    const referenceDate = new Date(cYear, cMonth - 1, cDay);

    const diffMs = referenceDate.getTime() - birthDate.getTime();
    if (diffMs < 0) {
      return {
        currentAge: '0.0',
        yearsObligated: 0,
        daysObligated: 0,
        totalPrayers: 0,
        totalRakat: 0,
        fajrCount: 0,
        dhuhrCount: 0,
        asrCount: 0,
        maghribCount: 0,
        ishaCount: 0
      };
    }

    // Total general age in years
    const totalAgeYears = diffMs / (1000 * 60 * 60 * 24 * 365.25);

    // Obligation starts after 10 years of age (freeYears = 10 as specified)
    const obligationDate = new Date(bYear + freeYears, bMonth - 1, bDay);

    let yearsObligated = 0;
    let daysObligated = 0;
    let totalPrayers = 0;
    let totalRakat = 0;

    if (referenceDate.getTime() > obligationDate.getTime()) {
      const obligationMs = referenceDate.getTime() - obligationDate.getTime();
      daysObligated = Math.floor(obligationMs / (1000 * 60 * 60 * 24));
      yearsObligated = parseFloat((daysObligated / 365.25).toFixed(1));
      totalPrayers = daysObligated * 5;
      totalRakat = daysObligated * 17;
    }

    return {
      currentAge: totalAgeYears.toFixed(1),
      yearsObligated,
      daysObligated,
      totalPrayers,
      totalRakat,
      fajrCount: daysObligated * 2,
      dhuhrCount: daysObligated * 4,
      asrCount: daysObligated * 4,
      maghribCount: daysObligated * 3,
      ishaCount: daysObligated * 4
    };
  }, [parsedDates, freeYears]);

  const resetCurrentDate = () => {
    setCurrentDayStr(today.getDate().toString());
    setCurrentMonthStr((today.getMonth() + 1).toString());
    setCurrentYearStr(today.getFullYear().toString());
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto py-6" id="prayer-calculator-container">
      {/* Header Banner */}
      <div className="text-center space-y-3" id="calc-header-banner">
        <div className="inline-flex items-center gap-2 px-5 py-2 bg-brand-emerald/10 text-brand-emerald rounded-full">
          <Quote size={14} />
          <span className="text-xs font-black uppercase tracking-widest">{t.quote}</span>
        </div>
        <h2 className="text-3xl font-black text-slate-800 dark:text-white">{t.title}</h2>
        <p className="text-sm font-bold text-slate-400 dark:text-slate-500 max-w-xl mx-auto">
          {t.subtitle}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        {/* Left Input Fields Pane */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-8 rounded-[3rem] shadow-sm space-y-6">
          
          {/* Section 1: Birth Date Entry (Day, Month, Year - EMPTY by DEFAULT) */}
          <div className="space-y-4">
            <div className="flex items-center gap-3 pb-2 border-b border-slate-50 dark:border-slate-800">
              <div className="w-10 h-10 bg-brand-emerald/10 rounded-xl flex items-center justify-center text-brand-emerald">
                <User size={18} />
              </div>
              <div>
                <h3 className="text-sm font-black text-slate-800 dark:text-slate-200 uppercase tracking-wider">
                  {t.birthLabel}
                </h3>
                <p className="text-[10px] text-slate-400 font-bold">{t.birthLabelSub}</p>
              </div>
            </div>

            {/* Birth Inputs Row */}
            <div className="grid grid-cols-3 gap-2">
              <div className="space-y-1">
                <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase block text-center">
                  {t.dayLabel}
                </label>
                <input
                  type="text"
                  maxLength={2}
                  value={birthDayStr}
                  onChange={(e) => setBirthDayStr(e.target.value.replace(/\D/g, ''))}
                  placeholder="15"
                  className="w-full px-2 py-3 bg-slate-50 dark:bg-slate-800 border-2 border-transparent text-slate-850 dark:text-white rounded-xl font-black text-center focus:border-brand-emerald/20 focus:ring-4 focus:ring-brand-emerald/5 outline-none transition-all placeholder:text-slate-300 dark:placeholder:text-slate-600"
                  id="birth-day-input"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase block text-center">
                  {t.monthLabel}
                </label>
                <input
                  type="text"
                  maxLength={2}
                  value={birthMonthStr}
                  onChange={(e) => setBirthMonthStr(e.target.value.replace(/\D/g, ''))}
                  placeholder="5"
                  className="w-full px-2 py-3 bg-slate-50 dark:bg-slate-800 border-2 border-transparent text-slate-850 dark:text-white rounded-xl font-black text-center focus:border-brand-emerald/20 focus:ring-4 focus:ring-brand-emerald/5 outline-none transition-all placeholder:text-slate-300 dark:placeholder:text-slate-600"
                  id="birth-month-input"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase block text-center">
                  {t.yearLabel}
                </label>
                <input
                  type="text"
                  maxLength={4}
                  value={birthYearStr}
                  onChange={(e) => setBirthYearStr(e.target.value.replace(/\D/g, ''))}
                  placeholder="1995"
                  className="w-full px-2 py-3 bg-slate-50 dark:bg-slate-800 border-2 border-transparent text-slate-850 dark:text-white rounded-xl font-black text-center focus:border-brand-emerald/20 focus:ring-4 focus:ring-brand-emerald/5 outline-none transition-all placeholder:text-slate-300 dark:placeholder:text-slate-600"
                  id="birth-year-input"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Current / Reference Date Entry (Day, Month, Year - Editable, defaulted to today) */}
          <div className="space-y-4 pt-4 border-t border-slate-50 dark:border-slate-800">
            <div className="flex items-center justify-between pb-2 border-b border-slate-50 dark:border-slate-800">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-amber-500/10 rounded-xl flex items-center justify-center text-amber-500">
                  <Calendar size={18} />
                </div>
                <div>
                  <h3 className="text-sm font-black text-slate-800 dark:text-slate-200 uppercase tracking-wider">
                    {t.currentLabel}
                  </h3>
                  <p className="text-[10px] text-slate-400 font-bold">{t.currentLabelSub}</p>
                </div>
              </div>
            </div>

            {/* Current/Reference Inputs Row */}
            <div className="grid grid-cols-3 gap-2">
              <div className="space-y-1">
                <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase block text-center">
                  {t.dayLabel}
                </label>
                <input
                  type="text"
                  maxLength={2}
                  value={currentDayStr}
                  onChange={(e) => setCurrentDayStr(e.target.value.replace(/\D/g, ''))}
                  placeholder="Day"
                  className="w-full px-2 py-3 bg-slate-50 dark:bg-slate-800 border-2 border-transparent text-slate-850 dark:text-white rounded-xl font-black text-center focus:border-brand-emerald/10 focus:ring-4 focus:ring-brand-emerald/5 outline-none transition-all"
                  id="current-day-input"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase block text-center">
                  {t.monthLabel}
                </label>
                <input
                  type="text"
                  maxLength={2}
                  value={currentMonthStr}
                  onChange={(e) => setCurrentMonthStr(e.target.value.replace(/\D/g, ''))}
                  placeholder="Month"
                  className="w-full px-2 py-3 bg-slate-50 dark:bg-slate-800 border-2 border-transparent text-slate-850 dark:text-white rounded-xl font-black text-center focus:border-brand-emerald/10 focus:ring-4 focus:ring-brand-emerald/5 outline-none transition-all"
                  id="current-month-input"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase block text-center">
                  {t.yearLabel}
                </label>
                <input
                  type="text"
                  maxLength={4}
                  value={currentYearStr}
                  onChange={(e) => setCurrentYearStr(e.target.value.replace(/\D/g, ''))}
                  placeholder="Year"
                  className="w-full px-2 py-3 bg-slate-50 dark:bg-slate-800 border-2 border-transparent text-slate-850 dark:text-white rounded-xl font-black text-center focus:border-brand-emerald/10 focus:ring-4 focus:ring-brand-emerald/5 outline-none transition-all"
                  id="current-year-input"
                />
              </div>
            </div>

            {/* Quick Reset Button */}
            <button
              onClick={resetCurrentDate}
              className="w-full py-2.5 px-4 bg-slate-50 dark:bg-slate-800 border hover:bg-slate-100 transition-colors text-[10px] font-black uppercase text-slate-600 dark:text-slate-300 rounded-xl flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <RefreshCw size={11} />
              {t.resetBtn}
            </button>
          </div>

          {/* Section 3: Hardcoded 10-years Free Obligation Info Card */}
          <div className="pt-4 border-t border-slate-50 dark:border-slate-800 space-y-2">
            <span className="text-xs font-black text-slate-700 dark:text-slate-300 uppercase tracking-wide flex justify-between">
              <span>{t.notObligatedYears}</span>
              <span className="text-brand-emerald font-black bg-brand-emerald/10 px-2 py-0.5 rounded-md text-[10px]">
                {freeYears} {language === 'ku' ? 'ساڵ' : 'years'}
              </span>
            </span>
            <p className="text-[11px] font-bold text-slate-400 dark:text-slate-500 leading-normal">
              {t.notObligatedYearsDesc}
            </p>
          </div>
        </div>

        {/* Right Output Results Pane */}
        <div className="lg:col-span-3 space-y-6">
          {stats ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-6"
              id="calculated-results-panel"
            >
              {/* Main Calculation Grid */}
              <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-8 rounded-[3rem] shadow-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-brand-emerald/5 rounded-full -mr-16 -mt-16 pointer-events-none" />
                
                <h3 className="text-sm font-black text-slate-800 dark:text-slate-200 uppercase tracking-widest mb-6">
                  {t.resultsTitle}
                </h3>

                <div className="grid grid-cols-2 gap-4">
                  {/* General Age Info Block */}
                  <div className="bg-slate-50 dark:bg-slate-850 p-6 rounded-3xl text-center space-y-1">
                    <span className="text-[10px] font-black tracking-widest dark:text-white/40 uppercase block text-slate-400">{t.ageLabel}</span>
                    <span className="text-3xl font-black text-slate-800 dark:text-white tabular-nums">{stats.currentAge}</span>
                    <span className="text-[10px] font-bold text-slate-400 block">{language === 'ku' ? 'ساڵ تەمەن' : 'years old'}</span>
                  </div>

                  {/* Excluded Years Information */}
                  <div className="bg-slate-50 dark:bg-slate-850 p-6 rounded-3xl text-center space-y-1">
                    <span className="text-[10px] font-black tracking-widest dark:text-white/40 uppercase block text-slate-400">{t.notObligatedYears}</span>
                    <span className="text-3xl font-black text-slate-800 dark:text-white tabular-nums">{freeYears}</span>
                    <span className="text-[10px] font-bold text-slate-400 block">{language === 'ku' ? 'ساڵ کەم کرایەوە' : 'years subtracted'}</span>
                  </div>

                  {/* Large Green Obligation Banner Block */}
                  <div className="bg-brand-emerald p-6 rounded-3xl text-center space-y-1 col-span-2 text-white shadow-lg shadow-brand-emerald/20">
                    <span className="text-[10px] font-black tracking-widest uppercase block text-white/70">{t.yearsObligated}</span>
                    <span className="text-4xl font-black tabular-nums">{stats.yearsObligated} {language === 'ku' ? 'ساڵ نوێژ' : 'Years'}</span>
                    <span className="text-[11px] font-bold block bg-white/10 px-3 py-1 rounded-full w-fit mx-auto mt-2">
                      {t.obligatedPeriodStr}
                    </span>
                  </div>

                  {/* Net Days under Takleef duty */}
                  <div className="bg-slate-50 dark:bg-slate-850 p-6 rounded-3xl text-center space-y-1">
                    <span className="text-[10px] font-black tracking-widest dark:text-white/40 uppercase block text-slate-400">{t.daysObligated}</span>
                    <span className="text-2xl font-black text-slate-800 dark:text-white tabular-nums">
                      {stats.daysObligated.toLocaleString()}
                    </span>
                    <span className="text-[10px] font-bold text-slate-400 block">{language === 'ku' ? 'کۆی ڕۆژەکان' : 'days obligated'}</span>
                  </div>

                  {/* Net Number of Obligatory prayers */}
                  <div className="bg-slate-50 dark:bg-slate-850 p-6 rounded-3xl text-center space-y-1">
                    <span className="text-[10px] font-black tracking-widest dark:text-white/40 uppercase block text-slate-400">{t.totalPrayers}</span>
                    <span className="text-2xl font-black text-slate-800 dark:text-white tabular-nums">
                      {stats.totalPrayers.toLocaleString()}
                    </span>
                    <span className="text-[10px] font-bold text-slate-400 block">{language === 'ku' ? 'فرض نوێژان' : 'fard prayers'}</span>
                  </div>

                  {/* Net Rakat in gold banner */}
                  <div className="bg-brand-gold/15 dark:bg-brand-gold/20 p-6 rounded-3xl text-center space-y-1 col-span-2 border border-brand-gold/25">
                    <span className="text-[10px] font-black text-brand-gold dark:text-brand-gold/90 tracking-widest uppercase block">{t.totalRakat}</span>
                    <span className="text-3xl font-black text-slate-800 dark:text-white tabular-nums">
                      {stats.totalRakat.toLocaleString()} <span className="text-base font-bold whitespace-nowrap">{t.rakatUnit}</span>
                    </span>
                  </div>
                </div>
              </div>

              {/* Detailed Breakdown pane & Islamic Guidance block */}
              <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-8 rounded-[3rem] shadow-sm space-y-4">
                <div className="flex items-center gap-3 text-brand-emerald">
                  <Award size={20} className="text-brand-emerald" />
                  <h4 className="text-sm font-black text-slate-800 dark:text-slate-100 uppercase tracking-widest">
                    {t.encouragementTitle}
                  </h4>
                </div>
                <p className="text-xs leading-relaxed font-bold text-slate-500 dark:text-slate-400">
                  {t.encouragementText}
                </p>

                {/* Grid for each fard prayer calculation breakdown */}
                <div className="grid grid-cols-5 gap-2 pt-3 text-center border-t border-slate-50 dark:border-slate-850">
                  <div className="p-2 bg-slate-50 dark:bg-slate-850 rounded-xl">
                    <p className="text-[9px] text-slate-400 font-bold">{t.fajr}</p>
                    <p className="text-sm font-black text-slate-700 dark:text-white tabular-nums">{stats.fajrCount.toLocaleString()}</p>
                  </div>
                  <div className="p-2 bg-slate-50 dark:bg-slate-850 rounded-xl">
                    <p className="text-[9px] text-slate-400 font-bold">{t.dhuhr}</p>
                    <p className="text-sm font-black text-slate-700 dark:text-white tabular-nums">{stats.dhuhrCount.toLocaleString()}</p>
                  </div>
                  <div className="p-2 bg-slate-50 dark:bg-slate-850 rounded-xl">
                    <p className="text-[9px] text-slate-400 font-bold">{t.asr}</p>
                    <p className="text-sm font-black text-slate-700 dark:text-white tabular-nums">{stats.asrCount.toLocaleString()}</p>
                  </div>
                  <div className="p-2 bg-slate-50 dark:bg-slate-850 rounded-xl">
                    <p className="text-[9px] text-slate-400 font-bold">{t.maghrib}</p>
                    <p className="text-sm font-black text-slate-700 dark:text-white tabular-nums">{stats.maghribCount.toLocaleString()}</p>
                  </div>
                  <div className="p-2 bg-slate-50 dark:bg-slate-850 rounded-xl">
                    <p className="text-[9px] text-slate-400 font-bold">{t.isha}</p>
                    <p className="text-sm font-black text-slate-700 dark:text-white tabular-nums">{stats.ishaCount.toLocaleString()}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ) : (
            /* Warning or guiding empty state prompt */
            <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-12 rounded-[3rem] shadow-sm text-center flex flex-col items-center justify-center space-y-4 min-h-[300px]" id="empty-state-card">
              <div className="w-16 h-16 bg-amber-500/10 rounded-full flex items-center justify-center text-amber-500">
                <Clock size={32} />
              </div>
              <p className="text-sm font-black text-slate-600 dark:text-slate-300 max-w-sm leading-relaxed">
                {t.missingInputWarning}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
