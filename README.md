# Todo Application — Frontend

A web-based task management application designed to help users organize and manage their daily tasks through a clean, straightforward interface.

## Live Demo

[Open Todo Application](https://todo-eight-rouge-17.vercel.app/)

## Project Repositories

- **Frontend:** [SupainNandy/Todo](https://github.com/SupainNandy/Todo)
- **Backend:** [SupainNandy/Todo_Backend](https://github.com/SupainNandy/Todo_Backend)

## Overview

This repository contains the frontend of the Todo Application. It provides the client-side interface and integrates with the backend to support the functionality implemented by the project.

The frontend and backend are maintained in separate repositories to keep the codebase organized and make development and maintenance easier.

## Technology Stack

Check the project's `package.json` to confirm the exact frameworks and dependencies.

- JavaScript
- Vite
- HTML and CSS

## Getting Started

### Prerequisites

- Node.js
- npm
- Git

### 1. Clone the Repository

```bash
git clone https://github.com/SupainNandy/Todo.git
cd Todo
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure the Backend URL

If the frontend communicates with a deployed backend, configure the appropriate environment variable using the name expected by your application.

For a Vite application, an example is:

```env
VITE_API_URL=http://localhost:5000
```

Replace the example URL with your actual backend address. This variable is only an example; confirm the name and configuration used in your code.

### 4. Start the Development Server

```bash
npm run dev
```

Open the local URL displayed in the terminal.

### 5. Build for Production

```bash
npm run build
```

## Deployment

The frontend is deployed on Vercel.

- **Live Application:** [todo-eight-rouge-17.vercel.app](https://todo-eight-rouge-17.vercel.app/)
- **Backend Repository:** [Todo_Backend](https://github.com/SupainNandy/Todo_Backend)

## Future Improvements

Potential enhancements include improved task filtering, better error handling, accessibility improvements, and automated testing.

## Author

**Supain Nandy**

GitHub: [@SupainNandy](https://github.com/SupainNandy)

## License

Add a license file if the project is intended for open-source distribution.
