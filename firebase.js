// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAS28XEnxE80iBDGs9ue6TigPfkzOF8tzc",
  authDomain: "inventory-management-79289.firebaseapp.com",
  projectId: "inventory-management-79289",
  storageBucket: "inventory-management-79289.appspot.com",
  messagingSenderId: "855761109435",
  appId: "1:855761109435:web:7b5c8ad70eff7accd1449e",
  measurementId: "G-TLXM3TL5YJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);

export{firestore};