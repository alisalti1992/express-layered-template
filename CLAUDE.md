# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is an Express Layered Architecture Template - a production-ready Node.js Express template with clean layered architecture, built with TypeScript and modern development practices.

## Tech Stack

- **Backend**: Node.js with Express.js framework
- **Database**: PostgreSQL with Prisma ORM
- **Language**: TypeScript
- **Testing**: None (removed for simplified development)
- **Validation**: Zod
- **Documentation**: Swagger/OpenAPI
- **Logging**: Winston (replaced Morgan in Phase 9)
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
npx prisma dev             # Start Prisma Postgres server (required first)
npx prisma generate        # Generate Prisma client
npx prisma studio         # Open Prisma Studio GUI
npx prisma db push        # Push schema to database
npx prisma db seed        # Seed database
npx prisma migrate reset   # Reset database

# Code quality
npm run lint             # Run ESLint
npm run lint:fix         # Fix ESLint issues
npm run type-check       # Run TypeScript compiler check
npm run format           # Run Prettier formatting
npm run format:check     # Check Prettier formatting

# Docker operations
docker-compose up -d     # Start services in background
docker-compose down      # Stop all services
docker-compose logs      # View logs
```

## Project Status

✅ Phase 1: Basic Node.js Setup - COMPLETED
✅ Phase 2: Express.js Foundation - COMPLETED  
✅ Phase 3: Code Quality Setup - COMPLETED
✅ Phase 4: Prisma Setup - COMPLETED
❌ Phase 5: Testing Framework - REMOVED
✅ Phase 6: Docker Setup - COMPLETED
✅ Phase 7: API Documentation - COMPLETED
✅ Phase 8: Input Validation - COMPLETED
✅ Phase 9: Logging & Monitoring - COMPLETED
✅ Phase 10: Project Structure - COMPLETED
- See DEVELOPMENT.md for complete phase breakdown

## Current Project Structure

```
├── src/
│   ├── controllers/
│   │   └── healthController.ts # Health endpoint request handlers
│   ├── services/
│   │   └── healthService.ts    # Health check business logic
│   ├── repositories/
│   │   └── healthRepository.ts # Database connection checks
│   ├── types/
│   │   └── index.ts           # TypeScript interfaces and types
│   ├── utils/
│   │   └── responseHelper.ts  # API response utilities
│   ├── config/
│   │   ├── swagger.ts         # Swagger/OpenAPI configuration
│   │   └── logger.ts          # Winston logging configuration
│   ├── lib/
│   │   └── prisma.ts          # Prisma client singleton
│   ├── middlewares/
│   │   ├── validation.ts      # Zod input validation middleware
│   │   ├── rateLimiter.ts     # Rate limiting middleware
│   │   ├── errorHandler.ts    # Error handling middleware
│   │   └── logging.ts         # Request/response logging middleware
│   ├── generated/
│   │   └── prisma/            # Generated Prisma client (gitignored)
│   └── index.ts               # Express server with Swagger documentation
├── docker/
│   └── postgres/
│       └── init.sql       # PostgreSQL initialization script
├── prisma/
│   └── schema.prisma      # Database schema with User, CrawlJob, Page models
├── dist/                  # Compiled JavaScript output
├── node_modules/          # Dependencies
├── package.json           # Project configuration
├── package-lock.json      # Dependency lock file
├── tsconfig.json          # TypeScript configuration
├── eslint.config.js       # ESLint configuration
├── .prettierrc            # Prettier formatting rules
├── .prettierignore        # Prettier ignore patterns
├── Dockerfile             # Docker container configuration
├── docker-compose.yml     # Multi-container Docker setup
├── .dockerignore          # Docker build ignore patterns
├── .env                   # Database connection string
├── .env.docker            # Docker environment configuration
├── .env.example           # Environment variables template
├── .gitignore            # Git ignore rules
├── DEVELOPMENT.md         # Phase-by-phase development plan
├── CLAUDE.md             # This file
└── README.md             # Project documentation
```

## Current API Endpoints

- `GET /` - Welcome message
- `GET /health` - Health check endpoint
- `GET /api-docs` - Interactive Swagger API documentation

## Architecture Implementation (Phase 10 Completed)

The project now follows a proper layered architecture:
- **Controllers**: Handle HTTP requests/responses (healthController.ts)
- **Services**: Business logic and data processing (healthService.ts)
- **Repositories**: Database access abstraction (healthRepository.ts)
- **Types**: TypeScript interfaces for architecture contracts
- **Utils**: Helper utilities (responseHelper.ts for consistent API responses)
- **Middlewares**: Cross-cutting concerns (auth, validation, logging)
- **Config**: Configuration files (logger.ts, swagger.ts)

## Development Guidelines

### Code Quality
- Use ESLint for code linting with TypeScript support
- Use Prettier for consistent code formatting
- Run `npm run lint:fix` and `npm run format` before committing
- WebStorm automatically detects and applies these configurations

### Error Handling
- Use Zod for input validation (Phase 8)
- Implement centralized error handling middleware
- Return consistent error response format

### Database
- All database operations through Prisma client (import from `src/lib/prisma.ts`)
- Database models: User, CrawlJob, Page with full TypeScript support
- Use transactions for multi-step operations
- Current setup: Prisma Postgres for development (run `npx prisma dev` to start)
- Generated client available with full type safety

### Development Approach
- No testing framework - simplified development approach
- Focus on TypeScript type safety and code quality
- Use manual testing and validation during development
- Rely on production logging and monitoring for issue detection

### Logging
- Winston-based structured logging system (Phase 9)
- Request/response logging with unique IDs and performance monitoring
- Daily log rotation with compression and sensitive data redaction
- Replaced Morgan HTTP logging for more comprehensive features

### API Design
- Follow RESTful conventions
- Document all endpoints with Swagger
- Use consistent response formats
- Implement proper HTTP status codes

## Architecture Notes

This template provides a layered Node.js Express application with:
- **Controllers**: Handle HTTP requests/responses
- **Services**: Business logic and data processing
- **Repositories**: Database access abstraction
- **Middlewares**: Cross-cutting concerns (auth, validation, logging)

### Template Features:
- Complete layered architecture implementation
- Type-safe database operations with Prisma
- Input validation with Zod and detailed error handling
- Structured logging with Winston and request tracking
- API documentation with Swagger/OpenAPI
- Docker containerization with PostgreSQL and Redis
- Code quality tools (ESLint, Prettier, TypeScript)