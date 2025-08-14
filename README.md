# Express Layered Architecture Template

A production-ready Node.js Express template with layered architecture, built with TypeScript and modern development practices.

## Tech Stack

- **Backend**: Node.js with Express.js framework
- **Database**: PostgreSQL with Prisma ORM
- **Language**: TypeScript
- **Validation**: Zod for input validation
- **Documentation**: Swagger/OpenAPI
- **Logging**: Winston structured logging
- **Containerization**: Docker & Docker Compose

## Features

- **Layered Architecture**: Clean separation of controllers, services, and repositories
- **Type Safety**: Full TypeScript support with strict configuration
- **Input Validation**: Zod-based request validation with detailed error handling
- **API Documentation**: Interactive Swagger UI with OpenAPI 3.0
- **Structured Logging**: Winston-based logging with rotation and redaction
- **Rate Limiting**: Configurable request throttling
- **Docker Support**: Complete containerization with PostgreSQL and Redis
- **Code Quality**: ESLint, Prettier, and automated formatting

## Quick Start

### Prerequisites
- Node.js 18+ 
- PostgreSQL 14+
- Docker (optional)

### Using This Template

```bash
# Use this template to create a new project
git clone <your-template-url> your-project-name
cd your-project-name

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your database credentials

# Set up database
npx prisma dev              # Start Prisma Postgres server
npx prisma generate         # Generate Prisma client

# Start development server
npm run dev
```

### Docker Development (Recommended)

```bash
# Build and start all services
docker compose up -d

# View logs
docker compose logs -f app

# Check service status
docker compose ps

# Stop services
docker compose down
```

The Docker setup includes:
- **Application**: Node.js app with TypeScript build
- **PostgreSQL**: Database with persistent storage
- **Redis**: Caching layer for future features
- **Health Checks**: Monitoring for all services

## API Documentation

This template includes comprehensive OpenAPI documentation:

- **Swagger UI**: `http://localhost:3000/api-docs` - Interactive API documentation
- **Health Check**: `http://localhost:3000/health` - Server health status
- **Welcome**: `http://localhost:3000/` - API welcome message

### API Features:
- ✅ OpenAPI 3.0 specification
- ✅ Interactive Swagger UI interface  
- ✅ Complete endpoint documentation with examples
- ✅ Reusable schema components
- ✅ Standard HTTP error responses

## Template Architecture

This template implements a **layered architecture pattern** with complete separation of concerns:

✅ **Controllers Layer**: HTTP request/response handling
✅ **Services Layer**: Business logic and data processing  
✅ **Repository Layer**: Database access abstraction
✅ **Middleware**: Cross-cutting concerns (validation, logging, error handling)
✅ **Type System**: Full TypeScript interfaces and contracts

See [TEMPLATE_USAGE.md](./TEMPLATE_USAGE.md) for detailed setup and customization instructions.

## Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm start           # Start production server
npm test            # Run tests
npm run lint        # Check code quality
npm run type-check  # TypeScript type checking
```

## Project Structure

```
src/
├── controllers/    # HTTP request handlers
├── services/      # Business logic
├── repositories/  # Database access layer
├── middlewares/   # Express middlewares
├── types/         # TypeScript type definitions
├── utils/         # Helper utilities
└── config/        # Configuration management
```

## License

MIT