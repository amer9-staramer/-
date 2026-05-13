
export interface Story {
  id: number;
  category: 'prophet' | 'companion' | 'scholar' | 'convert';
  title: { ku: string; ar: string; en: string };
  content: { ku: string; ar: string; en: string };
  moral: { ku: string; ar: string; en: string };
}

export const stories: Story[] = [
  {
    id: 1,
    category: 'prophet',
    title: { ku: 'سۆزی پێغەمبەر یوونس (س.خ)', ar: 'رحمة النبي يونس عليه السلام', en: 'The Mercy of Prophet Yunus' },
    content: {
      ku: 'پێغەمبەر یوونس (س.خ) لەناو سکی نەهەنگەکەدا مایەوە، لەو تاریکاییە قووڵەدا تەنها پەنای بۆ خودا برد و بەم زیکرە بانگی کرد: "لا إله إلا أنت سبحانك إني كنت من الظالمين". خودا دەنگی بیست و ڕزگاری کرد، ئەمە نیشانەی ئەوەیە کە هیچ کات نائومێد مەبە.',
      ar: 'بقي النبي يونس عليه السلام في بطن الحوت، وفي تلك الظلمة العميقة لجأ إلى الله وحده ونادى بذكره: "لا إله إلا أنت سبحانك إني كنت من الظالمين". فسمع الله نداءه وأنجاه، وهذا دليل على عدم اليأس أبداً.',
      en: 'Prophet Yunus (pbuh) remained in the belly of the whale. In that deep darkness, he turned to Allah alone and called out: "None has the right to be worshipped but You, glorified be You! Truly, I have been of the wrongdoers." Allah heard his cry and saved him, showing we should never despair.'
    },
    moral: {
      ku: 'زیکر و دوعا کلیلی دەرچوونە لە هەموو تەنگانەیەک.',
      ar: 'الذكر والدعاء مفتاح الخروخ من كل ضيق.',
      en: 'Dhikr and Dua are the keys to escape any hardship.'
    }
  },
  {
    id: 2,
    category: 'companion',
    title: { ku: 'ئیمان و ئازایەتی بیلال (ڕ.خ)', ar: 'إيمان وشجاعة بلال رضي الله عنه', en: 'The Faith and Courage of Bilal' },
    content: {
      ku: 'بیلال لەسەر لمی گەرمی مەککە و لەژێر بەردی قورسدا، تەنها دەیوت: "أحد.. أحد". ئەو ئامادە بوو هەموو شتێک فیدا بکات لە پێناو یەکتاپەرستی. دواتر بوو بە یەکەمین بانگدێری ئیسلام.',
      ar: 'بلال رضي الله عنه على رمال مكة الساخنة وتحت الصخور الثقيلة، كان يقول فقط: "أحد.. أحد". كان مستعداً للتضحية بكل شيء من أجل التوحيد. ثم أصبح أول مؤذن في الإسلام.',
      en: 'Bilal (ra) on the scorching sands of Mecca and under heavy stones, only said: "One.. One". He was ready to sacrifice everything for monotheism. Later, he became the first Muezzin of Islam.'
    },
    moral: {
      ku: 'ڕاستگۆیی و خۆڕاگری لەپێناو ئیماندا سەردەخات.',
      ar: 'الصدق والثبات في الإيمان يرفع صاحبه.',
      en: 'Honesty and steadfastness in faith elevates a person.'
    }
  },
  {
    id: 3,
    category: 'scholar',
    title: { ku: 'گەورەیی ئیمام بوخاری', ar: 'عظمة الإمام البخاري', en: 'The Greatness of Imam Bukhari' },
    content: {
      ku: 'ئیمام بوخاری سەدان کیلۆمەتر بە پێ دەڕۆیشت بۆ تۆمارکردنی یەک فەرموودە. ئەو هیچ فەرموودەیەکی نەدەنووسی تاوەکو دەستنوێژی نەگرتایە و دوو ڕکات نوێژی نەکردایە. ئەمەش نیشانەی ئیخڵاس و دڵسۆزییەتی لە زانستدا.',
      ar: 'كان الإمام البخاري يمشي مئات الكيلومترات لتدوين حديث واحد. لم يكن يكتب أي حديث إلا بعد الوضوء وصلاة ركعتين. وهذا دليل على إخلاصه وتفانيه في طلب العلم.',
      en: 'Imam Bukhari would walk hundreds of kilometers to record a single Hadith. He would not write any Hadith until he performed ablution and prayed two Rak\'ahs. This is an indication of his sincerity and dedication to science.'
    },
    moral: {
      ku: 'ئیخڵاس و تێکۆشان کلیلی مانەوەی کارەکانە.',
      ar: 'الإخلاص والاجتهاد مفتاح ديمومة العمل.',
      en: 'Sincerity and struggle are the keys to the permanence of work.'
    }
  },
  {
    id: 4,
    category: 'convert',
    title: { ku: 'گەڕانەوەی یوسووف ئیسلام', ar: 'قصة يوسف إسلام', en: 'The Story of Yusuf Islam' },
    content: {
      ku: 'هونەرمەند کات ستیڤنس (یوسووف ئیسلام) کاتێک لە دەریادا خەریک بوو دەخنکا، بانگی خودای کرد و وتی ئەگەر ڕزگارم بکەیت بۆت دەژیم. دواتر قورئانی بۆ دیاری هات و هەموو وەڵامەکانی تێدا دۆزییەوە.',
      ar: 'الفنان کات ستيفنز (يوسف إسلام) عندما كاد يغرق في البحر، نادى الله وقال إذا أنقذتني سأعيش لك. لاحقاً جاءه القرآن كهدية ووجد فيه كل الأجوبة.',
      en: 'The artist Cat Stevens (Yusuf Islam) when he was almost drowning in the sea, called out to God and said if you save me I will live for you. Later, the Quran came to him as a gift and he found all the answers in it.'
    },
    moral: {
        ku: 'هیدایەت دیارییەکی گەورەی خودایە بۆ ئەوانەی بەڕاستی بۆی دەگەڕێن.',
        ar: 'الهداية منة من الله لمن يطلب الحق بصدق.',
        en: 'Guidance is a great gift from God for those who truly seek Him.'
    }
  },
  {
    id: 5,
    category: 'companion',
    title: { ku: 'سۆزی عومەری کوڕی خەتاب (ڕ.خ)', ar: 'عدل عمر بن الخطاب رضي الله عنه', en: 'The Justice of Umar ibn al-Khattab' },
    content: {
      ku: 'شەوێکی درەنگ عومەری کوڕی خەتاب بە شاردا دەگەڕا، گوێی لە دەگی منداڵان بوو دەگریان. دایکەکە مەنجەڵێکی ئاوی سەر ئاگر نابوو تا منداڵەکان وابزانن خواردنە و بخەون. عومەر کاتێک ئەمەی بینی، چووە خەزێنەی دەوڵەت و خۆی فەردەیەک ئاردی خستە سەر شانی و بۆی بردن، تەنها لەبەر خاتری چاودێری ڕەعیەتەکەی.',
      ar: 'في ليلة متأخرة كان عمر بن الخطاب يتفقد المدينة، فسمع صوت أطفال يبكون. كانت الأم تضع قدراً من الماء على النار حتى يظن الأطفال أنه طعام ويناموا. عندما رأى عمر ذلك، ذهب إلى بيت المال وحمل كيس دقيق على كتفه وأخذه لهم، رعايةً لرعيته.',
      en: 'Late one night, Umar ibn al-Khattab was patrolling the city when he heard children crying. A mother had put a pot of water on the fire so the children would think it was food and go to sleep. When Umar saw this, he went to the state treasury, carried a sack of flour on his shoulder, and brought it to them, out of concern for his people.'
    },
    moral: {
      ku: 'بەرپرسیارێتی و ئەمانەت نیشانەی گەورەیی مرۆڤە.',
      ar: 'المسؤولية والأمانة دليل عظمة الإنسان.',
      en: 'Responsibility and trust are signs of human greatness.'
    }
  }
];
