# Hello React Todo

A feature-rich Todo App built with React, Redux Toolkit, and Tailwind CSS.

## Features

-   **Dashboard**: Centralized view for all your tasks.
-   **Task Management**: Create, Read, Update, and Delete tasks.
-   **Priorities**: Assign Low, Medium, or High priority to tasks.
-   **Deadlines**: Set due dates for tasks.
-   **Filtering**: Filter tasks by text search, completion status, and priority.
-   **Sorting**: Sort tasks by Creation Date, Priority, or Due Date.
-   **Persistence**: Data is automatically saved to LocalStorage.
-   **Responsive Design**: Modern UI optimized for both desktop and mobile.

## Tech Stack

-   **Framework**: React 19 + Vite
-   **Language**: TypeScript
-   **State Management**: Redux Toolkit
-   **Routing**: React Router
-   **Styling**: Tailwind CSS v4 (@tailwindcss/vite)
-   **Package Manager**: Yarn v4 (Berry)

## Setup & Development

This project uses **Yarn v4** via [Corepack](https://nodejs.org/api/corepack.html).

### Prerequisites

-   Node.js (v18 or later recommended)
-   Corepack enabled:
    ```bash
    corepack enable
    ```

### Installation

Clone the repository and install dependencies:

```bash
# Install dependencies
yarn install
```

### Running Locally

Start the development server:

```bash
yarn dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Building for Production

Build the application for deployment:

```bash
yarn build
```

To preview the production build locally:

```bash
yarn preview
```

### Deploying to GitHub Pages

To deploy this application to [GitHub Pages](https://pages.github.com/):

1.  Ensure your repository is named `hello-react-todo` (or update `base` in `vite.config.ts`).
2.  Run the deployment command:

    ```bash
    yarn deploy
    ```

    This command runs the build and pushes the `dist` directory to the `gh-pages` branch.
3.  Go to your GitHub Repository Settings > Pages, and ensure the source is set to the `gh-pages` branch.

## Directory Structure

-   `src/components`: UI components (TodoList, Forms, Controls, etc.)
-   `src/store`: Redux store configuration and slices.
-   `src/types`: TypeScript type definitions.
-   `src/App.tsx`: Main application layout.

## Credits

This project was created using [**Antigravity**](https://antigravity.google/).
