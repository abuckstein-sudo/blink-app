import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import {
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
} from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  appId: "YOUR_APP_ID",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

const signedOutView = document.getElementById("signed-out-view");
const signedInView = document.getElementById("signed-in-view");
const signInButton = document.getElementById("sign-in");
const signOutButton = document.getElementById("sign-out");

function setView(isSignedIn) {
  signedInView.classList.toggle("hidden", !isSignedIn);
  signedOutView.classList.toggle("hidden", isSignedIn);
}

onAuthStateChanged(auth, (user) => {
  setView(Boolean(user));
});

signInButton.addEventListener("click", async () => {
  try {
    await signInWithPopup(auth, provider);
  } catch (error) {
    console.error("Google sign-in failed:", error);
  }
});

signOutButton.addEventListener("click", async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error("Sign-out failed:", error);
  }
});
