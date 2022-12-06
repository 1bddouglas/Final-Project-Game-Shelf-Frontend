import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

// Import the functions you need from the SDKs you need

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBHwSnQxp4SZU1h7Omkdx5iDUUBxBg0p7o",
  authDomain: "finalprojectgameshelf.firebaseapp.com",
  projectId: "finalprojectgameshelf",
  storageBucket: "finalprojectgameshelf.appspot.com",
  messagingSenderId: "193078610452",
  appId: "1:193078610452:web:02869e4426ee5c25f6b501",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
const authProvider = new GoogleAuthProvider();

export function signInWithGoogle(): void {
  signInWithPopup(auth, authProvider);
}
export function signOut(): void {
  auth.signOut();
}
