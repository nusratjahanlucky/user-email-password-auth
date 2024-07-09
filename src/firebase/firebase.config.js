// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCvWD3Ua5qdIF_VXOKS6T_66Zg1ZOhwaJ8",
  authDomain: "user-email-password-auth-85852.firebaseapp.com",
  projectId: "user-email-password-auth-85852",
  storageBucket: "user-email-password-auth-85852.appspot.com",
  messagingSenderId: "869522611534",
  appId: "1:869522611534:web:0e0bf3e880d4587a1e521f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth;