<div align="center">

# 🎬 OzzyFlix

### A modern movie discovery application built with React Native & Expo

<p>
Explore popular movies, discover upcoming releases, search for titles, browse actors and build your personal favorites collection.
</p>

![React Native](https://img.shields.io/badge/React_Native-0.74-20232A?style=for-the-badge\&logo=react\&logoColor=61DAFB)
![Expo](https://img.shields.io/badge/Expo-51-000020?style=for-the-badge\&logo=expo\&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.3-3178C6?style=for-the-badge\&logo=typescript\&logoColor=white)
![TMDB](https://img.shields.io/badge/TMDB-API-01B4E4?style=for-the-badge)

</div>

---

## 🎥 About OzzyFlix

**OzzyFlix** is a cross-platform movie discovery application developed with **React Native, Expo and TypeScript**.

The application integrates with **The Movie Database (TMDB) API** to provide up-to-date movie information, ratings, release dates, cast details and related content through a clean mobile interface.

The project focuses on creating a complete mobile browsing experience while demonstrating practical concepts such as **external API integration, file-based navigation, persistent local storage and reusable UI components**.

---

## ✨ Features

### 🎬 Movie Discovery

Browse movies across multiple categories:

* Popular Movies
* Upcoming Movies
* Top Rated Movies

Explore movie posters, ratings, release information and descriptions directly from TMDB.

### 🔍 Search

Search the TMDB movie catalog and quickly discover movies by title.

### 🎞️ Movie Details

Access detailed information about each movie, including:

* Overview
* Rating
* Release information
* Cast
* Similar movies
* Movie artwork

### 👤 Actor Profiles

Explore actors and discover additional information about their careers and movie appearances.

### ❤️ Favorites

Save movies to a personal favorites collection.

Favorite movie IDs are stored locally using **AsyncStorage**, allowing the collection to persist between application sessions.

---

## 🧰 Tech Stack

| Technology            | Purpose                           |
| --------------------- | --------------------------------- |
| **React Native**      | Cross-platform mobile development |
| **Expo**              | Application development & runtime |
| **TypeScript**        | Type-safe development             |
| **Expo Router**       | File-based application navigation |
| **TMDB API**          | Movie, actor & media data         |
| **Axios**             | HTTP requests                     |
| **AsyncStorage**      | Persistent local favorites        |
| **React Navigation**  | Navigation utilities              |
| **Expo Vector Icons** | Application icons                 |

---

## 🏗️ Architecture

OzzyFlix separates navigation, reusable components and external services into a simple modular structure.

```text
OzzyFlix
│
├── app/
│   ├── (tabs)/
│   │   ├── Home
│   │   ├── Search
│   │   └── Favorites
│   │
│   └── (stacks)/
│       ├── Movie Details
│       └── Person Details
│
├── components/
│   └── Reusable UI components
│
├── services/
│   └── TMDB API integration
│
├── hooks/
│   └── Application hooks
│
├── constants/
│   └── Shared constants
│
└── assets/
    └── Application assets
```

The application uses **Expo Router** to combine tab-based navigation with stack-based detail screens.

---

## 🔌 TMDB Integration

OzzyFlix communicates with the TMDB API through a centralized API service.

The integration includes endpoints for:

```text
Popular Movies
Upcoming Movies
Top Rated Movies

Movie Details
Movie Credits
Similar Movies

Person Details
Person Movie Credits

Movie Search
```

This keeps external API communication separate from the application's UI layer.

---

## 🚀 Getting Started

### Requirements

Make sure you have installed:

* Node.js
* npm
* Expo
* A TMDB API key

---

### 1. Clone the repository

```bash
git clone https://github.com/OzzyD07/OzzyFlix-ReactNative.git
cd OzzyFlix-ReactNative
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure TMDB

Create a TMDB API key from The Movie Database developer portal.

Open:

```text
services/tmdb.tsx
```

Replace:

```ts
const API_KEY = 'your_api_key_here';
```

with your own API key.

> Do not commit private production API credentials to a public repository.

### 4. Start the application

```bash
npx expo start
```

You can then launch the project using:

```bash
npm run android
```

or

```bash
npm run ios
```

---

## 📱 Application Flow

```text
                    ┌───────────────┐
                    │     TMDB      │
                    │      API      │
                    └───────┬───────┘
                            │
                            ▼
                    ┌───────────────┐
                    │  TMDB Service │
                    │     Axios     │
                    └───────┬───────┘
                            │
                            ▼
             ┌───────────────────────────┐
             │        OzzyFlix           │
             │                           │
             │ Home · Search · Favorites │
             └─────────────┬─────────────┘
                           │
                 ┌─────────┴─────────┐
                 ▼                   ▼
          Movie Details        Person Details
                 │
                 ▼
          Similar Movies
          Cast & Metadata
```

---

## 🎯 Project Focus

OzzyFlix was built to explore and demonstrate practical mobile development concepts including:

**React Native application architecture · REST API integration · navigation · persistent local state · reusable components · asynchronous data fetching · mobile UI development**

---

## 📄 Data Source

Movie and actor information is provided by **The Movie Database (TMDB) API**.

This project is not affiliated with or endorsed by TMDB.

---

## 👨‍💻 Author

**Ozancan Değirmenci**

Mobile & Full-Stack Developer

[![GitHub](https://img.shields.io/badge/GitHub-OzzyD07-181717?style=for-the-badge\&logo=github)](https://github.com/OzzyD07)

---

<div align="center">

### Built with React Native, Expo & TMDB 🎬

</div>
