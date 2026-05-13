export interface MarriageStep {
  id: string;
  category: 'engagement' | 'nikah' | 'rights' | 'pregnancy' | 'intimacy';
  title: {
    ku: string;
    ar: string;
    en: string;
  };
  description: {
    ku: string;
    ar: string;
    en: string;
  };
  verse?: {
    ar: string;
    ku: string;
    en: string;
    ref: string;
  };
  hadith?: {
    ar: string;
    ku: string;
    en: string;
    ref: string;
  };
  notes?: {
    ku: string;
    ar: string;
    en: string;
  };
  warning?: {
    ku: string;
    ar: string;
    en: string;
  };
}

export const marriageSteps: MarriageStep[] = [
  {
    id: 'intimacy-1',
    category: 'intimacy',
    title: { ku: 'ئادابەکانی پێش سەرجێیکردن', ar: 'آداب ما قبل المعاشرة', en: 'Etiquette Before Intimacy' },
    description: {
      ku: 'ئیسلام هانی هاوسەران دەدات بۆ خۆڕازاندنەوە و بەکارهێنانی بۆنی خۆش و قسەی میهرەبانانە پێش سەرجێیکردن.',
      ar: 'حث الإسلام الزوجين على التجمل والتطيب والكلمة الطيبة قبل المعاشرة.',
      en: 'Islam encourages spouses to beautify themselves, use perfume, and speak kind words before intimacy.'
    },
    hadith: {
      ar: 'لو أن أحدكم إذا أراد أن يأتي أهله قال: باسم الله، اللهم جنبنا الشيطان وجنب الشيطان ما رزقتنا.',
      ku: 'ئەگەر یەکێکتان کاتێک ویستی بچێتە لای هاوسەرەکەی و وتی: (بەناوی خوا، خودایە شەیتانمان لێ دووربخەرەوە و شەیتان لەو ڕۆزییەش دووربخەرەوە کە پێمان دەبەخشیت)، ئەوا ئەگەر منداڵێکیان ببێت شەیتان زیانی پێ ناگەیەنێت.',
      en: 'If any of you says, when he approaches his wife: "In the name of Allah, O Allah, keep the Shaytan away from us and keep the Shaytan away from that which You provide for us," then if a child is decreed for them, the Shaytan will never harm him.',
      ref: 'Bukhari & Muslim'
    }
  },
  {
    id: 'intimacy-2',
    category: 'intimacy',
    title: { ku: 'ئەوەی ڕێگەپێدراوە و قەدەغەیە', ar: 'المباح والمحرم في المعاشرة', en: 'What is Permitted and Prohibited' },
    description: {
      ku: 'ڕێگەپێدراوە بۆ پیاو لە هەر ئاراستەیەکەوە چێژ لە هاوسەرەکەی وەربگرێت، بە مەرجێک لە کۆم (دواوە) نەبێت.',
      ar: 'يباح للرجل الاستمتاع بزوجته كيفما شاء وفي أي وضعية، بشرط أن يكون في القبل لا في الدبر.',
      en: 'A man is permitted to enjoy intimacy with his wife in any direction or position, as long as it is in the front and not the back.'
    },
    verse: {
      ar: 'نِسَاؤُكُمْ حَرْثٌ لَّكُمْ فَأْتُوا حَرْثَكُمْ أَنَّىٰ شِئْتُمْ',
      ku: 'هاوسەرەکانتان کێڵگەی ئێوەن، بچنە کێڵگەکەتان بە هەر شێوەیەک کە دەتانەوێت (بە مەرجێک لەو شوێنە بێت کە منداڵی لێ دەبێت).',
      en: 'Your wives are a place of sowing of seed for you, so come to your place of cultivation however you wish.',
      ref: 'Al-Baqarah: 223'
    },
    notes: {
      ku: 'حەرامکراوەکان: ١. سەرجێیکردن لە دواوە (کۆم). ٢. سەرجێیکردن لە کاتی سووڕی مانگانە (حیض) و زەیسانی (نفاس).',
      ar: 'المحرمات: ١. الجماع في الدبر. ٢. الجماع في وقت الحيض والنفاس.',
      en: 'Prohibitions: 1. Anal intercourse. 2. Intercourse during menstruation or post-natal bleeding.'
    }
  },
  {
    id: 'intimacy-3',
    category: 'intimacy',
    title: { ku: 'ئادابەکانی دوای سەرجێیکردن', ar: 'آداب ما بعد المعاشرة', en: 'Etiquette After Intimacy' },
    description: {
      ku: 'دوای سەرجێیکردن پێویستە دەستبەجێ غوسل (خۆشۆردنی شەرعی) بکرێت، یان لە کاتی زۆر پێویستدا دەستنوێژ بگیرێت بۆ خەوتن.',
      ar: 'بعد المعاشرة يجب الغسل الشرعي، أو الوضوء على الأقل إذا أراد النوم قبل الغسل.',
      en: 'After intimacy, it is necessary to perform Ghusl, or at least Wudu if one wishes to sleep before Ghusl.'
    },
    hadith: {
      ar: 'أن النبي ﷺ كان إذا أراد أن ينام وهو جنب غسل فرجه وتوضأ وضوءه للصلاة.',
      ku: 'پێغەمبەر (ﷺ) کاتێک لە حاڵەتی جەنابەدا بووایە و بویستایە بخەوێت، شوێنی پیسییەکەی دەشت و دەستنوێژی دەگرت وەک دەستنوێژی نوێژ.',
      en: 'The Prophet (ﷺ), if he wanted to sleep while in a state of Janaba (impurity), would wash his private parts and perform Wudu as for prayer.',
      ref: 'Bukhari & Muslim'
    }
  },  {
    id: 'engagement-1',
    category: 'engagement',
    title: { ku: 'هەڵبژاردنی هاوسەر', ar: 'اختيار الزوج/الزوجة', en: 'Choosing a Spouse' },
    description: {
      ku: 'هەڵبژاردن لەسەر بنەمای ئیمان و ڕەوشت باشترین بنەمایە بۆ هاوسەرگیرییەکی سەرکەوتوو.',
      ar: 'الاختيار على أساس الدين والخلق هو أفضل أساس لزواج ناجح.',
      en: 'Choosing based on faith and character is the best foundation for a successful marriage.'
    },
    hadith: {
      ar: 'تُنكح المرأة لأربع: لمالها، ولحسبها، ولجمالها، ولدينها، فاظفر بذات الدين تربت يداك.',
      ku: 'ئافرەت بۆ چوار شت مارە دەکرێت: بۆ ماڵەکەی، بۆ پلەوپایەی، بۆ جوانییەکەی، و بۆ دینەکەی، تۆ ئەوەیان ببەرەوە کە دیندارە.',
      en: 'A woman is married for four things: her wealth, her family status, her beauty and her religion. So you should take the religious one.',
      ref: 'Bukhari & Muslim'
    }
  },
  {
    id: 'engagement-2',
    category: 'engagement',
    title: { ku: 'داخوازی (الخطبة)', ar: 'الخطبة', en: 'Proposal' },
    description: {
      ku: 'داخوازی بە فەرمی لە ماڵی باوکی ئافرەتەکە ئەنجام دەدرێت بۆ دەربڕینی مەبەستی هاوسەرگیری.',
      ar: 'تتم الخطبة رسمياً في بيت والد المرأة للتعبير عن الرغبة في الزواج.',
      en: 'The proposal is formally made at the woman\'s father\'s house to express the intent to marry.'
    },
    verse: {
      ar: 'وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً',
      ku: 'یەکێک لە نیشانەکانی خودا ئەوەیە کە لە خۆتان هاوسەری بۆ دروست کردوون تا ئارام بگرن پێیان، و لە نێوانتاندا خۆشەویستی و میهرەبانی داناوە.',
      en: 'And of His signs is that He created for you from yourselves mates that you may find tranquility in them; and He placed between you affection and mercy.',
      ref: 'Ar-Rum: 21'
    }
  },
  {
    id: 'nikah-1',
    category: 'nikah',
    title: { ku: 'عەقدی نیکاح (مارەبڕین)', ar: 'عقد النكاح', en: 'Marriage Contract' },
    description: {
      ku: 'شوێنکەوتنی سوننەت لە ئەنجامدانی مارەبڕین بە ئاسانی و ڕەزامەندی هەردوولا.',
      ar: 'اتباع السنة في عقد النكاح بيسر وتراضي الطرفين.',
      en: 'Following the Sunnah in conducting the marriage contract with ease and mutual consent.'
    },
    hadith: {
      ar: 'خير الصداق أيسره.',
      ku: 'باشترین مارەیی ئەوەیە کە ئاسانترین و کەمترین دەچێت.',
      en: 'The best dowry is that which is most affordable.',
      ref: 'Abu Dawud'
    }
  },
  {
    id: 'rights-1',
    category: 'rights',
    title: { ku: 'مافی هاوسەرەکان', ar: 'حقوق الزوجين', en: 'Rights of Spouses' },
    description: {
      ku: 'ئیسلام مافی هەردوو هاوسەری دیاری کردووە بۆ ئەوەی بە خۆشی پێکەوە بژین.',
      ar: 'حدد الإسلام حقوق الزوجين لضمان حياة سعيدة ومستقرة.',
      en: 'Islam has defined the rights of both spouses to ensure a happy and stable life.'
    },
    hadith: {
      ar: 'خيركم خيركم لأهله، وأنا خيركم لأهلي.',
      ku: 'باشترینتان ئەو کەسەیە کە بۆ ماڵ و منداڵی باشترین بێت، وە من بۆ ماڵ و منداڵم باشترینم.',
      en: 'The best of you is he who is best to his family, and I am the best among you to my family.',
      ref: 'Tirmidhi'
    }
  },
  {
    id: 'pregnancy-1',
    category: 'pregnancy',
    title: { ku: 'دووگیانی و منداڵبوون', ar: 'الحمل والولادة', en: 'Pregnancy & Birth' },
    description: {
      ku: 'سوپاسگوزاری خودا لەسەر نیعمەتی منداڵ و دوعاکردن بۆ پاراستنیان.',
      ar: 'شكر الله على نعمة الأبناء والدعاء لهم بالحفظ والصلاح.',
      en: 'Thanking Allah for the blessing of children and praying for their protection and righteousness.'
    },
    verse: {
      ar: 'رَبِّ هَبْ لِي مِن لَّدُنكَ ذُرِّيَّةً طَيِّبَةً ۖ إِنَّكَ سَمِيعُ الدُّعَاءِ',
      ku: 'پەروەردگارم، لە لایەن خۆتەوە وەچەیەکی پاک و چاکم پێ ببەخشە، بەڕاستی تۆ دوعاکان دەبیستیت.',
      en: 'My Lord, grant me from Yourself a good offspring. Indeed, You are the Hearer of supplication.',
      ref: 'Al Imran: 38'
    }
  },
  {
    id: 'pregnancy-2',
    category: 'pregnancy',
    title: { ku: 'دوای منداڵبوون و پەروەردە', ar: 'ما بعد الولادة والتربية', en: 'Post-birth & Parenting' },
    description: {
      ku: 'بانگدان بە گوێی منداڵ و ناولێنان بە ناوێکی جوان و کۆشش بۆ پەروەردەیەکی دروست.',
      ar: 'الأذان في أذن المولود وتسميته باسم حسن والحرص على التربية الصالحة.',
      en: 'Calling the Adhan in the newborn\'s ear, giving a beautiful name, and striving for righteous upbringing.'
    },
    hadith: {
      ar: 'كلكم راع، وكلكم مسؤول عن رعيته.',
      ku: 'هەمووتان بەرپرسن، و هەمووشتان بەرپرسیار دەبن لەسەر ئەوانەی لەژێر دەستتانن.',
      en: 'Every one of you is a shepherd and is responsible for his flock.',
      ref: 'Bukhari & Muslim'
    }
  },
  {
    id: 'engagement-3',
    category: 'engagement',
    title: { ku: 'نزا و سوننەتەکانی داخوازی', ar: 'أدعية وسنن الخطبة', en: 'Dua & Sunnah of Engagement' },
    description: {
      ku: 'ئەنجامدانی نوێژی ئیستیخارە بۆ دڵنیابوونەوە لە بڕیارەکە و دوعاکردن بۆ خێر و بەرەکەت.',
      ar: 'صلاة الاستخارة قبل اتخاذ القرار والدعاء بالبركة والتوفيق.',
      en: 'Performing Istikhara prayer before making the decision and praying for blessing and success.'
    },
    hadith: {
      ar: 'إذا خطب إليكم من ترضون دينه وخلقه فزوجوه.',
      ku: 'ئەگەر کەسێک هاتە داخوازی کچەکەتان کە لە دین و ڕەوشتی ڕازی بوون، ئەوا بە شووی بدەن.',
      en: 'If there comes to you one with whose religious commitment and character you are pleased, then marry your daughter to him.',
      ref: 'Tirmidhi'
    }
  },
  {
    id: 'nikah-2',
    category: 'nikah',
    title: { ku: 'وەلی و شایەتەکان', ar: 'الولي والشهود', en: 'Guardian & Witnesses' },
    description: {
      ku: 'هەبوونی وەلی (باوک یان نزیکترین کەس) و دوو شایەتی دادپەروەر مەرجی سەرەکی عەقدەکەیە.',
      ar: 'وجود الولي وشاهدي عدل هو ركن أساسي لصحة عقد النكاح.',
      en: 'The presence of a guardian and two just witnesses is a fundamental pillar for the marriage contract.'
    },
    hadith: {
      ar: 'لا نكاح إلا بولي وشاهدي عدل.',
      ku: 'نیکاح نییە بەبێ بوونی وەلی و دوو شایەتی دادپەروەر.',
      en: 'There is no marriage except with a guardian and two just witnesses.',
      ref: 'Ahmad'
    }
  },
  {
    id: 'rights-2',
    category: 'rights',
    title: { ku: 'مافی ئافرەت لەسەر پیاو', ar: 'حقوق الزوجة على زوجها', en: 'Rights of the Wife' },
    description: {
      ku: '١. مارەیی. ٢. خەرجی (نان و جل و شوێن). ٣. مامەڵەی باش و میهرەبانی. ٤. پاراستنی نهێنی و شکۆی. ٥. مافی سەرجێیکردن و دابینکردنی پێداویستییە سۆزدارییەکان.',
      ar: '١. المهر. ٢. النفقة (المأكل، الملبس، والمسكن). ٣. حسن العشرة. ٤. حفظ سرها وكرامتها. ٥. الحق في المعاشرة الزوجية والاشباع العاطفي.',
      en: '1. Mahr (Dowry). 2. Maintenance (Food, clothing, housing). 3. Kind treatment. 4. Protecting her secrets and dignity. 5. Right to intimacy and emotional fulfillment.'
    },
    verse: {
      ar: 'وَلَهُنَّ مِثْلُ الَّذِي عَلَيْهِنَّ بِالْمَعْرُوفِ',
      ku: 'بۆ ئافرەتانیش هاوشێوەی ئەو مافانەی لەسەریانە، مافیان هەیە بە شێوەیەکی پەسند و جوان.',
      en: 'And due to the wives is similar to what is expected of them, according to what is reasonable.',
      ref: 'Al-Baqarah: 228'
    }
  },
  {
    id: 'rights-3',
    category: 'rights',
    title: { ku: 'مافی پیاو لەسەر ئافرەت', ar: 'حقوق الزوج على زوجتها', en: 'Rights of the Husband' },
    description: {
      ku: '١. گوێڕایەڵی لە چاکەدا. ٢. پاراستنی ماڵ و سامان و منداڵەکان. ٣. سەرجێیکردن و وەڵامدانەوەی داواکارییەکانی کاتێک ڕێگری دروست نییە. ٤. ڕێزگرتن لە کەس و کاری. ٥. تێپەڕ نەکردنی سنوورەکانی بەبێ ڕەزامەندی ئەو.',
      ar: '١. الطاعة في المعروف. ٢. حفظ ماله وبيته وأولاده. ٣. حق المعاشرة والاستجابة له. ٤. احترام أهله وتقديره. ٥. عدم الخروج من البيت إلا بإذنه.',
      en: '1. Obedience in goodness. 2. Guarding his property and children. 3. Right to intimacy. 4. Respecting his family. 5. Not leaving the house without his permission.'
    },
    hadith: {
      ar: 'إذا دعا الرجل امرأته إلى فراشه فلم تأته فبات غضبان عليها لعنتها الملائكة حتى تصبح.',
      ku: 'کاتێک پیاو داوای هاوسەرەکەی دەکات بۆ سەرجێیکردن و ئەویش وەڵامی ناداتەوە و پیاوەکە بە توڕەیی دەخەوێت، فریشتەکان نەفرەتی لێ دەکەن تا بەیانی.',
      en: 'If a man calls his wife to his bed and she refuses, and he spends the night angry with her, the angels curse her until morning.',
      ref: 'Bukhari & Muslim'
    }
  },
  {
    id: 'marriage-polygyny',
    category: 'nikah',
    title: { ku: 'هاوسەرگیری دووەم، سێیەم و چوارەم', ar: 'تعدد الزوجات', en: 'Polygyny (Multiple Wives)' },
    description: {
      ku: 'ئیسلام ڕێگەی داوە بە پیاو تا چوار ژن بێنێت بەم مەرجانە: ١. دادپەروەری تەواو لە نێوانیان (خەرجی، کات، مامەڵە). ٢. توانای دارایی بۆ بەڕێکردنی هەموویان. ٣. توانای جەستەیی. ئەگەر پیاو ترسا لەوەی دادپەروەر نەبێت، تەنها یەک ژن بۆی ڕێگەپێدراوە.',
      ar: 'أباح الإسلام للرجل الزواج حتى أربع زوجات بشرط: ١. العدل المطلق بينهن (النفقة، المبيت، المعاملة). ٢. القدرة المالية. ٣. القدرة البدنية. وإن خاف عدم العدل فواحدة فقط.',
      en: 'Islam allows up to four wives under strict conditions: 1. Absolute justice between them (maintenance, time, treatment). 2. Financial capability. 3. Physical capability. If fearful of injustice, then only one.'
    },
    verse: {
      ar: 'فَانكِحُوا مَا طَابَ لَكُم مِّنَ النِّسَاءِ مَثْنَىٰ وَثُلَاثَ وَرُبَاعَ ۖ فَإِنْ خِفْتُمْ أَلَّا تَعْدِلُوا فَوَاحِدَةً',
      ku: 'مارە بکەن ئەوەی بۆتان دەشێت لە ئافرەتان، دوو دوو، سێ سێ، چوار چوار، بەڵام ئەگەر ترسان لەوەی دادپەروەری نەکەن، ئەوا تەنها یەکێک.',
      en: 'Marry those that please you of [other] women, two or three or four. But if you fear that you will not be just, then [marry only] one.',
      ref: 'An-Nisa: 3'
    }
  },
  {
    id: 'pregnancy-3',
    category: 'pregnancy',
    title: { ku: 'پەروەردەی ئیسلامی منداڵ', ar: 'التربية الإسلامية للطفل', en: 'Islamic Upbringing' },
    description: {
      ku: 'فێرکردنی منداڵ لەسەر خۆشەویستی خودا و پێغەمبەر و ڕەوشتی بەرز لە سەرەتای تەمەنەوە.',
      ar: 'تربية الطفل على حب الله ورسوله والأخلاق الحسنة منذ الصغر.',
      en: 'Raising the child on the love of Allah and His Messenger and good character from an early age.'
    },
    hadith: {
      ar: 'أكرموا أولادكم وأحسنوا أدبهم.',
      ku: 'ڕێز لە منداڵەکانتان بگرن و پەروەردەیان جوان بکەن.',
      en: 'Honour your children and perfect their manners.',
      ref: 'Ibn Majah'
    }
  },
  {
    id: 'nikah-3',
    category: 'nikah',
    title: { ku: 'دوای مارەبڕین تا گواستنەوە', ar: 'ما بعد العقد وحتى الزفاف', en: 'Between Nikah and Wedding' },
    description: {
      ku: 'دوای عەقدەکە هەردوولا دەبنە حەڵاڵی یەکتر، بەڵام پێویستە ڕەچاوی دابونەریت و ماڵی خەزوور بکرێت تا کاتی گواستنەوەی فەرمی.',
      ar: 'بعد العقد يصبح الطرفان زوجين شرعاً، ولكن ينبغي مراعاة العرف وأهل الزوجة حتى موعد الزفاف الرسمي.',
      en: 'After the Nikah, both are legally married, but cultural norms and the wife\'s family should be respected until the formal wedding move.'
    },
    notes: {
      ku: 'پێویستە ئەم ماوەیە بۆ ناسینی زیاتری یەکتر و ئامادەکاری بۆ ژیانی نوێ بەکاربهێنرێت بە شێوەیەکی شەرعی.',
      ar: 'ينبغي استغلال هذه الفترة للتعارف أكثر والاستعداد للحياة الجديدة بما يرضي الله.',
      en: 'This period should be used for deeper understanding and preparation for the new life in a lawful manner.'
    }
  },
  {
    id: 'intimacy-0',
    category: 'intimacy',
    title: { ku: 'سوننەتەکانی شەوی زاوایەتی', ar: 'سنن ليلة الزفاف', en: 'Sunnah of the Wedding Night' },
    description: {
      ku: '١. ئەنجامدانی دوو ڕکات نوێژ بە جەماعەت پێکەوە. ٢. پیاوەکە دەستی دەخاتە سەر نێوچەوانی هاوسەرەکەی و دوعای خێری بۆ دەکات.',
      ar: '١. صلاة ركعتين جماعة مع الزوجة. ٢. يضع الزوج يده على مقدمة رأس زوجته ويدعو لها بالخير.',
      en: '1. Performing two Rak\'ahs of prayer together. 2. The husband places his hand on his wife\'s forehead and prays for her.'
    },
    hadith: {
      ar: 'اللهم إني أسألك خيرها وخير ما جبلتها عليه، وأعوذ بك من شرها وشر ما جبلتها عليه.',
      ku: 'ئەی خودایە، من داوای خێری ئەم هاوسەرەم و ئەو خێرەش دەکەم کە لەسەری دروستت کردووە، و پەنات پێ دەگرم لە شەڕی ئەم و ئەو شەڕەی کە لەسەری دروستت کردووە.',
      en: 'O Allah, I ask You for her goodness and the goodness of what You have created her upon, and I seek refuge in You from her evil and the evil of what You have created her upon.',
      ref: 'Abu Dawud'
    }
  },
  {
    id: 'm1',
    category: 'engagement',
    title: { ku: 'ئارامی و هاوسەرگیری', ar: 'السكن في الزواج', en: 'Tranquility in Marriage' },
    description: {
      ku: 'هاوسەرگیری سەرچاوەی ئارامییە بۆ دڵ و دەروون.',
      ar: 'الزواج مصدر للسكن والطمأنينة للقلب.',
      en: 'Marriage is a source of tranquility for the heart and soul.'
    },
    verse: {
      ar: 'وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا',
      ku: 'لە نیشانەکانی خودا ئەوەیە کە هاوسەری بۆ دروست کردوون تا ئارامیی لێ وەربگرن.',
      en: 'And of His signs is that He created for you from yourselves mates that you may find tranquility in them.',
      ref: 'Ar-Rum: 21'
    },
    warning: {
      ku: 'هەڵە: وێناکردنی هاوسەرگیری تەنها وەک ئەرکێکی جەستەیی و فەرامۆشکردنی لایەنی ئارامی دڵ.',
      ar: 'خطأ: تصور الزواج كمجرد واجب جسدي وتجاهل جانب راحة القلب والسكينة.',
      en: 'Warning: Visualizing marriage only as a physical duty and ignoring the aspect of tranquility of the heart.'
    }
  },
  {
    id: 'm2',
    category: 'engagement',
    title: { ku: 'باشترین خۆشی دونیا', ar: 'متاع الدنيا', en: 'Best Worldly Enjoyment' },
    description: {
      ku: 'ئافرەتی پیاوچاک گەورەترین نیعمەتە بۆ گوزەرانی دونیا.',
      ar: 'المرأة الصالحة هي أعظم نعمة لخير الدنيا.',
      en: 'A righteous woman is the greatest blessing for worldly life.'
    },
    hadith: {
      ar: 'الدُّنْيَا مَتَاعٌ، وَخَيْرُ مَتَاعِ الدُّنْيَا الْمَرْأَةُ الصَّالِحَةُ',
      ku: 'دونیا هەمووی خۆشییە، باشترین خۆشی دونیایش ئافرەتێکی پیاوچاک و شیاوە.',
      en: 'The world is enjoyment, and the best enjoyment of the world is a righteous woman.',
      ref: 'Sahih Muslim'
    },
    warning: {
      ku: 'هەڵە بۆ پیاوان: گرنگیدان تەنها بە جوانی دەرەوە و فەرامۆشکردنی ئیمان و ڕەوشت.',
      ar: 'خطأ للرجال: الاهتمام فقط بالجمال الخارجي وتجاهل الدين والخلق.',
      en: 'Warning for men: Focusing only on external beauty and neglecting faith and character.'
    }
  },
  {
    id: 'm3',
    category: 'engagement',
    title: { ku: 'ئازایەتی لە هاوسەرگیری', ar: 'العجز والفجور في النكاح', en: 'Inability vs Marriage' },
    description: {
      ku: 'هیچ شتێک نابێت ڕێگر بێت لە هاوسەرگیری تەنها دەستەوسانی یان خراپەکاری نەبێت.',
      ar: 'لا ينبغي أن يمنع المرء من النكاح إلا عجز حقيقي أو انشغال بالفجور.',
      en: 'Nothing should prevent marriage except real inability or preoccupation with immorality.'
    },
    hadith: {
      ar: 'قال عمر بن الخطاب: لا يمنع الحظ من النكاح إلا عجز أو فجور',
      ku: 'عومەری کوڕی خەتاب دەفەرموێت: هیچ شتێک ڕێگری لە هاوسەرگیری ناکات تەنها دەستەوسانی یان خراپەکاری نەبێت.',
      en: 'Umar ibn al-Khattab said: Nothing prevents marriage except inability or immorality.',
      ref: 'Athar'
    },
    warning: {
      ku: 'هەڵە: دواخستنی هاوسەرگیری بەبێ هۆکارێکی شەرعی تەنها لەبەر ترس لە داهاتوو.',
      ar: 'خطأ: تأخير الزواج بدون عذر شرعي لمجرد الخوف من المستقبل.',
      en: 'Warning: Delaying marriage without a religious excuse only out of fear for the future.'
    }
  },
  {
    id: 'm4',
    category: 'engagement',
    title: { ku: 'پێوەری داخوازی', ar: 'معيار الخطبة', en: 'Proposal Criteria' },
    description: {
      ku: 'ئاین و ڕەوشت دەبێت یەکەم پێوەر بن بۆ قبوڵکردنی داخوازی.',
      ar: 'الدين والخلق يجب أن يكونا المعيار الأول في قبول الخطيب.',
      en: 'Religion and character should be the primary criteria for accepting a suitor.'
    },
    hadith: {
      ar: 'إِذَا خَطَبَ إِلَيْكُمْ مَنْ تَرْضَوْنَ دِينَهُ وَخُلُقَهُ فَزَوِّجُوهُ',
      ku: 'ئەگەر کەسێک هاتە داخوازی کچەکەتان و لە ئاین و ڕەوشتی ڕازی بوون، ژنی پێ بدەن.',
      en: 'If someone comes to you whose religion and character you are pleased with, then marry [him].',
      ref: 'Tirmidhi'
    },
    warning: {
      ku: 'هەڵە بۆ سەرپەرشتیار: ڕەتکردنەوەی گەنجی شیاو تەنها لەبەر کەمیی سامان یان جیاوازیی عەشیرەت.',
      ar: 'خطأ للولي: رفض الخاطب الكفء لمجرد قلة ماله أو اختلاف القبيلة.',
      en: 'Warning for guardians: Rejecting a suitable suitor only due to lack of wealth or tribal difference.'
    }
  },
  {
    id: 'm5',
    category: 'rights',
    title: { ku: 'پۆشاکی یەکتری', ar: 'اللباس والسكينة', en: 'Garments for One Another' },
    description: {
      ku: 'هاوسەرەکان وەک پۆشاک وان بۆ پاراستن و ڕازاندنەوەی یەکتری.',
      ar: 'الزوجان لباس لبعضهما البعض، يستران ويحميان بعضهما.',
      en: 'Spouses are like garments for each other, protecting and beautifying one another.'
    },
    verse: {
      ar: 'هُنَّ لِبَاسٌ لَّكُمْ وَأَنتُمْ لِبَاسٌ لَّهُنَّ',
      ku: 'ئەوان پۆشاکن بۆ ئێوە و ئێوەیش پۆشاکن بۆ ئەوان (یەکتری دەپارێزن).',
      en: 'They are clothing for you and you are clothing for them.',
      ref: 'Al-Baqarah: 187'
    },
    warning: {
      ku: 'هەڵە: باسکردنی نهێنییەکانی هاوسەر لای خەڵکی و نەپاراستنی شکۆمەندی یەکتری.',
      ar: 'خطأ: إفشاء أسرار الزوج/الزوجة للناس وعدم الحفاظ على كرامة الطرف الآخر.',
      en: 'Warning: Revealing spouse\'s secrets to others and not maintaining each other\'s dignity.'
    }
  },
  {
    id: 'm6',
    category: 'rights',
    title: { ku: 'خۆڕازاندنەوە بۆ هاوسەر', ar: 'التزين للزوجة', en: 'Beautifying for Spouse' },
    description: {
      ku: 'وەک چۆن ئافرەت خۆی دەڕازێنێتەوە، پێویستە پیاویش بایەخ بە پاکوخاوێنی بدات.',
      ar: 'كما تتزين المرأة لزوجها، يجب على الرجل أيضاً الاهتمام بمظهره ونظافته.',
      en: 'Just as a woman beautifies herself for her husband, the man should also care for his appearance and hygiene.'
    },
    hadith: {
      ar: 'قال ابن عباس: إني لأتزين لامرأتي كما تتزين لي',
      ku: 'ئیبن عەباس دەفەرموێت: من خۆم بۆ هاوسەرەکەم دەڕازێنمەوە، وەک چۆن ئەو خۆم بۆ دەڕازێنێتەوە.',
      en: 'Ibn Abbas said: I beautify myself for my wife just as she beautifies herself for me.',
      ref: 'Athar'
    },
    warning: {
      ku: 'هەڵە بۆ پیاوان: فەرامۆشکردنی پاکوخاوێنی و ڕێکپۆشی لە ناو ماڵدا.',
      ar: 'خطأ للرجال: إهمال النظافة الشخصية والهندام الحسن داخل البيت.',
      en: 'Warning for men: Neglecting personal hygiene and good appearance inside the home.'
    }
  },
  {
    id: 'm7',
    category: 'nikah',
    title: { ku: 'بەرەکەت لە ئاسانکاریدا', ar: 'البركة في التيسير', en: 'Blessing in Ease' },
    description: {
      ku: 'ئاسانکاری لە مارەیی و خەرجی هاوسەرگیری هۆکاری بەرەکەتە.',
      ar: 'تيسير المهر ونفقات الزواج هي سبب للبركة.',
      en: 'Easing the dowry and marriage expenses is a cause for blessing.'
    },
    hadith: {
      ar: 'أَعْظَمُ النِّكَاحِ بَرَكَةً أَيْسَرُهُ مَؤُونَةً',
      ku: 'بەرەکەتدارترین هاوسەرگیری ئەوەیە کە تێچووەکەی کەمتر و ئاسانتر بێت.',
      en: 'The most blessed marriage is the one with the easiest expenses.',
      ref: 'Ahmad'
    },
    warning: {
      ku: 'هەڵە بۆ ئافرەتان: داواکردنی مارەیی زۆر و ئاهەنگی گرانبەها کە دەبێتە هۆی قەرزاری پیاوەکە.',
      ar: 'خطأ للنساء: اشتراط مهور خيالية وحفلات باهظة ترهق الزوج بالديون.',
      en: 'Warning for women: Demanding high dowries and expensive parties that burden the husband with debt.'
    }
  },
  {
    id: 'm8',
    category: 'engagement',
    title: { ku: 'بینینی شەرعی', ar: 'الرؤية الشرعية', en: 'Legitimate Viewing' },
    description: {
      ku: 'بڕیاردان لەسەر بنەمای بینین و دڵنیابوونەوە لە یەکتر.',
      ar: 'اتخاذ القرار بناءً على الرؤية الواضحة والارتياح النفسي.',
      en: 'Making decisions based on clear viewing and psychological comfort.'
    },
    hadith: {
      ar: 'انْظُرْ إِلَيْهَا فَإِنَّهُ أَحْرَى أَنْ يُؤْدَمَ بَيْنَكُمَا',
      ku: 'سەیری بکە (لە کاتی داخوازی)، چونکە ئەوە دەبێتە هۆی بەردەوامی و خۆشەویستی نێوانتان.',
      en: 'Look at her, for it is more likely to bring harmony between you.',
      ref: 'Tirmidhi'
    },
    warning: {
      ku: 'هەڵە: ئەنجامدانی هاوسەرگیری بەبێ بینینی شەرعی و دڵنیابوونەوە لە یەکتری.',
      ar: 'خطأ: الزواج دون الرؤية الشرعية والتأكد من القبول النفسي والشكلي.',
      en: 'Warning: Marrying without the legitimate viewing and ensuring physical and mental compatibility.'
    }
  },
  {
    id: 'm9',
    category: 'engagement',
    title: { ku: 'پێوەری جوانی', ar: 'مقياس الجمال', en: 'Measure of Beauty' },
    description: {
      ku: 'جوانی پێوەرێکی گرنگە بەڵام نابێت تەنها پێوەر بێت.',
      ar: 'الجمال معيار مهم لكن لا ينبغي أن يكون المعيار الوحيد المستقل.',
      en: 'Beauty is an important criterion but it shouldn\'t be the only independent criterion.'
    },
    hadith: {
      ar: 'لا تنكحوا النساء لحسنهن فعسى حسنهن أن يرديهن',
      ku: 'تەنها لەبەر جوانی ژن مەهێنن، چونکە ڕەنگە جوانییەکەیان بەرەو لووتبەرزییان ببات.',
      en: 'Do not marry women only for their beauty, for their beauty may cause them to perish (due to arrogance).',
      ref: 'Ibn Majah'
    },
    warning: {
      ku: 'هەڵە: وازهێنان لە ئیمان و ڕەوشت تەنها لەبەر ڕووخسار.',
      ar: 'خطأ: التخلي عن شرط الدين والخلق من أجل المظهر فقط.',
      en: 'Warning: Abandoning the requirement of faith and character for appearance alone.'
    }
  },
  {
    id: 'm10',
    category: 'rights',
    title: { ku: 'وەسیەت بۆ ئافرەتان', ar: 'الوصية بالنساء', en: 'Legacy for Women' },
    description: {
      ku: 'پێغەمبەر ﷺ لە دوا وەسیەتەکانیدا جەختی لەسەر چاکە لەگەڵ ئافرەتان کردووە.',
      ar: 'أكد النبي ﷺ في وصاياه على الإحسان والرفق بالنساء.',
      en: 'The Prophet ﷺ emphasized kindness and gentleness with women in his legacies.'
    },
    hadith: {
      ar: 'استوصوا بالنساء خيراً',
      ku: 'وەسیەتی چاکەتان لەگەڵ ئافرەتان پێ دەکەم.',
      en: 'Treat women nicely.',
      ref: 'Bukhari & Muslim'
    },
    warning: {
      ku: 'هەڵە بۆ پیاوان: بەکارهێنانی توندوتیژی یان قسەی ڕەق لە کاتی کێشەکاندا.',
      ar: 'خطأ للرجال: استخدام العنف أو القسوة في الكلام عند وقوع الخلافات.',
      en: 'Warning for men: Using violence or harsh words when conflicts occur.'
    }
  },
  {
    id: 'm11',
    category: 'nikah',
    title: { ku: 'هاوسەرگیری بۆ هەمووان', ar: 'النكاح للجميع', en: 'Marriage for All' },
    description: {
      ku: 'هاندانی هاوسەرگیری بۆ ئەوانەی پێشتر هاوسەرگیرییان هەبووە یان تەنیا بوون.',
      ar: 'حث الجميع على الزواج حتى من سبق لهم الزواج.',
      en: 'Encouraging marriage for everyone, even those who were previously married.'
    },
    verse: {
      ar: 'وَأَنكِحُوا الْأَيَامَىٰ مِنكُمْ وَالصَّالِحِينَ مِنْ عِبَادِكُمْ',
      ku: 'هاوسەرگیری بۆ ئەو کەسانە بکەن کە هاوسەریان نییە و لە کەسە چاکەکانتانن.',
      en: 'And marry the unmarried among you and the righteous among your male slaves and female slaves.',
      ref: 'An-Nur: 32'
    },
    warning: {
      ku: 'هەڵە: ڕێگری کردن لە ژنێ پێدان بە کەسێک تەنها لەبەر ئەوەی پێشتر هاوسەرگیری کردووە.',
      ar: 'خطأ: منع تزويج الكفء لمجرد أنه سبق له الزواج أو كانت مطلقة/أرملة.',
      en: 'Warning: Preventing marriage to a suitable person just because they were previously married.'
    }
  },
  {
    id: 'm12',
    category: 'rights',
    title: { ku: 'باشترین ڕەوشت', ar: 'خيرية الخلق مع الأهل', en: 'Best Character with Family' },
    description: {
      ku: 'ڕاستەقینەی ڕەوشت لە مامەڵەی ناوماڵدا دەردەکەوێت.',
      ar: 'حقيقة الخلق الحسن تظهر في التعامل داخل جدران البيت.',
      en: 'The truth of good character appears in treatment within the walls of the house.'
    },
    hadith: {
      ar: 'خياركم خياركم لنسائهم',
      ku: 'باشترینتان ئەو کەسەیە کە بۆ هاوسەرەکەی باشترین بێت.',
      en: 'The best of you are those who are best to their wives.',
      ref: 'Tirmidhi'
    },
    warning: {
      ku: 'هەڵە: باشبوون لەگەڵ خەڵکی دەرەوە و ڕەق بوون لەگەڵ خێزان لە ماڵەوە.',
      ar: 'خطأ: الظهور بوجه حسن مع الناس في الخارج والقسوة مع الأهل في الداخل.',
      en: 'Warning: Appearing with a good face with people outside and being harsh with family inside.'
    }
  },
  {
    id: 'm13',
    category: 'engagement',
    title: { ku: 'تەقوا لە هاوسەرگیری', ar: 'التقوى في الزواج', en: 'Piety in Marriage' },
    description: {
      ku: 'هاوسەرگیری لەگەڵ کەسێک کە لە خودا بترسێت گەرەنتی مافەکانە.',
      ar: 'الزواج من صاحب التقوى يضمن الحفاظ على الحقوق والإحسان.',
      en: 'Marrying someone with piety guarantees the maintenance of rights and kindness.'
    },
    hadith: {
      ar: 'سُئل الحسن البصري: من أزوج ابنتي؟ قال: ممن يتقي الله',
      ku: 'لە حەسەنی بەسریان پرسی کچەکەم بدەم بە کێ؟ فەرمووی: بە کەسێک کە لە خودا بترسێت.',
      en: 'Al-Hasan al-Basri was asked: To whom should I marry my daughter? He said: To one who fears Allah.',
      ref: 'Athar'
    },
    warning: {
      ku: 'هەڵە: کچ دان بە کەسێکی دەوڵەمەند کە نوێژ ناکات و ئادابی ئاینی نییە.',
      ar: 'خطأ: تزويج الفتاة لرجل غني يفتقر للدين والخلق وأدب المعاملة.',
      en: 'Warning: Marrying a girl to a wealthy man who lacks religion, character, and proper conduct.'
    }
  },
  {
    id: 'm14',
    category: 'rights',
    title: { ku: 'ڕەچاوکردنی لایەنە باشەکان', ar: 'مراعاة الجوانب الإيجابية', en: 'Considering Positive Traits' },
    description: {
      ku: 'نابێت تەنها سەیری کەمکوڕییەکان بکرێت، بەڵکو بڕوانە لاسیە پۆزەتیڤەکانیش.',
      ar: 'لا ينبغي النظر فقط للعيوب، بل يجب تقدير المزايا والصفات الحسنة.',
      en: 'One should not only look at flaws, but also appreciate the advantages and good qualities.'
    },
    hadith: {
      ar: 'لا يفرك مؤمن مؤمنة، إن كره منها خلقا رضي منها آخر',
      ku: 'با هیچ پیاوێکی بڕوادار ڕقی لە هاوسەرەکەی نەبێت، ئەگەر ڕەوشتێکی بەدڵ نەبوو، دانەیەکی تری بەدڵە.',
      en: 'A believing man should not hate a believing woman; if he dislikes one of her characteristics, he is pleased with another.',
      ref: 'Muslim'
    },
    warning: {
      ku: 'هەڵە: گەڕان بەدوای کەمکوڕییە بچووکەکان و فەرامۆشکردنی لایەنە باشەکان.',
      ar: 'خطأ: البحث عن الزلات الصغيرة وتجاهل الجوانب المشرقة والصفات الطيبة.',
      en: 'Warning: Searching for small flaws and ignoring the bright sides and good qualities.'
    }
  },
  {
    id: 'm15',
    category: 'engagement',
    title: { ku: 'هەژاری و هاوسەرگیری', ar: 'الفقر والزواج', en: 'Poverty and Marriage' },
    description: {
      ku: 'خودای گەورە بەڵێنی دەوڵەمەندی و فەزڵ دەدات بەوانەی هاوسەرگیری دەکەن بۆ پاکدامێنی.',
      ar: 'وعد الله بالغنى والفضل لمن يتزوج طلباً للعفاف.',
      en: 'Allah promises wealth and grace to those who marry seeking chastity.'
    },
    verse: {
      ar: 'إِن يَكُونُوا فُقَرَاءَ يُغْنِهِمُ اللَّهُ مِن فَضْلِهِ',
      ku: 'ئەگەر هەژاریش بن، خودا لە فەزڵی خۆی دەوڵەمەندیان دەکات.',
      en: 'If they should be poor, Allah will enrich them from His bounty.',
      ref: 'An-Nur: 32'
    },
    warning: {
      ku: 'هەڵە: ترس لە هەژاری وەک ڕێگر لەبەردەم پێکهێنانی خێزان.',
      ar: 'خطأ: الخوف من الفقر وجعله عائقاً أمام تكوين الأسرة.',
      en: 'Warning: Fear of poverty as a barrier to forming a family.'
    }
  },
  {
    id: 'm16',
    category: 'rights',
    title: { ku: 'سەقامگیری خێزان', ar: 'استقرار الأسرة', en: 'Family Stability' },
    description: {
      ku: 'ئیسلام جەخت لەسەر هەوڵدان بۆ بەردەوامی هاوسەرگیری دەکاتەوە.',
      ar: 'يؤكد الإسلام على السعي لاستمرارية الحياة الزوجية.',
      en: 'Islam emphasizes striving for the continuity of married life.'
    },
    hadith: {
      ar: 'أيما امرأة سألت زوجها طلاقاً في غير ما بأس فحرام عليها رائحة الجنة',
      ku: 'هەر ئافرەتێک بەبێ هۆکارێکی شەرعی داوای جیابوونەوە بکات، بۆنی بەهەشتی لێ حەرامە.',
      en: 'Any woman who asks her husband for a divorce without any strong reason, the fragrance of Paradise will be forbidden to her.',
      ref: 'Abu Dawud'
    },
    warning: {
      ku: 'هەڵە بۆ ئافرەتان: هەڕەشەکردن بە جیابوونەوە لە کاتی کێشە بچووکەکاندا.',
      ar: 'خطأ للنساء: التهديد بالطلاق عند وقوع مشكلات بسيطة.',
      en: 'Warning for women: Threatening with divorce when minor problems occur.'
    }
  },
  {
    id: 'm17',
    category: 'engagement',
    title: { ku: 'نهێنیپارێزی لە داخوازی', ar: 'الكتمان في الخطبة', en: 'Secrecy in Proposal' },
    description: {
      ku: 'باشترە هەواڵی داخوازی بە نهێنی بمێنێتەوە تا دەگاتە ئەنجامی کۆتایی.',
      ar: 'يفضل كتمان خبر الخطبة حتى تصل إلى نهاياتها السعيدة.',
      en: 'It is preferred to keep the news of the proposal secret until it reaches its happy ending.'
    },
    hadith: {
      ar: 'قال عمر: استعينوا على الحوائج بالكتمان',
      ku: 'عومەری کوڕی خەتاب دەفەرموێت: بۆ جێبەجێکردنی کارەکانتان (وەک داخوازی) سوود لە نهێنیپارێزی وەربگرن.',
      en: 'Umar said: Assist the fulfillment of your needs with secrecy.',
      ref: 'Athar'
    },
    warning: {
      ku: 'هەڵە: بڵاوکردنەوەی هەواڵی داخوازی پێش ئەوەی بگاتە ئەنجامی کۆتایی.',
      ar: 'خطأ: نشر خبر الخطبة قبل إتمامها بشكل نهائي.',
      en: 'Warning: Spreading news of the proposal before its final completion.'
    }
  },
  {
    id: 'm18',
    category: 'engagement',
    title: { ku: 'هەڵبژاردنی هاوسەری بەسۆز', ar: 'اختيار الزوجة الودود', en: 'Choosing an Affectionate Spouse' },
    description: {
      ku: 'سۆز و میهرەبانی بنەمایەکی گرنگی ژیانی هاوسەرگیرییە.',
      ar: 'المودة والرحمة ركن أساسي في الحياة الزوجية.',
      en: 'Affection and mercy are foundational pillars of married life.'
    },
    hadith: {
      ar: 'تزوجوا الودود الولود',
      ku: 'هاوسەرگیری لەگەڵ ئافرەتی بەسۆز و منداڵبێن بکەن.',
      en: 'Marry those who are affectionate and fertile.',
      ref: 'Abu Dawud'
    },
    warning: {
      ku: 'هەڵە: هەڵبژاردنی هاوسەرێک کە تەنها بایەخ بە کار و پلەی کۆمەڵایەتی دەدات.',
      ar: 'خطأ: اختيار شريك الحياة بناءً على المنصب والعمل فقط.',
      en: 'Warning: Choosing a life partner based solely on position and work.'
    }
  },
  {
    id: 'm19',
    category: 'rights',
    title: { ku: 'ژیان بە شێوەی جوان', ar: 'المعاشرة بالمعروف', en: 'Living in Kindness' },
    description: {
      ku: 'خودای گەورە فەرمان دەکات بەوەی مامەڵەی هاوسەرەکان لەسەر بنەمای چاکە بێت.',
      ar: 'يأمر الله سبحانه أن يكون التعامل بين الزوجين مبنياً على الإحسان.',
      en: 'Allah Almighty commands that the interaction between spouses be based on kindness.'
    },
    verse: {
      ar: 'وَعَاشِرُوهُنَّ بِالْمَعْرُوفِ',
      ku: 'بە شێوەیەکی جوان و پەسەند لەگەڵیاندا بژین.',
      en: 'And live with them in kindness.',
      ref: 'An-Nisa: 19'
    },
    warning: {
      ku: 'هەڵە بۆ پیاوان: مامەڵەکردن وەک سەرۆکێکی زاڵ نەک وەک هاوبەشێکی ژیان.',
      ar: 'خطأ للرجال: التعامل كمدير متسلط وليس كشريك حياة.',
      en: 'Warning for men: Treating as a dominant boss and not as a life partner.'
    }
  },
  {
    id: 'm20',
    category: 'engagement',
    title: { ku: 'ڕێزگرتن لە داخوازی کەسانی تر', ar: 'احترام خطبة الآخرين', en: 'Respecting Others\' Proposals' },
    description: {
      ku: 'نابێت تێوەگلانی دروست بکرێت لە داخوازی کەسانی تردا بۆ پاراستنی برایەتی.',
      ar: 'لا يجوز التدخل في خطبة الآخرين حفاظاً على روابط الأخوة.',
      en: 'It is not permissible to interfere in others\' proposals to preserve brotherhood ties.'
    },
    hadith: {
      ar: 'لا يخطب أحدكم على خطبة أخيه',
      ku: 'با کەستان نەچێتە سەر داخوازی براکەی (تا یەکلا دەبێتەوە).',
      en: 'None of you should propose to a woman whom his brother has already proposed to.',
      ref: 'Bukhari & Muslim'
    },
    warning: {
      ku: 'هەڵە: پێبڕکێ و تێکدانی داخوازی کەسانی تر.',
      ar: 'خطأ: التنافس وإفساد خطبة الآخرين.',
      en: 'Warning: Competing and spoiling the proposals of others.'
    }
  },
  {
    id: 'm21',
    category: 'rights',
    title: { ku: 'ئافرەتی چاک وەک تاج', ar: 'المرأة الصالح كتاج', en: 'Righteous Woman as a Crown' },
    description: {
      ku: 'نیعمەتی هاوسەرێکی باش بەرزترین نیعمەتە.',
      ar: 'نعمة الزوجة الصالحة هي أرقى النعم.',
      en: 'The blessing of a righteous wife is the highest of blessings.'
    },
    hadith: {
      ar: 'قال لقمان الحكيم لابنه: يا بني، المرأة الصالحة مثل التاج على رأس الملك',
      ku: 'لوقمانی حەکیم بە کوڕەکەی دەڵێت: کوڕم، ئافرەتی چاک وەک تاج وایە لەسەر سەری پاشا.',
      en: 'Luqman the Wise said to his son: O my son, a righteous woman is like a crown on the head of a king.',
      ref: 'Athar'
    },
    warning: {
      ku: 'هەڵە بۆ پیاوان: سوکایەتیکردن بە هاوسەر لەبەردەم منداڵ یان خەڵکیدا.',
      ar: 'خطأ للرجال: إهانة الزوجة أمام الأبناء أو الناس.',
      en: 'Warning for men: Insulting the wife in front of children or people.'
    }
  },
  {
    id: 'm22',
    category: 'engagement',
    title: { ku: 'دوای تەقوا', ar: 'بعد التقوى', en: 'After Piety' },
    description: {
      ku: 'چاکترین سوود دوای تەقوا هاوسەرێکی باشە.',
      ar: 'أفضل نفع بعد التقوى هو الزوجة الصالحة.',
      en: 'The best benefit after piety is a righteous wife.'
    },
    hadith: {
      ar: 'ما استفاد المؤمن بعد تقوى الله خيراً له من زوجة صالحة',
      ku: 'بڕوادار دوای تەقوای خودا، چاکتری دەست نەکەوتووە لە هاوسەرێکی باش.',
      en: 'After fear of Allah, a believer gains nothing better than a righteous wife.',
      ref: 'Ibn Majah'
    },
    warning: {
      ku: 'هەڵە: پێوانەکردنی سەرکەوتنی هاوسەرگیری تەنها بە بڕی سەروەت.',
      ar: 'خطأ: قياس نجاح الزواج بمقدار الثروة فقط.',
      en: 'Warning: Measuring the success of marriage only by the amount of wealth.'
    }
  },
  {
    id: 'm23',
    category: 'rights',
    title: { ku: 'سیفەتی ئافرەتە چاکەکان', ar: 'صفات الصالحات', en: 'Traits of Righteous Women' },
    description: {
      ku: 'ئافرەتی چاک پارێزەری نهێنی و ماڵی هاوسەرەکەیەتی.',
      ar: 'المرأة الصالحة تحفظ سر زوجها وماله.',
      en: 'A righteous woman preserves her husband\'s secrets and property.'
    },
    verse: {
      ar: 'فَالصَّالِحَاتُ قَانِتَاتٌ حَافِظَاتٌ لِّلْغَيْبِ بِمَا حَفِظَ اللَّهُ',
      ku: 'ئافرەتە باشەکان گوێڕایەڵن و پارێزەری نهێنی و ماڵن لە غەیبەتدا.',
      en: 'So righteous women are devoutly obedient, guarding in [the husband\'s] absence what Allah would have them guard.',
      ref: 'An-Nisa: 34'
    },
    warning: {
      ku: 'هەڵە بۆ ئافرەتان: گوێنەدان بە کات و سەرفیاتی ناوماڵ بێ ئاگاداری پیاوەکە.',
      ar: 'خطأ للنساء: إهمال الوقت والمصاريف المنزلية دون علم الزوج.',
      en: 'Warning for women: Neglecting time and household expenses without the husband\'s knowledge.'
    }
  },
  {
    id: 'm24',
    category: 'rights',
    title: { ku: 'مافی دابینکردن', ar: 'حق النفقة', en: 'Right of Maintenance' },
    description: {
      ku: 'پیاو بەرپرسە لە دابینکردنی پێداویستییەکانی ژیان بۆ هاوسەرەکەی.',
      ar: 'الرجل مسؤول عن توفير احتياجات الحياة لزوجته.',
      en: 'The man is responsible for providing the necessities of life for his wife.'
    },
    hadith: {
      ar: 'حق المرأة على زوجها أن يطعمها إذا طعم ويكسوها إذا اكتسى',
      ku: 'مافی ئافرەت لەسەر پیاو ئەوەیە خواردن و پۆشاکی بۆ دابین بکات کاتێک بۆ خۆی دەیکات.',
      en: 'The right of the wife over her husband is that he feeds her when he feeds himself and clothes her when he clothes himself.',
      ref: 'Abu Dawud'
    },
    warning: {
      ku: 'هەڵە بۆ پیاوان: ڕەزیلی کردن لە خەرجی ماڵ و منداڵ کاتێک توانای هەیە.',
      ar: 'خطأ للرجال: البخل في نفقات البيت والأبناء مع القدرة المالية.',
      en: 'Warning for men: Parsimony in household and children\'s expenses despite financial capability.'
    }
  },
  {
    id: 'm25',
    category: 'rights',
    title: { ku: 'نەرمی لە مامەڵەدا', ar: 'اللين في التعامل', en: 'Gentleness in Interaction' },
    description: {
      ku: 'نەرمی و ئاسانی لە مامەڵەدا کلیلە بۆ ژیانێکی پڕ لە ئارامی.',
      ar: 'اللين واليسر في التعامل هما المفتاح لحياة مليئة بالسكينة.',
      en: 'Gentleness and ease in interaction are the keys to a life full of tranquility.'
    },
    hadith: {
      ar: 'قال الأحنف بن قيس: خير النساء الهينة اللينة',
      ku: 'ئەحنەفی کوڕی قەیس دەڵێت: باشترین ئافرەتان ئەوانەن کە نەرمونیان و ئاسانن لە مامەڵەدا.',
      en: 'Al-Ahnaf ibn Qais said: The best of women are those who are easy-going and gentle.',
      ref: 'Athar'
    },
    warning: {
      ku: 'هەڵە بۆ هەردوولا: کەللەڕەقی و پێداگیری لەسەر ڕای خۆت لە کاتی گفتوگۆدا.',
      ar: 'خطأ للطرفين: العناد والإصرار على الرأي الشخصي أثناء النقاش.',
      en: 'Warning for both sides: Stubbornness and insistence on personal opinion during discussion.'
    }
  },
  {
    id: 'contract_1',
    category: 'nikah',
    title: { ku: 'مافی مارەیی', ar: 'حق الصداق', en: 'Dowry Rights' },
    description: {
      ku: 'مارەیی دیاری و مافی شەرعی ئافرەتە.',
      ar: 'المهر هو عطاء وحق شرعي للمرأة.',
      en: 'Dowry is a gift and a legitimate right for the woman.'
    },
    verse: {
      ar: 'وَآتُوا النِّسَاءَ صَدُقَاتِهِنِّ نِحْلَةً',
      ku: 'مارەیی ئافرەتان بدەن بە خۆشی و بەبێ منەت، چونکە ئەمە مافێکی شەرعی خۆیانە.',
      en: 'And give the women [upon marriage] their [bride-gift] graciously.',
      ref: 'An-Nisa: 4'
    },
    warning: {
      ku: 'ڕێنمایی: مارەیی دیاری و مافی ئافرەتە، نەک نرخی کڕینی، بۆیە پێویستە بە ڕەزامەندی ئەو بێت.',
      ar: 'توجيه: المهر هو هدية وحق للمرأة، وليس ثمناً لشرائها، لذا يجب أن يكون برضاها.',
      en: 'Guidance: Dowry is a gift and right of the woman, not a purchase price, so it must be with her consent.'
    }
  },
  {
    id: 'contract_2',
    category: 'nikah',
    title: { ku: 'وەفاداری بە مەرجەکان', ar: 'الوفاء بالشروط', en: 'Fulfillment of Conditions' },
    description: {
      ku: 'پێویستە وەفادار بن بەو مەرجانەی لە کاتی مارەبڕیندا لەسەری ڕێککەوتوون.',
      ar: 'يجب الوفاء بالشروط المتفق عليها عند عقد النكاح.',
      en: 'It is necessary to be faithful to the conditions agreed upon during the marriage contract.'
    },
    hadith: {
      ar: 'أَحَقُّ الشُّرُوطِ أَنْ تُوفُوا بِهِ مَا اسْتَحْلَلْتُمْ بِهِ الْفُرُوجَ',
      ku: 'شایستەترین مەرج کە پێویستە وەفاداری بن بۆی، ئەو مەرجانەیە کە لە کاتی مارەبڕیندا لەسەری ڕێککەوتوون.',
      en: 'The most deserving of conditions to be fulfilled are those by which you have made the private parts lawful for you.',
      ref: 'Bukhari & Muslim'
    },
    warning: {
      ku: 'تێبینی: هەر مەرجێک لە کاتی عەقددا نووسرا (وەک خوێندن، یان جێگەی نیشتەجێبوون)، جێبەجێکردنی لەسەر پیاو دەبێتە فەرز.',
      ar: 'ملاحظة: أي شرط يكتب في العقد (مثل التعليم أو السكن) يصبح تنفيذه فرضاً على الرجل.',
      en: 'Note: Any condition written during the contract (such as education or residence) becomes obligatory for the man to fulfill.'
    }
  },
  {
    id: 'contract_3',
    category: 'nikah',
    title: { ku: 'مامناوەندی لە مارەیی', ar: 'الاعتدال في المهور', en: 'Moderation in Dowry' },
    description: {
      ku: 'ئیسلام هانی ئاسانکاری و مامناوەندی دەدات لە بڕی مارەییدا.',
      ar: 'يحث الإسلام على التيسير والاعتدال في مقدار المهر.',
      en: 'Islam encourages ease and moderation in the amount of dowry.'
    },
    hadith: {
      ar: 'قال عمر بن الخطاب: لا تغلو في مُهُور النساء',
      ku: 'عومەری کوڕی خەتاب دەفەرموێت: زیادەڕەوی مەکەن لە گرانیی مارەیی ئافرەتاندا.',
      en: 'Umar ibn al-Khattab said: Do not go to extremes in the dowries of women.',
      ref: 'Athar'
    },
    warning: {
      ku: 'ئاگاداری: گرانی مارەیی بەرەکەتی هاوسەرگیری کەمدەکاتەوە و ڕێگری لە گەنجان دەکات.',
      ar: 'تنبيه: مبالاة المهر تقلل من بركة الزواج وتعيق الشباب عن الزواج.',
      en: 'Warning: Expensive dowries reduce the blessing of marriage and hinder young people from marrying.'
    }
  },
  {
    id: 'contract_4',
    category: 'nikah',
    title: { ku: 'ڕەزامەندی کچ', ar: 'رضا الفتاة', en: 'Consent of the Girl' },
    description: {
      ku: 'ڕەزامەندی و مۆڵەتی کچ و بێوەژن مەرجی سەرەکی هاوسەرگیرییە.',
      ar: 'رضا الفتاة أو الثيب شرط أساسي لصحة الزواج.',
      en: 'Consent and permission of the girl or widow is a fundamental condition for marriage.'
    },
    hadith: {
      ar: 'لا تُنْكَحُ الأَيِّمُ حَتَّى تُسْتَأْمَرَ، وَلا تُنْكَحُ الْبِكْرُ حَتَّى تُسْتَأْذَنَ',
      ku: 'نە بێوەژن و نە کچ، نابێت مارە ببڕدرێن تاوەکو ڕەزامەندی و مۆڵەتی خۆیان وەرنەگیرێت.',
      en: 'A woman who has been previously married should not be married until her permission has been asked, and a virgin should not be married until her consent has been sought.',
      ref: 'Bukhari & Muslim'
    },
    warning: {
      ku: 'گرنگ: مارەبڕین بەبێ ڕەزامەندی دڵی کچەکە، لە ئیسلامدا جێگەی نابێتەوە و هەڵەیە.',
      ar: 'هام: النكاح دون رضا الفتاة القلبي ليس له مكان في الإسلام وهو خطأ.',
      en: 'Important: Marriage without the heart\'s consent of the girl has no place in Islam and is wrong.'
    }
  },
  {
    id: 'contract_5',
    category: 'nikah',
    title: { ku: 'پەیمانێکی بەهێز', ar: 'ميثاق غليظ', en: 'A Solemn Covenant' },
    description: {
      ku: 'هاوسەرگیری پەیمانێکی پیرۆز و بەهێزە لەگەڵ خودای گەورە.',
      ar: 'الزواج هو ميثاق مقدس وغليظ مع الله تعالى.',
      en: 'Marriage is a sacred and solemn covenant with Allah Almighty.'
    },
    verse: {
      ar: 'وَأَخَذْنَ مِنكُم مِّيثَاقًا غَلِيظًا',
      ku: 'ئەو ئافرەتانە پەیمانێکی زۆر توند و بەهێزیان لێ وەرگرتوون (لە کاتی عەقددا).',
      en: 'And they have taken from you a solemn covenant.',
      ref: 'An-Nisa: 21'
    },
    warning: {
      ku: 'تێبینی: عەقد تەنها واژۆیەک نییە، بەڵکو پەیمانێکی گەورەیە لەگەڵ خودا کە دەبێت ڕێزی لێ بگیرێت.',
      ar: 'ملاحظة: العقد ليس مجرد توقيع، بل هو عهد كبير مع الله يجب احترامه.',
      en: 'Note: The contract is not just a signature, but a great covenant with Allah that must be respected.'
    }
  },
  {
    id: 'contract_6',
    category: 'nikah',
    title: { ku: 'ڕەزامەندی لەسەر مارەیی', ar: 'التراضي على الصداق', en: 'Mutual Consent on Dowry' },
    description: {
      ku: 'مارەیی شتێکە کە هەردوو لایەنی هاوسەرگیری لەسەری ڕازین.',
      ar: 'الصداق هو ما اتفق عليه وتراضى به الطرفان.',
      en: 'Dowry is what both parties of the marriage agree and consent upon.'
    },
    hadith: {
      ar: 'عن ابن عباس قال: الصداق ما تراضى عليه الأهلون',
      ku: 'ئیبن عەباس دەفەرموێت: مارەیی ئەوەیە کە هەردوولا (بەتایبەت کچ و کوڕ) لەسەری ڕازین.',
      en: 'Ibn Abbas said: The dowry is what the families (parties) agree upon.',
      ref: 'Athar'
    },
    warning: {
      ku: 'ڕێنمایی: با مارەیی شتێکی وا بێت کە توانای پیاوەکە بشکێت و دڵی ئافرەتەکەش ڕازی بکات.',
      ar: 'توجيه: ليكن المهر شيئاً يطيقه الرجل ويرضي قلب المرأة.',
      en: 'Guidance: Let the dowry be something the man can afford and that satisfies the woman\'s heart.'
    }
  },
  {
    id: 'contract_7',
    category: 'nikah',
    title: { ku: 'کەمترین مارەیی', ar: 'أدنى الصداق', en: 'Minimum Dowry' },
    description: {
      ku: 'ئیسلام ڕێگەی داوە بە کەمترین شتیش هاوسەرگیری بکرێت.',
      ar: 'أباح الإسلام إتمام الزواج بأقل الأشياء تيسيراً للأمر.',
      en: 'Islam has allowed the completion of marriage with minimal things to facilitate the matter.'
    },
    hadith: {
      ar: 'التمس ولو خاتماً من حديد',
      ku: 'بگەڕێ بۆ مارەیی، ئەگەر ئەڵقەیەکی ئاسنیش بێت.',
      en: 'Search [for a dowry] even if it is just an iron ring.',
      ref: 'Bukhari & Muslim'
    },
    warning: {
      ku: 'تێبینی: ئیسلام ڕێگەی داوە تەنانەت بە کەمترین شتیش هاوسەرگیری بکرێت تا کارەکە ئاسان بێت.',
      ar: 'ملاحظة: سمح الإسلام بالزواج حتى بأقل الأشياء تيسيراً للشباب.',
      en: 'Note: Islam has permitted marriage even with the minimum of things so that the matter is easy.'
    }
  },
  {
    id: 'contract_8',
    category: 'nikah',
    title: { ku: 'مەرجی وەلی', ar: 'شرط الولي', en: 'Guardian Requirement' },
    description: {
      ku: 'بوونی وەلی یەکێکە لە مەرجە هەرە سەرەکییەکان بۆ پاراستنی مافی ئافرەت.',
      ar: 'وجود الولي شرط أساسي لحماية وحفظ حقوق المرأة.',
      en: 'The presence of a guardian is a fundamental condition for protecting and preserving the woman\'s rights.'
    },
    hadith: {
      ar: 'أيما امرأة نكحت بغير إذن وليها فنكاحها باطل',
      ku: 'هەر ئافرەتێک بەبێ مۆڵەتی وەلی (سەرپەرشتیار) مارە ببڕدرێت، مارەبڕینەکەی پووچەڵە.',
      en: 'Whichever woman marries without the permission of her guardian, her marriage is invalid.',
      ref: 'Tirmidhi'
    },
    warning: {
      ku: 'ئاگاداری: بوونی وەلی یەکێکە لە مەرجە سەرەکییەکانی عەقدی شەرعی بۆ پاراستنی کچەکە.',
      ar: 'تنبيه: وجود الولي هو أحد الشروط الأساسية للعقد الشرعي لحماية الفتاة.',
      en: 'Warning: The presence of a guardian is one of the main conditions of the religious contract for the protection of the girl.'
    }
  },
  {
    id: 'contract_9',
    category: 'nikah',
    title: { ku: 'لێکۆڵینەوە لە زاوا', ar: 'التنقيب عن الخاطب', en: 'Vetting the Suitor' },
    description: {
      ku: 'پێویستە باوکان پێش مارەبڕین بە باشی لە ڕەوشتی زاوا بکۆڵنەوە.',
      ar: 'يجب على الآباء التحقق من خلق الخاطب وسيرته قبل العقد.',
      en: 'Fathers must verify the character and background of the suitor before the contract.'
    },
    hadith: {
      ar: 'قال علي بن أبي طالب: النكاح رقّ، فلينظر أحدكم أين يضع كريمته',
      ku: 'عەلی کوڕی ئەبو تالیب دەفەرموێت: هاوسەرگیری وەک ئەوە وایە کچەکەت بدەیتە دەست کەسێک، سەیری بکەن کچە بەڕێزەکەتان دەدەنە دەست کێ.',
      en: 'Ali ibn Abi Talib said: Marriage is bondage, so look where you place your precious [daughter].',
      ref: 'Athar'
    },
    warning: {
      ku: 'ڕێنمایی بۆ باوکان: پێش مارەبڕین بە باشی لە ڕەوشتی زاوا بکۆڵنەوە.',
      ar: 'توجيه للآباء: قبل عقد النكاح، ابحثوا وتحققوا جيداً من أخلاق الخاطب.',
      en: 'Guidance for fathers: Before the marriage contract, thoroughly investigate the suitor\'s character.'
    }
  },
  {
    id: 'contract_10',
    category: 'nikah',
    title: { ku: 'ڕاگەیاندنی هاوسەرگیری', ar: 'إشهار النكاح', en: 'Marriage Announcement' },
    description: {
      ku: 'سوننەتە هاوسەرگیری ڕابگەیەنرێت و خەڵکی پێ بزانێت.',
      ar: 'من السنة إشهار النكاح وإعلام الناس به.',
      en: 'It is Sunnah to announce the marriage and inform people about it.'
    },
    hadith: {
      ar: 'أعلنوا هذا النكاح واضربوا عليه بالدف',
      ku: 'ئەم هاوسەرگیرییە ڕابگەیەنن و (بۆ دەربڕینی خۆشی) دەف لێ بدەن.',
      en: 'Announce this marriage and beat the drums [to celebrate].',
      ref: 'Ahmad'
    },
    warning: {
      ku: 'تێبینی: مارەبڕینی نهێنی و دوور لە چاوی خەڵک پەسەند نییە؛ سوننەتە خەڵکی پێ بزانێت.',
      ar: 'ملاحظة: النكاح السري والبعيد عن أعين الناس ليس مستحباً؛ السنة هي أن يعرف الناس.',
      en: 'Note: Secret marriage and staying away from the eyes of people is not preferred; the Sunnah is that people know.'
    }
  }
];