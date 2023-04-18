// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyABTnkwzxV-yomUPJJCvhbnBuDgRboa2uI",
  authDomain: "crud-taller-161c7.firebaseapp.com",
  databaseURL: "https://crud-taller-161c7-default-rtdb.firebaseio.com",
  projectId: "crud-taller-161c7",
  storageBucket: "crud-taller-161c7.appspot.com",
  messagingSenderId: "365060379391",
  appId: "1:365060379391:web:a53997c2ab5b793d5d72ca"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export {db}