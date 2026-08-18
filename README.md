# AI Project Mentor

A beginner-friendly full-stack training application where users can create software projects, manage development tasks, and ask an AI mentor to break requirements into actionable tasks.

## Application Objective

AI Project Mentor helps students and junior developers practice full-stack development by managing projects and tasks, tracking progress through a dashboard, and using an AI mentor to generate structured development plans from software requirements.

## Technology Stack

**Frontend (current):**
- HTML5
- CSS3
- JavaScript ES6+
- React.js (functional components and hooks)
- Vite (build tool)
- React Router DOM (navigation)
- Axios (prepared for future API calls)

**Planned Backend (not yet implemented):**
- Python
- FastAPI REST APIs
- SQL Server database
- Ollama Cloud API (GPT-OSS model)

## Current Frontend Features

- Responsive sidebar navigation with collapsible mobile menu
- Clean top header with search, notifications, and profile placeholder
- Dashboard with summary cards, project progress bars, recent tasks, and AI recommendations
- Projects page with card-based layout, create/edit modals, and delete confirmation
- Project Details page with progress overview and task list
- Tasks page with filters (project, priority, status), search, and full CRUD operations
- AI Mentor page with project selection, requirement input, and structured mock AI response
- AI History page with filters and detailed interaction view
- Reusable UI components: LoadingSpinner, ErrorMessage, SuccessMessage, EmptyState, ConfirmDialog, Modal, Badge
- Form validation with inline error messages
- Status and priority badges with colour coding
- Fully responsive on desktop, tablet, and mobile

## Installation

```bash
npm install
```

## Development

```bash
npm run dev
```

## Build

```bash
npm run build
```

## Folder Structure

```
src/
  components/
    Layout/          Sidebar, Header, AppLayout
    Dashboard/       StatCard
    Projects/        ProjectForm
    Tasks/           TaskForm
    AI/              (future AI-specific components)
    Common/          LoadingSpinner, ErrorMessage, SuccessMessage, EmptyState, ConfirmDialog, Modal, Badge
  pages/
    DashboardPage.jsx
    ProjectsPage.jsx
    ProjectDetailsPage.jsx
    TasksPage.jsx
    AIMentorPage.jsx
    AIHistoryPage.jsx
    NotFoundPage.jsx
  context/
    AppContext.jsx   Shared state management with mock data
  services/
    api.js           Axios service prepared for future backend calls
  data/
    mockData.js      Mock projects, tasks, and AI interactions
  styles/
    global.css       Global styles, theme variables, and component styles
  App.jsx            Router and provider setup
  main.jsx           Application entry point
```

## Environment Variables

Copy `.env.example` to `.env` and adjust as needed:

| Variable | Description | Default |
|---|---|---|
| `VITE_API_BASE_URL` | The base URL of the future FastAPI backend | `http://127.0.0.1:8000` |
| `VITE_USE_MOCK_DATA` | Set to `true` to use mock data, `false` to call the real backend | `true` |

**Important:** Never put the following values in the frontend:
- `OLLAMA_API_KEY` — belongs only in the Python backend
- Database username or password
- SQL Server connection string

## Future FastAPI Integration Plan

The frontend is prepared to consume these backend endpoints once the Python backend is ready:

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/health` | Backend health check |
| GET | `/api/dashboard` | Dashboard statistics |
| GET | `/api/projects` | List all projects |
| POST | `/api/projects` | Create a project |
| GET | `/api/projects/{project_id}` | Get a single project |
| PUT | `/api/projects/{project_id}` | Update a project |
| DELETE | `/api/projects/{project_id}` | Delete a project |
| GET | `/api/tasks` | List all tasks |
| POST | `/api/tasks` | Create a task |
| GET | `/api/tasks/{task_id}` | Get a single task |
| PUT | `/api/tasks/{task_id}` | Update a task |
| PATCH | `/api/tasks/{task_id}/status` | Update task status |
| DELETE | `/api/tasks/{task_id}` | Delete a task |
| POST | `/api/ai/plan` | Generate AI project plan |
| POST | `/api/ai/next-task` | Recommend next task |
| GET | `/api/ai/history/{project_id}` | Get AI interaction history |

To connect the backend:
1. Set `VITE_USE_MOCK_DATA=false` in your `.env` file.
2. Set `VITE_API_BASE_URL` to your backend URL.
3. Replace the mock data calls in `src/context/AppContext.jsx` with the API functions from `src/services/api.js`.
