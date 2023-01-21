import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAB1pXzf0oAVGfbqS3_pRfciN4unbAJuZw",
  authDomain: "v1-1b592.firebaseapp.com",
  projectId: "v1-1b592",
  storageBucket: "v1-1b592.appspot.com",
  messagingSenderId: "216867745219",
  appId: "1:216867745219:web:cd63c1a657c31541576176",
  measurementId: "G-Z5RWRR6JKL",
};

const firebaseApp = initializeApp(firebaseConfig);

const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);

export { db, auth };
