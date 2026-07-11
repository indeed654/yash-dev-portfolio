# Yash Kumar Sharma Portfolio Backend

Standalone Express, TypeScript, Prisma, and PostgreSQL backend for the portfolio of Yash Kumar Sharma. The deployed frontend communicates with this service only through HTTP REST API calls.

## Prerequisites

- Node.js 20+
- PostgreSQL database, such as Supabase or Railway PostgreSQL
- SMTP credentials for contact notifications

## Setup

```bash
cd backend
npm install
cp .env.example .env
npm run db:migrate
npm run db:seed
npm run dev
```

The API runs on `http://localhost:4000` by default.

## Environment

Copy `.env.example` to `.env` and set:

- `DATABASE_URL`
- `JWT_SECRET`
- `JWT_EXPIRES_IN`
- `ADMIN_EMAIL`
- `ADMIN_INITIAL_PASSWORD`
- `SMTP_HOST`
- `SMTP_PORT`
- `SMTP_USER`
- `SMTP_PASS`
- `NOTIFY_EMAIL`
- `PORT`
- `NODE_ENV`

The `.env` file is intentionally gitignored.

## First Admin Account

The seed script creates or updates one admin account using:

```env
ADMIN_EMAIL=yash@example.com
ADMIN_INITIAL_PASSWORD=change_this_immediately
```

Run:

```bash
npm run db:seed
```

Immediately change the seeded password strategy before using a production admin account.

## API Endpoints

### Health

`GET /api/health`

Response:

```json
{
  "status": "ok",
  "timestamp": "2026-05-29T00:00:00.000Z"
}
```

### Contact

`POST /api/contact`

Rate limited to 3 requests per IP per hour.

Request:

```json
{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "subject": "Project inquiry",
  "message": "I would like to discuss an AI security project."
}
```

Response:

```json
{
  "success": true,
  "message": "Contact message submitted successfully",
  "data": {
    "id": "uuid",
    "name": "Jane Doe",
    "email": "jane@example.com",
    "subject": "Project inquiry",
    "message": "I would like to discuss an AI security project.",
    "isRead": false,
    "createdAt": "2026-05-29T00:00:00.000Z"
  }
}
```

### Projects

`GET /api/projects`

Supports:

- `?category=AI`
- `?featured=true`

`GET /api/projects/:id`

### Blog

`GET /api/blog`

Supports:

- `?tag=AI`

`GET /api/blog/:slug`

Only published blog posts are returned from public routes.

### Skills

`GET /api/skills`

Response:

```json
{
  "success": true,
  "data": {
    "AI/ML": [
      {
        "id": "uuid",
        "name": "TensorFlow",
        "category": "AI/ML",
        "level": 86,
        "order": 1
      }
    ]
  }
}
```

### Auth

`POST /api/auth/login`

Request:

```json
{
  "email": "yash@example.com",
  "password": "change_this_immediately"
}
```

Response:

```json
{
  "success": true,
  "data": {
    "token": "jwt",
    "admin": {
      "id": "uuid",
      "email": "yash@example.com"
    }
  }
}
```

`POST /api/auth/logout`

Logout is client-side token clearing.

### Admin Routes

All admin routes require:

```http
Authorization: Bearer <token>
```

- `GET /api/admin/contact`
- `PATCH /api/admin/contact/:id`
- `DELETE /api/admin/contact/:id`
- `POST /api/admin/projects`
- `PUT /api/admin/projects/:id`
- `DELETE /api/admin/projects/:id`
- `POST /api/admin/blog`
- `PUT /api/admin/blog/:id`
- `DELETE /api/admin/blog/:id`
- `POST /api/admin/skills`
- `PUT /api/admin/skills/:id`
- `DELETE /api/admin/skills/:id`

Example create project:

```json
{
  "title": "Autonomous Multi-Agent Cyber Defense System",
  "description": "Real-time cyber defense system with multi-agent workflows.",
  "techStack": ["Python", "TensorFlow", "LangChain", "FAISS"],
  "category": "Cybersecurity",
  "featured": true,
  "order": 1
}
```

## Validation and Errors

Invalid request bodies return:

```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "body.email",
      "message": "Invalid email"
    }
  ]
}
```

All unhandled errors return:

```json
{
  "success": false,
  "message": "Internal server error"
}
```

Stack traces are hidden when `NODE_ENV=production`.

## CORS

Allowed frontend origins are configured in `src/index.ts`:

- `https://yash-dev-chi.vercel.app`
- `http://localhost:3000`

Add future frontend domains to the `origin` array and redeploy the backend.

## Deployment: Railway

1. Create a new Railway project.
2. Add a PostgreSQL database.
3. Deploy this `backend/` folder from GitHub.
4. Set the environment variables from `.env.example`.
5. Run `npm run db:migrate`.
6. Run `npm run db:seed`.
7. Use `npm run build` as the build command.
8. Use `npm start` as the start command.

The backend is independent from the frontend and can be deployed on Railway, Render, or any Node.js host with PostgreSQL access.
