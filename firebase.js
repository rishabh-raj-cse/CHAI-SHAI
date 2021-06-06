import firebase from "firebase";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCriBnCs2Y7Of70GOIZAQZ7EKZaIgQKFEs",
  authDomain: "facebook-5edbe.firebaseapp.com",
  projectId: "facebook-5edbe",
  storageBucket: "facebook-5edbe.appspot.com",
  messagingSenderId: "455363466741",
  appId: "1:455363466741:web:84f5ab1d4f061b12817cbc",
  measurementId: "G-6NPRK6JYPQ",
};

const app = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();
const db = app.firestore();
const storage = firebase.storage();

export { db, storage };
