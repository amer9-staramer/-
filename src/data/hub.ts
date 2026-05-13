
export interface Miqat {
  id: string;
  name: { ku: string; ar: string; en: string };
  region: { ku: string; ar: string; en: string };
  description: { ku: string; ar: string; en: string };
}

export const miqatsData: Miqat[] = [
  {
    id: 'dhul-hulaifah',
    name: { ku: 'ذو الحليفة (آبار علي)', ar: 'ذو الحليفة (آبار علي)', en: 'Dhul Hulaifah (Abyar Ali)' },
    region: { ku: 'مەدینە', ar: 'المدينة المنورة', en: 'Madinah' },
    description: {
      ku: 'ئەمە میقاتی خەڵکی مەدینەیە و ئەو کەسانەی لەوێوە دێن.',
      ar: 'ميقات أهل المدينة المنورة ومن مر بها.',
      en: 'The Miqat for the people of Madinah and those who pass through it.'
    }
  },
  {
    id: 'al-juhfah',
    name: { ku: 'الجحفة', ar: 'الجحفة', en: 'Al-Juhfah' },
    region: { ku: 'سوریا، میسر، باکوری ئەفریقا', ar: 'الشام ومصر والمغرب', en: 'Syria, Egypt, North Africa' },
    description: {
      ku: 'ئەو کەسانەی لە ڕێگەی دەریای سوور یان باکورەوە دێن لەم خاڵەدا ئیحرام دەبەستن.',
      ar: 'ميقات أهل الشام ومصر والمغرب ومن جاء من جهتهم.',
      en: 'The Miqat for people coming from Syria, Egypt, and North Africa.'
    }
  },
  {
    id: 'qarn-al-manazil',
    name: { ku: 'قرن المنازل (السيل الكبير)', ar: 'قرن المنازل (السيل الكبير)', en: 'Qarn al-Manazil (As-Sayl al-Kabir)' },
    region: { ku: 'نەجد، ڕیاز، دەماک', ar: 'نجد والرياض ووسط الجزيرة', en: 'Najd, Riyadh, Central Region' },
    description: {
      ku: 'میقاتی خەڵکی نەجد و تائیف و ئەو کەسانەی لەو ئاراستەوە دێن.',
      ar: 'ميقات أهل نجد والطائف ومن جاء من جهتهم.',
      en: 'The Miqat for people coming from Najd, Riyadh, and Taif.'
    }
  },
  {
    id: 'yalamlam',
    name: { ku: 'يلملم (السعدية)', ar: 'يلملم (السعدية)', en: 'Yalamlam (As-Sa’diyyah)' },
    region: { ku: 'یەمەن، باشوور', ar: 'اليمن وجنوب الجزيرة', en: 'Yemen & South' },
    description: {
      ku: 'میقاتی خەڵکی یەمەن و باشووری مەککە.',
      ar: 'ميقات أهل اليمن ومن جاء من جهتهم.',
      en: 'The Miqat for people coming from Yemen and the south.'
    }
  },
  {
    id: 'dhat-irq',
    name: { ku: 'ذات عرق', ar: 'ذات عرق', en: 'Dhat Irq' },
    region: { ku: 'عێراق، ئێران، باکوور', ar: 'العراق وإيران ومن جاء من جهة المشرق', en: 'Iraq, Iran, and the East' },
    description: {
      ku: 'میقاتی خەڵکی عێراق و ئەوانەی لە باکوور و ڕۆژهەڵاتەوە دێن.',
      ar: 'ميقات أهل العراق وإيران ومن جاء من جهتهم.',
      en: 'The Miqat for people coming from Iraq, Iran, and the East.'
    }
  }
];

