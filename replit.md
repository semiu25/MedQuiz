# MedQuiz

## Overview

MedQuiz is a medical knowledge quiz application built with Expo (React Native) and an Express backend. It allows users to test their medical knowledge across six subjects (Anatomy, Physiology, Pharmacology, Biochemistry, Pathology, Microbiology) at four difficulty levels (Easy, Normal, Hard, Impossible). The app supports multiple languages (English, Portuguese, Spanish, French) and features a local leaderboard system. It's designed to run on iOS, Android, and web platforms.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend (Expo/React Native)

- **Framework**: Expo SDK 54 with React Native 0.81, using the new architecture (`newArchEnabled: true`)
- **Routing**: Expo Router v6 with file-based routing and typed routes. The app uses a tab-based layout (`(tabs)/`) with two tabs: Play (home) and Leaderboard. Quiz and Results screens are stack screens outside the tabs.
- **State Management**: React Context API for two global concerns:
  - `GameContext` — manages player name and leaderboard entries, persisted to AsyncStorage
  - `LanguageContext` — manages selected language (en/pt/es/fr), persisted to AsyncStorage
- **Data Fetching**: TanStack React Query is set up with a custom `apiRequest` helper that points to the Express backend using `EXPO_PUBLIC_DOMAIN` environment variable. Currently, the app primarily uses local data (question bank is hardcoded in `lib/questions.ts`).
- **UI & Animations**: React Native Reanimated for animations, Expo Linear Gradient for gradient backgrounds, Expo Haptics for haptic feedback, Expo Blur for tab bar blur effects on iOS. Dark theme by default with a teal/slate color palette defined in `constants/colors.ts`.
- **Fonts**: Outfit font family (Regular, Medium, SemiBold, Bold) loaded via `@expo-google-fonts/outfit`.
- **Question Bank**: 680 total questions — 7 subjects × 4 difficulties. Original 6 subjects have 20 questions each (480 total); the General Knowledge subject has 50 questions per difficulty (200 total). Questions stored in `lib/questions.ts`. `getQuestions()` is async and uses `lib/question-tracker.ts` to persist seen question IDs in AsyncStorage, preventing repetition until the full pool per subject/difficulty is exhausted (cycling rotation). Each quiz session shows 10 questions.
- **Subjects**: Anatomy, Physiology, Pharmacology, Biochemistry, Pathology, Microbiology, General Knowledge. Colors defined per subject in `constants/colors.ts`. General Knowledge covers medical history, ethics, medical terminology, famous discoveries, Nobel prizes, healthcare organizations.

### Backend (Express)

- **Framework**: Express 5 running on Node.js with TypeScript (compiled via `tsx` for dev, `esbuild` for production)
- **API Pattern**: Routes registered in `server/routes.ts`, prefixed with `/api`. Currently minimal — the routes file creates an HTTP server but has no application routes defined yet.
- **Storage**: An in-memory storage implementation (`MemStorage`) in `server/storage.ts` with a basic User CRUD interface. This is a placeholder ready to be swapped with database-backed storage.
- **CORS**: Custom CORS middleware that allows requests from Replit domains and localhost origins for Expo web development.
- **Static Serving**: In production, the server serves a static build of the Expo web app. In development, it proxies to the Expo dev server.

### Database Schema

- **ORM**: Drizzle ORM configured for PostgreSQL via `drizzle.config.ts`
- **Schema** (`shared/schema.ts`): Currently defines a single `users` table with `id` (UUID, auto-generated), `username` (unique text), and `password` (text). Uses `drizzle-zod` for insert schema validation.
- **Migrations**: Output to `./migrations` directory. Push schema with `npm run db:push`.
- **Note**: The database schema is minimal and doesn't yet reflect the quiz/leaderboard data model — the leaderboard is currently stored client-side in AsyncStorage.

### Build & Development

- **Dev workflow**: Two processes run simultaneously — `expo:dev` for the Expo dev server and `server:dev` for the Express backend
- **Production build**: Expo web static build (`expo:static:build` via custom `scripts/build.js`) + esbuild server bundle (`server:build`), served by `server:prod`
- **Environment**: Relies on Replit environment variables (`REPLIT_DEV_DOMAIN`, `REPLIT_DOMAINS`, `DATABASE_URL`)

## PWA (Progressive Web App)

The app is fully configured as a PWA:
- **`app/+html.tsx`** — Custom HTML shell injected by Expo Router web. Adds `<link rel="manifest">`, Apple PWA meta tags, Open Graph tags, and inline service worker registration script.
- **`public/manifest.webmanifest`** — PWA manifest with `display: standalone`, teal theme color (`#0D9488`), dark background (`#0F172A`), portrait orientation, 8 icon size entries all pointing to `assets/images/icon.png`.
- **`public/sw.js`** — Service worker using stale-while-revalidate for static/JS/CSS assets and network-first for HTML navigation. API calls (`/api/*`) bypass the cache. Updates apply immediately via `skipWaiting`.
- **`server/index.ts`** — Dedicated routes for `/sw.js` (with `Cache-Control: no-cache` and `Service-Worker-Allowed: /` headers) and `/manifest.webmanifest` (with `application/manifest+json` content type).
- **`app.json` `web` section** — Full PWA metadata: name, shortName, description, themeColor, backgroundColor, display, orientation.

## External Dependencies

- **PostgreSQL**: Required for Drizzle ORM (connection via `DATABASE_URL` environment variable). Currently the schema is minimal and the app primarily uses client-side storage.
- **AsyncStorage**: `@react-native-async-storage/async-storage` for persisting player name, leaderboard data, and language preference on the client.
- **Expo Services**: Standard Expo ecosystem — no external API services are currently integrated (no authentication service, no third-party quiz API). All quiz content is bundled with the app.
- **No external APIs**: The question bank is entirely local. The Express backend has no external service integrations yet.