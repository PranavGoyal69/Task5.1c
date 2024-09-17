import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyBiSVSenOpubMzoIbhNe8RXDQ33ZgqhlrE",
  authDomain: "task81d-c6071.firebaseapp.com",
  projectId: "task81d-c6071",
  storageBucket: "task81d-c6071.appspot.com",
  messagingSenderId: "324320076950",
  appId: "1:324320076950:web:7a4bd70ec8509b50f38eb7"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage };
