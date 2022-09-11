// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC4aHiHRkheILRzwRs-7iNVxGMqlEWAVUk",
  authDomain: "roudirasa-58a3a.firebaseapp.com",
  projectId: "roudirasa-58a3a",
  storageBucket: "roudirasa-58a3a.appspot.com",
  messagingSenderId: "218717372914",
  appId: "1:218717372914:web:95f1b17b6bd80b8c8d2b6b",
  measurementId: "G-GBZZCLD0QE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);