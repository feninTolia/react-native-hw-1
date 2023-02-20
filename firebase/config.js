import { initializeApp } from 'firebase/app';

import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import { getFirestore } from 'firebase/firestore';
// import {...} from "firebase/database";
// import {...} from "firebase/functions";

const firebaseConfig = {
  apiKey: 'AIzaSyDVXoNGljMIJqox5nlhoEkVXJgvwpfQyFo',
  authDomain: 'rn-practice1.firebaseapp.com',
  projectId: 'rn-practice1',
  storageBucket: 'rn-practice1.appspot.com',
  messagingSenderId: '855385353565',
  appId: '1:855385353565:web:9086155309edb46b094cb4',
  measurementId: 'G-VHYX9JMZ9F',
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const storage = getStorage(app);
const db = getFirestore(app);

export { auth, storage, db };
