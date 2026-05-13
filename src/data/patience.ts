
export interface WisdomItem {
  id: string;
  type: 'ayah' | 'hadith' | 'quote' | 'story' | 'companion';
  textAr: string;
  textKu: string;
  textEn: string;
  reference?: string;
  category: 'sabr';
}

export const patienceWisdom: WisdomItem[] = [
  {
    id: 'p1',
    type: 'ayah',
    category: 'sabr',
    textAr: 'وَاصْبِرْ لِحُكْمِ رَبِّكَ فَإِنَّكَ بِأَعْيُنِنَا',
    textKu: 'ئارام بگرە لەسەر بڕیاری پەروەردگارت، چونکە تۆ لەژێر چاودێری و پاراستنی ئێمەدایت.',
    textEn: 'And be patient for the decision of your Lord, for indeed, you are in Our eyes.',
    reference: 'Surah At-Tur: 48'
  },
  {
    id: 'p2',
    type: 'ayah',
    category: 'sabr',
    textAr: 'إِنَّمَا يُوَفَّى الصَّابِرُونَ أَجْرَهُم بِغَيْرِ حِسَابٍ',
    textKu: 'بەڕاستی ئارامگران پاداشتەکەیان بەبێ حیساب و بە تەواوی پێ دەدرێت.',
    textEn: 'Indeed, the patient will be given their reward without account.',
    reference: 'Surah Az-Zumar: 10'
  },
  {
    id: 'p3',
    type: 'hadith',
    category: 'sabr',
    textAr: 'ما أُعطي أحد عطاءً خيراً وأوسع من الصبر',
    textKu: 'هیچ کەسێک بەخشینێکی پێنەدراوە کە باشتر و فراوانتر بێت لە ئارامگری.',
    textEn: 'No one has been given a gift better and more comprehensive than patience.',
    reference: 'Sahih Bukhari'
  },
  {
    id: 'p4',
    type: 'story',
    category: 'sabr',
    textAr: 'صبر النبي أيوب عليه السلام',
    textKu: 'پێغەمبەر ئەیوب (سەلامی خوای لێبێت) ساڵانێکی زۆر دووچاری نەخۆشی و لەدەستدانی ماڵ و منداڵ بوو، بەڵام هەرگیز شکایەتی نەکرد تا خوای گەورە شیفای بۆ نارد.',
    textEn: 'Prophet Ayub (peace be upon him) suffered for many years with illness and loss of wealth and children, but he never complained until Allah sent him healing.',
    reference: 'Stories of Prophets'
  },
  {
    id: 'p5',
    type: 'quote',
    category: 'sabr',
    textAr: 'الصبر مِرّ مَذاقه، ولكن عاقِبته أحلى من العسل',
    textKu: 'سەبر تامەکەی تاڵە، بەڵام سەرەنجامەکەی لە هەنگوین شیرینترە.',
    textEn: 'Patience is bitter in taste, but its end result is sweeter than honey.',
    reference: 'Imam Ali (RA)'
  },
  {
    id: 'p6',
    type: 'ayah',
    category: 'sabr',
    textAr: 'فَصَبْرٌ جَمِيلٌ',
    textKu: 'ئارامگرییەکی جوان (ئارام بگرە بەبێ شکایەتکردن لە خەڵک).',
    textEn: 'So patience is most fitting.',
    reference: 'Surah Yusuf: 18'
  },
  {
    id: 'p7',
    type: 'hadith',
    category: 'sabr',
    textAr: 'وَاعْلَمْ أَنَّ فِي الصَّبْرِ عَلَى مَا تَكْرَهُ خَيْرًا كَثِيرًا',
    textKu: 'بزانە کە لە ئارامگرتن لەسەر ئەو شتانەی کە پێت ناخۆشن، خێرێکی زۆری تێدایە.',
    textEn: 'Know that there is much good in being patient with what you dislike.',
    reference: 'Tirmidhi'
  },
  {
    id: 'p8',
    type: 'quote',
    category: 'sabr',
    textAr: 'إذا كان الصبر مُراً، فعاقبته دائماً تكون حلوة',
    textKu: 'ئەگەر ئارامگری تاڵ بێت، ئەوا دەرەنجامەکەی هەمیشە شیرینە.',
    textEn: 'If patience is bitter, its outcome is always sweet.',
    reference: 'Arabic Proverb'
  },
  {
    id: 'p9',
    type: 'story',
    category: 'sabr',
    textAr: 'صبر النبي محمد ﷺ في الطائف',
    textKu: 'پێغەمبەری خودا ﷺ لە تائیف بەردباران کرا و ئازاری زۆری پێگەیشت، بەڵام دوعای خێری بۆ کردن و فەرمووی: هیوادارم خودا لە نەوەکانیان کەسانی بڕوادار دروست بکات.',
    textEn: 'Prophet Muhammad ﷺ was stoned and hurt in Taif, but he prayed for them and said: I hope Allah will bring forth from their offspring those who will worship Him alone.',
    reference: 'Seerah'
  },
  {
    id: 'p10',
    type: 'ayah',
    category: 'sabr',
    textAr: 'وَاصْبِرْ وَمَا صَبْرُكَ إِلَّا بِاللَّهِ',
    textKu: 'ئارام بگرە، وە ئارامگرتنی تۆش تەنها بە یارمەتی خودایە.',
    textEn: 'And be patient, and your patience is not but through Allah.',
    reference: 'Surah An-Nahl: 127'
  },
  {
    id: 'p11',
    type: 'hadith',
    category: 'sabr',
    textAr: 'عجبًا لأمرِ المؤمنِ، إن أمرَه كلَّه خيرٌ، وليس ذاك لأحدٍ إلا للمؤمنِ، إن أصابته سراءُ شكرَ فكان خيرًا له، وإن أصابته ضراءُ صبرَ فكان خيرًا له',
    textKu: 'کاروباری ئیماندار زۆر سەرسوڕهێنەرە! هەموو کارێکی بۆ خێرە، ئەوەش بۆ کەس نییە جگە لە ئیماندار: ئەگەر خۆشییەکی تووش بێت سوپاسگوزاری دەکات و ئەوە بۆی باشە، ئەگەر ناخۆشییەکی تووش بێت ئارام دەگرێت و ئەوەش بۆی باشە.',
    textEn: 'Amazing is the affair of the believer, verily all of his affairs are good and this is for no one except the believer. If something of good/happiness befalls him he is grateful and that is good for him. If something of harm befalls him he is patient and that is good for him.',
    reference: 'Sahih Muslim'
  },
  {
    id: 'p12',
    type: 'story',
    category: 'sabr',
    textAr: 'صبر النبي يوسف عليه السلام في السجن',
    textKu: 'پێغەمبەر یوسف (سەلامی خوای لێبێت) چەندین ساڵ بە ستەم لە زینداندا مایەوە، بەڵام هەرگیز نائومێد نەبوو لە ڕەحمەتی خودا تا پاداشتی درایەوە و بووە پاشای میسر.',
    textEn: 'Prophet Yusuf (AS) remained in prison for several years unjustly, but he never despaired of Allah\'s mercy until he was rewarded and became the king of Egypt.',
    reference: 'Surah Yusuf'
  },
  {
    id: 'p13',
    type: 'story',
    category: 'sabr',
    textAr: 'صبر الصحابي بلال بن رباح',
    textKu: 'بیلال (خوای لێ ڕازی بێت) لە ناو گەرمای بیاباندا و بەردی گەورە لەسەر سنگی، دەیفەرموو: أحد.. أحد. ئارامگرتنەکەی بووە هۆی ئەوەی ببێتە یەکەم بانگبێژی ئیسلام.',
    textEn: 'Bilal (RA) in the heat of the desert with a heavy stone on his chest, would say: One.. One (Allah is One). His patience led him to become the first Mu\'adhin of Islam.',
    reference: 'Companions Biography'
  },
  {
    id: 'p14',
    type: 'ayah',
    category: 'sabr',
    textAr: 'يَا أَيُّهَا الَّذِينَ آمَنُوا اصْبِرُوا وَصَابِرُوا وَرَابِطُوا وَاتَّقُوا اللَّهَ لَعَلَّكُمْ تُفْلِحُونَ',
    textKu: 'ئەی ئەوانەی باوەڕتان هێناوە، ئارامی بگرن و یەکتری رابسپێرن بە ئارامگرتن و ئامادەبن و لە خودا بترسن، بۆ ئەوەی ڕزگارتان بێت.',
    textEn: 'O you who have believed, persevere and endure and remain stationed and fear Allah that you may be successful.',
    reference: 'Surah Al-Imran: 200'
  },
  {
    id: 'ps1',
    type: 'story',
    category: 'sabr',
    textAr: 'صبر نوح عليه السلام: دعا قومه ٩٥٠ سنة بصبر وثبات رغم استهزائهم. النتيجة: نجّاه الله وجعله الأب الثاني للبشرية.',
    textKu: 'نوح (سەلامی خوای لێبێت) ٩٥٠ ساڵ بە ئارامییەوە بانگەوازی گەلەکەی کرد و تانە و تەشەری لێدەدرا. ئەنجام: خودا ڕزگاری کرد و کردی بە باوکی دووەمی مرۆڤایەتی.',
    textEn: 'Patience of Nuh (AS): He called his people for 950 years with patience despite their mockery. Result: Allah saved him and made him the second father of humanity.',
    reference: 'Prophets Stories'
  },
  {
    id: 'ps2',
    type: 'story',
    category: 'sabr',
    textAr: 'صبر إبراهيم في النار: عندما ألقي في النار، توكل على الله وحده. النتيجة: جعل الله النار برداً وسلاماً عليه.',
    textKu: 'ئیبراهیم (سەلامی خوای لێبێت) کاتێک فڕێدرایە ناو ئاگر، تەنها پشتی بە خودا بەست. ئەنجام: خودا ئاگرەکەی بۆ کرد بە سارد و سەلامەت.',
    textEn: 'Patience of Ibrahim (AS) in the fire: When thrown into the fire, he relied only on Allah. Result: Allah made the fire cool and safe for him.',
    reference: 'Prophets Stories'
  },
  {
    id: 'ps3',
    type: 'story',
    category: 'sabr',
    textAr: 'صبر يوسف في البئر: ألقاه إخوته في البئر وهو صغير، لكنه لم ييأس. النتيجة: بعد سنوات من الصبر أصبح عزيز مصر.',
    textKu: 'یوسف (سەلامی خوای لێبێت) برایەکانی فڕێیان دایە ناو بیر، بەڵام بێ ئومێد نەبوو. ئەنجام: دوای چەندین ساڵ بوو بە پاشای میسر.',
    textEn: 'Patience of Yusuf (AS) in the well: His brothers threw him in the well when he was young, but he did not despair. Result: After years of patience, he became the King of Egypt.',
    reference: 'Prophets Stories'
  },
  {
    id: 'ps4',
    type: 'story',
    category: 'sabr',
    textAr: 'صبر يونس في الحوت: في بطن الحوت، استمر في ذكر الله وتسبيحه. النتيجة: أنقذه الله من ظلمات البطن والبحر.',
    textKu: 'یونس (سەلامی خوای لێبێت) لە ناو سکی نەهەنگدا بەردەوام یادی خودای دەکرد. ئەنجام: خودا لە تاریکی بیر و دەریا ڕزگاری کرد.',
    textEn: 'Patience of Yunus (AS) in the whale: Inside the whale, he continued to remember and glorify Allah. Result: Allah saved him from the darkness of the belly and the sea.',
    reference: 'Prophets Stories'
  },
  {
    id: 'ps5',
    type: 'story',
    category: 'sabr',
    textAr: 'صبر موسى مع فرعون: تحمل أذى فرعون لسنوات طويلة لإنقاذ قومه. النتيجة: شق الله له البحر وأغرق فرعون وجنوده.',
    textKu: 'موسا (سەلامی خوای لێبێت) ساڵانێکی زۆر بەرگەی زوڵمی فیرعەونی گرت بۆ ڕزگارکردنی گەلەکەی. ئەنجام: خودا دەریای بۆ لەت کرد و فیرعەونی نوقم کرد.',
    textEn: 'Patience of Musa (AS) with Pharaoh: He endured Pharaoh\'s oppression for many years to save his people. Result: Allah parted the sea for him and drowned Pharaoh.',
    reference: 'Prophets Stories'
  },
  {
    id: 'ps6',
    type: 'story',
    category: 'sabr',
    textAr: 'صبر أيوب على المرض: ابتلي بالمرض ١٨ عاماً وفقد ماله وأولاده. النتيجة: شفاه الله وعوضه بأهل ومثلهم معهم.',
    textKu: 'ئەیوب (سەلامی خوای لێبێت) ١٨ ساڵ بە سەختی نەخۆش کەوت و ماڵ و منداڵی لەدەستدا. ئەنجام: خودا شیفای دایەوە و دوو ئەوەندەی ماڵ و منداڵی پێ بەخشییەوە.',
    textEn: 'Patience of Ayub (AS) in illness: He was afflicted with illness for 18 years and lost his wealth and children. Result: Allah healed him and gave him back double of what he lost.',
    reference: 'Prophets Stories'
  },
  {
    id: 'ps7',
    type: 'story',
    category: 'sabr',
    textAr: 'صبر يعقوب عليه السلام: بكى على فراق يوسف حتى ابيضت عيناه من الحزن. النتيجة: رد الله إليه يوسف وارتد بصيراً.',
    textKu: 'یەعقوب (سەلامی خوای لێبێت) ساڵانێکی زۆر لە دووری یوسف گریا تا چاوەکانی سپی بوون. ئەنجام: خودا یوسفی بۆ گەڕاندەوە و چاوەکانی چاک بوونەوە.',
    textEn: 'Patience of Yaqub (AS): He wept over the loss of Yusuf until his eyes turned white from grief. Result: Allah returned Yusuf to him and restored his sight.',
    reference: 'Prophets Stories'
  },
  {
    id: 'ps8',
    type: 'story',
    category: 'sabr',
    textAr: 'صبر لوط عليه السلام: تحمل أذى قومه وكان ينصحهم باستمرار. النتيجة: أنجاه الله وأهله المؤمنين من العذاب.',
    textKu: 'لوط (سەلامی خوای لێبێت) بەرگەی خراپەی گەلەکەی گرت و بەردەوام ئامۆژگاری دەکردن. ئەنجام: خودا خۆی و خێزانە بڕوادارەکەی ڕزگار کرد.',
    textEn: 'Patience of Lut (AS): He endured the evil of his people and advised them continuously. Result: Allah saved him and his believing family from the punishment.',
    reference: 'Prophets Stories'
  },
  {
    id: 'ps9',
    type: 'story',
    category: 'sabr',
    textAr: 'صبر زكريا عليه السلام: صبر وانتظر الذرية حتى بلغ الشيب. النتيجة: رزقه الله بيحيى وقرت عينه به.',
    textKu: 'زەکەریا (سەلامی خوای لێبێت) تا تەمەنی پیری بە ئارامی چاوەڕێی منداڵی کرد. ئەنجام: خودا یەحیای پێ بەخشی و دڵی خۆش کرد.',
    textEn: 'Patience of Zakariya (AS): He waited patiently for offspring until old age. Result: Allah blessed him with Yahya and gladdened his heart.',
    reference: 'Prophets Stories'
  },
  {
    id: 'ps10',
    type: 'story',
    category: 'sabr',
    textAr: 'صبر محمد ﷺ في شعب أبي طالب: حوصر النبي وأصحابه ٣ سنوات حتى أكلوا ورق الشجر. النتيجة: فك الله الحصار ونصر الإسلام.',
    textKu: 'پێغەمبەر ﷺ و هاوەڵەکانی ٣ ساڵ لە گەمارۆیەکی سەختدا بوون و گەڵای درەختیان دەخوارد. ئەنجام: خودا گەمارۆکەی شکاند و ئیسلامی سەرخست.',
    textEn: 'Patience of Muhammad ﷺ in the Siege: The Prophet and his companions were besieged for 3 years until they ate tree leaves. Result: Allah broke the siege and gave victory to Islam.',
    reference: 'Prophets Stories'
  },
  {
    id: 'ps11',
    type: 'story',
    category: 'sabr',
    textAr: 'صبر إبراهيم على ذبح ابنه: أُمِر بذبح ابنه فاستجاب لأمر الله بصبر يقيني. النتيجة: فداه الله بذبح عظيم من الجنة.',
    textKu: 'ئیبراهیم فەرمانی پێدرا کوڕەکەی سەرببڕێت، بە ئارامی ملکەچی فەرمانی خودا بوو. ئەنجام: خودا قۆچێکی لە بەهەشتەوە بۆ نارد و ئیسماعیلی بۆ ڕزگار کرد.',
    textEn: 'Patience of Ibrahim (AS) in sacrificing his son: He was ordered to sacrifice his son and obeyed with certain patience. Result: Allah ransomed him with a great sacrifice from Paradise.',
    reference: 'Prophets Stories'
  },
  {
    id: 'ps12',
    type: 'story',
    category: 'sabr',
    textAr: 'صبر إسماعيل عليه السلام: عندما أخبره والده بالذبح، قال: يا أبت افعل ما تؤمر. النتيجة: كان من الصابرين وأبو العرب.',
    textKu: 'ئیسماعیل کاتێک باوکی پێی گوت دەتبڕم، فەرمووی: ئەی باوکە هەرچی فەرمانت پێکراوە بیکە. ئەنجام: بوو بە پێشەنگی ئارامگران و باوکی عەرەب.',
    textEn: 'Patience of Ismail (AS): When his father told him about the sacrifice, he said: O father, do what you are commanded. Result: He was among the patient and the father of Arabs.',
    reference: 'Prophets Stories'
  },
  {
    id: 'ps13',
    type: 'story',
    category: 'sabr',
    textAr: 'صبر مريم عليها السلام: تحملت طعن الناس عندما جاءت بعيسى عليه السلام. النتيجة: برأها الله وجعل ابنها نبياً معجزاً.',
    textKu: 'مریەم بەرگەی تانە و تەشەری خەڵکی گرت کاتێک عیسای هێنایە دونیا. ئەنجام: خودا پاکی ئەوی سەلماند و کوڕەکەی کرد بە پێغەمبەر.',
    textEn: 'Patience of Maryam (AS): She endured people\'s accusations when she brought Isa (AS). Result: Allah proved her innocence and made her son a miraculous prophet.',
    reference: 'Prophets Stories'
  },
  {
    id: 'ps14',
    type: 'story',
    category: 'sabr',
    textAr: 'صبر هود عليه السلام: تحمل سخرية قوم عاد لسنوات طویلة. النتيجة: أهلك الله الكافرين بريح صرصر وأنجى هوداً.',
    textKu: 'هود ساڵانێکی زۆر بەرگەی گاڵتەجاڕی گەلی (عاد)ی گرت. ئەنجام: خودا بە بایەکی بەهێز بێباوەڕانی لەناو برد و هودی ڕزگار کرد.',
    textEn: 'Patience of Hud (AS): He endured the mockery of the people of Ad for many years. Result: Allah destroyed the disbelievers with a fierce wind and saved Hud.',
    reference: 'Prophets Stories'
  },
  {
    id: 'ps15',
    type: 'story',
    category: 'sabr',
    textAr: 'صبر صالح عليه السلام: تحمل أذى قوم ثمود الذين عقروا الناقة. النتيجة: نجى الله صالحاً وأرسل العذاب على قومه.',
    textKu: 'صالح بەرگەی ستەمی گەلی (ثمود)ی گرت کە حوشترەکەی خودایان سەر بڕی. ئەنجام: خودا صاڵحی ڕزگار کرد و سزا بۆ گەلەکەی نارد.',
    textEn: 'Patience of Salih (AS): He endured the oppression of the people of Thamud who killed the she-camel. Result: Allah saved Salih and sent punishment upon his people.',
    reference: 'Prophets Stories'
  },
  {
    id: 'ps16',
    type: 'story',
    category: 'sabr',
    textAr: 'صبر داود عليه السلام: واجه جالوت الظالم بصبر وثبات وهو شاب. النتيجة: قتله وآتاه الله الملك والحكمة.',
    textKu: 'داود کاتێک گەنج بوو بە ئارامی ڕووبەڕووی جالوتی ستەمکار بووەوە. ئەنجام: خودا هێزی پێدا و جالوتی کوشت و پاشایەتی پێ بەخشی.',
    textEn: 'Patience of Dawud (AS): He faced the oppressor Goliath with patience and steadfastness as a youth. Result: He killed him and Allah gave him kingdom and wisdom.',
    reference: 'Prophets Stories'
  },
  {
    id: 'ps17',
    type: 'story',
    category: 'sabr',
    textAr: 'صبر سليمان عليه السلام: رغم ملكه العظيم، كان صابراً شاكراً لله في كل حين. النتيجة: سخر الله له الجن والريح والحيوان.',
    textKu: 'سولەیمان سەرەڕای پاشایەتییە گەورەکەی، هەمیشە بە ئارامی شوکرانەبژێری خودا بوو. ئەنجام: خودا دەسەڵاتی بەسەر جنۆکە و با و ئاژەڵاندا پێ بەخشی.',
    textEn: 'Patience of Sulayman (AS): Despite his great kingdom, he was patient and grateful to Allah. Result: Allah subjected the Jinn, wind, and animals to him.',
    reference: 'Prophets Stories'
  },
  {
    id: 'ps18',
    type: 'story',
    category: 'sabr',
    textAr: 'صبر شعيب عليه السلام: تحمل غش قومه في الميزان والمكيال وظلمهم. النتيجة: حفظه الله وعاقب المطففين.',
    textKu: 'شوعەیب بەرگەی فێڵ و تەڵەکەی گەلەکەی گرت لە کێشانە و پێوانەدا. ئەنجام: خودا پارێزگاری لێ کرد و بێباوەڕانی سزا دا.',
    textEn: 'Patience of Shuaib (AS): He endured his people\'s cheating in weights and measures. Result: Allah protected him and punished the cheaters.',
    reference: 'Prophets Stories'
  },
  {
    id: 'ps19',
    type: 'story',
    category: 'sabr',
    textAr: 'صبر يحيى عليه السلام: اختار عيشة الزهد وصبر على قول الحق رغم المخاطر. النتيجة: نال الشهادة وبقي ذكره مرفوعاً.',
    textKu: 'یەحیا ژیانێکی سادەی هەڵبژارد و بە ئارامی ڕاستی بە خەڵک دەگوت سەرەڕای مەترسییەکان. ئەنجام: خودا پلەی شەهیدی پێ بەخشی و ناوی بە بەرزی مایەوە.',
    textEn: 'Patience of Yahya (AS): He chose an ascetic life and was patient in speaking the truth despite dangers. Result: He achieved martyrdom and his name remained elevated.',
    reference: 'Prophets Stories'
  },
  {
    id: 'ps20',
    type: 'story',
    category: 'sabr',
    textAr: 'صبر عيسى عليه السلام: عاش زاهداً وصبر على أذى الناس وتكذيبهم. النتيجة: رفعه الله إليه وكفاه كيد الأعداء.',
    textKu: 'عیسا بێ ماڵ و نیشتمان دەژیا و بە ئارامی نەخۆشی چاک دەکردەوە و خەڵکی تانەیان لێدەدا. ئەنجام: خودا بەرەو ئاسمان بەرزی کردەوە و لە پیلانی دوژمنان پاراستی.',
    textEn: 'Patience of Isa (AS): He lived an ascetic life and was patient with people\'s harm and denial. Result: Allah raised him to Himself and protected him from enemies\' plots.',
    reference: 'Prophets Stories'
  },
  {
    id: 'pc1',
    type: 'companion',
    category: 'sabr',
    textAr: 'بلال بن رباح: كان يُعذب في رمضاء مكة ويُوضع الصخر على صدره وهو يقول: أحد أحد.',
    textKu: 'بلال بن رباح: لەسەر لمی گەرم بەردی قورسیان دەخستە سەر سنگی تا واز لە ئاینی ئیسلام بهێنێت، بەڵام ئەو تەنها دەیگوت: (أحد.. أحد).',
    textEn: 'Bilal ibn Rabah: He was tortured in the heat of Mecca with a heavy stone on his chest, yet he only said: (Ahad.. Ahad) - God is One.',
    reference: 'Sahih Bukhari'
  },
  {
    id: 'pc2',
    type: 'companion',
    category: 'sabr',
    textAr: 'آل ياسر: أول أسرة عُذبت في الإسلام، بشّرهم النبي ﷺ بالجنة قائلاً: صبراً آل ياسر فإن موعدكم الجنة.',
    textKu: 'آل ياسر: یەکەم خێزان بوون لە پێناو خودا ئەشکەنجە دران، پێغەمبەر ﷺ پێی دەگوتن: ئارام بگرن ئەی خێزانی یاسر، بەڵێن بێت جێگەتان بەهەشتە.',
    textEn: 'The Family of Yasir: The first family to be tortured in Islam. The Prophet ﷺ gave them glad tidings of Paradise: Be patient, family of Yasir, for your meeting place is Paradise.',
    reference: 'Seerah'
  },
  {
    id: 'pc3',
    type: 'companion',
    category: 'sabr',
    textAr: 'خباب بن الأرت: كان يُجر على الجمر حتى ذاب لحم ظهره، فصبر واحتسب ذلك في سبيل الله.',
    textKu: 'خباب بن الأرت: لەسەر ڕەژووی گەرم ڕایان دەکێشا تا گۆشتی پشتی دەتاوایەوە، بەڵام ئارامی گرت و وای دەزانی ئەوە تاقیکردنەوەیە بۆ پلە بەرزی.',
    textEn: 'Khabbab ibn al-Aratt: He was dragged over hot coals until the fat of his back melted, yet he remained patient for the sake of Allah.',
    reference: 'Biographies'
  },
  {
    id: 'pc4',
    type: 'companion',
    category: 'sabr',
    textAr: 'أم سلمة: استُشهد زوجها وفُصلت عن أبنائها، فصبرت وقالت: اللهم أجرني في مصيبتي، فعوضها الله بالزواج من النبي ﷺ.',
    textKu: 'أم سلمة: هاوسەرەکەی شەهید بوو و لە منداڵەکانی جیاکرایەوە، ئارامی گرت و گوتی: خودایە پاداشتم بدەرەوە، خودا کردی بە هاوسەری پێغەمبەر ﷺ.',
    textEn: 'Umm Salama: Her husband was martyred and she was separated from her children. She was patient and prayed: O Allah, reward me in my affliction, and Allah compensated her by marrying the Prophet ﷺ.',
    reference: 'Sahih Muslim'
  },
  {
    id: 'pc5',
    type: 'companion',
    category: 'sabr',
    textAr: 'صهيب الرومي: عندما هاجر، ترك كل ماله للمشركين مقابل السماح له باللحاق بالنبي ﷺ.',
    textKu: 'صهيب الرومي: کاتێک کۆچی کرد هەموو سامانەکەی بە بێباوەڕان بەخشی تا تەنها ڕێگەی بدەن بگاتە لای پێغەمبەر ﷺ.',
    textEn: 'Suhaib al-Rumi: When he emigrated, he left all his wealth to the polytheists in exchange for permission to join the Prophet ﷺ.',
    reference: 'Tafsir'
  },
  {
    id: 'pc6',
    type: 'companion',
    category: 'sabr',
    textAr: 'خبيب بن عدي: قبل استشهاده، طلب أن يصلي ركعتين، وواجه الموت بصبر وثبات عظيم.',
    textKu: 'خبيب بن عدي: کاتێک ویستیان شەهیدی بکەن، داوای کرد ڕێگەی بدەن دوو ڕکات نوێژ بکات، بە ئارامییەوە بەرەو مردن چوو لە پێناو ئیمانەکەیدا.',
    textEn: 'Khubaib ibn Adi: Before his martyrdom, he asked to pray two Rak\'ahs and faced death with great patience and steadfastness.',
    reference: 'Sahih Bukhari'
  },
  {
    id: 'pc7',
    type: 'companion',
    category: 'sabr',
    textAr: 'مصعب بن عمير: كان أغنى فتى في مكة، ترك رغد العيش واستُشهد في أحد وهو لا يملك ما يكفن به.',
    textKu: 'مصعب بن عمير: دەوڵەمەندترین گەنجی مەککە بوو، هەموو خۆشییەکانی دونیای جێهێشت و لە جەنگی ئوحود بە ئارامییەوە شەهید بوو.',
    textEn: 'Mus\'ab ibn Umayr: He was the wealthiest youth in Mecca, left the luxury of life and was martyred in Uhud while having nothing to be shrouded in.',
    reference: 'Seerah'
  },
  {
    id: 'pc8',
    type: 'companion',
    category: 'sabr',
    textAr: 'جعفر بن أبي طالب: قُطعت يداه في غزوة مؤتة، فصبر وظل ممسكاً بالراية حتى استُشهد.',
    textKu: 'جعفر بن أبي طالب: لە جەنگی موتتە هەردوو دەستی بڕایەوە، بەڵام ئاڵاکەی ئیسلامی هەر بە بەرزی گرت تا شەهید بوو.',
    textEn: 'Ja\'far ibn Abi Talib: His hands were cut off in the Battle of Mu\'tah, yet he remained patient and held the banner high until he was martyred.',
    reference: 'Biographies'
  },
  {
    id: 'pc9',
    type: 'companion',
    category: 'sabr',
    textAr: 'سمية بنت خياط: أول شهيدة في الإسلام، تحملت أقسى أنواع التعذيب وظل لسانها يلهج بذكر الله.',
    textKu: 'سمية بنت خياط: یەکەم ژن بوو لە ئیسلامدا شەهید کرا، بەرگەی توندترین ئەشکەنجەی دا و زمانی تەنها یادی خودای دەکرد.',
    textEn: 'Sumayyah bint Khayyat: The first martyr in Islam, she endured the harshest forms of torture and her tongue remained busy with the remembrance of Allah.',
    reference: 'Seerah'
  },
  {
    id: 'pc10',
    type: 'companion',
    category: 'sabr',
    textAr: 'أبو عبيدة بن الجراح: صبر في طاعون عمواس وجاهد حتى وافته المنية وهو محافظ على الأمانة.',
    textKu: 'أبو عبيدة بن الجراح: لە کاتی تاعونی (عەواس) بە ئارامییەوە مایەوە و ئەرکی سەرشانی جێبەجێ کرد تا کۆچی دوایی کرد.',
    textEn: 'Abu Ubaidah ibn al-Jarrah: He was patient during the Plague of Amwas and struggled until his death while fulfilling his trust.',
    reference: 'Biographies'
  },
  {
    id: 'pc11',
    type: 'companion',
    category: 'sabr',
    textAr: 'عبدالله بن حذافة: تعرض لغليان في قدر، فبكى ليس خوفاً بل تمنى أن يكون له مائة نفس تُفدى في سبيل الله.',
    textKu: 'عبدالله بن حذافة: پاشای ڕۆم خستیە ناو مەنجەنیقێکی کوڵاو، بەڵام ئەو گریا چونکە تەنها یەک گیانی هەبوو لە پێناو خودا بیدات.',
    textEn: 'Abdullah ibn Hudhafa: He was threatened with being boiled in a pot, he cried not out of fear but wished he had a hundred souls to sacrifice for Allah.',
    reference: 'Biographies'
  },
  {
    id: 'pc12',
    type: 'companion',
    category: 'sabr',
    textAr: 'عثمان بن عفان: حُوصر في منزله ومُنع عنه الماء، فصبر وأمر الناس ألا يقاتلوا دونه حقناً لدمائهم.',
    textKu: 'عثمان بن عفان: لە کاتی فیتنەدا ماڵەکەی گەمارۆ درا و ئاوی لێ بڕا، بەڵام فەرمانی بە کەس نەکرد بەرگری لێ بکەن تا خوێنی نەڕژێت.',
    textEn: 'Uthman ibn Affan: He was besieged in his home and denied water, yet he remained patient and ordered people not to fight for him to save their blood.',
    reference: 'Biographies'
  },
  {
    id: 'pc13',
    type: 'companion',
    category: 'sabr',
    textAr: 'سعد بن أبي وقاص: هددته أمه بالامتناع عن الطعام ليترك الإسلام، فقال: لو كان لكِ مائة نفس ما فارقت ديني.',
    textKu: 'سعد بن أبي وقاص: دایکی مانی گرت لە خواردن تا سەعد واز لە ئیسلام بهێنێت، بەڵام ئەو بە ئارامی گوتی: دایکە گیان ئەگەر سەد گیانت هەبێت واز ناهێنم.',
    textEn: 'Sa\'d ibn Abi Waqqas: His mother threatened to stop eating until he left Islam. He said: Even if you had a hundred souls, I would not leave my religion.',
    reference: 'Sahih Muslim'
  },
  {
    id: 'pc14',
    type: 'companion',
    category: 'sabr',
    textAr: 'أبو ذر الغفاري: عاش وحيداً ومات وحيداً، وكان صابراً على الزهد والفقر طوال حياته.',
    textKu: 'أبو ذر الغفاري: بە تەنها دەژیا و بە تەنها کۆچی دوایی کرد، هەمیشە ئارامی دەگرت لەسەر هەژاری و کەمی دونیا.',
    textEn: 'Abu Dharr al-Ghifari: He lived alone and died alone, constantly patient with asceticism and poverty throughout his life.',
    reference: 'Biographies'
  },
  {
    id: 'pc15',
    type: 'companion',
    category: 'sabr',
    textAr: 'عمار بن ياسر: بعد مقتل والديه، استمر في خدمة الإسلام وصبر حتى نال الشهادة في كبره.',
    textKu: 'عمار بن ياسر: دوای کوژرانی دایک و باوکی، بەردەوام بوو لە خزمەتکردنی ئیسلام و لە تەمەنی پیریدا بە ئارامی شەهید بوو.',
    textEn: 'Ammar ibn Yasir: After the killing of his parents, he continued serving Islam and was patient until he achieved martyrdom in his old age.',
    reference: 'Biographies'
  },
  {
    id: 'pc16',
    type: 'companion',
    category: 'sabr',
    textAr: 'فاطمة الزهراء: تحملت الفقر وشدة العيش بصبر وشكر دائم لله تعالى.',
    textKu: 'فاطمة بنت رسول الله: بەرگەی هەژاری و ناڕەحەتییەکی زۆری گرت و هەمیشە شوکرانەبژێر و ئارامگر بوو.',
    textEn: 'Fatimah bint Muhammad: She endured poverty and harsh living conditions with patience and constant gratitude to Allah.',
    reference: 'Biographies'
  },
  {
    id: 'pc17',
    type: 'companion',
    category: 'sabr',
    textAr: 'أنس بن مالك: خدم النبي ﷺ ١٠ سنوات، وصبر على مشاق الحياة دون أن يُظهر أي تضجر.',
    textKu: 'أنس بن مالك: ١٠ ساڵ خزمەتی پێغەمبەری ﷺ کرد، بەرگەی هەموو قورسییەکانی ژیانی گرت بە بێ ئەوەی یەک جار بڵێ ئۆف.',
    textEn: 'Anas ibn Malik: He served the Prophet ﷺ for 10 years, enduring the hardships of life without ever showing any annoyance.',
    reference: 'Sahih Bukhari'
  },
  {
    id: 'pc18',
    type: 'companion',
    category: 'sabr',
    textAr: 'أسماء بنت أبي بكر: ذات النطاقين، كانت تحمل الطعام للنبي ﷺ وهي حامل بشجاعة وصبر.',
    textKu: 'أسماء بنت أبي بكر: بە خاوەن دوو پشتوێنەکە ناسراوە، بە سکێکی پڕەوە بە نهێنی خواردنی بۆ پێغەمبەر ﷺ دەبرد بۆ ئەشکەوت.',
    textEn: 'Asma bint Abi Bakr: Known as "Dhat un-Nitaqayn", she bravely and patiently carried food to the Prophet ﷺ while she was pregnant.',
    reference: 'Seerah'
  },
  {
    id: 'pc19',
    type: 'companion',
    category: 'sabr',
    textAr: 'عمر بن الخطاب: في عام الرمادة، صبر على الجوع وأقسم ألا يأكل السمن حتى يشبع فقراء المسلمين.',
    textKu: 'عمر بن الخطاب: لە ساڵی ڕەمادە کە قاتوقڕی بوو، سوێندی خوارد گۆشت نەخوات تا هەموو خەڵک تێر دەبن، ئارامی لەسەر برسیێتی گرت.',
    textEn: 'Umar ibn al-Khattab: During the Year of Cinders (famine), he was patient with hunger and swore not to eat meat or butter until all the poor Muslims were fed.',
    reference: 'Biographies'
  },
  {
    id: 'pc20',
    type: 'companion',
    category: 'sabr',
    textAr: 'طلحة بن عبيد الله: كان درعاً للنبي ﷺ في غزوة أحد، وتلقى عشرات الجروح بصبر وثبات.',
    textKu: 'طلحة بن عبيد الله: لە جەنگی ئوحود جەستەی بوو بە قەڵغان بۆ پێغەمبەر ﷺ و دەیان برینی قورسی بە ئارامییەوە چێشت.',
    textEn: 'Talhah ibn Ubaidullah: He was a shield for the Prophet ﷺ in the Battle of Uhud, receiving dozens of wounds with patience and steadfastness.',
    reference: 'Biographies'
  },
  {
    id: 'quran_30',
    type: 'ayah',
    category: 'sabr',
    textAr: 'وَلَمَن صَبَرَ وَغَفَرَ إِنَّ ذَٰلِكَ لَمِنْ عَزْمِ الْأُمُورِ',
    textKu: 'هەر کەسێک ئارام بگرێت و خۆڕاگر بێت و لە هەڵەی خەڵک خۆش ببێت، بەڕاستی ئەوە نیشانەی ئازایەتی و خاوەن بڕیارێتییە.',
    textEn: 'And whoever is patient and forgives - indeed, that is of the matters [requiring] determination.',
    reference: 'Surah Ash-Shura: 43'
  },
  {
    id: 'quran_31',
    type: 'ayah',
    category: 'sabr',
    textAr: 'إِنَّمَا يُوَفَّى الصَّابِرُونَ أَجْرَهُم بِغَيْرِ حِسَابٍ',
    textKu: 'بەڕاستی تەنها ئارامگران پاداشتی تەواو و بێشووماری خۆیان پێ دەدرێت.',
    textEn: 'Indeed, the patient will be given their reward without account [i.e., limit].',
    reference: 'Surah Az-Zumar: 10'
  },
  {
    id: 'quran_32',
    type: 'ayah',
    category: 'sabr',
    textAr: 'أُوْلَئِكَ يُجْزَوْنَ الْغُرْفَةَ بِمَا صَبَرُوا',
    textKu: 'ئەوانە پاداشت دەکرێنەوە بە بەرزترین پلەی بەهەشت، لەبەر ئەوەی کە ئارامیان گرت.',
    textEn: 'Those will be awarded the Chamber for what they patiently endured and they will be received therein with greetings and peace.',
    reference: 'Surah Al-Furqan: 75'
  },
  {
    id: 'quran_33',
    type: 'ayah',
    category: 'sabr',
    textAr: 'إِلَّا الَّذِينَ صَبَرُوا وَعَمِلُوا الصَّالِحَاتِ أُولَئِكَ لَهُم مَّغْفِرَةٌ وَأَجْرٌ كَبِيرٌ',
    textKu: 'جگە لەوانەی کە ئارام دەگرن و کارە چاکەکان ئەنجام دەدەن، ئەوانە لێخۆشبوون و پاداشتێکی گەورەیان بۆ هەیە.',
    textEn: 'Except for those who are patient and do righteous deeds; those will have forgiveness and great reward.',
    reference: 'Surah Hud: 11'
  },
  {
    id: 'quran_34',
    type: 'ayah',
    category: 'sabr',
    textAr: 'أُولَئِكَ يُؤْتَوْنَ أَجْرَهُم مَّرَّتَيْنِ بِمَا صَبَرُوا',
    textKu: 'ئەوانە دوو جار پاداشتیان دەدرێتەوە بەهۆی ئەوەی کە ئارامیان گرتووە.',
    textEn: 'Those will be given their reward twice for what they patiently endured.',
    reference: 'Surah Al-Qasas: 54'
  },
  {
    id: 'quran_35',
    type: 'ayah',
    category: 'sabr',
    textAr: 'وَاصْبِرُوا إِنَّ اللَّهَ مَعَ الصَّابِرِينَ',
    textKu: 'ئارام بگرن و خۆڕاگر بن، چونکە بێگومان خودا لەگەڵ ئارامگراندایە.',
    textEn: '...and be patient. Indeed, Allah is with the patient.',
    reference: 'Surah Al-Anfal: 46'
  },
  {
    id: 'quran_36',
    type: 'ayah',
    category: 'sabr',
    textAr: 'ثُمَّ كَانَ مِنَ الَّذِينَ آمَنُوا وَتَواصَوْا بِالصَّبْرِ',
    textKu: 'پاشان لەو کەسانە بێت کە ئیمانیان هێناوە و وەسیەتی ئارامگرتنیان بۆ یەکتری کردووە.',
    textEn: 'And then being among those who believed and advised one another to patience and compassion.',
    reference: 'Surah Al-Balad: 17'
  },
  {
    id: 'quran_37',
    type: 'ayah',
    category: 'sabr',
    textAr: 'وَاصْبِرْ عَلَىٰ مَا أَصَابَكَ إِنَّ ذَٰلِكَ مِنْ عَزْمِ الْأُمُورِ',
    textKu: 'ئارام بگرە لەسەر هەر ناخۆشییەک کە تووشت دەبێت، چونکە ئەوە نیشانەی گەورەیی و بڕیاردەرێتییە.',
    textEn: '...and be patient over what befalls you. Indeed, [all] that is of the matters [requiring] determination.',
    reference: 'Surah Luqman: 17'
  }
];
