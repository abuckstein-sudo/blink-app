# blink-app

Static GitHub Pages site with Firebase Auth:

- If signed out, it shows an angry cat SVG and a **Sign in with Google** button.
- If signed in, it shows the blinking exclamation mark and a **Sign out** button.

## Files

- `index.html` - page structure.
- `style.css` - styles for both views.
- `app.js` - Firebase initialization + auth state handling.

## Firebase setup

1. Go to [Firebase Console](https://console.firebase.google.com/) and create a project (or reuse one).
2. In **Build → Authentication → Sign-in method**, enable **Google**.
3. In **Project settings → General → Your apps**, add a **Web app** and copy config values.
4. Update `firebaseConfig` placeholders in `app.js` with your real values.
5. Add your GitHub Pages URL to Firebase authorized domains:
   - `YOUR_USERNAME.github.io`
   - or custom domain if used.

## Run locally

Open `index.html` directly, or serve with any static server, for example:

```bash
python3 -m http.server 8080
```

Then open <http://localhost:8080>.

## Deploy to GitHub Pages

1. Push this repo to GitHub.
2. In GitHub: **Settings → Pages**.
3. Under **Build and deployment**, choose **Deploy from a branch**.
4. Select your branch (for example `main`) and root folder (`/`).
5. Save and open your published Pages URL.
