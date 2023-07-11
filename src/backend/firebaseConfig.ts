// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyB9rArHYy_w2K6Z0Kdlm8RYz3VOiR5HY1A',
  authDomain: 'imagenesconnextyfire.firebaseapp.com',
  projectId: 'imagenesconnextyfire',
  storageBucket: 'imagenesconnextyfire.appspot.com',
  messagingSenderId: '917833629392',
  appId: '1:917833629392:web:d70f57742e6ec972d828d5',
  measurementId: 'G-9ZPBKGFWET',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export const storage = getStorage();