// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDILED5uS3lRc0988BcOeWRFwmI7Ly4moc",
  authDomain: "iteam-international.firebaseapp.com",
  projectId: "iteam-international",
  storageBucket: "iteam-international.appspot.com",
  messagingSenderId: "938101473110",
  appId: "1:938101473110:web:927fd7a9b7784ec625e0f7",
};

// Initialize Firebase
// const app = initializeApp(firebaseConfig);

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
