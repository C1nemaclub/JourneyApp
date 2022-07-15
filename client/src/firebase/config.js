// import firebase from 'firebase/app';
// import 'firebase/storage';
// import 'firebase/firestore';

// const firebaseConfig = {
//   apiKey: 'AIzaSyBFZFQlK6EecWKupkCFmoeLKA5u7bP1N38',
//   authDomain: 'uploadingimage-71d87.firebaseapp.com',
//   projectId: 'uploadingimage-71d87',
//   storageBucket: 'uploadingimage-71d87.appspot.com',
//   messagingSenderId: '1079793753064',
//   appId: '1:1079793753064:web:016944ec35e3fc3a3da25d',
// };

// firebase.initializeApp(firebaseConfig);

// const projectStorage = firebase.storage();
// const projectFirestore = firebase.firestore();

// export { projectStorage, projectFirestore };

// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore/lite';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  projectId: process.env.PROJECT_ID,
  storageBucket: 'uploadingimage-71d87.appspot.com',
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const projectStorage = getStorage(app);
