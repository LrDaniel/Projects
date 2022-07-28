// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged,
} from "firebase/auth";
import {
  getFirestore,
  doc,
  setDoc,
  collection,
  query,
  getDocs,
  addDoc,
  serverTimestamp,
  orderBy,
  getDoc,
  where,
  updateDoc,
} from "firebase/firestore";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
  uploadBytes,
} from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAeNXJfPYPG4tDKhZCE5TgsSEzW3gF6XIo",
  authDomain: "facebook-clone-8629b.firebaseapp.com",
  projectId: "facebook-clone-8629b",
  storageBucket: "facebook-clone-8629b.appspot.com",
  messagingSenderId: "665233923987",
  appId: "1:665233923987:web:384ca7b56e3608d7eb9266",
  measurementId: "G-684S4FZ220",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

export {
  db,
  auth,
  storage,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  doc,
  setDoc,
  updateProfile,
  onAuthStateChanged,
  collection,
  query,
  getDocs,
  addDoc,
  serverTimestamp,
  ref,
  uploadBytesResumable,
  getDownloadURL,
  uploadBytes,
  orderBy,
  getDoc,
  where,
  updateDoc,
};
