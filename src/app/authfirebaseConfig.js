// import { initializeApp } from "firebase/app";
// import { getDatabase } from "firebase/database";


import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBJMYkvb5K4y91lCD7jYq8p1rwUUH7aTCg",
  authDomain: "fir-data-e3742.firebaseapp.com",
  databaseURL: "https://fir-data-e3742-default-rtdb.firebaseio.com",
  projectId: "fir-data-e3742",
  storageBucket: "fir-data-e3742.firebasestorage.app",
  messagingSenderId: "535472297800",
  appId: "1:535472297800:web:dbb03d7f63aa8f6fa0057d"
};

const app = initializeApp(firebaseConfig);
// const dbFirebase = getDatabase(app);

const authFirebase = getAuth(app);

export {authFirebase};
// export {dbFirebase};