export interface HajjUmrahStep {
  id: number;
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
  dua?: {
    ar: string;
    ku: string;
    en: string;
  };
  hadith?: {
    ar: string;
    ku: string;
    en?: string;
  };
  mistakes?: {
    ku: string;
    ar: string;
    en: string;
  };
  sunnah?: {
    ku: string;
    ar: string;
    en?: string;
  };
  womenNotes?: {
    ku: string;
    ar: string;
    en: string;
  };
  menNotes?: {
    ku: string;
    ar: string;
    en: string;
  };
  imagePrompt?: string;
}

export const umrahSteps: HajjUmrahStep[] = [
  {
    id: 1,
    title: {
      ku: 'ئیحرام و دەسپێک لە ماڵەوە',
      ar: 'الإحرام والبداية من البيت',
      en: 'Ihram and Starting from Home'
    },
    description: {
      ku: 'پێش ئەوەی لە ماڵ دەرچیت، خۆت پاک بکەرەوە (خۆشتن، بڕینی نینۆک). پاشان پۆشینی جلی ئیحرام و کردنی دوو ڕکات نوێژی سوننەتی ئیحرام.',
      ar: 'قبل مغادرة البيت، الاغتسال وقص الأظافر ولبس ملابس الإحرام وصلاة ركعتين سنة الإحرام.',
      en: 'Before leaving home, perform Ghusl, clip nails, put on Ihram garments, and pray two rak\'ahs of Sunnah for Ihram.'
    },
    dua: {
      ar: 'لَبَّيْكَ اللَّهُمَّ عُمْرَةً',
      ku: 'خودایە هاتم بەدەم بانگەوازەکەتەوە بۆ ئەنجامدانی عەمرە.',
      en: 'Labbayk Allahumma Umrah (O Allah, here I am for Umrah).'
    },
    sunnah: {
      ar: 'كان النبي ﷺ يغتسل لإحرامه',
      ku: 'پێغەمبەر ﷺ پێش ئیحرام پۆشین خۆی دەشوشت.'
    },
    mistakes: {
      ku: 'هەڵەیە پۆشینی جلی ژێرەوە یان کڵاو بۆ پیاوان دوای هێشتنی نێتی ئیحرام.',
      ar: 'من الأخطاء لبس الملابس الداخلية أو القبعة للرجال بعد نية الإحرام.',
      en: 'It is a mistake for men to wear underwear or hats after making the intention for Ihram.'
    },
    womenNotes: {
      ku: 'ئافرەتان جلی تایبەتی ئیحرامیان نییە، هەر جلێکی شەرعی و فراوان و داپۆشراو بێت دەبێت، تەنها نابێت دەستکێش بپۆشن و دەموچاویان دابپۆشن (نیقاب).',
      ar: 'المرأة ليس لها لباس خاص للإحرام، تلبس ما شاءت من الثياب الساترة، وتجتنب لبس القفازين والنيقاب.',
      en: 'Women do not have a specific Ihram garment; they can wear any modest, loose clothing. They should avoid wearing gloves or a face veil (Niqab).'
    },
    menNotes: {
      ku: 'پیاوان پێویستە جلی ئیحرام بپۆشن (دوو پارچە قوماشی سپی بێ دەرزی و بێ دوورمان). تەنها لەم کاتەدا نابێت جلی ژێرەوە و کڵاو و پێڵاوی پۆشراو بەکاربهێنن.',
      ar: 'يجب على الرجال لبس إزار ورداء أبيضين غير مخيطين، ويحرم عليهم لبس الملابس الداخلية والمخيط والعمامة.',
      en: 'Men must wear two pieces of unstitched white cloth. They are prohibited from wearing underwear, hats, or stitched clothing.'
    }
  },
  {
    id: 2,
    title: {
      ku: 'تەلبیە لە ڕێگا',
      ar: 'التلبية في الطريق',
      en: 'Talbiyah on the way'
    },
    description: {
      ku: 'لە کاتی بەڕێکەوتن بەرەو مەککە، بەدەنگی بەرز (بۆ پیاوان) تەلبیە دەخوێنرێت تا گەیشتن بە کەعبە.',
      ar: 'الجهر بالتلبية أثناء الطريق إلى مكة حتى رؤية الكعبة.',
      en: 'Reciting Talbiyah out loud (for men) on the way to Mecca until reaching the Kaaba.'
    },
    dua: {
      ar: 'لَبَّيْكَ اللَّهُمَّ لَبَّيْكَ، لَبَّيْكَ لاَ شَرِيكَ لَكَ لَبَّيْكَ، إِنَّ الْحَمْدَ وَالنِّعْمَةَ لَكَ وَالْمُلْكَ، لاَ شَرِيكَ لَكَ',
      ku: 'بەڵێ خودایە من هاتووم، هیچ هاوبەشێکت نییە، سوپاس و چاکە و پاشایەتی هەر بۆ تۆیە.',
      en: 'Here I am, O Allah, here I am. Here I am, You have no partner... Indeed, all praise, grace, and sovereignty belong to You.'
    },
    mistakes: {
      ku: 'بێدەنگ بوون و خەریک بوون بە کار و قسەی لاوەکی لە جیاتی تەلبیە.',
      ar: 'السكوت والاشتغال بالحديث الجانبي بدلاً من التلبية.',
      en: 'Staying silent or engaging in side talk instead of reciting Talbiyah.'
    },
    menNotes: {
      ku: 'پیاوان پێویستە تەلبیە بە دەنگی بەرز بخوێنن.',
      ar: 'يُسن للرجال الجهر بالتلبية.',
      en: 'Men should recite Talbiyah loudly.'
    },
    womenNotes: {
      ku: 'ئافرەتان تەلبیە بە دەنگی نزم دەخوێنن بە شێوەیەک تەنها خۆیان بیبستن.',
      ar: 'تخفض المرأة صوتها بالتلبية بحيث تسمع نفسها فقط.',
      en: 'Women should lower their voice when reciting Talbiyah, just enough to hear themselves.'
    }
  },
  {
    id: 3,
    title: {
      ku: 'چوونە ناو مزگەوتی حەرام',
      ar: 'دخول المسجد الحرام',
      en: 'Entering Masjid al-Haram'
    },
    description: {
      ku: 'بە پێی ڕاست دەچیتە ژوورەوە و دوعای چوونە ناو مزگەوت دەخوێنیت.',
      ar: 'الدخول بالقدم اليمنى وقراءة دعاء دخول المسجد.',
      en: 'Enter with the right foot and recite the supplication for entering the mosque.'
    },
    dua: {
      ar: 'اللَّهُمَّ افْتَحْ لِي أَبْوَابَ رَحْمَتِكَ',
      ku: 'خودایە دەرگاکانی ڕەحمەتی خۆتم بۆ بکەرەوە.',
      en: 'O Allah, open for me the doors of Your mercy.'
    },
    sunnah: {
      ar: 'كان النبي ﷺ إذا دخل المسجد قال: بسم الله والصلاة على رسول الله',
      ku: 'پێغەمبەر ﷺ کاتێک دەچووە مزگەوت دەیفەرموو: بەناوی خودا و دروود بۆ پێغەمبەر.'
    }
  },
  {
    id: 4,
    title: {
      ku: 'تەوافی عەمرە',
      ar: 'طواف العمرة',
      en: 'Tawaf of Umrah'
    },
    description: {
      ku: 'حەوت جار بەدەوری کەعبەدا دەسوڕێیتەوە. لە بەردە ڕەشەکەوە دەست پێ دەکات و هەر لەوێ کۆتایی دێت.',
      ar: 'الطواف حول الكعبة سبعة أشواط تبدأ وتنتهي عند الحجر الأسود.',
      en: 'Circling the Kaaba seven times starting and ending at the Black Stone.'
    },
    hadith: {
      ar: 'الطواف بالبيت صلاة، إلا أن الله تعالى أحل فيه الكلام',
      ku: 'تەواف وەک نوێژ وایە، تەنها ئەوە نەبێت کە خودا قسەکردنی تێدا حەڵاڵ کردووە.'
    },
    dua: {
      ar: 'رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ',
      ku: 'ئەم زیکرە لە نێوان ڕوکنی یەمانی و بەردە ڕەشەکە دەخوێنرێت.',
      en: 'Our Lord, give us in this world [that which is] good and in the Hereafter [that which is] good...'
    },
    mistakes: {
      ku: 'پاڵنانی خەڵک و هاوارکردن لە کاتی تەوافدا.',
      ar: 'تدافع الناس والمزاحمة الشديدة والصراخ أثناء الطواف.',
      en: 'Pushing people, intense overcrowding, and shouting during Tawaf.'
    },
    menNotes: {
      ku: 'سوننەتە بۆ پیاوان لە سێ خوولی یەکەمدا (ڕەمەل) بکەن، واتە بە خێرایی بڕۆن بە هەنگاوی کورت. هەروەها (ئیزتیباع) بکەن، واتە شانی ڕاستی تەک بێت لە جلی ئیحرامدا.',
      ar: 'يُسن للرجال الرمل (إسراع المشي مع تقارب الخطى) في الأشواط الثلاثة الأولى، والاضطباع (كشف الكتف الأيمن).',
      en: 'Men are encouraged to perform Ramal (fast walking with small steps) in the first three rounds, and Idtiba (uncovering the right shoulder).'
    },
    womenNotes: {
      ku: 'ئافرەتان ڕەکردن و ڕەمەڵیان نییە، بەڵکو بە هێواشی و بە ئاسایی تەواف دەکەن و شانیان داناپۆشن (وەک پیاوان نین).',
      ar: 'المرأة ليس عليها رمل ولا اضطباع، بل تمشي مشياً عادياً.',
      en: 'Women do not perform Ramal or Idtiba; they walk normally.'
    }
  },
  {
    id: 5,
    title: {
      ku: 'نوێژی تەواف و ئاوی زەمزەم',
      ar: 'صلاة الطواف وماء زمزم',
      en: 'Tawaf Prayer & Zamzam'
    },
    description: {
      ku: 'دوای تەواف دوو ڕکات نوێژ لە پشت مەقامی ئیبراهیم دەکەیت، پاشان ئاوی زەمزەم دەخۆیتەوە.',
      ar: 'صلاة ركعتين خلف مقام إبراهيم ثم الشرب من ماء زمزم.',
      en: 'Praying two rak\'ahs behind Maqam Ibrahim, then drinking Zamzam water.'
    },
    sunnah: {
      ar: 'شرب النبي ﷺ من زمزم وهو قائم',
      ku: 'پێغەمبەر ﷺ لە ئاوی زەمزەمی خواردەوە.'
    }
  },
  {
    id: 6,
    title: {
      ku: 'سەعی سەفا و مەروە',
      ar: 'السعي بين الصفا والمروة',
      en: 'Sa\'i (Safa & Marwa)'
    },
    description: {
      ku: 'حەوت جار هاتووچۆ لە نێوان گردی سەفا و مەروە. لە سەفاوە دەست پێ دەکات و لە مەروە کۆتایی دێت.',
      ar: 'المشي بين الصفا والمروة سبعة أشواط يبدأ من الصفا وينتهي في المروة.',
      en: 'Walking between Safa and Marwa seven times, starting from Safa and ending at Marwa.'
    },
    mistakes: {
      ku: 'ڕاکردن لە هەموو مەودای نێوان سەفا و مەروەدا. تەنها لە نێوان دوو نیشانە سەوزەکەدا ڕادەکرێت.',
      ar: 'الجري في كامل المسافة بين الصفا والمروة، والصحيح الجري فقط بين العلمين الأخضرين.',
      en: 'Running the entire distance between Safa and Marwa. It is only Sunnah to run between the two green markers.'
    },
    womenNotes: {
      ku: 'ئافرەتان لە نێوان نیشانە سەوزەکاندا ڕاناکەن (هەروەڵە ناکەن)، بەڵکو بە ئاسایی دەڕۆن.',
      ar: 'المرأة لا تسعى سعياً شديداً (الهرولة) بين العلمين الأخضرين، بل تمشي مشياً عادياً.',
      en: 'Women do not perform the rapid walk (Harwalah) between the green markers; they walk normally.'
    },
    menNotes: {
      ku: 'سوننەتە بۆ پیاوان لە نێوان دوو نیشانە سەوزەکەدا بە خێرایی بڕۆن (هەروەڵە).',
      ar: 'يُسن للرجال الهرولة بين العلمين الأخضرين.',
      en: 'It is Sunnah for men to jog (Harwalah) between the two green markers.'
    }
  },
  {
    id: 7,
    title: {
      ku: 'تاشین و گەڕانەوە',
      ar: 'الحلق والرجوع',
      en: 'Shaving and Returning'
    },
    description: {
      ku: 'تاشینی سەر یان کورتکردنەوەی قژ و پاشان سوپاسگوزاری خودا و گەڕانەوە بۆ ماڵەوە بە پاکی.',
      ar: 'الحلق أو التقصير ثم حمد الله والرجوع إلى البيت طاهراً.',
      en: 'Shaving or cutting the hair, then praising Allah and returning home purified.'
    },
    menNotes: {
      ku: 'بۆ پیاوان تاشینی هەموو سەر باشترە، بەڵام دەکرێت کورت بکرێتەوە.',
      ar: 'الحلق أفضل للرجال ويجوز التقصير.',
      en: 'Shaving the head is better for men, but shortening is permitted.'
    },
    womenNotes: {
      ku: 'ئافرەتان تەنها بەقەد سەرە پەنجەیەک (٢سم) لە قژیان دەبڕن و سەریان ناتاشن.',
      ar: 'المرأة تقصر من أطراف شعرها قدر أنملة (نحو 2 سم) ولا تحلق رأسها.',
      en: 'Women only cut a small amount of their hair (about 2cm) and do not shave their heads.'
    }
  }
];

