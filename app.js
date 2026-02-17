import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import {
  getAuth,
  getRedirectResult,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signInWithRedirect,
  signOut,
} from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  appId: "YOUR_APP_ID",
};

const statusArea = document.getElementById("status");
const signedOutView = document.getElementById("signed-out-view");
const signedInView = document.getElementById("signed-in-view");
const signInButton = document.getElementById("sign-in");
const signOutButton = document.getElementById("sign-out");

function pushStatus(message, isError = false) {
  const timestamp = new Date().toLocaleTimeString();
  const line = `[${timestamp}] ${message}`;

  if (isError) {
    console.error(line);
  } else {
    console.log(line);
  }

  const entry = document.createElement("p");
  entry.className = isError ? "status-line status-error" : "status-line";
  entry.textContent = line;
  statusArea.prepend(entry);
}

function describeAuthError(error) {
  const code = error?.code ?? "unknown";
  const message = error?.message ?? String(error);
  return `${code}: ${message}`;
}

function setView(isSignedIn) {
  signedInView.classList.toggle("hidden", !isSignedIn);
  signedOutView.classList.toggle("hidden", isSignedIn);
}

const app = initializeApp(firebaseConfig);
pushStatus("Firebase initialized");

const auth = getAuth(app);
const provider = new GoogleAuthProvider();
pushStatus("Firebase Auth ready");

getRedirectResult(auth)
  .then((result) => {
    if (result?.user) {
      const label = result.user.email ?? result.user.displayName ?? result.user.uid;
      pushStatus(`Redirect sign-in succeeded: ${label}`);
    } else {
      pushStatus("No redirect sign-in result found");
    }
  })
  .catch((error) => {
    pushStatus(`Redirect sign-in failed: ${describeAuthError(error)}`, true);
  });

onAuthStateChanged(auth, (user) => {
  setView(Boolean(user));

  if (user) {
    const label = user.email ?? user.displayName ?? user.uid;
    pushStatus(`Signed in as ${label}`);
    return;
  }

  pushStatus("No signed-in user");
});

signInButton.addEventListener("click", async () => {
  pushStatus("Sign-in clicked");

  try {
    pushStatus("Popup opened");
    await signInWithPopup(auth, provider);
    pushStatus("Popup sign-in completed");
  } catch (error) {
    const errorMessage = describeAuthError(error);
    pushStatus(`Popup sign-in failed: ${errorMessage}`, true);

    if (
      error?.code === "auth/popup-blocked" ||
      error?.code === "auth/popup-closed-by-user"
    ) {
      try {
        pushStatus("Falling back to redirect sign-in");
        await signInWithRedirect(auth, provider);
      } catch (redirectError) {
        pushStatus(
          `Redirect fallback failed: ${describeAuthError(redirectError)}`,
          true,
        );
      }
    }
  }
});

signOutButton.addEventListener("click", async () => {
  pushStatus("Sign-out clicked");

  try {
    await signOut(auth);
    pushStatus("Signed out");
  } catch (error) {
    pushStatus(`Sign-out failed: ${describeAuthError(error)}`, true);
  }
});
