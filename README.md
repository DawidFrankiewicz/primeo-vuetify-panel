# Employee Management App

A simple employee management application built with Vue 3 that allows you to view, add, and edit employee records. The data is stored in Pinia (without backend/database integration) and is reset on each browser refresh.

## 🐳 Run with Docker

1. Build and start the container: `docker-compose up --build`
2. Access the app in your browser: http://localhost:3000

## 🚀 Run locally

### Prerequisites

- Node.js `v22.14.0` (tested version recommended)
- npm `v10.x` or compatible

### Instalation

1. `npm install`
2. `npm run dev`
3. Access the app in your browser: http://localhost:3000

### Additional Scripts

- Lint the project: `npm run lint`
- Type check with Vue TSC: `npm run type-check`
- Build the project: `npm run build`
- Preview production build locally: `npm run preview`

## 🛠 Tech Stack

- Vue 3 Composition API
- Vuetify (UI Framework)
- Pinia (State Management)
- Vee-Validate with Yup (Form validation)
- vue3-toastify (Notifications)

## 📋 Features

- Employee List View
- Add Employee Form
- Edit Employee Form

## 🧠 Data Storage

- No database is used.
- All employee data is temporarily stored in Pinia store.
- Data is cleared upon browser refresh.

## 📌 Notes

- This is a front-end only demo app.
- Data persistence is not implemented by design.
