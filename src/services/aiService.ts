
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });

const SYSTEM_INSTRUCTION = `
You are "Zikr AI", a specialized Islamic assistant for the "Zikr & Dua" app.
Your goal is to provide spiritual guidance, explain zikrs, and answer questions about Islam based on the Quran and authentic Hadiths (Bukhari, Muslim, etc.).

Guidelines:
1. Always be respectful, peaceful, and encouraging.
2. If asked about a zikr for a specific feeling (e.g., sadness, anxiety), suggest authentic zikrs (like "La hawla wa la quwwata illa billah" or "Hasbunallahu wa ni'mal wakeel").
3. Keep answers concise and focused.
4. If a question is outside the scope of Islam or spirituality, gently redirect the user.
5. Provide translations in Kurdish (Sorani) and English if helpful.
6. Use the context of the zikrs and stories already in the app for consistency.
7. Avoid giving legal fatwas; direct users to qualified scholars for complex legal matters.

Current Context:
- App Name: Zikr & Dua
- Language Support: Kurdish, Arabic, English
- Features: Quran, Hadiths, Daily Zikrs, Tasbih, Stories of Prophets.
`;

export async function chatWithAI(message: string, history: { role: 'user' | 'model'; parts: string }[]) {
  if (!process.env.GEMINI_API_KEY) {
     throw new Error("Gemini API Key is not configured. Please add it in the settings.");
  }

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: [
        ...history.map(h => ({ role: h.role, parts: [{ text: h.parts }] })),
        { role: 'user', parts: [{ text: message }] }
      ],
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
      },
    });

    return response.text;
  } catch (error) {
    console.error("AI Error:", error);
    throw error;
  }
}
