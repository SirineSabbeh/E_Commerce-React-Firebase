import firebase from 'firebase/compat/app';
//import * as firebase from 'firebase';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyA65i6u87M6eC7wRDDgC-vdPazTe8XROoI",
    authDomain: "e-commerce-react-fb5d5.firebaseapp.com",
    projectId: "e-commerce-react-fb5d5",
    storageBucket: "e-commerce-react-fb5d5.appspot.com",
    messagingSenderId: "581405490183",
    appId: "1:581405490183:web:f4d57ddc314c6d4770bea2",
    measurementId: "G-05W7VN5MFS"
  };
firebase.initializeApp(firebaseConfig);
const auth=firebase.auth();
const db=firebase.firestore();
const storage=firebase.storage();
export {auth,db,storage}