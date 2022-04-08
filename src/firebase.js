// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyABsmFtOgk1Ld4J5T2SaMOBtDE6-lpAJG0",
  authDomain: "fir-login-tutorial-c27b9.firebaseapp.com",
  projectId: "fir-login-tutorial-c27b9",
  storageBucket: "fir-login-tutorial-c27b9.appspot.com",
  messagingSenderId: "666046427098",
  appId: "1:666046427098:web:554ddc8d2358b429e2dae3",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export default storage;