export const hajjStepsExtended: HajjUmrahStep[] = [
  {
    id: 1,
    title: {
      ku: 'ڕۆژی تەرویە (٨ی زیلحیجە)',
      ar: 'يوم التروية',
      en: 'Day of Tarwiyah'
    },
    description: {
      ku: 'حاجیان لە مەککەوە ئیحرام دەپۆشن بۆ حەج و دەچنە مینا، لەوێ نوێژەکان لە کاتی خۆیاندا بە کورتکراوەیی ئەنجام دەدەن.',
      ar: 'الإحرام للحج والتوجه إلى منى والمبيت فيها.',
      en: 'Entering Ihram for Hajj and going to Mina to spend the day and night there.'
    },
    sunnah: {
      ar: 'نزل النبي ﷺ بمنى وصلى بها الظهر والعصر والمغرب والعشاء والفجر',
      ku: 'پێغەمبەر ﷺ لە مینا دابەزین و نوێژەکانی نیوەڕۆ و عەسر و مەغریب و عیشا و بەیانی تێدا ئەنجامدا.'
    }
  },
  {
    id: 2,
    title: {
      ku: 'ڕۆژی عەرەفە (٩ی زیلحیجە)',
      ar: 'يوم عرفة',
      en: 'Day of Arafah'
    },
    description: {
      ku: 'گەورەترین ڕوکنە. دوای خۆرهەڵاتن بەرەو عەرەفە دەچن، تا خۆرئاوابوون لەوێ خەریکی زیكر و دوعا دەبن.',
      ar: 'الوقوف بعرفة هو ركن الحج الأعظم.',
      en: 'Standing at Arafah, the most important pillar of Hajj.'
    },
    dua: {
      ar: 'لا إِلَهَ إِلا اللَّهُ وَحْدَهُ لا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ',
      ku: 'باشترین دوعا لە عەرەفەدا ئەم دوعایەیە.',
      en: 'There is no deity except Allah alone, He has no partner...'
    },
    mistakes: {
      ku: 'دەرچوون لە عەرەفە پێش ئاوابوونی خۆر.',
      ar: 'الخروج من عرفة قبل غروب الشمس.',
      en: 'Leaving Arafah before sunset.'
    }
  },
  {
    id: 3,
    title: {
      ku: 'موزدەلیفە',
      ar: 'مزدلفة',
      en: 'Muzdalifah'
    },
    description: {
      ku: 'دوای خۆرئاوابوونی ڕۆژی عەرەفە، حاجیان بەرەو موزدەلیفە دەچن و شەو لەوێ دەمێننەوە.',
      ar: 'التوجه إلى مزدلفة بعد غروب شمس عرفة والمبيت فيها.',
      en: 'Heading to Muzdalifah after sunset in Arafah and spending the night there.'
    }
  },
  {
    id: 4,
    title: {
      ku: 'ڕۆژی جەژن و ڕەجم',
      ar: 'يوم العيد والرمي',
      en: 'Day of Eid and Stoning'
    },
    description: {
      ku: 'ڕەجم کردنی جەمرەی عەقەبە، قوربانی کردن، و تەوافی ئیفازە.',
      ar: 'رمي جمرة العقبة، النحر، وطواف الإفاضة.',
      en: 'Stoning Jamrat al-Aqabah, sacrificing, and performing Tawaf al-Ifadah.'
    },
    mistakes: {
      ku: 'بەرد هاویشتن بە توندوتیژی یان هاویشتنی پێڵاو و شتی تر لە جیاتی بەرد.',
      ar: 'رمي الجمرات بعنف أو رمي الأحذية والأشياء الأخرى بدلاً من الحصى.',
      en: 'Stoning with violence or throwing shoes and other objects instead of pebbles.'
    },
    womenNotes: {
      ku: 'باشتروایە ئافرەتان کاتێک جەمرە بکەن کە قەرەباڵغی کەمتر بێت، وەک شەو یان کاتە ئارامەکان.',
      ar: 'يفضل للنساء رمي الجمرات في الأوقات التي يقل فيها الزحام، مثل الليل.',
      en: 'It is preferable for women to perform the stoning during times of less crowding, such as at night.'
    },
    menNotes: {
      ku: 'پیاوان دەتوانن لە هەر کاتێکدا ڕەجم بکەن، بەڵام پێویستە ئاگاداری قەرەباڵغی بن.',
      ar: 'يجوز للرجال الرمي في أي وقت مع مراعاة الزحام.',
      en: 'Men can perform stoning at any time, keeping safety and crowding in mind.'
    }
  },
  {
    id: 5,
    title: {
      ku: 'تەوافی ماڵئاوایی و گەڕانەوە',
      ar: 'طواف الوداع والرجوع',
      en: 'Farewell Tawaf and Returning'
    },
    description: {
      ku: 'دوای تەواوکردنی هەموو کارەکان، تەوافی ماڵئاوایی دەکرێت و بە دڵێکی پڕ لە ئیمانەوە دەگەڕێیتەوە ماڵەوە.',
      ar: 'طواف الوداع قبل مغادرة مكة والرجوع إلى الأهل.',
      en: 'Performing the Farewell Tawaf before leaving Mecca and returning home.'
    },
    sunnah: {
      ar: 'جعل النبي ﷺ آخر عهده بالبيت الطواف',
      ku: 'پێغەمبەر ﷺ دوایین کاری لە مەککەدا بریتی بوو لە تەوافی ماڵئاوایی.'
    }
  }
];

