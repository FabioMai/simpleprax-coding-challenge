# Full Stack Starter

A TypeScript full-stack application with shared types between frontend and backend.

## Stack

- **Frontend**: React + Vite + TypeScript
- **Backend**: Fastify + TypeScript
- **Shared**: Shared type definitions

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

### Build Shared Types

```bash
cd shared
npm run build
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

### API Documentation

Swagger UI available at: http://localhost:8080/documentation