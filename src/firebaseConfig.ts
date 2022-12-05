import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCseim6-eEadH8WovqgdjT4VetgWiJO7CI",
  authDomain: "final-project---game-shelf.firebaseapp.com",
  projectId: "final-project---game-shelf",
  storageBucket: "final-project---game-shelf.appspot.com",
  messagingSenderId: "472918789925",
  appId: "1:472918789925:web:cb80555bba2f130a0a14cc",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

const authProvider = new GoogleAuthProvider();

export const signInWithGoogle = (): void => {
  signInWithPopup(auth, authProvider);
};
export const signOut = (): void => {
  auth.signOut();
};
