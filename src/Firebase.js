// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage, ref } from "firebase/storage";
// import { doc, setDoc } from "firebase/firestore";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAUUsERFFQwRatxq08c1ub2mP4hAK80ZKA",
    authDomain: "kantineapp-f3d33.firebaseapp.com",
    projectId: "kantineapp-f3d33",
    storageBucket: "kantineapp-f3d33.appspot.com",
    messagingSenderId: "982267777143",
    appId: "1:982267777143:web:a6133ecd4b530d9462f672"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const authFirebase = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);



