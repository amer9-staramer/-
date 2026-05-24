import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore, doc, getDocFromServer } from 'firebase/firestore';
import firebaseConfigJson from '../../firebase-applet-config.json';

// Support VITE_ prefix for Vite apps on Vercel, and NEXT_PUBLIC_ style as secondary fallback,
// with a final fallback to development firebase-applet-config.json.
const metaEnv = (import.meta as any).env || {};
const firebaseConfig = {
  apiKey: metaEnv.VITE_FIREBASE_API_KEY || metaEnv.NEXT_PUBLIC_FIREBASE_API_KEY || firebaseConfigJson.apiKey,
  authDomain: metaEnv.VITE_FIREBASE_AUTH_DOMAIN || metaEnv.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || firebaseConfigJson.authDomain,
  projectId: metaEnv.VITE_FIREBASE_PROJECT_ID || metaEnv.NEXT_PUBLIC_FIREBASE_PROJECT_ID || firebaseConfigJson.projectId,
  storageBucket: metaEnv.VITE_FIREBASE_STORAGE_BUCKET || metaEnv.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || firebaseConfigJson.storageBucket,
  messagingSenderId: metaEnv.VITE_FIREBASE_MESSAGING_SENDER_ID || metaEnv.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || firebaseConfigJson.messagingSenderId,
  appId: metaEnv.VITE_FIREBASE_APP_ID || metaEnv.NEXT_PUBLIC_FIREBASE_APP_ID || firebaseConfigJson.appId,
  firestoreDatabaseId: metaEnv.VITE_FIREBASE_DATABASE_ID || metaEnv.NEXT_PUBLIC_FIREBASE_DATABASE_ID || firebaseConfigJson.firestoreDatabaseId,
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);
export const auth = getAuth(app);

async function testConnection() {
  try {
    await getDocFromServer(doc(db, 'test', 'connection'));
    console.log("Firestore connected successfully.");
  } catch (error) {
    if(error instanceof Error && error.message.includes('the client is offline')) {
      console.error("Please check your Firebase configuration. The client is offline.");
    } else {
      console.warn("Firestore connection test failed, but may still work in some contexts:", error);
    }
  }
}

testConnection();

