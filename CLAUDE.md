# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

SiteScope is a Node.js Express application for SEO website crawling, screenshotting, and reporting.

## Tech Stack

- **Backend**: Node.js with Express.js framework
- **Database**: PostgreSQL with Prisma ORM
- **Language**: TypeScript
- **Testing**: Jest with Supertest
- **Validation**: Zod
- **Documentation**: Swagger/OpenAPI
- **Logging**: Winston
- **Containerization**: Docker

## Common Development Commands

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build the application
npm run build

# Start production server
npm start

# Database operations
npx prisma migrate dev     # Run migrations in development
npx prisma generate        # Generate Prisma client
npx prisma studio         # Open Prisma Studio GUI
npx prisma db push        # Push schema to database
npx prisma db seed        # Seed database
npx prisma migrate reset   # Reset database

# Testing
npm test                  # Run tests
npm run test:watch       # Run tests in watch mode
npm run test:coverage    # Run tests with coverage

# Code quality
npm run lint             # Run ESLint
npm run lint:fix         # Fix ESLint issues
npm run type-check       # Run TypeScript compiler check
npm run format           # Run Prettier

# Docker operations
docker-compose up -d     # Start services in background
docker-compose down      # Stop all services
docker-compose logs      # View logs
```

## Project Status

Phase 1: Basic Node.js Setup (Current)
- See DEVELOPMENT.md for complete phase breakdown

## Project Structure

```
src/
├── controllers/    # Request handlers (Phase 10)
├── services/      # Business logic (Phase 10)
├── repositories/  # Data access layer (Phase 10)
├── middlewares/   # Custom middleware (Phase 8)
├── types/         # TypeScript types (Phase 10)
├── utils/         # Utilities (Phase 10)
├── config/        # Configuration (Phase 9)
└── tests/         # Test files (Phase 5)
```

## Development Guidelines

### Error Handling
- Use Zod for input validation (Phase 8)
- Implement centralized error handling middleware
- Return consistent error response format

### Database
- All database operations through Prisma
- Use transactions for multi-step operations
- Follow migration-first approach

### Testing
- Write tests for all endpoints
- Use Supertest for API testing
- Maintain >80% test coverage

### API Design
- Follow RESTful conventions
- Document all endpoints with Swagger
- Use consistent response formats
- Implement proper HTTP status codes

## Architecture Notes

This is a layered Node.js Express application with:
- **Controllers**: Handle HTTP requests/responses
- **Services**: Business logic and data processing
- **Repositories**: Database access abstraction
- **Middlewares**: Cross-cutting concerns (auth, validation, logging)

### Core Features (Future Phases):
- Website crawling with queue management
- Screenshot capture using Puppeteer
- SEO analysis engine
- Rate limiting and request throttling
- Comprehensive reporting system