
export interface IntimacyStep {
  id: number;
  title: { ku: string; ar: string; en: string };
  content: { ku: string; ar: string; en: string };
  hadithOrVerse?: {
    text: { ku: string; ar: string; en: string };
    ref: string;
  };
}

export const intimacyGuideData: IntimacyStep[] = [
  {
    id: 1,
    title: { ku: 'سەرجێی وەک عیبادەت (بنەما هەستیارەکان)', ar: 'الجماع كعبادة (الأسس الحساسة)', en: 'Intimacy as Worship' },
    content: { 
      ku: 'ئیسلام سەرجێیکردن وەک کارێکی پیرۆز و عیبادەت تەماشا دەکات ئەگەر لە چوارچێوەی هاوسەرگیرییەکی حەڵاڵدا بێت. پێغەمبەر (د.خ) دەفەرموێت ئەگەر هاوسەران بە حەڵاڵی ئارەزووی خۆیان جێبەجێ بکەن، ئەوا پاداشتی خێریان بۆ دەنووسرێت (وەک سەدەقە). ئەمە نیشانەی ڕێزگرتنە لە پێداویستییە سروشتییەکانی مرۆڤ بە شێوازێکی شکۆمەندانە.',
      ar: 'ينظر الإسلام إلى الجماع كعمل مقدس وعبادة إذا كان في ظل الزواج الحلال. قال النبي ﷺ: "وفي بضع أحدكم صدقة"، وهذا يوضح أن تلبية الرغبات الفطرية في الحلال هي طريق للأجر والمثوبة.',
      en: 'Islam views intimacy as a sacred act and worship within a lawful marriage. The Prophet ﷺ said: "In the sexual act of each of you there is a charity," showing that fulfilling natural desires lawfully is a path to reward and blessing.'
    }
  },
  {
    id: 2,
    title: { ku: 'پاکوخاوێنی و خۆڕازاندنەوە', ar: 'الطهارة والتزين', en: 'Hygiene and Grooming' },
    content: {
      ku: 'پاکوخاوێنی جەستە و بەکارهێنانی بۆنی خۆش و جوانکردنی شێوە یەکێکە لە گرنگترین ئادابەکان بۆ ئەوەی هەردوولا ئارەزووی یەکتر بکەن. ئیمامی عەبدوڵای کوڕی عەباس دەفەرموێت: "من حەز دەکەم خۆم بۆ هاوسەرەکەم بڕازێنمەوە وەک چۆن ئەو بۆم دەڕازێتەوە". ئەمە بنەمای یەکەمی ئارامی و خۆشەویستی نێوان هاوسەرانە.',
      ar: 'النظافة الشخصية والتطيب والتجمل من أهم الآداب التي تزيد من المودة بين الزوجين. يقول ابن عباس: "إني لأحب أن أتزين للمرأة، كما أحب أن تتزين لي". وهذا هو أساس المودة والألفة.',
      en: 'Personal hygiene, wearing perfume, and grooming are essential etiquettes to increase affection. Ibn Abbas said: "I love to beautify myself for my wife just as I love for her to beautify herself for me." This is the foundation of peace and love between spouses.'
    }
  },
  {
    id: 3,
    title: { ku: 'شەوی یەکەم (ئادابی نوێژ و دوعا)', ar: 'ليلة الدخلة (آداب الصلاة والدعاء)', en: 'The Wedding Night (Prayer and Dua)' },
    content: {
      ku: 'لە شەوی یەکەمدا سوننەتە پێکەوە دوو ڕکات نوێژ بکەن بۆ داوای فەڕەکەت و خێر لە ژیانی نوێیاندا. پاشان پیاوەکە بەوپەڕی نەرمی دەست دەخاتە سەر نێوچەوانی ژنەکەی و دوعای خێری بۆ دەکات. پێویستە پیاو زۆر بە پشوودرێژی و ڕێزەوە مامەڵە بکات و بە قسەی ناسک و دیاری دڵەڕاوکێ و شەرمی بوکەکە بڕەوێنێتەوە.',
      ar: 'من السنة في ليلة الدخول صلاة ركعتين معاً لطلب البركة في حياتهما الجديدة. ثم يضع الزوج يده على ناصية زوجته ويدعو بالبركة. يجب على الزوج الرفق والتأني والتعامل بكرم ومودة لإزالة أي رهبة أو خجل بالكلام الطيب والهدايا.',
      en: 'It is Sunnah on the first night to pray two Rakats together to ask for blessings. Then the husband places his hand on the wife\'s forehead and prays for goodness. The husband must be patient and respectful, using kind words and gifts to ease the bride\'s anxiety and shyness.'
    }
  },
  {
    id: 4,
    title: { ku: 'دەستبازی و نەرمونیانی (المداعبة)', ar: 'المداعبة والرفق', en: 'Foreplay and Gentleness' },
    content: {
      ku: 'ئیسلام جەخت لەسەر ئەوە دەکات کە نابێت پیاو بێ پێشەکی و بە پەلە دەست بە جیماع بکات. پێویستە ماچکردن، قسەی خۆش، و دەستبازی هەبێت بۆ ئەوەی ژنەکە لە ڕووی دەروونی و جەستەییەوە بەتەواوی ئامادە بێت. ئیمامی عومەری کوڕی خەتاب دەفەرموێت: "با پیاو وەک ئاژەڵ نەکەوێتە سەر ژنەکەی، بەڵکو با قسەی خۆش و ماچی لەپێش بێت".',
      ar: 'يؤكد الإسلام على عدم العجلة في الجماع بغير مقدمات. يجب أن يسبق ذلك مداعبة بالكلام الطيب والتقبيل واللمس الحاني، ليكون كلا الطرفين مستعداً نفسياً وجسدياً. قال عمر بن الخطاب رضي الله عنه: "لا يقعن أحدكم على امرأته كما تقع البهيمة، وليكن بينهما رسول: القبلة والكلام".',
      en: 'Islam emphasizes not rushing into intimacy without preparation. Kind words, kissing, and gentle touching should precede it so that the wife is mentally and physically ready. Umar ibn al-Khattab said: "None of you should fall upon his wife like an animal, but let there be a messenger between them: kissing and words."'
    }
  },
  {
    id: 5,
    title: { ku: 'سنوورە شەرعییەکان (حەڵاڵ و حەرام)', ar: 'الحدود الشرعية (الحلال والحرام)', en: 'Sharia Boundaries (Halal and Haram)' },
    content: {
      ku: 'ڕێگەپێدراوە لە هەر بارودۆخ و شێوازێکدا بێت جیماع بکرێت بە مەرجێک تەنها لە "کۆئەندامی مێینە" بێت. حەرامە و گوناهێکی زۆر گەورەیە چوونە لا لە "دواوە - کۆم"، چونکە زیانی پزیشکی و شەرعی مەترسیداری هەیە. هەروەها سەرجێیکردن لە کاتی سووڕی مانگانەدا (حەیز) حەرامە و ڕێگری لێکراوە.',
      ar: 'يُباح الجماع في أي وضعية كانت بشرط أن يكون في "القُبُل". ويحرم تحريماً غليظاً الجماع في "الدبر" لما فيه من أضرار طبية وبدنيه ووعيد شرعي. كما يحرم الجماع تحريماً تاماً أثناء فترة الحيض.',
      en: 'Intercourse is permitted in any position as long as it is in the "vagina". Anal intercourse is strictly prohibited and is a major sin due to severe medical and religious harms. Intercourse during menstruation is also strictly forbidden.'
    }
  },
  {
    id: 6,
    title: { ku: 'ئەمانەت و نهێنییەکانی هاوسەری', ar: 'الأمانة وأسرار الزوجية', en: 'Trust and Marital Secrets' },
    content: {
      ku: 'یەکێک لە گەورەترین خیانەتەکان و گوناهەکان لای خوای گەورە ئەوەیە کە پیاو یان ژن نهێنییەکانی ژووری نوستن و وردەکارییەکانی نێوان خۆیان بۆ کەسی دەرەوە باس بکەن. ئەمە ئەمانەتێکی پیرۆزە و پێویستە هەردوولا بەوپەڕی ڕێزەوە بیپارێزن. شکۆمەندی هاوسەرگیری لەم پاراستنەدایە.',
      ar: 'من أعظم الأمانات وأخطر الخيانات عند الله أن يفشي الزوج أو الزوجة أسرار الفراش وما يدور بينهما من خصوصيات. هذه أمانة مقدسة يجب الحفاظ عليها بالصمت والستر صوناً لكرامة الأسرة واستقرارها.',
      en: 'One of the greatest trusts and gravest betrayals in the sight of Allah is for a spouse to disclose the secrets of the bedroom to others. This is a sacred trust that both must preserve with the utmost respect. The dignity of marriage lies in this protection.'
    }
  },
  {
    id: 7,
    title: { ku: 'پاکبوونەوە و تەندروستی گشتی', ar: 'الطهارة والصحة العامة', en: 'Purification and General Health' },
    content: {
      ku: 'دوای تەواوبوونی سەرجێی، پێویستە غوسڵی شەرعی (خۆشۆردن) ئەنجام بدرێت بۆ ئەوەی جەستە پاک بێتەوە بۆ عیبادەت. پزیشکی و ئیسلام کۆکن لەسەر ئەوەی سەرجێی دروست دەبێتە هۆی چالاکبوونی سووڕی خوێن و کەمبوونەوەی فشار. سوننەتە ئەگەر ویسترا دووبارە بکرێتەوە، دەستنوێژ بگرێتەوە.',
      ar: 'بعد الانتهاء من الجماع، يجب الغسل الشرعي لتطهير البدن والاستعداد للعبادات. يتفق الطب والإسلام على أن العلاقة الزوجية السوية تساعد في نشاط الدورة الدموية وتقليل التوتر. ومن السنة الوضوء إذا أراد الزوجان المعاودة.',
      en: 'After finishing intimacy, ritual bath (Ghusl) is mandatory to purify the body for worship. Medicine and Islam agree that a healthy marital relationship helps blood circulation and reduces stress. It is Sunnah to perform Wudu if the couple wishes to repeat the act.'
    }
  },
  {
    id: 8,
    title: { ku: 'کتێبە کوردییە باوەڕپێکراوەکان', ar: 'الكتب الكردية الموثوقة', en: 'Reliable Kurdish Books' },
    content: {
      ku: 'بۆ زانیاری زانستی و شەرعی قووڵتر، خوێندنەوەی ئەم کتێبانە بەسوودە:\n١. کتێبی (شەوچەرەی زاوا - تحفة العروس) کە بە وردی و ڕاشکاوی ئادابەکان ڕوون دەکاتەوە.\n٢. کتێبی (ئادابی زەفاف) نوسینی شێخ ئەلبانی (وەرگێڕدراو بۆ کوردی).\n٣. (ژیانی هاوسەری لە پەنای قورئان و سوننەتدا) کە باس لە ماف و ئەرکەکانی هەردوولا دەکات.',
      ar: 'للحصول على تفاصيل أعمق، ينصح بقراءة هذه المراجع (المترجمة أو المؤلفة بالكردية):\n١. كتاب (تحفة العروس) الذي يفصل الآداب بوضوح.\n٢. كتاب (آداب الزفاف) للشيخ الألباني.\n٣. (الحياة الزوجية في ظل الكتاب والسنة) الذي يشرح الحقوق والواجبات.',
      en: 'For deeper scientific and Sharia details, reading these books (Kurdish versions) is beneficial:\n1. Tuhfat al-Arus (The Bride\'s Gift) which details etiquettes clearly.\n2. Adab al-Zafaf by Sheikh Albani.\n3. "Marital Life in light of Quran and Sunnah" covering rights and duties.'
    }
  }
];