export const ihramClothingData = {
  men: {
    title: { ku: 'جلی ئیحرام بۆ پیاوان', ar: 'لباس الإحرام للرجال', en: 'Ihram Clothing for Men' },
    description: {
      ku: 'دوو پارچە قوماشی سپی (إزار و رداء) کە نابێت دوورمان یان دەرزی تێدا بێت. پێویستە جلی ژێرەوە و کڵاو و پێڵاوی پۆشراو لاببرێت.',
      ar: 'إزار ورداء أبيضين غير مخيطين. يجب نزع الملابس الداخلية والمخيط والعمامة.',
      en: 'Two pieces of unstitched white cloth (Izar and Rida). Underwear, hats, and stitched shoes are prohibited.'
    },
    notes: [
      { ku: 'نابێت هیچ دوورمانێکی تێدا بێت', ar: 'يجب أن يكون غير مخيط', en: 'Must be completely unstitched' },
      { ku: 'شێوازێکی سادە و بێ ڕەنگ', ar: 'أبيض وسادة', en: 'Plain white style' }
    ]
  },
  women: {
    title: { ku: 'جلی ئیحرام بۆ ئافرەتان', ar: 'لباس الإحرام للنساء', en: 'Ihram Clothing for Women' },
    description: {
      ku: 'ئافرەتان دەتوانن هەر جلێکی شەرعی و فراوان بپۆشن کە داپۆشراو بێت. جلی تایبەتیان نییە تەنها نابێت دەستکێش بپۆشن و دەموچاویان دابپۆشن (نیقاب).',
      ar: 'لباس شرعي ساتر وفضفاض. لا يوجد لباس خاص للمرأة سوى اجتناب النيقاب والقفازين.',
      en: 'Sufficiently modest and loose clothing. There is no specific uniform for women except avoiding the face veil and gloves.'
    },
    notes: [
      { ku: 'نابێت دەستکێش بپۆشرێت', ar: 'لا تلبس القفازين', en: 'No gloves should be worn' },
      { ku: 'نابێت دەموچاو دابپۆشرێت (نیقاب)', ar: 'لا تلبس النقاب', en: 'No Niqab (face veil) while in Ihram' }
    ]
  }
};

export const sacredPlaces = [
  {
    id: 'hira',
    name: {
      ku: 'ئەشکەوتی حەڕا',
      ar: 'غار حراء',
      en: 'Hira Cave'
    },
    description: {
      ku: 'ئەو شوێنەی کە یەکەم وەحی تێدا بۆ پێغەمبەر (ﷺ) دابەزی.',
      ar: 'المكان الذي نزل فيه أول وحي على النبي صلى الله عليه وسلم.',
      en: 'The place where the first revelation descended upon the Prophet (ﷺ).'
    },
    image: 'https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'thawr',
    name: {
      ku: 'ئەشکەوتی سەور',
      ar: 'غار ثور',
      en: 'Thawr Cave'
    },
    description: {
      ku: 'ئەو ئەشکەوتەی کە پێغەمبەر (ﷺ) و ئەبوبەکر تێیدا مابوونەوە لە کاتی کۆچکردندا.',
      ar: 'الغار الذي مكث فيه النبي صلى الله عليه وسلم وأبو بكر أثناء الهجرة.',
      en: 'The cave where the Prophet (ﷺ) and Abu Bakr stayed during the Hijra.'
    },
    image: 'https://images.unsplash.com/photo-1519817650390-64a93db51149?auto=format&fit=crop&q=80&w=800'
  }
];

export const ihramSteps = [
  {
    id: 1,
    title: { ku: 'پاکوخاوێنی', ar: 'الاغتسال', en: 'Purification' },
    description: { 
      ku: 'خۆشتن و بڕینی نینۆک و دەستپێکردنی ئامادەکاری.', 
      ar: 'الاغتسال وتقليم الأظافر والتطيب قبل لبس الإحرام.', 
      en: 'Bathing, clipping nails, and preparing before wearing Ihram.' 
    },
    image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 2,
    title: { ku: 'بەستنی ئیحرام', ar: 'لبس الإحرام', en: 'Wearing Ihram' },
    description: { 
      ku: 'پۆشینی دوو پارچە قوماشەکە بۆ پیاوان بە شێوەیەکی ڕێک.', 
      ar: 'لبس رداءي الإحرام الأبيضين للرجال بطريقة صحيحة.', 
      en: 'Wearing the two white Izar and Rida fabrics for men correctly.' 
    },
    image: 'https://images.unsplash.com/photo-1564769625905-50e93615e769?auto=format&fit=crop&q=80&w=800'
  }
];

