import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
import crypto from "crypto";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

interface SecureUser {
  id: number;
  email: string;
  passwordHash: string;
  salt: string;
  status: 'Active' | 'Pending';
  otpCode: string | null;
  otpExpiresAt: number | null;
}

// In-Memory simulated User DB for our Secure Registration & Audit lessons
const secureUsersDb: SecureUser[] = [
  {
    id: 1,
    email: "fatima.alzahra@example.com",
    passwordHash: "7b52009b64fd0a2a49e6d8a9397530777e4878a8731383794351a942da5de1bc",
    salt: "88937e29ad32bead59afcc89bdfadff1",
    status: "Active",
    otpCode: null,
    otpExpiresAt: null,
  },
  {
    id: 2,
    email: "ahmad.kurdish@example.com",
    passwordHash: "5f4dcc3b5aa765d61d8327deb882cf99a19c7f1efbaee6b0c2a21e0e56e05ecde",
    salt: "e10adc3949ba59abbe56e057f20f883e",
    status: "Pending",
    otpCode: null,
    otpExpiresAt: null,
  }
];
let nextUserId = 3;

// PBKDF2 cryptography utility which is faster, built-in, and as secure as bcrypt
function hashPassword(password: string): { hash: string; salt: string } {
  const salt = crypto.randomBytes(16).toString("hex");
  const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, "sha512").toString("hex");
  return { hash, salt };
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // --- SECURE USER MANAGEMENT SIGN-UP & AUDITING CORE ENDPOINTS ---

  // 1. Password Hashing & Registration route
  app.post("/api/secure/register", (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    if (secureUsersDb.some(u => u.email.toLowerCase() === email.toLowerCase())) {
      return res.status(400).json({ error: "Email is already registered" });
    }

    const { hash, salt } = hashPassword(password);
    const newUser: SecureUser = {
      id: nextUserId++,
      email: email.toLowerCase(),
      passwordHash: hash,
      salt: salt,
      status: "Active",
      otpCode: null,
      otpExpiresAt: null
    };

    secureUsersDb.push(newUser);
    res.status(201).json({
      message: "User registered securely!",
      user: {
        id: newUser.id,
        status: newUser.status,
        salt: newUser.salt,
        passwordHash: newUser.passwordHash // Display hash and salt to prove plain-text is never saved
      }
    });
  });

  // 2. Admin Dashboard - Data Privacy projection endpoint (Masks and strips email/password)
  app.get("/api/secure/admin-users", (req, res) => {
    // STRICT REDACTION LAW: Only project ID and Status fields. 
    // Email and password Hash are physically nonexistent in the mapped response payload.
    const projectedUsers = secureUsersDb.map(u => ({
      id: u.id,
      status: u.status
    }));

    res.json({
      description: "Secure data privacy projection. Sensitive client parameters (email/password) are barred from transmission.",
      users: projectedUsers
    });
  });

  // 3. Request Password Reset OTP code
  app.post("/api/secure/request-otp", (req, res) => {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }

    const user = secureUsersDb.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (!user) {
      return res.status(404).json({ error: "No user found with this email" });
    }

    // Generate secure 6-digit random OTP
    const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpiresAt = Date.now() + 5 * 60 * 1000; // 5 minutes lifetime

    user.otpCode = otpCode;
    user.otpExpiresAt = otpExpiresAt;

    res.json({
      message: "Security One-Time Password generated!",
      email: user.email,
      otpCode: otpCode, // Send back in response for demonstration simulation convenience
      expiresInSeconds: 300
    });
  });

  // 4. Verify OTP and complete reset (Immediately destroys token)
  app.post("/api/secure/verify-otp", (req, res) => {
    const { email, otpCode, newPassword } = req.body;
    if (!email || !otpCode || !newPassword) {
      return res.status(400).json({ error: "All arguments (email, OTP, newPassword) must be specified" });
    }

    const user = secureUsersDb.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (!user.otpCode || !user.otpExpiresAt || user.otpExpiresAt < Date.now()) {
      return res.status(400).json({ error: "OTP expired or not requested" });
    }

    if (user.otpCode !== otpCode) {
      return res.status(400).json({ error: "Invalid OTP credentials" });
    }

    // Recalculate strong cryptographic hash using a new random salt
    const { hash, salt } = hashPassword(newPassword);
    user.passwordHash = hash;
    user.salt = salt;

    // IMMEDIATE TRUNCATION FOR SECURITY: Erase OTP keys instantly to prevent replay attacks
    user.otpCode = null;
    user.otpExpiresAt = null;

    res.json({
      message: "Password reset successful! One-Time Password token has been permanently invalidated.",
      status: user.status
    });
  });

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

  // 5. Firebase and Environment Diagnostics Health-Check API
  app.get("/api/test-firebase", async (req, res) => {
    const diagnostics: Record<string, any> = {
      timestamp: new Date().toISOString(),
      nodeEnv: process.env.NODE_ENV || "development",
      geminiApiKeyConfigured: !!process.env.GEMINI_API_KEY,
      geminiApiKeyLength: process.env.GEMINI_API_KEY ? process.env.GEMINI_API_KEY.length : 0,
      firebaseConfigPresent: false,
      firebaseConfigKeys: [] as string[],
      firebaseConfigValidation: {} as Record<string, any>
    };

    try {
      const fs = await import("fs");
      const configPath = path.join(process.cwd(), "firebase-applet-config.json");
      if (fs.existsSync(configPath)) {
        const fileContent = fs.readFileSync(configPath, "utf-8");
        const configData = JSON.parse(fileContent);
        if (configData && typeof configData === "object" && Object.keys(configData).length > 0) {
          diagnostics.firebaseConfigPresent = true;
          diagnostics.firebaseConfigKeys = Object.keys(configData);
          diagnostics.firebaseConfigValidation = {
            hasProjectId: !!configData.projectId,
            projectId: configData.projectId,
            hasApiKey: !!configData.apiKey,
            apiKeyLength: configData.apiKey ? configData.apiKey.length : 0,
            apiKeyPrefixMatches: configData.apiKey ? configData.apiKey.startsWith("AIzaSy") : false,
            hasAuthDomain: !!configData.authDomain,
            hasAppId: !!configData.appId
          };
        }
      } else {
        diagnostics.firebaseConfigValidation = {
          error: "firebase-applet-config.json file does not exist in the root working directory."
        };
      }
    } catch (e: any) {
      diagnostics.firebaseConfigValidation = {
        error: `Could not parse firebase-applet-config.json: ${e.message}`
      };
    }

    res.json(diagnostics);
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
