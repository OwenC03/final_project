import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDaEfB6ZwoGxuDn_bcFobcJwqgQnphSB1g",
    authDomain: "final-project-44c79.firebaseapp.com",
    projectId: "final-project-44c79",
    storageBucket: "final-project-44c79.firebasestorage.app",
    messagingSenderId: "1062862724313",
    appId: "1:1062862724313:web:4c9d6a61564fa3dcedf2c8",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export {db, auth};