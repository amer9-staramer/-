export interface SunnahPrayer {
  id: string;
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
  rakats: string;
  reward: {
    ku: string;
    ar: string;
    en: string;
  };
}

export const sunnahPrayersData: { sunnah_prayers: SunnahPrayer[] } = {
  "sunnah_prayers": [
    {
      "id": "rawatib",
      "title": {
        "ku": "سونەتی ڕواتیب (پێش و پاش فەرزەکان)",
        "ar": "السنن الرواتب",
        "en": "Rawatib Sunnahs (Before & After Fard)"
      },
      "description": {
        "ku": "ئەو نوێژە سونەتانەن کە لەگەڵ نوێژە فەرزەکاندا توند دەکرێنەوە تا کەمکوڕی نوێژە فەرزەکان پڕبکەنەوە. کاتەکانیان پێش یان پاش نوێژە فەرزەکانە.",
        "ar": "هي الصلوات النافلة التي تؤدى قبل الفرائض أو بعدها لجبر الخلل فيها وتقريب العبد من ربه.",
        "en": "The regular voluntary prayers performed before or after the obligatory (Fard) prayers to make up for any shortcomings in them."
      },
      "rakats": "12",
      "reward": {
        "ku": "دروستکردنی ماڵێک لە بەهەشتدا؛ وەک لە فەرموودەدا هاتووە: هەرکەس لە ڕۆژێک و شەوێکدا ١٢ ڕکات سونەت بکات ماڵێکی لە بەهەشت بۆ دروست دەکرێت.",
        "ar": "بناء بيت في الجنة؛ كما قال النبي ﷺ: «من صلى في يوم وليلة ثنتي عشرة ركعة بني له بيت في الجنة».",
        "en": "A house built in Paradise; as the Prophet ﷺ said: 'Whoever prays twelve Rak'ahs in a day and night, a house will be built for him in Paradise.'"
      }
    },
    {
      "id": "witr",
      "title": {
        "ku": "نوێژی وەتر",
        "ar": "صلاة الوتر",
        "en": "Witr Prayer"
      },
      "description": {
        "ku": "نوێژێکی سونەتی کاتی شەو زمانە کە گرنگییەکی زۆری هەیە. کاتەکەی لە دوای نوێژی عیشاوەیە تا پێش بانگی بەیانی.",
        "ar": "صلاة تؤدى في الليل بعد صلاة العشاء إلى طلوع الفجر، وهي من آكد السنن التي داوم عليها النبي ﷺ.",
        "en": "An odd-numbered prayer performed at night. Its time is from after Isha prayer until the break of dawn (Fajr)."
      },
      "rakats": "1 - 11",
      "reward": {
        "ku": "پەسەندترین و توندترین نوێژی سونەتە؛ خودای گەورە یەک و تاقانەیە و نوێژی تاکی (وەتر) خۆش دەوێت، و دوعای تێدا قبوڵ دەبێت.",
        "ar": "إن الله وتر يحب الوتر، وهي صلاة تمنح المسلم نوراً وتقرباً، وسأل بلال فقال: أوتروا يا أهل القرآن.",
        "en": "It is highly recommended; Allah is Single (Witr) and loves odd numbers. It serves as an extra shield of light and closeness."
      }
    },
    {
      "id": "duha",
      "title": {
        "ku": "نوێژی چێشتەنگاو (دوحا)",
        "ar": "صلاة الضحى",
        "en": "Duha Prayer (Forenoon)"
      },
      "description": {
        "ku": "نوێژی ئاوابین (تۆبەکارانە). کاتەکەی لە دوای بەرزبوونەوەی خۆر بە ئەندازەی ڕمێک (نزیکەی ١٥ خوولەک دوای خۆرهەڵاتن) دەست پێدەکات تا پێش نیوەڕۆ بە نزیکەی ١٠ خوولەک.",
        "ar": "صلاة الأوابين، ووقتها يبدأ من بعد شروق الشمس بثلث ساعة تقريباً حتى قبيل أذان الظهر بعشر دقائق.",
        "en": "Known as the prayer of the energetic (Awwabin). Its time starts about 15-20 minutes after sunrise and ends 10 minutes before Dhuhr."
      },
      "rakats": "2 - 8",
      "reward": {
        "ku": "وەک خێرکردنە بۆ سەرجەم جومگەکانی لەش (٣٦٠ جومگە)، هەروەها پاداشتی حەج و عەمرەیەکی تەواوی هەیە ئەگەر پاش زیکری بەیانی ئەنجام بدرێت.",
        "ar": "تؤدي صدقة عن كل سلامى (مفصل) من مفاصل البدن البالغ عددها ٣٦٠ مفصلاً في كل يوم.",
        "en": "Fulfils the daily charity (Sadaqah) required for all 360 joints of the human body."
      }
    },
    {
      "id": "tahajjud",
      "title": {
        "ku": "نوێژی شەو (تەهەجود)",
        "ar": "صلاة الليل (التهجد)",
        "en": "Night Prayer (Tahajjud)"
      },
      "description": {
        "ku": "نوێژکردنی شەوانەیە پاش خەوتن، و باشترین کاتی لە سێیەکی کۆتایی شەودایە کە خوای میهرەبان دادەبەزێتە ئاسمانی دنیا.",
        "ar": "الصلاة نافلة في جوف الليل بعد نومة، وأفضل وقتها هو الثلث الأخير من الليل حيث ينزل ربنا إلى السماء الدنيا.",
        "en": "A voluntary prayer performed at night, ideally after waking up from sleep and during the last third of the night."
      },
      "rakats": "2 - 11",
      "reward": {
        "ku": "باشترین نوێژە لە دوای نوێژە فەرزەکان؛ سەرچاوەی نووری دەموچاو، سەرفرازی موسڵمان، و کاتی وەڵامدانەوەی خێرای پاڕانەوەکانە.",
        "ar": "أفضل الصلاة بعد المكتوبة صلاة الليل، وهي شرف المؤمن، ومطردة للداء عن الجسد، ومقربة للرحمة.",
        "en": "The best of all voluntary prayers after the obligatory ones. Praise of the righteous, a source of light, and highly answered prayers."
      }
    },
    {
      "id": "asr_sunnah",
      "title": {
        "ku": "سونەتی پێش عەسر",
        "ar": "سنة العصر غير المؤكدة",
        "en": "Asr Sunnah"
      },
      "description": {
        "ku": "نوێژێکی سونەتی غەیری موئەکەدە (توندنەکراوە) لە پێش نوێژی فەرزی عەسر ئەنجام دەدرێت.",
        "ar": "سنة مستحبة غير مؤكدة تؤدى قبل صلاة العصر فريضةً.",
        "en": "A highly recommended non-emphasized Sunnah prayer performed before the obligatory Asr prayer."
      },
      "rakats": "2 - 4",
      "reward": {
        "ku": "بەدەستهێنانی ڕەحمەتی تایبەتی خودا؛ وەک پێغەمبەر ﷺ دەفەرموێت: ڕەحمەتی خودا لەو کەسە بێت کە پێش نوێژی عەسر چوار ڕکات دەکات.",
        "ar": "نيل رحمة الله الخاصة؛ لقول النبي ﷺ: «رحم الله امرأً صلى قبل العصر أربعاً».",
        "en": "Earning Allah's mercy; the Prophet ﷺ said: 'May Allah show mercy to someone who prays four Rak'ahs before Asr.'"
      }
    },
    {
      "id": "tahiyyat_masjid",
      "title": {
        "ku": "تەحیەی مزگەوت",
        "ar": "تحية المسجد",
        "en": "Tahiyyat al-Masjid"
      },
      "description": {
        "ku": "نوێژێکە سونەتە بۆ هەر موسڵمانێک کاتێک دەچێتە ناو مزگەوت پێش ئەوەی دابنیشێت ئەنجامی بدات.",
        "ar": "ركعتان يسن للمسلم أن يصليهما إذا دخل المسجد في أي وقت يريد الجلوس فيه.",
        "en": "A two-Rak'ah prayer performed upon entering the mosque as a sign of respect before sitting down."
      },
      "rakats": "2",
      "reward": {
        "ku": "ڕێزگرتن و بەگەورەگرتنی ماڵی خودا، هەروەها نیشانەی زیندووێتی بەستنەوەی دڵە بە مزگەوتەوە و نووسینی پاداشتی گەورە.",
        "ar": "تعظيم لبيوت الله تعالى وتعميرها، ونيل الأجر والثواب ورفع الدرجات عند الدخول إليها.",
        "en": "Venerating and honoring the houses of Allah, achieving massive rewards, and elevation in spiritual ranks."
      }
    },
    {
      "id": "wudu_sunnah",
      "title": {
        "ku": "نوێژی دوای دەستنوێژ",
        "ar": "سنة الوضوء",
        "en": "Prayer after Ablution (Sunnah of Wudu)"
      },
      "description": {
        "ku": "نوێژێکی دوو ڕکاتییە کە سونەتە یەکسەر دوای تەواو بوون و وشک کردنەوەی دەستنوێژ بەبێ خوولانەوە بە کاری ترەوە ئەنجام بدرێت.",
        "ar": "صلاة ركعتين عقب الفراغ من الوضوء مباشرة قبل أن يطول الفصل ببقية شؤون الدنيا.",
        "en": "Two Rak'ahs of prayer recommended immediately after completing Wudu (ablution)."
      },
      "rakats": "2",
      "reward": {
        "ku": "مایەی چوونە بەهەشتە؛ وەک لە فەرموودەی بیلالدا هاتووە کە بەهۆکارەکەی پێغەمبەر ﷺ دەنگی پێڵاوەکانی لە بەهەشت لە پێش خۆیەوە دەبیست.",
        "ar": "سبب لوجوب الجنة؛ كما ثبت في قصة بلال رضي الله عنه مع الرسول ﷺ وسماع دف نعليه في الجنة.",
        "en": "A guarantee for Paradise; as proven in the Sahih conversation with Bilal, whose footsteps were heard by the Prophet ﷺ in Paradise."
      }
    }
  ]
};
