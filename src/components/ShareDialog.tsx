import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Copy, Check, Download, Share2, Facebook } from 'lucide-react';

const shareTranslations = {
  ku: {
    shareTitle: 'بڵاوکردنەوەی زیکر و ئایەت',
    previewLabel: 'پێشبینی لاپەڕەی سپی شێرکردن',
    copyLink: 'کۆپیکردنی بەستەر (لینکی لاپەڕە)',
    linkCopied: 'لینکەکە بە سەرکەوتوویی کۆپی کرا!',
    shareFacebook: 'بڵاوکردنەوە لە فەیسبووک',
    shareTikTok: 'بڵاوکردنەوە لە تیک تۆک (وک وێنە)',
    downloadAsImage: 'دابەزاندنی وێنەی کارت (ستۆری/پۆست)',
    downloading: 'جاری داگرتن کار دەکات...',
    appTitle: 'ئەپی زیکرەکان',
    systemShare: 'شێرکردن لەگەڵ ئەپەکانی تر',
    tikTokTip: 'بۆ تیک تۆک: وێنە دابەزێنە یان لینکەکە کۆپی بکە و پۆستی بکە',
    originalApp: 'بڕۆ ناو ئەپی سەرەکی',
    footerText: 'ئەپی زیکرەکان - سەرچاوەی یادی خودا',
  },
  ar: {
    shareTitle: 'مشاركة الذكر والآية',
    previewLabel: 'معاينة صفحة المشاركة البيضاء',
    copyLink: 'نسخ رابط الصفحة',
    linkCopied: 'تم نسخ الرابط بنجاح!',
    shareFacebook: 'مشاركة في فيسبوك',
    shareTikTok: 'مشاركة في تيك توك (كصورة)',
    downloadAsImage: 'تحميل كصورة (ستوري/بوست)',
    downloading: 'جاري تحميل الصورة...',
    appTitle: 'تطبيق الأذكار',
    systemShare: 'المشاركة عبر التطبيقات',
    tikTokTip: 'لتيك توك: قم بتحميل الصورة أو نسخ الرابط ومشاركته',
    originalApp: 'الذهاب إلى التطبيق الرئيسي',
    footerText: 'تطبيق الأذكار - رفيقك الروحي',
  },
  en: {
    shareTitle: 'Share Zikr & Ayah',
    previewLabel: 'Share Link Page Preview',
    copyLink: 'Copy Page Link',
    linkCopied: 'Link copied to clipboard!',
    shareFacebook: 'Share on Facebook',
    shareTikTok: 'Share on TikTok (as Image)',
    downloadAsImage: 'Download Image (Story/Post)',
    downloading: 'Downloading image...',
    appTitle: 'Zikr App',
    systemShare: 'Share with Other Apps',
    tikTokTip: 'For TikTok: Download the styled image or copy the link to share',
    originalApp: 'Go to Main App',
    footerText: 'Zikr App - Islamic Remembrance',
  }
};

interface ShareDialogProps {
  isOpen: boolean;
  onClose: () => void;
  text: string;
  translation: string;
  type: 'zikr' | 'ayah';
  language: 'ku' | 'ar' | 'en';
}

