# PopX App - Mobile Landing Page & Account Flow

A React JS implementation of the PopX mobile application screens. It simulates a smartphone interface with page transitions, custom input validation, name-based avatar selection, and persistent local storage login sessions.

## Links

- Live Link: https://popx-landing-page-three.vercel.app/
- GitHub Repository: https://github.com/rahulgurudu-2003/popx-landing-page

## Features

- UI Replication: Modeled after the mockups (Welcome, Sign-in, Create Account, and Account Settings).
- Responsive Simulator: Smartphone frame centered on desktop screens; scales to full-screen on mobile devices.
- Dynamic Clock & Status Bar: Displays the active system time alongside cellular, Wi-Fi, and battery indicator UI.
- LocalStorage Persistence: Saved credentials stay persisted in local storage so users can log out and log back in even after reload.
- Real-time Form Validation: Dynamic validation for email structure, password constraints (minimum 6 characters), and names with real-time error messages.
- Name-based Avatar Picker: Dynamically detects name gender (boy or girl) to display appropriate avatars, which can be selected interactively.
- Camera Image Upload: Change avatars using custom image files.

## Getting Started (Local Run)

1. Install Dependencies:
   ```bash
   npm install
   ```

2. Start the Development Server:
   ```bash
   npm run dev
   ```

The app will open automatically at http://localhost:3000.
