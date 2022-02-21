import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"
const firebaseConfig = {
  apiKey: "AIzaSyAhdNtr5B9O9QpP_YvP-YBW2FqM7Q4MGSE",
  authDomain: "ixdbb-a66b4.firebaseapp.com",
  databaseURL: "https://ixdbb-a66b4-default-rtdb.firebaseio.com",
  projectId: "ixdbb-a66b4",
  storageBucket: "ixdbb-a66b4.appspot.com",
  messagingSenderId: "1033378678827",
  appId: "1:1033378678827:web:36777784ca8333bdbc026e",
  measurementId: "G-F4ZWV4BR2D"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
export {db,auth}