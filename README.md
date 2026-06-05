# 📱 PopX App - Mobile Landing Page & Account flow

A pixel-perfect, premium React JS implementation of the PopX mobile application screens. The application simulates a physical smartphone interface centered on the viewport with smooth page transitions, realistic top notch/camera, real-time status-bar clock updating, and fully functional validation & authentication flows.

## ✨ Features

- **Pixel-Perfect UI Replication**: Modeled precisely after the mockups (Welcome, Sign-in, Create Account, and Account Settings).
- **Responsive Simulator Layout**: Centered smartphone simulator frame on desktops; scales to native full-screen on mobile devices.
- **Dynamic Clock & Status Bar**: Displays the user's active system time dynamically alongside cellular, Wi-Fi, and battery UI.
- **Shared Application Context**: Dynamic registration credentials saved to context state and carried over immediately to the profile view on login.
- **Smart Navigation with History Tracking**: Chevron Back-arrows implemented across screens returning users to their exact preceding path.
- **Form Validations with Floating Outline Labels**: Form validations for email structure, password constraints, and numbers, keeping buttons grey/disabled until data is valid.
- **Interactable Avatar Upload**: Tap the camera icon overlay on the profile picture to change the avatar using your computer's files.
- **Password Recovery Flow**: Integrated "Forgot Password?" page with simulated delay loaders and confirmation screens.
- **Logout Action**: Reset session values returning to the Welcome screen.

---

## 🛠️ Getting Started (Local Run)

Follow these easy steps to get the app running locally on your computer:

### 1. Install Dependencies
Open your command prompt or terminal in this project folder (`Landing Page`) and run:
```bash
npm install
```

### 2. Start the Development Server
Once the installation finishes, start the local server:
```bash
npm run dev
```

The app will compile and automatically open a preview browser window at `http://localhost:3000`.

---

## 🚀 How to Share on GitHub and Host on Vercel / Netlify

As requested in your assignment, here is how you can host the website live online:

### Step 1: Upload to GitHub

1. Open your terminal in this directory.
2. Initialize Git, stage, and commit the codebase:
   ```bash
   git init
   git add .
   git commit -m "Initial commit: PopX App Mobile Interface"
   ```
3. Go to [GitHub](https://github.com/), create a new repository (name it e.g., `popx-landing-page`), and copy the repository link.
4. Link it and push the code:
   ```bash
   git remote add origin YOUR_GITHUB_REPOSITORY_URL
   git branch -M main
   git push -u origin main
   ```

### Step 2: Host on Vercel (Recommended, 1-Click Deployment)

1. Go to [Vercel](https://vercel.com/) and sign up or sign in using your GitHub account.
2. Tap the **"Add New"** button, select **"Project"**.
3. Import your newly uploaded `popx-landing-page` repository.
4. Leave all settings at default (Vercel automatically detects Vite + React configuration) and tap **"Deploy"**.
5. Your website will be live in 10 seconds! Vercel will give you a public link (e.g. `https://popx-landing-page.vercel.app`).

### Step 3: Host on Netlify (Alternative)

1. Sign in to [Netlify](https://www.netlify.com/) using your GitHub account.
2. Click **"Import from Git"** or **"Deploy new site"**.
3. Choose GitHub, select your repository, and click **"Deploy site"**.
4. Netlify will compile Vite and provide your live website URL.
