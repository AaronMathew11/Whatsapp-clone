// For Firebase JS SDK v7.20.0 and later, measurementId is optional

import { getFirestore, getDocs, orderBy, Timestamp } from "firebase/firestore";
import {
  getAuth,
  sendSignInLinkToEmail,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import firebase from "firebase/compat/app";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyC_NmTQuRhs9IUsFwOuHsXhcsefks0jFng",
  authDomain: "whatsapp-clone-257a1.firebaseapp.com",
  projectId: "whatsapp-clone-257a1",
  storageBucket: "whatsapp-clone-257a1.appspot.com",
  messagingSenderId: "34729939058",
  appId: "1:34729939058:web:498e4ea36bf003ca5bb2eb",
  measurementId: "G-CE8X6X6FR8",
};

const app = initializeApp(firebaseConfig);
// const db = getFirestore(firebaseapp);
// const auth = getAuth(firebaseapp);
// const provider = new GoogleAuthProvider();

// export { auth, provider };
export default app;