export const hajjVirtues = [
  {
    ar: "الْحَجُّ الْمَبْرُورُ لَيْسَ لَهُ جَزَاءٌ إِلاَّ الْجَنَّةُ",
    ku: "حەجی قبوڵکراو هیچ پاداشتێکی نییە بێجگە لە بەهەشت.",
    en: "An accepted Hajj has no reward except Paradise.",
    ref: "Bukhari & Muslim"
  },
  {
    ar: "مَنْ حَجَّ لِلَّهِ فَلَمْ يَرْفُثْ وَلَمْ يَفْسُقْ رَجَعَ كَيَوْمِ وَلَدَتْهُ أُمُّهُ",
    ku: "هەرکەسێک بۆ خودا حەج بکات و تووشی قسەی خراپ و گوناهـ نەبێت، دەگەڕێتەوە وەک ئەو ڕۆژەی کە دایکی بوویەتی (بێ گوناهـ).",
    en: "Whoever performs Hajj for Allah's sake... he will return as if he were born anew.",
    ref: "Bukhari"
  }
];

export const umrahVirtues = [
  {
    ar: "الْعُمْرَةُ إِلَى الْعُمْرَةِ كَفَّارَةٌ لِمَا بَيْنَهُمَا",
    ku: "عەمرە بۆ عەمرە دەبێتە کەفارەتی گوناهەکانی نێوانیان.",
    en: "An Umrah to an Umrah is an expiation for whatever sins come between them.",
    ref: "Bukhari & Muslim"
  }
];

