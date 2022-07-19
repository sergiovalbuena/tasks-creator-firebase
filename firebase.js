// Import the functions you need from the SDKs you need
//import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.0/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  onSnapshot
} from "https://www.gstatic.com/firebasejs/9.9.0/firebase-firestore.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCVgwdWupxZcw10tleOp7CmKPiM8HFhMtU",
  authDomain: "fireform-2fa44.firebaseapp.com",
  projectId: "fireform-2fa44",
  storageBucket: "fireform-2fa44.appspot.com",
  messagingSenderId: "503617703062",
  appId: "1:503617703062:web:7d361dd4f2a70fbdc546b7",
  measurementId: "G-1FQHPVQCH6",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);

const db = getFirestore();

export const saveTask = (title, description) => {
  console.log(title, description);
  addDoc(collection(db, "tasks"), { title, description });
};

//Leer datos de la DB
export const getTasks = () => getDocs(collection(db, "tasks"));

export const onGetTask = () => console.log('onGetTask')

export { 
  onSnapshot,
  collection, 
  db
}
