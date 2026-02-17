import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import {
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";

// TODO: Paste your Firebase project configuration below.
// Get these values from Firebase Console:
// Project settings > General > Your apps > SDK setup and configuration.
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

const loggedOutView = document.getElementById("logged-out-view");
const loggedInView = document.getElementById("logged-in-view");
const signInButton = document.getElementById("sign-in-button");
const signOutButton = document.getElementById("sign-out-button");

function showLoggedOutView() {
  loggedOutView.classList.remove("hidden");
  loggedInView.classList.add("hidden");
}

function showLoggedInView() {
  loggedInView.classList.remove("hidden");
  loggedOutView.classList.add("hidden");
}

onAuthStateChanged(auth, (user) => {
  if (user) {
    showLoggedInView();
  } else {
    showLoggedOutView();
  }
});

signInButton.addEventListener("click", async () => {
  try {
    await signInWithPopup(auth, provider);
  } catch (error) {
    console.error("Google sign-in failed:", error);
    alert("Sign-in failed. Check your Firebase config and authorized domains.");
  }
});

signOutButton.addEventListener("click", async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error("Sign-out failed:", error);
    alert("Sign-out failed. Please try again.");
  }
});
