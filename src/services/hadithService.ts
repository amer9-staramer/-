
export interface HadithGlobal {
  id: number | string;
  book: string;
  hadithNumber: string | number;
  arabicText: string;
  englishText: string;
  kurdishText?: string;
  kurdishTafsir?: string;
  chapterName?: string;
  narrator?: string;
  isFirestore?: boolean;
}

const BOOKS = [
  { id: 'bukhari', file: 'ara-bukhari', eng: 'eng-bukhari' },
  { id: 'muslim', file: 'ara-muslim', eng: 'eng-muslim' },
  { id: 'abudawud', file: 'ara-abudawud', eng: 'eng-abudawud' },
  { id: 'tirmidhi', file: 'ara-tirmidhi', eng: 'eng-tirmidhi' },
  { id: 'nasai', file: 'ara-nasai', eng: 'eng-nasai' },
  { id: 'ibnmajah', file: 'ara-ibnmajah', eng: 'eng-ibnmajah' },
  { id: 'malik', file: 'ara-malik', eng: 'eng-malik' },
  { id: 'darimi', file: 'ara-darimi', eng: 'eng-darimi' },
];

export async function fetchHadithsByBook(bookId: string): Promise<HadithGlobal[]> {
  const normalizedBookId = bookId.toLowerCase().replace(/\s+/g, '').replace('sunanal-', '').replace('sunan', '');
  
  let bookConfig = BOOKS.find(b => b.id === normalizedBookId);
  
  // Fallback mappings
  if (!bookConfig) {
    if (normalizedBookId.includes('bukhari')) bookConfig = BOOKS[0];
    else if (normalizedBookId.includes('muslim')) bookConfig = BOOKS[1];
    else if (normalizedBookId.includes('dawud')) bookConfig = BOOKS[2];
    else if (normalizedBookId.includes('tirmidhi')) bookConfig = BOOKS[3];
    else if (normalizedBookId.includes('nasai')) bookConfig = BOOKS[4];
    else if (normalizedBookId.includes('majah')) bookConfig = BOOKS[5];
    else if (normalizedBookId.includes('malik')) bookConfig = BOOKS[6];
    else if (normalizedBookId.includes('darimi')) bookConfig = BOOKS[7];
  }
  
  if (!bookConfig) return [];

  const fetchJson = async (url: string) => {
    const getFallback = async () => {
      const fallbackUrl = url
        .replace('cdn.jsdelivr.net/gh', 'raw.githubusercontent.com')
        .replace('@1', '/1');
      const fallbackRes = await fetch(fallbackUrl);
      if (!fallbackRes.ok) throw new Error(`Fallback failed: ${fallbackRes.status}`);
      return await fallbackRes.json();
    };

    try {
      const res = await fetch(url);
      if (!res.ok) return await getFallback();

      const text = await res.text();
      
      // If it's a CDN error message instead of JSON or malformed
      if (text.startsWith('Package size') || text.startsWith('Failed to fetch') || !text.trim().startsWith('{')) {
        return await getFallback();
      }
      
      try {
        return JSON.parse(text);
      } catch (parseErr) {
        console.warn(`JSON parse error for ${url}, switching to fallback...`);
        return await getFallback();
      }
    } catch (err) {
      console.warn(`Fetch error for ${url}, trying fallback...`, err);
      try {
        return await getFallback();
      } catch (fallbackErr) {
        console.error("Critical: Both CDN and Fallback failed", fallbackErr);
        throw fallbackErr;
      }
    }
  };

  try {
    // Fetch Arabic first
    const araData = await fetchJson(`https://cdn.jsdelivr.net/gh/fawazahmed0/hadith-api@1/editions/${bookConfig.file}.json`);

    // Fetch English
    const engData = await fetchJson(`https://cdn.jsdelivr.net/gh/fawazahmed0/hadith-api@1/editions/${bookConfig.eng}.json`);

    // Map them together
    if (!araData || !araData.hadiths) return [];

    const mapped: HadithGlobal[] = araData.hadiths.map((h: any, idx: number) => ({
      id: `${bookConfig?.id}-${idx}`,
      book: bookId,
      hadithNumber: h.hadithnumber,
      arabicText: h.text,
      englishText: engData?.hadiths?.[idx]?.text || '',
      chapterName: h.reference?.book 
    }));

    return mapped;
  } catch (error) {
    console.error("Failed to fetch hadiths:", error);
    return [];
  }
}
