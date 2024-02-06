import { initializeApp } from 'firebase/app'
import { getFirestore } from "firebase/firestore";
import { getAuth , onAuthStateChanged } from "firebase/auth";
import { firebaseConfig } from './credentials'

const appFirebase = initializeApp(firebaseConfig);
const db = getFirestore(appFirebase);
const auth = getAuth(appFirebase);

export async function getUser() { // I clearly have to learn more about promises in javascript 
    return new Promise((resolve, reject) => {
      onAuthStateChanged(auth,  (user) => {
        if (user) {     
          resolve(user.uid);
        } else {
          reject(null);
        }
      });
    });
  }

export { appFirebase, db, auth }