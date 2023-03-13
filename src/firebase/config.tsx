import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyA0ZaLGQIAaVROTzwtJhmGDVnO3J1IPLT0",
  authDomain: "trackerissue-e2ab5.firebaseapp.com",
  projectId: "trackerissue-e2ab5",
  storageBucket: "trackerissue-e2ab5.appspot.com",
  messagingSenderId: "779585862247",
  appId: "1:779585862247:web:0ac4c53aedbfe13396b2c2"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db };