export const arafahTasks = [
  { id: 1, title: { ku: 'خۆشتن و غوسڵ', ar: 'الغسل ليوم عرفة', en: 'Ghusl for Arafah' } },
  { id: 2, title: { ku: 'زۆرکردنی دوعا و پاڕانەوە', ar: 'الدعاء والابتهال', en: 'Abundant Supplication' } },
  { id: 3, title: { ku: 'خوێندنی پۆلێک لە قورئان', ar: 'قراءة القرآن', en: 'Reading Quran' } },
  { id: 4, title: { ku: 'زیکری تەهلیل (لا إله إلا الله)', ar: 'الإكثار من التهليل', en: 'Frequent Tahlil' } }
];

export const hadithTopicsData = [
  {
    id: 'work',
    title: { ku: 'کارکردن', ar: 'العمل', en: 'Work' },
    hadiths: [
      {
        id: 101,
        source: 'Bukhari',
        ar: 'ما أكل أحد طعاماً قط خيراً من أن يأكل من عمل يده، وإن نبي الله داود عليه السلام كان يأكل من عمل يده.',
        ku: 'هیچ کەسێک خواردنێکی نەخواردووە کە باشتر بێت لەوەی کە لە دەستڕەنجی خۆی بیخوات، و بەڕاستی داود پێغەمبەر (سەلامی خودای لێبێت) لە دەستڕەنجی خۆی دەیخوارد.',
        en: 'Nobody has ever eaten a better meal than that which one has earned by working with one\'s own hands. The Prophet of Allah, David, used to eat from the earnings of his manual labor.',
        explanation: {
          ku: 'ئەم فەرموودەیە جەخت لەسەر شکۆمەندی کارکردن و خواردنی حەڵاڵ دەکاتەوە.',
          ar: 'يحث الحديث على الاعتماد على النفس والعمل الشريف.',
          en: 'This hadith emphasizes the dignity of labor and self-reliance.'
        }
      }
    ]
  },
  {
    id: 'debt',
    title: { ku: 'قەرز', ar: 'الدين', en: 'Debt' },
    hadiths: [
      {
        id: 201,
        source: 'Ibn Majah',
        ar: 'من أخذ أموال الناس يريد أداءها أدى الله عنه، ومن أخذ يريد إتلافها أتلفه الله.',
        ku: 'هەرکەسێک ماڵی خەڵکی ببات (بە قەرز) و مەبەستی بێت بیگەڕێنێتەوە، ئەوا خودا بۆی دەگەڕێنێتەوە، وە هەرکەسێک بیبات و مەبەستی بێت فەوتی بکات، ئەوا خودا فەوتی دەکات.',
        en: 'Whoever takes the money of the people proposing to pay it back, Allah will pay it back on his behalf; and whoever takes it proposing to squander it, Allah will destroy him.',
        explanation: {
          ku: 'گرنگی نێت لە کاتی قەرزکردندا، و ئاگادارکردنەوە لە فەوتاندنی ماڵی خەڵکی.',
          ar: 'بيان أهمية النية الصادقة في سداد الديون والتحذير من المماطلة.',
          en: 'The importance of sincere intention in repaying debts and a warning against misappropriation.'
        }
      }
    ]
  },
  {
    id: 'honesty',
    title: { ku: 'ڕاستگۆیی', ar: 'الصدق', en: 'Honesty' },
    hadiths: [
      {
        id: 301,
        source: 'Muslim',
        ar: 'عليكم بالصدق، فإن الصدق يهدي إلى البر، وإن البر يهدي إلى الجنة.',
        ku: 'پابەندی ڕاستگۆیی بن، چونکە ڕاستگۆیی مرۆڤ بەرەو چاکە دەبات، و چاکەش بەرەو بەهەشت دەبات.',
        en: 'Stick to truthfulness, for truthfulness leads to righteousness, and righteousness leads to Paradise.',
        explanation: {
          ku: 'ڕاستگۆیی بنەمای هەموو چاکەیەکە و ڕێگەی گەیشتنە بە بەهەشت.',
          ar: 'الصدق هو أساس كل خير وطريق موصل للجنة.',
          en: 'Truthfulness is the foundation of all goodness and a path to Paradise.'
        }
      }
    ]
  },
  {
    id: 'neighbor',
    title: { ku: 'دراوسێ', ar: 'الجار', en: 'Neighbor' },
    hadiths: [
      {
        id: 401,
        source: 'Bukhari',
        ar: 'ما زال جبريل يوصيني بالجار حتى ظننت أنه سيورثه.',
        ku: 'جوبرەئیل بەردەوام وەسیەتی دراوسێی بۆ دەکردم، تا گەیشتمە ئەوەی وامزانی دراوسێ دەبێت بە وارسی دراوسێکەی.',
        en: 'Gabriel kept on recommending me about treating neighbors so well that I thought he would make them my heirs.',
        explanation: {
          ku: 'پێگەی بەرزی دراوسێ لە ئیسلامدا و گرنگی چاکەکردن لەگەڵیان.',
          ar: 'بيان عظمة حق الجار في الإسلام.',
          en: 'Highlighting the great importance of neighbors\' rights in Islam.'
        }
      }
    ]
  },
  {
    id: 'backbiting',
    title: { ku: 'غەیبەت', ar: 'الغيبة', en: 'Backbiting' },
    hadiths: [
      {
        id: 501,
        source: 'Muslim',
        ar: 'أتدرون ما الغيبة؟ ذكرك أخاك بما يكره.',
        ku: 'ئایا دەزانن غەیبەت چییە؟ ئەوەیە کە باس لە براکەت بکەیت بە شتێک کە پێی ناخۆش بێت.',
        en: 'Do you know what backbiting is? It is mentioning your brother with something he dislikes.',
        explanation: {
          ku: 'پێناسەی غەیبەت و ئاگادارکردنەوە لە باسکردنی خەڵکی لە پاش ملە.',
          ar: 'تحريم الغيبة والتحذير من آفات اللسان.',
          en: 'Prohibition of backbiting and a warning against the evils of the tongue.'
        }
      }
    ]
  },
  {
    id: 'betrayal',
    title: { ku: 'خیانەت', ar: 'الخيانة', en: 'Betrayal' },
    hadiths: [
      {
        id: 601,
        source: 'Bukhari',
        ar: 'أربع من كن فيه كان منافقاً خالصاً... إذا اؤتمن خان، وإذا حدث كذب...',
        ku: 'چوار سیفەت هەن لە هەرکەسێکدا بن مونافیقێکی تەواوە: ئەگەر متمانەی پێکرا خیانەت بکات، و کاتێک قسە بکات درۆ بکات...',
        en: 'Four traits which, if found in anyone, make him a pure hypocrite... When he is trusted, he betrays, and when he speaks, he lies...',
        explanation: {
          ku: 'خەسڵەتەکانی مونافیق و ئاماژەدان بە خیانەت وەک گەورەترین خەراپە.',
          ar: 'بيان صفات المنافقين والتحذير من خيانة الأمانة.',
          en: 'Outlining the traits of hypocrites and warning against betraying trust.'
        }
      }
    ]
  },
  {
    id: 'parents',
    title: { ku: 'دایک و باوک', ar: 'الوالدين', en: 'Parents' },
    hadiths: [
      {
        id: 701,
        source: 'Bukhari',
        ar: 'جاء رجل إلى رسول الله ﷺ فقال: يا رسول الله، من أحق الناس بحسن صحابتي؟ قال: أمك، قال: ثم من؟ قال: ثم أمك، قال: ثم من؟ قال: ثم أمك، قال: ثم من؟ قال: ثم أبوك.',
        ku: 'پیاوێک هات بۆ لای پێغەمبەر ﷺ و فەرمووی: ئەی پێغەمبەری خودا، کێ شایستەترینە بۆ ئەوەی چاکەی لەگەڵ بکەم؟ فەرمووی: دایکت، فەرمووی: پاشان کێ؟ فەرمووی: پاشان دایکت، فەرمووی: پاشان کێ؟ فەرمووی: پاشان دایکت، فەرمووی: پاشان کێ؟ فەرمووی: پاشان باوکت.',
        en: 'A man came to the Prophet ﷺ and said, "O Messenger of Allah! Who among the people is most deserving of my fine treatment?" He said, "Your mother." He said, "Then who?" He said, "Then your mother." He said, "Then who?" He said, "Then your mother." He said, "Then who?" He said, "Then your father."',
        explanation: {
          ku: 'ئەم فەرموودەیە جەخت لەسەر پلە و پایەی بەرزی دایک دەکاتەوە لە چاو باوکدا بەهۆی ئەو هەموو ئازار و ناڕەحەتییەی کە دەیبینێت.',
          ar: 'بيان فضل الأم وعظيم حقها على الأبناء.',
          en: 'Highlighting the immense rights and status of one\'s mother.'
        }
      }
    ]
  },
  {
    id: 'knowledge',
    title: { ku: 'زانست', ar: 'العلم', en: 'Knowledge' },
    hadiths: [
      {
        id: 801,
        source: 'Muslim',
        ar: 'من سلك طريقاً يلتمس فيه علماً سهل الله له به طريقاً إلى الجنة.',
        ku: 'هەر کەسێک ڕێگەیەک بگرێتە بەر بۆ بەدەستهێنانی زانست، ئەوا خودا ڕێگەیەکی بۆ بەرەو بەهەشت بۆ ئاسان دەکات.',
        en: 'Whoever follows a path in pursuit of knowledge, Allah will make easy for him a path to Paradise.',
        explanation: {
          ku: 'گەورەیی و پاداشتی گەڕان بەدوای زانستی شەرعی و بەسوود.',
          ar: 'الحث على طلب العلم وبيان أثره في دخول الجنة.',
          en: 'Encouragement to seek knowledge and its reward in the afterlife.'
        }
      }
    ]
  }
];

