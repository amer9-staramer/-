
export interface YouthGuidanceItem {
  id: string;
  question: { ku: string; en: string; ar: string };
  answer: { ku: string; en: string; ar: string };
  category: 'habits' | 'prayer' | 'depression' | 'social';
}

export const youthGuidance: YouthGuidanceItem[] = [
  {
    id: 'y1',
    category: 'habits',
    question: {
      ku: 'چۆن ڕزگارم بێت لە خووی خراپ؟',
      en: 'How can I get rid of bad habits?',
      ar: 'كيف أتخلص من العادات السيئة؟'
    },
    answer: {
      ku: 'تۆبەیەکی ڕاستەقینە بکە، شوێنی هاوڕێی چاک بکەوە، و هەوڵبدە کاتەکانت بە زیکر و نوێژ پڕ بکەیتەوە. وە هەمیشە دوعا بکە کە خودا یارمەتیت بدات.',
      en: 'Perform a sincere repentance, follow good companions, and try to fill your time with dhikr and prayer. Always pray to God to help you.',
      ar: 'قم بتوبة نصوح، واتبع الرفقة الصالحة، وحاول ملء وقتك بالذكر والصلاة. وادعُ الله دائماً أن يعينك.'
    }
  },
  {
    id: 'y2',
    category: 'depression',
    question: {
      ku: 'هەست بە دڵتەنگی و ناڕەحەتی دەکەم، چی بکەم؟',
      en: 'I feel sad and distressed, what should I do?',
      ar: 'أشعر بالحزن والضيق، ماذا أفعل؟'
    },
    answer: {
      ku: 'قورئان بخوێنە، چونکە خوای گەورە دەفەرموێت: (ألا بذكر الله تطمئن القلوب). هەروەها سەجدەی زۆر بەرە و لەگەڵ خودا بدوێ لە شەونوێژەکاندا.',
      en: 'Read the Quran, as God says: (Verily, in the remembrance of Allah do hearts find rest). Also, prostrate much and speak with God in the night prayers.',
      ar: 'اقرأ القرآن، لقوله تعالى: (ألا بذكر الله تطمئن القلوب). وأكثر من السجود وناجِ الله في قيام الليل.'
    }
  },
  {
    id: 'y3',
    category: 'prayer',
    question: {
      ku: 'چۆن لەسەر نوێژەکانم بەردەوام بم؟',
      en: 'How can I stay consistent with my prayers?',
      ar: 'كيف أحافظ على صلاتي بانتظام؟'
    },
    answer: {
      ku: 'کاتەکانی نوێژ بە گەورەترین کاری ڕۆژەکەت دابنێ. ئەپڵیکەیشن و ئاگادارکردنەوە بەکاربهێنە، و هەوڵبدە لە مزگەوت نوێژ بکەیت تاوەکو بێزار نەبیت.',
      en: 'Make prayer times the most important part of your day. Use apps and notifications, and try to pray in the mosque to avoid laziness.',
      ar: 'اجعل أوقات الصلاة أهم مواعيد يومك. استخدم التطبيقات والتنبيهات، وحاول الصلاة في المسجد لتتجنب الفتور.'
    }
  },
  {
    id: 'youth_1',
    category: 'social',
    question: { ku: 'هاوڕێیەتی', en: 'Friendship', ar: 'الصداقة' },
    answer: {
      ku: 'هاوڕێی باش، ئاوێنەی ڕەوشتتە؛ کەسێک هەڵبژێرە کە بەرەو چاکەت بەرێت.',
      ar: 'الصاحب الساحب، فاختر من يقودك للجنة وللطريق المستقيم.',
      en: 'A good friend is a mirror of your character; choose someone who leads you to goodness.'
    }
  },
  {
    id: 'youth_2',
    category: 'social',
    question: { ku: 'کات', en: 'Time', ar: 'الوقت' },
    answer: {
      ku: 'گەنجی هەلێکە تەنها یەکجار دێتە پێش، مەیفەوتێنە لە شتی بێ سوود.',
      ar: 'الشباب فرصة لا تتكرر، اغتنمها قبل فوات الأوان.',
      en: 'Youth is a once-in-a-lifetime opportunity; don\'t waste it on useless things.'
    }
  },
  {
    id: 'youth_3',
    category: 'social',
    question: { ku: 'سۆشیاڵ میدیا', en: 'Social Media', ar: 'وسائل التواصل الاجتماعي' },
    answer: {
      ku: 'چاوت بپارێزە لەوەی خودا حەرامی کردووە لەناو شاشەکاندا.',
      ar: 'احفظ بصرك عما حرم الله في الشاشات ومواقع التواصل.',
      en: 'Protect your eyes from what God has forbidden on screens and social media.'
    }
  },
  {
    id: 'youth_4',
    category: 'social',
    question: { ku: 'سەرکەوتن', en: 'Success', ar: 'النجاح' },
    answer: {
      ku: 'سەرکەوتن لە ژیاندا لە ڕازیبوونی دایک و باوکەوە دەست پێ دەکات.',
      ar: 'التوفيق والنجاح في الحياة يبدأ من رضا الوالدين.',
      en: 'Success in life begins with the satisfaction and prayers of your parents.'
    }
  },
  {
    id: 'youth_5',
    category: 'social',
    question: { ku: 'خوێندن', en: 'Education', ar: 'التعليم' },
    answer: {
      ku: 'زانست بەهێزترین چەکی گەنجە بۆ گۆڕینی داهاتووی.',
      ar: 'العلم هو أقوى سلاح للشاب لتغيير مستقبله.',
      en: 'Knowledge is the most powerful weapon for a youth to change their future.'
    }
  },
  {
    id: 'youth_6',
    category: 'social',
    question: { ku: 'نەفس نزمکردن', en: 'Humility', ar: 'التواضع' },
    answer: {
      ku: 'هەرکەسێک بۆ خودا خۆی بچوک بکاتەوە، خودا پلەی بەرز دەکاتەوە.',
      ar: 'من تواضع لله رفعه الله في الدنيا والآخرة.',
      en: 'Whoever humbles himself for the sake of Allah, He will exalt him.'
    }
  },
  {
    id: 'youth_7',
    category: 'habits',
    question: { ku: 'خووی خراپ', en: 'Bad Habits', ar: 'العادات السيئة' },
    answer: {
      ku: 'وازهێنان لە خوی خراپ لە گەنجیدا، گەورەترین جیهادە.',
      ar: 'ترك العادات السيئة في سن الشباب هو الجهاد الأكبر.',
      en: 'Quitting bad habits during youth is the greatest form of struggle (Jihad).'
    }
  },
  {
    id: 'youth_8',
    category: 'social',
    question: { ku: 'ڕاستگۆیی', en: 'Honesty', ar: 'الصدق' },
    answer: {
      ku: 'ڕاستگۆیی کورتترین ڕێگایە بۆ بەدەستهێنانی متمانەی خەڵک.',
      ar: 'الصدق أقصر طريق لنيل ثقة الناس واحترامهم.',
      en: 'Honesty is the shortest path to gaining people\'s trust and respect.'
    }
  },
  {
    id: 'youth_9',
    category: 'social',
    question: { ku: 'تەندروستی', en: 'Health', ar: 'الصحة' },
    answer: {
      ku: 'تەندروستیت ئەمانەتە، بە وەرزش و خواردنی چاک بیپارێزە.',
      ar: 'جسدك أمانة، فحافظ عليه بالرياضة والغذاء الصحي.',
      en: 'Your health is a trust; maintain it with exercise and healthy food.'
    }
  },
  {
    id: 'youth_10',
    category: 'social',
    question: { ku: 'توڕەیی', en: 'Anger', ar: 'الغضب' },
    answer: {
      ku: 'لە کاتی توڕەییدا، بێدەنگی و دانیشتن باشترین چارەسەرە.',
      ar: 'عند الغضب، الصمت والهدوء هما خير جواب.',
      en: 'In moments of anger, silence and staying calm are the best responses.'
    }
  },
  {
    id: 'youth_11',
    category: 'social',
    question: { ku: 'سۆز', en: 'Emotions', ar: 'العواطف' },
    answer: {
      ku: 'مەبە بە کۆیلەی سۆزە کاتییەکانت و بڕیاری هەڵە مەدە.',
      ar: 'لا تكن عبداً لمشاعرك المؤقتة وتتخذ قرارات تندم عليها.',
      en: 'Don\'t be a slave to your temporary emotions and make wrong decisions.'
    }
  },
  {
    id: 'youth_12',
    category: 'social',
    question: { ku: 'کارکردن', en: 'Hard Work', ar: 'العمل الدؤوب' },
    answer: {
      ku: 'کارکردن عیبادەتە، تەمەڵی مەکە و هەوڵی بەدەستهێنانی حەڵاڵ بدە.',
      ar: 'العمل عبادة، فلا تتكاسل واسعَ لطلب الرزق الحلال.',
      en: 'Working is worship; do not be lazy and strive for a lawful living.'
    }
  },
  {
    id: 'youth_13',
    category: 'prayer',
    question: { ku: 'نوێژ', en: 'Prayer', ar: 'الصلاة' },
    answer: {
      ku: 'نوێژەکەت مەکە بە قوربانی کاتەکانت، بەڵکو کاتەکانت بۆ نوێژ ڕێکبخە.',
      ar: 'لا تضحي بصلاتك من أجل مشاغلك، بل رتب وقتك لصلاتك.',
      en: 'Don\'t sacrifice your prayers for your tasks; arrange your time for prayer.'
    }
  },
  {
    id: 'youth_14',
    category: 'social',
    question: { ku: 'سەربەخۆیی', en: 'Independence', ar: 'الاستقلالية' },
    answer: {
      ku: 'مەکەوەرە ژێر کاریگەری قسەی نەرێنی خەڵک و بڕوات بەخۆت بێت.',
      ar: 'لا تتأثر بكلام الناس السلبي وكن واثقاً بنفسك وبمبادئك.',
      en: 'Don\'t be affected by negative opinions; stay confident in yourself.'
    }
  },
  {
    id: 'youth_15',
    category: 'social',
    question: { ku: 'داوێنپاکی', en: 'Chastity', ar: 'العفة' },
    answer: {
      ku: 'پاکی دڵ و دەروون لە پاراستنی نیگا و داوێنەوە دەست پێ دەکات.',
      ar: 'طهارة القلب تبدأ من عفة البصر والفرِج.',
      en: 'Purity of heart starts with the chastity of the gaze and soul.'
    }
  },
  {
    id: 'youth_16',
    category: 'social',
    question: { ku: 'بەخشین', en: 'Charity', ar: 'الصدقة' },
    answer: {
      ku: 'بەخشین و سەدەقە بەرەکەتی تەمەن و سامانت زیاد دەکات.',
      ar: 'الصدقة تزيد في بركة العمر والمال وتدفع البلاء.',
      en: 'Charity increases the blessing of your life and wealth.'
    }
  },
  {
    id: 'youth_17',
    category: 'social',
    question: { ku: 'خوێندنەوە', en: 'Reading', ar: 'القراءة' },
    answer: {
      ku: 'خوێندنەوە مێشک گەورە دەکات و دەرگای نوێ دەکاتەوە.',
      ar: 'القراءة تنير العقول وتفتح آفاقاً جديدة للنجاح.',
      en: 'Reading enlightens the mind and opens new doors for success.'
    }
  },
  {
    id: 'youth_18',
    category: 'social',
    question: { ku: 'پەلە نەکردن', en: 'Patience', ar: 'الصبر' },
    answer: {
      ku: 'پەلە مەکە لەوەی کە خودا بۆی نووسیویت، هەموو شتێک لە کاتی خۆیدا جوانە.',
      ar: 'لا تستعجل نصيبك، فكل شيء عند الله بميقات وقدر.',
      en: 'Don\'t rush what God has written for you; everything is beautiful in its time.'
    }
  },
  {
    id: 'youth_19',
    category: 'social',
    question: { ku: 'سوپاسگوزاری', en: 'Gratitude', ar: 'الامتنان' },
    answer: {
      ku: 'هەمیشە بڵێ (الحمدلله) لەسەر ئەو نیعمەتانەی کە پێت دراوە.',
      ar: 'قل دائماً الحمد لله على النعم التي لا تعد ولا تحصى.',
      en: 'Always say \'Alhamdulillah\' for the countless blessings you\'ve received.'
    }
  },
  {
    id: 'youth_20',
    category: 'social',
    question: { ku: 'ئامانج', en: 'Purpose', ar: 'الهدف' },
    answer: {
      ku: 'وا بژی کە هەمیشە ئامادە بیت بۆ دیدار لەگەڵ پەروەردگارت.',
      ar: 'عش حياتك وأنت مستعد للقاء ربك في أي لحظة.',
      en: 'Live your life always prepared to meet your Lord at any moment.'
    }
  }
];
