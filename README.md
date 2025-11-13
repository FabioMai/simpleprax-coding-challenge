# Patient Feedback System

A full-stack TypeScript application for managing patient feedback with shared types between frontend and backend.


https://github.com/user-attachments/assets/c20dd3fe-2c06-40bb-be31-6647cbca8a65


## Stack

- **Frontend**: React + Vite + TypeScript + TanStack Router + Mantine UI
- **Backend**: Fastify + TypeScript + Prisma ORM
- **Database**: SQLite
- **Shared**: Shared TypeScript type definitions

## Project Structure

```
├── frontend/          # React frontend (port 5173)
├── backend/           # Fastify backend (port 8080)
└── shared/            # Shared TypeScript types
```

## Getting Started

### Install Dependencies

```bash
# Install all packages
npm install --workspaces

# Or install individually
cd shared && npm install
cd backend && npm install
cd frontend && npm install
```

### Database Setup

```bash
cd backend
npm run prisma:migrate
npm run prisma:seed
```

### Build Shared Types

```bash
npm run build --workspace=shared
```

### Run Development Servers

**Backend:**

```bash
cd backend
npm run dev
```

**Frontend:**

```bash
cd frontend
npm run dev
```

The frontend will be available at http://localhost:5173 and the backend at http://localhost:8080.

## Code Quality

### Linting

```bash
# Check for linting errors
npm run lint

# Auto-fix linting errors
npm run lint:fix
```

### Formatting

```bash
# Check code formatting
npm run format:check

# Format all files
npm run format
```

The project uses ESLint with TypeScript support and Prettier for code formatting. Configuration files:

- `eslint.config.mjs` - ESLint configuration with separate rules for Node.js (backend) and browser (frontend)
- `.prettierrc` - Prettier formatting rules
- `.prettierignore` - Files to exclude from formatting

## Features

### Backend API

- `GET /api/feedback` - List all feedback entries with timestamps
- `POST /api/feedback` - Create new feedback entry
- `GET /api/feedback/stats` - Get statistics (average rating, total count, weekly count)

### Frontend Features

- View all patient feedback entries
- Add new feedback with validation
- Real-time search across name, comment, and rating
- Filter by star rating (1-5 stars, multi-select)
- Sort by newest, oldest, highest rating, or lowest rating
- Pagination (5 items per page)
- Stats dashboard showing average rating, weekly feedback, and total feedback
- Custom Mantine theme with primary color

### API Documentation

Swagger UI available at: http://localhost:8080/documentation
