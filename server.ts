import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

  // Translation API for Hadiths
  app.post("/api/translate", async (req, res) => {
    const { text, arabicText, targetLanguage } = req.body;
    
    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({ error: "GEMINI_API_KEY is not set on the server" });
    }

    try {
      const prompt = `Translate this Islamic Hadith/text into natural, high-quality ${targetLanguage === 'ku' ? 'Central Kurdish (Sorani)' : targetLanguage}. 
      Provide ONLY the translated text, no extra commentary, no labels, no "Based on...".
      Arabic: ${arabicText || ""}
      English: ${text}`;
      
      const result = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt
      });
      const translated = result.text?.trim() || "";
      
      res.json({ translatedText: translated });
    } catch (error: any) {
      console.error("Translation error:", error);
      res.status(500).json({ error: "Failed to translate text" });
    }
  });

  // Tafsir Translation API
  app.post("/api/translate-tafsir", async (req, res) => {
    const { text } = req.body;
    
    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({ error: "GEMINI_API_KEY is not set on the server" });
    }

    try {
      const prompt = `Translate the following Islamic Tafsir part to Kurdish (Sorani). Keep it accurate, easy to understand, and spiritual. Do not use formatting like bold or headers. Just the translated Kurdish text:
      
      Text: ${text}`;
      
      const result = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt
      });
      const translated = result.text?.trim() || "";
      
      res.json({ translatedText: translated });
    } catch (error: any) {
      console.error("Tafsir translation error:", error);
      res.status(500).json({ error: "Failed to translate Tafsir" });
    }
  });

  // Hadith Search API
  app.post("/api/hadith-search", async (req, res) => {
    const { query, language } = req.body;
    
    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({ error: "GEMINI_API_KEY is not set on the server" });
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
      const result = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `Search for Hadiths related to: "${query}"`,
        config: {
          systemInstruction,
          tools: [{ googleSearch: {} }]
        }
      });
      
      const responseText = result.text?.trim() || "No results found.";
      res.json({ text: responseText });
    } catch (error: any) {
      console.error("Hadith search error:", error);
      res.status(500).json({ error: "Failed to search Hadiths" });
    }
  });

  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, "dist")));
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "dist", "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
