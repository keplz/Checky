// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCxAhNjaka_tTH4MTfic4eljsBLS5nZO80",
  authDomain: "checky-ccd16.firebaseapp.com",
  projectId: "checky-ccd16",
  storageBucket: "checky-ccd16.firebasestorage.app",
  messagingSenderId: "511603909939",
  appId: "1:511603909939:web:c6c148e7772aabbbe78a46"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)