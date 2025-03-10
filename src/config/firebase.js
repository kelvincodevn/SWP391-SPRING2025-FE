// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB6gDVCNdqOuuMDIOu8DfO_p4j7J8-ASkg",
  authDomain: "student-management-e11cf.firebaseapp.com",
  projectId: "student-management-e11cf",
  storageBucket: "student-management-e11cf.firebasestorage.app",
  messagingSenderId: "320333543912",
  appId: "1:320333543912:web:752d6097d926d24df30c5d",
  measurementId: "G-G2MP6V02VM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();