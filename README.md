# Promo Code API

REST API for managing and activating promo codes. Built with NestJS, TypeORM, and PostgreSQL.

## Requirements

- Node.js 20+
- npm 10+
- PostgreSQL 14+

## Getting started

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment

```bash
cp .env.example .env
```

Edit `.env` to match your local PostgreSQL credentials:

```env
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USER=
DATABASE_PASSWORD=
DATABASE_NAME=promo_codes

APP_PORT=3000
```

### 3. Create the database

```bash
psql -U postgres -c "CREATE DATABASE promo_codes;"
```

### 4. Run migrations

```bash
npm run migration:run
```

### 5. Start the server

```bash
# Development (watch mode)
npm run start:dev

# Production
npm run build
npm run start
```

The API will be available at `http://localhost:3000`.

Swagger documentation: `http://localhost:3000/docs`
