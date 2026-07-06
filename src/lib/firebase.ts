import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAcO3_xYKTQfdifYwUy6hIqgoCcp9uRt8I",
  authDomain: "dr-arif-portfolio-6a807.firebaseapp.com",
  projectId: "dr-arif-portfolio-6a807",
  storageBucket: "dr-arif-portfolio-6a807.firebasestorage.app",
  messagingSenderId: "581317517966",
  appId: "1:581317517966:web:af1702ff0a827c3f035fdf"
};

const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };
