# Todo App Frontend

A React + Vite frontend for a full-stack todo application with authentication, protected routes, todo management, filtering, and pagination. This app connects to the backend API available at [https://github.com/Rai321han/todo-api](https://github.com/Rai321han/todo-api).

## Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Backend API](#backend-api)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Configuration](#configuration)
- [Available Scripts](#available-scripts)
- [Run the App](#run-the-app)

## Overview

This frontend provides the user interface for a todo management system. Users can:

- sign up and sign in
- stay authenticated with cookie-based sessions
- view protected dashboard content
- create, update, delete, and toggle todo status
- filter todos by completion state
- navigate paginated todo results

## Tech Stack

- React 19
- Vite 8
- React Router 7
- Axios
- Tailwind CSS 4
- ESLint

## Backend API

This frontend depends on the companion backend API repository:

- API repository: [todo-api](https://github.com/Rai321han/todo-api)

Make sure the backend server is running and the frontend `VITE_API_URL` points to the correct API base URL.

## Project Structure

```text
todo_app_frontend/
├── public/              # Static public assets
├── src/                 # Application source code
│   ├── api/             # Axios API client and request setup
│   ├── assets/          # Images and bundled static assets
│   ├── components/      # Reusable UI components
│   ├── context/         # React context providers for auth and todo filters
│   ├── hooks/           # Custom hooks for auth and todo operations
│   ├── pages/           # Route-level page components
│   └── utils/           # Helper utilities
├── index.html           # Vite HTML entry point
├── package.json         # Project metadata and scripts
├── vite.config.js       # Vite configuration
└── eslint.config.js     # ESLint configuration
```

## Installation

1. Clone the repository.
2. Move into the project directory.
3. Install dependencies:

```bash
npm install
```

## Configuration

This project uses a Vite environment variable for the API base URL.

Create a `.env` file in the project root:

```env
VITE_API_URL=http://localhost:8080/v1/api
```

Notes:

- `VITE_API_URL` should point to the backend API base URL
- the frontend sends requests with `withCredentials: true`, so backend CORS and cookie settings must allow frontend access
- if your backend runs on a different port or host, update the value accordingly

## Available Scripts

- `npm run dev` starts the Vite development server
- `npm run build` creates a production build
- `npm run preview` previews the production build locally
- `npm run lint` runs ESLint

## Run the App

Start the development server:

```bash
npm run dev
```

Then open the local Vite URL shown in the terminal, usually:

```text
http://localhost:5173
```

Before using the app, make sure:

- the backend API is running
- `VITE_API_URL` is set correctly
- the backend supports credentials/cookies for authentication
