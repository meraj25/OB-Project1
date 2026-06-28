# Onboarding Project 1 — Task Management App

A full-stack task management application built with the MERN stack. Users can create tasks, assign them to others, filter by assignee or status, and update task progress.

---

## Tech Stack

**Frontend**
- React with TypeScript
- Redux Toolkit + RTK Query
- Tailwind CSS
- shadcn/ui

**Backend**
- Node.js + Express with TypeScript
- MongoDB + Mongoose
- JWT authentication via HTTP-only cookies

---

## Project Structure

```
onboarding-project-1/
├── frontend/       # React + Vite app
└── backend/        # Express + TypeScript API
```

---

## Getting Started

### Prerequisites

- Node.js v18+
- MongoDB (local or Atlas)

### 1. Clone the repository

```bash
git clone <repo-url>
cd onboarding-project-1
```

### 2. Set up the backend

```bash
cd backend
npm install
```

Create a `.env` file in the `backend` folder:

```env
MONGODB_URI=your_mongodb_connection_string
PORT=8000
JWT_SECRET=your_jwt_secret
FRONTEND_URL=http://localhost:5173
```

Start the backend:

```bash
npm run dev
```

### 3. Set up the frontend

```bash
cd frontend
npm install
npm run dev
```

The frontend runs on `http://localhost:5173` and the backend on `http://localhost:8000`.

---

## Features

- Register and log in with JWT cookie-based authentication
- Create tasks with a name, description, status, and assignees
- View all tasks or filter by assignee and status
- Update task status (assignees only)
- Delete tasks (creators only)
- Pagination on task lists

---

## Decisions, Assumptions & Tradeoffs

### Authentication — HTTP-only Cookies
JWT tokens are stored in HTTP-only cookies rather than localStorage. This prevents XSS attacks from accessing the token directly. The tradeoff is slightly more complex CORS configuration (`credentials: include` on the frontend and explicit origin on the backend).

### Role-based Permissions (without a roles field)
Rather than adding a formal roles system, permissions are enforced by ownership:
- Only the **creator** of a task can delete it
- Only **assignees** of a task can update its status

This keeps the schema simple while still enforcing access control at the task level.

### RTK Query for Data Fetching
RTK Query is used for all API calls instead of plain `fetch` or Axios. This gives automatic caching, cache invalidation on mutations, and loading/error states out of the box. The tradeoff is additional boilerplate in the API slice setup.

### Cache Invalidation with Tags
All task mutations (`createTask`, `updateTask`, `deleteTask`) invalidate the `Task` tag, which triggers automatic refetches across all task queries. This ensures the UI always reflects the latest data without manual refetch calls.

### Single API Slice
All endpoints (tasks and users) are defined in one RTK Query API slice. This is fine for a project of this size but would be split into separate slices in a larger codebase.

### No Roles System
There is no admin or manager role. All authenticated users can create tasks and assign anyone. This was a deliberate simplification for the scope of this project.

### Status Badge Colors
Task cards display a colour-coded status badge — red for "To Do", yellow for "In Progress", and green for "Done". This gives users an instant visual indicator of task progress without needing to read the text.