export function ShareDialog({ isOpen, onClose, text, translation, type, language }: ShareDialogProps) {
  const [copied, setCopied] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const t = shareTranslations[language] || shareTranslations.ku;
  const cardRef = useRef<HTMLDivElement>(null);

  // Generate the share link pointing to our custom standalone white sharing view
  const getShareLink = () => {
    const origin = window.location.origin;
    return `${origin}/?share=true&text=${encodeURIComponent(text)}&translate=${encodeURIComponent(translation)}&type=${type}&lang=${language}`;
  };

  const handleCopyLink = async () => {
    try {
      const shareLink = getShareLink();
      await navigator.clipboard.writeText(shareLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch (err) {
      console.error('Failed to copy link:', err);
    }
  };

  const handleFacebookShare = () => {
    const shareLink = getShareLink();
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareLink)}`;
    window.open(url, '_blank', 'width=600,height=400,resizable=yes');
  };

  const handleSystemShare = async () => {
    const shareLink = getShareLink();
    const shareTitle = type === 'ayah' ? 'ئایەتێکی پیرۆز لە ئەپی زیکرەکان' : 'زیکرێکی پیرۆز لە ئەپی زیکرەکان';
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: shareTitle,
          text: `${text}\n\n${translation}\n\n${t.appTitle}`,
          url: shareLink
        });
      } catch (err) {
        console.warn('System share cancelled or failed:', err);
      }
    } else {
      handleCopyLink();
    }
  };

  // Ultra-polished HTML5 Dynamic Canvas Card Image Generator
  const handleDownloadImage = () => {
    setIsDownloading(true);

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      setIsDownloading(false);
      return;
    }

    // Set high resolution Instagram/Story layout (1080 x 1350 - perfect portrait)
    const width = 1080;
    const height = 1350;
    canvas.width = width;
    canvas.height = height;

    // 1. Draw pure minimalist white background
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, width, height);

    // 2. Draw outer elegant gold/emerald double border
    ctx.strokeStyle = '#065f46'; // Emerald
    ctx.lineWidth = 8;
    ctx.strokeRect(20, 20, width - 40, height - 40);

    ctx.strokeStyle = '#fbbf24'; // Gold inner frame
    ctx.lineWidth = 3;
    ctx.strokeRect(36, 36, width - 72, height - 72);

    // Helper to draw text with word wrapping and return total height lines took
    const wrapText = (
      context: CanvasRenderingContext2D,
      textStr: string,
      x: number,
      y: number,
      maxWidth: number,
      lineHeight: number,
      align: 'center' | 'right' | 'left'
    ) => {
      context.textAlign = align;
      const words = textStr.split(' ');
      let line = '';
      const lines = [];

      for (let n = 0; n < words.length; n++) {
        const testLine = line + words[n] + ' ';
        const metrics = context.measureText(testLine);
        const testWidth = metrics.width;
        if (testWidth > maxWidth && n > 0) {
          lines.push(line);
          line = words[n] + ' ';
        } else {
          line = testLine;
        }
      }
      lines.push(line);

      let currentY = y;
      for (let i = 0; i < lines.length; i++) {
        context.fillText(lines[i].trim(), x, currentY);
        currentY += lineHeight;
      }
      return lines.length * lineHeight;
    };

    // Draw header emblem
    ctx.fillStyle = '#065f46';
    ctx.font = 'bold 36px Amiri, "Noto Naskh Arabic", Georgia, serif';
    ctx.textAlign = 'center';
    ctx.fillText('﷽', width / 2, 120);

    // Draw title decoration stars/ornaments
    ctx.fillStyle = '#fbbf24';
    ctx.font = '32px sans-serif';
    ctx.fillText('✦  ✦  ✦', width / 2, 180);

    // Draw Arabic Text (The Main Scripture)
    ctx.fillStyle = '#0f172a'; // Slate 900
    ctx.font = 'bold 48px Amiri, "Noto Naskh Arabic", Georgia, serif';
    const arabicLineHeight = 84;
    const arabicY = 280;
    const maxTextWidth = width - 200;

    // We measure lines to compute exact position or let wrap handle it
    const arabicHeight = wrapText(ctx, text, width / 2, arabicY, maxTextWidth, arabicLineHeight, 'center');

    // Draw an elegant floral styled separator line below script
    const sepY = arabicY + arabicHeight + 40;
    ctx.strokeStyle = '#e2e8f0'; // Slate 200
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(300, sepY);
    ctx.lineTo(width - 300, sepY);
    ctx.stroke();

    // Small gold diamond in center of separator
    ctx.fillStyle = '#fbbf24';
    ctx.beginPath();
    ctx.moveTo(width / 2, sepY - 12);
    ctx.lineTo(width / 2 + 12, sepY);
    ctx.lineTo(width / 2, sepY + 12);
    ctx.lineTo(width / 2 - 12, sepY);
    ctx.fill();

    // Draw Translation / Tafsir Text
    ctx.fillStyle = '#475569'; // Slate 600
    ctx.font = '500 36px "Vazirmatn", sans-serif';
    const transLineHeight = 58;
    const transY = sepY + 80;
    wrapText(ctx, translation, width / 2, transY, maxTextWidth, transLineHeight, 'center');

    // 8. Draw elegant App branding and info at the bottom
    // Footer Background Card
    ctx.fillStyle = '#f8fafc'; // Gray 50
    ctx.fillRect(100, height - 190, width - 200, 110);
    ctx.lineWidth = 1;
    ctx.strokeStyle = '#e2e8f0';
    ctx.strokeRect(100, height - 190, width - 200, 110);

    // Footer Logo Text
    ctx.fillStyle = '#065f46';
    ctx.font = 'bold 36px "Vazirmatn", sans-serif';
    ctx.fillText('ئەپی زیکرەکان', width / 2, height - 142);

    ctx.fillStyle = '#64748b'; // Slate 500
    ctx.font = '24px "Vazirmatn", sans-serif';
    ctx.fillText('Zikr Islamic App  •  سەرچاوەی بەڕێز بۆ پەرستش و ئارامی', width / 2, height - 105);

    // Save and download
    setTimeout(() => {
      try {
        const url = canvas.toDataURL('image/png');
        const a = document.createElement('a');
        a.href = url;
        a.download = `Zikr_${Date.now()}.png`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      } catch (err) {
        console.error('Failed to export canvas:', err);
      } finally {
        setIsDownloading(false);
      }
    }, 600);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-slate-900/60 backdrop-blur-md"
        />

        {/* Dialog Panel */}
        <motion.div
          initial={{ scale: 0.92, opacity: 0, y: 15 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.92, opacity: 0, y: 15 }}
          className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-2xl border border-slate-100 dark:border-slate-800 overflow-hidden z-10 flex flex-col max-h-[90vh]"
        >
          {/* Header */}
          <div className="px-8 py-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-900/50">
            <h3 className="text-xl font-black text-slate-800 dark:text-slate-100 flex items-center gap-3">
              <Share2 size={22} className="text-brand-emerald dark:text-brand-gold animate-bounce" />
              {t.shareTitle}
            </h3>
            <button
              onClick={onClose}
              className="p-2.5 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-400 dark:text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* Body Content with Scroll if needed */}
          <div className="p-8 overflow-y-auto flex-1 space-y-8">
            
            {/* Elegant Live Leaflet Preview Panel */}
            <div className="space-y-3">
              <p className="text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest px-1">
                {t.previewLabel}
              </p>
              
              <div 
                ref={cardRef} 
                className="bg-slate-50 dark:bg-slate-950 p-6 rounded-3xl border-2 border-dashed border-slate-200 dark:border-slate-800 flex flex-col items-center justify-center transition-all"
              >
                {/* The actual previewed white card */}
                <div className="bg-white w-full max-w-md p-8 md:p-10 rounded-2xl border border-slate-100 shadow-md text-center space-y-6 select-none relative overflow-hidden">
                  <div className="absolute top-0 inset-x-0 h-1 bg-brand-emerald" />
                  
                  {/* Arabic header emblem */}
                  <span className="text-2xl text-brand-emerald font-bold quran-font block">﷽</span>
                  
                  {/* Arabic Text */}
                  <p className="text-xl md:text-2xl font-bold text-slate-900 leading-relaxed quran-font" dir="rtl">
                    {text}
                  </p>

                  <div className="w-16 h-0.5 bg-slate-100 mx-auto rounded-full" />

                  {/* Translation */}
                  <p className="text-sm md:text-base text-slate-600 font-medium leading-relaxed font-kurdish-display">
                    {translation}
                  </p>

                  {/* App Footnote */}
                  <div className="pt-4 border-t border-slate-50 flex items-center justify-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-brand-emerald animate-ping" />
                    <span className="text-xs font-black text-brand-emerald tracking-wide uppercase">
                      {t.appTitle}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Share Buttons Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* Copy Link Page */}
              <button
                onClick={handleCopyLink}
                className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800/50 hover:bg-emerald-50/50 dark:hover:bg-slate-800 border border-slate-100 dark:border-slate-800/80 rounded-2xl transition-all group active:scale-95 text-right w-full"
              >
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 text-slate-500 group-hover:text-brand-emerald dark:group-hover:text-brand-emerald rounded-xl shadow-sm transition-all">
                    {copied ? <Check size={18} className="text-brand-emerald" /> : <Copy size={18} />}
                  </div>
                  <div>
                    <p className="text-sm font-black text-slate-800 dark:text-slate-100">
                      {t.copyLink}
                    </p>
                    <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">
                      {copied ? t.linkCopied : 'کۆپی بەستەری لاپەڕەکە'}
                    </p>
                  </div>
                </div>
              </button>

              {/* Share to Facebook */}
              <button
                onClick={handleFacebookShare}
                className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800/50 hover:bg-sky-50 dark:hover:bg-slate-800 border border-slate-100 dark:border-slate-800/80 rounded-2xl transition-all group active:scale-95 text-right w-full"
              >
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 text-sky-600 rounded-xl shadow-sm transition-all">
                    <Facebook size={18} />
                  </div>
                  <div>
                    <p className="text-sm font-black text-slate-800 dark:text-slate-100">
                      {t.shareFacebook}
                    </p>
                    <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">
                      بۆ ناو فەیسبووکی تۆ
                    </p>
                  </div>
                </div>
              </button>

              {/* Download Card Image - Direct Canvas PNG generation */}
              <button
                onClick={handleDownloadImage}
                disabled={isDownloading}
                className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800/50 hover:bg-teal-50 dark:hover:bg-slate-800 border border-slate-100 dark:border-slate-800/80 rounded-2xl transition-all group active:scale-95 text-right w-full"
              >
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 text-teal-600 rounded-xl shadow-sm transition-all">
                    <Download size={18} className={isDownloading ? 'animate-bounce text-brand-emerald' : ''} />
                  </div>
                  <div>
                    <p className="text-sm font-black text-slate-800 dark:text-slate-100">
                      {isDownloading ? t.downloading : t.downloadAsImage}
                    </p>
                    <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">
                      گونجاوە بۆ تیک تۆک و ستۆری فەیسبووک
                    </p>
                  </div>
                </div>
              </button>

              {/* General System Share */}
              <button
                onClick={handleSystemShare}
                className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800/50 hover:bg-indigo-50 dark:hover:bg-slate-800 border border-slate-100 dark:border-slate-800/80 rounded-2xl transition-all group active:scale-95 text-right w-full"
              >
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 text-indigo-600 rounded-xl shadow-sm transition-all">
                    <Share2 size={18} />
                  </div>
                  <div>
                    <p className="text-sm font-black text-slate-800 dark:text-slate-100">
                      {t.systemShare}
                    </p>
                    <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">
                      شێرکردن بە هاوسەر یان هاوڕێیان
                    </p>
                  </div>
                </div>
              </button>

            </div>

            {/* TikTok sharing instructions card tip */}
            <div className="p-5 bg-amber-50/50 dark:bg-amber-950/25 border border-amber-100 dark:border-amber-900/30 rounded-3xl flex items-start gap-4">
              <span className="text-2xl mt-0.5">💡</span>
              <div className="space-y-1">
                <h4 className="text-sm font-black text-amber-800 dark:text-amber-300">تێبینی گرنگ بۆ بڵاوکردنەوە لە تیک تۆک</h4>
                <p className="text-xs leading-relaxed text-amber-700/80 dark:text-amber-400/80">
                  {t.tikTokTip}. وێنەکە بۆ گەلەرییەکەت پاشەکەوت دەبێت، پاشان دەتوانیت لە ئەپی تیک تۆک وەک وێنە یان فۆتۆ سلایدس پۆستی بکەیت لەگەڵ خوێندنەوەیەکی دەنگی قورئان.
                </p>
              </div>
            </div>

          </div>

          {/* Footer App Credit */}
          <div className="px-8 py-4 bg-slate-50 dark:bg-slate-900/80 border-t border-slate-100 dark:border-slate-800 text-center">
            <p className="text-xs font-black text-slate-400 dark:text-slate-500">
              {t.footerText}
            </p>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
