// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyALxX5q9WQ1izzDMCNbq7DfxPkV1BIPnFo",
  authDomain: "reactive-chat-bed76.firebaseapp.com",
  projectId: "reactive-chat-bed76",
  storageBucket: "reactive-chat-bed76.appspot.com",
  messagingSenderId: "466216791736",
  appId: "1:466216791736:web:dc2bffec3a59cb9dc4ce4d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);