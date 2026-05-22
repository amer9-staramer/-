export interface Zikr {
  id: string;
  text: string; // Arabic
  translationKu: string; // Kurdish
  translationEn: string; // English
  translationAr?: string; // Arabic Tafsir/Explanation
  count: number;
  category: 'morning' | 'evening' | 'night' | 'general' | 'tasbih' | 'travel' | 'work' | 'rizq' | 'prayer' | 'debt' | 'patience' | 'repentance' | 'dua' | 'gratitude' | 'duha' | 'after_prayer' | 'distress' | 'illness' | 'mosque' | 'clothing' | 'anger' | 'home' | 'ablution' | 'eating' | 'rain' | 'thunder' | 'mirror' | 'sneezing' | 'hardship' | 'market' | 'gathering' | 'waking_up' | 'adhan' | 'toilet' | 'grief';
  reference?: string;
  pointsPerComplete?: number;
}

export const zikrs: Zikr[] = [
  // Travel
  {
    id: 'tr101',
    text: 'سُبْحانَ الَّذِي سَخَّرَ لَنَا هَذَا وَمَا كُنَّا لَهُ مُقْرِنِينَ وَإِنَّا إِلَى رَبِّنَا لَمُنْقَلِبُونَ',
    translationKu: 'پاک و بێگەردی بۆ ئەو خودایەی کە ئەمەی بۆ ڕام کردووین، و گەڕانەوەمان هەر بۆ لای پەروەردگارمانە.',
    translationEn: 'Glory is to Him Who has subjected this to us, and we are to our Lord returning.',
    translationAr: 'تفسير: دعاء الركوب والسفر، تسبيح الله الذي يسر لنا وسائل المواصلات.',
    count: 1,
    category: 'travel',
    pointsPerComplete: 5
  },
  // Distress
  {
    id: 'ds201',
    text: 'لاَ إِلَهَ إِلاَّ أَنْتَ سُبْحَانَكَ إِنِّي كُنْتُ مِنَ الظَّالِمِينَ',
    translationKu: 'هیچ پەرستراوێک نییە شایستەی پەرستن بێت جگە لە تۆ، پاک و بێگەردی بۆ تۆ، بە ڕاستی من لە ستەمکاران بووم.',
    translationEn: 'There is no deity but You, Glory be to You, I was indeed among the wrongdoers.',
    translationAr: 'تفسير: دعاء ذي النون، وهو من أعظم الأدعية لتفريج الكروب والهموم.',
    count: 1,
    category: 'distress',
    pointsPerComplete: 5
  },
  {
    id: 'ds202',
    text: 'يَا حَيُّ يَا قَيُّومُ بِرَحْمَتِكَ أَسْتَغِيثُ',
    translationKu: 'ئەی ئەو کەسەی هەمیشە زیندوویت، بە بەزەیی تۆ پەنا دەگرم.',
    translationEn: 'O Ever Living One, O Self-Sustaining One, in Your mercy I seek relief.',
    translationAr: 'تفسير: الاستعانة بصفات الله الحية والقيومية لتجاوز صعوبات الحياة.',
    count: 3,
    category: 'distress',
    pointsPerComplete: 5
  },
  // Illness
  {
    id: 'il301',
    text: 'أَذْهِبِ الْبَاسَ رَبَّ النَّاسِ، وَاشْفِ أَنْتَ الشَّافِي، لا شِفَاءَ إِلا شِفاؤُكَ',
    translationKu: 'ئەی پەروەردگاری خەڵکی، ئەم نەخۆشییە لادە و چاکمان بکەرەوە، تەنها تۆ چاککەرەوەیت.',
    translationEn: 'Take away the pain, O Lord of mankind, and grant healing, for You are the Healer.',
    translationAr: 'تفسير: الرقية الشرعية وطلب الشفاء من الله وحده الذي بيده الخير.',
    count: 1,
    category: 'illness',
    pointsPerComplete: 5
  },
  // Morning
  {
    id: 'm1_new',
    text: 'أَصْبَحْنَا وَأَصْبَحَ الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ، لاَ إِلَهَ إِلاَّ اللَّهُ وَحْدَهُ لاَ شَرِيكَ لَهُ',
    translationKu: 'بەیانیمان کردەوە و پادشایەتی هەمووی بۆ خوایە، سوپاس بۆ خوا، هیچ پەرستراوێک نییە شایستەی پەرستن بێت جگە لە ئەڵڵا.',
    translationEn: 'We have reached the morning and at this very time unto Allah belongs all sovereignty.',
    translationAr: 'تفسير: إقرار بتوحيد الله والاعتراف بأن الملك كله له وحده مع بداية اليوم.',
    count: 1,
    category: 'morning',
    pointsPerComplete: 5
  },
  {
    id: 'm2_new',
    text: 'اللَّهُمَّ مَا أَصْبَحَ بِي مِنْ نِعْمَةٍ أَوْ بِأَحَدٍ مِنْ خَلْقِكَ فَمِنْكَ وَحْدَكَ لاَ شَرِيكَ لَكَ',
    translationKu: 'خودایە هەر نیعمەتێک بەسەر مندا بەیانی کردبێتەوە یان بەسەر هەر یەک لە دروستکراوەکانتدا، ئەوا تەنها لە تۆوەیە.',
    translationEn: 'O Allah, whatever blessing has been received by me or by any of Your creatures, is from You alone.',
    translationAr: 'تفسير: اعتراف بأن كل النعم التي نتمتع بها هي محض فضل من الله وحده.',
    count: 1,
    category: 'morning',
    pointsPerComplete: 5
  },
  {
    id: 'm3_new',
    text: 'يَا حَيُّ يَا قَيُّومُ بِرَحْمَتِكَ أَسْتَغِيثُ، أَصْلِحْ لِي شَأْنِي كُلَّهُ وَلاَ تَكِلْنِي إِلَى نَفْسِي طَرْفَةَ عَيْنٍ',
    translationKu: 'ئەی ئەو کەسەی هەمیشە زیندوویت، بە بەزەیی تۆ پەنا دەگرم، هەموو کارەکانم بۆ چاک بکە و بۆ چاوتروکانێکیش نەمسپێریت بە نەفسی خۆم.',
    translationEn: 'O Ever Living One, O Self-Sustaining One, in Your mercy I seek relief; set all my affairs right.',
    translationAr: 'تفسير: دعاء باللجوء إلى الله لطلب الصلاح في كل شؤون الحياة وعدم الاتكال على النفس.',
    count: 1,
    category: 'morning',
    pointsPerComplete: 5
  },
  {
    id: 'm4_new',
    text: 'سُبْحَانَ اللَّهِ وَبِحَمْدِهِ',
    translationKu: 'پاک و بێگەردی بۆ خودا و سوپاس بۆ ئەو.',
    translationEn: 'Glory is to Allah and praise is to Him.',
    translationAr: 'تفسير: تنزيه الله عن كل نقص مع إثبات المحامد والكمال له.',
    count: 100,
    category: 'morning',
    pointsPerComplete: 5
  },
  // Ad-Duha
  {
    id: 'du1',
    text: 'رَبِّ اغْفِرْ لِي، وَتُبْ عَلَيَّ، إِنَّكَ أَنْتَ التَّوَّابُ الْغَفُورُ',
    translationKu: 'پەروەردگارم لێم خۆشبە و تەوبەم لێ وەربگرە، بە ڕاستی تۆ تەوبەوەرگر و لێخۆشبوویت.',
    translationEn: 'My Lord, forgive me and accept my repentance, for You are the Accepter of Repentance, the Forgiving.',
    translationAr: 'تفسير: طلب المغفرة من الله والرجوع إليه في وقت الضحى الذي هو وقت الغفلة.',
    count: 100,
    category: 'duha',
    pointsPerComplete: 5
  },
  {
    id: 'du2',
    text: 'سُبْحَانَ اللَّهِ وَبِحَمْدِهِ، عَدَدَ خَلْقِهِ، وَرِضَا نَفْسِهِ، وَزِنَةَ عَرْشِهِ، وَمِدَادَ كَلِمَاتِهِ',
    translationKu: 'پاک و بێگەردی و سوپاس بۆ خودا، بە ئەندازەی ژمارەی دروستکراوەکانی و ڕەزامەندی نەفسی و کێشی عەرشەکەی.',
    translationEn: 'Glory is to Allah and praise is to Him, by the multitude of His creation and His pleasure.',
    translationAr: 'تفسير: تنزيه الله والثناء عليه بأعظم الكلمات وأجمل الصفات.',
    count: 3,
    category: 'duha',
    pointsPerComplete: 5
  },
  {
    id: 'du3',
    text: 'اللَّهُمَّ إِنِّي أَسْأَلُكَ عِلْمًا نَافِعًا، وَرِزْقًا طَيِّبًا، وَعَمَلًا مُتَقَبَّلًا',
    translationKu: 'خودایە داوای زانستێکی سوودبەخش و ڕۆزییەکی پاک و کردەوەیەکی لێ وەرگیراوت لێ دەکەم.',
    translationEn: 'O Allah, I ask You for beneficial knowledge, goodly provision, and acceptable deeds.',
    translationAr: 'تفسير: دعاء جامع يطلبه المسلم في بداية سعيه اليومي لطلب الرزق والعلم.',
    count: 1,
    category: 'duha',
    pointsPerComplete: 5
  },
  {
    id: 'du4',
    text: 'لاَ إِلَهَ إِلاَّ اللَّهُ وَحْدَهُ لاَ شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ، وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ',
    translationKu: 'هیچ پەرستراوێک نییە شایستەی پەرستن بێت جگە لە ئەڵڵای تاقانە، پادشایەتی و سوپاس بۆ ئەوە.',
    translationEn: 'None has the right to be worshipped but Allah alone, Who has no partner. His is the dominion and His is the praise.',
    translationAr: 'تفسير: إعلان التوحيد التام لله والاعتراف بقدرته الشاملة على كل شيء.',
    count: 10,
    category: 'duha',
    pointsPerComplete: 5
  },
  // After Prayer
  {
    id: 'ap1',
    text: 'أَسْتَغْفِرُ اللَّهَ (ثَلاثاً)، اللَّهُمَّ أَنْتَ السَّلامُ وَمِنْكَ السَّلامُ، تَبَارَكْتَ يَا ذَا الْجَلالِ وَالإِكْرَامِ',
    translationKu: 'داوای لێخۆشبوون لە خودا دەکەم (٣ جار). خودایە تۆ سەلامی و سەلامەتیش هەر لە تۆوەیە، پیرۆزی و گەورەیی بۆ تۆیە ئەی خاوەن شکۆ و ڕێز.',
    translationEn: 'I ask Allah for forgiveness (3 times). O Allah, You are Peace and from You comes peace. Blessed are You, O Owner of Majesty and Honor.',
    translationAr: 'تفسير: الاستغفار بعد الصلاة لجبر أي نقص فيها، والاعتراف بأن الله هو مصدر السلام والأمان.',
    count: 3,
    category: 'after_prayer',
    pointsPerComplete: 5
  },
  {
    id: 'ap2',
    text: 'سُبْحَانَ اللَّهِ (33)، الْحَمْدُ لِلَّهِ (33)، اللَّهُ أَكْبَرُ (33)',
    translationKu: 'پاک و بێگەردی بۆ خودا (٣٣ جار)، سوپاس و ستایش بۆ خودا (٣٣ جار)، خودا گەورەترینە (٣٣ جار).',
    translationEn: 'Glory is to Allah (33), Praise is to Allah (33), Allah is the Greatest (33).',
    translationAr: 'تفسير: تسبيح الله وتحميده وتكبيره بعد كل صلاة مفروضة لنيل الأجر العظيم.',
    count: 33,
    category: 'after_prayer',
    pointsPerComplete: 5
  },
  {
    id: 'ap3',
    text: 'لاَ إِلَهَ إِلاَّ اللَّهُ وَحْدَهُ لاَ شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ',
    translationKu: 'هیچ پەرستراوێک نییە شایستەی پەرستن بێت جگە لە ئەڵڵای تاقانە، کە هیچ هاوبەشێکی نییە، پادشایەتی و سوپاس بۆ ئەوە و ئەو بەسەر هەموو شتێکدا بەدەسەڵاتە.',
    translationEn: 'None has the right to be worshipped but Allah alone, Who has no partner. His is the dominion and His is the praise.',
    translationAr: 'تفسير: تأكيد التوحيد المطلق لله والاعتراف بقدرته الشاملة بعد الفراغ من العبادة.',
    count: 1,
    category: 'after_prayer',
    pointsPerComplete: 5
  },
  {
    id: 'ap4',
    text: 'قُلْ هُوَ اللَّهُ أَحَدٌ، قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ، قُلْ أَعُوذُ بِرَبِّ النَّاسِ',
    translationKu: 'خوێندنی سورەتەکانی (ئیخلاس، فەلەق، ناس) دوای هەر نوێژێک.',
    translationEn: 'Reciting Surah Al-Ikhlas, Al-Falaq, and An-Nas after every prayer.',
    translationAr: 'تفسير: قراءة المعوذات للحفظ والتحصين بعد الانتهاء من الفريضة.',
    count: 1,
    category: 'after_prayer',
    pointsPerComplete: 5
  },
  {
    id: 'ap5',
    text: 'آية الكرسي (اللَّهُ لاَ إِلَهَ إِلاَّ هُوَ الْحَيُّ الْقَيُّومُ...)',
    translationKu: 'خوێندنی ئایەتولکورسی (ئەو کەسەی دوای نوێژ بیخوێنێت تەنها مردن ڕێگرە لە چوونی بۆ بەهەشت).',
    translationEn: 'Reciting Ayatul Kursi (Whoever recites it after prayer, nothing stands between him and Paradise except death).',
    translationAr: 'تفسير: أعظم آية في القرآن الكريم، فضلها كبير في حفظ المسلم وتقريبه من الجنة.',
    count: 1,
    category: 'after_prayer',
    pointsPerComplete: 5
  },
  // Evening
  {
    id: 'e1_new',
    text: 'أَمْسَيْنَا وَأَمْسَى الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ، لاَ إِلَهَ إِلاَّ اللَّهُ وَحْدَهُ لاَ شَرِيكَ لَهُ',
    translationKu: 'ئێوارەمان کردەوە و پادشایەتی هەمووی بۆ خوایە، سوپاس بۆ خوا، هیچ پەرستراوێک نییە شایستەی پەرستن بێت جگە لە ئەڵڵا.',
    translationEn: 'We have reached the evening and at this very time unto Allah belongs all sovereignty.',
    translationAr: 'تفسير: إقرار بتوحيد الله والاعتراف بأن الملك كله له وحده مع بداية المساء.',
    count: 1,
    category: 'evening',
    pointsPerComplete: 5
  },
  {
    id: 'e2_new',
    text: 'اللَّهُمَّ بِكَ أَمْسَيْنَا، وَبِكَ أَصْبَحْنَا، وَبِكَ نَحْيَا، وَبِكَ نَمُوتُ وَإِلَيْكَ الْمَصِيرُ',
    translationKu: 'خودایە بە فەزڵی تۆوە ئێوارەمان کردەوە، و بە فەزڵی تۆوە بەیانیمان کردەوە، بە تۆوە دەژین و بە تۆوە دەمرین و گەڕانەوەش بۆ لای تۆیە.',
    translationEn: 'O Allah, by You we enter the evening and by You we enter the morning, by You we live and by You we die.',
    translationAr: 'تفسير: إسلام النفس لله في كل تقلبات الحياة من ليل ونهار وحياة وموت.',
    count: 1,
    category: 'evening',
    pointsPerComplete: 5
  },
  {
    id: 'e3_new',
    text: 'أَعُوذُ بِكَلِمَاتِ اللَّهِ التَّامَّاتِ مِنْ شَرِّ مَا خَلَقَ',
    translationKu: 'پەنا دەگرم بە وشە تەواو و بێگەردەکانی خودا لە شەڕی هەرچی دروستی کردووە.',
    translationEn: 'I seek refuge in the perfect words of Allah from the evil of what He has created.',
    translationAr: 'تفسير: طلب الحماية الإلهية من كل سوء أو أذى قد يصيب الإنسان في ليله.',
    count: 3,
    category: 'evening',
    pointsPerComplete: 5
  },
  {
    id: 'e4_new',
    text: 'اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْهَمِّ وَالْحَزَنِ، وَالْعَجْزِ وَالْكَسَلِ، وَالْبُخْلِ وَالْجُبْنِ',
    translationKu: 'خودایە پەنات پێ دەگرم لە خەم و پەژارە، و لە بێدەسەڵاتی و تەمبەڵی، و لە چاوچنۆکی و ترسنۆکی.',
    translationEn: 'O Allah, I seek refuge in You from anxiety and sorrow, weakness and laziness, miserliness and cowardice.',
    translationAr: 'تفسير: دعاء شامل للتخلص من آفات النفس والقلب التي تعيق الإنسان عن دينه ودنياه.',
    count: 1,
    category: 'evening',
    pointsPerComplete: 5
  },
  {
    id: 'e5_new',
    text: 'حَسْبِيَ اللَّهُ لاَ إِلَهَ إِلاَّ هُوَ عَلَيْهِ تَوَكَّلْتُ وَهو رَبُّ الْعَرْشِ الْعَظِيمِ',
    translationKu: 'خودام بەسە، هیچ پەرستراوێک نییە شایستەی پەرستن بێت جگە لە ئەو، پشتم بەو بەستووە و ئەو پەروەردگاری عەرشی مەزنە.',
    translationEn: 'Allah is sufficient for me. None has the right to be worshipped but Him. In Him I put my trust.',
    translationAr: 'تفسير: كفاية الله للعبد في كل شؤونه عند التوكل الصادق عليه.',
    count: 7,
    category: 'evening',
    pointsPerComplete: 5
  },
  // Other Categories
  {
    id: 'tr1',
    text: 'سُبْحَانَ الَّذِي سَخَّرَ لَنَا هَذَا وَمَا كُنَّا لَهُ مُقْرِنِينَ * وَإِنَّا إِلَى رَبِّنَا لَمُنْقَلِبُونَ',
    translationKu: 'پاکی و بێگەردی بۆ ئەو خودایەی کە ئەمەی بۆ ڕام کردووین، ئەگینا ئێمە توانای ئەوەمان نەبوو، وە بێگومان ئێمە بۆ لای پەروەردگارمان دەگەڕێینەوە.',
    translationEn: 'Glory is to Him Who has subjected this to us, as we were not able to do it ourselves, and surely to our Lord we are returning.',
    count: 1,
    category: 'travel',
    reference: 'موسلیم'
  },
  {
    id: 'n1_new',
    text: 'بِاسْمِكَ اللَّهُمَّ أَمُوتُ وَأَحْيَا',
    translationKu: 'خودایە بە ناوی تۆوە دەمرم (دەخەوم) و دەژیم (بەئاگا دێمەوە).',
    translationEn: 'In Your name, O Allah, I die and I live.',
    translationAr: 'تفسير: تسليم الروح لله عز وجل والاعتراف بأن الموت والحياة بيده وحده.',
    count: 1,
    category: 'night',
    pointsPerComplete: 5
  },
  {
    id: 'n2_new',
    text: 'قُلْ هُوَ اللَّهُ أَحَدٌ، قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ، قُلْ أَعُوذُ بِرَبِّ النَّاسِ (ثلاث مرات مع النفث في الكفين)',
    translationKu: 'خوێندنی هەر سێ سورەتەکە (٣ جار) و فووکردن بە ناو دەستەکاندا و هێنانی بە هەموو جەستەدا.',
    translationEn: 'Reciting Al-Ikhlas, Al-Falaq, and An-Nas (3 times) and wiping over the body.',
    translationAr: 'تفسير: سنة نبوية للحفظ من الشيطان والشرور طوال الليل.',
    count: 3,
    category: 'night',
    pointsPerComplete: 5
  },
  {
    id: 'n3_new',
    text: 'آية الكرسي (اللَّهُ لاَ إِلَهَ إِلاَّ هُوَ الْحَيُّ الْقَيُّومُ...)',
    translationKu: 'خوێندنی ئایەتولکورسی (پارێزەرێک لەلایەن خواوە بۆت دادەنرێت و شەیتان ناتوانێت لێت نزیک بێتەوە).',
    translationEn: 'Reciting Ayatul Kursi (A guardian from Allah will remain with you and no devil will come near you).',
    translationAr: 'تفسير: أعظم آية للحماية والتحصين الإلهي قبل النوم.',
    count: 1,
    category: 'night',
    pointsPerComplete: 5
  },
  {
    id: 'n4_new',
    text: 'بِاسْمِكَ رَبِّ وَضَعْتُ جَنْبِي، وَبِكَ أَرْفَعُهُ، فَإِنْ أَمْسَكْتَ نَفْسِي فَارْحَمْهَا',
    translationKu: 'پەروەردگارم بە ناوی تۆوە پاڵکەوتم و بە ناوی تۆشەوە هەڵدەستم، ئەگەر گیانمت کێشا بەزەییت پێیدا بێتەوە.',
    translationEn: 'In Your name, my Lord, I lie down, and in Your name I rise. If You take my soul, have mercy on it.',
    translationAr: 'تفسير: دعاء الاستيداع، حيث يستودع المسلم روحه لخالقه عند النوم.',
    count: 1,
    category: 'night',
    pointsPerComplete: 5
  },
  {
    id: 'n5_new',
    text: 'اللَّهُمَّ قِنِي عَذَابَكَ يَوْمَ تَبْعَثُ عِبَادَكَ',
    translationKu: 'خودایە بمانپارێزە لە سزای خۆت لەو ڕۆژەی کە بەندەکانت زیندوو دەکەیتەوە.',
    translationEn: 'O Allah, protect me from Your punishment on the Day You resurrect Your slaves.',
    translationAr: 'تفسير: تذكر الآخرة والبعث وطلب النجاة من عذاب يوم القيامة.',
    count: 3,
    category: 'night',
    pointsPerComplete: 5
  },
  // Mosque
  {
    id: 'mos501',
    text: 'اللَّهُمَّ افْتَحْ لِي أَبْوَابَ رَحْمَتِكَ',
    translationKu: 'خودایە دەرگاکانی ڕەحمەتی خۆتم بۆ بکەرەوە (کاتی چوونە ژوورەوە).',
    translationEn: 'O Allah, open the gates of Your mercy for me.',
    translationAr: 'تفسير: دعاء دخول المسجد لطلب الرحمة والفضل من الله.',
    count: 1,
    category: 'mosque',
    pointsPerComplete: 5
  },
  {
    id: 'mos502',
    text: 'اللَّهُمَّ إِنِّي أَسْأَلُكَ مِنْ فَضْلِكَ',
    translationKu: 'خودایە داوای فەزڵ و چاکەی تۆ دەکەم (کاتی هاتنە دەرەوە).',
    translationEn: 'O Allah, I ask You of Your bounty.',
    translationAr: 'تفسير: دعاء الخروج من المسجد لطلب الرزق والفضل في الدنيا.',
    count: 1,
    category: 'mosque',
    pointsPerComplete: 5
  },
  // Clothing
  {
    id: 'clo601',
    text: 'الْحَمْدُ لِلَّهِ الَّذِي كَسَانِي هَذَا وَرَزَقَنِيهِ مِنْ غَيْرِ حَوْلٍ مِنِّي وَلا قُوَّةٍ',
    translationKu: 'سوپاس بۆ ئەو خودایەی کە ئەمەی پۆشیوم و پێی بەخشیم، بێ ئەوەی هیچ دەسەڵات و هێزێکی منی تێدا بێت.',
    translationEn: 'Praise be to Allah who has clothed me with this and provided it for me without any might or power on my part.',
    translationAr: 'تفسير: شكر الله على نعمة الكساء والاعتراف بفضله وكرمه.',
    count: 1,
    category: 'clothing',
    pointsPerComplete: 5
  },
  // Anger
  {
    id: 'ang701',
    text: 'أَعُوذُ بِاللَّهِ مِنَ الشَّيْطَانِ الرَّجِيمِ',
    translationKu: 'پەنا دەگرم بە خودا لە شەیتانی دەرکراو.',
    translationEn: 'I seek refuge in Allah from the accursed Satan.',
    translationAr: 'تفسير: الاستعاذة بالله عند الغضب لإطفاء نار الشيطان وتهدئة النفس.',
    count: 1,
    category: 'anger',
    pointsPerComplete: 5
  },
  // Home
  {
    id: 'hom801',
    text: 'بِسْمِ اللَّهِ وَلَجْنَا، وَبِسْمِ اللَّهِ خَرَجْنَا، وَعَلَى اللَّهِ رَبِّنَا تَوَكَّلْنَا',
    translationKu: 'بە ناوی خودا دەچینە ژوورەوە و بە ناوی خودا دێینە دەرەوە، و پشتمان بە پەروەردگارمان بەستووە.',
    translationEn: 'In the name of Allah we enter, in the name of Allah we leave, and upon our Lord we rely.',
    translationAr: 'تفسير: ذكر الله عند دخول المنزل وخروجه للحفظ والبركة.',
    count: 1,
    category: 'home',
    pointsPerComplete: 5
  },
  // Ablution
  {
    id: 'abl901',
    text: 'أَشْهَدُ أَنْ لا إِلَهَ إِلا اللَّهُ وَحْدَهُ لا شَرِيكَ لَهُ وَأَشْهَدُ أَنَّ مُحَمَّدًا عَبْدُهُ وَرَسُولُهُ',
    translationKu: 'شایەتی دەدەم کە هیچ پەرستراوێک نییە شایستەی پەرستن بێت جگە لە ئەڵڵای تاقانە، و شایەتی دەدەم کە محەممەد ﷺ بەندە و نێردراوی ئەوە.',
    translationEn: 'I bear witness that none has the right to be worshipped but Allah alone, and that Muhammad is His slave and Messenger.',
    translationAr: 'تفسير: ذكر يقال بعد الفراغ من الوضوء، تفتح لقائله أبواب الجنة الثمانية.',
    count: 1,
    category: 'ablution',
    pointsPerComplete: 5
  },
  // Eating
  {
    id: 'eat1001',
    text: 'الْحَمْدُ لِلَّهِ الَّذِي أَطْعَمَنِي هَذَا الطَّعَامَ وَرَزَقَنِيهِ مِنْ غَيْرِ حَوْلٍ مِنِّي وَلا قُوَّةٍ',
    translationKu: 'سوپاس بۆ ئەو خودایەی کە ئەم خواردنەی پێ بەخشیم و کردی بە ڕۆزیم، بێ ئەوەی هیچ هێز و دەسەڵاتێکی منی تێدا بێت.',
    translationEn: 'Praise be to Allah who has fed me this food and provided it for me without any might or power on my part.',
    translationAr: 'تفسير: دعاء يقال بعد الانتهاء من الطعام لشكر المنعم على رزقه.',
    count: 1,
    category: 'eating',
    pointsPerComplete: 5
  },
  // nature
  {
    id: 'rai1101',
    text: 'اللَّهُمَّ صَيِّبًا نَافِعًا',
    translationKu: 'خودایە بیکەیتە بارانێکی بەسوود و بەفەڕ.',
    translationEn: 'O Allah, let it be a beneficial rain.',
    translationAr: 'تفسير: دعاء يقال عند نزول المطر طلباً للبركة والنفع.',
    count: 1,
    category: 'rain',
    pointsPerComplete: 5
  },
  {
    id: 'thu1102',
    text: 'سُبْحَانَ الَّذِي يُسَبِّحُ الرَّعْدُ بِحَمْدِهِ وَالْمَلائِكَةُ مِنْ خِيفَتِهِ',
    translationKu: 'پاک و بێگەردی بۆ ئەو خودایەی کە هەورەبروسکە بە سوپاسگوزارییەوە و فریشتەکان لە ترسی ئەو، تەسبیحاتی دەکەن.',
    translationEn: 'Glory is to Him Whom the thunder exalts with praise and the angels from fear of Him.',
    translationAr: 'تفسير: تعظيم الله وتنزيهه عند سماع صوت الرعد.',
    count: 1,
    category: 'thunder',
    pointsPerComplete: 5
  },
  // Mirror
  {
    id: 'mir1301',
    text: 'اللَّهُمَّ أَنْتَ حَسَّنْتَ خَلْقِي فَحَسِّنْ خُلُقِي',
    translationKu: 'خودایە تۆ ڕوخسار و دروستبوونی منت جوان کردووە، ڕەوشتیشم جوان بکە.',
    translationEn: 'O Allah, as You have made my form beautiful, make my character beautiful as well.',
    translationAr: 'تفسير: دعاء يقال عند النظر في المرآة لطلب جمال الباطن كما هو جمال الظاهر.',
    count: 1,
    category: 'mirror',
    pointsPerComplete: 5
  },
  // Sneezing
  {
    id: 'sne1401',
    text: 'الْحَمْدُ لِلَّهِ',
    translationKu: 'سوپاس و ستایش بۆ خودا.',
    translationEn: 'All praise is for Allah.',
    translationAr: 'تفسير: حمد الله بعد العطاس اعترافاً بنعمة الصحة وخروج الأذى.',
    count: 1,
    category: 'sneezing',
    pointsPerComplete: 5
  },
  // Hardship
  {
    id: 'har1501',
    text: 'اللَّهُمَّ لا سَهْلَ إِلا مَا جَعَلْتَهُ سَهْلا، وَأَنْتَ تَجْعَلُ الْحَزْنَ إِذَا شِئْتَ سَهْلا',
    translationKu: 'خودایە هیچ شتێک ئاسان نییە مەگەر تۆ ئاسانی بکەیت، و تۆ ئەگەر بتهەوێت ناخۆشی و قورسی ئاسان دەکەیت.',
    translationEn: 'O Allah, there is no ease except in that which You have made easy, and You make the difficulty easy if You wish.',
    translationAr: 'تفسير: التوسل إلى الله لتيسير الأمور الصعبة وتخفيف الشدائد.',
    count: 1,
    category: 'hardship',
    pointsPerComplete: 5
  },
  // Market
  {
    id: 'mar1601',
    text: 'لاَ إِلَهَ إِلاَّ اللَّهُ وَحْدَهُ لاَ شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ، يُحْيِي وَيُمِيتُ، وَهُوَ حَيٌّ لاَ يَمُوتُ',
    translationKu: 'هیچ پەرستراوێک نییە شایستەی پەرستن بێت جگە لە ئەڵڵای تاقانە، پادشایەتی و سوپاس بۆ ئەوە، دەژێنێت و دەمرێنێت و ئەو هەمیشە زیندووە و نامرێت.',
    translationEn: 'None has the right to be worshipped but Allah alone, to Him belongs all sovereignty and praise. He gives life and causes death, and He is Ever-Living.',
    translationAr: 'تفسير: ذِكر الله في أماكن الغفلة (الأسواق) له أجر عظيم جداً.',
    count: 1,
    category: 'market',
    pointsPerComplete: 5
  },
  // Gathering
  {
    id: 'gat1701',
    text: 'سُبْحَانَكَ اللَّهُمَّ وَبِحَمْدِكَ، أَشْهَدُ أَنْ لا إِلَهَ إِلا أَنْتَ، أَسْتَغْفِرُكَ وَأَتُوبُ إِلَيْكَ',
    translationKu: 'پاک و بێگەردی بۆ تۆ ئەی خودا و سوپاس بۆ تۆ، شایەتی دەدەم هیچ پەرستراوێک نییە جگە لە تۆ، داوای لێخۆشبوونت لێ دەکەم و دەگەڕێمەوە بۆ لات.',
    translationEn: 'Glory is to You, O Allah, and praise is to You. I bear witness that there is none worthy of worship but You. I seek Your forgiveness and repent to You.',
    translationAr: 'تفسير: كفارة المجلس، يمحو الله بها ما كان من لغو أو خطأ في الكلام.',
    count: 1,
    category: 'gathering',
    pointsPerComplete: 5
  },
  // Waking Up
  {
    id: 'wak1801',
    text: 'الْحَمْدُ لِلَّهِ الَّذِي أَحْيَانَا بعدَ مَا أَمَاتَنَا وَإِلَيْهِ النُّشورُ',
    translationKu: 'سوپاس بۆ ئەو خودایەی کە زیندووی کردینەوە دوای ئەوەی کە مراندبووینی (خەوتبووین)، و گەڕانەوەش هەر بۆ لای ئەوە.',
    translationEn: 'Praise is to Allah Who gives us life after He has caused us to die, and unto Him is the resurrection.',
    translationAr: 'تفسير: شكر الله على نعمة الاستيقاظ وتجدد الحياة بعد الموتة الصغرى (النوم).',
    count: 1,
    category: 'waking_up',
    pointsPerComplete: 5
  },
  {
    id: 'wak1802',
    text: 'لاَ إِلَهَ إِلاَّ اللَّهُ وَحْدَهُ لاَ شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ، وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ',
    translationKu: 'هیچ پەرستراوێک نییە شایستەی پەرستن بێت جگە لە ئەڵڵای تاقانە، پادشایەتی و سوپاس بۆ ئەوە.',
    translationEn: 'None has the right to be worshipped but Allah alone, Who has no partner. His is the dominion and His is the praise.',
    translationAr: 'تفسير: تهليل وتعظيم لله مع بداية اليوم الجديد.',
    count: 1,
    category: 'waking_up',
    pointsPerComplete: 5
  },
  // Adhan
  {
    id: 'adh1901',
    text: 'اللَّهُمَّ رَبَّ هَذِهِ الدَّعْوَةِ التَّامَّةِ، وَالصَّلاةِ الْقَائِمَةِ، آتِ مُحَمَّدًا الْوَسِيلَةَ وَالْفَضِيلَةَ، وَابْعَثْهُ مَقَامًا مَحْمُودًا الَّذِي وَعَدْتَهُ',
    translationKu: 'خودایە، ئەی پەروەردگاری ئەم بانگە تەواوە و ئەم نوێژە بەرپایە، پلەی (وەسیلە) و (فەزیلە) بدە بە محەممەد ﷺ و بەرزی بکەرەوە بۆ ئەو جێگا مەزنەی کە بەڵێنت پێداوە.',
    translationEn: 'O Allah, Lord of this perfect call and the prayer to be offered, grant Muhammad the privilege and the excellence, and raise him to the honored station You have promised him.',
    translationAr: 'تفسير: دعاء يقال بعد الأذان لنيل شفاعة النبي ﷺ يوم القيامة.',
    count: 1,
    category: 'adhan',
    pointsPerComplete: 5
  },
  // Toilet
  {
    id: 'toi2001',
    text: 'اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْخُبْثِ وَالْخَبَائِثِ',
    translationKu: 'خودایە پەنات پێ دەگرم لە شەیتانە نێر و مێیەکان (کاتی چوونە ژوورەوە).',
    translationEn: 'O Allah, I seek refuge in You from the male and female devils.',
    translationAr: 'تفسير: الاستعاذة بالله من شرور الشياطين عند دخول الخلاء.',
    count: 1,
    category: 'toilet',
    pointsPerComplete: 5
  },
  {
    id: 'toi2002',
    text: 'غُفْرَانَكَ',
    translationKu: 'خودایە داوای لێخۆشبوونت لێ دەکەم (کاتی هاتنە دەرەوە).',
    translationEn: 'I ask for Your forgiveness.',
    translationAr: 'تفسير: طلب المغفرة من الله عند الخروج من الخلاء.',
    count: 1,
    category: 'toilet',
    pointsPerComplete: 5
  },
  // Grief
  {
    id: 'gri2101',
    text: 'إِنَّا لِلَّهِ وَإِنَّا إِلَيْهِ رَاجِعُونَ، اللَّهُمَّ أْجُرْنِي فِي مُصِيبَتِي وَأَخْلِفْ لِي خَيْرًا مِنْهَا',
    translationKu: 'ئێمە هی خوداین و بۆ لای ئەویش دەگەڕێینەوە، خودایە پاداشتم بدەرەوە لەم ناخۆشییەدا و باشترم بۆ قەرەبوو بکەرەوە.',
    translationEn: 'To Allah we belong and unto Him is our return. O Allah, reward me in my affliction and compensate me with better.',
    translationAr: 'تفسير: الصبر والاحتساب عند وقوع المصائب وطلب العوض الجميل من الله.',
    count: 1,
    category: 'grief',
    pointsPerComplete: 5
  },
  // extra general
  {
    id: 'gen2201',
    text: 'أَسْتَغْفِرُ اللَّهَ وَأَتُوبُ إِلَيْهِ',
    translationKu: 'داوای لێخۆشبوون لە خودا دەکەم و دەگەڕێمەوە بۆ لای ئەو.',
    translationEn: 'I seek Allah\'s forgiveness and turn to Him in repentance.',
    translationAr: 'تفسير: الاستغفار الدائم يفتح الأبواب ويجلب الرزق وراحة البال.',
    count: 100,
    category: 'general',
    pointsPerComplete: 5
  },
  // extra general 2
  {
    id: 'gen1201',
    text: 'اللَّهُمَّ أَعِنِّي عَلَى ذِكْرِكَ، وَشُكْرِكَ، وَحُسْنِ عِبَادَتِكَ',
    translationKu: 'خودایە یارمەتیم بدە لەسەر زیکر و یادی تۆ، و سوپاسگوزاریت، و بەجێهێنانی پەرستنەکانت بە جوانترین شێوە.',
    translationEn: 'O Allah, help me to remember You, to give thanks to You, and to worship You in the best manner.',
    translationAr: 'تفسير: طلب العون من الله للثبات على الطاعة والعبادة الصحيحة.',
    count: 1,
    category: 'general',
    pointsPerComplete: 5
  },
  {
    id: 'g1',
    text: 'سُبْحَانَ اللَّهِ، وَالْحَمْدُ لِلَّهِ، وَلاَ إِلَهَ إِلاَّ اللَّهُ، وَاللَّهُ أَكْبَرُ',
    translationKu: 'پاکی بۆ خودایە، سوپاس بۆ خودایە، هیچ پەرستراوێک نییە شایستەی پەرستن بێت جگە لە ئەڵڵا، خودا گەورەیە.',
    translationEn: 'Glory be to Allah, Praise be to Allah, There is no deity but Allah, Allah is the Greatest.',
    count: 33,
    category: 'general'
  },
  {
    id: 'g401',
    text: 'حَسْبُنَا اللَّهُ وَنِعْمَ الْوَكِيلُ',
    translationKu: 'خودامان بەسە و ئەو باشترین پاڵپشت و پارێزەرە.',
    translationEn: 'Allah is sufficient for us and He is the best Disposer of affairs.',
    translationAr: 'تفسير: تفويض الأمر لله والاعتماد عليه في مواجهة كل التحديات.',
    count: 7,
    category: 'general',
    pointsPerComplete: 5
  },
  {
    id: 'g402',
    text: 'لَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ',
    translationKu: 'هیچ گۆڕان و هێزێک نییە مەگەر بە ویستی خودا نەبێت (ئەمە خەزێنەیەکە لە خەزێنەکانی بەهەشت).',
    translationEn: 'There is no might nor power except with Allah.',
    translationAr: 'تفسير: كنز من كنوز الجنة، تدل على التبرؤ من الحول والقوة إلا بالله.',
    count: 10,
    category: 'general',
    pointsPerComplete: 5
  },
  {
    id: 'sal1',
    text: 'اللَّهُمَّ صَلِّ عَلَى مُحَمَّدٍ وَعَلَى آلِ مُحَمَّدٍ',
    translationKu: 'خودایە دروود و سڵاو بنێرە بۆ سەر محەممەد و خێزانی محەممەد.',
    translationEn: 'O Allah, send blessings upon Muhammad and upon the family of Muhammad.',
    translationAr: 'تفسير: الصلاة على النبي ﷺ من أعظم القربات، خاصة في يوم الجمعة.',
    count: 10,
    category: 'general',
    pointsPerComplete: 10
  },
  {
    id: 'sal2',
    text: 'اللَّهُمَّ صَلِّ وَسَلِّمْ عَلَى نَبَيِّنَا مُحَمَّدٍ',
    translationKu: 'خودایە دروود و سڵاو بنێرە بۆ سەر پێغەمبەرەکەمان محەممەد.',
    translationEn: 'O Allah, send peace and blessings upon our Prophet Muhammad.',
    translationAr: 'تفسير: صيغة مختصرة للصلاة على النبي ﷺ، تنال بها شفاعته.',
    count: 10,
    category: 'general',
    pointsPerComplete: 10
  }
];
