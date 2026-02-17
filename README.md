# blink-app

Static GitHub Pages site using **Firebase Authentication (Google)** with pure HTML/CSS/JS.

## What this page does

- **Logged out:** shows an inline SVG angry cat on a white background and a **Sign in with Google** button.
- **Logged in:** shows a centered blinking exclamation mark (`!`) on white and a **Sign out** button.
- UI switches dynamically using Firebase `onAuthStateChanged`.

## File structure

- `index.html` — page markup with two views (logged out / logged in).
- `style.css` — minimal centered layout and blink animation.
- `app.js` — Firebase setup, auth listener, Google sign-in, and sign-out logic.

## Firebase setup (step by step)

1. Go to [Firebase Console](https://console.firebase.google.com/) and create a project.
2. In the project, click **Build → Authentication → Get started**.
3. Under **Sign-in method**, enable **Google** provider.
4. Go to **Project settings → General**.
5. Under **Your apps**, add a **Web app** (</>) if you do not already have one.
6. Copy the Firebase config values shown in **SDK setup and configuration**.
7. Open `app.js` and replace the placeholder values in `firebaseConfig`:
   - `apiKey`
   - `authDomain`
   - `projectId`
   - `storageBucket`
   - `messagingSenderId`
   - `appId`

## Add GitHub Pages domain to authorized domains

1. In Firebase Console, open **Authentication → Settings → Authorized domains**.
2. Add your GitHub Pages host, for example:
   - `your-username.github.io`
3. If your site is a project page, this still uses the same host domain.

## Run locally

You can open `index.html` directly, but Firebase auth flows are typically easiest to test over a local server:

```bash
python3 -m http.server 8000
```

Then open `http://127.0.0.1:8000`.

## Deploy to GitHub Pages

1. Push this repository to GitHub.
2. In the repo, open **Settings → Pages**.
3. Configure Pages source (for example, deploy from `main` branch root).
4. Visit your GitHub Pages URL and test Google sign-in.