export interface HadithSource {
  id: string;
  name: { ku: string; ar: string; en: string };
  count: number;
}

export const hadithSourcesData: HadithSource[] = [
  { id: 'bukhari', name: { ku: 'سەحیحی بوخاری', ar: 'صحيح البخاري', en: 'Sahih Bukhari' }, count: 987 },
  { id: 'muslim', name: { ku: 'سەحیحی موسڵیم', ar: 'صحيح مسلم', en: 'Sahih Muslim' }, count: 837 },
  { id: 'ibnkhuzaymah', name: { ku: 'سەحیحی ئیبن خوزەیمە', ar: 'صحيح ابن خزيمة', en: 'Sahih Ibn Khuzaymah' }, count: 592 },
  { id: 'ibnhibban', name: { ku: 'سەحیحی ئیبن حیبان', ar: 'صحيح ابن حبان', en: 'Sahih Ibn Hibban' }, count: 1326 },
  { id: 'abudawud', name: { ku: 'سونەنی ئەبی داود', ar: 'سنن أبي داود', en: 'Sunan Abi Dawud' }, count: 870 },
  { id: 'tirmidhi', name: { ku: 'سونەنی تیرمزی', ar: 'جامع الترمذي', en: 'Sunan al-Tirmidhi' }, count: 791 },
  { id: 'nasai', name: { ku: 'سونەنی نەسائی', ar: 'سنن النسائي', en: 'Sunan al-Nasa\'i' }, count: 590 },
  { id: 'ibnmajah', name: { ku: 'سونەنی ئیبن ماجە', ar: 'سنن ابن ماجه', en: 'Sunan Ibn Majah' }, count: 870 },
];