export const commonHajjMistakes = [
  {
    mistake: {
      ku: 'پۆشینی پارچە جلێکی دوراو لەژێر ئیحرامەوە (بۆ پیاوان).',
      ar: 'لبس ملابس مخيطة تحت الإحرام (للرجال).',
      en: 'Wearing stitched garments under Ihram (for men).'
    },
    correction: {
      ku: 'پێویستە پیاوان هیچ جۆرە جلێکی دوراو نەپۆشن لەژێر ئیحرامەوە، تەنها دوو پارچە قوماشەکە.',
      ar: 'يجب على الرجال عدم لبس أي ملابس مخيطة، فقط قطعتي الإحرام.',
      en: 'Men must not wear any stitched clothing, only the two pieces of Ihram fabric.'
    }
  },
  {
    mistake: {
      ku: 'بەرزکردنەوەی دەستەکان لە کاتی تەواوکردنی هەر خوولێکی تەوافدا (وەک کاتی نوێژ).',
      ar: 'رفع اليدين عند بدء كل شوط (كالتكبير في الصلاة).',
      en: 'Raising hands like Takbir in prayer at the start of each Tawaf round.'
    },
    correction: {
      ku: 'تەنها دەست ڕادەوەشێنرێت بەرەو بەردە ڕەشەکە و دەوترێت (الله أكبر) بێ ئەوەی دەستەکان بەرز بکرێنەوە.',
      ar: 'الإشارة باليد اليمنى فقط نحو الحجر الأسود مع التكبير دون رفعهما كما في الصلاة.',
      en: 'Just point the right hand towards the Black Stone and say "Allahu Akbar" without raising both hands.'
    }
  },
  {
    mistake: {
      ku: 'پاڵنانی خەڵک و ئازاردانی حاجیانی تر بۆ ماچکردنی بەردە ڕەشەکە.',
      ar: 'تدافع الناس وإيذاء الآخرين من أجل تقبيل الحجر الأسود.',
      en: 'Pushing people and harming others to kiss the Black Stone.'
    },
    correction: {
      ku: 'ماچکردنی بەردە ڕەشەکە سوننەتە، بەڵام ئازارنەدانی خەڵک فەرزە. ئەگەر قەرەباڵغ بوو تەنها ئاماژەی بۆ بکە.',
      ar: 'تقبيل الحجر سنة، وعدم إيذاء المسلم واجب. إذا كان الزحام شديداً فيكفي الإشارة.',
      en: 'Kissing the Black Stone is Sunnah, but not harming others is mandatory. If crowded, just point to it.'
    }
  },
  {
    mistake: {
      ku: 'ڕاکردن لە هەموو مەودای سەعی نێوان سەفا و مەروە.',
      ar: 'الجري (الهرولة) في كامل المسافة بين الصفا والمروة.',
      en: 'Running/jogging the entire distance between Safa and Marwa.'
    },
    correction: {
      ku: 'تەنها لە نێوان دوو نیشانە سەوزەکەدا (بۆ پیاوان) ڕادەکرێت، شوێنەکانی تر بە ئاسایی دەڕۆیت.',
      ar: 'الهرولة تكون فقط بين العلمين الأخضرين (للرجال فقط)، وباقي المسافة مشي عادي.',
      en: 'The light jog is only between the two green markers (for men only); walk normally elsewhere.'
    }
  },
  {
    mistake: {
      ku: 'دەرچوون لە کێوی عەرەفە پێش ئاوابوونی خۆر.',
      ar: 'الخروج من عرفة قبل غروب الشمس.',
      en: 'Leaving Arafah before sunset.'
    },
    correction: {
      ku: 'واجبە لە عەرەفەدا بمێنیتەوە تا بەیەکجاری خۆر ئاوا دەبێت، پاشان بەرەو موزدەلیفە بەڕێ بکەویت.',
      ar: 'يجب البقاء في عرفة حتى غروب الشمس بالكامل، ثم التوجه إلى مزدلفة.',
      en: 'It is mandatory to stay in Arafah until sunset, then head to Muzdalifah.'
    }
  }
];

