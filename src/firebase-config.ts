// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDmwCBXFj9nMet3KC80fzWzgd4oG94onbw",
  authDomain: "escuelapp-f167e.firebaseapp.com",
  projectId: "escuelapp-f167e",
  storageBucket: "escuelapp-f167e.appspot.com",
  messagingSenderId: "145711675941",
  appId: "1:145711675941:web:f383a2f719b2eb9fde1dcc",
  measurementId: "G-RY84WGYJ8M"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

const storage = getStorage(app);

export { storage };

