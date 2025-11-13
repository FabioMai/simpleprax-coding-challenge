# Patient Feedback System

A full-stack TypeScript application for managing patient feedback with shared types between frontend and backend.

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