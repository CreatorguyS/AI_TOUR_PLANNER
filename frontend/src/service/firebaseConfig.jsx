// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAfc8OGYY1aIn_ZPZfAb3A0q6lK415Tr-g",
  authDomain: "ai-trip-planner-5172a.firebaseapp.com",
  projectId: "ai-trip-planner-5172a",
  storageBucket: "ai-trip-planner-5172a.appspot.com", // ✅ fixed here
  messagingSenderId: "720327187152",
  appId: "1:720327187152:web:27efe588bdbbe251b95cd5",
  measurementId: "G-5W38Z71YW1"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
