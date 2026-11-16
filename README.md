# MedQuiz

A multilingual medical knowledge quiz app built with **Expo**, **React Native**, and **TypeScript**. MedQuiz lets learners practise across seven subject areas and four difficulty levels, with timed questions, score summaries, and a locally saved leaderboard.

> **Educational use only:** MedQuiz is a study and revision tool. It is not a clinical reference and should not be used to diagnose, treat, or make patient-care decisions. Always verify medical information against current, authoritative learning resources.

## Features

- **Seven subjects:** Anatomy, Physiology, Pharmacology, Biochemistry, Pathology, Microbiology, and General Knowledge.
- **Four difficulty levels:** Easy, Normal, Hard, and Impossible, each with its own timer and score multiplier.
- **680 built-in questions:** 20 questions for each level in each of the six core medical subjects, plus 50 General Knowledge questions per level.
- **14 interface languages:** English, Portuguese, Spanish, French, German, Italian, Russian, Chinese, Japanese, Korean, Arabic, Hindi, Turkish, and Polish.
- **Question rotation:** previously seen questions are tracked on the device to reduce repetition until a question pool cycles.
- **Local leaderboard:** player details and scores are stored on the device with AsyncStorage.
- **Web app / PWA setup:** includes a web manifest and service worker.
- **iOS and Android support** through Expo.

## Tech stack

- Expo SDK 54 and Expo Router 6
- React 19 and React Native 0.81
- TypeScript
- React Native Reanimated
- Expo Linear Gradient, Haptics, and Vector Icons
- AsyncStorage for local persistence
- TanStack Query and an Express 5 server scaffold
- Drizzle ORM configuration for PostgreSQL

## Getting started

### Requirements

- Node.js 22 (recommended)
- npm
- Expo Go on a physical device, or an Android/iOS simulator for native development

### Install

```bash
git clone https://github.com/YOUR-USERNAME/medquiz.git
cd medquiz
npm install
```

### Run the app

Start the Expo development server:

```bash
npm start
```

Run the web version:

```bash
npm run start:web
```

Run on Android or iOS (with the relevant emulator/simulator available):

```bash
npm run start:android
npm run start:ios
```

You can also scan the QR code printed by Expo using Expo Go on a compatible device.

## Deploy to GitHub Pages

This repository is configured to publish the actual interactive web app at:

`https://semiu25.github.io/MedQuiz/`

The GitHub Actions workflow in `.github/workflows/deploy-pages.yml` builds the Expo web app whenever changes are pushed to `main` and deploys the generated `dist/` folder to GitHub Pages. The Expo base path is configured for the `/MedQuiz` project site, and a `404.html` fallback supports direct navigation to app routes.

### Enable GitHub Pages once

1. Open the repository on GitHub and go to **Settings → Pages**.
2. Under **Build and deployment → Source**, choose **GitHub Actions**.
3. Push this project to the repository's `main` branch, or run the **Deploy MedQuiz to GitHub Pages** workflow from the **Actions** tab.
4. When the workflow finishes successfully, open `https://semiu25.github.io/MedQuiz/`.

To build the web app locally, run:

```bash
npm ci
npm run build:web
```

The static site will be generated in `dist/`.

## Backend status

The quiz currently gets its questions from the bundled local question bank in `lib/questions.ts` and stores player preferences, seen-question history, and leaderboard entries on the device. The Express server in `server/` is a starter scaffold; it currently does not expose quiz, account, or leaderboard API routes. The Drizzle schema is a minimal example user table, not the app's active leaderboard database.

The server and database are therefore **not required to run the quiz locally**. The existing Replit-oriented production build script is retained for projects that still use that deployment workflow. GitHub Pages uses the separate `build:web` command and does not require the Express server or database.

## Project structure

```text
medquiz/
├── app/                  # Expo Router screens and navigation
│   ├── (tabs)/            # Home and leaderboard tabs
│   ├── quiz.tsx           # Quiz session
│   └── results.tsx        # Results screen
├── assets/images/         # App icons and splash assets
├── components/            # Shared UI and error handling components
├── constants/             # Theme colors
├── lib/                   # App contexts, translations, quiz logic
│   └── qbank/              # Subject question banks
├── public/                # PWA manifest and service worker
├── server/                # Express server scaffold
├── shared/                # Shared database schema
└── package.json
```

## Useful scripts

| Command | Description |
| --- | --- |
| `npm start` | Start Expo development server |
| `npm run start:web` | Start the web app |
| `npm run start:android` | Start on Android emulator/device |
| `npm run start:ios` | Start on iOS simulator/device |
| `npm run lint` | Run Expo ESLint checks |
| `npm run typecheck` | Run TypeScript type checking |
| `npm run server:dev` | Start the Express scaffold in development |
| `npm run server:build` | Bundle the Express server for production |

## Before publishing an app build

Update the placeholder identifiers in `app.json` before distributing the app:

- `expo.ios.bundleIdentifier` (`com.myapp`)
- `expo.android.package` (`com.myapp`)
- `expo.scheme` (`myapp`)

Choose identifiers that belong to your project. If you use EAS Build, configure your own Expo project and review `eas.json` before building or submitting.

## Contributing

Contributions are welcome. For changes to the question bank, please keep each question's ID unique, provide exactly four answer options, and ensure `correctIndex` points to the correct option (0–3). Medical content should be checked against reliable, up-to-date references before being added.

1. Fork the repository.
2. Create a feature branch.
3. Make and test your changes.
4. Open a pull request with a clear description.

## License

No license has been added yet. Unless a license is added, the repository's contents remain under the default copyright rules; do not assume others have permission to reuse, modify, or distribute the code.
