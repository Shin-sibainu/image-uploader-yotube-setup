// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDfgkgyKqMq4srBXLC-i3Wfrf_7yBNjHF0",
  authDomain: "test-arbum.firebaseapp.com",
  projectId: "test-arbum",
  storageBucket: "test-arbum.appspot.com",
  messagingSenderId: "968188375453",
  appId: "1:968188375453:web:54d3509012df889413ff74",
  measurementId: "G-S4B22TBPM9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const storage = getStorage(app);
const db = getFirestore(app);

export default {storage,db};