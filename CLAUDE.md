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
npx prisma dev             # Start Prisma Postgres server (required first)
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
✅ Phase 5: Testing Framework - COMPLETED
✅ Phase 6: Docker Setup - COMPLETED
✅ Phase 7: API Documentation - COMPLETED
✅ Phase 8: Input Validation - COMPLETED
✅ Phase 9: Logging & Monitoring - COMPLETED
- See DEVELOPMENT.md for complete phase breakdown

## Current Project Structure

```
├── src/
│   ├── config/
│   │   ├── swagger.ts     # Swagger/OpenAPI configuration
│   │   └── logger.ts      # Winston logging configuration
│   ├── lib/
│   │   └── prisma.ts      # Prisma client singleton
│   ├── middlewares/
│   │   ├── validation.ts  # Zod input validation middleware
│   │   ├── rateLimiter.ts # Rate limiting middleware
│   │   ├── errorHandler.ts # Error handling middleware
│   │   └── logging.ts     # Request/response logging middleware
│   ├── generated/
│   │   └── prisma/        # Generated Prisma client (gitignored)
│   └── index.ts           # Express server with Swagger documentation
├── tests/
│   ├── setup.ts           # Jest test setup
│   └── health.test.ts     # API tests for health endpoint
├── docker/
│   └── postgres/
│       └── init.sql       # PostgreSQL initialization script
├── prisma/
│   └── schema.prisma      # Database schema with User, CrawlJob, Page models
├── dist/                  # Compiled JavaScript output
├── node_modules/          # Dependencies
├── package.json           # Project config with Jest and testing dependencies
├── package-lock.json      # Dependency lock file
├── tsconfig.json          # TypeScript configuration (with Jest types)
├── jest.config.js         # Jest testing configuration
├── eslint.config.js       # ESLint configuration
├── .prettierrc            # Prettier formatting rules
├── .prettierignore        # Prettier ignore patterns
├── Dockerfile             # Docker container configuration
├── docker-compose.yml     # Multi-container Docker setup
├── .dockerignore          # Docker build ignore patterns
├── .env                   # Database connection string
├── .env.test              # Test environment variables
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

## Future Project Structure (Phase 10)

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

### Testing
- Write tests for all endpoints using Jest and Supertest
- Tests located in `tests/` directory with separate test environment
- Use `npm test` to run all tests, `npm run test:watch` for development
- Test configuration: jest.config.js with TypeScript support
- Maintain >80% test coverage
- Current tests: health endpoint validation

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