import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBtfge-9Wcso8dusmEsmBzFuNGUGebHsf4",
  authDomain: "trip-buddy-2-247cd.firebaseapp.com",
  projectId: "trip-buddy-2-247cd",
  storageBucket: "trip-buddy-2-247cd.firebasestorage.app",
  messagingSenderId: "47777251069",
  appId: "1:47777251069:web:ddc75559ea63468d8b4894",
  measurementId: "G-XLL111PE19"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const db = getFirestore(app)

export { auth, db }