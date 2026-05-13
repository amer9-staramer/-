
/**
 * Normalizes Kurdish and Arabic characters to ensure consistent search results
 * regardless of the keyboard layout used (e.g., 'ی' vs 'ي' and 'ک' vs 'ك').
 */
export function normalizeText(text: string): string {
  if (!text) return '';
  return text
    .toLowerCase()
    /* Kurdish/Arabic normalization using Unicode escapes */
    .replace(/\u064A|\u0649|\u06D2/g, '\u06CC') // Normalize ya variants to Persian/Kurdish Ya
    .replace(/\u0643/g, '\u06A9') // Arabic Kaf to Persian/Kurdish Kaf
    .replace(/\u06D0|\u064A\u0654/g, '\u06CE') // E variants to Kurdish Ye (ێ)
    .replace(/\u0629/g, '\u06D5') // Te Marbuta to Kurdish He/E (ە)
    .replace(/\u0647/g, '\u0647') // Standardize He
    /* Strip Arabic diacritics (harakat) */
    .replace(/[\u064B-\u065F]/g, "")
    .trim();
}
