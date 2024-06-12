// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBqCDl_307fFJ78iUDmEZwR_4mVOeSymrE",
  authDomain: "fitlib-e38fb.firebaseapp.com",
  projectId: "fitlib-e38fb",
  storageBucket: "fitlib-e38fb.appspot.com",
  messagingSenderId: "1085016198437",
  appId: "1:1085016198437:web:c9819f9bbef2bb1b659ecc"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default getFirestore();