export const haditCollectionsData = {

  nawawi: [
    {
      id: 1,
      source: 'Al-Nawawi',
      ar: 'إنما الأعمال بالنيات، وإنما لكل امرئ ما نوى، فمن كانت هجرته إلى الله ورسوله، فهجرته إلى الله ورسوله، ومن كانت هجرته لدنيا يصيبها أو امرأة ينكحها، فهجرته إلى ما هاجر إليه.',
      ku: 'بەڕاستی کارەکان تەنها بە نێتەکانەوەن، و بۆ هەر کەسێک تەنها ئەوەیە کە نێتی بۆ بردووە، هەرکەسێک کۆچەکەی بۆ لای خودا و پێغەمبەرەکەی بێت، ئەوا کۆچەکەی بۆ لای خودا و پێغەمبەرەکەی نووسراوە، وە هەرکەسێک کۆچەکەی بۆ لای دونیایەک بێت کە دەستی بکەوێت یان ئافرەتێک بێت کە مێردی پێبکات، ئەوا کۆچەکەی بۆ ئەو شتەیە کە بۆی کۆچی کردووە.',
      en: 'Actions are but by intentions, and every man shall have only that which he intended. Thus he whose migration was for Allah and His Messenger, his migration was for Allah and His Messenger, and he whose migration was to achieve some worldly benefit or to take some woman in marriage, his migration was for that for which he migrated.',
      explanation: {
        ku: 'ئەم فەرموودەیە جەخت لەسەر ئەوە دەکاتەوە کە بنەمای هەر کارێک نێتەکەیەتی، و خودای گەورە پاداشتی مرۆڤ بەپێی نێتەکەی دەداتەوە.',
        ar: 'هذا الحديث أصل عظيم من أصول الدين، وفيه بيان أن النية هي معيار الأعمال وصحتها.',
        en: 'This hadith is a great foundation of Islam, stating that intention is the criterion for the validity and reward of actions.'
      }
    },
    {
      id: 2,
      source: 'Al-Nawawi',
      ar: 'بني الإسلام على خمس: شهادة أن لا إله إلا الله، وأن محمداً رسول الله، وإقام الصلاة، وإيتاء الزكاة، وحج البيت، وصوم رمضان.',
      ku: 'ئیسلام لەسەر پێنج پایە بنیادنراوە: شایەتیدان بەوەی هیچ پەرستراوێک نییە جگە لە ئەڵڵا و موحەممەد پێغەمبەری خودایە، و ئەنجامدانی نوێژ، و دانی زەکات، و حەجی ماڵی خودا، و ڕۆژووی ڕەمەزان.',
      en: 'Islam is built upon five pillars: Testifying that there is no god but Allah and that Muhammad is the Messenger of Allah, performing prayer, paying Zakat, Hajj to the House, and fasting Ramadan.',
      explanation: {
        ku: 'ئەم فەرموودەیە پایە سەرەکی و بنەڕەتییەکانی ئیسلاممان بۆ ڕوون دەکاتەوە کە هەموو موسڵمانێک پێویستە پێیانەوە پابەند بێت.',
        ar: 'يبين هذا الحديث الأركان الخمسة التي يقوم عليها بناء الإسلام العظيم.',
        en: 'This hadith outlines the five fundamental pillars that form the foundation of Islamic practice.'
      }
    }
  ],
  riyadh: [
    {
      id: 1,
      source: 'Bukhari & Muslim',
      ar: 'التوبة هي: الندم على ما فات، والإقلاع عنه، والعزم على عدم العود إليه.',
      ku: 'تۆبە بریتییە لە: پەشیمانبوونەوە لەوەی ڕابردوو، و وازهێنان لێی، و بڕیاردان لەسەر نەگەڕانەوە بۆی.',
      en: 'Repentance is: Regret for what has passed, giving it up, and intending not to return to it.',
      explanation: {
        ku: 'تۆبە گەڕانەوەیە بۆ لای خودا بە جێهێشتنی گوناهەکان و بڕیاردان لەسەر هەنگاونان بەرەو چاکە.',
        ar: 'التوبة الصادقة تتطلب الندم والعزم على الإصلاح وعدم العودة للمعصية.',
        en: 'True repentance requires genuine regret, immediate cessation of the sin, and a firm resolve not to repeat it.'
      }
    }
  ],
  lulu: [
    {
      id: 1,
      source: 'Bukhari & Muslim',
      ar: 'الخلق كلهم عيال الله، فأحب الخلق إلى الله من أحسن إلى عياله.',
      ku: 'هەموو مەخلوقات عەیالی خودان، خۆشەویسترین کەس لای خودا ئەوەیە کە چاکە لەگەڵ مەخلوقاتەکەیدا بکات.',
      en: 'All creatures are the dependents of Allah, and the most beloved of them to Allah is the one who is best to His dependents.',
      explanation: {
        ku: 'ئەم فەرموودەیە هانمان دەدات بۆ چاکە کردن لەگەڵ هەموو مەخلوقاتی خودا چ مرۆڤ بێت یان ئاژەڵ.',
        ar: 'يحث الحديث على الإحسان إلى جميع الخلق تقرباً إلى الخالق سبحانه.',
        en: 'The hadith encourages being good to all creations as a way to get closer to Allah.'
      }
    }
  ]
};
