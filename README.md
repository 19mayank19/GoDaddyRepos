# GoDaddy Repositories

A React-based application that fetches and displays a list of GoDaddy GitHub repositories using the GitHub API. Users can view repository details such as the name, description, and additional information.

## 🚀 Features

- Fetch and display repositories from the GoDaddy GitHub account
- View detailed repository information
- Optimized API response handling with caching
- Responsive and styled with SCSS modules

## 🛠️ Tech Stack

- React with TypeScript
- React Router for navigation
- SCSS Modules for styling

## 📦 Installation

- Clone the repository: `git clone https://github.com/19mayank19/GoDaddyRepos`
- Navigate to the project directory: `cd GoDaddyRepos`
- Install dependencies: `npm install`
- Start the development server: `npm run dev`
- Run Tests: `npm run test`

## 💡 Folder Structure

```src
├── components
│   ├── repoList
|   |   |── __tests__
|   |   |   |──RepoList.view.test.tsx
│   │   ├── RepoList.view.tsx
│   │   ├── RepoList.module.scss
│   │   ├── RepoList.types.ts
│   │   ├── useRepoList.ts
│   └── loader
│       ├── Loader.view.tsx
│       ├── Loader.module.scss
├── App.tsx
├── main.tsx
├── vite.config.ts
└── index.html
```

## Deployed App

https://godaddyrepos.netlify.app/
