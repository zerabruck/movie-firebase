// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import {getAuth, GoogleAuthProvider} from "firebase/auth"
import {getFirestore} from "firebase/firestore"
import {getStorage} from "firebase/storage"
const firebaseConfig = {
  apiKey: "AIzaSyA5lmzhvkPZhbZT529pkLQfNuPilg87z0Y",
  authDomain: "second-course.firebaseapp.com",
  projectId: "second-course",
  storageBucket: "second-course.appspot.com",
  messagingSenderId: "108581529292",
  appId: "1:108581529292:web:1baab7dfac51755d460469",
  measurementId: "G-0ZGLM0WTXP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const auth = getAuth(app)
export const googleProvider = new GoogleAuthProvider()

export const db = getFirestore(app)
export const storage = getStorage(app)