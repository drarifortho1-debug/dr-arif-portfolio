import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA54eP6gtbTOb9T5PxD6LKxnSVjpN3-Uds",
  authDomain: "dr-arif-portfolio.firebaseapp.com",
  projectId: "dr-arif-portfolio",
  storageBucket: "dr-arif-portfolio.firebasestorage.app",
  messagingSenderId: "1077840929590",
  appId: "1:1077840929590:web:c0646ec648a672b18f0997"
};

const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };
