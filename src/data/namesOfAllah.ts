
export interface AllahName {
  id: number;
  arabic: string;
  transliteration: string;
  kurdish: string;
  meaning: string;
}

export const namesOfAllah: AllahName[] = [
  { id: 1, arabic: "الرحمن", transliteration: "Ar-Rahman", kurdish: "بەخشندە", meaning: "زۆر بەبەزەیی بۆ هەموو دروستکراوەکانی" },
  { id: 2, arabic: "الرحيم", transliteration: "Ar-Rahim", kurdish: "میهرەبان", meaning: "خاوەنی بەزەییەکی هەمییشەیی و تایبەت بۆ ئیمانداران" },
  { id: 3, arabic: "الملك", transliteration: "Al-Malik", kurdish: "پاشا", meaning: "پادشا و خاوەنی ڕاستەقینەی هەموو گەردوون" },
  { id: 4, arabic: "القدوس", transliteration: "Al-Quddus", kurdish: "لێبووردە و بێگەرد", meaning: "زۆر دوور و بێبەری لە هەموو کەم و کورتییەک" },
  { id: 5, arabic: "السلام", transliteration: "As-Salam", kurdish: "بێوەی و ئاشتی", meaning: "سەرچاوەی ئاشتی و دڵنیایی بۆ هەمووان" },
  { id: 6, arabic: "المؤمن", transliteration: "Al-Mu'min", kurdish: "بڕوابەخش", meaning: "ئەوەی دڵنیایی و ئیمان دەبەخشێت بە بەندەکانی" },
  { id: 7, arabic: "المهيمن", transliteration: "Al-Muhaymin", kurdish: "چاودێر", meaning: "چاودێر و پارێزەری هەموو شتێک" },
  { id: 8, arabic: "العزيز", transliteration: "Al-Aziz", kurdish: "باڵادەست", meaning: "سەرکەوتوویەک کە هەرگیز شکستی نییە" },
  { id: 9, arabic: "الجبار", transliteration: "Al-Jabbar", kurdish: "توانا و بەهێز", meaning: "ئەوەی ویستی خۆی بەسەر هەموواندا جێبەجێ دەکات" },
  { id: 10, arabic: "المتكبر", transliteration: "Al-Mutakabbir", kurdish: "گەورە و مەزن", meaning: "خاوەنی گەورەیی و مەزنییەکی ڕەها" },
  // Adding more key names to fill the list partially for now
  { id: 11, arabic: "الخالق", transliteration: "Al-Khaliq", kurdish: "دروستکەر", meaning: "دروستکەری هەموو بونەوەر لە نەبوونەوە" },
  { id: 12, arabic: "البارئ", transliteration: "Al-Bari", kurdish: "دروستکار", meaning: "ئەوەی هەموو شتێکی بە ڕێکوپێکی دروست کردووە" },
  { id: 13, arabic: "المصور", transliteration: "Al-Musawwir", kurdish: "شێوەکێش", meaning: "شێوەبەخشی هەموو دروستکراوەکان" },
  { id: 14, arabic: "الغفار", transliteration: "Al-Ghaffar", kurdish: "لێبووردە", meaning: "زۆر لێبووردەیە بۆ گوناهی بەندەکانی" },
  { id: 15, arabic: "القهار", transliteration: "Al-Qahhar", kurdish: "هەرەبەدەسەڵات", meaning: "توانا و زاڵ بەسەر هەموو جیهاندا" },
  { id: 16, arabic: "الوهاب", transliteration: "Al-Wahhab", kurdish: "بەخشین زۆر", meaning: "زۆر بەخشندەیە بەبێ چاوەڕوانی تادانەوە" },
  { id: 17, arabic: "الرزاق", transliteration: "Ar-Razzaq", kurdish: "ڕۆزیدەر", meaning: "ڕۆزیبەخشی هەموو دروستکراوەکان" },
  { id: 18, arabic: "الفتاح", transliteration: "Al-Fattah", kurdish: "کردەوەکەر", meaning: "کەرەوەرەی دەرگای خێر و سۆز" },
  { id: 19, arabic: "العليم", transliteration: "Al-Alim", kurdish: "زانا", meaning: "ئەوەی لە هەموو شتێک ئاگادارە" },
  { id: 20, arabic: "القابض", transliteration: "Al-Qabid", kurdish: "گرەوەر", meaning: "ئەوەی ڕۆزی دەگرێتەوە لە کێ بییەوێت" },
  { id: 21, arabic: "الباسط", transliteration: "Al-Basit", kurdish: "بڵاوکەرەوە", meaning: "ئەوەی ڕۆزی بڵاو دەکاتەوە و فراوانی دەکات" },
  { id: 22, arabic: "الخافض", transliteration: "Al-Khafid", kurdish: "نزمکەرەوە", meaning: "ئەوەی پلەی کافران و ستەمکاران نزم دەکاتەوە" },
  { id: 23, arabic: "الرافع", transliteration: "Ar-Rafi", kurdish: "بەرزکەرەوە", meaning: "ئەوەی پلەی ئیمانداران بەرز دەکاتەوە" },
  { id: 24, arabic: "المعز", transliteration: "Al-Mu'izz", kurdish: "عیزەتبەخش", meaning: "ئەوەی عزەت دەبەخشێت بە کێ بییەوێت" },
  { id: 25, arabic: "المذل", transliteration: "Al-Mudhill", kurdish: "سەرشۆڕکەر", meaning: "ئەوەی ستەمکاران سەرشۆڕ دەکات" },
  { id: 26, arabic: "السميع", transliteration: "As-Sami", kurdish: "بیسەر", meaning: "بیسەری هەموو شتێکە" },
  { id: 27, arabic: "البصير", transliteration: "Al-Basir", kurdish: "بینەر", meaning: "بینەری هەموو شتێکە" },
  { id: 28, arabic: "الحكم", transliteration: "Al-Hakam", kurdish: "دادوەر", meaning: "دادوەری دادپەروەر" },
  { id: 29, arabic: "العدل", transliteration: "Al-Adl", kurdish: "دادپەروەر", meaning: "زۆر دادپەروەرە لە بڕیارەکانیدا" },
  { id: 30, arabic: "اللطيف", transliteration: "Al-Latif", kurdish: "میهرەبان و وردبین", meaning: "میهرەبانە و لە وردەکارییەکان ئاگادارە" }
];
