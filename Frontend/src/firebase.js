/* eslint-disable no-unused-vars */
import { initializeApp } from "firebase/app";
import {
  FacebookAuthProvider,
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
  updatePassword , reauthenticateWithCredential, EmailAuthProvider
} from "firebase/auth";
import {
  getFirestore
} from "firebase/firestore";
import {getStorage,ref,uploadBytes} from  "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyCO1tDzPwVx-CAxfmszc6_L2AnIXPtMUPc",
    authDomain: "gospelwaves-2d1c0.firebaseapp.com",
    projectId: "gospelwaves-2d1c0",
    storageBucket: "gospelwaves-2d1c0.appspot.com",
    messagingSenderId: "973645827021",
    appId: "1:973645827021:web:c8d797bc6d3bda543a1284",
    measurementId: "G-RJCQ00D13D"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider()



const signInWithGoogle = async () => {
  try {
    const res = await signInWithPopup(auth, googleProvider);
  } catch (err) {
    console.log(err.message);
  }
};

const signInWithFacebook = async () => {
  try {
    const res = await signInWithPopup(auth, facebookProvider);
  } catch (err) {
    console.log(err.message);
  }
};

const logInWithEmailAndPassword = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (err) {


  }
};

const registerWithEmailAndPassword = async (email,password,name) => {
  try {
    await createUserWithEmailAndPassword(auth, email, password);
  } catch (err) {
    console.log(err.message);
  }
};

const sendPasswordReset = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    console.log("Password reset link sent!");
  } catch (err) {

    console.log(err.message);
  }
};

const logout = () => {
  signOut(auth);
};

const storage = getStorage(app);
const updateUserPassword = updatePassword;
const reautenticate = reauthenticateWithCredential;
const emailAuthProvider = EmailAuthProvider;


export {
  auth,
  db,
  signInWithGoogle,
  signInWithFacebook,
  logInWithEmailAndPassword,
  registerWithEmailAndPassword,
  sendPasswordReset,
  logout,
  updateUserPassword,
  storage,
  reautenticate,
  emailAuthProvider

};