export const tawafDhikrs = [
  {
    round: 1,
    dhikr: {
      ar: 'سُبْحَانَ اللهِ، وَالْحَمْدُ للهِ، وَلَا إِلَهَ إِلَّا اللهُ، وَاللهُ أَكْبَرُ',
      ku: 'خودایە تۆ پاک و بێگەردیت، سوپاس بۆ تۆیە، هیچ پەرستراوێک نییە شایەنی پەرستن بێت جگە لە تۆ.',
      en: 'Glory be to Allah, praise be to Allah, there is no god but Allah, and Allah is the Greatest.'
    }
  },
  {
    round: 2,
    dhikr: {
      ar: 'لَا إِلَهَ إِلَّا اللهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ، وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ',
      ku: 'هیچ پەرستراوێک نییە شایەنی پەرستن بێت جگە لە خودای تاقانە، هیچ هاوبەشێکی نییە.',
      en: 'There is no god but Allah alone, He has no partner, to Him belongs dominion and praise.'
    }
  },
  {
    round: 3,
    dhikr: {
      ar: 'رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ',
      ku: 'پەروەردگارمان، لە دونیا و قیامەتیشدا خێر و چاکەمان پێ ببەخشە و لە ئاگری دۆزەخ بمانپارێزە.',
      en: 'Our Lord, give us in this world [that which is] good and in the Hereafter [that which is] good.'
    }
  },
  {
    round: 4,
    dhikr: {
      ar: 'اللَّهُمَّ إِنِّي أَسْأَلُكَ الْعَفْوَ وَالْعَافِيَةَ فِي الدُّنْيَا وَالْآخِرَةِ',
      ku: 'خودایە، داوای لێبوردن و لەشساغی و ئارامیت لێ دەکەم لە دونیا و قیامەتدا.',
      en: 'O Allah, I ask You for forgiveness and well-being in this world and the Hereafter.'
    }
  },
  {
    round: 5,
    dhikr: {
      ar: 'اللَّهُمَّ ارْحَمْنِي وَاغْفِرْ لِي وَاهْدِنِي وَارْزُقْنِي',
      ku: 'خودایە ڕەحمەم پێ بکە و لێم خۆشبە و شارەزام بکە و ڕزق و ڕۆزیم بدە.',
      en: 'O Allah, have mercy on me, forgive me, guide me, and provide for me.'
    }
  },
  {
    round: 6,
    dhikr: {
      ar: 'أَسْتَغْفِرُ اللهَ الْعَظِيمَ الَّذِي لَا إِلَهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ وَأَتُوبُ إِلَيْهِ',
      ku: 'داوای لێبوردن لە خودای گەورە دەکەم کە هیچ پەرستراوێک نییە جگە لەو، زیندووە و ڕاگەرە.',
      en: 'I seek forgiveness from Allah the Almighty, besides whom there is no god, the Ever-Living.'
    }
  },
  {
    round: 7,
    dhikr: {
      ar: 'رَبِّ اغْفِرْ لِي وَارْحَمْنِي إِنَّكَ أَنْتَ التَّوَّابُ الرَّحِيمُ',
      ku: 'پەروەردگارم لێم خۆشبە و ڕەحمەم پێ بکە، بەڕاستی تۆ تۆبە وەرگر و دلۆڤانیت.',
      en: 'My Lord, forgive me and have mercy on me, for You are the Accepter of Repentance.'
    }
  }
];
