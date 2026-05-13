import { GoogleGenAI } from "@google/genai";

export interface HadithResult {
  text: string;
  source?: string;
  book?: string;
  hadithNumber?: string;
  authenticity?: string;
}

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export async function searchHadiths(query: string, language: 'ku' | 'en' | 'ar'): Promise<string> {
  if (!process.env.GEMINI_API_KEY) {
    throw new Error('GEMINI_API_KEY is not available. Please check your environment variables.');
  }

  const systemInstruction = `
    You are a specialized Hadith scholar assistant.
    Your task is to find authentic Hadiths based on user keywords.
    When a user provides keywords in Kurdish (Sorani), Arabic, or English, search for the most relevant authentic Hadiths.
    Always provide the Arabic text of the Hadith, followed by the translation in the user's preferred language (${language === 'ku' ? 'Kurdish Sorani' : language === 'ar' ? 'Arabic' : 'English'}).
    Include the source (e.g., Sahih Bukhari, Sahih Muslim, etc.) and the Hadith number if available.
    If the authenticity is discussed by scholars, mention it briefly (e.g., Sahih, Hasan).
    Format the output in clean Markdown.
    Use Google Search grounding to ensure the Hadiths are accurate and well-sourced.
  `;

  try {
    const response = await ai.models.generateContent({ 
      model: "gemini-3-flash-preview",
      contents: [{ role: "user", parts: [{ text: `Search for Hadiths related to: "${query}"` }] }],
      config: {
        systemInstruction: systemInstruction,
        tools: [{ googleSearch: {} }] as any,
      }
    });
    
    return response.text.trim() || "No results found.";
  } catch (error: any) {
    console.error("Hadith search error:", error);
    throw new Error(error.message || "Failed to search Hadiths. Please try again later.");
  }
}
