import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { getFirestore, addDoc, collection } from "firebase/firestore";
import { toast } from 'react-toastify'; // You missed this!

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDHUL5qD72i7IsMSXV4F-ndec0W6dYIN9g",
  authDomain: "website-d498d.firebaseapp.com",
  projectId: "website-d498d",
  storageBucket: "website-d498d.appspot.com",
  messagingSenderId: "745576348509",
  appId: "1:745576348509:web:54510f19691af16a3f46b4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize auth and database
const auth = getAuth(app);
const db = getFirestore(app);

// Signup function
const signup = async (name, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await addDoc(collection(db, "user"), {
      uid: user.uid,
      name,
      authProvider: "local",
      email,
    });
    toast.success("Signup Successful!");
  } catch (error) {
    console.log(error);
    toast.error(error.code.split('/')[1].split('-').join(" "));
  }
};

// Login function
const login = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    toast.success("Login Successful!");
  } catch (error) {
    console.log(error);
    toast.error(error.code.split('/')[1].split('-').join(" "));
  }
};

// Logout function
const logout = () => {
  signOut(auth);
};

export { auth, db, login, signup, logout };
