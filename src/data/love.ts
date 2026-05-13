
export interface WisdomItem {
  id: string;
  type: 'ayah' | 'hadith' | 'quote' | 'story';
  textAr: string;
  textKu: string;
  textEn: string;
  reference?: string;
  category: 'love';
  noteKu?: string;
  noteEn?: string;
}

export const loveWisdom: WisdomItem[] = [
  {
    id: 'l1',
    type: 'ayah',
    category: 'love',
    textAr: 'وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً',
    textKu: 'لە نیشانەکانی ئەو ئەوەیە کە لە خۆتان هاوسەری بۆ دروست کردوون تا دڵتان پێیان بگوێزێتەوە و لە نێوانتاندا خۆشەویستی و بەزەیی داناوە.',
    textEn: 'And of His signs is that He created for you from yourselves mates that you may find tranquility in them; and He placed between you affection and mercy.',
    reference: 'Surah Ar-Rum: 21'
  },
  {
    id: 'love_1',
    type: 'ayah',
    category: 'love',
    textAr: 'وَأَوْفُوا بِالْعَهْدِ ۖ إِنَّ الْعَهْدَ كَانَ مَسْئُولًا',
    textKu: 'وەفادار بن بەو پەیمانانەی دەیدەن، چونکە لە ڕۆژی دواییدا لێتان دەپرسرێتەوە.',
    textEn: 'And fulfill every commitment, for every commitment will be questioned.',
    reference: 'Surah Al-Isra : 34',
    noteKu: 'هۆشداری: شکاندنی بەڵێنی هاوسەرگیری لێپرسینەوەی خوایی لەسەرە.',
    noteEn: 'Warning: Breaking a marriage promise carries divine accountability.'
  },
  {
    id: 'love_2',
    type: 'hadith',
    category: 'love',
    textAr: 'آية المنافق ثلاث... وإذا وعد أخلف',
    textKu: 'نیشانەی مونافیق سێ دانەیە... یەکێکیان ئەوەیە کاتێک بەڵێن دەدات، دەیشکێنێت.',
    textEn: 'The signs of a hypocrite are three... one of them is when he promises, he breaks it.',
    reference: 'Bukhari & Muslim',
    noteKu: 'بۆ گەنجان: یاری کردن بە هەستی بەرامبەر نیشانەی دووڕووییە.',
    noteEn: 'For youth: Playing with emotions is a sign of hypocrisy.'
  },
  {
    id: 'love_3',
    type: 'ayah',
    category: 'love',
    textAr: 'قُل لِّلْمُؤْمِنِينَ يَغُضُّوا مِنْ أَبْصَارِهِمْ',
    textKu: 'بە بڕواداران بڵێ چاویان بپارێزن (لە تەماشاکردنی حەرام).',
    textEn: 'Tell the believers to lower their gaze (from forbidden things).',
    reference: 'Surah An-Nur: 30',
    noteKu: 'سزا: نیگای حەرام بەرەکەتی خۆشەویستی حەڵاڵ لەناو دەبات.',
    noteEn: 'Consequence: Forbidden gazes destroy the blessing of lawful love.'
  },
  {
    id: 'love_4',
    type: 'hadith',
    category: 'love',
    textAr: 'ليس منا من خبب امرأة على زوجها',
    textKu: 'لە ئێمە نییە کەسێک ئافرەتێک لە کەسوکاری یان هاوسەری تێک بدات.',
    textEn: 'He is not one of us who turns a woman against her family or husband.',
    reference: 'Abu Dawud',
    noteKu: 'هۆشداری: تێدانی دڵسۆزی کەسێک بۆ ماڵەوەیان تاوانە.',
    noteEn: 'Warning: Turning someone against their family in the name of love is a sin.'
  },
  {
    id: 'love_5',
    type: 'quote',
    category: 'love',
    textAr: 'قال عمر: استعينوا على الحوائج بالكتمان',
    textKu: 'عومەری کوڕی خەتاب: بۆ جێبەجێکردنی کارەکانتان نهێنیپارێز بن.',
    textEn: 'Umar said: Seek help in fulfilling your needs through secrecy.',
    reference: 'Umar ibn al-Khattab',
    noteKu: 'ڕێنمایی: بڵاوکردنەوەی وێنە و نهێنییەکان خیانەتە لە ئەمانەت.',
    noteEn: 'Guide: Sharing private photos and secrets is a breach of trust.'
  },
  {
    id: 'love_6',
    type: 'quote',
    category: 'love',
    textAr: 'من تعجل شيئاً قبل أوانه عوقب بحرمانه',
    textKu: 'هەرکەسێک پەلە بکات لە شتێک پێش کاتی خۆی، بە بێبەشبوون لێی سزا دەدرێت.',
    textEn: 'Whoever rushes into something before its proper time is punished by being deprived of it.',
    reference: 'Islamic Wisdom',
    noteKu: 'ڕێنمایی: بڵاوکردنەوەی وێنە و نهێنییەکان خیانەتە لە ئەمانەت.', // Fixed note based on request
    noteEn: 'Truth: Forbidden love rarely continues blissfully in a lawful way.'
  },
  {
    id: 'love_7',
    type: 'hadith',
    category: 'love',
    textAr: 'التائب من الذنب كمن لا ذنب له',
    textKu: 'ئەو کەسەی لە تاوانێک تۆبە دەکات، وەک ئەوە وایە تاوانی نەکردبێت.',
    textEn: 'The one who repents from a sin is like one who has no sin.',
    reference: 'Ibn Majah',
    noteKu: 'ئومێد: ئەگەر لە پەیوەندییەکی هەڵەدا بوویت، دەرگای گەڕانەوە کراوەیە.',
    noteEn: 'Hope: If you were in a wrong relationship, the door of repentance is open.'
  },
  {
    id: 'love_8',
    type: 'ayah',
    category: 'love',
    textAr: 'الْخَبِيثَاتُ لِلْخَبِيثِينَ وَالطَّيِّبَاتُ لِلطَّيِّبِينَ',
    textKu: 'مرۆڤە ناپاکەکان بۆ یەکترن و پاکەکانیش بۆ یەکتر شیاون.',
    textEn: 'Vile women are for vile men, and pure women are for pure men.',
    reference: 'Surah An-Nur: 26',
    noteKu: 'ڕاستی: بۆ ئەوەی هاوسەری پاکت دەست بکەوێت، خۆت بپارێزە.',
    noteEn: 'Fact: To find a pure partner, you must first remain pure yourself.'
  },
  {
    id: 'love_9',
    type: 'quote',
    category: 'love',
    textAr: 'ما أكرم النساء إلا كريم ولا أهانهن إلا لئيم',
    textKu: 'تەنها کەسانی بەڕێز ڕێز لە ئافرەت دەگرن، و تەنها کەسانی سوک سوکایەتییان پێ دەکەن.',
    textEn: 'None honors women except a noble person, and none insults them except a mean person.',
    reference: 'Hadith',
    noteKu: 'بۆ پیاوان: ڕێزگرتن لە کچ نیشانەی پیاوەتیتە.',
    noteEn: 'For men: Honoring a woman is a sign of your nobility.'
  },
  {
    id: 'love_10',
    type: 'ayah',
    category: 'love',
    textAr: 'إن الله لا يحب الخائنين',
    textKu: 'بەڕاستی خودا خیانەتکارانی خۆش ناوێت.',
    textEn: 'Indeed, Allah does not love the treacherous.',
    reference: 'Surah Al-Anfal: 58',
    noteKu: 'هۆشداری: یاری کردن بە دڵی بەرامبەر گەورەترین خیانەتە.',
    noteEn: 'Warning: Toying with someone\'s heart is a major betrayal.'
  },
  {
    id: 'love_11',
    type: 'hadith',
    category: 'love',
    textAr: 'لم يُرَ للمتحابين مثل النكاح',
    textKu: 'بۆ دوو کەس کە یەکتیریان خۆش بوێت، هیچ شتێک وەک هاوسەرگیری نییە.',
    textEn: 'There is nothing like marriage for two people who love each other.',
    reference: 'Ibn Majah',
    noteKu: 'ڕێنمایی: ئەگەر خۆشەویستییەکەت بۆ هاوسەرگیری نییە، کات مەکوژە.',
    noteEn: 'Guide: If your love doesn\'t lead to marriage, don\'t waste time.'
  },
  {
    id: 'love_12',
    type: 'ayah',
    category: 'love',
    textAr: 'وَالَّذِينَ يُؤْذُونَ الْمُؤْمِنِينَ وَالْمُؤْمِنَاتِ بِغَيْرِ مَا اكْتَسَبُوا',
    textKu: 'ئەوانەی ئازاری بڕواداران دەدەن بەوەی کە نەیانکردووە، تووشی بوختان بوون.',
    textEn: 'And those who harm believing men and women for what they have not done have committed slander.',
    reference: 'Surah Al-Ahzab: 58',
    noteKu: 'ئاگاداری: دوای جیابوونەوە، ناشرینکردنی ناوی بەرامبەر سزای قورسی هەیە.',
    noteEn: 'Caution: Defaming an ex-partner after a breakup has severe consequences.'
  },
  {
    id: 'love_13',
    type: 'hadith',
    category: 'love',
    textAr: 'إنما الأعمال بالنيات',
    textKu: 'کردەوەکان بەپێی نیەتەکانن.',
    textEn: 'Actions are but by intentions.',
    reference: 'Bukhari & Muslim',
    noteKu: 'تێبینی: هەر پەیوەندییەک بۆ کاتبەسەربردن بێت، کۆتاییەکەی پەشیمانییە.',
    noteEn: 'Note: Any relationship built just for fun will end in regret.'
  },
  {
    id: 'love_14',
    type: 'quote',
    category: 'love',
    textAr: 'البيوت تبنى على المودة والرحمة',
    textKu: 'ماڵەکان لەسەر بنەمای بەزەیی و سۆز بونیاد دەنرێن.',
    textEn: 'Homes are built on affection and mercy.',
    reference: 'Islamic Wisdom',
    noteKu: 'ڕاستی: خۆشەویستی تەنها قسە نییە، بەڵکو پاراستنی مافی یەکترییە.',
    noteEn: 'Fact: Love is not just words; it\'s protecting each other\'s rights.'
  },
  {
    id: 'love_15',
    type: 'hadith',
    category: 'love',
    textAr: 'من أفسد امرأة على زوجها فليس منا',
    textKu: 'هەر کەسێک ژنێک لە مێردەکەی تێک بدات، لە ئێمە نییە.',
    textEn: 'Whoever corrupts a woman against her husband is not one of us.',
    reference: 'Abu Dawud',
    noteKu: 'هۆشداری: تێوەگلان لە پەیوەندی لەگەڵ کەسێکی خاوەن هاوسەر قیامەتت دەسوتێنێت.',
    noteEn: 'Warning: Engaging with a married person destroys your hereafter.'
  },
  {
    id: 'love_16',
    type: 'hadith',
    category: 'love',
    textAr: 'إن الوفاء من الإيمان',
    textKu: 'بەڕاستی وەفاداری بەشێکە لە ئیمان.',
    textEn: 'Indeed, loyalty is part of faith.',
    reference: 'Hadith',
    noteKu: 'بۆ کچان: وەفاداری بۆ ڕەوشتی خۆت گەورەترین جوانیتە.',
    noteEn: 'For girls: Loyalty to your own character is your greatest beauty.'
  },
  {
    id: 'love_17',
    type: 'quote',
    category: 'love',
    textAr: 'حب الله فوق كل حب',
    textKu: 'خۆشەویستی خودا لە سەرووی هەموو خۆشەویستییەکی ترەوەیە.',
    textEn: 'The love of Allah is above every other love.',
    reference: 'Spirituality',
    noteKu: 'ڕێنمایی: مەهێڵە خۆشەویستی مرۆڤێک وات لێ بکات خودا لەبیر بکەیت.',
    noteEn: 'Guide: Never let the love for a human make you forget Allah.'
  },
  {
    id: 'love_18',
    type: 'ayah',
    category: 'love',
    textAr: 'ولا تقربوا الزنا',
    textKu: 'نزیکی زینا و کاری حەرام مەکەونەوە.',
    textEn: 'And do not go near adultery/fornication.',
    reference: 'Surah Al-Isra: 32',
    noteKu: 'سزا: هەموو پەیوەندییەکی نهێنی کە دەرگای بۆ حەرام بکاتەوە، سزای هەیە.',
    noteEn: 'Penalty: Any secret relationship leading to the forbidden is punishable.'
  },
  {
    id: 'love_19',
    type: 'ayah',
    category: 'love',
    textAr: 'الطيبون للطيبات',
    textKu: 'پیاوە پاکەکان بۆ ئافرەتە پاکەکانن.',
    textEn: 'Good men are for good women.',
    reference: 'Surah An-Nur: 26',
    noteKu: 'دڵنیایی: ئەوەی بۆت نووسراوە دێتە ڕێت، پێویست بە حەرام ناکات.',
    noteEn: 'Assurance: What is written for you will find you; no need for the forbidden.'
  },
  {
    id: 'love_20',
    type: 'quote',
    category: 'love',
    textAr: 'اللهم اغفر لنا ذنوبنا',
    textKu: 'خودایە لە گوناهەکانمان خۆشبە.',
    textEn: 'O Allah, forgive us our sins.',
    reference: 'Dua',
    noteKu: 'تێبینی: هەموومان هەڵە دەکەین، گرنگ ئەوەیە بە پاکی بگەینە حەڵاڵ.',
    noteEn: 'Note: We all make mistakes; the key is reaching the lawful with purity.'
  },
  {
    id: 'l2',
    type: 'hadith',
    category: 'love',
    textAr: 'حبی لآيِشَة كَانَ کَالْعُقْدَةِ فِي الْحَبْلِ',
    textKu: 'پێغەمبەر ﷺ دەربارەی دایکمان عائیشە دەفەرموێت: خۆشەویستیم بۆ عائیشە وەک گرێیەک وایە لە پەتدا (ئەوەندە توند و بەهێزە).',
    textEn: 'The Prophet ﷺ said about Aisha: My love for Aisha is like a knot in a rope.',
    reference: 'Hadith'
  },
  {
    id: 'l3',
    type: 'story',
    category: 'love',
    textAr: 'وفاء النبي لخديجة رضي الله عنها',
    textKu: 'پێغەمبەر ﷺ تەنانەت دوای مردنی دایکمان خەدیجەش هەر وەفادار بوو بۆی، هەر کاتێک مەڕێکی سەربڕیبایە بەشێکی بۆ هاوڕێکانی خەدیجە دەنارد و یادی دەکردەوە.',
    textEn: 'The Prophet ﷺ remained faithful to Khadijah even after her death; whenever he slaughtered a sheep, he would send a portion to her friends and remember her.',
    reference: 'Seerah'
  },
  {
    id: 'l4',
    type: 'quote',
    category: 'love',
    textAr: 'الحب في الله هو الحب الذي لا ينقطع',
    textKu: 'خۆشەویستی لە پێناو خودا ئەو خۆشەویستییە کە هەرگیز ناپچڕێت.',
    textEn: 'Love for the sake of Allah is the love that never breaks.',
    reference: 'Islamic Wisdom'
  },
  {
    id: 'l5',
    type: 'hadith',
    category: 'love',
    textAr: 'الأرواح جنود مجندة، فما تعارف منها ائتلف، وما تناكر منها اختلف',
    textKu: 'ڕۆحەکان سەربازی کۆکراوەن، ئەوانەی لێک نزیک بن و یەکتری بناسن ئاشنا دەبن، ئەوانەشی لێک غەریب بن لێک دوور دەکەونەوە.',
    textEn: 'Souls are like recruited soldiers; those that recognize one another unite, and those that do not recognize one another drift apart.',
    reference: 'Sahih Muslim'
  },
  {
    id: 'l6',
    type: 'quote',
    category: 'love',
    textAr: 'أجمل حب هو الذي يبدأ بدعاء وينتهي بجنة',
    textKu: 'جوانترین خۆشەویستی ئەوەیە کە بە دوعا دەست پێ بکات و بە بەهەشت کۆتایی بێت.',
    textEn: 'The most beautiful love is the one that starts with a prayer and ends in Paradise.',
    reference: 'Wisdom'
  },
  {
    id: 'l7',
    type: 'story',
    category: 'love',
    textAr: 'قصة حب علي وفاطمة رضي الله عنهما',
    textKu: 'کاتێک عەلی (خوای لێ ڕازی بێت) چوو بۆ خوازبێنی فاتیمە، پێغەمبەر ﷺ بە خۆشحالییەوە قبوڵی کرد، و ژیانێکی پڕ لە سادەیی و خۆشەویستییان پێکەوە بەسەر برد.',
    textEn: 'When Ali (RA) asked for Fatima\'s hand in marriage, the Prophet ﷺ accepted with joy, and they lived a life full of simplicity and love.',
    reference: 'Islamic History'
  }
];

