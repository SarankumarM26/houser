import { initializeApp } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-firestore.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-analytics.js";

const firebaseConfig = {
  apiKey: "AIzaSyC6uv4TluA_-qNM6NfdQZ4gUISR3jWgGKk",
  authDomain: "houser-64d9e.firebaseapp.com",
  projectId: "houser-64d9e",
  storageBucket: "houser-64d9e.firebasestorage.app",
  messagingSenderId: "441449956426",
  appId: "1:441449956426:web:bcc2062c1c8d1d05e952b3",
  measurementId: "G-82JPGX6QSS"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const analytics = getAnalytics(app);

export { db, addDoc, collection };
