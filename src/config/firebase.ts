import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyChUfYH15TuWm3KD5zaKwAOy1ydX1t50Ec",
  authDomain: "clarodele-c4588.firebaseapp.com",
  projectId: "clarodele-c4588",
  storageBucket: "clarodele-c4588.firebasestorage.app",
  messagingSenderId: "541795346735",
  appId: "1:541795346735:web:042d9295e3f1cd662999da",
  measurementId: "G-Q34X4SN0V7"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const analytics = getAnalytics(app);
